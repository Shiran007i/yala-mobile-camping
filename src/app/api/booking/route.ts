// src/app/api/booking/route.ts
import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { 
  generateAdminEmailTemplate, 
  generateCustomerEmailTemplate 
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

// Email configuration using Gmail for sending
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER, // shirantha007i@gmail.com
    pass: process.env.EMAIL_PASSWORD, // your app password
  },
});

// Helper function to send emails to multiple admin addresses
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
  
  // Add custom domain email if configured and different from Gmail admin
  if (process.env.ZOHO_USER && process.env.ZOHO_USER !== process.env.ADMIN_EMAIL) {
    adminEmails.push(process.env.ZOHO_USER);
  }
  
  console.log("📧 Admin emails to notify:", adminEmails);
  
  // Send to all admin emails
  const emailPromises = adminEmails.map(async (adminEmail) => {
    try {
      await transporter.sendMail({
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
      console.log(`✅ Admin notification sent to: ${adminEmail}`);
      return { email: adminEmail, status: "✅ Sent" };
    } catch (error: any) {
      console.error(`❌ Failed to send admin notification to ${adminEmail}:`, error.message);
      return { email: adminEmail, status: `❌ Failed: ${error.message}` };
    }
  });
  
  const results = await Promise.allSettled(emailPromises);
  return results.map((result, index) => {
    if (result.status === 'fulfilled') {
      return result.value;
    } else {
      return { 
        email: adminEmails[index], 
        status: `❌ Promise rejected: ${result.reason}` 
      };
    }
  });
};

export async function POST(request: NextRequest) {
  try {
    const data: BookingSubmission = await request.json();

    // 📧 Email configuration
    const FROM_NAME = process.env.EMAIL_FROM_NAME || "Yala Mobile Camping";

    // Debug logging
    console.log("📧 Email Configuration Check:");
    console.log("EMAIL_USER (sender):", process.env.EMAIL_USER);
    console.log("ADMIN_EMAIL (Gmail):", process.env.ADMIN_EMAIL);
    console.log("ZOHO_USER (Custom Domain):", process.env.ZOHO_USER);
    console.log("Customer email:", data.email);

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
    // 1. SEND ADMIN NOTIFICATION EMAILS (to both Gmail and custom domain)
    // ===================================================================
    console.log("📧 Generating admin email template...");
    const adminEmailHtml = generateAdminEmailTemplate(data, envVars);
    const adminSubject = `🚨 URGENT BOOKING: $${data.total} - ${data.bookingId} - ${data.firstName} ${data.lastName}`;

    console.log("📧 Sending admin notifications to multiple addresses...");
    const adminEmailResults = await sendAdminEmails(adminEmailHtml, adminSubject, envVars);

    // ===================================================================
    // 2. SEND CUSTOMER CONFIRMATION EMAIL (using Gmail)
    // ===================================================================
    console.log("📧 Generating customer email template...");
    const customerEmailHtml = generateCustomerEmailTemplate(data, envVars);

    console.log("📧 Sending customer confirmation to:", data.email);
    let customerEmailStatus = "✅ Sent";
    try {
      await transporter.sendMail({
        from: `"${FROM_NAME}" <${process.env.EMAIL_USER}>`,
        to: data.email,
        subject: `🏕️ Booking Request Received - ${data.bookingId} - Yala Mobile Camping`,
        html: customerEmailHtml,
      });
      console.log("✅ Customer confirmation sent to:", data.email);
    } catch (error: any) {
      console.error("❌ Failed to send customer confirmation:", error.message);
      customerEmailStatus = `❌ Failed: ${error.message}`;
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
      message: "Booking request submitted successfully! Check your email for confirmation.",
      bookingId: data.bookingId,
      emailStatus: {
        adminEmails: adminEmailSummary,
        customerEmail: customerEmailStatus,
        totalAdminEmails: Object.keys(adminEmailSummary).length
      },
      whatsappLink: `https://wa.me/94713991051?text=${encodeURIComponent(
        `Hi! I just submitted booking ${data.bookingId} for ${data.nights} nights at ${data.location.name}. Looking forward to hearing from you!`
      )}`,
    });

  } catch (error: any) {
    console.error("❌ Error processing booking:", error);
    
    return NextResponse.json(
      {
        success: false,
        message: "Failed to process booking request. Please try again or contact us directly.",
        fallback: {
          whatsapp: "https://wa.me/94713991051",
          email: `mailto:${process.env.EMAIL_USER}`,
          customEmail: process.env.ZOHO_USER ? `mailto:${process.env.ZOHO_USER}` : undefined,
        },
      },
      { status: 500 }
    );
  }
}