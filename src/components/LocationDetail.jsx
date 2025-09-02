import React, { useState } from "react";
import {
  MapPin,
  Star,
  Users,
  Calendar,
  Mountain,
  Thermometer,
  Wind,
  Sun,
  Moon,
  Clock,
  ChevronRight,
  ChevronLeft,
  MessageCircle,
  Phone,
  CheckCircle,
} from "lucide-react";

const LocationDetail = ({ location, onBackToLocations, onBookNow }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % location.gallery.length);
  };

  const prevImage = () => {
    setCurrentImageIndex(
      (prev) => (prev - 1 + location.gallery.length) % location.gallery.length
    );
  };

  const handleWhatsAppContact = () => {
    const message = `Hi! I'm interested in booking ${location.name} camping experience. Can you provide more details?`;
    const whatsappUrl = `https://wa.me/94713585926?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappUrl, "_blank");
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty.toLowerCase()) {
      case "easy":
        return "text-green-600 bg-green-100";
      case "moderate":
        return "text-yellow-600 bg-yellow-100";
      case "challenging":
        return "text-red-600 bg-red-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  return (
    <div className="pt-20">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center space-x-2 text-sm">
            <button
              onClick={onBackToLocations}
              className="text-emerald-600 hover:text-emerald-700"
            >
              Locations
            </button>
            <ChevronRight className="h-4 w-4 text-gray-400" />
            <span className="text-gray-600">{location.name}</span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative">
        <div className="h-96 md:h-[500px] relative overflow-hidden">
          <img
            src={location.gallery[currentImageIndex]}
            alt={`${location.name} - Image ${currentImageIndex + 1}`}
            className="w-full h-full object-cover"
          />

          {/* Image Navigation */}
          {location.gallery.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-all"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-all"
              >
                <ChevronRight className="h-6 w-6" />
              </button>

              {/* Image Indicators */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {location.gallery.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-3 h-3 rounded-full transition-all ${
                      index === currentImageIndex
                        ? "bg-white"
                        : "bg-white bg-opacity-50"
                    }`}
                  />
                ))}
              </div>
            </>
          )}

          {/* Overlay Content */}
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 w-full">
              <div className="text-white">
                <h1 className="text-4xl md:text-6xl font-bold mb-4">
                  {location.name}
                </h1>
                <div className="flex items-center space-x-4 mb-4">
                  <div className="flex items-center">
                    <MapPin className="h-5 w-5 mr-2" />
                    <span className="text-lg">{location.location}</span>
                  </div>
                  <div className="flex items-center">
                    <Star className="h-5 w-5 mr-1 text-yellow-400 fill-current" />
                    <span className="text-lg">{location.rating}</span>
                  </div>
                  <div
                    className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(
                      location.difficulty
                    )}`}
                  >
                    {location.difficulty}
                  </div>
                </div>
                <p className="text-xl max-w-3xl">{location.description}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left Column - Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* About Section */}
            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                About This Experience
              </h2>
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-700 leading-relaxed">
                  {location.detailed_description}
                </p>
              </div>
            </section>

            {/* Quick Facts */}
            <section>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Quick Facts
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  <Mountain className="h-6 w-6 text-emerald-600 mb-2" />
                  <div className="text-sm text-gray-600">Elevation</div>
                  <div className="font-semibold">{location.elevation}</div>
                </div>
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  <Users className="h-6 w-6 text-emerald-600 mb-2" />
                  <div className="text-sm text-gray-600">Max Guests</div>
                  <div className="font-semibold">
                    {location.max_guests} people
                  </div>
                </div>
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  <Calendar className="h-6 w-6 text-emerald-600 mb-2" />
                  <div className="text-sm text-gray-600">Best Season</div>
                  <div className="font-semibold text-xs">
                    {location.best_season}
                  </div>
                </div>
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  <Thermometer className="h-6 w-6 text-emerald-600 mb-2" />
                  <div className="text-sm text-gray-600">Temperature</div>
                  <div className="font-semibold text-xs">
                    {location.weather.temp}
                  </div>
                </div>
              </div>
            </section>

            {/* Activities */}
            <section>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Activities & Experiences
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {location.activities.map((activity, index) => (
                  <div
                    key={index}
                    className="bg-white p-6 rounded-lg border border-gray-200 hover:shadow-md transition-shadow"
                  >
                    <h4 className="font-semibold text-gray-900 mb-2">
                      {activity.name}
                    </h4>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {activity.duration}
                      </div>
                      <div
                        className={`px-2 py-1 rounded text-xs ${getDifficultyColor(
                          activity.difficulty
                        )}`}
                      >
                        {activity.difficulty}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* What's Included */}
            <section>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                What's Included
              </h3>
              <div className="bg-emerald-50 p-6 rounded-lg">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {location.included.map((item, index) => (
                    <div key={index} className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-emerald-600 mr-3" />
                      <span className="text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Weather Information */}
            <section>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Weather & Climate
              </h3>
              <div className="bg-blue-50 p-6 rounded-lg">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="flex items-center">
                    <Thermometer className="h-6 w-6 text-blue-600 mr-3" />
                    <div>
                      <div className="font-semibold text-gray-900">
                        Temperature
                      </div>
                      <div className="text-gray-600">
                        {location.weather.temp}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Wind className="h-6 w-6 text-blue-600 mr-3" />
                    <div>
                      <div className="font-semibold text-gray-900">
                        Humidity
                      </div>
                      <div className="text-gray-600">
                        {location.weather.humidity}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Sun className="h-6 w-6 text-blue-600 mr-3" />
                    <div>
                      <div className="font-semibold text-gray-900">
                        Rainfall
                      </div>
                      <div className="text-gray-600">
                        {location.weather.rainfall}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Right Column - Booking Card */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-200">
                <div className="text-center mb-6">
                  <div className="text-3xl font-bold text-gray-900">
                    ${location.price_per_night}
                    <span className="text-lg font-normal text-gray-600">
                      /night
                    </span>
                  </div>
                  <div className="flex items-center justify-center mt-2">
                    <Star className="h-5 w-5 text-yellow-400 fill-current mr-1" />
                    <span className="font-medium">{location.rating}</span>
                    <span className="text-gray-600 ml-1">(127 reviews)</span>
                  </div>
                </div>

                <div className="space-y-4 mb-6">
                  <button
                    onClick={() => onBookNow(location)}
                    className="w-full bg-emerald-600 text-white py-4 rounded-xl font-semibold hover:bg-emerald-700 transition-colors"
                  >
                    Book Now
                  </button>

                  <button
                    onClick={handleWhatsAppContact}
                    className="w-full bg-green-500 text-white py-4 rounded-xl font-semibold hover:bg-green-600 transition-colors flex items-center justify-center"
                  >
                    <MessageCircle className="h-5 w-5 mr-2" />
                    WhatsApp Us
                  </button>
                </div>

                <div className="border-t pt-4">
                  <div className="flex items-center justify-center text-gray-600">
                    <Phone className="h-4 w-4 mr-2" />
                    <span className="text-sm">+94 71 399 1051</span>
                  </div>
                </div>

                {/* Amenities */}
                <div className="mt-6 pt-6 border-t">
                  <h4 className="font-semibold text-gray-900 mb-3">
                    Amenities
                  </h4>
                  <div className="space-y-2">
                    {location.amenities.map((amenity, index) => (
                      <div
                        key={index}
                        className="flex items-center text-sm text-gray-600"
                      >
                        <CheckCircle className="h-4 w-4 text-emerald-600 mr-2" />
                        {amenity}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationDetail;