// src/services/emailService.js
/**
 * Email Service Helper Functions
 * Centralized email sending logic with ZOHO for customer emails
 */

import nodemailer from "nodemailer";
import { generateAdminEmailTemplate, generateCustomerEmailTemplate } from "../templates/emailTemplates.js";

/**
 * Create Gmail transporter for admin notifications
 */
export const createGmailTransporter = () => {
  return nodemailer.createTransporter({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
};

/**
 * Create ZOHO transporter for customer emails
 */
export const createZohoTransporter = () => {
  return nodemailer.createTransporter({
    host: process.env.ZOHO_HOST || "smtp.zoho.com",
    port: parseInt(process.env.ZOHO_PORT) || 465,
    secure: process.env.ZOHO_SECURE !== "false", // true for 465, false for other ports
    auth: {
      user: process.env.ZOHO_USER,
      pass: process.env.ZOHO_PASSWORD,
    },
    tls: {
      rejectUnauthorized: false
    }
  });
};

/**
 * Send admin notification emails using Gmail
 * @param {Object} bookingData - Booking information
 * @param {Object} envVars - Environment variables
 * @returns {Promise} Send mail results
 */
export const sendAdminNotifications = async (bookingData, envVars) => {
  const gmailTransporter = createGmailTransporter();
  const adminEmailHtml = generateAdminEmailTemplate(bookingData, envVars);
  
  const adminEmails = [];
  
  // Add Gmail admin email if configured
  if (process.env.ADMIN_EMAIL) {
    adminEmails.push(process.env.ADMIN_EMAIL);
  }
  
  // Add ZOHO admin email if configured and different from Gmail admin
  if (process.env.ZOHO_USER && process.env.ZOHO_USER !== process.env.ADMIN_EMAIL) {
    adminEmails.push(process.env.ZOHO_USER);
  }

  console.log("📧 Admin emails to notify:", adminEmails);

  const emailPromises = adminEmails.map(async (adminEmail) => {
    try {
      const result = await gmailTransporter.sendMail({
        from: `"${envVars.EMAIL_FROM_NAME}" <${envVars.EMAIL_USER}>`,
        to: adminEmail,
        subject: `🚨 URGENT BOOKING: $${bookingData.total} - ${bookingData.bookingId} - ${bookingData.firstName} ${bookingData.lastName}`,
        html: adminEmailHtml,
        priority: "high",
        headers: {
          "X-Priority": "1",
          "X-MSMail-Priority": "High",
          "Importance": "high",
        },
      });
      
      console.log(`✅ Admin notification sent to: ${adminEmail}`);
      return { email: adminEmail, status: "✅ Sent", messageId: result.messageId };
    } catch (error) {
      console.error(`❌ Failed to send admin notification to ${adminEmail}:`, error.message);
      return { email: adminEmail, status: `❌ Failed: ${error.message}` };
    }
  });

  return await Promise.allSettled(emailPromises);
};

/**
 * Send customer confirmation email using ZOHO
 * @param {Object} bookingData - Booking information
 * @param {Object} envVars - Environment variables
 * @returns {Promise} Send mail promise
 */
export const sendCustomerConfirmation = async (bookingData, envVars) => {
  const zohoTransporter = createZohoTransporter();
  const customerEmailHtml = generateCustomerEmailTemplate(bookingData, envVars);
  
  try {
    const result = await zohoTransporter.sendMail({
      from: `"${envVars.EMAIL_FROM_NAME}" <${process.env.ZOHO_USER}>`,
      to: bookingData.email,
      subject: `🏕️ Booking Request Received - ${bookingData.bookingId} - Yala Mobile Camping`,
      html: customerEmailHtml,
      // Add reply-to so replies go to your business email
      replyTo: process.env.ZOHO_USER,
    });

    console.log(`✅ Customer confirmation sent to: ${bookingData.email} from ZOHO`);
    return {
      status: "✅ Sent via ZOHO",
      messageId: result.messageId,
      from: process.env.ZOHO_USER,
      to: bookingData.email
    };
  } catch (error) {
    console.error("❌ Failed to send customer confirmation via ZOHO:", error.message);
    throw error;
  }
};

/**
 * Send both admin and customer emails with proper transporters
 * @param {Object} bookingData - Booking information
 * @returns {Promise<Object>} Result object with success status and details
 */
export const sendBookingEmails = async (bookingData) => {
  try {
    // Prepare environment variables
    const envVars = {
      EMAIL_USER: process.env.EMAIL_USER,
      ADMIN_EMAIL: process.env.ADMIN_EMAIL,
      ZOHO_USER: process.env.ZOHO_USER,
      EMAIL_FROM_NAME: process.env.EMAIL_FROM_NAME || "Yala Mobile Camping",
    };

    // Validate configuration
    if (!envVars.ADMIN_EMAIL && !envVars.ZOHO_USER) {
      throw new Error("At least one admin email must be configured");
    }

    if (!envVars.EMAIL_USER) {
      throw new Error("Gmail EMAIL_USER not configured for admin notifications");
    }

    if (!envVars.ZOHO_USER || !process.env.ZOHO_PASSWORD) {
      throw new Error("ZOHO credentials not configured for customer emails");
    }

    console.log("📧 Email Configuration:");
    console.log("- Admin notifications FROM:", envVars.EMAIL_USER, "(Gmail)");
    console.log("- Customer emails FROM:", envVars.ZOHO_USER, "(ZOHO)");

    // Send admin notifications and customer confirmation concurrently
    const [adminResults, customerResult] = await Promise.all([
      sendAdminNotifications(bookingData, envVars),
      sendCustomerConfirmation(bookingData, envVars)
    ]);

    // Process admin results
    const adminEmailSummary = {};
    adminResults.forEach((result) => {
      if (result.status === "fulfilled" && result.value) {
        const { email, status } = result.value;
        adminEmailSummary[email] = status;
      } else if (result.reason) {
        console.error("Admin email result error:", result.reason);
      }
    });

    console.log("✅ All booking emails processed successfully!");

    return {
      success: true,
      adminEmails: adminEmailSummary,
      customerEmail: customerResult,
      configuration: {
        adminTransporter: "Gmail",
        customerTransporter: "ZOHO",
        adminSender: envVars.EMAIL_USER,
        customerSender: envVars.ZOHO_USER
      }
    };

  } catch (error) {
    console.error("❌ Error sending booking emails:", error);
    throw error;
  }
};