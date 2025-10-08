// src/templates/emailTemplates.js
/**
 * FIXED Email Templates for Yala Mobile Camping
 * Correct pricing calculations and DUPLICATE-FREE admin notifications
 */

/**
 * Calculate pricing breakdown for email display
 * This ensures consistent pricing calculations across all templates
 */
const calculateEmailPricing = (data) => {
  const basePrice = data.location.price_per_night || 700;
  const additionalPersonPrice = 325;
  const groupSize = parseInt(data.groupSize) || 2;
  const nights = parseInt(data.nights) || 1;

  // Calculate components
  const basePriceTotal = basePrice * nights;
  const additionalPersons = Math.max(0, groupSize - 2);
  const additionalPersonsTotal =
    additionalPersons * additionalPersonPrice * nights;
  const subtotal = basePriceTotal + additionalPersonsTotal;
  const savings = additionalPersons * 25 * nights; // $25 savings per additional person per night

  return {
    basePrice,
    additionalPersonPrice,
    nights,
    groupSize,
    basePriceTotal,
    additionalPersons,
    additionalPersonsTotal,
    subtotal,
    total: parseInt(data.total) || subtotal,
    savings,
    perPerson: Math.round((subtotal / groupSize) * 100) / 100,
  };
};

/**
 * FIXED: Get unique admin email addresses to prevent duplicates
 * @param {Object} env - Environment variables
 * @returns {Array} Array of unique admin email addresses
 */
const getUniqueAdminEmails = (env) => {
  const adminEmails = [];

  // Add ADMIN_EMAIL if configured
  if (process.env.ADMIN_EMAIL && process.env.ADMIN_EMAIL.trim()) {
    adminEmails.push(process.env.ADMIN_EMAIL.trim().toLowerCase());
  }

  // Add ZOHO_USER if configured and NOT already in list
  if (process.env.ZOHO_USER && process.env.ZOHO_USER.trim()) {
    const zohoEmail = process.env.ZOHO_USER.trim().toLowerCase();
    if (!adminEmails.includes(zohoEmail)) {
      adminEmails.push(zohoEmail);
    }
  }

  // Remove any empty or invalid emails
  const validEmails = adminEmails.filter(
    (email) => email && email.includes("@") && email.includes(".")
  );

  console.log(
    `📧 ADMIN EMAILS (deduplicated): ${validEmails.length} unique addresses`
  );
  validEmails.forEach((email, index) => {
    console.log(`   ${index + 1}. ${email}`);
  });

  return validEmails;
};

/**
 * Generate admin notification email HTML
 */
export const generateAdminEmailTemplate = (data, env) => {
  const whatsappPhone = data.phone.replace(/[^\d]/g, "").replace(/^0/, "94");
  const pricing = calculateEmailPricing(data);

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>🚨 NEW BOOKING: ${data.bookingId}</title>
  <style>${getEmailStyles()}</style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>🚨 URGENT: NEW BOOKING REQUEST</h1>
      <p>Yala Mobile Camping - Admin Notification System</p>
    </div>
    
    <div class="content">
      ${generateUrgentBanner(data, pricing)}
      ${generateCustomerInfoSection(data)}
      ${generateBookingDetailsSection(data)}
      ${data.specialRequests ? generateSpecialRequestsSection(data) : ""}
      ${generateFixedPricingSection(pricing)}
      ${generateActionButtons(data, env, whatsappPhone)}
      ${generateFooterInfo(data, env)}
    </div>
  </div>
</body>
</html>`;
};

/**
 * Generate customer confirmation email HTML
 */
export const generateCustomerEmailTemplate = (data, env) => {
  const pricing = calculateEmailPricing(data);

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Your Yala Mobile Camping Booking Request</title>
  <style>${getCustomerEmailStyles()}</style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>🏕️ Thank You for Your Booking!</h1>
      <p style="margin: 0; opacity: 0.9;">Yala Mobile Camping - Your Adventure Awaits</p>
    </div>
    
    <div class="content">
      ${generateCustomerWelcome(data)}
      ${generateBookingSummary(data)}
      ${data.specialRequests ? generateCustomerSpecialRequests(data) : ""}
      ${generateFixedCustomerPricingSummary(pricing)}
      ${generateNextSteps()}
      ${generateContactInfo(env)}
      ${generateCustomerHighlights()}
      ${generateImportantInfo(data)}
    </div>
  </div>
</body>
</html>`;
};

// ========================================
// FIXED ADMIN EMAIL HELPER FUNCTIONS
// ========================================

/**
 * FIXED: Send admin notification emails with duplicate prevention
 * @param {Object} data - Booking data
 * @param {Object} env - Environment variables
 * @param {Function} transporter - Email transporter (Gmail)
 * @param {string} subject - Email subject
 * @param {string} htmlContent - Email HTML content
 * @returns {Promise<Array>} Results array
 */
export const sendDeduplicatedAdminEmails = async (
  data,
  env,
  transporter,
  subject,
  htmlContent
) => {
  const uniqueAdminEmails = getUniqueAdminEmails(env);

  if (uniqueAdminEmails.length === 0) {
    console.warn("⚠️ No valid admin emails configured!");
    return [
      {
        email: "NO_ADMIN_EMAILS_CONFIGURED",
        status: "❌ No admin emails found in environment variables",
      },
    ];
  }

  console.log(
    `📧 Sending admin notifications to ${uniqueAdminEmails.length} unique email(s)...`
  );

  const emailPromises = uniqueAdminEmails.map(async (adminEmail, index) => {
    try {
      const result = await transporter.sendMail({
        from: `"${env.EMAIL_FROM_NAME || "Yala Mobile Camping"}" <${
          env.EMAIL_USER
        }>`,
        to: adminEmail,
        subject: subject,
        html: htmlContent,
        priority: "high",
        headers: {
          "X-Priority": "1",
          "X-MSMail-Priority": "High",
          Importance: "high",
          "X-Booking-ID": data.bookingId,
          "X-Admin-Notification": `${index + 1}/${uniqueAdminEmails.length}`,
        },
      });

      console.log(
        `✅ Admin notification ${index + 1}/${
          uniqueAdminEmails.length
        } sent to: ${adminEmail}`
      );
      return {
        email: adminEmail,
        status: "✅ Sent via Gmail",
        messageId: result.messageId,
        sequence: `${index + 1}/${uniqueAdminEmails.length}`,
      };
    } catch (error) {
      console.error(
        `❌ Failed to send admin notification to ${adminEmail}:`,
        error.message
      );
      return {
        email: adminEmail,
        status: `❌ Failed: ${error.message}`,
        sequence: `${index + 1}/${uniqueAdminEmails.length}`,
      };
    }
  });

  const results = await Promise.allSettled(emailPromises);

  return results.map((result, index) => {
    if (result.status === "fulfilled") {
      return result.value;
    } else {
      return {
        email: uniqueAdminEmails[index],
        status: `❌ Promise rejected: ${result.reason}`,
        sequence: `${index + 1}/${uniqueAdminEmails.length}`,
      };
    }
  });
};

// ========================================
// EXISTING EMAIL SECTIONS (unchanged)
// ========================================

const generateUrgentBanner = (data, pricing) => `
  <div class="urgent-banner">
    <h2>⚡ IMMEDIATE ACTION REQUIRED!</h2>
    <div class="booking-highlight">
      <strong>📋 Booking ID:</strong> ${data.bookingId}<br><br>
      <strong>💰 Total Value:</strong> $${pricing.total}<br><br>
      <strong>👥 Guests:</strong> ${pricing.groupSize} people<br><br>
      <strong>📅 Duration:</strong> ${pricing.nights} nights<br><br>
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
`;

// COMPLETELY FIXED ADMIN PRICING SECTION
const generateFixedPricingSection = (pricing) => `
  <div class="pricing-section">
    <h3 class="pricing-header">💰 Complete Financial Summary</h3>
    <div class="pricing-breakdown">
      
      <!-- Base Package -->
      <div class="pricing-row">
        <div class="pricing-item">
          <span class="pricing-label">💵 Base Package (2 persons):</span>
          <span class="pricing-calculation">$${pricing.basePrice} × ${
  pricing.nights
} ${pricing.nights === 1 ? "night" : "nights"}</span>
        </div>
        <span class="pricing-value">$${pricing.basePriceTotal.toLocaleString()}</span>
      </div>
      
      ${
        pricing.additionalPersons > 0
          ? `
      <!-- Additional Persons -->
      <div class="pricing-row additional-persons">
        <div class="pricing-item">
          <span class="pricing-label">👥 Additional Persons (${
            pricing.additionalPersons
          }):</span>
          <span class="pricing-calculation">$${
            pricing.additionalPersonPrice
          } × ${pricing.additionalPersons} × ${pricing.nights} ${
              pricing.nights === 1 ? "night" : "nights"
            }</span>
          <span class="savings-note">💸 Save $${pricing.savings} total!</span>
        </div>
        <span class="pricing-value">$${pricing.additionalPersonsTotal.toLocaleString()}</span>
      </div>
      
      <!-- Subtotal -->
      <div class="pricing-row subtotal">
        <div class="pricing-item">
          <span class="pricing-label">🧮 Subtotal:</span>
          <span class="pricing-calculation">Base + Additional Persons</span>
        </div>
        <span class="pricing-value">$${pricing.subtotal.toLocaleString()}</span>
      </div>
      `
          : ""
      }
      
      <!-- Final Total -->
      <div class="pricing-row total">
        <div class="pricing-item">
          <span class="pricing-label">💲 TOTAL BOOKING VALUE:</span>
          <span class="pricing-details">${pricing.groupSize} persons × ${
  pricing.nights
} ${pricing.nights === 1 ? "night" : "nights"}</span>
        </div>
        <span class="pricing-value total-amount">$${pricing.total.toLocaleString()}</span>
      </div>
    </div>
    
    ${
      pricing.savings > 0
        ? `
    <div class="savings-summary">
      💰 Customer Savings: $${pricing.savings} 
      <br><small>(${pricing.additionalPersons} additional ${
            pricing.additionalPersons === 1 ? "person" : "persons"
          } × $25 × ${pricing.nights} ${
            pricing.nights === 1 ? "night" : "nights"
          })</small>
    </div>
    `
        : ""
    }
    
    <div class="pricing-verification">
      <strong>📊 Calculation Verification:</strong><br>
      Base Package: $${pricing.basePrice} × ${pricing.nights} = $${
  pricing.basePriceTotal
}<br>
      ${
        pricing.additionalPersons > 0
          ? `Additional: $${pricing.additionalPersonPrice} × ${pricing.additionalPersons} × ${pricing.nights} = $${pricing.additionalPersonsTotal}<br>`
          : ""
      }
      <strong>Final Total: $${pricing.total}</strong>
    </div>
  </div>
`;

// COMPLETELY FIXED CUSTOMER PRICING SECTION
const generateFixedCustomerPricingSummary = (pricing) => `
  <div class="customer-pricing">
    <h3>💰 Pricing Breakdown</h3>
    <div class="pricing-details">
      
      <!-- Base Package -->
      <div class="pricing-line">
        <span><strong>Base Package (2 persons)</strong></span>
        <span><strong>$${pricing.basePriceTotal.toLocaleString()}</strong></span>
      </div>
      <div class="pricing-sub-line">
        $${pricing.basePrice} per night × ${pricing.nights} ${
  pricing.nights === 1 ? "night" : "nights"
}
      </div>
      
      ${
        pricing.additionalPersons > 0
          ? `
      <!-- Additional Persons -->
      <div class="pricing-line additional">
        <span><strong>Additional Persons (${
          pricing.additionalPersons
        })</strong></span>
        <span><strong>$${pricing.additionalPersonsTotal.toLocaleString()}</strong></span>
      </div>
      <div class="pricing-sub-line">
        $${pricing.additionalPersonPrice} per person × ${
              pricing.additionalPersons
            } × ${pricing.nights} ${pricing.nights === 1 ? "night" : "nights"}
      </div>
      
      <!-- Savings Note -->
      <div class="pricing-note">
        <small>💸 You save $${
          pricing.savings
        } ($25 per additional person per night)!</small>
      </div>
      
      <!-- Subtotal -->
      <div class="pricing-line subtotal">
        <span><strong>Subtotal</strong></span>
        <span><strong>$${pricing.subtotal.toLocaleString()}</strong></span>
      </div>
      `
          : ""
      }
    </div>
    
    <!-- Final Total -->
    <div class="total-section">
      <div style="font-size: 28px; font-weight: bold; color: #059669; margin: 20px 0; text-align: center; padding: 20px; background: linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%); border-radius: 10px; border: 3px solid #10b981;">
        Total: $${pricing.total.toLocaleString()}
      </div>
      <div style="text-align: center; color: #6b7280; margin-top: 10px; font-size: 16px;">
        <strong>${pricing.groupSize} ${
  pricing.groupSize === 1 ? "person" : "persons"
} × ${pricing.nights} ${pricing.nights === 1 ? "night" : "nights"}</strong>
        ${
          pricing.savings > 0
            ? `<br><span style="color: #059669; font-weight: bold;">🎉 You save $${pricing.savings}!</span>`
            : ""
        }
        <br><small style="color: #9ca3af;">($${
          pricing.perPerson
        } per person)</small>
      </div>
    </div>
  </div>
`;

// ========================================
// OTHER EMAIL SECTIONS (keeping existing working sections)
// ========================================

const generateCustomerInfoSection = (data) => `
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
`;

const generateBookingDetailsSection = (data) => `
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
        <span class="info-value">${new Date(data.checkIn).toLocaleDateString(
          "en-US",
          {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          }
        )}</span>
      </div>
      <div class="info-row">
        <span class="info-label">📅 Check-out Date:</span>
        <span class="info-value">${new Date(data.checkOut).toLocaleDateString(
          "en-US",
          {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          }
        )}</span>
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
`;

const generateSpecialRequestsSection = (data) => `
  <div class="special-requests-section">
    <h3 style="color: #92400e; margin-bottom: 20px;">📝 Special Requests & Requirements</h3>
    <div class="special-requests">
      <strong>Customer wrote:</strong><br><br>
      "${data.specialRequests}"
    </div>
    <p style="font-size: 15px; color: #92400e; margin-top: 20px; padding: 15px; background: rgba(252, 211, 77, 0.2); border-radius: 6px;">
      <strong>⚠️ IMPORTANT:</strong> Please review and acknowledge these specific requirements when responding to the customer.
    </p>
  </div>
`;

const generateActionButtons = (data, env, whatsappPhone) => {
  const emailSubject = encodeURIComponent(
    `✅ Booking Confirmed - ${data.bookingId} - Yala Mobile Camping`
  );
  const pricing = calculateEmailPricing(data);
  const emailBody = encodeURIComponent(
    generateConfirmationEmailBody(data, env, pricing)
  );
  const whatsappMessage = encodeURIComponent(
    generateWhatsAppMessage(data, pricing)
  );

  return `
    <div class="action-buttons">
      <h3>🚀 Quick Response Actions</h3>
      <p>⏰ Respond within 1-2 hours to secure this booking!</p>
      
      <a href="mailto:${data.email}?subject=${emailSubject}&body=${emailBody}" class="btn btn-email">
        📧 Send Confirmation Email
      </a>
      
      <a href="https://wa.me/${whatsappPhone}?text=${whatsappMessage}" class="btn btn-whatsapp" target="_blank">
        📱 WhatsApp Customer Now
      </a>
    </div>
  `;
};

const generateFooterInfo = (data, env) => `
  <div class="footer-info">
    <strong>📊 Booking Management Summary</strong><br><br>
    <strong>⏰ Response Target:</strong> Within 1-2 hours during business hours (8 AM - 8 PM LKT)<br>
    <strong>📧 Customer Status:</strong> Automatic confirmation email sent to ${
      data.email
    }<br>  
    <strong>📄 Next Required Action:</strong> Send availability confirmation and payment instructions<br>
    <strong>💼 Booking Priority:</strong> ${
      data.total >= 200
        ? "HIGH VALUE"
        : data.total >= 100
        ? "MEDIUM VALUE"
        : "STANDARD"
    }<br>
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
      Email Route: System → ${env.ADMIN_EMAIL || env.EMAIL_USER}<br>
      Admin Emails: ${getUniqueAdminEmails(env).length} unique recipient(s)
    </div>
  </div>
`;

// ========================================
// CUSTOMER EMAIL SECTIONS (unchanged)
// ========================================

const generateCustomerWelcome = (data) => `
  <div class="success">
    <h2 style="color: #065f46; margin-top: 0;">✅ Booking Request Received Successfully!</h2>
    <p style="margin-bottom: 0;"><strong>Booking ID: ${data.bookingId}</strong></p>
  </div>

  <div class="section">
    <h3>Dear ${data.firstName},</h3>
    <p>Thank you for choosing Yala Mobile Camping! We're excited to help you create unforgettable memories at Sri Lanka's premier wildlife destination. 🌟</p>
    <p><strong>Your booking request is being processed and we'll confirm availability within 1-2 hours during business hours.</strong></p>
  </div>
`;

const generateBookingSummary = (data) => `
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
`;

const generateCustomerSpecialRequests = (data) => `
  <div class="section">
    <h3>📝 Your Special Requests</h3>
    <div style="background: #fefce8; padding: 15px; border-radius: 6px; font-style: italic;">
      "${data.specialRequests}"
    </div>
    <p><em>We've noted your requirements and will address them in our confirmation.</em></p>
  </div>
`;

const generateNextSteps = () => `
  <div class="section">
    <h3>⏰ What Happens Next?</h3>
    <div style="background: #f0f9ff; padding: 20px; border-radius: 8px;">
      <p><strong>1. Within 1-2 hours:</strong> We'll confirm availability and respond</p>
      <p><strong>2. Within 24 hours:</strong> Payment instructions will be sent</p>
      <p><strong>3. Before arrival:</strong> Detailed directions and contact information</p>
    </div>
  </div>
`;

const generateContactInfo = (env) => `
  <div class="contact">
    <h3>📞 Need Help? Contact Us Anytime!</h3>
    <p><strong>📱 WhatsApp:</strong> <a href="https://wa.me/94716335000" style="color: #10b981;">+94 71 399 1051</a></p>
    <p><strong>📧 Email:</strong> <a href="mailto:${env.EMAIL_USER}" style="color: #3b82f6;">${env.EMAIL_USER}</a></p>
    <p><strong>🕐 Available:</strong> 8:00 AM - 8:00 PM (Sri Lanka Time)</p>
  </div>
`;

const generateCustomerHighlights = () => `
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
`;

const generateImportantInfo = (data) => `
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
`;

// ========================================
// HELPER FUNCTIONS WITH FIXED PRICING
// ========================================

const generateConfirmationEmailBody = (data, env, pricing) => `Dear ${
  data.firstName
},

Great news! Your booking request has been confirmed! 🎉

📋 Booking Details:
- Booking ID: ${data.bookingId}
- Location: ${data.location.name}
- Dates: ${data.checkIn} to ${data.checkOut}
- Duration: ${pricing.nights} nights
- Guests: ${pricing.groupSize} people
- Accommodation: ${data.accommodationType}
- Meals: ${data.mealPlan}

💰 Pricing Breakdown:
- Base Package (2 persons): ${pricing.basePriceTotal.toLocaleString()}${
  pricing.additionalPersons > 0
    ? `
- Additional Persons (${
        pricing.additionalPersons
      }): ${pricing.additionalPersonsTotal.toLocaleString()}
- Your Savings: ${pricing.savings} ($25 per additional person per night!)`
    : ""
}
- TOTAL AMOUNT: ${pricing.total.toLocaleString()}

🏕️ Your safari adventure at Yala National Park is confirmed!

💳 Payment Information:
[Please add your payment instructions here]

📱 Contact Information:
- WhatsApp: +94 71 399 1051
- Email: ${env.EMAIL_USER}

${
  data.specialRequests
    ? `
📝 Regarding your special requests:
"${data.specialRequests}"
We've noted these requirements and will ensure they are addressed during your stay.
`
    : ""
}

Thank you for choosing Yala Mobile Camping!

Best regards,
Yala Mobile Camping Team`;

const generateWhatsAppMessage = (data, pricing) => `Hi ${data.firstName}! 👋

Thank you for your booking request with Yala Mobile Camping! 🏕️

📋 Booking Details:
- ID: ${data.bookingId}
- Location: ${data.location.name}  
- Dates: ${data.checkIn} to ${data.checkOut}
- Guests: ${pricing.groupSize} people
- Total: ${pricing.total.toLocaleString()}${
  pricing.savings > 0
    ? `
- You save: ${pricing.savings}!`
    : ""
}

GREAT NEWS: Your dates are available! ✅

${
  data.specialRequests
    ? `
📝 I've noted your special requests: "${data.specialRequests}"`
    : ""
}

Welcome to Yala Mobile Camping! 🌟`;

// ========================================
// CSS STYLES
// ========================================

const getEmailStyles = () => `
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
  
  .header { 
    background: linear-gradient(135deg, #dc2626 0%, #ef4444 50%, #f87171 100%); 
    color: white; 
    padding: 30px 20px; 
    text-align: center; 
  }
  .header h1 { 
    font-size: 28px; 
    font-weight: bold; 
    margin-bottom: 8px; 
    text-shadow: 0 2px 4px rgba(0,0,0,0.3);
  }
  .header p {
    font-size: 16px;
    opacity: 0.95;
  }
  
  .content { padding: 0; }
  
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
  
  .info-grid { display: grid; gap: 15px; }
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
  .info-row:hover { transform: translateX(2px); }
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
  .info-value a { color: #3b82f6; text-decoration: none; }
  .info-value a:hover { text-decoration: underline; }
  
  /* FIXED PRICING SECTION STYLES */
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
  
  .pricing-breakdown {
    background: white;
    border-radius: 10px;
    padding: 20px;
    margin: 15px 0;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  }
  
  .pricing-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px;
    margin: 10px 0;
    border-radius: 8px;
    background: #f8fafc;
    border-left: 4px solid #10b981;
    transition: all 0.2s ease;
  }
  
  .pricing-row:hover {
    background: #f1f5f9;
    transform: translateX(3px);
  }
  
  .pricing-row.additional-persons {
    border-left-color: #3b82f6;
    background: #eff6ff;
  }
  
  .pricing-row.subtotal {
    border-left-color: #f59e0b;
    background: #fffbeb;
    font-weight: 600;
    border-top: 2px solid #e5e7eb;
    margin-top: 20px;
    padding-top: 20px;
  }
  
  .pricing-row.total {
    border-left-color: #059669;
    background: linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%);
    border: 2px solid #10b981;
    font-weight: bold;
    margin-top: 25px;
    padding: 20px;
  }
  
  .pricing-item {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 5px;
  }
  
  .pricing-label {
    font-weight: 600;
    color: #1f2937;
    font-size: 16px;
  }
  
  .pricing-calculation {
    font-size: 14px;
    color: #6b7280;
    font-style: italic;
  }
  
  .pricing-details {
    font-size: 13px;
    color: #059669;
    font-weight: 500;
  }
  
  .savings-note {
    font-size: 12px;
    color: #059669;
    font-weight: 600;
    background: #d1fae5;
    padding: 4px 8px;
    border-radius: 4px;
    display: inline-block;
    margin-top: 5px;
  }
  
  .pricing-value {
    font-weight: 700;
    color: #1f2937;
    font-size: 18px;
    text-align: right;
    min-width: 120px;
  }
  
  .total-amount {
    font-size: 28px !important;
    color: #059669 !important;
    text-shadow: 0 1px 2px rgba(0,0,0,0.1);
  }
  
  .savings-summary {
    background: linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%);
    border: 2px solid #10b981;
    border-radius: 8px;
    padding: 15px;
    text-align: center;
    font-size: 16px;
    font-weight: 600;
    color: #065f46;
    margin-top: 20px;
  }
  
  .pricing-verification {
    background: #f3f4f6;
    padding: 15px;
    border-radius: 8px;
    margin-top: 20px;
    font-size: 14px;
    color: #374151;
    border-left: 4px solid #6b7280;
  }
  
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
  .footer-info strong { color: #374151; }
  
  @media (max-width: 600px) { 
    .container { margin: 10px; border-radius: 8px; }
    .info-row, .pricing-row { 
      flex-direction: column;
      align-items: flex-start;
      gap: 8px;
      padding: 12px;
    }
    .info-value, .pricing-value { 
      text-align: left; 
      font-size: 16px;
    }
    .total-amount {
      font-size: 24px !important;
    }
    .btn {
      display: block;
      margin: 10px 0;
      padding: 12px 20px;
      font-size: 14px;
    }
    .header h1 { font-size: 22px; }
    .section, .urgent-banner, .pricing-section, .action-buttons, .footer-info {
      margin: 15px;
      padding: 20px;
    }
  }
`;

const getCustomerEmailStyles = () => `
  body { 
    font-family: Arial, sans-serif; 
    line-height: 1.6; 
    color: #333; 
    margin: 0; 
    padding: 20px; 
  }
  .container { 
    max-width: 600px; 
    margin: 0 auto; 
    background: white; 
    border-radius: 10px; 
    overflow: hidden; 
    box-shadow: 0 2px 10px rgba(0,0,0,0.1); 
  }
  .header { 
    background: linear-gradient(135deg, #059669, #10b981); 
    color: white; 
    padding: 30px; 
    text-align: center; 
  }
  .content { padding: 30px; }
  .success { 
    background: #d1fae5; 
    border: 2px solid #10b981; 
    padding: 20px; 
    margin: 20px 0; 
    border-radius: 8px; 
    text-align: center; 
  }
  .section { 
    background: #f8fafc; 
    padding: 20px; 
    margin: 20px 0; 
    border-radius: 8px; 
    border-left: 4px solid #10b981; 
  }
  .info-row { 
    display: flex; 
    justify-content: space-between; 
    padding: 8px 0; 
    border-bottom: 1px solid #e5e7eb; 
  }
  .info-row:last-child { border-bottom: none; }
  
  /* FIXED CUSTOMER PRICING STYLES */
  .customer-pricing {
    background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%);
    padding: 25px;
    margin: 20px 0;
    border-radius: 12px;
    border: 2px solid #10b981;
    box-shadow: 0 4px 15px rgba(16, 185, 129, 0.1);
  }
  
  .customer-pricing h3 {
    color: #065f46;
    margin-bottom: 20px;
    text-align: center;
    font-size: 22px;
    font-weight: bold;
  }
  
  .pricing-details {
    background: white;
    padding: 25px;
    border-radius: 10px;
    margin-bottom: 20px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  }
  
  .pricing-line {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px 0;
    border-bottom: 1px solid #e5e7eb;
    font-size: 16px;
  }
  
  .pricing-line:last-child {
    border-bottom: none;
  }
  
  .pricing-line.additional {
    color: #3b82f6;
    font-weight: 600;
    background: #eff6ff;
    padding: 15px;
    border-radius: 8px;
    margin: 10px 0;
    border-bottom: none;
  }
  
  .pricing-line.subtotal {
    border-top: 2px solid #10b981;
    margin-top: 20px;
    padding-top: 20px;
    font-size: 18px;
    font-weight: 700;
    background: #f0fdf4;
    padding: 15px;
    border-radius: 8px;
    color: #065f46;
  }
  
  .pricing-sub-line {
    font-size: 13px;
    color: #6b7280;
    font-style: italic;
    margin: 5px 0 15px 0;
    padding-left: 10px;
  }
  
  .pricing-note {
    text-align: center;
    margin: 15px 0;
    padding: 12px;
    background: linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%);
    border-radius: 8px;
    border: 1px solid #10b981;
  }
  
  .pricing-note small {
    color: #065f46;
    font-weight: 700;
    font-size: 14px;
  }
  
  .total-section {
    border-top: 3px solid #10b981;
    padding-top: 25px;
    margin-top: 25px;
  }
  
  .contact { 
    background: #ecfdf5; 
    padding: 20px; 
    margin: 20px 0; 
    border-radius: 8px; 
    text-align: center; 
  }
  
  @media (max-width: 600px) {
    .pricing-line {
      flex-direction: column;
      gap: 8px;
      align-items: flex-start;
      text-align: left;
    }
    
    .pricing-line span:last-child {
      font-weight: bold;
      color: #059669;
      font-size: 18px;
    }
    
    .pricing-sub-line {
      padding-left: 0;
      margin-top: 10px;
    }
  }
`;

// Export functions including the new deduplicated admin email function
export default {
  generateAdminEmailTemplate,
  generateCustomerEmailTemplate,
  calculateEmailPricing,
  sendDeduplicatedAdminEmails,
  getUniqueAdminEmails,
};
