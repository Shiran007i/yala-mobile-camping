// ===================================================================
// src/components/Booking/BookingForm.jsx - UPDATED WITH CORRECT PRICING
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
    groupSize: 2, // Start with 2 as minimum
    accommodationType: "Safari Tent",
    mealPlan: "Full Board",
    specialRequests: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // *** UPDATED PRICING CALCULATION ***
  const calculatePricing = (persons, nights) => {
    const BASE_PRICE_2_PERSONS = 950;
    const ADDITIONAL_PERSON_PRICE = 950 / 2 - 25; // $450 per additional person

    let total = BASE_PRICE_2_PERSONS * nights; // Base price for 2 persons

    if (persons > 2) {
      const additionalPersons = persons - 2;
      const additionalCost =
        additionalPersons * ADDITIONAL_PERSON_PRICE * nights;
      total += additionalCost;
    }

    return {
      basePrice: BASE_PRICE_2_PERSONS,
      additionalPersonPrice: ADDITIONAL_PERSON_PRICE,
      additionalPersons: Math.max(0, persons - 2),
      additionalCost:
        persons > 2 ? (persons - 2) * ADDITIONAL_PERSON_PRICE * nights : 0,
      total: total,
      perPerson: total / persons,
      perNight: total / nights,
      savings: persons > 2 ? (persons - 2) * 25 * nights : 0, // $25 savings per additional person per night
    };
  };

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

  const getCurrentPricing = () => {
    const nights = calculateNights();
    if (nights > 0) {
      return calculatePricing(formData.groupSize, nights);
    }
    return { total: 0 };
  };

  const generateBookingId = () => {
    const timestamp = Date.now().toString(36);
    const randomStr = Math.random().toString(36).substring(2, 8);
    return `YMC-${timestamp}-${randomStr}`.toUpperCase();
  };

  // *** FIX 2: Updated API submission with correct pricing ***
  const handleSubmitBooking = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const nights = calculateNights();
      const pricing = calculatePricing(formData.groupSize, nights);
      const bookingId = generateBookingId();

      // Prepare booking data with updated pricing
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
        total: pricing.total,
        location: {
          ...selectedLocation,
          price_per_night: 950, // Base price for 2 persons per night
        },
        pricing: pricing, // Include detailed pricing breakdown
        specialRequests: formData.specialRequests,
        submittedAt: new Date().toISOString(),
      };

      console.log("🚀 Attempting to submit booking:", bookingData);

      // API call with detailed error handling
      try {
        console.log("📡 Calling API endpoint: /api/booking");

        const response = await fetch("/api/booking", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(bookingData),
        });

        console.log("📨 API Response status:", response.status);

        if (!response.ok) {
          const errorText = await response.text();
          console.error("❌ API Error Response:", errorText);
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
          alert(`🎉 SUCCESS! Your booking has been submitted!

📧 Confirmation emails sent automatically
📋 Booking ID: ${result.bookingId}
⏰ We'll respond within 1-2 hours

✅ Check your email for confirmation details!`);

          const wantWhatsApp = window.confirm(
            `📱 Would you also like to message us on WhatsApp for faster service?`
          );

          if (wantWhatsApp && result.whatsappLink) {
            window.open(result.whatsappLink, "_blank");
          }

          onBookingComplete && onBookingComplete(bookingData);
          return;
        } else {
          throw new Error(
            result.message || "API returned unsuccessful response"
          );
        }
      } catch (apiError) {
        console.error("❌ API call failed:", apiError);

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

  // Email booking with updated pricing
  const handleEmailBooking = (bookingData = null) => {
    const nights = calculateNights();
    const pricing = calculatePricing(formData.groupSize, nights);
    const bookingId = bookingData?.bookingId || generateBookingId();

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
      total: pricing.total,
      pricing: pricing,
      location: selectedLocation,
      specialRequests: formData.specialRequests,
    };

    const subject = `🕏️ New Booking Request - ${selectedLocation.name} - ID: ${finalBookingData.bookingId}`;

    const emailBody = `
New Booking Request Details:

📋 BOOKING ID: ${finalBookingData.bookingId}
📅 Booking Date: ${new Date().toLocaleString()}

👤 GUEST INFORMATION:
Name: ${finalBookingData.firstName} ${finalBookingData.lastName}
Email: ${finalBookingData.email}
Phone: ${finalBookingData.phone}

🕏️ ACCOMMODATION DETAILS:
Location: ${selectedLocation.name}
Address: ${selectedLocation.location}
Check-in: ${finalBookingData.checkIn}
Check-out: ${finalBookingData.checkOut}
Duration: ${finalBookingData.nights} nights
Guests: ${finalBookingData.groupSize}
Accommodation: ${finalBookingData.accommodationType}
Meal Plan: ${finalBookingData.mealPlan}

💰 PRICING BREAKDOWN:
Base Package (2 persons): $950 × ${finalBookingData.nights} nights = $${
      950 * finalBookingData.nights
    }
${
  finalBookingData.groupSize > 2
    ? `Additional Persons (${finalBookingData.groupSize - 2}): $450 × ${
        finalBookingData.groupSize - 2
      } × ${finalBookingData.nights} nights = $${
        (finalBookingData.groupSize - 2) * 450 * finalBookingData.nights
      }`
    : ""
}
${
  finalBookingData.groupSize > 2
    ? `Savings: $${
        (finalBookingData.groupSize - 2) * 25 * finalBookingData.nights
      } ($25 discount per additional person per night)`
    : ""
}
TOTAL: $${finalBookingData.total}

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

    alert(`📧 Opening email client...

📋 Booking ID: ${finalBookingData.bookingId}
📧 Email prepared and ready to send!

Next steps:
1. Send the email that just opened
2. Check your email for our response (usually within 1-2 hours)
3. We'll send payment instructions once confirmed`);

    onBookingComplete && onBookingComplete(finalBookingData);
  };

  // WhatsApp message with updated pricing
  const createWhatsAppMessage = (bookingData) => {
    return `🕏️ *NEW BOOKING REQUEST*

📋 *Booking ID:* ${bookingData.bookingId}
📅 *Date:* ${new Date().toLocaleString()}

👤 *Guest Details:*
• Name: ${bookingData.firstName} ${bookingData.lastName}
• Email: ${bookingData.email}
• Phone: ${bookingData.phone}

🕏️ *Accommodation:*
• Location: ${bookingData.location.name}
• Address: ${bookingData.location.location}
• Check-in: ${bookingData.checkIn}
• Check-out: ${bookingData.checkOut}
• Duration: ${bookingData.nights} nights
• Guests: ${bookingData.groupSize}
• Accommodation: ${bookingData.accommodationType}
• Meal Plan: ${bookingData.mealPlan}

💰 *Pricing:*
• Base Package (2 persons): $950 × ${bookingData.nights} = $${
      950 * bookingData.nights
    }
${
  bookingData.groupSize > 2
    ? `• Additional Persons (${bookingData.groupSize - 2}): $450 × ${
        bookingData.groupSize - 2
      } × ${bookingData.nights} = $${
        (bookingData.groupSize - 2) * 450 * bookingData.nights
      }`
    : ""
}
${
  bookingData.groupSize > 2
    ? `• *Your Savings:* $${
        (bookingData.groupSize - 2) * 25 * bookingData.nights
      } ($25 off per additional person!)`
    : ""
}
• *TOTAL: $${bookingData.total}*

${
  bookingData.specialRequests
    ? `📝 *Special Requests:*\n${bookingData.specialRequests}\n\n`
    : ""
}Please confirm availability and send payment details. Thank you! 🙏`;
  };

  const handleWhatsAppBooking = (bookingData = null) => {
    const nights = calculateNights();
    const pricing = calculatePricing(formData.groupSize, nights);
    const bookingId = bookingData?.bookingId || generateBookingId();

    const finalBookingData = bookingData || {
      ...formData,
      bookingId,
      nights,
      total: pricing.total,
      pricing: pricing,
      location: selectedLocation,
    };

    const message = createWhatsAppMessage(finalBookingData);
    const whatsappUrl = `https://wa.me/94713585926?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappUrl, "_blank");

    alert(`📱 Opening WhatsApp...

📋 Booking ID: ${finalBookingData.bookingId}
💬 WhatsApp message prepared and ready to send!

We'll respond quickly via WhatsApp with confirmation and payment details.`);

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
      formData.groupSize >= 2
    );
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Location Summary */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
        <div className="flex flex-col lg:flex-row">
          {/* Image Section */}
          <div className="lg:w-1/2 relative">
            <img
              src={selectedLocation.image_url}
              alt={selectedLocation.name}
              className="w-full h-64 lg:h-full object-cover"
            />
          </div>

          {/* Content Section */}
          <div className="lg:w-1/2 p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">
              {selectedLocation.name}
            </h2>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <MapPin className="h-5 w-5 text-gray-500 mr-2 flex-shrink-0" />
                <span className="text-gray-700 font-medium leading-none">
                  {selectedLocation.location}
                </span>
              </div>
              <div className="inline-flex items-center h-6">
                <span className="text-xs bg-green-100 text-gray-600 px-2 py-0.5 rounded-full font-medium leading-none">
                  {selectedLocation.best_season || "Year Round"}
                </span>
              </div>
            </div>

            {/* Updated Price Highlight */}
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 mb-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-3xl font-bold text-emerald-600">
                    $950
                  </div>
                  <div className="text-sm text-emerald-700 font-medium">
                    Complete package for 2 persons
                  </div>
                  <div className="text-xs text-gray-600 mt-1">
                    Additional person: $450/night (save $25!)
                  </div>

                  <div className="flex items-center text-sm mt-3">
                    <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                    <span className="font-semibold">
                      {selectedLocation.rating || "4.9"}
                    </span>
                    <span className="text-gray-600 ml-1">
                      ({selectedLocation.max_guests || 8} max)
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  <Users className="h-8 w-8 text-emerald-600 mx-auto mb-1" />
                  <span className="text-xs text-gray-600">For 2+ People</span>
                </div>
              </div>
            </div>

            <p className="text-gray-700 mb-6 leading-relaxed">
              {selectedLocation.description ||
                selectedLocation.detailed_description}
            </p>

            {/* Key Features Grid */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="flex items-center text-sm">
                <Calendar className="h-4 w-4 text-gray-500 mr-2" />
                <span className="text-gray-700">
                  {selectedLocation.difficulty || "Easy"} Access
                </span>
              </div>
              <div className="flex items-center text-sm">
                <MapPin className="h-4 w-4 text-gray-500 mr-2" />
                <span className="text-gray-700">
                  {selectedLocation.elevation || "30m"} Elevation
                </span>
              </div>
              <div className="flex items-center text-sm">
                <Users className="h-4 w-4 text-gray-500 mr-2" />
                <span className="text-gray-700">
                  Up to {selectedLocation.max_guests || 8} Guests
                </span>
              </div>
              <div className="flex items-center text-sm">
                <Star className="h-4 w-4 text-gray-500 mr-2" />
                <span className="text-gray-700">Premium Experience</span>
              </div>
            </div>

            {/* Included Features */}
            {selectedLocation.included && (
              <div className="border-t border-gray-200 pt-4">
                <h4 className="font-semibold text-gray-900 mb-3">
                  Package Includes:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {selectedLocation.included.slice(0, 6).map((item, index) => (
                    <div key={index} className="flex items-center text-sm">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full mr-2"></div>
                      <span className="text-gray-700 capitalize">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
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
                  value={formData.groupSize || 2}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  required
                >
                  {Array.from(
                    { length: (selectedLocation?.max_guests || 8) - 1 },
                    (_, i) => (
                      <option key={i + 2} value={i + 2}>
                        {i + 2} {i + 2 === 1 ? "Guest" : "Guests"}
                        {i >= 1 ? ` (Save $${i * 25}!)` : ""}
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

            {/* Updated Price Summary */}
            {formData.checkIn && formData.checkOut && (
              <div className="bg-emerald-50 p-6 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-4">
                  Price Summary
                </h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>
                      Base Package (2 persons) × {calculateNights()}{" "}
                      {calculateNights() === 1 ? "night" : "nights"}
                    </span>
                    <span>${950 * calculateNights()}</span>
                  </div>
                  {formData.groupSize > 2 && (
                    <>
                      <div className="flex justify-between">
                        <span>
                          Additional Persons ({formData.groupSize - 2}) × ${450}{" "}
                          × {calculateNights()}
                        </span>
                        <span>
                          ${(formData.groupSize - 2) * 450 * calculateNights()}
                        </span>
                      </div>
                      <div className="flex justify-between text-green-600">
                        <span>
                          💰 Your Savings ($25 off per additional person)
                        </span>
                        <span>
                          -${(formData.groupSize - 2) * 25 * calculateNights()}
                        </span>
                      </div>
                    </>
                  )}
                  <div className="border-t border-emerald-200 pt-2 mt-2">
                    <div className="flex justify-between text-lg font-bold">
                      <span>Total</span>
                      <span className="text-emerald-600">
                        ${getCurrentPricing().total}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-600 mt-1">
                      <span>Per Person</span>
                      <span>
                        $
                        {Math.round(
                          getCurrentPricing().total / formData.groupSize
                        )}
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

      {/* Pricing Info Card */}
      <div className="mt-8 bg-amber-50 border border-amber-200 rounded-lg p-6">
        <h4 className="font-semibold text-amber-900 mb-3 flex items-center">
          💡 Smart Pricing Structure
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-amber-800 mb-2">
              <strong>Base Package:</strong> $950 for 2 persons per night
            </p>
            <p className="text-amber-800">
              <strong>Additional Persons:</strong> $450 per person per night
            </p>
          </div>
          <div>
            <p className="text-green-700 mb-2">
              <strong>💰 You Save:</strong> $25 per additional person per night
            </p>
            <p className="text-amber-800">
              <strong>Formula:</strong> ($950 ÷ 2) - $25 = $450
            </p>
          </div>
        </div>
        <div className="mt-4 p-3 bg-amber-100 rounded border-l-4 border-amber-400">
          <p className="text-xs text-amber-800">
            <strong>Example:</strong> 4 people, 2 nights = $950×2 + $450×2×2 =
            $3,700 (You save $100 compared to individual rates!)
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
            <p>Group Size: {formData.groupSize}</p>
            <p>Nights: {calculateNights()}</p>
            {calculateNights() > 0 && (
              <>
                <p>Base Cost: ${950 * calculateNights()}</p>
                {formData.groupSize > 2 && (
                  <>
                    <p>Additional Persons: {formData.groupSize - 2}</p>
                    <p>
                      Additional Cost: $
                      {(formData.groupSize - 2) * 450 * calculateNights()}
                    </p>
                    <p>
                      Savings: $
                      {(formData.groupSize - 2) * 25 * calculateNights()}
                    </p>
                  </>
                )}
                <p>Total: ${getCurrentPricing().total}</p>
              </>
            )}
            <p>API Endpoint: /api/booking</p>
            <p>Environment: {process.env.NODE_ENV}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingForm;
