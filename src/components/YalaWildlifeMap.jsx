import React, { useState, useCallback, useMemo } from "react";
import { Helmet } from "react-helmet";
import {
  MapPin,
  Star,
  Eye,
  Clock,
  Calendar,
  Camera,
  TreePine,
  Sunrise,
  Navigation,
  Award,
  Users,
  Shield,
  Info,
  Target,
  ChevronRight,
  Tent,
  Coffee,
  Moon,
} from "lucide-react";

// Note: In the data file (Yaladata.jsx), change the peacock entry:
// {
//   id: 'peacock',
//   name: 'Peafowl',  // Changed from 'Indian Peafowl'
//   scientificName: 'Pavo cristatus',
//   type: 'Bird',
//   ...
import {
  safariCampingContent,
  wildlifeData,
  mapConfig,
  parkStatistics,
  rarityColors,
  legendData,
  safariInfo,
} from "/src/assets/data/Yaladata";

/**
 * Yala National Park Interactive Wildlife Map Component
 *
 * An interactive map showcasing wildlife hotspots in Yala National Park
 * with mobile safari camping content and detailed animal information.
 */
const YalaWildlifeMap = () => {
  // Filter wildlife data to show only main animals
  const mainWildlifeData = wildlifeData.filter((animal) =>
    ["leopard", "elephant", "spotted-deer", "sloth-bear", "peacock"].includes(
      animal.id
    )
  );

  const [hoveredAnimal, setHoveredAnimal] = useState(null);
  const [selectedAnimal, setSelectedAnimal] = useState(null);
  const [showDefaultContent, setShowDefaultContent] = useState(true);

  /**
   * Handle animal marker hover
   */
  const handleAnimalHover = useCallback((animal) => {
    setHoveredAnimal(animal);
    setSelectedAnimal(animal);
    setShowDefaultContent(false);
  }, []);

  /**
   * Handle mouse leave from marker
   */
  const handleAnimalLeave = useCallback(() => {
    setHoveredAnimal(null);
    // Keep showing animal content, don't revert to default
  }, []);

  /**
   * Handle marker click
   */
  const handleAnimalClick = useCallback((animal) => {
    setSelectedAnimal(animal);
    setShowDefaultContent(false);
  }, []);

  /**
   * Get rarity color coding
   */
  const getRarityColor = useCallback((rarity) => {
    return rarityColors[rarity] || "bg-gray-500 text-white";
  }, []);

  /**
   * Render animal marker
   */
  const renderAnimalMarker = useCallback(
    (animal) => {
      const isHovered = hoveredAnimal?.id === animal.id;
      const isSelected = selectedAnimal?.id === animal.id;

      return (
        <div
          key={animal.id}
          className={`absolute transform -translate-x-1/2 -translate-y-1/2 
          transition-all duration-300 cursor-pointer
          ${
            isHovered
              ? "scale-125 z-20"
              : isSelected
              ? "scale-110 z-10"
              : "scale-100 z-5"
          }`}
          style={{
            left: `${animal.position.x}%`,
            top: `${animal.position.y}%`,
          }}
          onMouseEnter={() => handleAnimalHover(animal)}
          onMouseLeave={handleAnimalLeave}
          onClick={() => handleAnimalClick(animal)}
          role="button"
          tabIndex={0}
          aria-label={`View ${animal.name} information`}
        >
          {/* Pulsing ring for hovered/selected */}
          {(isHovered || isSelected) && (
            <div className="absolute inset-0 rounded-full animate-ping bg-emerald-400 opacity-75" />
          )}

          {/* Animal image marker */}
          <div
            className={`relative w-12 h-12 rounded-full border-4 border-white shadow-lg overflow-hidden
          ${isSelected ? "border-emerald-500" : "border-white"}`}
          >
            <img
              src={animal.image}
              alt={animal.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.src =
                  "https://images.unsplash.com/photo-1564349683136-77e08dba1ef7?w=150&h=150&fit=crop&crop=face";
              }}
            />
          </div>

          {/* Animal name label */}
          <div
            className={`absolute -bottom-8 left-1/2 transform -translate-x-1/2 
          px-2 py-1 rounded-md text-xs font-semibold whitespace-nowrap
          ${
            isSelected
              ? "bg-emerald-500 text-white"
              : "bg-white text-gray-800 shadow-md"
          }`}
          >
            {animal.name.split(" ")[0]}
          </div>

          {/* Sighting chance indicator */}
          <div
            className={`absolute -top-2 -right-2 w-6 h-6 rounded-full text-xs font-bold
          flex items-center justify-center ${getRarityColor(animal.rarity)}`}
          >
            {animal.sightingChance.replace("%", "")}
          </div>
        </div>
      );
    },
    [
      hoveredAnimal,
      selectedAnimal,
      handleAnimalHover,
      handleAnimalLeave,
      handleAnimalClick,
      getRarityColor,
    ]
  );

  /**
   * Render default safari camping content
   */
  const renderSafariCampingContent = useCallback(
    () => (
      <div className="h-full flex flex-col bg-gradient-to-br from-green-50 to-emerald-50 p-4 sm:p-8">
        <div className="flex-1 flex flex-col justify-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2 sm:mb-4 leading-tight">
            {safariCampingContent.title}
          </h1>

          <p className="text-lg text-gray-700 leading-relaxed mb-1">
            Experience Yala like never before with our unique mobile camping
            adventures that bring you closer to nature than ever before.
          </p>

          <p className="text-gray-600 leading-relaxed mb-4">
            {safariCampingContent.extendedDescription}
          </p>

          {/* Features */}
          {/* <div className="space-y-6 mb-8">
          {safariCampingContent.features.map((feature, index) => (
            <div key={index} className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
                {feature.icon === 'tent' && <Tent className="w-6 h-6 text-emerald-600" />}
                {feature.icon === 'bed' && <Coffee className="w-6 h-6 text-emerald-600" />}
                {feature.icon === 'campfire' && <Moon className="w-6 h-6 text-emerald-600" />}
              </div>
              <div>
                <h3 className="font-bold text-lg text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            </div>
          ))}
        </div> */}

          {/* Call to Action */}
          <div className="bg-white p-4 sm:p-6 rounded-xl shadow-lg">
            <h3 className="font-bold text-xl text-gray-900 mb-2 sm:mb-4">
              Ready for Your Wild Adventure?
            </h3>
            <p className="text-gray-600 mb-2 sm:mb-4">
              Hover over the wildlife markers on the map to discover what
              amazing creatures you'll encounter during your mobile safari
              camping experience.
            </p>
            <button className="w-full bg-emerald-600 text-white py-2 sm:py-3 rounded-xl font-semibold hover:bg-emerald-700 transition-colors flex items-center justify-center">
              <Eye className="w-5 h-5 mr-2" />
              Explore Wildlife Map
            </button>
          </div>
        </div>
      </div>
    ),
    []
  );

  /**
   * Render animal details panel
   */
  const renderAnimalDetails = useCallback(() => {
    const displayAnimal = selectedAnimal;

    return (
      <div className="h-full flex flex-col bg-gradient-to-br from-green-50 to-emerald-50">
        {/* Animal Header - Reduced padding */}
        <div className="p-4 bg-white border-b border-gray-200 flex-shrink-0">
          <div className="flex items-center space-x-3 mb-3">
            <div className="w-12 h-12 rounded-full overflow-hidden border-3 border-emerald-500">
              <img
                src={displayAnimal.heroImage || displayAnimal.image}
                alt={displayAnimal.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold text-gray-900 mb-1">
                {displayAnimal.name}
              </h2>
              <p className="text-xs italic text-gray-600 mb-1">
                {displayAnimal.scientificName}
              </p>
              <div className="flex items-center space-x-2">
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${getRarityColor(
                    displayAnimal.rarity
                  )}`}
                >
                  {displayAnimal.rarity}
                </span>
                <span className="text-xs text-gray-500">
                  {displayAnimal.type}
                </span>
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-center justify-end mb-1">
                <Star className="w-3 h-3 text-yellow-400 fill-current mr-1" />
                <span className="font-semibold text-sm">
                  {displayAnimal.rating}
                </span>
              </div>
              <div className="text-xs text-gray-600">
                Sighting: {displayAnimal.sightingChance}
              </div>
            </div>
          </div>
          <p className="text-sm text-gray-700 leading-relaxed mb-3">
            {displayAnimal.description}
          </p>

          {/* Camping Experience Highlight - Reduced */}
          <div className="bg-emerald-50 p-3 rounded-lg border-l-4 border-emerald-500">
            <h4 className="font-bold text-emerald-800 mb-1 flex items-center text-sm">
              <Tent className="w-3 h-3 mr-2" />
              Mobile Camping Experience
            </h4>
            <p className="text-emerald-700 text-xs">
              {displayAnimal.campingExperience}
            </p>
          </div>
        </div>

        {/* Scrollable Content - More compact */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {/* Essential Information - Compact grid */}
          <section>
            <h3 className="text-sm font-bold text-gray-900 mb-2 flex items-center">
              <Info className="w-4 h-4 mr-2 text-emerald-600" />
              Essential Information
            </h3>
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-white p-2 rounded-lg shadow-sm">
                <div className="text-xs text-gray-600 mb-1">Population</div>
                <div className="font-semibold text-emerald-700 text-sm">
                  {displayAnimal.detailedInfo.population}
                </div>
              </div>
              <div className="bg-white p-2 rounded-lg shadow-sm">
                <div className="text-xs text-gray-600 mb-1">Lifespan</div>
                <div className="font-semibold text-emerald-700 text-sm">
                  {displayAnimal.detailedInfo.lifespan}
                </div>
              </div>
            </div>
          </section>

          {/* Best Viewing Times - Compact */}
          <section>
            <h3 className="text-sm font-bold text-gray-900 mb-2 flex items-center">
              <Clock className="w-4 h-4 mr-2 text-emerald-600" />
              Best Viewing Times
            </h3>
            <div className="bg-white p-2 rounded-lg shadow-sm">
              <div className="text-xs text-gray-600 mb-1">Daily Time</div>
              <div className="font-semibold text-gray-900 text-sm">
                {displayAnimal.detailedInfo.bestTime}
              </div>
            </div>
          </section>

          {/* Safari Tips - More compact */}
          <section>
            <h3 className="text-sm font-bold text-gray-900 mb-2 flex items-center">
              <Tent className="w-4 h-4 mr-2 text-emerald-600" />
              Safari Tips
            </h3>
            <div className="space-y-1">
              {displayAnimal.safariTips?.slice(0, 2).map((tip, index) => (
                <div
                  key={index}
                  className="bg-white p-2 rounded-lg shadow-sm flex items-start"
                >
                  <ChevronRight className="w-3 h-3 text-emerald-600 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-xs text-gray-800">{tip}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Hotspots - Compact */}
          <section>
            <h3 className="text-sm font-bold text-gray-900 mb-2 flex items-center">
              <Target className="w-4 h-4 mr-2 text-emerald-600" />
              Prime Locations
            </h3>
            <div className="space-y-1">
              {displayAnimal.hotspots?.slice(0, 2).map((hotspot, index) => (
                <div
                  key={index}
                  className="bg-white p-2 rounded-lg shadow-sm flex items-center"
                >
                  <MapPin className="w-3 h-3 text-emerald-600 mr-2 flex-shrink-0" />
                  <span className="text-xs text-gray-800">{hotspot}</span>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Action Buttons - Compact */}
        <div className="p-3 bg-white border-t border-gray-200 flex-shrink-0">
          <button
            onClick={() => {
              setShowDefaultContent(true);
              setSelectedAnimal(null);
            }}
            className="w-full bg-emerald-600 text-white py-2 rounded-xl font-semibold hover:bg-emerald-700 transition-colors flex items-center justify-center text-sm"
          >
            <Tent className="w-4 h-4 mr-2" />
            Back to Safari Info
          </button>
        </div>
      </div>
    );
  }, [selectedAnimal, getRarityColor]);

  /**
   * Render map legend - Removed as it was too large
   */
  const renderMapLegend = useCallback(() => null, []);

  /**
   * Render bottom animal selector
   */
  const renderAnimalSelector = useCallback(
    () => (
      <div className="bg-gray-50 p-2 xs:p-3 sm:p-6 border-t border-gray-200">
        <div className="flex flex-wrap justify-center gap-1 xs:gap-1.5 sm:gap-2 mb-2 sm:mb-4">
          {mainWildlifeData.map((animal) => (
            <button
              key={animal.id}
              onClick={() => handleAnimalClick(animal)}
              onMouseEnter={() => handleAnimalHover(animal)}
              onMouseLeave={handleAnimalLeave}
              className={`flex items-center space-x-1 xs:space-x-1.5 sm:space-x-2 px-1 xs:px-1.5 sm:px-2 py-1 xs:py-1.5 sm:py-2 rounded-full text-xs xs:text-xs sm:text-sm font-medium transition-all ${
                selectedAnimal?.id === animal.id
                  ? "bg-emerald-600 text-white shadow-lg"
                  : "bg-white text-gray-700 hover:bg-emerald-50 hover:text-emerald-600"
              }`}
            >
              <img
                src={animal.image}
                alt={animal.name}
                className="w-5 h-5 xs:w-5.5 xs:h-5.5 sm:w-6 sm:h-6 rounded-full object-cover"
                loading="lazy"
              />
              <span>{animal.name.split(" ")[0]}</span>
              <span
                className={`text-xs px-1 py-0.5 rounded-full ${getRarityColor(
                  animal.rarity
                )}`}
              >
                {animal.sightingChance.replace("%", "")}
              </span>
            </button>
          ))}
        </div>
        <div className="text-center">
          <p className="text-xs xs:text-xs sm:text-sm text-gray-600">
            🦎 <strong>Safari Tip:</strong> Best viewing is from morning (6-9
            AM) and late afternoon (3-6 PM)
          </p>
        </div>
      </div>
    ),
    [
      handleAnimalClick,
      handleAnimalHover,
      handleAnimalLeave,
      selectedAnimal,
      getRarityColor,
    ]
  );

  const displayAnimal = selectedAnimal || mainWildlifeData[0];
  return (
    <>
      <Helmet>
        <title>Yala Mobile Safari Camping | Wildlife Map & Experience</title>
        <meta
          name="description"
          content="Experience the best of Yala National Park with mobile safari camping. Explore an interactive wildlife map, discover animal hotspots, and plan your unforgettable adventure in Sri Lanka's premier safari destination."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content="Yala Mobile Safari Camping" />
        <meta
          property="og:description"
          content="Interactive wildlife map and mobile camping in Yala National Park. Discover leopards, elephants, and more on your Sri Lankan safari adventure."
        />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={mapConfig.imageUrl} />
        <meta
          property="og:url"
          content="https://yourdomain.com/yala-mobile-camping"
        />
        <link
          rel="canonical"
          href="https://yourdomain.com/yala-mobile-camping"
        />
      </Helmet>
      <article className="bg-white rounded-2xl shadow-2xl overflow-hidden w-full max-w-6xl mx-auto">
        {/* Main Title */}
        <div className="p-3 xs:p-4 sm:p-8 text-center">
          <h1 className="text-xl xs:text-2xl sm:text-3xl md:text-5xl font-bold text-gray-900 mb-2 sm:mb-4 leading-tight">
            Mobile Safari Camping in Yala – Wild, Simple, Unforgettable
          </h1>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 h-auto lg:h-[500px]">
          {/* Left Side - Interactive Map */}
          <section className="relative bg-gradient-to-br from-green-50 to-emerald-50 p-2 xs:p-3 sm:p-6">
            {/* Responsive aspect-ratio wrapper for the map and overlay */}
            <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden shadow-lg">
              {/* Yala Forest Map Image */}
              <img
                src={mapConfig.imageUrl}
                alt={mapConfig.altText}
                className={`w-full h-full object-contain transition-transform duration-500 ${
                  hoveredAnimal ? "scale-105" : "scale-100"
                }`}
                onError={(e) => {
                  e.target.src = mapConfig.fallbackImageUrl;
                }}
                loading="lazy"
              />
              {/* Map Overlay with Wildlife Markers */}
              <div
                className="absolute inset-0"
                role="application"
                aria-label="Wildlife location markers"
              >
                {mainWildlifeData.map(renderAnimalMarker)}
              </div>
              {/* Park Information Overlay */}
              <div className="absolute bottom-2 left-2 sm:bottom-4 sm:left-4 bg-black bg-opacity-75 text-white p-2 sm:p-4 rounded-lg max-w-xs sm:max-w-sm text-xs sm:text-sm">
                <h4 className="font-bold mb-1 sm:mb-2 text-sm sm:text-base">
                  🌿 Mobile Safari Camping
                </h4>
                <p>
                  {showDefaultContent
                    ? "Tap wildlife markers to discover your camping companions"
                    : `Currently exploring: ${displayAnimal.name}`}
                </p>
                <p className="mt-1 text-green-200">
                  {!showDefaultContent &&
                    `Sighting Probability: ${displayAnimal.sightingChance}`}
                </p>
              </div>
              {/* Hover Indicator */}
              {hoveredAnimal && (
                <div className="absolute top-2 left-2 sm:top-4 sm:left-4 bg-emerald-600 text-white px-2 sm:px-4 py-1 sm:py-2 rounded-lg text-xs sm:text-sm font-medium">
                  🔍 Exploring: {hoveredAnimal.name} habitat
                </div>
              )}
            </div>
            {/* Map Controls */}
            <div className="mt-2 sm:mt-4 flex flex-wrap justify-center gap-2 sm:gap-4">
              {safariInfo.bestTimes.map((item, index) => (
                <div
                  key={index}
                  className="bg-white px-2 sm:px-4 py-1 sm:py-2 rounded-lg shadow-sm flex items-center space-x-1 sm:space-x-2 text-xs sm:text-sm"
                >
                  {item.icon === "sunrise" && (
                    <Sunrise className="w-4 h-4 text-orange-500" />
                  )}
                  {item.icon === "navigation" && (
                    <Navigation className="w-4 h-4 text-blue-500" />
                  )}
                  <span>
                    {item.label}: {item.value}
                  </span>
                </div>
              ))}
            </div>
          </section>
          {/* Right Side - Content Panel */}
          <section
            aria-label="Information panel"
            className="h-auto lg:h-[500px] overflow-hidden"
          >
            {showDefaultContent
              ? renderSafariCampingContent()
              : renderAnimalDetails()}
          </section>
        </div>
        {/* Bottom Animal Selector */}
        <div className="bg-gray-50 p-2 xs:p-3 sm:p-6 border-t border-gray-200">
          <div className="flex flex-wrap justify-center gap-1 xs:gap-1.5 sm:gap-2 mb-2 sm:mb-4">
            {mainWildlifeData.map((animal) => (
              <button
                key={animal.id}
                onClick={() => handleAnimalClick(animal)}
                onMouseEnter={() => handleAnimalHover(animal)}
                onMouseLeave={handleAnimalLeave}
                className={`flex items-center space-x-1 xs:space-x-1.5 sm:space-x-2 px-1 xs:px-1.5 sm:px-2 py-1 xs:py-1.5 sm:py-2 rounded-full text-xs xs:text-xs sm:text-sm font-medium transition-all ${
                  selectedAnimal?.id === animal.id
                    ? "bg-emerald-600 text-white shadow-lg"
                    : "bg-white text-gray-700 hover:bg-emerald-50 hover:text-emerald-600"
                }`}
              >
                <img
                  src={animal.image}
                  alt={animal.name}
                  className="w-5 h-5 xs:w-5.5 xs:h-5.5 sm:w-6 sm:h-6 rounded-full object-cover"
                  loading="lazy"
                />
                <span>{animal.name.split(" ")[0]}</span>
                <span
                  className={`text-xs px-1 py-0.5 rounded-full ${getRarityColor(
                    animal.rarity
                  )}`}
                >
                  {animal.sightingChance.replace("%", "")}
                </span>
              </button>
            ))}
          </div>
          <div className="text-center">
            <p className="text-xs xs:text-xs sm:text-sm text-gray-600">
              🦎 <strong>Safari Tip:</strong> Best viewing is from morning (6-9
              AM) and late afternoon (3-6 PM)
            </p>
          </div>
        </div>
        {/* SEO Content Section */}
        <section className="bg-gray-50 p-3 xs:p-4 sm:p-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-lg xs:text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-4 sm:mb-6 mt-6 sm:mt-10 text-center">
              Why Choose Mobile Safari Camping in Yala National Park
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 xs:gap-4 sm:gap-6 text-center">
              {parkStatistics.map((stat, index) => (
                <div
                  key={index}
                  className="bg-white p-3 xs:p-4 sm:p-6 rounded-xl shadow-sm"
                >
                  <div
                    className={`w-10 h-10 xs:w-11 xs:h-11 sm:w-12 sm:h-12 rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-4 ${
                      stat.icon === "award"
                        ? "bg-red-100"
                        : stat.icon === "users"
                        ? "bg-blue-100"
                        : "bg-green-100"
                    }`}
                  >
                    {stat.icon === "award" && (
                      <Award className="w-5 h-5 xs:w-6 xs:h-6 sm:w-6 sm:h-6 text-red-600" />
                    )}
                    {stat.icon === "users" && (
                      <Users className="w-5 h-5 xs:w-6 xs:h-6 sm:w-6 sm:h-6 text-blue-600" />
                    )}
                    {stat.icon === "shield" && (
                      <Shield className="w-5 h-5 xs:w-6 xs:h-6 sm:w-6 sm:h-6 text-green-600" />
                    )}
                  </div>
                  <h3 className="font-bold text-base xs:text-lg sm:text-lg mb-1 sm:mb-2">
                    {stat.title}
                  </h3>
                  <p className="text-gray-600 text-xs xs:text-sm sm:text-sm">
                    {stat.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </article>
    </>
  );
};

export default YalaWildlifeMap;
