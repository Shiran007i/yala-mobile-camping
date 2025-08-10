// server.js - Express backend for your Vite frontend
import express from "express";
import nodemailer from "nodemailer";
import cors from "cors";
import dotenv from "dotenv";

// Load environment variables
dotenv.config({ path: ".env.local" });

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
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

// Email configuration using Gmail
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({
    status: "OK",
    message: "Yala Mobile Camping API is running!",
    timestamp: new Date().toISOString(),
  });
});

// Booking submission endpoint
app.post("/api/booking", async (req, res) => {
  try {
    const data = req.body;

    console.log("📥 Received booking request:", data.bookingId);

    // Validate required fields
    const requiredFields = [
      "bookingId",
      "firstName",
      "lastName",
      "email",
      "phone",
      "checkIn",
      "checkOut",
    ];
    for (const field of requiredFields) {
      if (!data[field]) {
        return res.status(400).json({
          success: false,
          message: `Missing required field: ${field}`,
        });
      }
    }

    // 🔧 FIX: Properly set admin email - this was the issue!
    const ADMIN_EMAIL = process.env.ADMIN_EMAIL; // This should be your admin email from .env.local
    const FROM_NAME = process.env.EMAIL_FROM_NAME || "Yala Mobile Camping";

    // 🐛 DEBUG: Log email configuration to verify
    console.log("📧 Email Configuration Check:");
    console.log("EMAIL_USER (sender):", process.env.EMAIL_USER);
    console.log("ADMIN_EMAIL (recipient):", ADMIN_EMAIL);
    console.log("Customer email:", data.email);

    // Validate that we have the admin email
    if (!ADMIN_EMAIL) {
      console.error("❌ ADMIN_EMAIL not found in environment variables!");
      throw new Error("Admin email not configured");
    }

    // Format phone number for WhatsApp
    const whatsappPhone = data.phone.replace(/[^\d]/g, "").replace(/^0/, "94");

    // CORRECTED ADMIN EMAIL TEMPLATE
    // Complete Admin Email Template for both route.ts and server.js
    // Replace the adminEmailHtml section with this:

    const adminEmailHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>🚨 NEW BOOKING: ${data.bookingId}</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { 
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
      line-height: 1.6; 
      color: #333; 
      background-color: #f8fafc; 
    }
    .container { 
      max-width: 650px; 
      margin: 0 auto; 
      background: #ffffff; 
      border-radius: 12px; 
      overflow: hidden; 
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15); 
    }
    
    /* Header Styles */
    .header { 
      background: linear-gradient(135deg, #dc2626 0%, #ef4444 50%, #f87171 100%); 
      color: white; 
      padding: 30px 20px; 
      text-align: center; 
      position: relative;
    }
    .header::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="25" cy="25" r="1" fill="white" opacity="0.1"/><circle cx="75" cy="75" r="1" fill="white" opacity="0.1"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>');
    }
    .header h1 { 
      font-size: 28px; 
      font-weight: bold; 
      margin-bottom: 8px; 
      text-shadow: 0 2px 4px rgba(0,0,0,0.3);
      position: relative;
      z-index: 1;
    }
    .header p {
      font-size: 16px;
      opacity: 0.95;
      position: relative;
      z-index: 1;
    }
    
    /* Content Area */
    .content { 
      padding: 0; 
    }
    
    /* Urgent Banner */
    .urgent-banner { 
      background: linear-gradient(135deg, #fee2e2 0%, #fecaca 100%); 
      border: 2px solid #f87171; 
      margin: 25px; 
      padding: 25px; 
      border-radius: 12px; 
      text-align: center; 
      box-shadow: 0 2px 10px rgba(248, 113, 113, 0.2);
    }
    .urgent-banner h2 { 
      color: #dc2626; 
      font-size: 22px; 
      margin-bottom: 20px; 
      font-weight: bold;
    }
    .booking-highlight { 
      background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%); 
      padding: 20px; 
      border-radius: 8px; 
      border-left: 6px solid #f59e0b; 
      text-align: left;
      box-shadow: 0 2px 8px rgba(245, 158, 11, 0.2);
    }
    .booking-highlight strong {
      color: #92400e;
    }
    
    /* Section Styles */
    .section { 
      background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); 
      padding: 25px; 
      margin: 25px; 
      border-radius: 12px; 
      border-left: 6px solid #059669; 
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
    }
    .section h3 { 
      color: #1f2937; 
      font-size: 20px; 
      margin-bottom: 20px; 
      display: flex;
      align-items: center;
      gap: 10px;
    }
    
    /* Info Rows */
    .info-grid {
      display: grid;
      gap: 15px;
    }
    .info-row { 
      display: flex; 
      justify-content: space-between; 
      align-items: center;
      padding: 15px; 
      background: white;
      border-radius: 8px;
      border-left: 4px solid #10b981;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
      transition: transform 0.2s ease;
    }
    .info-row:hover {
      transform: translateX(2px);
    }
    .info-label { 
      font-weight: 700; 
      color: #374151; 
      font-size: 15px;
      flex: 0 0 45%;
    }
    .info-value { 
      color: #1f2937; 
      font-weight: 600; 
      flex: 1;
      text-align: right;
      font-size: 15px;
    }
    .info-value a {
      color: #3b82f6;
      text-decoration: none;
    }
    .info-value a:hover {
      text-decoration: underline;
    }
    
    /* Pricing Section */
    .pricing-section { 
      background: linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%); 
      border: 2px solid #10b981; 
      border-radius: 12px; 
      padding: 25px; 
      margin: 25px; 
      box-shadow: 0 4px 15px rgba(16, 185, 129, 0.15);
    }
    .pricing-header {
      color: #065f46; 
      margin-bottom: 20px;
      font-size: 20px;
      text-align: center;
      font-weight: bold;
    }
    .total-amount { 
      font-size: 32px; 
      font-weight: bold; 
      color: #059669; 
      text-align: center; 
      padding: 25px; 
      background: linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%); 
      border-radius: 10px; 
      margin: 20px 0; 
      text-shadow: 0 1px 2px rgba(0,0,0,0.1);
      border: 2px solid #10b981;
    }
    
    /* Special Requests */
    .special-requests-section {
      background: linear-gradient(135deg, #fefce8 0%, #fef3c7 100%);
      border: 2px solid #fde047;
      border-radius: 12px;
      padding: 25px;
      margin: 25px;
      box-shadow: 0 4px 15px rgba(253, 224, 71, 0.15);
    }
    .special-requests { 
      background: white; 
      border-left: 6px solid #f59e0b; 
      padding: 20px; 
      border-radius: 8px; 
      font-style: italic; 
      margin: 15px 0; 
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
      font-size: 16px;
      line-height: 1.7;
    }
    
    /* Action Buttons */
    .action-buttons { 
      background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%); 
      padding: 30px; 
      border-radius: 12px; 
      text-align: center; 
      margin: 25px; 
      border: 2px solid #93c5fd;
      box-shadow: 0 4px 15px rgba(59, 130, 246, 0.15);
    }
    .action-buttons h3 {
      color: #1e40af;
      margin-bottom: 20px;
      font-size: 22px;
    }
    .action-buttons p {
      margin-bottom: 25px; 
      font-weight: bold;
      color: #1e40af;
      font-size: 16px;
    }
    .btn { 
      display: inline-block; 
      padding: 15px 30px; 
      margin: 10px; 
      text-decoration: none; 
      border-radius: 8px; 
      font-weight: 700; 
      color: white !important; 
      font-size: 16px; 
      transition: all 0.3s ease;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
    }
    .btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 15px rgba(0, 0, 0, 0.3);
    }
    .btn-email { 
      background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%); 
    }
    .btn-whatsapp { 
      background: linear-gradient(135deg, #10b981 0%, #059669 100%); 
    }
    
    /* Footer */
    .footer-info { 
      background: linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%); 
      padding: 25px; 
      border-radius: 12px; 
      text-align: center; 
      color: #6b7280; 
      font-size: 14px; 
      margin: 25px; 
      border-top: 4px solid #9ca3af;
    }
    .footer-info strong {
      color: #374151;
    }
    
    /* Responsive Design */
    @media (max-width: 600px) { 
      .container {
        margin: 10px;
        border-radius: 8px;
      }
      .info-row { 
        flex-direction: column;
        align-items: flex-start;
        gap: 8px;
        padding: 12px;
      }
      .info-value {
        text-align: left;
        font-size: 14px;
      }
      .info-label {
        font-size: 14px;
      }
      .btn {
        display: block;
        margin: 10px 0;
        padding: 12px 20px;
        font-size: 14px;
      }
      .total-amount {
        font-size: 24px;
        padding: 20px;
      }
      .header h1 {
        font-size: 22px;
      }
      .section, .urgent-banner, .pricing-section, .action-buttons, .footer-info {
        margin: 15px;
        padding: 20px;
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <!-- Header -->
    <div class="header">
      <h1>🚨 URGENT: NEW BOOKING REQUEST</h1>
      <p>Yala Mobile Camping - Admin Notification System</p>
    </div>
    
    <!-- Content -->
    <div class="content">
      <!-- Urgent Banner -->
      <div class="urgent-banner">
        <h2>⚡ IMMEDIATE ACTION REQUIRED!</h2>
        <div class="booking-highlight">
          <strong>📋 Booking ID:</strong> ${data.bookingId}<br><br>
          <strong>💰 Total Value:</strong> $${data.total}<br><br>
          <strong>👥 Guests:</strong> ${data.groupSize} people<br><br>
          <strong>📅 Duration:</strong> ${data.nights} nights<br><br>
          <strong>🏕️ Location:</strong> ${data.location.name}<br><br>
          <strong>⏰ Submitted:</strong> ${new Date().toLocaleString("en-US", {
            timeZone: "Asia/Colombo",
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })} (Sri Lanka Time)
        </div>
      </div>

      <!-- Customer Information -->
      <div class="section">
        <h3>👤 Customer Information</h3>
        <div class="info-grid">
          <div class="info-row">
            <span class="info-label">🏷️ Full Name:</span>
            <span class="info-value">${data.firstName} ${data.lastName}</span>
          </div>
          <div class="info-row">
            <span class="info-label">📧 Email Address:</span>
            <span class="info-value"><a href="mailto:${data.email}">${
      data.email
    }</a></span>
          </div>
          <div class="info-row">
            <span class="info-label">📱 Phone Number:</span>
            <span class="info-value">${data.phone}</span>
          </div>
          <div class="info-row">
            <span class="info-label">💬 WhatsApp:</span>
            <span class="info-value"><a href="https://wa.me/${data.phone
              .replace(/[^\d]/g, "")
              .replace(/^0/, "94")}" target="_blank">+${data.phone
      .replace(/[^\d]/g, "")
      .replace(/^0/, "94")}</a></span>
          </div>
        </div>
      </div>

      <!-- Booking Details -->
      <div class="section">
        <h3>🏕️ Accommodation Details</h3>
        <div class="info-grid">
          <div class="info-row">
            <span class="info-label">🏞️ Location:</span>
            <span class="info-value">${data.location.name}</span>
          </div>
          <div class="info-row">
            <span class="info-label">📍 Address:</span>
            <span class="info-value">${data.location.location}</span>
          </div>
          <div class="info-row">
            <span class="info-label">📅 Check-in Date:</span>
            <span class="info-value">${new Date(
              data.checkIn
            ).toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}</span>
          </div>
          <div class="info-row">
            <span class="info-label">📅 Check-out Date:</span>
            <span class="info-value">${new Date(
              data.checkOut
            ).toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}</span>
          </div>
          <div class="info-row">
            <span class="info-label">🌙 Number of Nights:</span>
            <span class="info-value">${data.nights} nights</span>
          </div>
          <div class="info-row">
            <span class="info-label">👥 Group Size:</span>
            <span class="info-value">${data.groupSize} people</span>
          </div>
          <div class="info-row">
            <span class="info-label">🏠 Accommodation Type:</span>
            <span class="info-value">${data.accommodationType}</span>
          </div>
          <div class="info-row">
            <span class="info-label">🍽️ Meal Plan:</span>
            <span class="info-value">${data.mealPlan}</span>
          </div>
        </div>
      </div>

      ${
        data.specialRequests
          ? `
      <!-- Special Requests -->
      <div class="special-requests-section">
        <h3 style="color: #92400e; margin-bottom: 20px;">📝 Special Requests & Requirements</h3>
        <div class="special-requests">
          <strong>Customer wrote:</strong><br><br>
          "${data.specialRequests}"
        </div>
        <p style="font-size: 15px; color: #92400e; margin-top: 20px; padding: 15px; background: rgba(252, 211, 77, 0.2); border-radius: 6px;">
          <strong>⚠️ IMPORTANT:</strong> Please review and acknowledge these specific requirements when responding to the customer. Make sure to address each point in your confirmation email.
        </p>
      </div>
      `
          : ""
      }

      <!-- Pricing Details -->
      <div class="pricing-section">
        <h3 class="pricing-header">💰 Complete Financial Summary</h3>
        <div class="info-grid">
          <div class="info-row">
            <span class="info-label">💵 Rate per Night:</span>
            <span class="info-value">$${data.location.price_per_night}</span>
          </div>
          <div class="info-row">
            <span class="info-label">🌙 Number of Nights:</span>
            <span class="info-value">${data.nights} nights</span>
          </div>
          <div class="info-row">
            <span class="info-label">🧮 Subtotal Calculation:</span>
            <span class="info-value">$${data.location.price_per_night} × ${
      data.nights
    } = $${data.location.price_per_night * data.nights}</span>
          </div>
        </div>
        
        <div class="total-amount">
          💲 TOTAL BOOKING VALUE: $${data.total}
        </div>
      </div>

      <!-- Quick Action Buttons -->
      <div class="action-buttons">
        <h3>🚀 Quick Response Actions</h3>
        <p>⏰ Respond within 1-2 hours to secure this booking!</p>
        
        <a href="mailto:${data.email}?subject=${encodeURIComponent(
      `✅ Booking Confirmed - ${data.bookingId} - Yala Mobile Camping`
    )}&body=${encodeURIComponent(`Dear ${data.firstName},

Great news! Your booking request has been confirmed! 🎉

📋 Booking Details:
- Booking ID: ${data.bookingId}
- Location: ${data.location.name}
- Dates: ${data.checkIn} to ${data.checkOut}
- Duration: ${data.nights} nights
- Guests: ${data.groupSize} people
- Accommodation: ${data.accommodationType}
- Meals: ${data.mealPlan}
- Total Amount: $${data.total}

🏕️ Your safari adventure at Yala National Park is confirmed!

💳 Payment Information:
[Please add your payment instructions here]

📱 Contact Information:
- WhatsApp: +94 71 399 1051
- Email: ${process.env.EMAIL_USER}

We'll send you detailed arrival instructions 24-48 hours before your check-in date.

${
  data.specialRequests
    ? `
📝 Regarding your special requests:
"${data.specialRequests}"
We've noted these requirements and will ensure they are addressed during your stay.
`
    : ""
}

Thank you for choosing Yala Mobile Camping! We look forward to providing you with an unforgettable wildlife experience.

Best regards,
Yala Mobile Camping Team
📱 +94 71 399 1051
📧 ${process.env.EMAIL_USER}`)}" 
           class="btn btn-email">
          📧 Send Confirmation Email
        </a>
        
        <a href="https://wa.me/${data.phone
          .replace(/[^\d]/g, "")
          .replace(/^0/, "94")}?text=${encodeURIComponent(`Hi ${
      data.firstName
    }! 👋

Thank you for your booking request with Yala Mobile Camping! 🏕️

📋 Booking Details:
- ID: ${data.bookingId}
- Location: ${data.location.name}  
- Dates: ${data.checkIn} to ${data.checkOut}
- Guests: ${data.groupSize} people
- Total: $${data.total}

GREAT NEWS: Your dates are available! ✅

I'll send you payment details right now. When would be convenient for you to complete the payment?

${
  data.specialRequests
    ? `

📝 I've noted your special requests: "${data.specialRequests}" - we'll make sure everything is arranged perfectly for your stay!`
    : ""
}

Welcome to Yala Mobile Camping! 🌟

Best regards,
Yala Mobile Camping Team`)}" 
           class="btn btn-whatsapp" 
           target="_blank">
          📱 WhatsApp Customer Now
        </a>
      </div>

      <!-- Footer Information -->
      <div class="footer-info">
        <strong>📊 Booking Management Summary</strong><br><br>
        <strong>⏰ Response Target:</strong> Within 1-2 hours during business hours (8 AM - 8 PM LKT)<br>
        <strong>📧 Customer Status:</strong> Automatic confirmation email sent to ${
          data.email
        }<br>  
        <strong>🔄 Next Required Action:</strong> Send availability confirmation and payment instructions<br>
        <strong>💼 Booking Priority:</strong> ${
          data.total >= 200
            ? "HIGH VALUE"
            : data.total >= 100
            ? "MEDIUM VALUE"
            : "STANDARD"
        } (${data.total >= 200 ? "🔥" : data.total >= 100 ? "⭐" : "📋"})<br>
        <strong>👥 Group Type:</strong> ${
          data.groupSize >= 6
            ? "Large Group"
            : data.groupSize >= 4
            ? "Medium Group"
            : "Small Group"
        }
        
        <div style="margin-top: 20px; padding-top: 15px; border-top: 1px solid #d1d5db; font-size: 12px;">
          <strong>🤖 System Information:</strong><br>
          Generated: ${new Date().toLocaleString("en-US", {
            timeZone: "Asia/Colombo",
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          })} Sri Lanka Time<br>
          Notification ID: ${data.bookingId}-ADMIN<br>
          Email Route: System → ${
            process.env.ADMIN_EMAIL || process.env.EMAIL_USER
          }
        </div>
      </div>
    </div>
  </div>
</body>
</html>
`;

    // 🔧 FIX: Send admin notification email TO ADMIN_EMAIL, not EMAIL_USER
    console.log("📧 Sending admin notification to:", ADMIN_EMAIL);

    await transporter.sendMail({
      from: `"${FROM_NAME}" <${process.env.EMAIL_USER}>`, // From: EMAIL_USER (sender account)
      to: ADMIN_EMAIL, // To: ADMIN_EMAIL (your business email to receive notifications)
      subject: `🚨 URGENT: New Camping Booking - ${data.bookingId} - ${data.firstName} ${data.lastName} (${data.total})`,
      html: adminEmailHtml,
    });

    // 2. Send confirmation email to customer
    const customerEmailHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <title>Your Yala Mobile Camping Booking Request</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #059669, #10b981); color: white; padding: 30px; border-radius: 10px 10px 0 0; text-align: center; }
          .content { background: #f8fafc; padding: 30px; border-radius: 0 0 10px 10px; }
          .section { background: white; padding: 20px; margin: 15px 0; border-radius: 8px; border-left: 4px solid #10b981; }
          .highlight { background: #d1fae5; padding: 15px; border-radius: 6px; margin: 10px 0; }
          .contact-info { background: #ecfdf5; padding: 20px; border-radius: 8px; text-align: center; }
          .pricing { background: #f0fdf4; padding: 20px; border-radius: 8px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🏕️ Thank You for Choosing Yala Mobile Camping!</h1>
            <p style="margin: 0; opacity: 0.9;">Your Safari Adventure Awaits</p>
          </div>
          
          <div class="content">
            <div class="section">
              <h2>Dear ${data.firstName},</h2>
              <p>Thank you for submitting your camping booking request! We're excited to help you create unforgettable memories at Yala National Park. 🌟</p>
              
              <div class="highlight">
                <strong>✅ Your booking request has been successfully received and is being processed!</strong>
              </div>
            </div>

            <div class="section">
              <h3>📋 Your Booking Summary</h3>
              <p><strong>Booking ID:</strong> ${data.bookingId}</p>
              <p><strong>Location:</strong> ${data.location.name}</p>
              <p><strong>Address:</strong> ${data.location.location}</p>
              <p><strong>Check-in:</strong> ${new Date(
                data.checkIn
              ).toLocaleDateString("en-US", {
                weekday: "long",
                month: "long",
                day: "numeric",
                year: "numeric",
              })}</p>
              <p><strong>Check-out:</strong> ${new Date(
                data.checkOut
              ).toLocaleDateString("en-US", {
                weekday: "long",
                month: "long",
                day: "numeric",
                year: "numeric",
              })}</p>
              <p><strong>Duration:</strong> ${data.nights} nights</p>
              <p><strong>Guests:</strong> ${data.groupSize} people</p>
              <p><strong>Accommodation:</strong> ${data.accommodationType}</p>
              <p><strong>Meal Plan:</strong> ${data.mealPlan}</p>
            </div>

            ${
              data.specialRequests
                ? `
            <div class="section">
              <h3>📝 Your Special Requests</h3>
              <div style="background: #fefce8; padding: 15px; border-radius: 6px; font-style: italic;">
                "${data.specialRequests}"
              </div>
              <p><em>We've noted your requirements and will do our best to accommodate them.</em></p>
            </div>
            `
                : ""
            }

            <div class="pricing">
              <h3>💰 Pricing Summary</h3>
              <div style="display: flex; justify-content: space-between; margin: 10px 0;">
                <span>${data.location.price_per_night} × ${
      data.nights
    } nights</span>
                <span>${data.location.price_per_night * data.nights}</span>
              </div>
              <hr style="border: 1px solid #d1fae5; margin: 15px 0;">
              <div style="display: flex; justify-content: space-between; font-size: 1.2em; font-weight: bold; color: #059669;">
                <span>Total Amount</span>
                <span>${data.total}</span>
              </div>
            </div>

            <div class="section">
              <h3>⏰ What Happens Next?</h3>
              <div style="background: #f0f9ff; padding: 20px; border-radius: 8px;">
                <div style="display: flex; align-items: center; margin: 10px 0;">
                  <div style="background: #3b82f6; color: white; border-radius: 50%; width: 30px; height: 30px; display: flex; align-items: center; justify-content: center; margin-right: 15px; font-weight: bold;">1</div>
                  <div>
                    <strong>Within 1-2 hours:</strong> We'll confirm availability and respond
                  </div>
                </div>
                <div style="display: flex; align-items: center; margin: 10px 0;">
                  <div style="background: #10b981; color: white; border-radius: 50%; width: 30px; height: 30px; display: flex; align-items: center; justify-content: center; margin-right: 15px; font-weight: bold;">2</div>
                  <div>
                    <strong>Within 24 hours:</strong> Payment instructions will be sent
                  </div>
                </div>
                <div style="display: flex; align-items: center; margin: 10px 0;">
                  <div style="background: #059669; color: white; border-radius: 50%; width: 30px; height: 30px; display: flex; align-items: center; justify-content: center; margin-right: 15px; font-weight: bold;">3</div>
                  <div>
                    <strong>24-48 hours before arrival:</strong> Final details & directions
                  </div>
                </div>
              </div>
            </div>

            <div class="contact-info">
              <h3>📞 Need Immediate Assistance?</h3>
              <p><strong>We're here to help!</strong></p>
              <p>📱 <strong>WhatsApp:</strong> <a href="https://wa.me/94713991051">+94 71 399 1051</a></p>
              <p>📧 <strong>Email:</strong> <a href="mailto:${
                process.env.EMAIL_USER
              }">${process.env.EMAIL_USER}</a></p>
              <p>🕒 <strong>Available:</strong> 8:00 AM - 8:00 PM (Sri Lanka Time)</p>
            </div>

            <div class="section">
              <h3>🌟 What Makes Your Experience Special?</h3>
              <ul style="list-style-type: none; padding: 0;">
                <li style="background: #f0fdf4; padding: 10px; margin: 5px 0; border-radius: 5px;">✅ Prime location near Yala National Park</li>
                <li style="background: #f0fdf4; padding: 10px; margin: 5px 0; border-radius: 5px;">✅ Comfortable safari-style accommodation</li>
                <li style="background: #f0fdf4; padding: 10px; margin: 5px 0; border-radius: 5px;">✅ Authentic Sri Lankan cuisine</li>
                <li style="background: #f0fdf4; padding: 10px; margin: 5px 0; border-radius: 5px;">✅ Expert safari guides available</li>
                <li style="background: #f0fdf4; padding: 10px; margin: 5px 0; border-radius: 5px;">✅ 24/7 support during your stay</li>
              </ul>
            </div>

            <div class="highlight">
              <p style="text-align: center; margin: 0;">
                <strong>🙏 Thank you for choosing Yala Mobile Camping!</strong><br>
                We can't wait to welcome you to this incredible wildlife paradise.
              </p>
            </div>

            <div style="background: #f3f4f6; padding: 15px; border-radius: 8px; margin-top: 20px; font-size: 0.9em; color: #6b7280; text-align: center;">
              <p style="margin: 0;">
                <strong>Important:</strong> Please save this booking ID: <strong>${
                  data.bookingId
                }</strong><br>
                This is an automated confirmation. We'll contact you personally within 1-2 hours.
              </p>
            </div>
          </div>
        </div>
      </body>
      </html>
    `;

    // 🔧 FIX: Send customer confirmation TO THE CUSTOMER EMAIL FROM THE FORM
    console.log("📧 Sending customer confirmation to:", data.email);

    await transporter.sendMail({
      from: `"${FROM_NAME}" <${process.env.EMAIL_USER}>`, // From: EMAIL_USER (sender account)
      to: data.email, // To: Customer's email address from the form
      subject:
        "🏕️ Booking Request Received - Yala Mobile Camping - Confirmation Pending",
      html: customerEmailHtml,
    });

    console.log("✅ Emails sent successfully for booking:", data.bookingId);
    console.log("📧 Admin notification sent to:", ADMIN_EMAIL);
    console.log("📧 Customer confirmation sent to:", data.email);

    res.json({
      success: true,
      message:
        "Booking request submitted successfully! Check your email for confirmation.",
      bookingId: data.bookingId,
      whatsappLink: `https://wa.me/94713991051?text=Hi! I just submitted a booking request (ID: ${data.bookingId}) for ${data.nights} nights at ${data.location.name}. Looking forward to hearing from you!`,
    });
  } catch (error) {
    console.error("❌ Error processing booking request:", error);
    res.status(500).json({
      success: false,
      message:
        "Failed to process booking request. Please try again or contact us directly.",
      error:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Internal server error",
      fallback: {
        whatsapp: "https://wa.me/94713991051",
        email: `mailto:${process.env.EMAIL_USER}`,
      },
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(
    `🚀 Yala Mobile Camping API Server running on http://localhost:${PORT}`
  );
  console.log(
    `📧 Email configured with: ${process.env.EMAIL_USER || "NOT CONFIGURED"}`
  );
  console.log(`🌐 CORS enabled for: http://localhost:5173, ngrok tunnel`);
  console.log(`⏰ Server started at: ${new Date().toLocaleString()}`);
});

export default app;
