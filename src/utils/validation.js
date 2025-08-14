// ========================================
// src/utils/validation.js
// Validation utilities for booking data
// ========================================

/**
 * Validate booking data structure
 * @param {Object} data - Booking data to validate
 * @returns {Object} Validation result
 */
export const validateBookingData = (data) => {
  const errors = [];
  const warnings = [];

  // Required fields validation
  const requiredFields = [
    { field: "bookingId", type: "string" },
    { field: "firstName", type: "string" },
    { field: "lastName", type: "string" },
    { field: "email", type: "string" },
    { field: "phone", type: "string" },
    { field: "checkIn", type: "string" },
    { field: "checkOut", type: "string" },
    { field: "nights", type: "number" },
    { field: "groupSize", type: "number" },
    { field: "total", type: "number" },
    { field: "location", type: "object" }
  ];

  // Check required fields
  requiredFields.forEach(({ field, type }) => {
    if (!data[field]) {
      errors.push(`Missing required field: ${field}`);
    } else if (typeof data[field] !== type) {
      errors.push(`Invalid type for ${field}: expected ${type}, got ${typeof data[field]}`);
    }
  });

  // Email validation
  if (data.email && !isValidEmail(data.email)) {
    errors.push("Invalid email format");
  }

  // Phone validation
  if (data.phone && !isValidPhone(data.phone)) {
    warnings.push("Phone number format may be invalid");
  }

  // Date validation
  if (data.checkIn && data.checkOut) {
    const checkIn = new Date(data.checkIn);
    const checkOut = new Date(data.checkOut);
    
    if (checkIn >= checkOut) {
      errors.push("Check-out date must be after check-in date");
    }

    if (checkIn < new Date()) {
      warnings.push("Check-in date is in the past");
    }
  }

  // Group size validation
  if (data.groupSize && (data.groupSize < 1 || data.groupSize > 20)) {
    errors.push("Group size must be between 1 and 20");
  }

  // Nights validation
  if (data.nights && data.nights < 1) {
    errors.push("Number of nights must be at least 1");
  }

  // Total validation
  if (data.total && data.total <= 0) {
    errors.push("Total amount must be greater than 0");
  }

  // Location validation
  if (data.location) {
    if (!data.location.name) {
      errors.push("Location name is required");
    }
    if (!data.location.location) {
      errors.push("Location address is required");
    }
    if (!data.location.price_per_night || data.location.price_per_night <= 0) {
      errors.push("Valid price per night is required");
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
    hasWarnings: warnings.length > 0
  };
};

/**
 * Email format validation
 * @param {string} email - Email to validate
 * @returns {boolean} Is valid email
 */
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Phone number validation (flexible for international numbers)
 * @param {string} phone - Phone to validate
 * @returns {boolean} Is valid phone
 */
const isValidPhone = (phone) => {
  // Remove all non-digits
  const cleanPhone = phone.replace(/\D/g, '');
  // Should have at least 7 digits and max 15 (international standard)
  return cleanPhone.length >= 7 && cleanPhone.length <= 15;
};

/**
 * Sanitize booking data
 * @param {Object} data - Raw booking data
 * @returns {Object} Sanitized booking data
 */
export const sanitizeBookingData = (data) => {
  return {
    ...data,
    firstName: data.firstName?.trim(),
    lastName: data.lastName?.trim(),
    email: data.email?.trim().toLowerCase(),
    phone: data.phone?.trim(),
    specialRequests: data.specialRequests?.trim(),
    // Ensure numbers are actually numbers
    nights: parseInt(data.nights) || 1,
    groupSize: parseInt(data.groupSize) || 1,
    total: parseFloat(data.total) || 0,
    // Add timestamp if not present
    submittedAt: data.submittedAt || new Date().toISOString()
  };
};

/**
 * Generate WhatsApp link for booking
 * @param {Object} bookingData - Booking information
 * @returns {string} WhatsApp URL
 */
export const generateWhatsAppLink = (bookingData) => {
  const phone = "94713991051"; // Your business WhatsApp number
  const message = `Hi! I just submitted booking ${bookingData.bookingId} for ${bookingData.nights} nights at ${bookingData.location.name}. Looking forward to hearing from you!`;
  
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
};

/**
 * Log booking activity (for monitoring/debugging)
 * @param {string} action - Action performed
 * @param {Object} bookingData - Booking data
 * @param {Object} result - Action result
 */
export const logBookingActivity = (action, bookingData, result = {}) => {
  const logEntry = {
    timestamp: new Date().toISOString(),
    action,
    bookingId: bookingData.bookingId,
    customerEmail: bookingData.email,
    total: bookingData.total,
    groupSize: bookingData.groupSize,
    nights: bookingData.nights,
    location: bookingData.location.name,
    success: result.success !== false,
    ...result
  };

  console.log(`📝 BOOKING LOG [${action}]:`, JSON.stringify(logEntry, null, 2));
  
  // In production, you might want to send this to a logging service
  // or save to a database
};

// Default export for convenience
export default {
  sendBookingEmails,
  validateBookingData,
  sanitizeBookingData,
  generateWhatsAppLink,
  logBookingActivity
};