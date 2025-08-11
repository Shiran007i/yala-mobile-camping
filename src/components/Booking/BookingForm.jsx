// ===================================================================
// src/components/Booking/BookingForm.jsx - FIXED VERSION
// ===================================================================

import React, { useState } from "react";
import {
  Calendar,
  Users,
  Mail,
  Phone,
  MessageCircle,
  User,
  MapPin,
  Star,
  Send,
} from "lucide-react";

const BookingForm = ({ selectedLocation, onBookingComplete }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    checkIn: "",
    checkOut: "",
    groupSize: 1,
    accommodationType: "Safari Tent",
    mealPlan: "Full Board",
    specialRequests: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // *** FIX 1: Better handling of missing selectedLocation ***
  if (!selectedLocation) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
          <div className="text-red-600 mb-4">
            <svg
              className="h-12 w-12 mx-auto"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-2.186-.833-2.956 0L3.857 16.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">
            No Location Selected
          </h2>
          <p className="text-gray-600 mb-4">
            Please select a camping location first.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors"
          >
            Go Back to Locations
          </button>
        </div>
      </div>
    );
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const calculateNights = () => {
    if (formData.checkIn && formData.checkOut) {
      const checkIn = new Date(formData.checkIn);
      const checkOut = new Date(formData.checkOut);
      const diffTime = Math.abs(checkOut - checkIn);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays;
    }
    return 0;
  };

  const calculateTotal = () => {
    const nights = calculateNights();
    return nights * selectedLocation.price_per_night;
  };

  const generateBookingId = () => {
    const timestamp = Date.now().toString(36);
    const randomStr = Math.random().toString(36).substring(2, 8);
    return `YMC-${timestamp}-${randomStr}`.toUpperCase();
  };

  // *** FIX 2: Updated API submission with better error handling ***
  const handleSubmitBooking = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const nights = calculateNights();
      const total = calculateTotal();
      const bookingId = generateBookingId();

      // Prepare booking data
      const bookingData = {
        bookingId,
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        checkIn: formData.checkIn,
        checkOut: formData.checkOut,
        nights,
        groupSize: formData.groupSize,
        accommodationType: formData.accommodationType,
        mealPlan: formData.mealPlan,
        total,
        location: selectedLocation,
        specialRequests: formData.specialRequests,
        submittedAt: new Date().toISOString(),
      };

      console.log("🚀 Attempting to submit booking:", bookingData);

      // *** MAIN FIX: Better API call with detailed error handling ***
      try {
        console.log("📡 Calling API endpoint: /api/booking");

        ///Users/shiran/builds/web/mobile-camping/src/app/api/booking/route.ts

        const response = await fetch("/api/booking", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(bookingData),
        });

        console.log("📨 API Response status:", response.status);
        console.log("📨 API Response headers:", [
          ...response.headers.entries(),
        ]);

        if (!response.ok) {
          const errorText = await response.text();
          console.error("❌ API Error Response:", errorText);
          // If it's a 404, the API route isn't working
          if (response.status === 404) {
            throw new Error("API endpoint not found - deployment issue");
          }

          throw new Error(
            `API call failed with status ${response.status}: ${errorText}`
          );
        }

        const result = await response.json();
        console.log("✅ API Success Response:", result);

        if (result.success) {
          // SUCCESS - Show success message
          alert(`🎉 SUCCESS! Your booking has been submitted!

📧 Confirmation emails sent automatically
📋 Booking ID: ${result.bookingId}
⏰ We'll respond within 1-2 hours

✅ Check your email for confirmation details!`);

          // Optional: Ask about WhatsApp
          const wantWhatsApp = window.confirm(
            `📱 Would you also like to message us on WhatsApp for faster service?`
          );

          if (wantWhatsApp && result.whatsappLink) {
            window.open(result.whatsappLink, "_blank");
          }

          // Pass to confirmation page
          onBookingComplete && onBookingComplete(bookingData);
          return;
        } else {
          throw new Error(
            result.message || "API returned unsuccessful response"
          );
        }
      } catch (apiError) {
        console.error("❌ API call failed:", apiError);

        // Show user-friendly error with fallback options
        const userChoice = window.confirm(
          `⚠️ Automatic booking submission failed, but don't worry!

❌ Error: ${apiError.message}

✅ You can still complete your booking using:
• Email (recommended)
• WhatsApp

Would you like to try the email option now?`
        );

        if (userChoice) {
          handleEmailBooking(bookingData);
        } else {
          // Show WhatsApp option
          const whatsappChoice = window.confirm(
            `📱 Would you like to send your booking via WhatsApp instead?`
          );
          if (whatsappChoice) {
            handleWhatsAppBooking(bookingData);
          }
        }
        return;
      }
    } catch (error) {
      console.error("💥 Unexpected error:", error);
      alert(
        `❌ Unexpected error: ${error.message}\n\nPlease try the email or WhatsApp options below.`
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // Email booking using mailto - with booking data passed
  const handleEmailBooking = (bookingData = null) => {
    const nights = calculateNights();
    const total = calculateTotal();
    const bookingId = bookingData?.bookingId || generateBookingId();

    // Use provided booking data or create new
    const finalBookingData = bookingData || {
      bookingId,
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phone: formData.phone,
      checkIn: formData.checkIn,
      checkOut: formData.checkOut,
      nights,
      groupSize: formData.groupSize,
      accommodationType: formData.accommodationType,
      mealPlan: formData.mealPlan,
      total,
      location: selectedLocation,
      specialRequests: formData.specialRequests,
    };

    const subject = `🏕️ New Booking Request - ${selectedLocation.name} - ID: ${finalBookingData.bookingId}`;

    const emailBody = `
New Booking Request Details:

📋 BOOKING ID: ${finalBookingData.bookingId}
📅 Booking Date: ${new Date().toLocaleString()}

👤 GUEST INFORMATION:
Name: ${finalBookingData.firstName} ${finalBookingData.lastName}
Email: ${finalBookingData.email}
Phone: ${finalBookingData.phone}

🏕️ ACCOMMODATION DETAILS:
Location: ${selectedLocation.name}
Address: ${selectedLocation.location}
Check-in: ${finalBookingData.checkIn}
Check-out: ${finalBookingData.checkOut}
Duration: ${finalBookingData.nights} nights
Guests: ${finalBookingData.groupSize}
Accommodation: ${finalBookingData.accommodationType}
Meal Plan: ${finalBookingData.mealPlan}

💰 PRICING:
Rate: $${selectedLocation.price_per_night}/night
Total: $${finalBookingData.total} (${finalBookingData.nights} nights)

📝 SPECIAL REQUESTS:
${finalBookingData.specialRequests || "None"}

⏰ STATUS: Pending Confirmation

Please confirm availability and send payment details.

Best regards,
${finalBookingData.firstName} ${finalBookingData.lastName}
    `.trim();

    const mailtoLink = `mailto:bookings@yalamobilecamping.com?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(emailBody)}`;
    window.open(mailtoLink, "_blank");

    // Show success message
    alert(`📧 Opening email client...

📋 Booking ID: ${finalBookingData.bookingId}
📧 Email prepared and ready to send!

Next steps:
1. Send the email that just opened
2. Check your email for our response (usually within 1-2 hours)
3. We'll send payment instructions once confirmed`);

    // Pass to confirmation page
    onBookingComplete && onBookingComplete(finalBookingData);
  };

  // WhatsApp message creation
  const createWhatsAppMessage = (bookingData) => {
    return `🏕️ *NEW BOOKING REQUEST*

📋 *Booking ID:* ${bookingData.bookingId}
📅 *Date:* ${new Date().toLocaleString()}

👤 *Guest Details:*
• Name: ${bookingData.firstName} ${bookingData.lastName}
• Email: ${bookingData.email}
• Phone: ${bookingData.phone}

🏕️ *Accommodation:*
• Location: ${bookingData.location.name}
• Address: ${bookingData.location.location}
• Check-in: ${bookingData.checkIn}
• Check-out: ${bookingData.checkOut}
• Duration: ${bookingData.nights} nights
• Guests: ${bookingData.groupSize}
• Accommodation: ${bookingData.accommodationType}
• Meal Plan: ${bookingData.mealPlan}

💰 *Pricing:*
• Rate: $${bookingData.location.price_per_night}/night
• *Total: $${bookingData.total}*

${
  bookingData.specialRequests
    ? `📝 *Special Requests:*\n${bookingData.specialRequests}\n\n`
    : ""
}Please confirm availability and send payment details. Thank you! 🙏`;
  };

  // WhatsApp booking
  const handleWhatsAppBooking = (bookingData = null) => {
    const nights = calculateNights();
    const total = calculateTotal();
    const bookingId = bookingData?.bookingId || generateBookingId();

    const finalBookingData = bookingData || {
      ...formData,
      bookingId,
      nights,
      total,
      location: selectedLocation,
    };

    const message = createWhatsAppMessage(finalBookingData);
    const whatsappUrl = `https://wa.me/94713991051?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappUrl, "_blank");

    // Show success message
    alert(`📱 Opening WhatsApp...

📋 Booking ID: ${finalBookingData.bookingId}
💬 WhatsApp message prepared and ready to send!

We'll respond quickly via WhatsApp with confirmation and payment details.`);

    // Pass to confirmation page
    onBookingComplete && onBookingComplete(finalBookingData);
  };

  const isFormValid = () => {
    return (
      formData.firstName &&
      formData.lastName &&
      formData.email &&
      formData.phone &&
      formData.checkIn &&
      formData.checkOut &&
      formData.groupSize > 0
    );
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Location Summary */}
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-1/3">
            <img
              src={selectedLocation.image_url}
              alt={selectedLocation.name}
              className="w-full h-48 object-cover rounded-lg"
            />
          </div>
          <div className="md:w-2/3">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {selectedLocation.name}
            </h2>
            <div className="flex items-center mb-3">
              <MapPin className="h-4 w-4 text-gray-500 mr-1" />
              <span className="text-gray-600">{selectedLocation.location}</span>
              <div className="flex items-center ml-4">
                <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                <span className="font-medium">
                  {selectedLocation.rating || "4.9"}
                </span>
              </div>
            </div>
            <p className="text-gray-700 mb-4">{selectedLocation.description}</p>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold text-emerald-600">
                ${selectedLocation.price_per_night}
                <span className="text-sm font-normal text-gray-600">
                  /night
                </span>
              </div>
              <div className="text-sm text-gray-600">
                Max {selectedLocation.max_guests || 8} guests •{" "}
                {selectedLocation.difficulty || "Easy"}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Form */}
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Book Your Adventure
        </h2>

        <form onSubmit={handleSubmitBooking}>
          <div className="space-y-6">
            {/* Guest Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <User className="h-4 w-4 inline mr-1" />
                  First Name *
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  placeholder="Enter your first name"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <User className="h-4 w-4 inline mr-1" />
                  Last Name *
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  placeholder="Enter your last name"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Mail className="h-4 w-4 inline mr-1" />
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Phone className="h-4 w-4 inline mr-1" />
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  placeholder="+94 71 234 5678"
                  required
                />
              </div>
            </div>

            {/* Booking Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Calendar className="h-4 w-4 inline mr-1" />
                  Check-in Date *
                </label>
                <input
                  type="date"
                  name="checkIn"
                  value={formData.checkIn}
                  onChange={handleInputChange}
                  min={new Date().toISOString().split("T")[0]}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Calendar className="h-4 w-4 inline mr-1" />
                  Check-out Date *
                </label>
                <input
                  type="date"
                  name="checkOut"
                  value={formData.checkOut}
                  onChange={handleInputChange}
                  min={
                    formData.checkIn || new Date().toISOString().split("T")[0]
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Users className="h-4 w-4 inline mr-1" />
                  Group Size *
                </label>
                <select
                  name="groupSize"
                  value={formData.groupSize}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  required
                >
                  {Array.from(
                    { length: selectedLocation?.max_guests || 8 },
                    (_, i) => (
                      <option key={i + 1} value={i + 1}>
                        {i + 1} {i + 1 === 1 ? "Guest" : "Guests"}
                      </option>
                    )
                  )}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Accommodation Type
                </label>
                <select
                  name="accommodationType"
                  value={formData.accommodationType}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                >
                  <option value="Safari Tent">Safari Tent</option>
                  <option value="Luxury Tent">Luxury Tent</option>
                  <option value="Family Tent">Family Tent</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Meal Plan
                </label>
                <select
                  name="mealPlan"
                  value={formData.mealPlan}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                >
                  <option value="Full Board">Full Board</option>
                  <option value="Half Board">Half Board</option>
                  <option value="Breakfast Only">Breakfast Only</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Special Requests (Optional)
              </label>
              <textarea
                name="specialRequests"
                value={formData.specialRequests}
                onChange={handleInputChange}
                rows="4"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                placeholder="Any special dietary requirements, accessibility needs, or other requests..."
              />
            </div>

            {/* Price Summary */}
            {formData.checkIn && formData.checkOut && (
              <div className="bg-emerald-50 p-6 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-4">
                  Price Summary
                </h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>
                      ${selectedLocation.price_per_night} × {calculateNights()}{" "}
                      nights
                    </span>
                    <span>
                      ${selectedLocation.price_per_night * calculateNights()}
                    </span>
                  </div>
                  <div className="border-t border-emerald-200 pt-2 mt-2">
                    <div className="flex justify-between text-lg font-bold">
                      <span>Total</span>
                      <span className="text-emerald-600">
                        ${calculateTotal()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* *** FIX 3: Updated Booking Options with Clear Labels *** */}
            <div className="bg-blue-50 p-6 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-4">
                Choose Your Booking Method:
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button
                  type="submit"
                  disabled={isSubmitting || !isFormValid()}
                  className="bg-emerald-600 text-white px-6 py-4 rounded-lg font-semibold hover:bg-emerald-700 transition-colors flex items-center justify-center disabled:bg-gray-400"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Sending Automatically...
                    </>
                  ) : (
                    <>
                      <Send className="h-5 w-5 mr-2" />✨ Auto Submit
                      (Recommended)
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => handleEmailBooking()}
                  disabled={!isFormValid()}
                  className="bg-blue-600 text-white px-6 py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center disabled:bg-gray-300"
                >
                  <Mail className="h-5 w-5 mr-2" />
                  📧 Email Backup
                </button>

                <button
                  type="button"
                  onClick={() => handleWhatsAppBooking()}
                  disabled={!isFormValid()}
                  className="bg-green-500 text-white px-6 py-4 rounded-lg font-semibold hover:bg-green-600 transition-colors flex items-center justify-center disabled:bg-gray-300"
                >
                  <MessageCircle className="h-5 w-5 mr-2" />
                  💬 WhatsApp Backup
                </button>
              </div>

              <div className="mt-4 text-sm text-gray-600">
                <p>
                  <strong>Auto Submit:</strong> Sends emails automatically to
                  both you and our team
                </p>
                <p>
                  <strong>Email/WhatsApp Backup:</strong> Use if auto-submit
                  doesn't work
                </p>
              </div>
            </div>
          </div>
        </form>
      </div>

      {/* Information Cards */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-blue-50 p-6 rounded-lg">
          <Mail className="h-8 w-8 text-blue-600 mb-4" />
          <h4 className="font-semibold text-blue-900 mb-2">Email Booking</h4>
          <p className="text-sm text-blue-800 mb-2">
            Get detailed confirmation and documentation via email
          </p>
          <p className="text-sm font-medium text-blue-900">
            📧 bookings@yalamobilecamping.com
          </p>
        </div>

        <div className="bg-green-50 p-6 rounded-lg">
          <MessageCircle className="h-8 w-8 text-green-600 mb-4" />
          <h4 className="font-semibold text-green-900 mb-2">
            WhatsApp Booking
          </h4>
          <p className="text-sm text-green-800 mb-2">
            Instant communication and quick responses
          </p>
          <p className="text-sm font-medium text-green-900">
            📱 +94 71 399 1051
          </p>
        </div>
      </div>

      {/* Debug Info (remove in production) */}
      {process.env.NODE_ENV === "development" && (
        <div className="mt-8 bg-yellow-50 p-4 rounded-lg border border-yellow-200">
          <h4 className="font-semibold text-yellow-800 mb-2">
            Debug Info (Development Only)
          </h4>
          <div className="text-sm text-yellow-700">
            <p>Selected Location: {selectedLocation?.name || "None"}</p>
            <p>Form Valid: {isFormValid() ? "Yes" : "No"}</p>
            <p>API Endpoint: /api/booking</p>
            <p>Environment: {process.env.NODE_ENV}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingForm;
