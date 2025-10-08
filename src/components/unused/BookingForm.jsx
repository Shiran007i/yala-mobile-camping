import React, { useState } from "react";
import {
  Calendar,
  Users,
  Mail,
  Phone,
  MessageCircle,
  CreditCard,
  CheckCircle,
  User,
  MapPin,
  Star,
} from "lucide-react";
import { Helmet } from "react-helmet";

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

  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Return loading state if selectedLocation is not available
  if (!selectedLocation) {
    return (
      <div className="max-w-4xl mx-auto px-2 sm:px-4 md:px-8">
        <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-base md:text-lg">
            Loading location details...
          </p>
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Placeholder for form submission logic
      console.log("Form data:", formData);
      console.log("Selected location:", selectedLocation);
      console.log("Total cost:", calculateTotal());

      // Call onBookingComplete prop to pass the form data to the parent component
      onBookingComplete(formData);
    } catch (error) {
      console.error("Error processing booking:", error);
      alert(`Error processing booking: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleWhatsAppBooking = () => {
    const nights = calculateNights();
    const total = calculateTotal();
    const message = `Hi! I'd like to book ${
      selectedLocation.name
    } camping experience.

Details:
📅 Check-in: ${formData.checkIn}
📅 Check-out: ${formData.checkOut}
👥 Guests: ${formData.groupSize}
🏕️ Location: ${selectedLocation.location}
🏠 Accommodation: ${formData.accommodationType}
🍽️ Meal Plan: ${formData.mealPlan}
💰 Total: $${total} (${nights} nights × $${
      selectedLocation.price_per_night
    }/night)

Name: ${formData.firstName} ${formData.lastName}
Email: ${formData.email}
Phone: ${formData.phone}

${
  formData.specialRequests
    ? `Special Requests: ${formData.specialRequests}`
    : ""
}

Please confirm availability and send payment details. Thank you!`;

    const whatsappUrl = `https://wa.me/94716335000?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappUrl, "_blank");
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
    <>
      <Helmet>
        <title>
          Book Your Yala Mobile Camping Safari | Yala Mobile Camping
        </title>
        <meta
          name="description"
          content="Book your luxury mobile camping safari in Yala National Park, Sri Lanka. Reserve your tent, select your dates, and start your wildlife adventure!"
        />
        <meta
          name="keywords"
          content="book yala camping, yala safari booking, sri lanka camping reservation, wildlife adventure booking, mobile camping reservation"
        />
        <meta
          property="og:title"
          content="Book Your Yala Mobile Camping Safari"
        />
        <meta
          property="og:description"
          content="Book your luxury mobile camping safari in Yala National Park, Sri Lanka. Reserve your tent, select your dates, and start your wildlife adventure!"
        />
        <meta property="og:type" content="website" />
      </Helmet>
      <div className="max-w-4xl mx-auto px-2 sm:px-4 md:px-8">
        {/* Location Summary */}
        <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 md:p-8 mb-6 md:mb-8">
          <div className="flex flex-col md:flex-row gap-4 md:gap-6">
            <div className="md:w-1/3">
              <img
                src={selectedLocation.image_url}
                alt={selectedLocation.name}
                className="w-full h-40 sm:h-48 object-cover rounded-lg"
              />
            </div>
            <div className="md:w-2/3">
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
                {selectedLocation.name}
              </h2>
              <div className="flex flex-wrap items-center mb-3 gap-2">
                <MapPin className="h-4 w-4 text-gray-500 mr-1" />
                <span className="text-gray-600 text-sm sm:text-base">
                  {selectedLocation.location}
                </span>
                <div className="flex items-center ml-0 sm:ml-4">
                  <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                  <span className="font-medium text-sm sm:text-base">
                    {selectedLocation.rating || "4.9"}
                  </span>
                </div>
              </div>
              <p className="text-gray-700 text-sm sm:text-base mb-4">
                {selectedLocation.description}
              </p>
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                <div className="text-xl sm:text-2xl font-bold text-emerald-600">
                  ${selectedLocation.price_per_night}
                  <span className="text-xs sm:text-sm font-normal text-gray-600">
                    /night
                  </span>
                </div>
                <div className="text-xs sm:text-sm text-gray-600">
                  Max {selectedLocation.max_guests || 8} guests •{" "}
                  {selectedLocation.difficulty || "Easy"}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Booking Form */}
        <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-8">
          <div className="mb-6 sm:mb-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-2">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                Book Your Adventure
              </h2>
              <div className="flex space-x-2">
                {[1, 2].map((s) => (
                  <div
                    key={s}
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                      step >= s
                        ? "bg-emerald-600 text-white"
                        : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    {s}
                  </div>
                ))}
              </div>
            </div>
            <div className="h-2 bg-gray-200 rounded-full">
              <div
                className="h-2 bg-emerald-600 rounded-full transition-all duration-300"
                style={{ width: `${(step / 2) * 100}%` }}
              />
            </div>
          </div>
          <form onSubmit={handleSubmit}>
            {step === 1 && (
              <div className="space-y-6">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4">
                  Your Details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
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

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
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
                        formData.checkIn ||
                        new Date().toISOString().split("T")[0]
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm sm:text-base"
                    placeholder="Any special dietary requirements, accessibility needs, or other requests..."
                  />
                </div>
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    disabled={!isFormValid()}
                    className="bg-emerald-600 text-white px-6 sm:px-8 py-3 rounded-lg font-semibold hover:bg-emerald-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed text-base sm:text-lg"
                  >
                    Continue to Summary
                  </button>
                </div>
              </div>
            )}
            {step === 2 && (
              <div className="space-y-6">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4">
                  Booking Summary
                </h3>
                {/* Booking Details */}
                <div className="bg-gray-50 p-4 sm:p-6 rounded-lg">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">
                        Guest Information
                      </h4>
                      <div className="space-y-2 text-sm">
                        <p>
                          <span className="font-medium">Name:</span>{" "}
                          {formData.firstName} {formData.lastName}
                        </p>
                        <p>
                          <span className="font-medium">Email:</span>{" "}
                          {formData.email}
                        </p>
                        <p>
                          <span className="font-medium">Phone:</span>{" "}
                          {formData.phone}
                        </p>
                        <p>
                          <span className="font-medium">Guests:</span>{" "}
                          {formData.groupSize}
                        </p>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">
                        Stay Details
                      </h4>
                      <div className="space-y-2 text-sm">
                        <p>
                          <span className="font-medium">Check-in:</span>{" "}
                          {new Date(formData.checkIn).toLocaleDateString()}
                        </p>
                        <p>
                          <span className="font-medium">Check-out:</span>{" "}
                          {new Date(formData.checkOut).toLocaleDateString()}
                        </p>
                        <p>
                          <span className="font-medium">Nights:</span>{" "}
                          {calculateNights()}
                        </p>
                        <p>
                          <span className="font-medium">Location:</span>{" "}
                          {selectedLocation.location}
                        </p>
                        <p>
                          <span className="font-medium">Accommodation:</span>{" "}
                          {formData.accommodationType}
                        </p>
                        <p>
                          <span className="font-medium">Meal Plan:</span>{" "}
                          {formData.mealPlan}
                        </p>
                      </div>
                    </div>
                  </div>

                  {formData.specialRequests && (
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <h4 className="font-semibold text-gray-900 mb-2">
                        Special Requests
                      </h4>
                      <p className="text-sm text-gray-700">
                        {formData.specialRequests}
                      </p>
                    </div>
                  )}
                </div>

                {/* Price Breakdown */}
                <div className="bg-emerald-50 p-4 sm:p-6 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-4">
                    Price Breakdown
                  </h4>
                  <div className="space-y-2 text-sm sm:text-base">
                    <div className="flex justify-between">
                      <span>
                        ${selectedLocation.price_per_night} ×{" "}
                        {calculateNights()} nights
                      </span>
                      <span>
                        ${selectedLocation.price_per_night * calculateNights()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Service fee</span>
                      <span>$0</span>
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

                {/* Action Buttons */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={handleWhatsAppBooking}
                    className="bg-green-500 text-white px-4 sm:px-6 py-3 sm:py-4 rounded-lg font-semibold hover:bg-green-600 transition-colors flex items-center justify-center text-base sm:text-lg"
                  >
                    <MessageCircle className="h-5 w-5 mr-2" />
                    Book via WhatsApp
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-emerald-600 text-white px-4 sm:px-6 py-3 sm:py-4 rounded-lg font-semibold hover:bg-emerald-700 transition-colors flex items-center justify-center disabled:bg-gray-400 text-base sm:text-lg"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Processing...
                      </>
                    ) : (
                      <>
                        <CreditCard className="h-5 w-5 mr-2" />
                        Submit Booking
                      </>
                    )}
                  </button>
                </div>
                <div className="flex justify-start">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="text-emerald-600 hover:text-emerald-700 font-medium text-base"
                  >
                    ← Back to Details
                  </button>
                </div>
                {/* WhatsApp Contact Info */}
                <div className="bg-blue-50 p-3 sm:p-4 rounded-lg">
                  <div className="flex items-start">
                    <MessageCircle className="h-5 w-5 text-blue-600 mt-0.5 mr-3" />
                    <div>
                      <h4 className="font-semibold text-blue-900 mb-1 text-base sm:text-lg">
                        Prefer to book via WhatsApp?
                      </h4>
                      <p className="text-xs sm:text-sm text-blue-800 mb-2">
                        Click "Book via WhatsApp" to send your booking details
                        directly to our team. We'll confirm availability and
                        guide you through the payment process.
                      </p>
                      <p className="text-xs sm:text-sm font-medium text-blue-900">
                        📱 WhatsApp: +94 71 399 1051
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </form>
        </div>
        {/* Trust Indicators */}
        <div className="mt-6 md:mt-8 bg-white rounded-2xl shadow-lg p-4 sm:p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 text-center">
            <div className="flex flex-col items-center">
              <CheckCircle className="h-8 w-8 text-green-500 mb-2" />
              <h4 className="font-semibold text-gray-900 text-base sm:text-lg">
                Secure Booking
              </h4>
              <p className="text-xs sm:text-sm text-gray-600">
                Your information is protected
              </p>
            </div>
            <div className="flex flex-col items-center">
              <MessageCircle className="h-8 w-8 text-blue-500 mb-2" />
              <h4 className="font-semibold text-gray-900 text-base sm:text-lg">
                24/7 Support
              </h4>
              <p className="text-xs sm:text-sm text-gray-600">
                WhatsApp support available
              </p>
            </div>
            <div className="flex flex-col items-center">
              <CheckCircle className="h-8 w-8 text-emerald-500 mb-2" />
              <h4 className="font-semibold text-gray-900 text-base sm:text-lg">
                Best Price Guarantee
              </h4>
              <p className="text-xs sm:text-sm text-gray-600">
                Lowest prices guaranteed
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BookingForm;
