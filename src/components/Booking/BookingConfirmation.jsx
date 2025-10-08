import React from "react";
import {
  CheckCircle,
  Mail,
  MessageCircle,
  Calendar,
  Users,
  MapPin,
  ArrowLeft,
  Download,
  Phone,
} from "lucide-react";

const BookingConfirmation = ({
  bookingDetails,
  onBackToBooking,
  onNewBooking,
}) => {
  if (!bookingDetails) {
    return null;
  }

  const {
    bookingId,
    firstName,
    lastName,
    email,
    phone,
    checkIn,
    checkOut,
    nights,
    groupSize,
    accommodationType,
    mealPlan,
    total,
    location,
    specialRequests,
  } = bookingDetails;

  const generateReceiptText = () => {
    return `
YALA MOBILE CAMPING - BOOKING CONFIRMATION

Booking ID: ${bookingId}
Date: ${new Date().toLocaleString()}

GUEST INFORMATION:
Name: ${firstName} ${lastName}
Email: ${email}
Phone: ${phone}

ACCOMMODATION DETAILS:
Location: ${location.name}
Address: ${location.location}
Check-in: ${checkIn}
Check-out: ${checkOut}
Nights: ${nights}
Guests: ${groupSize}
Accommodation: ${accommodationType}
Meal Plan: ${mealPlan}

PRICING:
Base Package (2 persons): $700 × ${nights} nights = $${700 * nights}
${
  groupSize > 2
    ? `Additional Persons (${groupSize - 2}): $325 × ${
        groupSize - 2
      } × ${nights} nights = $${(groupSize - 2) * 325 * nights}`
    : ""
}
${
  groupSize > 2
    ? `Savings: $${
        (groupSize - 2) * 25 * nights
      } ($25 discount per additional person per night)`
    : ""
}
Total: $${total}

SPECIAL REQUESTS:
${specialRequests || "None"}

STATUS: Pending Confirmation

Contact Information:
Email: bookings@yalamobilecamping.com
WhatsApp: +94 71 399 1051

Thank you for choosing Yala Mobile Camping!
    `.trim();
  };

  const downloadReceipt = () => {
    const receiptContent = generateReceiptText();
    const blob = new Blob([receiptContent], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `YMC-Booking-${bookingId}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const shareViaEmail = () => {
    const subject = `My Yala Mobile Camping Booking - ${bookingId}`;
    const body = generateReceiptText();
    const mailtoLink = `mailto:?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
    window.open(mailtoLink, "_blank");
  };

  const shareViaWhatsApp = () => {
    const message = `🏕️ My Yala Mobile Camping Booking\n\n${generateReceiptText()}`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <div className="max-w-4xl mx-auto">
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
            Booking ID: {bookingId}
          </p>
          <p className="text-sm opacity-75 mt-1">
            Save this ID for your records
          </p>
        </div>
      </div>

      {/* Booking Summary */}
      <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Booking Summary
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Guest Information */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Users className="h-5 w-5 mr-2 text-emerald-600" />
              Guest Information
            </h3>
            <div className="space-y-3 bg-gray-50 p-4 rounded-lg">
              <div className="flex justify-between">
                <span className="text-gray-600">Name:</span>
                <span className="font-medium">
                  {firstName} {lastName}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Email:</span>
                <span className="font-medium">{email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Phone:</span>
                <span className="font-medium">{phone}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Group Size:</span>
                <span className="font-medium">
                  {groupSize} {groupSize === 1 ? "Guest" : "Guests"}
                </span>
              </div>
            </div>
          </div>

          {/* Stay Details */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Calendar className="h-5 w-5 mr-2 text-emerald-600" />
              Stay Details
            </h3>
            <div className="space-y-3 bg-gray-50 p-4 rounded-lg">
              <div className="flex justify-between">
                <span className="text-gray-600">Location:</span>
                <span className="font-medium">{location.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Check-in:</span>
                <span className="font-medium">
                  {new Date(checkIn).toLocaleDateString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Check-out:</span>
                <span className="font-medium">
                  {new Date(checkOut).toLocaleDateString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Nights:</span>
                <span className="font-medium">{nights}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Accommodation:</span>
                <span className="font-medium">{accommodationType}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Meal Plan:</span>
                <span className="font-medium">{mealPlan}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Special Requests */}
        {specialRequests && (
          <div className="mt-8 pt-6 border-t border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              Special Requests
            </h3>
            <div className="bg-amber-50 p-4 rounded-lg border-l-4 border-amber-400">
              <p className="text-gray-700">{specialRequests}</p>
            </div>
          </div>
        )}

        {/* Pricing */}
        {/* Pricing - CORRECTED VERSION */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <div className="bg-emerald-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Pricing Details
            </h3>
            <div className="space-y-3">
              {/* Base Package */}
              <div className="flex justify-between">
                <span className="text-gray-700">
                  Base Package (2 persons) × {nights} nights
                </span>
                <span className="font-medium">${700 * nights}</span>
              </div>

              {/* Additional Persons (only show if group > 2) */}
              {groupSize > 2 && (
                <>
                  <div className="flex justify-between">
                    <span className="text-gray-700">
                      Additional Persons ({groupSize - 2}) × $325 × {nights}{" "}
                      nights
                    </span>
                    <span className="font-medium">
                      ${(groupSize - 2) * 325 * nights}
                    </span>
                  </div>
                  <div className="flex justify-between text-green-600">
                    <span className="text-gray-700">
                      💰 Your Savings ($25 off per additional person per night)
                    </span>
                    <span className="font-medium">
                      -${(groupSize - 2) * 25 * nights}
                    </span>
                  </div>
                </>
              )}

              {/* Service Fee */}
              <div className="flex justify-between">
                <span className="text-gray-700">Service fee</span>
                <span className="font-medium">$0</span>
              </div>

              {/* Total */}
              <div className="border-t border-emerald-200 pt-3 mt-3">
                <div className="flex justify-between text-xl font-bold">
                  <span>Total Amount</span>
                  <span className="text-emerald-600">${total}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600 mt-1">
                  <span>Per Person</span>
                  <span>${Math.round(total / groupSize)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* What Happens Next */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            What Happens Next?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-blue-50 rounded-lg">
              <div className="bg-blue-500 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-lg">1</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Review & Confirmation
              </h3>
              <p className="text-sm text-gray-600">
                We'll review your request and confirm availability within 1-2
                hours during business hours
              </p>
            </div>

            <div className="text-center p-6 bg-green-50 rounded-lg">
              <div className="bg-green-500 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-lg">2</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Payment Instructions
              </h3>
              <p className="text-sm text-gray-600">
                Once confirmed, we'll send secure payment instructions via
                WhatsApp or email
              </p>
            </div>

            <div className="text-center p-6 bg-emerald-50 rounded-lg">
              <div className="bg-emerald-500 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-lg">3</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Adventure Awaits!
              </h3>
              <p className="text-sm text-gray-600">
                Get ready for your amazing camping experience at Yala National
                Park!
              </p>
            </div>
          </div>

          {/* Timeline */}
          <div className="mt-8 bg-gray-50 p-6 rounded-lg">
            <h4 className="font-semibold text-gray-900 mb-4">
              Expected Timeline:
            </h4>
            <div className="space-y-2 text-sm">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                <span>
                  <strong>Within 1-2 hours:</strong> Booking confirmation &
                  availability check
                </span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                <span>
                  <strong>Within 24 hours:</strong> Payment instructions sent
                </span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-emerald-500 rounded-full mr-3"></div>
                <span>
                  <strong>24-48 hours before arrival:</strong> Final details &
                  directions
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Contact & Support */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
            <div className="flex items-center mb-4">
              <Mail className="h-8 w-8 text-blue-600 mr-3" />
              <div>
                <h3 className="font-semibold text-blue-900">
                  Email Confirmation
                </h3>
                <p className="text-sm text-blue-700">
                  Detailed booking information
                </p>
              </div>
            </div>
            <p className="text-sm text-blue-800 mb-3">
              Your booking request and confirmation details have been sent to
              your email address.
            </p>
            <div className="flex items-center text-sm font-medium text-blue-900">
              <Mail className="h-4 w-4 mr-2" />
              bookings@yalamobilecamping.com
            </div>
          </div>

          <div className="bg-green-50 p-6 rounded-lg border border-green-200">
            <div className="flex items-center mb-4">
              <MessageCircle className="h-8 w-8 text-green-600 mr-3" />
              <div>
                <h3 className="font-semibold text-green-900">
                  WhatsApp Updates
                </h3>
                <p className="text-sm text-green-700">Instant communication</p>
              </div>
            </div>
            <p className="text-sm text-green-800 mb-3">
              We'll contact you via WhatsApp for quick updates and to answer any
              questions.
            </p>
            <div className="flex items-center text-sm font-medium text-green-900">
              <Phone className="h-4 w-4 mr-2" />
              +94 71 399 1051
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">
            Manage Your Booking
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <button
              onClick={downloadReceipt}
              className="bg-gray-600 text-white px-4 py-3 rounded-lg font-medium hover:bg-gray-700 transition-colors flex items-center justify-center"
            >
              <Download className="h-4 w-4 mr-2" />
              Download Receipt
            </button>

            <button
              onClick={shareViaEmail}
              className="bg-blue-600 text-white px-4 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center"
            >
              <Mail className="h-4 w-4 mr-2" />
              Share via Email
            </button>

            <button
              onClick={shareViaWhatsApp}
              className="bg-green-500 text-white px-4 py-3 rounded-lg font-medium hover:bg-green-600 transition-colors flex items-center justify-center"
            >
              <MessageCircle className="h-4 w-4 mr-2" />
              Share via WhatsApp
            </button>

            <button
              onClick={onBackToBooking}
              className="bg-emerald-600 text-white px-4 py-3 rounded-lg font-medium hover:bg-emerald-700 transition-colors flex items-center justify-center"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Form
            </button>
          </div>

          <div className="pt-4 border-t border-gray-200">
            <button
              onClick={onNewBooking}
              className="w-full md:w-auto bg-amber-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-amber-600 transition-colors"
            >
              Make Another Booking
            </button>
          </div>
        </div>

        {/* Emergency Contact */}
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <h3 className="font-semibold text-red-900 mb-2">
            Need Immediate Assistance?
          </h3>
          <p className="text-sm text-red-800 mb-4">
            For urgent matters or last-minute changes, contact us directly:
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="tel:+94716335000"
              className="bg-red-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-red-700 transition-colors flex items-center justify-center"
            >
              <Phone className="h-4 w-4 mr-2" />
              Call Now: +94 71 399 1051
            </a>
            <a
              href="https://wa.me/94716335000"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-700 transition-colors flex items-center justify-center"
            >
              <MessageCircle className="h-4 w-4 mr-2" />
              WhatsApp Support
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingConfirmation;
