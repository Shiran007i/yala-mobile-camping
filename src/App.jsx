// src/App.jsx - SEO Optimized & Production Ready
import React, { useState, useMemo, useEffect } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { ChevronRight } from "lucide-react";

// Clean imports using barrel exports
import {
  Header,
  Footer,
  TabSections,
  CampingSection,
  YalaWildlifeMap,
  ImageGallery,
  SafariActivitiesSection,
  AboutUsSection,
  LocationDetail,
  BookingForm,
  TripAdvisorSection,
  FloatingActionButtons,
  ServicesSection,
  WhyChooseUsSection,
  CallToActionSection,
} from "./components";

import BookingManager from "./components/Booking";


// Custom hooks
import { useBookingHandlers } from "./hooks";

// Constants
import { SERVICES_DATA } from "./constants";
import camp3 from "/src/assets/images/camp3.webp";

// SEO Constants - Fixed process.env issue
const SEO_CONFIG = {
  siteName: "Yala Mobile Camping",
  siteUrl: "https://yalamobilecamping.com",
  defaultTitle:
    "Yala Mobile Camping | Premium Safari & Wildlife Camping Experience in Sri Lanka",
  defaultDescription:
    "Experience luxury mobile camping in Yala National Park, Sri Lanka. Witness leopards, elephants & exotic wildlife. Book your adventure today!",
  keywords:
    "Yala National Park, mobile camping Sri Lanka, safari camping, wildlife viewing, leopard spotting, eco-tourism, luxury camping",
  author: "Yala Mobile Camping",
  twitterHandle: "@yalamobilecamping",
  // Fixed: Use a direct path or import.meta.env for Vite, or handle process.env properly
  ogImage: "/images/yala-camping-hero.webp", // Simple path without process.env
};

// Alternative with proper environment variable handling
const SEO_CONFIG_WITH_ENV_CHECK = {
  siteName: "Yala Mobile Camping",
  siteUrl: "https://yalamobilecamping.com",
  defaultTitle:
    "Yala Mobile Camping | Premium Safari & Wildlife Camping Experience in Sri Lanka",
  defaultDescription:
    "Experience luxury mobile camping in Yala National Park, Sri Lanka. Witness leopards, elephants & exotic wildlife. Book your adventure today!",
  keywords:
    "Yala National Park, mobile camping Sri Lanka, safari camping, wildlife viewing, leopard spotting, eco-tourism, luxury camping",
  author: "Yala Mobile Camping",
  twitterHandle: "@yalamobilecamping",
  // Safe way to handle environment variables
  ogImage:
    typeof process !== "undefined" && process.env?.PUBLIC_URL
      ? `${process.env.PUBLIC_URL}/images/yala-camping-hero.webp`
      : "/images/yala-camping-hero.webp",
};

// For Vite users (if using Vite instead of Create React App)
const SEO_CONFIG_VITE = {
  siteName: "Yala Mobile Camping",
  siteUrl: "https://yalamobilecamping.com",
  defaultTitle:
    "Yala Mobile Camping | Premium Safari & Wildlife Camping Experience in Sri Lanka",
  defaultDescription:
    "Experience luxury mobile camping in Yala National Park, Sri Lanka. Witness leopards, elephants & exotic wildlife. Book your adventure today!",
  keywords:
    "Yala National Park, mobile camping Sri Lanka, safari camping, wildlife viewing, leopard spotting, eco-tourism, luxury camping",
  author: "Yala Mobile Camping",
  twitterHandle: "@yalamobilecamping",
  ogImage: import.meta.env?.VITE_PUBLIC_URL
    ? `${import.meta.env.VITE_PUBLIC_URL}/images/yala-camping-hero.webp`
    : "/images/yala-camping-hero.webp",
};

// Use the fixed config
const FINAL_SEO_CONFIG = SEO_CONFIG;

// Schema.org structured data for tourism business
const generateStructuredData = (activeTab, selectedLocation) => {
  const baseStructure = {
    "@context": "https://schema.org",
    "@type": "TouristAttraction",
    name: FINAL_SEO_CONFIG.siteName,
    description: FINAL_SEO_CONFIG.defaultDescription,
    url: FINAL_SEO_CONFIG.siteUrl,
    telephone: "+94771234567",
    email: "info@camplanka.com",
    address: {
      "@type": "PostalAddress",
      addressCountry: "LK",
      addressRegion: "Southern Province",
      addressLocality: "Yala National Park",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "6.3725",
      longitude: "81.5185",
    },
    priceRange: "$$$",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "156",
    },
    amenityFeature: [
      { "@type": "LocationFeatureSpecification", name: "Safari Tours" },
      { "@type": "LocationFeatureSpecification", name: "Wildlife Viewing" },
      { "@type": "LocationFeatureSpecification", name: "Eco-Friendly Camping" },
      { "@type": "LocationFeatureSpecification", name: "Professional Guides" },
    ],
  };

  if (selectedLocation) {
    return {
      ...baseStructure,
      "@type": "LodgingBusiness",
      name: selectedLocation.name,
      priceRange: `$${selectedLocation.price_per_night}`,
      maximumAttendeeCapacity: selectedLocation.max_guests,
    };
  }

  return baseStructure;
};

// Main App component
const App = () => {
  const [activeTab, setActiveTab] = useState("safaris");
  const [pageLoading, setPageLoading] = useState(true);

  // SEO metadata based on active tab
  const tabMetadata = useMemo(() => {
    const metadata = {
      safaris: {
        title:
          "Safari Adventures | Yala Mobile Camping - Wildlife Tours Sri Lanka",
        description:
          "Join expert-guided safari tours in Yala National Park. Spot leopards, elephants, and 200+ bird species. Best safari experience in Sri Lanka.",
        keywords:
          "Yala safari tours, Sri Lankan wildlife, leopard spotting, elephant watching, bird watching tours",
      },
      camping: {
        title:
          "Luxury Mobile Camping | Yala National Park Accommodation Sri Lanka",
        description:
          "Experience premium mobile camping at Yala National Park. Comfortable tents, gourmet meals, and unforgettable wildlife encounters.",
        keywords:
          "mobile camping Sri Lanka, glamping Yala, eco-friendly accommodation, luxury tents",
      },
      about: {
        title: "About Us | Yala Mobile Camping - Sustainable Wildlife Tourism",
        description:
          "Learn about our commitment to sustainable tourism and wildlife conservation. Expert guides, eco-friendly practices, authentic experiences.",
        keywords:
          "sustainable tourism, wildlife conservation, eco-tourism Sri Lanka, responsible travel",
      },
    };
    return metadata[activeTab] || metadata.safaris;
  }, [activeTab]);

  // Memoized locations data to prevent unnecessary re-renders
  const locations01 = useMemo(
    () => [
      {
        id: 2,
        name: "Yala Mobile Camp",
        location: "Yala National Park",
        coordinates: [6.3725, 81.5185],
        price_per_night: 950,
        rating: 4.9,
        max_guests: 10,
        difficulty: "Easy",
        elevation: "30m",
        best_season: "February - July",
        image_url: camp3,
        gallery: [camp3],
        description:
          "Safari camping experience in Sri Lanka's most famous national park with chances to spot leopards and elephants.",
        detailed_description:
          "Yala Wilderness Camp provides an authentic safari camping experience in Sri Lanka's premier wildlife destination. Located at the edge of Yala National Park, our camp offers the unique opportunity to sleep under the stars while being surrounded by the sounds of the wild.",
        amenities: [
          "Safari Tours",
          "Wildlife Viewing",
          "Guided Tours",
          "Photography",
        ],
        activities: [
          {
            name: "Morning Safari Drive",
            duration: "4 hours",
            difficulty: "Easy",
          },
          {
            name: "Evening Safari Drive",
            duration: "4 hours",
            difficulty: "Easy",
          },
          { name: "Bird Watching", duration: "2 hours", difficulty: "Easy" },
          {
            name: "Night Wildlife Sounds Experience",
            duration: "1 hour",
            difficulty: "Easy",
          },
        ],
        included: [
          "Safari tent",
          "All meals",
          "Safari vehicle",
          "Park entrance fees",
          "Professional guide",
        ],
        weather: {
          temp: "25-35°C",
          humidity: "60-75%",
          rainfall: "Very Low (Feb-Jul)",
        },
      },
    ],
    []
  );

  const locations = useMemo(
  () => [
    {
      id: 2,
      name: "Yala Mobile Camp",
      location: "Yala National Park",
      coordinates: [6.3725, 81.5185],
      price_per_night: 950 ,
      rating: 4.9,
      max_guests: 10,
      difficulty: "Easy",
      elevation: "30m",
      best_season: "February - July",
      image_url: camp3,
      gallery: [camp3],
      description:
        "An exclusive camping experience inside the heart of Yala jungle. For $950 (per 2 persons), enjoy full-board meals, a full-day guided safari, and one night in our comfortable safari tents — surrounded by the raw sights and sounds of the wild.",
      detailed_description:
        "Yala Wilderness Camp offers a truly unique opportunity to stay inside the untouched wilderness of Sri Lanka's most iconic national park. Nestled deep within Yala’s jungle, our camp blends comfort with raw adventure — where leopards roam, elephants wander nearby, and the calls of nocturnal creatures become your night’s soundtrack. This $950 package for two includes full-board meals, a full-day guided safari, park entrance fees, and one night’s stay in a fully equipped safari tent, ensuring an unforgettable immersion in nature.",
      amenities: [
        "Safari Tours",
        "Wildlife Viewing",
        "Guided Tours",
        "Photography",
      ],
      activities: [
        {
          name: "Morning Safari Drive",
          duration: "4 hours",
          difficulty: "Easy",
        },
        {
          name: "Evening Safari Drive",
          duration: "4 hours",
          difficulty: "Easy",
        },
        { name: "Bird Watching", duration: "2 hours", difficulty: "Easy" },
        {
          name: "Night Wildlife Sounds Experience",
          duration: "1 hour",
          difficulty: "Easy",
        },
      ],
      included: [
        "Safari tent",
        "All meals",
        "Safari vehicle",
        "Park entrance fees",
        "Professional guide",
      ],
      weather: {
        temp: "25-35°C",
        humidity: "60-75%",
        rainfall: "Very Low (Feb-Jul)",
      },
    },
  ],
  []
);



  // Use custom hook for booking handlers
  const {
    selectedLocation,
    showBookingForm,
    showLocationDetail,
    handleBookNow,
    handleWhatsAppContact,
    handleLocationSelect,
    handleBackToLocations,
    handleBookingComplete,
  } = useBookingHandlers(locations);

  // Performance optimization - simulate page loading
  useEffect(() => {
    const timer = setTimeout(() => setPageLoading(false), 100);
    return () => clearTimeout(timer);
  }, []);

  // Function to render content based on active tab
  const renderTabContent = () => {
    switch (activeTab) {
      case "safaris":
        return (
          <>
            <TabSections activeTab={activeTab} />
            <ImageGallery activeTab={activeTab} />
            <SafariActivitiesSection
              onInquireNow={() => handleBookNow(locations[0])}
            />
            <TripAdvisorSection />
          </>
        );
      case "camping":
        return (
          <>
            <TabSections activeTab={activeTab} />
            <ImageGallery activeTab={activeTab} />
            <CampingSection onInquireNow={() => handleBookNow(locations[0])} />
            <TripAdvisorSection />
          </>
        );
      case "about":
        return (
          <>
            <AboutUsSection />
            <TripAdvisorSection />
          </>
        );
      default:
        return (
          <>
            <TabSections activeTab={activeTab} />
            <ImageGallery activeTab={activeTab} />
            <SafariActivitiesSection
              onInquireNow={() => handleBookNow(locations[0])}
            />
            <TripAdvisorSection />
          </>
        );
    }
  };

  // Loading state for better UX
  if (pageLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-amber-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-emerald-600 mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-gray-700">
            Loading your adventure...
          </h2>
        </div>
      </div>
    );
  }

  // SEO Meta component - Updated to use FINAL_SEO_CONFIG
  const SEOHead = ({
    title,
    description,
    keywords,
    canonical,
    ogType = "website",
  }) => (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={FINAL_SEO_CONFIG.author} />
      <meta name="robots" content="index, follow" />
      <meta name="language" content="English" />
      <meta name="revisit-after" content="7 days" />

      {/* Canonical URL */}
      <link rel="canonical" href={canonical || FINAL_SEO_CONFIG.siteUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonical || FINAL_SEO_CONFIG.siteUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      {FINAL_SEO_CONFIG.ogImage && (
        <meta property="og:image" content={FINAL_SEO_CONFIG.ogImage} />
      )}
      <meta property="og:site_name" content={FINAL_SEO_CONFIG.siteName} />
      <meta property="og:locale" content="en_US" />

      {/* Twitter - Only render if values exist */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta
        property="twitter:url"
        content={canonical || FINAL_SEO_CONFIG.siteUrl}
      />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      {FINAL_SEO_CONFIG.ogImage && (
        <meta property="twitter:image" content={FINAL_SEO_CONFIG.ogImage} />
      )}
      {FINAL_SEO_CONFIG.twitterHandle && (
        <meta
          property="twitter:creator"
          content={FINAL_SEO_CONFIG.twitterHandle}
        />
      )}

      {/* Additional SEO Tags */}
      <meta name="theme-color" content="#059669" />
      <meta name="msapplication-TileColor" content="#059669" />

      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(generateStructuredData(activeTab, selectedLocation))}
      </script>
    </Helmet>
  );

  // Location Detail Page
  if (showLocationDetail && selectedLocation) {
    return (
      <HelmetProvider>
        <SEOHead
          title={`${selectedLocation.name} | Premium Safari Camping in ${selectedLocation.location}`}
          description={`Book ${selectedLocation.name} for $${selectedLocation.price_per_night}/night. ${selectedLocation.description} Rating: ${selectedLocation.rating}/5`}
          keywords={`${selectedLocation.name}, ${selectedLocation.location}, safari camping, wildlife tours`}
          canonical={`${FINAL_SEO_CONFIG.siteUrl}/location/${selectedLocation.id}`}
          ogType="article"
        />
        <div className="min-h-screen bg-gray-50">
          <Header />
          <LocationDetail
            location={selectedLocation}
            onBackToLocations={handleBackToLocations}
            onBookNow={handleBookNow}
          />
          <Footer />
          <FloatingActionButtons
            onBookNow={() => handleBookNow()}
            onWhatsAppContact={handleWhatsAppContact}
          />
        </div>
      </HelmetProvider>
    );
  }

  // Booking Form Page
  if (showBookingForm && selectedLocation) {
    return (
      <HelmetProvider>
        <SEOHead
          title={`Book ${selectedLocation.name} | Yala Mobile Camping Reservation`}
          description={`Complete your booking for ${selectedLocation.name}. Secure your safari camping experience in Yala National Park today.`}
          keywords="book safari camping, Yala reservation, wildlife tour booking"
          canonical={`${FINAL_SEO_CONFIG.siteUrl}/book/${selectedLocation.id}`}
        />
        <div className="min-h-screen bg-gray-50">
          <div className="pt-20 pb-8">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <button
                onClick={handleBackToLocations}
                className="mb-6 flex items-center text-emerald-600 hover:text-emerald-700 font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 rounded-md p-2"
                aria-label="Back to locations"
              >
                <ChevronRight className="h-4 w-4 mr-1 rotate-180" />
                Back to Locations
              </button>
              <BookingManager
                selectedLocation={selectedLocation}
                onBookingComplete={handleBookingComplete}
              />
            </div>
          </div>
          <FloatingActionButtons
            onBookNow={() => handleBookNow()}
            onWhatsAppContact={handleWhatsAppContact}
          />
        </div>
      </HelmetProvider>
    );
  }

  // Main page layout
  return (
    <HelmetProvider>
      <SEOHead
        title={tabMetadata.title}
        description={tabMetadata.description}
        keywords={tabMetadata.keywords}
        canonical={`${FINAL_SEO_CONFIG.siteUrl}#${activeTab}`}
      />

      <div className="min-h-screen bg-white">
        {/* Skip to main content for accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-emerald-600 text-white px-4 py-2 rounded-md z-50"
        >
          Skip to main content
        </a>

        {/* Floating Action Buttons */}
        <FloatingActionButtons
          onBookNow={() => handleBookNow()}
          onWhatsAppContact={handleWhatsAppContact}
        />

        {/* Header includes navigation, hero, and tabs */}
        <Header
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          onInquireNow={() => handleBookNow(locations[0])}
        />

        {/* Main Content with proper semantic HTML */}
        <main id="main-content" role="main">
          {/* Tab Content - Changes based on activeTab */}
          <section
            id="tab-content"
            aria-live="polite"
            aria-label={`${activeTab} content`}
          >
            {renderTabContent()}
          </section>

          {/* Featured Locations - Always visible */}
          <section
            id="locations"
            className="py-20 bg-gray-50"
            aria-label="Featured camping locations"
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <YalaWildlifeMap />
            </div>
          </section>

          {/* Services Section */}
          <ServicesSection services={SERVICES_DATA} />

          {/* Why Choose Us Section */}
          <WhyChooseUsSection />

          {/* Call to Action Section */}
          <CallToActionSection
            onBookNow={() => handleBookNow()}
            onWhatsAppContact={handleWhatsAppContact}
          />
        </main>

        <Footer />
      </div>
    </HelmetProvider>
  );
};

export default App;
