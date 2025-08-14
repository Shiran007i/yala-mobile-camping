// src/services/emailService.js
/**
 * Email Service Helper Functions
 * Centralized email sending logic
 */

import nodemailer from "nodemailer";
import { generateAdminEmailTemplate, generateCustomerEmailTemplate } from "../templates/emailTemplates.js";

/**
 * Create email transporter
 */
export const createEmailTransporter = () => {
  return nodemailer.createTransporter({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
};

/**
 * Send admin notification email
 * @param {Object} transporter - Nodemailer transporter
 * @param {Object} bookingData - Booking information
 * @param {Object} envVars - Environment variables
 * @returns {Promise} Send mail promise
 */
export const sendAdminNotification = async (transporter, bookingData, envVars) => {
  const adminEmailHtml = generateAdminEmailTemplate(bookingData, envVars);
  
  const mailOptions = {
    from: `"${envVars.EMAIL_FROM_NAME}" <${envVars.EMAIL_USER}>`,
    to: envVars.ADMIN_EMAIL,
    subject: `🚨 URGENT BOOKING: $${bookingData.total} - ${bookingData.bookingId} - ${bookingData.firstName} ${bookingData.lastName}`,
    html: adminEmailHtml,
    priority: "high",
    headers: {
      "X-Priority": "1",
      "X-MSMail-Priority": "High",
      "Importance": "high",
    },
  };

  return await transporter.sendMail(mailOptions);
};

/**
 * Send customer confirmation email
 * @param {Object} transporter - Nodemailer transporter
 * @param {Object} bookingData - Booking information
 * @param {Object} envVars - Environment variables
 * @returns {Promise} Send mail promise
 */
export const sendCustomerConfirmation = async (transporter, bookingData, envVars) => {
  const customerEmailHtml = generateCustomerEmailTemplate(bookingData, envVars);
  
  const mailOptions = {
    from: `"${envVars.EMAIL_FROM_NAME}" <${envVars.EMAIL_USER}>`,
    to: bookingData.email,
    subject: `🏕️ Booking Request Received - ${bookingData.bookingId} - Yala Mobile Camping`,
    html: customerEmailHtml,
  };

  return await transporter.sendMail(mailOptions);
};

/**
 * Send both admin and customer emails
 * @param {Object} bookingData - Booking information
 * @returns {Promise<Object>} Result object with success status and details
 */
export const sendBookingEmails = async (bookingData) => {
  try {
    // Prepare environment variables
    const envVars = {
      EMAIL_USER: process.env.EMAIL_USER,
      ADMIN_EMAIL: process.env.ADMIN_EMAIL,
      EMAIL_FROM_NAME: process.env.EMAIL_FROM_NAME || "Yala Mobile Camping",
    };

    // Validate configuration
    if (!envVars.ADMIN_EMAIL) {
      throw new Error("ADMIN_EMAIL not configured in environment variables");
    }

    if (!envVars.EMAIL_USER) {
      throw new Error("EMAIL_USER not configured in environment variables");
    }

    // Create transporter
    const transporter = createEmailTransporter();

    // Send both emails concurrently
    const [adminResult, customerResult] = await Promise.all([
      sendAdminNotification(transporter, bookingData, envVars),
      sendCustomerConfirmation(transporter, bookingData, envVars)
    ]);

    console.log("✅ Both emails sent successfully!");
    console.log("📧 Admin notification sent to:", envVars.ADMIN_EMAIL);
    console.log("📧 Customer confirmation sent to:", bookingData.email);

    return {
      success: true,
      adminEmail: {
        messageId: adminResult.messageId,
        recipient: envVars.ADMIN_EMAIL,
        status: "sent"
      },
      customerEmail: {
        messageId: customerResult.messageId,
        recipient: bookingData.email,
        status: "sent"
      }
    };

  } catch (error) {
    console.error("❌ Error sending booking emails:", error);
    throw error;
  }
};