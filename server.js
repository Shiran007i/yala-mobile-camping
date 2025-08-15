// server.js - Express backend with ZOHO for customer emails
import express from "express";
import nodemailer from "nodemailer";
import cors from "cors";
import dotenv from "dotenv";
import {
  generateAdminEmailTemplate,
  generateCustomerEmailTemplate,
} from "./src/templates/emailTemplates.js";

// Load environment variables
dotenv.config({ path: ".env.local" });

const app = express();
const PORT = process.env.PORT || 5000;

// ===================================================================
// MIDDLEWARE CONFIGURATION
// ===================================================================
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:3000", 
      "https://4d769c8f09e8.ngrok-free.app",
    ],
    credentials: true,
  })
);
app.use(express.json());

// ===================================================================
// EMAIL TRANSPORTER CONFIGURATIONS
// ===================================================================

// Gmail transporter for admin notifications
const gmailTransporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

// ZOHO transporter for customer emails
const zohoTransporter = nodemailer.createTransport({
  host: process.env.ZOHO_HOST || "smtp.zoho.com",
  port: parseInt(process.env.ZOHO_PORT) || 465,
  secure: process.env.ZOHO_SECURE !== "false",
  auth: {
    user: process.env.ZOHO_USER,
    pass: process.env.ZOHO_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false
  }
});

// ===================================================================
// HELPER FUNCTIONS
// ===================================================================

/**
 * Send admin notifications via Gmail
 */
const sendAdminEmails = async (emailHtml, subject, envVars) => {
  const adminEmails = [];

  // Add Gmail admin email if configured
  if (process.env.ADMIN_EMAIL) {
    adminEmails.push(process.env.ADMIN_EMAIL);
  }

  // Add ZOHO admin email if configured and different
  if (process.env.ZOHO_USER && process.env.ZOHO_USER !== process.env.ADMIN_EMAIL) {
    adminEmails.push(process.env.ZOHO_USER);
  }

  console.log("📧 Admin emails to notify:", adminEmails);

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
    } catch (error) {
      console.error(`❌ Failed to send admin notification to ${adminEmail}:`, error.message);
      return { email: adminEmail, status: `❌ Failed: ${error.message}` };
    }
  });

  return await Promise.allSettled(emailPromises);
};

/**
 * Send customer email via ZOHO
 */
const sendCustomerEmail = async (emailHtml, subject, customerEmail, envVars) => {
  try {
    await zohoTransporter.sendMail({
      from: `"${envVars.EMAIL_FROM_NAME}" <${process.env.ZOHO_USER}>`,
      to: customerEmail,
      subject: subject,
      html: emailHtml,
      replyTo: process.env.ZOHO_USER,
    });
    console.log(`✅ Customer confirmation sent to: ${customerEmail} (via ZOHO)`);
    return { status: "✅ Sent via ZOHO", email: customerEmail, from: process.env.ZOHO_USER };
  } catch (error) {
    console.error("❌ Failed to send customer confirmation via ZOHO:", error.message);
    throw error;
  }
};

// ===================================================================
// API ROUTES
// ===================================================================

// Health check endpoint with enhanced email config info
app.get("/api/health", (req, res) => {
  res.json({
    status: "OK",
    message: "Yala Mobile Camping API is running!",
    timestamp: new Date().toISOString(),
    emailConfig: {
      // Gmail configuration (for admin notifications)
      gmail: {
        user: process.env.EMAIL_USER ? "✅ Configured" : "❌ Missing",
        password: process.env.EMAIL_PASSWORD ? "✅ Configured" : "❌ Missing",
        purpose: "Admin Notifications"
      },
      // ZOHO configuration (for customer emails)
      zoho: {
        user: process.env.ZOHO_USER ? "✅ Configured" : "❌ Missing",
        password: process.env.ZOHO_PASSWORD ? "✅ Configured" : "❌ Missing",
        host: process.env.ZOHO_HOST || "smtp.zoho.com",
        port: process.env.ZOHO_PORT || 465,
        purpose: "Customer Emails"
      },
      // Admin recipients
      adminRecipients: [
        process.env.ADMIN_EMAIL,
        process.env.ZOHO_USER
      ].filter(email => email && email.trim())
       .filter((email, index, arr) => arr.indexOf(email) === index), // Remove duplicates
      
      totalAdminEmails: [
        process.env.ADMIN_EMAIL,
        process.env.ZOHO_USER
      ].filter(email => email && email.trim())
       .filter((email, index, arr) => arr.indexOf(email) === index).length,
       
      emailFlow: {
        customerEmails: `FROM: ${process.env.ZOHO_USER || 'NOT CONFIGURED'} (ZOHO)`,
        adminNotifications: `FROM: ${process.env.EMAIL_USER || 'NOT CONFIGURED'} (Gmail)`
      }
    },
  });
});

// Booking submission endpoint with dual transporter support
app.post("/api/booking", async (req, res) => {
  try {
    const data = req.body;

    console.log("🔥 Received booking request:", data.bookingId);

    // ===================================================================
    // VALIDATION
    // ===================================================================
    const requiredFields = [
      "bookingId", "firstName", "lastName", "email", "phone",
      "checkIn", "checkOut", "nights", "groupSize", "total", "location",
    ];

    const missingFields = requiredFields.filter((field) => !data[field]);
    if (missingFields.length > 0) {
      return res.status(400).json({
        success: false,
        message: `Missing required fields: ${missingFields.join(", ")}`,
        missingFields,
      });
    }

    // ===================================================================
    // EMAIL CONFIGURATION VALIDATION
    // ===================================================================
    const FROM_NAME = process.env.EMAIL_FROM_NAME || "Yala Mobile Camping";

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

    // Validate at least one admin email is configured
    if (!process.env.ADMIN_EMAIL && !process.env.ZOHO_USER) {
      console.error("❌ No admin emails configured!");
      throw new Error("Admin email not configured");
    }

    // Prepare environment variables object for templates
    const envVars = {
      EMAIL_USER: process.env.EMAIL_USER,
      ADMIN_EMAIL: process.env.ADMIN_EMAIL || process.env.ZOHO_USER,
      EMAIL_FROM_NAME: FROM_NAME,
      ZOHO_USER: process.env.ZOHO_USER,
    };

    // ===================================================================
    // 1. SEND ADMIN NOTIFICATION EMAILS (via Gmail)
    // ===================================================================
    console.log("📧 Generating admin email template...");
    const adminEmailHtml = generateAdminEmailTemplate(data, envVars);
    const adminSubject = `🚨 URGENT: New Camping Booking - ${data.bookingId} - ${data.firstName} ${data.lastName} ($${data.total})`;

    console.log("📧 Sending admin notifications via Gmail...");
    const adminEmailResults = await sendAdminEmails(adminEmailHtml, adminSubject, envVars);

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
    } catch (error) {
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
      } catch (fallbackError) {
        customerEmailResult = {
          status: `❌ Both ZOHO and Gmail failed: ${fallbackError.message}`,
          email: data.email
        };
      }
    }

    // ===================================================================
    // SUCCESS RESPONSE
    // ===================================================================
    console.log("✅ Email processing completed for booking:", data.bookingId);

    // Process admin email results
    const adminEmailSummary = {};
    adminEmailResults.forEach((result, index) => {
      if (result.status === "fulfilled" && result.value) {
        const { email, status } = result.value;
        adminEmailSummary[email] = status;
      } else {
        console.error("Admin email result error:", result.reason);
      }
    });

    res.json({
      success: true,
      message: "Booking request submitted successfully! Check your email for confirmation.",
      bookingId: data.bookingId,
      emailStatus: {
        adminEmails: adminEmailSummary,
        customerEmail: customerEmailResult,
        totalAdminEmails: Object.keys(adminEmailSummary).length,
        emailConfiguration: {
          adminNotifications: "Sent via Gmail",
          customerConfirmation: customerEmailResult.status.includes("ZOHO") ? "Sent via ZOHO" : "Sent via Gmail (fallback)",
          customerSentFrom: customerEmailResult.from
        }
      },
      whatsappLink: `https://wa.me/94713585926?text=${encodeURIComponent(
        `Hi! I just submitted a booking request (ID: ${data.bookingId}) for ${data.nights} nights at ${data.location.name}. Looking forward to hearing from you!`
      )}`,
    });

  } catch (error) {
    console.error("❌ Error processing booking request:", error);

    res.status(500).json({
      success: false,
      message: "Failed to process booking request. Please try again or contact us directly.",
      error: process.env.NODE_ENV === "development" ? error.message : "Internal server error",
      timestamp: new Date().toISOString(),
      fallback: {
        whatsapp: "https://wa.me/94713585926",
        email: `mailto:${process.env.ZOHO_USER || process.env.EMAIL_USER}`,
      },
    });
  }
});

// ===================================================================
// EMAIL TESTING ENDPOINTS (DEVELOPMENT ONLY)
// ===================================================================
if (process.env.NODE_ENV === "development") {
  
  // Test ZOHO connection
  app.get("/api/test-zoho", async (req, res) => {
    try {
      console.log("🧪 Testing ZOHO connection...");
      
      const testResult = await zohoTransporter.sendMail({
        from: `"${process.env.EMAIL_FROM_NAME || 'Test'}" <${process.env.ZOHO_USER}>`,
        to: process.env.ADMIN_EMAIL || process.env.ZOHO_USER, // Send to admin for testing
        subject: "🧪 ZOHO Connection Test - Yala Mobile Camping",
        html: `
          <h2>✅ ZOHO Email Service Test</h2>
          <p>This is a test email sent via ZOHO SMTP to verify the configuration.</p>
          <p><strong>Sent from:</strong> ${process.env.ZOHO_USER}</p>
          <p><strong>Timestamp:</strong> ${new Date().toISOString()}</p>
          <p><strong>Host:</strong> ${process.env.ZOHO_HOST || 'smtp.zoho.com'}</p>
          <p><strong>Port:</strong> ${process.env.ZOHO_PORT || 465}</p>
          <hr>
          <p><em>If you received this, ZOHO email configuration is working correctly!</em></p>
        `,
      });

      res.json({
        success: true,
        message: "ZOHO test email sent successfully!",
        messageId: testResult.messageId,
        from: process.env.ZOHO_USER,
        to: process.env.ADMIN_EMAIL || process.env.ZOHO_USER,
        timestamp: new Date().toISOString(),
      });

    } catch (error) {
      console.error("❌ ZOHO test failed:", error);
      res.status(500).json({
        success: false,
        message: "ZOHO test failed",
        error: error.message,
        config: {
          host: process.env.ZOHO_HOST || 'smtp.zoho.com',
          port: process.env.ZOHO_PORT || 465,
          user: process.env.ZOHO_USER,
          hasPassword: !!process.env.ZOHO_PASSWORD,
        }
      });
    }
  });

  // Test complete booking email flow
  app.post("/api/test-booking-emails", async (req, res) => {
    try {
      const testData = {
        bookingId: "YMC-TEST-" + Date.now(),
        firstName: "Test",
        lastName: "Customer",
        email: process.env.ADMIN_EMAIL || process.env.ZOHO_USER, // Send to admin for testing
        phone: "0712345678",
        checkIn: "2024-03-15",
        checkOut: "2024-03-16",
        nights: 1,
        groupSize: 2,
        accommodationType: "Safari Tent",
        mealPlan: "Full Board",
        total: 950,
        location: {
          name: "Yala Mobile Camp",
          location: "Yala National Park",
          price_per_night: 950,
        },
        submittedAt: new Date().toISOString(),
      };

      const envVars = {
        EMAIL_USER: process.env.EMAIL_USER,
        ADMIN_EMAIL: process.env.ADMIN_EMAIL,
        EMAIL_FROM_NAME: "Yala Mobile Camping (TEST)",
        ZOHO_USER: process.env.ZOHO_USER,
      };

      // Test admin notifications (Gmail)
      console.log("🧪 Testing admin notifications via Gmail...");
      const adminEmailHtml = generateAdminEmailTemplate(testData, envVars);
      const adminResults = await sendAdminEmails(
        adminEmailHtml,
        `🧪 TEST: Admin Notification - ${testData.bookingId}`,
        envVars
      );

      // Test customer email (ZOHO)
      console.log("🧪 Testing customer email via ZOHO...");
      const customerEmailHtml = generateCustomerEmailTemplate(testData, envVars);
      const customerResult = await sendCustomerEmail(
        customerEmailHtml,
        `🧪 TEST: Customer Confirmation - ${testData.bookingId}`,
        testData.email,
        envVars
      );

      res.json({
        success: true,
        message: "Test booking emails sent successfully!",
        results: {
          adminEmails: adminResults.map(r => r.status === 'fulfilled' ? r.value : { error: r.reason }),
          customerEmail: customerResult,
        },
        testData: { bookingId: testData.bookingId },
        configuration: {
          adminVia: "Gmail",
          customerVia: "ZOHO",
          sentTo: testData.email
        }
      });

    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Test booking emails failed",
        error: error.message,
      });
    }
  });
}

// ===================================================================
// SERVER STARTUP
// ===================================================================
app.listen(PORT, () => {
  console.log(`🚀 Yala Mobile Camping API Server running on http://localhost:${PORT}`);
  console.log(`📧 Gmail sender (admin notifications): ${process.env.EMAIL_USER || "NOT CONFIGURED"}`);
  console.log(`📧 ZOHO sender (customer emails): ${process.env.ZOHO_USER || "NOT CONFIGURED"}`);
  console.log(`📧 Gmail admin recipient: ${process.env.ADMIN_EMAIL || "NOT CONFIGURED"}`);

  // Count unique admin emails
  const adminEmails = [process.env.ADMIN_EMAIL, process.env.ZOHO_USER]
    .filter((email) => email && email.trim())
    .filter((email, index, arr) => arr.indexOf(email) === index);

  console.log(`📊 Total admin notification emails: ${adminEmails.length}`);
  if (adminEmails.length > 0) {
    adminEmails.forEach((email, index) => {
      console.log(`   ${index + 1}. ${email}`);
    });
  }

  console.log(`🌐 Email Flow Configuration:`);
  console.log(`   • Customer emails: ${process.env.ZOHO_USER || 'NOT CONFIGURED'} → Customer (via ZOHO)`);
  console.log(`   • Admin notifications: ${process.env.EMAIL_USER || 'NOT CONFIGURED'} → Admins (via Gmail)`);
  console.log(`⏰ Server started at: ${new Date().toLocaleString()}`);

  if (process.env.NODE_ENV === "development") {
    console.log(`🧪 ZOHO Testing: GET http://localhost:${PORT}/api/test-zoho`);
    console.log(`🧪 Booking Email Testing: POST http://localhost:${PORT}/api/test-booking-emails`);
  }
});

export default app;