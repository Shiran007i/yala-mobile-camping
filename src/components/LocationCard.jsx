import React from "react";
import {
  MapPin,
  Star,
  Users,
  Mountain,
  Wifi,
  Car,
  Coffee,
  Camera,
} from "lucide-react";
import { Helmet } from "react-helmet";

const LocationCard = ({ location, onSelect }) => {
  const getAmenityIcon = (amenity) => {
    const icons = {
      "Mountain Views": <Mountain className="h-4 w-4" />,
      "Tea Plantation Tours": <Coffee className="h-4 w-4" />,
      "Safari Tours": <Camera className="h-4 w-4" />,
      "Wildlife Viewing": <Camera className="h-4 w-4" />,
      "Cultural Tours": <Mountain className="h-4 w-4" />,
      "Beach Access": <Mountain className="h-4 w-4" />,
      "Whale Watching": <Camera className="h-4 w-4" />,
      "Mountain Trekking": <Mountain className="h-4 w-4" />,
      Photography: <Camera className="h-4 w-4" />,
      "Cool Climate": <Mountain className="h-4 w-4" />,
      Wifi: <Wifi className="h-4 w-4" />,
      Transportation: <Car className="h-4 w-4" />,
    };
    return icons[amenity] || <Mountain className="h-4 w-4" />;
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty.toLowerCase()) {
      case "easy":
        return "bg-green-100 text-green-800";
      case "moderate":
        return "bg-yellow-100 text-yellow-800";
      case "challenging":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group w-full max-w-md mx-auto sm:max-w-none">
      <Helmet>
        <title>
          Yala Safari Location Card | Yala Mobile Camping and Safari
        </title>
        <meta
          name="description"
          content="Learn more about each safari location in Yala National Park with our detailed location cards. Find your perfect wildlife adventure with Yala Mobile Camping and Safari."
        />
        <meta
          name="keywords"
          content="yala safari location card, yala mobile camping, sri lanka safari, yala national park, wildlife locations, camping spots"
        />
        <meta
          property="og:title"
          content="Yala Safari Location Card | Yala Mobile Camping and Safari"
        />
        <meta
          property="og:description"
          content="Explore detailed location cards for Yala National Park with Yala Mobile Camping and Safari."
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:image"
          content="https://yalamobilecamping.com/og-locationcard.webp"
        />
        <link
          rel="canonical"
          href="https://yalamobilecamping.com/location-card"
        />
      </Helmet>
      <div className="relative overflow-hidden">
        <img
          src={location.image_url}
          alt={location.name}
          className="w-full h-40 sm:h-48 md:h-56 object-cover transition-transform duration-300 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Rating Badge */}
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full px-2.5 py-1 flex items-center space-x-1">
          <Star className="h-4 w-4 text-yellow-400 fill-current" />
          <span className="text-xs sm:text-sm font-semibold">
            {location.rating}
          </span>
        </div>

        {/* Price Badge */}
        <div className="absolute bottom-3 left-3 bg-emerald-600 text-white px-2.5 py-1 rounded-full text-xs sm:text-sm font-semibold">
          ${location.price_per_night}/night
        </div>

        {/* Difficulty Badge */}
        <div
          className={`absolute top-3 left-3 px-2 py-1 rounded-full text-xs font-semibold ${getDifficultyColor(
            location.difficulty
          )}`}
        >
          {location.difficulty}
        </div>
      </div>

      <div className="p-4 sm:p-6">
        <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-1 sm:mb-2 group-hover:text-emerald-600 transition-colors">
          {location.name}
        </h3>

        <div className="flex items-center text-gray-600 mb-2 sm:mb-3">
          <MapPin className="h-4 w-4 mr-1 text-emerald-600" />
          <span className="text-xs sm:text-sm">{location.location}</span>
        </div>

        <p className="text-gray-600 text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-2 leading-relaxed">
          {location.description}
        </p>

        {/* Amenities */}
        <div className="mb-3 sm:mb-4">
          <div className="flex flex-wrap gap-2">
            {location.amenities.slice(0, 3).map((amenity, index) => (
              <div
                key={index}
                className="flex items-center space-x-1 bg-gray-100 px-2 py-1 rounded-full text-xs text-gray-600"
              >
                {getAmenityIcon(amenity)}
                <span>{amenity}</span>
              </div>
            ))}
            {location.amenities.length > 3 && (
              <div className="bg-emerald-100 text-emerald-600 px-2 py-1 rounded-full text-xs font-medium">
                +{location.amenities.length - 3} more
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center space-x-3 text-xs sm:text-sm text-gray-500">
            <div className="flex items-center">
              <Users className="h-4 w-4 mr-1" />
              <span>Max {location.max_guests}</span>
            </div>
          </div>

          <button
            onClick={() => onSelect(location)}
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 sm:px-6 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-200 transform hover:scale-105 active:scale-95 w-full sm:w-auto"
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default LocationCard;
