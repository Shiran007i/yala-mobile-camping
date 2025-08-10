// src/app/api/booking/route.ts
import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

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

// Email configuration using Gmail
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER, // shirantha007i@gmail.com
    pass: process.env.EMAIL_PASSWORD, // your app password
  },
});

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

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

    // ===================================================================
    // 1. SEND ADMIN NOTIFICATION EMAIL (to your business email)
    // ===================================================================
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
    // 🔧 FIX: Send admin email to ADMIN_EMAIL, not EMAIL_USER
    console.log("📧 Sending admin notification to:", ADMIN_EMAIL);

    await transporter.sendMail({
      from: `"${FROM_NAME}" <${process.env.EMAIL_USER}>`, // From: EMAIL_USER (sender account)
      to: ADMIN_EMAIL, // To: ADMIN_EMAIL (your business email to receive notifications)
      subject: `🚨 URGENT BOOKING: $${data.total} - ${data.bookingId} - ${data.firstName} ${data.lastName}`,
      html: adminEmailHtml,
      priority: "high",
      headers: {
        "X-Priority": "1",
        "X-MSMail-Priority": "High",
        Importance: "high",
      },
    });

    // ===================================================================
    // 2. SEND CUSTOMER CONFIRMATION EMAIL
    // ===================================================================

    const customerEmailHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Your Yala Mobile Camping Booking Request</title>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 20px; }
    .container { max-width: 600px; margin: 0 auto; background: white; border-radius: 10px; overflow: hidden; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
    .header { background: linear-gradient(135deg, #059669, #10b981); color: white; padding: 30px; text-align: center; }
    .content { padding: 30px; }
    .success { background: #d1fae5; border: 2px solid #10b981; padding: 20px; margin: 20px 0; border-radius: 8px; text-align: center; }
    .section { background: #f8fafc; padding: 20px; margin: 20px 0; border-radius: 8px; border-left: 4px solid #10b981; }
    .info-row { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #e5e7eb; }
    .info-row:last-child { border-bottom: none; }
    .total { background: #f0fdf4; padding: 20px; text-align: center; border-radius: 8px; margin: 20px 0; }
    .contact { background: #ecfdf5; padding: 20px; margin: 20px 0; border-radius: 8px; text-align: center; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>🏕️ Thank You for Your Booking!</h1>
      <p style="margin: 0; opacity: 0.9;">Yala Mobile Camping - Your Adventure Awaits</p>
    </div>
    
    <div class="content">
      <div class="success">
        <h2 style="color: #065f46; margin-top: 0;">✅ Booking Request Received Successfully!</h2>
        <p style="margin-bottom: 0;"><strong>Booking ID: ${
          data.bookingId
        }</strong></p>
      </div>

      <div class="section">
        <h3>Dear ${data.firstName},</h3>
        <p>Thank you for choosing Yala Mobile Camping! We're excited to help you create unforgettable memories at Sri Lanka's premier wildlife destination. 🌟</p>
        <p><strong>Your booking request is being processed and we'll confirm availability within 1-2 hours during business hours.</strong></p>
      </div>

      <div class="section">
        <h3>📋 Your Booking Summary</h3>
        <div class="info-row"><span><strong>Booking ID:</strong></span><span>${
          data.bookingId
        }</span></div>
        <div class="info-row"><span><strong>Location:</strong></span><span>${
          data.location.name
        }</span></div>
        <div class="info-row"><span><strong>Check-in:</strong></span><span>${new Date(
          data.checkIn
        ).toLocaleDateString("en-US", {
          weekday: "long",
          month: "long",
          day: "numeric",
          year: "numeric",
        })}</span></div>
        <div class="info-row"><span><strong>Check-out:</strong></span><span>${new Date(
          data.checkOut
        ).toLocaleDateString("en-US", {
          weekday: "long",
          month: "long",
          day: "numeric",
          year: "numeric",
        })}</span></div>
        <div class="info-row"><span><strong>Duration:</strong></span><span>${
          data.nights
        } nights</span></div>
        <div class="info-row"><span><strong>Guests:</strong></span><span>${
          data.groupSize
        } people</span></div>
        <div class="info-row"><span><strong>Accommodation:</strong></span><span>${
          data.accommodationType
        }</span></div>
        <div class="info-row"><span><strong>Meal Plan:</strong></span><span>${
          data.mealPlan
        }</span></div>
      </div>

      ${
        data.specialRequests
          ? `
      <div class="section">
        <h3>📝 Your Special Requests</h3>
        <div style="background: #fefce8; padding: 15px; border-radius: 6px; font-style: italic;">
          "${data.specialRequests}"
        </div>
        <p><em>We've noted your requirements and will address them in our confirmation.</em></p>
      </div>
      `
          : ""
      }

      <div class="total">
        <h3>💰 Pricing Summary</h3>
        <p>$${data.location.price_per_night} per night × ${
      data.nights
    } nights</p>
        <div style="font-size: 24px; font-weight: bold; color: #059669; margin-top: 15px;">
          Total: $${data.total}
        </div>
      </div>

      <div class="section">
        <h3>⏰ What Happens Next?</h3>
        <div style="background: #f0f9ff; padding: 20px; border-radius: 8px;">
          <p><strong>1. Within 1-2 hours:</strong> We'll confirm availability and respond</p>
          <p><strong>2. Within 24 hours:</strong> Payment instructions will be sent</p>
          <p><strong>3. Before arrival:</strong> Detailed directions and contact information</p>
        </div>
      </div>

      <div class="contact">
        <h3>📞 Need Help? Contact Us Anytime!</h3>
        <p><strong>📱 WhatsApp:</strong> <a href="https://wa.me/94713991051" style="color: #10b981;">+94 71 399 1051</a></p>
        <p><strong>📧 Email:</strong> <a href="mailto:${
          process.env.EMAIL_USER
        }" style="color: #3b82f6;">${process.env.EMAIL_USER}</a></p>
        <p><strong>🕒 Available:</strong> 8:00 AM - 8:00 PM (Sri Lanka Time)</p>
      </div>

      <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; text-align: center; color: #6b7280; font-size: 14px;">
        <p><strong>Important:</strong> Please save your Booking ID: <strong style="color: #059669;">${
          data.bookingId
        }</strong></p>
        <p>This is an automated confirmation. We'll contact you personally within 1-2 hours.</p>
        <p style="margin-top: 15px; font-size: 12px;">Generated: ${new Date().toLocaleString(
          "en-US",
          { timeZone: "Asia/Colombo" }
        )} Sri Lanka Time</p>
      </div>
    </div>
  </div>
</body>
</html>
`;

    // Send customer confirmation TO THE CUSTOMER EMAIL FROM THE FORM
    console.log("📧 Sending customer confirmation to:", data.email);

    await transporter.sendMail({
      from: `"${FROM_NAME}" <${process.env.EMAIL_USER}>`, // From: EMAIL_USER (sender account)
      to: data.email, // To: Customer's email address from the form
      subject: `🏕️ Booking Request Received - ${data.bookingId} - Yala Mobile Camping`,
      html: customerEmailHtml,
    });

    console.log("✅ Both emails sent successfully!");
    console.log("📧 Admin notification sent to:", ADMIN_EMAIL);
    console.log("📧 Customer confirmation sent to:", data.email);

    return NextResponse.json({
      success: true,
      message:
        "Booking request submitted successfully! Check your email for confirmation.",
      bookingId: data.bookingId,
      whatsappLink: `https://wa.me/94713991051?text=${encodeURIComponent(
        `Hi! I just submitted booking ${data.bookingId} for ${data.nights} nights at ${data.location.name}. Looking forward to hearing from you!`
      )}`,
    });
  } catch (error) {
    console.error("❌ Error processing booking:", error);
    return NextResponse.json(
      {
        success: false,
        message:
          "Failed to process booking request. Please try again or contact us directly.",
        fallback: {
          whatsapp: "https://wa.me/94713991051",
          email: `mailto:${process.env.EMAIL_USER}`,
        },
      },
      { status: 500 }
    );
  }
}
