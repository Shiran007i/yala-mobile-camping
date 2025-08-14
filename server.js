// server.js - Express backend with dual admin email support
import express from "express";
import nodemailer from "nodemailer";
import cors from "cors";
import dotenv from "dotenv";
import { 
  generateAdminEmailTemplate, 
  generateCustomerEmailTemplate 
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
// EMAIL TRANSPORTER CONFIGURATION (Using Gmail for sending)
// ===================================================================
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

// ===================================================================
// HELPER FUNCTION: Send to multiple admin emails
// ===================================================================
const sendAdminEmails = async (emailHtml, subject, envVars) => {
  const adminEmails = [];
  
  // Add Gmail admin email if configured
  if (process.env.ADMIN_EMAIL) {
    adminEmails.push(process.env.ADMIN_EMAIL);
  }
  
  // Add custom domain email if configured
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
    } catch (error) {
      console.error(`❌ Failed to send admin notification to ${adminEmail}:`, error.message);
      return { email: adminEmail, status: `❌ Failed: ${error.message}` };
    }
  });
  
  return await Promise.allSettled(emailPromises);
};

// ===================================================================
// API ROUTES
// ===================================================================

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({
    status: "OK",
    message: "Yala Mobile Camping API is running!",
    timestamp: new Date().toISOString(),
    emailConfig: {
      emailUser: process.env.EMAIL_USER ? "✅ Configured" : "❌ Missing",
      gmailAdmin: process.env.ADMIN_EMAIL ? "✅ Configured" : "❌ Missing",
      customDomainAdmin: process.env.ZOHO_USER ? "✅ Configured" : "❌ Missing",
      adminEmailCount: [process.env.ADMIN_EMAIL, process.env.ZOHO_USER]
        .filter(email => email && email.trim())
        .filter((email, index, arr) => arr.indexOf(email) === index) // Remove duplicates
        .length
    },
  });
});

// Booking submission endpoint
app.post("/api/booking", async (req, res) => {
  try {
    const data = req.body;

    console.log("🔥 Received booking request:", data.bookingId);

    // ===================================================================
    // VALIDATION
    // ===================================================================
    const requiredFields = [
      "bookingId", "firstName", "lastName", "email", "phone", 
      "checkIn", "checkOut", "nights", "groupSize", "total", "location"
    ];
    
    const missingFields = requiredFields.filter(field => !data[field]);
    if (missingFields.length > 0) {
      return res.status(400).json({
        success: false,
        message: `Missing required fields: ${missingFields.join(", ")}`,
        missingFields,
      });
    }

    // ===================================================================
    // EMAIL CONFIGURATION
    // ===================================================================
    const FROM_NAME = process.env.EMAIL_FROM_NAME || "Yala Mobile Camping";

    console.log("📧 Email Configuration Check:");
    console.log("EMAIL_USER (sender):", process.env.EMAIL_USER);
    console.log("ADMIN_EMAIL (Gmail):", process.env.ADMIN_EMAIL);
    console.log("ZOHO_USER (Custom Domain):", process.env.ZOHO_USER);
    console.log("Customer email:", data.email);

    // Validate that at least one admin email is configured
    if (!process.env.ADMIN_EMAIL && !process.env.ZOHO_USER) {
      console.error("❌ No admin emails configured!");
      throw new Error("Admin email not configured");
    }

    // Prepare environment variables object for templates
    const envVars = {
      EMAIL_USER: process.env.EMAIL_USER,
      ADMIN_EMAIL: process.env.ADMIN_EMAIL || process.env.ZOHO_USER,
      EMAIL_FROM_NAME: FROM_NAME,
    };

    // ===================================================================
    // 1. SEND ADMIN NOTIFICATION EMAILS (to both Gmail and custom domain)
    // ===================================================================
    console.log("📧 Generating admin email template...");
    const adminEmailHtml = generateAdminEmailTemplate(data, envVars);
    const adminSubject = `🚨 URGENT: New Camping Booking - ${data.bookingId} - ${data.firstName} ${data.lastName} ($${data.total})`;

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
    } catch (error) {
      console.error("❌ Failed to send customer confirmation:", error.message);
      customerEmailStatus = `❌ Failed: ${error.message}`;
    }

    // ===================================================================
    // SUCCESS RESPONSE
    // ===================================================================
    console.log("✅ Email processing completed for booking:", data.bookingId);
    
    // Process admin email results
    const adminEmailSummary = {};
    adminEmailResults.forEach((result, index) => {
      if (result.status === 'fulfilled' && result.value) {
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
        customerEmail: customerEmailStatus,
        totalAdminEmails: Object.keys(adminEmailSummary).length
      },
      whatsappLink: `https://wa.me/94713991051?text=${encodeURIComponent(
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
        whatsapp: "https://wa.me/94713991051",
        email: `mailto:${process.env.EMAIL_USER}`,
        customEmail: process.env.ZOHO_USER ? `mailto:${process.env.ZOHO_USER}` : undefined,
      },
    });
  }
});

// ===================================================================
// EMAIL TEMPLATE TEST ENDPOINT (DEVELOPMENT ONLY)
// ===================================================================
if (process.env.NODE_ENV === "development") {
  app.get("/api/test-templates", (req, res) => {
    // Sample test data
    const testData = {
      bookingId: "YMC-TEST-001",
      firstName: "John",
      lastName: "Doe", 
      email: "john.doe@example.com",
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
        price_per_night: 950
      },
      specialRequests: "Please arrange vegetarian meals and early morning safari.",
      submittedAt: new Date().toISOString()
    };

    const envVars = {
      EMAIL_USER: process.env.EMAIL_USER || "test@example.com",
      ADMIN_EMAIL: process.env.ADMIN_EMAIL || "admin@example.com", 
      EMAIL_FROM_NAME: "Yala Mobile Camping",
    };

    try {
      const adminTemplate = generateAdminEmailTemplate(testData, envVars);
      const customerTemplate = generateCustomerEmailTemplate(testData, envVars);

      res.json({
        success: true,
        message: "Email templates generated successfully",
        templates: {
          admin: {
            length: adminTemplate.length,
            preview: adminTemplate.substring(0, 200) + "...",
          },
          customer: {
            length: customerTemplate.length, 
            preview: customerTemplate.substring(0, 200) + "...",
          },
        },
        emailConfig: {
          gmailAdmin: process.env.ADMIN_EMAIL,
          customDomainAdmin: process.env.ZOHO_USER,
          sender: process.env.EMAIL_USER
        },
        testData,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Failed to generate email templates",
        error: error.message,
      });
    }
  });

  // Test email sending endpoint
  app.post("/api/test-emails", async (req, res) => {
    try {
      const { testType = "both" } = req.body;
      
      const testData = {
        bookingId: "YMC-TEST-" + Date.now(),
        firstName: "Test",
        lastName: "User",
        email: "test@example.com",
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
          price_per_night: 950
        },
        submittedAt: new Date().toISOString()
      };

      const envVars = {
        EMAIL_USER: process.env.EMAIL_USER,
        ADMIN_EMAIL: process.env.ADMIN_EMAIL,
        EMAIL_FROM_NAME: "Yala Mobile Camping",
      };

      let results = {};

      if (testType === "admin" || testType === "both") {
        console.log("🧪 Testing admin email notifications...");
        const adminEmailHtml = generateAdminEmailTemplate(testData, envVars);
        const adminSubject = `🧪 TEST: Admin Email - ${testData.bookingId}`;
        
        const adminResults = await sendAdminEmails(adminEmailHtml, adminSubject, envVars);
        results.adminEmails = adminResults.map(result => 
          result.status === 'fulfilled' ? result.value : { error: result.reason }
        );
      }

      if (testType === "customer" || testType === "both") {
        console.log("🧪 Testing customer email...");
        // For testing, we'll send to the configured admin emails instead of a test email
        const testCustomerEmail = process.env.ADMIN_EMAIL || process.env.ZOHO_USER;
        
        const customerEmailHtml = generateCustomerEmailTemplate(testData, envVars);
        
        try {
          await transporter.sendMail({
            from: `"${envVars.EMAIL_FROM_NAME}" <${process.env.EMAIL_USER}>`,
            to: testCustomerEmail,
            subject: `🧪 TEST: Customer Email - ${testData.bookingId}`,
            html: customerEmailHtml,
          });
          results.customerEmail = { status: "✅ Sent", email: testCustomerEmail };
        } catch (error) {
          results.customerEmail = { status: `❌ Failed: ${error.message}`, email: testCustomerEmail };
        }
      }

      res.json({
        success: true,
        message: "Test emails processed",
        results,
        testData: { bookingId: testData.bookingId }
      });

    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Failed to send test emails",
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
  console.log(`📧 Email sender configured: ${process.env.EMAIL_USER || "NOT CONFIGURED"}`);
  console.log(`📧 Gmail admin: ${process.env.ADMIN_EMAIL || "NOT CONFIGURED"}`);
  console.log(`📧 Custom domain admin: ${process.env.ZOHO_USER || "NOT CONFIGURED"}`);
  
  // Count unique admin emails
  const adminEmails = [process.env.ADMIN_EMAIL, process.env.ZOHO_USER]
    .filter(email => email && email.trim())
    .filter((email, index, arr) => arr.indexOf(email) === index);
  
  console.log(`📊 Total admin notification emails: ${adminEmails.length}`);
  if (adminEmails.length > 0) {
    adminEmails.forEach((email, index) => {
      console.log(`   ${index + 1}. ${email}`);
    });
  }
  
  console.log(`🌐 CORS enabled for: http://localhost:5173, ngrok tunnel`);
  console.log(`⏰ Server started at: ${new Date().toLocaleString()}`);
  
  if (process.env.NODE_ENV === "development") {
    console.log(`🧪 Template testing: http://localhost:${PORT}/api/test-templates`);
    console.log(`📧 Email testing: POST http://localhost:${PORT}/api/test-emails`);
  }
});

export default app;