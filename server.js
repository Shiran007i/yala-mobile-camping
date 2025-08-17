// server.js - Enhanced Express backend with Newsletter Subscription/Unsubscribe
import express from "express";
import nodemailer from "nodemailer";
import cors from "cors";
import dotenv from "dotenv";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import {
  generateAdminEmailTemplate,
  generateCustomerEmailTemplate,
} from "./src/templates/emailTemplates.js";

// ES6 dirname setup
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
      "https://yalamobilecamping.com",
      "https://www.yalamobilecamping.com"
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
// NEWSLETTER STORAGE (Simple File-based - Replace with Database in Production)
// ===================================================================

const SUBSCRIBERS_FILE = path.join(__dirname, 'data', 'subscribers.json');

// Ensure data directory exists
const ensureDataDirectory = async () => {
  const dataDir = path.join(__dirname, 'data');
  try {
    await fs.access(dataDir);
  } catch {
    await fs.mkdir(dataDir, { recursive: true });
  }
};

// Read subscribers from file
const readSubscribers = async () => {
  try {
    await ensureDataDirectory();
    const data = await fs.readFile(SUBSCRIBERS_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    if (error.code === 'ENOENT') {
      // File doesn't exist, return empty array
      return [];
    }
    console.error('Error reading subscribers file:', error);
    throw error;
  }
};

// Write subscribers to file
const writeSubscribers = async (subscribers) => {
  try {
    await ensureDataDirectory();
    await fs.writeFile(SUBSCRIBERS_FILE, JSON.stringify(subscribers, null, 2));
  } catch (error) {
    console.error('Error writing subscribers file:', error);
    throw error;
  }
};

// Add subscriber
const addSubscriber = async (email, source = 'unknown') => {
  const subscribers = await readSubscribers();
  const existingIndex = subscribers.findIndex(sub => sub.email.toLowerCase() === email.toLowerCase());
  
  if (existingIndex !== -1) {
    // Update existing subscriber
    subscribers[existingIndex] = {
      ...subscribers[existingIndex],
      lastUpdated: new Date().toISOString(),
      active: true
    };
  } else {
    // Add new subscriber
    subscribers.push({
      email: email.toLowerCase(),
      subscribedAt: new Date().toISOString(),
      lastUpdated: new Date().toISOString(),
      source: source,
      active: true,
      id: Date.now().toString()
    });
  }
  
  await writeSubscribers(subscribers);
  return subscribers.length;
};

// Remove/Deactivate subscriber
const removeSubscriber = async (email) => {
  const subscribers = await readSubscribers();
  const existingIndex = subscribers.findIndex(sub => sub.email.toLowerCase() === email.toLowerCase());
  
  if (existingIndex !== -1) {
    // Mark as inactive instead of deleting (for analytics)
    subscribers[existingIndex].active = false;
    subscribers[existingIndex].unsubscribedAt = new Date().toISOString();
    await writeSubscribers(subscribers);
    return true;
  }
  
  return false;
};

// Check if email is subscribed
const isSubscribed = async (email) => {
  const subscribers = await readSubscribers();
  const subscriber = subscribers.find(sub => sub.email.toLowerCase() === email.toLowerCase());
  return subscriber && subscriber.active;
};

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

/**
 * Generate newsletter subscription confirmation email template
 */
const generateSubscriptionEmailTemplate = (email, envVars) => {
  const unsubscribeUrl = `${process.env.FRONTEND_URL || 'https://yalamobilecamping.com'}/unsubscribe?email=${encodeURIComponent(email)}`;
  
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Welcome to Yala Mobile Camping Newsletter!</title>
      <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; background-color: #f4f4f4; margin: 0; padding: 0; }
        .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 10px; overflow: hidden; box-shadow: 0 0 20px rgba(0,0,0,0.1); }
        .header { background: linear-gradient(135deg, #059669 0%, #047857 100%); color: white; text-align: center; padding: 30px 20px; }
        .header h1 { margin: 0; font-size: 28px; font-weight: bold; }
        .header p { margin: 10px 0 0 0; opacity: 0.9; font-size: 16px; }
        .content { padding: 30px; }
        .welcome-box { background: #f0fdf4; border-left: 4px solid #059669; padding: 20px; margin: 20px 0; border-radius: 5px; }
        .feature { display: flex; align-items: center; margin: 15px 0; padding: 15px; background: #f9fafb; border-radius: 8px; }
        .feature-icon { font-size: 24px; margin-right: 15px; }
        .cta-button { display: inline-block; background: #059669; color: white; padding: 12px 25px; text-decoration: none; border-radius: 25px; font-weight: bold; margin: 20px 0; text-align: center; transition: background 0.3s; }
        .cta-button:hover { background: #047857; }
        .footer { background: #f3f4f6; padding: 20px; text-align: center; font-size: 14px; color: #6b7280; }
        .social-links { margin: 15px 0; }
        .social-links a { display: inline-block; margin: 0 8px; padding: 8px; background: #e5e7eb; border-radius: 50%; text-decoration: none; color: #374151; }
        .unsubscribe { margin-top: 20px; font-size: 12px; color: #9ca3af; }
        .unsubscribe a { color: #059669; text-decoration: none; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🎉 Welcome to Our Adventure Community!</h1>
          <p>Thank you for subscribing to Yala Mobile Camping newsletter</p>
        </div>
        
        <div class="content">
          <div class="welcome-box">
            <h2 style="color: #059669; margin-top: 0;">🏕️ Welcome Aboard, Fellow Explorer!</h2>
            <p>You've successfully joined our community of adventure seekers and wildlife enthusiasts! Get ready for exclusive content, special offers, and insider tips for your next Sri Lankan adventure.</p>
          </div>
          
          <h3>What to expect from our newsletter:</h3>
          
          <div class="feature">
            <div class="feature-icon">🦎</div>
            <div>
              <strong>Wildlife Updates</strong><br>
              Latest sightings, seasonal wildlife patterns, and photography tips
            </div>
          </div>
          
          <div class="feature">
            <div class="feature-icon">💰</div>
            <div>
              <strong>Exclusive Offers</strong><br>
              Special discounts, early bird booking opportunities, and member-only deals
            </div>
          </div>
          
          <div class="feature">
            <div class="feature-icon">📸</div>
            <div>
              <strong>Adventure Stories</strong><br>
              Guest experiences, stunning photography, and behind-the-scenes content
            </div>
          </div>
          
          <div class="feature">
            <div class="feature-icon">🗓️</div>
            <div>
              <strong>Best Times to Visit</strong><br>
              Seasonal guides, weather updates, and optimal booking periods
            </div>
          </div>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="https://yalamobilecamping.com" class="cta-button">
              🌟 Explore Our Packages
            </a>
          </div>
          
          <div style="background: #fef3c7; padding: 20px; border-radius: 8px; border-left: 4px solid #f59e0b;">
            <h4 style="margin-top: 0; color: #92400e;">🔥 Ready for Your First Adventure?</h4>
            <p>Our most popular package includes luxury mobile camping, guided safaris, and authentic Sri Lankan cuisine starting from just $950 for 2 persons.</p>
            <p><strong>📞 WhatsApp:</strong> <a href="https://wa.me/94713585926" style="color: #059669;">+94 71 358 5926</a></p>
          </div>
        </div>
        
        <div class="footer">
          <div class="social-links">
            <strong>Follow our adventures:</strong><br>
            <a href="#" title="Facebook">📘</a>
            <a href="#" title="Instagram">📷</a>
            <a href="#" title="Twitter">🐦</a>
          </div>
          
          <p>
            <strong>Yala Mobile Camping</strong><br>
            No-795/6, Wilhelm Garden, Welipillewa, Dadigamuwa<br>
            Sri Lanka 🇱🇰<br>
            📧 ${envVars.ZOHO_USER || 'info@yalamobilecamping.com'} | 📞 +94 71 633 5000
          </p>
          
          <div class="unsubscribe">
            <p>You're receiving this email because you subscribed to our newsletter at ${new Date().toLocaleDateString()}.</p>
            <p>
              <a href="${unsubscribeUrl}">Unsubscribe</a> | 
              <a href="mailto:${envVars.ZOHO_USER || 'info@yalamobilecamping.com'}">Contact Us</a> | 
              <a href="https://yalamobilecamping.com/privacy">Privacy Policy</a>
            </p>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;
};

// ===================================================================
// API ROUTES
// ===================================================================

// Health check endpoint with enhanced email config info
app.get("/api/health", async (req, res) => {
  try {
    const subscribers = await readSubscribers();
    const activeSubscribers = subscribers.filter(sub => sub.active).length;
    const totalSubscribers = subscribers.length;
    
    res.json({
      status: "OK",
      message: "Yala Mobile Camping API is running!",
      timestamp: new Date().toISOString(),
      newsletterStats: {
        activeSubscribers,
        totalSubscribers,
        unsubscribed: totalSubscribers - activeSubscribers
      },
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
          purpose: "Customer Emails & Newsletter"
        },
        // Admin recipients
        adminRecipients: [
          process.env.ADMIN_EMAIL,
          process.env.ZOHO_USER
        ].filter(email => email && email.trim())
         .filter((email, index, arr) => arr.indexOf(email) === index), // Remove duplicates
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "ERROR",
      message: "Health check failed",
      error: error.message
    });
  }
});

// Newsletter subscription endpoint
app.post("/api/newsletter/subscribe", async (req, res) => {
  try {
    const { email, source = 'website', timestamp } = req.body;
    
    console.log("📧 Newsletter subscription request:", email);
    
    // Validation
    if (!email || !email.trim()) {
      return res.status(400).json({
        success: false,
        message: "Email address is required"
      });
    }
    
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid email address"
      });
    }
    
    const normalizedEmail = email.trim().toLowerCase();
    
    // Check if already subscribed and active
    if (await isSubscribed(normalizedEmail)) {
      return res.status(200).json({
        success: true,
        message: "You're already subscribed to our newsletter!",
        alreadySubscribed: true
      });
    }
    
    // Add subscriber
    await addSubscriber(normalizedEmail, source);
    
    // Send confirmation email to subscriber
    if (process.env.ZOHO_USER && process.env.ZOHO_PASSWORD) {
      try {
        const envVars = {
          EMAIL_FROM_NAME: process.env.EMAIL_FROM_NAME || "Yala Mobile Camping",
          ZOHO_USER: process.env.ZOHO_USER
        };
        
        const welcomeEmailHtml = generateSubscriptionEmailTemplate(normalizedEmail, envVars);
        
        await zohoTransporter.sendMail({
          from: `"${envVars.EMAIL_FROM_NAME}" <${process.env.ZOHO_USER}>`,
          to: normalizedEmail,
          subject: "🎉 Welcome to Yala Mobile Camping Newsletter!",
          html: welcomeEmailHtml,
          replyTo: process.env.ZOHO_USER
        });
        
        console.log(`✅ Welcome email sent to: ${normalizedEmail}`);
      } catch (emailError) {
        console.error("❌ Failed to send welcome email:", emailError.message);
        // Don't fail the entire request if email fails
      }
    }
    
    // Notify admins about new subscription
    if (process.env.EMAIL_USER && process.env.EMAIL_PASSWORD) {
      try {
        const adminEmailHtml = `
          <h2>🎉 New Newsletter Subscription</h2>
          <p><strong>Email:</strong> ${normalizedEmail}</p>
          <p><strong>Source:</strong> ${source}</p>
          <p><strong>Timestamp:</strong> ${new Date().toLocaleString()}</p>
          <p><strong>Total Active Subscribers:</strong> ${await readSubscribers().then(subs => subs.filter(s => s.active).length)}</p>
        `;
        
        await sendAdminEmails(
          adminEmailHtml,
          `📧 New Newsletter Subscription: ${normalizedEmail}`,
          { EMAIL_FROM_NAME: process.env.EMAIL_FROM_NAME || "Yala Mobile Camping" }
        );
      } catch (adminEmailError) {
        console.error("❌ Failed to send admin notification:", adminEmailError.message);
      }
    }
    
    console.log(`✅ Successfully subscribed: ${normalizedEmail}`);
    
    res.json({
      success: true,
      message: "Successfully subscribed to our newsletter! Check your email for a welcome message.",
      email: normalizedEmail
    });
    
  } catch (error) {
    console.error("❌ Newsletter subscription error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to subscribe. Please try again later.",
      error: process.env.NODE_ENV === "development" ? error.message : "Internal server error"
    });
  }
});

// Newsletter unsubscribe endpoint
app.post("/api/newsletter/unsubscribe", async (req, res) => {
  try {
    const { email } = req.body;
    
    console.log("📧 Newsletter unsubscribe request:", email);
    
    // Validation
    if (!email || !email.trim()) {
      return res.status(400).json({
        success: false,
        message: "Email address is required"
      });
    }
    
    const normalizedEmail = email.trim().toLowerCase();
    
    // Check if email exists and is subscribed
    if (!(await isSubscribed(normalizedEmail))) {
      return res.status(404).json({
        success: false,
        message: "Email address not found in our subscriber list or already unsubscribed"
      });
    }
    
    // Remove/deactivate subscriber
    const removed = await removeSubscriber(normalizedEmail);
    
    if (removed) {
      // Send unsubscribe confirmation email
      if (process.env.ZOHO_USER && process.env.ZOHO_PASSWORD) {
        try {
          const unsubscribeConfirmationHtml = `
            <!DOCTYPE html>
            <html lang="en">
            <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>Unsubscribed - Yala Mobile Camping</title>
              <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; background-color: #f4f4f4; margin: 0; padding: 20px; }
                .container { max-width: 600px; margin: 0 auto; background: white; padding: 30px; border-radius: 10px; box-shadow: 0 0 10px rgba(0,0,0,0.1); }
                .header { text-align: center; margin-bottom: 30px; }
                .content { margin-bottom: 30px; }
                .footer { background: #f8f9fa; padding: 20px; text-align: center; font-size: 14px; color: #666; margin-top: 30px; }
              </style>
            </head>
            <body>
              <div class="container">
                <div class="header">
                  <h1 style="color: #dc3545;">😢 Sorry to See You Go!</h1>
                </div>
                
                <div class="content">
                  <p>Hello,</p>
                  <p>You have successfully unsubscribed from the Yala Mobile Camping newsletter.</p>
                  <p>We're sorry to see you go! Your email <strong>${normalizedEmail}</strong> has been removed from our mailing list.</p>
                  
                  <div style="background: #fff3cd; padding: 15px; border-radius: 5px; border-left: 4px solid #ffc107; margin: 20px 0;">
                    <h4 style="margin-top: 0; color: #856404;">Changed your mind?</h4>
                    <p style="margin-bottom: 0;">You can always resubscribe by visiting our website footer or contacting us directly at info@yalamobilecamping.com</p>
                  </div>
                  
                  <p>If this was a mistake or you'd like to give us feedback about why you unsubscribed, please don't hesitate to reach out.</p>
                  
                  <p>Thank you for being part of our adventure community, and we hope to see you in the wild someday! 🦎🐘</p>
                </div>
                
                <div class="footer">
                  <p>
                    <strong>Yala Mobile Camping</strong><br>
                    📧 info@yalamobilecamping.com | 📞 +94 71 358 5926<br>
                    🌐 <a href="https://yalamobilecamping.com">yalamobilecamping.com</a>
                  </p>
                </div>
              </div>
            </body>
            </html>
          `;
          
          await zohoTransporter.sendMail({
            from: `"Yala Mobile Camping" <${process.env.ZOHO_USER}>`,
            to: normalizedEmail,
            subject: "Unsubscribed - Yala Mobile Camping Newsletter",
            html: unsubscribeConfirmationHtml,
            replyTo: process.env.ZOHO_USER
          });
          
          console.log(`✅ Unsubscribe confirmation sent to: ${normalizedEmail}`);
        } catch (emailError) {
          console.error("❌ Failed to send unsubscribe confirmation:", emailError.message);
        }
      }
      
      // Notify admins about unsubscription
      if (process.env.EMAIL_USER && process.env.EMAIL_PASSWORD) {
        try {
          const adminEmailHtml = `
            <h2>😢 Newsletter Unsubscription</h2>
            <p><strong>Email:</strong> ${normalizedEmail}</p>
            <p><strong>Timestamp:</strong> ${new Date().toLocaleString()}</p>
            <p><strong>Remaining Active Subscribers:</strong> ${await readSubscribers().then(subs => subs.filter(s => s.active).length)}</p>
          `;
          
          await sendAdminEmails(
            adminEmailHtml,
            `📧 Newsletter Unsubscription: ${normalizedEmail}`,
            { EMAIL_FROM_NAME: process.env.EMAIL_FROM_NAME || "Yala Mobile Camping" }
          );
        } catch (adminEmailError) {
          console.error("❌ Failed to send admin notification:", adminEmailError.message);
        }
      }
      
      console.log(`✅ Successfully unsubscribed: ${normalizedEmail}`);
      
      res.json({
        success: true,
        message: "You have been successfully unsubscribed from our newsletter."
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Email not found in subscriber list"
      });
    }
    
  } catch (error) {
    console.error("❌ Newsletter unsubscribe error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to unsubscribe. Please try again later.",
      error: process.env.NODE_ENV === "development" ? error.message : "Internal server error"
    });
  }
});

// Get newsletter statistics (admin only - add authentication in production)
app.get("/api/newsletter/stats", async (req, res) => {
  try {
    const subscribers = await readSubscribers();
    const activeSubscribers = subscribers.filter(sub => sub.active);
    const inactiveSubscribers = subscribers.filter(sub => !sub.active);
    
    // Group by source
    const bySource = activeSubscribers.reduce((acc, sub) => {
      acc[sub.source] = (acc[sub.source] || 0) + 1;
      return acc;
    }, {});
    
    // Recent subscriptions (last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
    const recentSubscriptions = activeSubscribers.filter(sub => 
      new Date(sub.subscribedAt) >= thirtyDaysAgo
    ).length;
    
    res.json({
      success: true,
      stats: {
        total: subscribers.length,
        active: activeSubscribers.length,
        unsubscribed: inactiveSubscribers.length,
        recentSubscriptions,
        bySource,
        latestSubscriptions: activeSubscribers
          .sort((a, b) => new Date(b.subscribedAt) - new Date(a.subscribedAt))
          .slice(0, 5)
          .map(sub => ({
            email: sub.email,
            subscribedAt: sub.subscribedAt,
            source: sub.source
          }))
      }
    });
    
  } catch (error) {
    console.error("❌ Newsletter stats error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch newsletter statistics",
      error: process.env.NODE_ENV === "development" ? error.message : "Internal server error"
    });
  }
});

// Booking submission endpoint (existing code remains the same)
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
    const adminSubject = `🚨 URGENT: New Camping Booking - ${data.bookingId} - ${data.firstName} ${data.lastName} (${data.total})`;

    console.log("📧 Sending admin notifications via Gmail...");
    const adminEmailResults = await sendAdminEmails(adminEmailHtml, adminSubject, envVars);

    // ===================================================================
    // 2. SEND CUSTOMER CONFIRMATION EMAIL (via ZOHO)
    // ===================================================================
    console.log("📧 Generating customer email template...");
    const customerEmailHtml = generateCustomerEmailTemplate(data, envVars);
    const customerSubject = `🕏️ Booking Request Received - ${data.bookingId} - Yala Mobile Camping`;

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
  
  // Test newsletter functionality
  app.post("/api/test-newsletter", async (req, res) => {
    try {
      const testEmail = process.env.ADMIN_EMAIL || process.env.ZOHO_USER;
      
      if (!testEmail) {
        return res.status(400).json({
          success: false,
          message: "No test email configured"
        });
      }
      
      console.log("🧪 Testing newsletter functionality with:", testEmail);
      
      // Test subscribe
      const subscribeResponse = await fetch(`http://localhost:${PORT}/api/newsletter/subscribe`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: testEmail,
          source: 'api_test',
          timestamp: new Date().toISOString()
        })
      });
      
      const subscribeResult = await subscribeResponse.json();
      
      // Wait a moment
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Test unsubscribe
      const unsubscribeResponse = await fetch(`http://localhost:${PORT}/api/newsletter/unsubscribe`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: testEmail
        })
      });
      
      const unsubscribeResult = await unsubscribeResponse.json();
      
      res.json({
        success: true,
        message: "Newsletter test completed",
        results: {
          subscribe: subscribeResult,
          unsubscribe: unsubscribeResult
        },
        testEmail
      });
      
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Newsletter test failed",
        error: error.message
      });
    }
  });
  
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
// SERVE UNSUBSCRIBE PAGE IN PRODUCTION (if serving static files)
// ===================================================================
app.get("/unsubscribe", (req, res) => {
  // In production, this would serve your React unsubscribe page
  // For now, just redirect to frontend
  const frontendUrl = process.env.FRONTEND_URL || 'https://yalamobilecamping.com';
  const email = req.query.email;
  const redirectUrl = email 
    ? `${frontendUrl}/unsubscribe?email=${encodeURIComponent(email)}`
    : `${frontendUrl}/unsubscribe`;
  
  res.redirect(redirectUrl);
});

// ===================================================================
// ERROR HANDLING MIDDLEWARE
// ===================================================================
app.use((err, req, res, next) => {
  console.error("💥 Unhandled error:", err);
  res.status(500).json({
    success: false,
    message: "Internal server error",
    error: process.env.NODE_ENV === "development" ? err.message : "Something went wrong"
  });
});

// Handle 404 routes
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
    availableEndpoints: [
      "GET /api/health",
      "POST /api/booking",
      "POST /api/newsletter/subscribe",
      "POST /api/newsletter/unsubscribe",
      "GET /api/newsletter/stats",
      ...(process.env.NODE_ENV === "development" ? [
        "GET /api/test-zoho",
        "POST /api/test-booking-emails",
        "POST /api/test-newsletter"
      ] : [])
    ]
  });
});

// ===================================================================
// SERVER STARTUP
// ===================================================================
app.listen(PORT, async () => {
  console.log(`🚀 Yala Mobile Camping API Server running on http://localhost:${PORT}`);
  console.log(`📧 Gmail sender (admin notifications): ${process.env.EMAIL_USER || "NOT CONFIGURED"}`);
  console.log(`📧 ZOHO sender (customer emails & newsletter): ${process.env.ZOHO_USER || "NOT CONFIGURED"}`);
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
  console.log(`   • Newsletter: ${process.env.ZOHO_USER || 'NOT CONFIGURED'} → Subscribers (via ZOHO)`);
  
  // Initialize newsletter stats
  try {
    const subscribers = await readSubscribers();
    const activeCount = subscribers.filter(sub => sub.active).length;
    console.log(`📰 Newsletter: ${activeCount} active subscribers`);
  } catch (error) {
    console.log(`📰 Newsletter: Initializing subscriber database`);
  }
  
  console.log(`⏰ Server started at: ${new Date().toLocaleString()}`);

  if (process.env.NODE_ENV === "development") {
    console.log(`\n🧪 DEVELOPMENT TESTING ENDPOINTS:`);
    console.log(`   • ZOHO Testing: GET http://localhost:${PORT}/api/test-zoho`);
    console.log(`   • Booking Email Testing: POST http://localhost:${PORT}/api/test-booking-emails`);
    console.log(`   • Newsletter Testing: POST http://localhost:${PORT}/api/test-newsletter`);
    console.log(`   • Newsletter Stats: GET http://localhost:${PORT}/api/newsletter/stats`);
  }
});

export default app;