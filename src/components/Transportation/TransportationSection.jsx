// src/components/Transportation/TransportationSection.jsx
import React, { useState, useRef, useCallback, useMemo } from "react";
import {
  Tent,
  Mountain,
  Shield,
  Camera,
  Coffee,
  Car,
  Clock,
  Users,
  DollarSign,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Phone,
  Mail,
  MapPin,
  Star,
  CheckCircle,
} from "lucide-react";
import { Helmet } from "react-helmet";
import {
  TRANSPORTATION_DATA,
  TRENDING_DESTINATIONS,
  ARROW_TOURS_DATA,
} from "../../constants/transportationData";
import { WHATSAPP_NUMBER, COMPANY_PHONE } from "../../constants";
import HappyGirl from "../../assets/images/safari/Yala_mibile_camping_safari18.webp";

const iconMap = {
  Tent,
  Mountain,
  Shield,
  Camera,
  Coffee,
  Car,
};

// Optimized Image Component
const OptimizedImage = React.memo(({ 
  src, 
  alt, 
  className, 
  fallbackIcon: FallbackIcon, 
  width = "320",
  height = "240",
  priority = false,
  ...props 
}) => {
  const [imageError, setImageError] = useState(false);
  
  const handleImageError = useCallback(() => {
    setImageError(true);
  }, []);

  if (imageError) {
    return (
      <div className={`${className} flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200`}>
        {FallbackIcon && (
          <FallbackIcon 
            className="h-12 w-12 text-slate-400" 
            aria-label={`${alt} placeholder`} 
          />
        )}
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      width={width}
      height={height}
      className={className}
      onError={handleImageError}
      {...props}
    />
  );
});

OptimizedImage.displayName = 'OptimizedImage';

// Service Card Component
const ServiceCard = React.memo(({ service, isExpanded, onToggle, onBooking }) => {
  const IconComponent = iconMap[service.icon];
  
  const handleKeyPress = useCallback((e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onToggle(service.id);
    }
  }, [onToggle, service.id]);

  return (
    <article
      className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border border-slate-200 flex flex-col overflow-hidden transform hover:scale-105 focus-within:ring-2 focus-within:ring-blue-300"
      role="article"
      aria-labelledby={`service-title-${service.id}`}
      itemScope
      itemType="https://schema.org/Service"
    >
      {/* Header Section */}
      <div className="p-6 pb-2">
        <div className="flex items-center space-x-4 mb-4">
          <div className="bg-slate-100 p-3 rounded-lg" aria-hidden="true">
            {IconComponent && (
              <IconComponent className="h-6 w-6 text-slate-600" />
            )}
          </div>
          <div className="flex-1">
            <h3 
              id={`service-title-${service.id}`}
              className="text-xl font-semibold text-slate-800 mb-1"
              itemProp="name"
            >
              {service.title}
            </h3>
            <p 
              className="text-2xl font-bold text-slate-700" 
              aria-label={`Price: ${service.price}`}
              itemProp="offers"
              itemScope
              itemType="https://schema.org/Offer"
            >
              <span itemProp="price">{service.price}</span>
            </p>
          </div>
        </div>

        {/* Duration & Destination Info */}
        <div className="flex items-center justify-between text-slate-500 mb-3">
          <div className="flex items-center space-x-2">
            <Clock className="h-4 w-4" aria-hidden="true" />
            <span className="font-medium">
              <span className="sr-only">Duration: </span>
              <time itemProp="duration">{service.duration}</time>
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <MapPin className="h-4 w-4" aria-hidden="true" />
            <span className="font-medium text-sm" itemProp="areaServed">
              <span className="sr-only">Destination: </span>
              {service.destination.name}
            </span>
          </div>
        </div>

        <p 
          className="text-slate-600 mb-4 leading-relaxed"
          itemProp="description"
        >
          {service.description}
        </p>
      </div>

      {/* Image Area - Shows when not expanded */}
      {!isExpanded && (
        <div className="mx-6 mb-4 h-40 bg-gradient-to-br from-slate-100 to-slate-200 rounded-lg relative overflow-hidden">
          <OptimizedImage
            src={service.destination.image}
            alt={`Transportation service to ${service.destination.name} - scenic destination view for ${service.title}`}
            className="absolute inset-0 w-full h-full object-cover"
            fallbackIcon={IconComponent}
            width="280"
            height="160"
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
          {/* Destination label */}
          <div className="absolute bottom-2 left-2 text-white">
            <p className="font-semibold text-sm bg-black/50 px-2 py-1 rounded">
              {service.destination.name}
            </p>
          </div>
        </div>
      )}

      {/* Expanded Details */}
      {isExpanded && (
        <div 
          className="px-6 mb-4 animate-fadeIn"
          id={`service-details-${service.id}`}
          role="region"
          aria-labelledby={`service-title-${service.id}`}
        >
          <div className="pt-2 border-t border-slate-100 space-y-6">
            {/* Destination Image - Larger when expanded */}
            <div className="h-48 rounded-lg overflow-hidden relative">
              <OptimizedImage
                src={service.destination.image}
                alt={`Detailed view of ${service.destination.name} - your ${service.title} destination`}
                className="w-full h-full object-cover"
                fallbackIcon={IconComponent}
                width="400"
                height="192"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
              <div className="absolute bottom-3 left-3 text-white">
                <h4 className="font-bold text-lg">
                  {service.destination.name}
                </h4>
                <p className="text-sm text-white/80">
                  Transfer Destination
                </p>
              </div>
            </div>

            {/* Features */}
            <div>
              <h4 className="font-semibold text-slate-800 mb-3">
                What's Included:
              </h4>
              <ul className="space-y-2" role="list">
                {service.features.map((feature, idx) => (
                  <li
                    key={idx}
                    className="text-slate-600 flex items-start"
                    role="listitem"
                  >
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 mr-3 flex-shrink-0" aria-hidden="true" />
                    <span itemProp="serviceOutput">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Vehicle Types */}
            <div>
              <h4 className="font-semibold text-slate-800 mb-3">
                Available Vehicles:
              </h4>
              <div className="flex flex-wrap gap-2" role="list">
                {service.vehicleTypes.map((vehicle, idx) => (
                  <span
                    key={idx}
                    className="bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-sm font-medium"
                    role="listitem"
                    itemProp="category"
                  >
                    {vehicle}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex space-x-3 mt-auto px-6 pb-6" role="group" aria-label="Service actions">
        <button
          onClick={() => onBooking(service)}
          className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-3 px-4 rounded-lg font-medium transition-all duration-200 hover:scale-105 active:scale-95 focus:ring-2 focus:ring-blue-300 focus:outline-none"
          aria-label={`Book ${service.title} service via WhatsApp - ${service.price}`}
        >
          Book Now
        </button>
        <button
          onClick={() => onToggle(service.id)}
          onKeyPress={handleKeyPress}
          className="px-4 py-3 border border-slate-200 hover:border-slate-300 text-slate-700 rounded-lg transition-all duration-200 flex items-center space-x-2 hover:scale-105 active:scale-95 focus:ring-2 focus:ring-slate-300 focus:outline-none"
          aria-expanded={isExpanded}
          aria-controls={`service-details-${service.id}`}
          aria-label={`${isExpanded ? 'Hide' : 'Show'} detailed information for ${service.title}`}
        >
          <span>{isExpanded ? "Close" : "Details"}</span>
          {isExpanded ? (
            <ChevronUp className="h-4 w-4" aria-hidden="true" />
          ) : (
            <ChevronDown className="h-4 w-4" aria-hidden="true" />
          )}
        </button>
      </div>
    </article>
  );
});

ServiceCard.displayName = 'ServiceCard';

// Trending Destination Card Component
const TrendingCard = React.memo(({ destination }) => (
  <article
    className="flex-none w-64 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group cursor-pointer hover:scale-105 focus-within:ring-2 focus-within:ring-blue-300"
    tabIndex="0"
    role="button"
    aria-label={`Learn more about ${destination.name} - ${destination.description}`}
    itemScope
    itemType="https://schema.org/TouristDestination"
  >
    <div className="relative h-40">
      <OptimizedImage
        src={destination.image}
        alt={`${destination.name} - ${destination.description}. Located ${destination.distance} from Yala National Park`}
        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        fallbackIcon={MapPin}
        width="256"
        height="160"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
      <div className="absolute top-3 right-3 bg-white/90 text-slate-800 px-2 py-1 rounded-full text-xs font-medium">
        <span className="sr-only">Distance from Yala: </span>
        <span itemProp="distance">{destination.distance}</span>
      </div>
    </div>

    <div className="p-4">
      <h4 className="font-bold text-slate-800 mb-1" itemProp="name">
        {destination.name}
      </h4>
      <p className="text-slate-600 text-sm" itemProp="description">
        {destination.description}
      </p>
    </div>
  </article>
));

TrendingCard.displayName = 'TrendingCard';

const TransportationSection = () => {
  const [expandedCard, setExpandedCard] = useState(null);
  const [showArrowTours, setShowArrowTours] = useState(true);
  const scrollContainerRef = useRef(null);

  // Memoized callbacks for performance
  const toggleCard = useCallback((id) => {
    setExpandedCard(prev => prev === id ? null : id);
  }, []);

  const handleWhatsAppContact = useCallback((service = null) => {
    let message = "Hi! I'm interested in your transportation services.";

    if (service) {
      message = `Hi! I'm interested in your ${service.title} service (${service.price}). Could you provide more information about availability and booking?`;
    } else {
      message += " Could you provide more information?";
    }

    const encodedMessage = encodeURIComponent(message);
    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`,
      "_blank",
      "noopener,noreferrer"
    );
  }, []);

  const handleArrowToursContact = useCallback(() => {
    window.open(ARROW_TOURS_DATA.websiteUrl, "_blank", "noopener,noreferrer");
  }, []);

  const scroll = useCallback((direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = 280;
      const currentScroll = scrollContainerRef.current.scrollLeft;
      const newScroll =
        direction === "left"
          ? currentScroll - scrollAmount
          : currentScroll + scrollAmount;

      scrollContainerRef.current.scrollTo({
        left: newScroll,
        behavior: "smooth",
      });
    }
  }, []);

  // Memoized schema data
  const schemaData = useMemo(() => ({
    "@context": "https://schema.org",
    "@type": "TouristAttraction",
    "name": "Yala Mobile Camping Transportation Services",
    "description": "Professional transportation services for Yala National Park visitors including airport transfers, city transfers, and safari vehicle rentals",
    "url": "https://www.yalamobilecamping.com/transportation",
    "telephone": COMPANY_PHONE,
    "priceRange": "$80-$150",
    "serviceType": "Transportation Service",
    "provider": {
      "@type": "Organization",
      "name": "Yala Mobile Camping",
      "telephone": COMPANY_PHONE,
      "url": "https://www.yalamobilecamping.com"
    },
    "areaServed": {
      "@type": "Place",
      "name": "Yala National Park, Sri Lanka",
      "address": {
        "@type": "PostalAddress",
        "addressCountry": "LK",
        "addressRegion": "Southern Province"
      }
    },
    "offers": TRANSPORTATION_DATA.map(service => ({
      "@type": "Offer",
      "name": service.title,
      "price": service.price.replace(/[^\d.-]/g, ''),
      "priceCurrency": "USD",
      "description": service.description,
      "availability": "https://schema.org/InStock",
      "validFrom": new Date().toISOString(),
      "itemOffered": {
        "@type": "Service",
        "name": service.title,
        "description": service.description,
        "category": "Transportation"
      }
    })),
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "127",
      "bestRating": "5",
      "worstRating": "1"
    }
  }), []);

  return (
    <>
      <Helmet>
        <title>Transportation Services | Yala Mobile Camping - Airport Transfers & Safari Transport</title>
        <meta
          name="description"
          content="Reliable transportation services for Yala National Park including airport transfers from Colombo, Galle, and Hambantota. Professional drivers, comfortable vehicles, competitive rates starting from $80."
        />
        <meta
          name="keywords"
          content="yala transportation, airport transfer sri lanka, safari transport, colombo to yala, galle to yala, hambantota to yala, yala transfer service, sri lanka transport"
        />
        <link rel="canonical" href="https://www.yalamobilecamping.com/transportation" />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        
        {/* Open Graph Tags */}
        <meta property="og:title" content="Transportation Services | Yala Mobile Camping" />
        <meta property="og:description" content="Professional transportation services for Yala National Park. Airport transfers, city transfers, and safari vehicle rentals with experienced drivers." />
        <meta property="og:image" content={HappyGirl} />
        <meta property="og:url" content="https://www.yalamobilecamping.com/transportation" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Yala Mobile Camping" />
        
        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Transportation Services | Yala Mobile Camping" />
        <meta name="twitter:description" content="Professional transportation services for Yala National Park visitors" />
        <meta name="twitter:image" content={HappyGirl} />
        
        {/* Additional SEO Tags */}
        <meta name="author" content="Yala Mobile Camping" />
        <meta name="language" content="English" />
        <meta name="geo.region" content="LK-8" />
        <meta name="geo.placename" content="Yala National Park" />
        <meta name="geo.position" content="6.3724;81.3869" />
        <meta name="ICBM" content="6.3724, 81.3869" />
        
        {/* Schema Markup */}
        <script type="application/ld+json">
          {JSON.stringify(schemaData)}
        </script>
        
        {/* Breadcrumb Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://www.yalamobilecamping.com"
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "Transportation Services",
                "item": "https://www.yalamobilecamping.com/transportation"
              }
            ]
          })}
        </script>
      </Helmet>

      <main>
        <section 
          id="transportation" 
          className="py-20 bg-slate-50 relative"
          itemScope
          itemType="https://schema.org/WebPageElement"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Header */}
            <header className="text-center mb-16">
              <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6">
                Transportation Services
              </h1>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                Comfortable and reliable transport solutions to get you to your
                Yala adventure safely and conveniently
              </p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Transportation Services - Left 3 columns */}
              <section className="lg:col-span-3" aria-labelledby="transportation-services">
                <h2 id="transportation-services" className="sr-only">Available Transportation Services</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {TRANSPORTATION_DATA.map((service) => (
                    <ServiceCard
                      key={service.id}
                      service={service}
                      isExpanded={expandedCard === service.id}
                      onToggle={toggleCard}
                      onBooking={handleWhatsAppContact}
                    />
                  ))}
                </div>
              </section>

              {/* Arrow Ceylon Tours Advertisement - Right 1 column */}
              {showArrowTours && (
                <aside 
                  className="lg:col-span-1"
                  aria-labelledby="partner-tours"
                >
                  <div className="sticky top-24">
                    <div className="bg-blue-500 text-white rounded-lg shadow-lg p-5 relative">
                      <button
                        onClick={() => setShowArrowTours(false)}
                        className="absolute top-3 right-3 text-white/80 hover:text-white text-lg font-light focus:ring-2 focus:ring-white/50 focus:outline-none rounded"
                        aria-label="Close partner advertisement"
                      >
                        ×
                      </button>

                      <div className="pr-5">
                        <div className="text-center mb-5">
                          <h3 id="partner-tours" className="text-lg font-bold mb-2">
                            {ARROW_TOURS_DATA.companyName}
                          </h3>
                          <p className="text-blue-100 text-sm mb-3">
                            {ARROW_TOURS_DATA.tagline}
                          </p>
                          <p className="text-blue-50 text-sm leading-relaxed">
                            {ARROW_TOURS_DATA.description}
                          </p>
                        </div>

                        {/* Popular Packages */}
                        <div className="mb-5">
                          <h4 className="font-semibold mb-3 text-white text-sm">
                            Popular Tours:
                          </h4>
                          <div className="space-y-2">
                            {ARROW_TOURS_DATA.popularPackages
                              .slice(0, 3)
                              .map((pkg, idx) => (
                                <div
                                  key={idx}
                                  className="bg-blue-400/30 rounded-md p-2"
                                >
                                  <p className="text-white font-medium text-sm">
                                    {pkg.name}
                                  </p>
                                  <p className="text-blue-100 text-xs mt-1">
                                    {pkg.duration}
                                  </p>
                                </div>
                              ))}
                          </div>
                        </div>

                        {/* Features */}
                        <div className="mb-5">
                          <h4 className="font-semibold mb-2 text-white text-sm">
                            Why Choose Us:
                          </h4>
                          <ul className="space-y-1" role="list">
                            {ARROW_TOURS_DATA.features
                              .slice(0, 4)
                              .map((feature, idx) => (
                                <li
                                  key={idx}
                                  className="text-sm text-blue-50 flex items-start"
                                  role="listitem"
                                >
                                  <Star className="h-3 w-3 text-blue-200 mt-1 mr-2 flex-shrink-0" aria-hidden="true" />
                                  <span className="text-xs">{feature}</span>
                                </li>
                              ))}
                          </ul>
                        </div>

                        {/* CTA Buttons */}
                        <div className="space-y-2">
                          <button
                            onClick={handleArrowToursContact}
                            className="w-full bg-white text-blue-600 hover:bg-blue-50 py-2.5 px-3 rounded-md text-sm font-medium transition-colors duration-200 flex items-center justify-center space-x-2 focus:ring-2 focus:ring-white/50 focus:outline-none"
                            aria-label={`Visit ${ARROW_TOURS_DATA.companyName} website`}
                          >
                            <ExternalLink className="h-4 w-4" aria-hidden="true" />
                            <span>Visit Website</span>
                          </button>

                          <div className="grid grid-cols-2 gap-2">
                            <a
                              href={`tel:${ARROW_TOURS_DATA.contactInfo.phone}`}
                              className="bg-blue-400/30 hover:bg-blue-400/50 py-2 px-2 rounded-md transition-colors duration-200 text-xs font-medium flex items-center justify-center space-x-1 focus:ring-2 focus:ring-white/50 focus:outline-none"
                              aria-label={`Call ${ARROW_TOURS_DATA.companyName}`}
                            >
                              <Phone className="h-3 w-3" aria-hidden="true" />
                              <span>Call</span>
                            </a>
                            <a
                              href={`https://wa.me/${ARROW_TOURS_DATA.contactInfo.whatsapp}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="bg-green-600 hover:bg-green-700 py-2 px-2 rounded-md transition-colors duration-200 text-xs font-medium flex items-center justify-center space-x-1 focus:ring-2 focus:ring-white/50 focus:outline-none"
                              aria-label={`Contact ${ARROW_TOURS_DATA.companyName} via WhatsApp`}
                            >
                              <Mail className="h-3 w-3" aria-hidden="true" />
                              <span>WhatsApp</span>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </aside>
              )}
            </div>

            {/* Trending Destinations Scroll Section */}
            <section className="mt-20" aria-labelledby="trending-destinations">
              <header className="text-center mb-12">
                <h2 id="trending-destinations" className="text-3xl font-bold text-slate-800 mb-4">
                  Trending Travel Destinations
                </h2>
                <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                  Discover popular destinations around Yala and plan your next
                  adventure with our reliable transportation services
                </p>
              </header>

              <div className="relative">
                {/* Scroll Buttons */}
                <button
                  onClick={() => scroll("left")}
                  className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white shadow-lg rounded-full p-2 transition-all duration-200 hover:scale-110 focus:ring-2 focus:ring-blue-300 focus:outline-none"
                  aria-label="Scroll destinations left"
                >
                  <ChevronLeft className="h-5 w-5 text-slate-600" aria-hidden="true" />
                </button>

                <button
                  onClick={() => scroll("right")}
                  className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white shadow-lg rounded-full p-2 transition-all duration-200 hover:scale-110 focus:ring-2 focus:ring-blue-300 focus:outline-none"
                  aria-label="Scroll destinations right"
                >
                  <ChevronRight className="h-5 w-5 text-slate-600" aria-hidden="true" />
                </button>

                {/* Scrollable Container */}
                <div
                  ref={scrollContainerRef}
                  className="flex space-x-4 overflow-x-auto scrollbar-hide pb-4"
                  role="region"
                  aria-label="Trending travel destinations carousel"
                  style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                >
                  {TRENDING_DESTINATIONS.map((destination) => (
                    <TrendingCard key={destination.id} destination={destination} />
                  ))}
                </div>
              </div>
            </section>

            {/* Bottom CTA Section */}
            <section className="mt-16 bg-white rounded-xl border border-slate-200 overflow-hidden" aria-labelledby="custom-transport">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                {/* Left Column - Image */}
                <div className="h-64 lg:h-auto bg-gradient-to-br from-blue-100 to-slate-100 relative overflow-hidden">
                  <OptimizedImage
                    src={HappyGirl}
                    alt="Happy customer enjoying safari experience - Yala Mobile Camping transportation services"
                    className="absolute inset-0 w-full h-full object-cover"
                    width="600"
                    height="400"
                    priority={true}
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-transparent"></div>
                  {/* Decorative elements */}
                  <div className="absolute top-4 left-4 w-12 h-12 bg-blue-200/30 rounded-full" aria-hidden="true"></div>
                  <div className="absolute bottom-8 right-8 w-8 h-8 bg-slate-300/40 rounded-full" aria-hidden="true"></div>
                  <div className="absolute top-1/3 right-6 w-6 h-6 bg-blue-300/50 rounded-full" aria-hidden="true"></div>
                </div>

                {/* Right Column - Content */}
                <div className="p-8 flex flex-col justify-center">
                  <h3 id="custom-transport" className="text-2xl font-bold text-slate-800 mb-4">
                    Need Custom Transportation?
                  </h3>
                  <p className="text-slate-600 mb-8 text-lg leading-relaxed">
                    We offer flexible transportation solutions tailored to your
                    specific needs. Contact us to discuss your requirements and
                    get a personalized quote for your Yala adventure.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <button
                      onClick={() => handleWhatsAppContact()}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center space-x-3 focus:ring-2 focus:ring-blue-300 focus:outline-none"
                      aria-label="Contact Yala Mobile Camping via WhatsApp for custom transportation"
                    >
                      <Phone className="h-5 w-5" aria-hidden="true" />
                      <span>Contact via WhatsApp</span>
                    </button>
                    <a
                      href={`tel:${COMPANY_PHONE}`}
                      className="border-2 border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center space-x-3 focus:ring-2 focus:ring-blue-300 focus:outline-none"
                      aria-label={`Call Yala Mobile Camping at ${COMPANY_PHONE} for transportation booking`}
                    >
                      <Phone className="h-5 w-5" aria-hidden="true" />
                      <span>Call Now</span>
                    </a>
                  </div>
                </div>
              </div>
            </section>

            {/* Additional SEO Content Section */}
            <section className="mt-16 bg-white rounded-xl border border-slate-200 p-8" aria-labelledby="transportation-info">
              <div className="max-w-4xl mx-auto">
                <header className="text-center mb-8">
                  <h2 id="transportation-info" className="text-2xl font-bold text-slate-800 mb-4">
                    Why Choose Our Transportation Services?
                  </h2>
                  <p className="text-slate-600 text-lg">
                    Experience the difference with our professional, reliable, and comfortable transportation solutions
                  </p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                  <div className="text-center">
                    <div className="bg-blue-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                      <Shield className="h-8 w-8 text-blue-600" aria-hidden="true" />
                    </div>
                    <h3 className="font-semibold text-slate-800 mb-2">Safe & Reliable</h3>
                    <p className="text-slate-600 text-sm">
                      Professional drivers with extensive local knowledge and impeccable safety records
                    </p>
                  </div>
                  
                  <div className="text-center">
                    <div className="bg-green-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                      <Clock className="h-8 w-8 text-green-600" aria-hidden="true" />
                    </div>
                    <h3 className="font-semibold text-slate-800 mb-2">Always On Time</h3>
                    <p className="text-slate-600 text-sm">
                      Punctual service ensuring you never miss your safari or flight connections
                    </p>
                  </div>
                  
                  <div className="text-center">
                    <div className="bg-orange-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                      <Car className="h-8 w-8 text-orange-600" aria-hidden="true" />
                    </div>
                    <h3 className="font-semibold text-slate-800 mb-2">Comfortable Vehicles</h3>
                    <p className="text-slate-600 text-sm">
                      Modern, air-conditioned vehicles maintained to the highest standards for your comfort
                    </p>
                  </div>
                </div>

                <div className="bg-slate-50 rounded-lg p-6">
                  <h3 className="font-semibold text-slate-800 mb-4 text-center">
                    Transportation Coverage Areas
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-4 w-4 text-blue-500" aria-hidden="true" />
                      <span className="text-slate-700 text-sm">Colombo Airport (CMB)</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-4 w-4 text-blue-500" aria-hidden="true" />
                      <span className="text-slate-700 text-sm">Mattala Airport (HRI)</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-4 w-4 text-blue-500" aria-hidden="true" />
                      <span className="text-slate-700 text-sm">Galle City</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-4 w-4 text-blue-500" aria-hidden="true" />
                      <span className="text-slate-700 text-sm">Hambantota City</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-4 w-4 text-blue-500" aria-hidden="true" />
                      <span className="text-slate-700 text-sm">Tissamaharama</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-4 w-4 text-blue-500" aria-hidden="true" />
                      <span className="text-slate-700 text-sm">Kataragama</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </section>
      </main>

      {/* Enhanced CSS with performance optimizations */}
      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-in-out;
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        /* Performance optimizations */
        * {
          box-sizing: border-box;
        }
        
        /* Improve scroll performance */
        .scrollbar-hide {
          transform: translateZ(0);
          backface-visibility: hidden;
          perspective: 1000;
        }
        
        /* Optimize hover effects */
        @media (hover: hover) {
          .hover\\:scale-105:hover {
            transform: scale(1.05);
          }
          .hover\\:scale-110:hover {
            transform: scale(1.10);
          }
        }
        
        /* Reduce motion for users who prefer it */
        @media (prefers-reduced-motion: reduce) {
          .animate-fadeIn,
          .transition-all,
          .transition-colors,
          .transition-transform {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
        
        /* Focus visible improvements */
        .focus\\:ring-2:focus {
          outline: 2px solid transparent;
          outline-offset: 2px;
        }
        
        /* High contrast mode support */
        @media (prefers-contrast: high) {
          .bg-slate-50 {
            background-color: white;
          }
          .text-slate-600 {
            color: black;
          }
          .border-slate-200 {
            border-color: black;
          }
        }
        
        /* Dark mode support preparation */
        @media (prefers-color-scheme: dark) {
          .bg-slate-50 {
            background-color: #0f172a;
          }
          .bg-white {
            background-color: #1e293b;
          }
          .text-slate-800 {
            color: #f1f5f9;
          }
          .text-slate-600 {
            color: #cbd5e1;
          }
        }
      `}</style>
    </>
  );
};

// Performance optimization with React.memo
export default React.memo(TransportationSection);
