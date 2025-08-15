import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Calendar,
  Users,
  Mail,
  Phone,
  MessageCircle,
  MapPin,
  Star,
  Download,
  Print,
} from "lucide-react";
import { Helmet } from "react-helmet";
import Header from "./Header";
import Footer from "./Footer";

const BookingDetailsPage = () => {
  const { bookingId } = useParams();
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (bookingId) {
      // Placeholder for fetching booking details
      // Replace with local logic or API call as needed
      const fetchedBooking = {
        id: bookingId,
        status: "confirmed",
        check_in: "2023-10-01",
        check_out: "2023-10-05",
        first_name: "John",
        last_name: "Doe",
        email: "john.doe@example.com",
        phone: "+1234567890",
        created_at: "2023-09-20",
        group_size: 2,
        special_requests: "Vegetarian meal",
        total_cost: 500,
        locations: {
          name: "Safari Park",
          location: "123 Wildlife St, Nature City",
          image_url: "https://example.com/image.webp",
          rating: 4.5,
          price_per_night: 100,
        },
      };

      setBooking(fetchedBooking);
      setLoading(false);
    }
  }, [bookingId]);

  const getStatusColor = (status) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleWhatsAppContact = () => {
    const message = `Hi! I have a question about my booking.

🔖 Booking ID: ${booking.id}
📍 Location: ${booking.locations.name}
📅 Check-in: ${new Date(booking.check_in).toLocaleDateString()}
👤 Name: ${booking.first_name} ${booking.last_name}

Please assist me. Thank you!`;

    const whatsappUrl = `https://wa.me/940713585926?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappUrl, "_blank");
  };

  const calculateNights = () => {
    if (booking?.check_in && booking?.check_out) {
      const checkIn = new Date(booking.check_in);
      const checkOut = new Date(booking.check_out);
      const diffTime = Math.abs(checkOut - checkIn);
      return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    }
    return 0;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="pt-20 pb-8">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading booking details...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !booking) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="pt-20 pb-8">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Booking Not Found
              </h2>
              <p className="text-gray-600 mb-6">{error}</p>
              <a
                href="/"
                className="bg-emerald-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-emerald-700 transition-colors"
              >
                Return to Home
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Helmet>
        <title>Booking Details | Yala Mobile Camping and Safari</title>
        <meta
          name="description"
          content="View your Yala Mobile Camping and Safari booking details, including dates, guests, and special requests for your Yala National Park adventure."
        />
        <meta
          name="keywords"
          content="yala mobile camping booking, yala safari booking, sri lanka camping reservation, yala national park booking details"
        />
        <meta
          property="og:title"
          content="Booking Details | Yala Mobile Camping and Safari"
        />
        <meta
          property="og:description"
          content="Check your booking details for Yala Mobile Camping and Safari in Yala National Park, Sri Lanka."
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:image"
          content="https://yalamobilecamping.com/og-booking.webp"
        />
        <link
          rel="canonical"
          href="https://yalamobilecamping.com/booking-details"
        />
      </Helmet>
      <Header />
      <div className="pt-20 pb-8">
        <div className="max-w-4xl mx-auto px-4">
          {/* Header Section */}
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  Booking Details
                </h1>
                <p className="text-gray-600">
                  Reference ID:{" "}
                  <span className="font-mono font-medium">{booking.id}</span>
                </p>
              </div>
              <div className="flex items-center space-x-3 mt-4 md:mt-0">
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                    booking.status
                  )}`}
                >
                  {booking.status.charAt(0).toUpperCase() +
                    booking.status.slice(1)}
                </span>
                <button
                  onClick={() => window.print()}
                  className="p-2 text-gray-600 hover:text-gray-800 transition-colors"
                  title="Print Booking"
                >
                  <Print className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Location Info */}
            <div className="flex flex-col md:flex-row gap-6">
              <div className="md:w-1/3">
                <img
                  src={booking.locations.image_url}
                  alt={booking.locations.name}
                  className="w-full h-48 object-cover rounded-lg"
                />
              </div>
              <div className="md:w-2/3">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  {booking.locations.name}
                </h2>
                <div className="flex items-center mb-3">
                  <MapPin className="h-4 w-4 text-gray-500 mr-1" />
                  <span className="text-gray-600">
                    {booking.locations.location}
                  </span>
                  <div className="flex items-center ml-4">
                    <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                    <span className="font-medium">
                      {booking.locations.rating}
                    </span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium text-gray-700">Check-in:</span>
                    <p className="text-gray-900">
                      {new Date(booking.check_in).toLocaleDateString("en-GB")}
                    </p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">
                      Check-out:
                    </span>
                    <p className="text-gray-900">
                      {new Date(booking.check_out).toLocaleDateString("en-GB")}
                    </p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Nights:</span>
                    <p className="text-gray-900">{calculateNights()}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Guests:</span>
                    <p className="text-gray-900">{booking.group_size}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Guest Information */}
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Guest Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="flex items-center">
                  <Users className="h-5 w-5 text-gray-500 mr-3" />
                  <div>
                    <p className="font-medium text-gray-700">Guest Name</p>
                    <p className="text-gray-900">
                      {booking.first_name} {booking.last_name}
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Mail className="h-5 w-5 text-gray-500 mr-3" />
                  <div>
                    <p className="font-medium text-gray-700">Email Address</p>
                    <p className="text-gray-900">{booking.email}</p>
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center">
                  <Phone className="h-5 w-5 text-gray-500 mr-3" />
                  <div>
                    <p className="font-medium text-gray-700">Phone Number</p>
                    <p className="text-gray-900">{booking.phone}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 text-gray-500 mr-3" />
                  <div>
                    <p className="font-medium text-gray-700">Booking Date</p>
                    <p className="text-gray-900">
                      {new Date(booking.created_at).toLocaleDateString("en-GB")}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {booking.special_requests && (
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h4 className="font-medium text-gray-700 mb-2">
                  Special Requests
                </h4>
                <p className="text-gray-900 bg-gray-50 p-3 rounded-lg">
                  {booking.special_requests}
                </p>
              </div>
            )}
          </div>

          {/* Pricing Breakdown */}
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Pricing Details
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-700">
                  ${booking.locations.price_per_night} × {calculateNights()}{" "}
                  nights
                </span>
                <span className="font-medium">
                  ${booking.locations.price_per_night * calculateNights()}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Service fee</span>
                <span className="font-medium">$0</span>
              </div>
              <div className="border-t border-gray-200 pt-3 mt-3">
                <div className="flex justify-between items-center text-lg font-bold">
                  <span>Total Amount</span>
                  <span className="text-emerald-600">
                    ${booking.total_cost}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* What's Included */}
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              What's Included
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex items-center text-green-600">
                  <svg
                    className="h-4 w-4 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>Luxury safari tent accommodation</span>
                </div>
                <div className="flex items-center text-green-600">
                  <svg
                    className="h-4 w-4 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>All meals (breakfast, lunch, dinner)</span>
                </div>
                <div className="flex items-center text-green-600">
                  <svg
                    className="h-4 w-4 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>Morning and evening safari drives</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center text-green-600">
                  <svg
                    className="h-4 w-4 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>Professional wildlife guide</span>
                </div>
                <div className="flex items-center text-green-600">
                  <svg
                    className="h-4 w-4 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>Park entrance fees</span>
                </div>
                <div className="flex items-center text-green-600">
                  <svg
                    className="h-4 w-4 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>24/7 security and support</span>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Section */}
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Need Help?</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button
                onClick={handleWhatsAppContact}
                className="bg-green-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-600 transition-colors flex items-center justify-center"
              >
                <MessageCircle className="h-5 w-5 mr-2" />
                Contact via WhatsApp
              </button>
              <a
                href="mailto:info@yalamobilecamping.com"
                className="bg-gray-100 text-gray-800 px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors flex items-center justify-center"
              >
                <Mail className="h-5 w-5 mr-2" />
                Email Support
              </a>
            </div>
            <div className="mt-4 text-center text-sm text-gray-600">
              <p>📱 WhatsApp: +94 071 399 1051</p>
              <p>📧 Email: info@yalamobilecamping.com</p>
              <p>🕒 Available 24/7 for assistance</p>
            </div>
          </div>

          {/* Important Information */}
          <div className="bg-blue-50 rounded-2xl p-6">
            <h3 className="text-lg font-bold text-blue-900 mb-3">
              Important Information
            </h3>
            <div className="space-y-2 text-sm text-blue-800">
              <p>
                • Please arrive at the meeting point 30 minutes before your
                scheduled departure
              </p>
              <p>
                • Bring comfortable walking shoes, hat, sunscreen, and insect
                repellent
              </p>
              <p>
                • Camera equipment and binoculars are recommended for wildlife
                viewing
              </p>
              <p>
                • Cancellations must be made at least 48 hours in advance for
                full refund
              </p>
              <p>
                • Weather conditions may affect safari schedules - alternative
                activities will be provided
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BookingDetailsPage;
