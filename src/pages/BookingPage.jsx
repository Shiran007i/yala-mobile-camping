// src/pages/BookingPage.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, useSearchParams } from 'react-router-dom';
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
  CheckCircle,
  Download,
  ArrowLeft,
} from "lucide-react";

import logo from "/logo.png";

// Mock locations data - replace with your actual data source
const mockLocations = [
  {
    id: 1,
    name: "Yala Block 1 Riverside",
    location: "Yala National Park, Block 1",
    description: "Premium camping experience by the Menik River with excellent leopard viewing opportunities.",
    image_url: "/api/placeholder/600/400",
    rating: 4.9,
    max_guests: 8,
    best_season: "Feb - July",
    difficulty: "Easy",
    elevation: "30m",
    included: ["Safari tent accommodation", "All meals", "Game drives", "Professional guide", "Transportation", "Equipment"],
    price_per_night: 700
  },
  {
    id: 2,
    name: "Yala Block 2 Wilderness",
    location: "Yala National Park, Block 2",
    description: "Remote camping in less crowded areas with diverse wildlife and pristine nature.",
    image_url: "/api/placeholder/600/400",
    rating: 4.8,
    max_guests: 6,
    best_season: "Year Round",
    difficulty: "Moderate",
    elevation: "45m",
    included: ["Safari tent accommodation", "All meals", "Game drives", "Professional guide", "Transportation", "Equipment"],
    price_per_night: 700
  }
];

const BookingPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  
  // Get selected location from URL params or state
  const locationId = searchParams.get('location');
  const selectedLocation = location.state?.selectedLocation || 
    mockLocations.find(loc => loc.id === parseInt(locationId)) ||
    mockLocations[0]; // Default to first location

  const [bookingStep, setBookingStep] = useState('form');
  const [bookingDetails, setBookingDetails] = useState(null);
  
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    checkIn: "",
    checkOut: "",
    groupSize: 2,
    accommodationType: "Safari Tent",
    mealPlan: "Full Board",
    specialRequests: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Redirect to locations if no valid location
  useEffect(() => {
    if (!selectedLocation) {
      navigate('/locations', { replace: true });
    }
  }, [selectedLocation, navigate]);

  // Pricing calculations
  const calculatePricing = (persons, nights) => {
    const BASE_PRICE_2_PERSONS = 700;
    const ADDITIONAL_PERSON_PRICE = 325; // $700/2 - $25 discount

    let total = BASE_PRICE_2_PERSONS * nights;

    if (persons > 2) {
      const additionalPersons = persons - 2;
      const additionalCost = additionalPersons * ADDITIONAL_PERSON_PRICE * nights;
      total += additionalCost;
    }

    return {
      basePrice: BASE_PRICE_2_PERSONS,
      additionalPersonPrice: ADDITIONAL_PERSON_PRICE,
      additionalPersons: Math.max(0, persons - 2),
      additionalCost: persons > 2 ? (persons - 2) * ADDITIONAL_PERSON_PRICE * nights : 0,
      total: total,
      perPerson: total / persons,
      perNight: total / nights,
      savings: persons > 2 ? (persons - 2) * 25 * nights : 0,
    };
  };

  const calculateNights = () => {
    if (formData.checkIn && formData.checkOut) {
      const checkIn = new Date(formData.checkIn);
      const checkOut = new Date(formData.checkOut);
      const diffTime = Math.abs(checkOut - checkIn);
      return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const generateBookingId = () => {
    const timestamp = Date.now().toString(36);
    const randomStr = Math.random().toString(36).substring(2, 8);
    return `YMC-${timestamp}-${randomStr}`.toUpperCase();
  };

  const handleBookingComplete = (details) => {
    setBookingDetails(details);
    setBookingStep('confirmation');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToMain = () => {
    navigate('/');
  };

  const handleBackToLocations = () => {
    navigate('/locations');
  };

  const handleBackToBooking = () => {
    setBookingStep('form');
  };

  const handleNewBooking = () => {
    setBookingDetails(null);
    setBookingStep('form');
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      checkIn: "",
      checkOut: "",
      groupSize: 2,
      accommodationType: "Safari Tent",
      mealPlan: "Full Board",
      specialRequests: "",
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmitBooking = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const nights = calculateNights();
      const pricing = calculatePricing(formData.groupSize, nights);
      const bookingId = generateBookingId();

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
          price_per_night: 700,
        },
        pricing: pricing,
        specialRequests: formData.specialRequests,
        submittedAt: new Date().toISOString(),
      };

      // API call simulation
      try {
        const response = await fetch("/api/booking", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(bookingData),
        });

        if (response.ok) {
          const result = await response.json();
          if (result.success) {
            alert(`Success! Your booking has been submitted!\n\nBooking ID: ${result.bookingId}\nWe'll respond within 1-2 hours\n\nCheck your email for confirmation details!`);
            handleBookingComplete(bookingData);
            return;
          }
        }
        throw new Error("API call failed");
      } catch (apiError) {
        const userChoice = window.confirm(
          `Automatic booking submission failed, but don't worry!\n\nWould you like to try the email option?`
        );
        if (userChoice) {
          handleEmailBooking(bookingData);
        } else {
          const whatsappChoice = window.confirm(`Would you like to send your booking via WhatsApp instead?`);
          if (whatsappChoice) {
            handleWhatsAppBooking(bookingData);
          }
        }
      }
    } catch (error) {
      alert(`Unexpected error: ${error.message}\n\nPlease try the email or WhatsApp options.`);
    } finally {
      setIsSubmitting(false);
    }
  };

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

    const subject = `New Booking Request - ${selectedLocation.name} - ID: ${finalBookingData.bookingId}`;
    const emailBody = `
New Booking Request Details:

BOOKING ID: ${finalBookingData.bookingId}
Booking Date: ${new Date().toLocaleString()}

GUEST INFORMATION:
Name: ${finalBookingData.firstName} ${finalBookingData.lastName}
Email: ${finalBookingData.email}
Phone: ${finalBookingData.phone}

ACCOMMODATION DETAILS:
Location: ${selectedLocation.name}
Address: ${selectedLocation.location}
Check-in: ${finalBookingData.checkIn}
Check-out: ${finalBookingData.checkOut}
Duration: ${finalBookingData.nights} nights
Guests: ${finalBookingData.groupSize}
Accommodation: ${finalBookingData.accommodationType}
Meal Plan: ${finalBookingData.mealPlan}

PRICING BREAKDOWN:
Base Package (2 persons): $700 × ${finalBookingData.nights} nights = $${700 * finalBookingData.nights}
${finalBookingData.groupSize > 2 ? `Additional Persons (${finalBookingData.groupSize - 2}): $325 × ${finalBookingData.groupSize - 2} × ${finalBookingData.nights} nights = $${(finalBookingData.groupSize - 2) * 325 * finalBookingData.nights}` : ""}
${finalBookingData.groupSize > 2 ? `Savings: $${(finalBookingData.groupSize - 2) * 25 * finalBookingData.nights} ($25 discount per additional person per night)` : ""}
TOTAL: $${finalBookingData.total}

SPECIAL REQUESTS:
${finalBookingData.specialRequests || "None"}

STATUS: Pending Confirmation

Please confirm availability and send payment details.

Best regards,
${finalBookingData.firstName} ${finalBookingData.lastName}
    `.trim();

    const mailtoLink = `mailto:info@yalamobilecamping.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailBody)}`;
    window.open(mailtoLink, "_blank");

    alert(`Email client opening...\n\nBooking ID: ${finalBookingData.bookingId}\nEmail prepared and ready to send!`);
    handleBookingComplete(finalBookingData);
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

    const message = `*NEW BOOKING REQUEST*\n\n*Booking ID:* ${finalBookingData.bookingId}\n*Date:* ${new Date().toLocaleString()}\n\n*Guest Details:*\n• Name: ${finalBookingData.firstName} ${finalBookingData.lastName}\n• Email: ${finalBookingData.email}\n• Phone: ${finalBookingData.phone}\n\n*Accommodation:*\n• Location: ${finalBookingData.location.name}\n• Address: ${finalBookingData.location.location}\n• Check-in: ${finalBookingData.checkIn}\n• Check-out: ${finalBookingData.checkOut}\n• Duration: ${finalBookingData.nights} nights\n• Guests: ${finalBookingData.groupSize}\n• Accommodation: ${finalBookingData.accommodationType}\n• Meal Plan: ${finalBookingData.mealPlan}\n\n*Pricing:*\n• Base Package (2 persons): $700 × ${finalBookingData.nights} = $${700 * finalBookingData.nights}\n${finalBookingData.groupSize > 2 ? `• Additional Persons (${finalBookingData.groupSize - 2}): $325 × ${finalBookingData.groupSize - 2} × ${finalBookingData.nights} = $${(finalBookingData.groupSize - 2) * 325 * finalBookingData.nights}` : ""}\n${finalBookingData.groupSize > 2 ? `• *Your Savings:* $${(finalBookingData.groupSize - 2) * 25 * finalBookingData.nights} ($25 off per additional person!)` : ""}\n• *TOTAL: $${finalBookingData.total}*\n\n${finalBookingData.specialRequests ? `*Special Requests:*\n${finalBookingData.specialRequests}\n\n` : ""}Please confirm availability and send payment details. Thank you!`;

    const whatsappUrl = `https://wa.me/94713585926?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");

    alert(`WhatsApp opening...\n\nBooking ID: ${finalBookingData.bookingId}\nWhatsApp message prepared and ready to send!`);
    handleBookingComplete(finalBookingData);
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

  // Confirmation page component
  if (bookingStep === 'confirmation' && bookingDetails) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Success Header */}
          <div className="bg-gradient-to-r from-emerald-500 to-green-600 rounded-2xl shadow-lg p-8 text-center mb-8 text-white">
            <CheckCircle className="h-20 w-20 mx-auto mb-4" />
            <h1 className="text-3xl font-bold mb-2">
              Booking Request Sent Successfully!
            </h1>
            <p className="text-lg mb-4 opacity-90">
              Your adventure booking has been submitted
            </p>
            <div className="bg-white/20 backdrop-blur-sm p-4 rounded-lg inline-block">
              <p className="font-mono text-xl font-semibold">
                Booking ID: {bookingDetails.bookingId}
              </p>
              <p className="text-sm opacity-75 mt-1">
                Save this ID for your records
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">
              Next Steps
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <button
                onClick={handleBackToBooking}
                className="bg-emerald-600 text-white px-4 py-3 rounded-lg font-medium hover:bg-emerald-700 transition-colors flex items-center justify-center"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Form
              </button>
              
              <button
                onClick={handleNewBooking}
                className="bg-amber-500 text-white px-4 py-3 rounded-lg font-medium hover:bg-amber-600 transition-colors"
              >
                New Booking
              </button>
              
              <button
                onClick={handleBackToLocations}
                className="bg-blue-600 text-white px-4 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                Browse Locations
              </button>
              
              <button
                onClick={handleBackToMain}
                className="bg-gray-600 text-white px-4 py-3 rounded-lg font-medium hover:bg-gray-700 transition-colors"
              >
                Back to Home
              </button>
            </div>
          </div>

          {/* Contact Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
              <div className="flex items-center mb-4">
                <Mail className="h-8 w-8 text-blue-600 mr-3" />
                <div>
                  <h3 className="font-semibold text-blue-900">Email Confirmation</h3>
                  <p className="text-sm text-blue-700">Detailed booking information</p>
                </div>
              </div>
              <p className="text-sm font-medium text-blue-900">
                info@yalamobilecamping.com
              </p>
            </div>

            <div className="bg-green-50 p-6 rounded-lg border border-green-200">
              <div className="flex items-center mb-4">
                <MessageCircle className="h-8 w-8 text-green-600 mr-3" />
                <div>
                  <h3 className="font-semibold text-green-900">WhatsApp Updates</h3>
                  <p className="text-sm text-green-700">Instant communication</p>
                </div>
              </div>
              <p className="text-sm font-medium text-green-900">
                +94 71 358 5926
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Main booking form
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation */}
        <div className="mb-6">
          <button
            onClick={handleBackToLocations}
            className="flex items-center text-emerald-600 hover:text-emerald-700 font-medium transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Locations
          </button>
        </div>

        {/* Location Summary */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
          <div className="flex flex-col lg:flex-row">
            <div className="lg:w-1/2 relative">
              <img
                src={selectedLocation.image_url}
                alt={selectedLocation.name}
                className="w-full h-64 lg:h-full object-cover"
              />
            </div>
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
              
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 mb-6">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-3xl font-bold text-emerald-600">$700</div>
                    <div className="text-sm text-emerald-700 font-medium">
                      Complete package for 2 persons
                    </div>
                    <div className="text-xs text-gray-600 mt-1">
                      Additional person: $325/night (save $25!)
                    </div>
                    <div className="flex items-center text-sm mt-3">
                      <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                      <span className="font-semibold">{selectedLocation.rating || "4.9"}</span>
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
                    min={formData.checkIn || new Date().toISOString().split("T")[0]}
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

              {/* Price Summary */}
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
                      <span>${700 * calculateNights()}</span>
                    </div>
                    {formData.groupSize > 2 && (
                      <>
                        <div className="flex justify-between">
                          <span>
                            Additional Persons ({formData.groupSize - 2}) × $325 × {calculateNights()}
                          </span>
                          <span>
                            ${(formData.groupSize - 2) * 325 * calculateNights()}
                          </span>
                        </div>
                        <div className="flex justify-between text-green-600">
                          <span>
                            Your Savings ($25 off per additional person)
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
                          ${Math.round(getCurrentPricing().total / formData.groupSize)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Booking Options */}
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
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="h-5 w-5 mr-2" />
                        Auto Submit (Recommended)
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
                    Email Backup
                  </button>

                  <button
                    type="button"
                    onClick={() => handleWhatsAppBooking()}
                    disabled={!isFormValid()}
                    className="bg-green-500 text-white px-6 py-4 rounded-lg font-semibold hover:bg-green-600 transition-colors flex items-center justify-center disabled:bg-gray-300"
                  >
                    <MessageCircle className="h-5 w-5 mr-2" />
                    WhatsApp Backup
                  </button>
                </div>

                <div className="mt-4 text-sm text-gray-600">
                  <p>
                    <strong>Auto Submit:</strong> Sends emails automatically to both you and our team
                  </p>
                  <p>
                    <strong>Email/WhatsApp Backup:</strong> Use if auto-submit doesn't work
                  </p>
                </div>
              </div>
            </div>
          </form>
        </div>

        {/* Trust & Contact Information */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-blue-50 p-6 rounded-lg">
            <Mail className="h-8 w-8 text-blue-600 mb-4" />
            <h4 className="font-semibold text-blue-900 mb-2">Email Booking</h4>
            <p className="text-sm text-blue-800 mb-2">
              Get detailed confirmation and documentation via email
            </p>
            <p className="text-sm font-medium text-blue-900">
              info@yalamobilecamping.com
            </p>
          </div>

          <div className="bg-green-50 p-6 rounded-lg">
            <MessageCircle className="h-8 w-8 text-green-600 mb-4" />
            <h4 className="font-semibold text-green-900 mb-2">WhatsApp Booking</h4>
            <p className="text-sm text-green-800 mb-2">
              Instant communication and quick responses
            </p>
            <p className="text-sm font-medium text-green-900">
              +94 71 358 5926
            </p>
          </div>
        </div>

        {/* Trust badges */}
        <div className="mt-8 flex flex-col md:flex-row gap-6 justify-center items-center">
          <div className="bg-white border border-green-200 rounded-xl p-6 flex items-center shadow-md w-full md:w-1/2">
            <a
              href="https://www.tripadvisor.com/Attraction_Review-g19899440-d33411134-Reviews-Yala_Mobile_Camping-Yala_Southern_Province.html"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center group mr-4"
              aria-label="TripAdvisor"
            >
              <img
                src="https://static.tacdn.com/img2/brand_refresh/Tripadvisor_logomark.svg"
                alt="TripAdvisor"
                className="h-10 w-10 group-hover:scale-110 transition-transform duration-200"
              />
              <span className="ml-2 text-green-700 font-semibold text-base group-hover:underline">
                TripAdvisor
              </span>
            </a>
            <div>
              <p className="font-semibold text-green-700">Listed on TripAdvisor</p>
              <p className="text-xs text-gray-600">Please Add Reviews...</p>
            </div>
          </div>
          
          <div className="bg-white border border-blue-200 rounded-xl p-6 flex items-center shadow-md w-full md:w-1/2">
            <img src={logo} alt="Yala Mobile Camping" className="h-12 w-12 mr-3" />
            <div>
              <p className="font-semibold text-blue-700">100% Satisfaction Guarantee</p>
              <span className="text-xs text-gray-600">Book with confidence</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;