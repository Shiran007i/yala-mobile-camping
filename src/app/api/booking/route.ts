// src/app/api/booking/route.ts
import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import {
  generateAdminEmailTemplate,
  generateCustomerEmailTemplate,
} from "../../../templates/emailTemplates.js";

interface BookingSubmission {
  bookingId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  checkIn: string;
  checkOut: string;
  nights: number;
  groupSize: number;
  accommodationType: string;
  mealPlan: string;
  total: number;
  location: {
    name: string;
    location: string;
    price_per_night: number;
  };
  specialRequests?: string;
  submittedAt: string;
}

// Gmail transporter for admin notifications
const gmailTransporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER, // shirantha007i@gmail.com
    pass: process.env.EMAIL_PASSWORD, // your Gmail app password
  },
});

// ZOHO transporter for customer emails
const zohoTransporter = nodemailer.createTransport({
  host: process.env.ZOHO_HOST || "smtp.zoho.com",
  port: parseInt(process.env.ZOHO_PORT || "465"),
  secure: process.env.ZOHO_SECURE !== "false",
  auth: {
    user: process.env.ZOHO_USER, // info@yalamobilecamping.com
    pass: process.env.ZOHO_PASSWORD, // your ZOHO password
  },
  tls: {
    rejectUnauthorized: false
  }
});

// Helper function to send emails to multiple admin addresses via Gmail
const sendAdminEmails = async (
  emailHtml: string,
  subject: string,
  envVars: { EMAIL_USER?: string; EMAIL_FROM_NAME: string }
) => {
  const adminEmails: string[] = [];

  // Add Gmail admin email if configured
  if (process.env.ADMIN_EMAIL) {
    adminEmails.push(process.env.ADMIN_EMAIL);
  }

  // Add ZOHO admin email if configured and different from Gmail admin
  if (
    process.env.ZOHO_USER &&
    process.env.ZOHO_USER !== process.env.ADMIN_EMAIL
  ) {
    adminEmails.push(process.env.ZOHO_USER);
  }

  console.log("📧 Admin emails to notify:", adminEmails);

  // Send to all admin emails via Gmail
  const emailPromises = adminEmails.map(async (adminEmail) => {
    try {
      await gmailTransporter.sendMail({
        from: `"${envVars.EMAIL_FROM_NAME}" <${process.env.EMAIL_USER}>`,
        to: adminEmail,
        subject: subject,
        html: emailHtml,
        priority: "high",
        headers: {
          "X-Priority": "1",
          "X-MSMail-Priority": "High",
          Importance: "high",
        },
      });
      console.log(`✅ Admin notification sent to: ${adminEmail} (via Gmail)`);
      return { email: adminEmail, status: "✅ Sent via Gmail" };
    } catch (error: any) {
      console.error(
        `❌ Failed to send admin notification to ${adminEmail}:`,
        error.message
      );
      return { email: adminEmail, status: `❌ Failed: ${error.message}` };
    }
  });

  const results = await Promise.allSettled(emailPromises);
  return results.map((result, index) => {
    if (result.status === "fulfilled") {
      return result.value;
    } else {
      return {
        email: adminEmails[index],
        status: `❌ Promise rejected: ${result.reason}`,
      };
    }
  });
};

// Helper function to send customer email via ZOHO
const sendCustomerEmail = async (
  emailHtml: string,
  subject: string,
  customerEmail: string,
  envVars: { EMAIL_FROM_NAME: string }
) => {
  try {
    await zohoTransporter.sendMail({
      from: `"${envVars.EMAIL_FROM_NAME}" <${process.env.ZOHO_USER}>`,
      to: customerEmail,
      subject: subject,
      html: emailHtml,
      replyTo: process.env.ZOHO_USER,
    });
    console.log(`✅ Customer confirmation sent to: ${customerEmail} (via ZOHO)`);
    return {
      status: "✅ Sent via ZOHO",
      email: customerEmail,
      from: process.env.ZOHO_USER,
    };
  } catch (error: any) {
    console.error("❌ Failed to send customer confirmation via ZOHO:", error.message);
    throw error;
  }
};

export async function POST(request: NextRequest) {
  try {
    const data: BookingSubmission = await request.json();

    // 📧 Email configuration
    const FROM_NAME = process.env.EMAIL_FROM_NAME || "Yala Mobile Camping";

    // Debug logging
    console.log("📧 Email Configuration Check:");
    console.log("Gmail sender (admin notifications):", process.env.EMAIL_USER);
    console.log("ZOHO sender (customer emails):", process.env.ZOHO_USER);
    console.log("Gmail admin recipient:", process.env.ADMIN_EMAIL);
    console.log("Customer email:", data.email);

    // Validate Gmail configuration for admin emails
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
      console.error("❌ Gmail configuration missing for admin notifications!");
      throw new Error("Gmail configuration not complete");
    }

    // Validate ZOHO configuration for customer emails
    if (!process.env.ZOHO_USER || !process.env.ZOHO_PASSWORD) {
      console.error("❌ ZOHO configuration missing for customer emails!");
      throw new Error("ZOHO configuration not complete");
    }

    // Validate that at least one admin email is configured
    if (!process.env.ADMIN_EMAIL && !process.env.ZOHO_USER) {
      console.error("❌ No admin emails configured in environment variables!");
      throw new Error("Admin email not configured");
    }

    // Prepare environment variables object for templates
    const envVars = {
      EMAIL_USER: process.env.EMAIL_USER,
      ADMIN_EMAIL: process.env.ADMIN_EMAIL || process.env.ZOHO_USER || "",
      EMAIL_FROM_NAME: FROM_NAME,
    };

    // ===================================================================
    // 1. SEND ADMIN NOTIFICATION EMAILS (via Gmail)
    // ===================================================================
    console.log("📧 Generating admin email template...");
    const adminEmailHtml = generateAdminEmailTemplate(data, envVars);
    const adminSubject = `🚨 URGENT BOOKING: ${data.total} - ${data.bookingId} - ${data.firstName} ${data.lastName}`;

    console.log("📧 Sending admin notifications via Gmail...");
    const adminEmailResults = await sendAdminEmails(
      adminEmailHtml,
      adminSubject,
      envVars
    );

    // ===================================================================
    // 2. SEND CUSTOMER CONFIRMATION EMAIL (via ZOHO)
    // ===================================================================
    console.log("📧 Generating customer email template...");
    const customerEmailHtml = generateCustomerEmailTemplate(data, envVars);
    const customerSubject = `🏕️ Booking Request Received - ${data.bookingId} - Yala Mobile Camping`;

    console.log("📧 Sending customer confirmation via ZOHO...");
    let customerEmailResult;
    
    try {
      customerEmailResult = await sendCustomerEmail(
        customerEmailHtml,
        customerSubject,
        data.email,
        envVars
      );
      console.log("✅ Customer email sent TO:", data.email);
      console.log("✅ Customer email sent FROM:", process.env.ZOHO_USER);
    } catch (error: any) {
      console.error("❌ ZOHO customer email failed, trying Gmail as fallback...");
      
      // Fallback to Gmail if ZOHO fails
      try {
        await gmailTransporter.sendMail({
          from: `"${FROM_NAME}" <${process.env.EMAIL_USER}>`,
          to: data.email,
          subject: customerSubject,
          html: customerEmailHtml,
        });
        customerEmailResult = {
          status: "✅ Sent via Gmail (ZOHO fallback)",
          email: data.email,
          from: process.env.EMAIL_USER,
          note: "ZOHO failed, used Gmail as fallback"
        };
        console.log("✅ Customer confirmation sent via Gmail fallback");
      } catch (fallbackError: any) {
        customerEmailResult = {
          status: `❌ Both ZOHO and Gmail failed: ${fallbackError.message}`,
          email: data.email
        };
      }
    }

    // ===================================================================
    // 3. RETURN SUCCESS RESPONSE
    // ===================================================================
    console.log("✅ Email processing completed for booking:", data.bookingId);

    // Process admin email results for response
    const adminEmailSummary: Record<string, string> = {};
    adminEmailResults.forEach((result) => {
      adminEmailSummary[result.email] = result.status;
    });

    return NextResponse.json({
      success: true,
      message:
        "Booking request submitted successfully! Check your email for confirmation.",
      bookingId: data.bookingId,
      emailStatus: {
        adminEmails: adminEmailSummary,
        customerEmail: customerEmailResult,
        totalAdminEmails: Object.keys(adminEmailSummary).length,
        emailConfiguration: {
          adminNotifications: "Sent via Gmail",
          customerConfirmation: customerEmailResult?.status?.includes("ZOHO") 
            ? "Sent via ZOHO" 
            : "Sent via Gmail (fallback)",
          customerSentFrom: customerEmailResult?.from
        }
      },
      whatsappLink: `https://wa.me/94713585926?text=${encodeURIComponent(
        `Hi! I just submitted booking ${data.bookingId} for ${data.nights} nights at ${data.location.name}. Looking forward to hearing from you!`
      )}`,
    });
  } catch (error: any) {
    console.error("❌ Error processing booking:", error);

    return NextResponse.json(
      {
        success: false,
        message:
          "Failed to process booking request. Please try again or contact us directly.",
        fallback: {
          whatsapp: "https://wa.me/94713585926",
          email: `mailto:${process.env.ZOHO_USER || process.env.EMAIL_USER}`,
        },
        error: process.env.NODE_ENV === "development" ? error.message : "Internal server error",
      },
      { status: 500 }
    );
  }
}