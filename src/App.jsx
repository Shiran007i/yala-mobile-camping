// src/App.jsx - SEO Optimized & Production Ready with Path-based Routing
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
  TripAdvisorSection,
  FloatingActionButtons,
  ServicesSection,
  WhyChooseUsSection,
  CallToActionSection,
  Unsubscribe,
  FAQ,
  Privacy,
  Terms,
} from "./components";

import BookingForm from "./components/Booking";
import BookingManager from "./components/Booking";

import { TransportationSection } from "./components/Transportation";
import BlogPost from "./components/Blog/BlogPost";

// Custom hooks
import { useBookingHandlers } from "./hooks";

// Constants
import { SERVICES_DATA } from "./constants";
import camp3 from "/src/assets/images/camp3.webp";



// SEO Constants
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
  ogImage: "/images/yala-camping-hero.webp",
};

// Enhanced page detection using pathname instead of hash
const getCurrentPage = () => {
  const path = window.location.pathname;
  const params = new URLSearchParams(window.location.search);
  
  // Direct path matching (primary method)
  if (path === "/unsubscribe") return "unsubscribe";
  if (path === "/transportation") return "transportation";
  if (path === "/faq") return "faq";
  if (path === "/privacy") return "privacy";
  if (path === "/terms") return "terms";
  
  // Fallback to query params for compatibility
  const page = params.get('page');
  if (page) return page;
  
  // Legacy hash support (will redirect to proper path)
  const hash = window.location.hash;
  if (hash === "#unsubscribe") return "unsubscribe";
  if (hash === "#transportation") return "transportation";
  if (hash === "#faq") return "faq";
  if (hash === "#privacy") return "privacy";
  if (hash === "#terms") return "terms";
  
  return "main";
};

// Helper function to update URL properly
const updateURL = (page) => {
  const newPath = page === "main" ? "/" : `/${page}`;
  
  // Update URL without reload
  if (window.location.pathname !== newPath) {
    window.history.pushState({ page }, '', newPath);
  }
  
  // Clear any hash fragments for clean URLs
  if (window.location.hash) {
    window.history.replaceState({ page }, '', newPath);
  }
};

// FIXED: Proper Schema.org structured data with correct itemReviewed
const generateStructuredData = (activeTab, selectedLocation, currentView) => {
  // Base business/organization schema
  const baseOrganization = {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    "@id": `${SEO_CONFIG.siteUrl}#organization`,
    name: SEO_CONFIG.siteName,
    alternateName: "Yala Mobile Camp",
    description: SEO_CONFIG.defaultDescription,
    url: SEO_CONFIG.siteUrl,
    telephone: "+94713585926",
    email: "info@yalamobilecamping.com",
    logo: {
      "@type": "ImageObject",
      url: `${SEO_CONFIG.siteUrl}/images/logo.webp`,
      width: 300,
      height: 100,
    },
    image: {
      "@type": "ImageObject",
      url: `${SEO_CONFIG.siteUrl}/images/yala-camping-hero.webp`,
      width: 1200,
      height: 630,
    },
    address: {
      "@type": "PostalAddress",
      addressCountry: "LK",
      addressRegion: "Southern Province",
      addressLocality: "Tissamaharama",
      streetAddress: "Near Yala National Park Entrance",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 6.3725,
      longitude: 81.5185,
    },
    priceRange: "$$$",
    paymentAccepted: "Cash, Bank Transfer",
    currenciesAccepted: "USD, LKR",
    areaServed: {
      "@type": "Country",
      name: "Sri Lanka",
    },
  };

  // Page-specific schemas
  if (currentView === "faq") {
    return {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "What's included in the mobile camping package?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Our packages include comfortable safari tents, all meals, professional safari guide, park entrance fees, safari vehicle, and camping equipment."
          }
        },
        {
          "@type": "Question", 
          name: "What's the best time to visit Yala National Park?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "February to July offers the best wildlife viewing with 85% leopard sighting success rate."
          }
        }
      ]
    };
  }

  // Tourism attraction schema for main pages
  const touristAttraction = {
    "@context": "https://schema.org",
    "@type": "TouristAttraction",
    "@id": `${SEO_CONFIG.siteUrl}#attraction`,
    name: "Yala National Park Mobile Camping Experience",
    description:
      "Premium mobile camping experience in Sri Lanka's most famous national park with wildlife viewing and safari tours",
    url: SEO_CONFIG.siteUrl,
    image: {
      "@type": "ImageObject",
      url: `${SEO_CONFIG.siteUrl}/images/yala-camping-hero.webp`,
      width: 1200,
      height: 630,
    },
    address: {
      "@type": "PostalAddress",
      addressCountry: "LK",
      addressRegion: "Southern Province",
      addressLocality: "Yala National Park",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 6.3725,
      longitude: 81.5185,
    },
    touristType: ["EcoTourist", "WildlifeEnthusiast", "AdventureTourist"],
    availableLanguage: ["English", "Sinhala"],
  };

  // FIXED: Proper Review/Rating structure with correct itemReviewed
  const reviewSchema = {
    "@context": "https://schema.org",
    "@type": "Review",
    "@id": `${SEO_CONFIG.siteUrl}#review-aggregate`,
    reviewRating: {
      "@type": "Rating",
      ratingValue: 4.9,
      bestRating: 5,
      worstRating: 1,
    },
    author: {
      "@type": "Organization",
      name: "TripAdvisor and Google Reviews",
    },
    reviewBody:
      "Exceptional mobile camping experience in Yala National Park with excellent wildlife viewing opportunities and professional service.",
    itemReviewed: {
      "@type": "TravelAgency",
      "@id": `${SEO_CONFIG.siteUrl}#organization`,
      name: SEO_CONFIG.siteName,
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: 4.9,
        reviewCount: 156,
        bestRating: 5,
        worstRating: 1,
      },
    },
  };

  // Service schema with proper Product structure
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${SEO_CONFIG.siteUrl}#service`,
    name: "Mobile Safari Camping Experience",
    description:
      "Premium mobile camping with guided safari tours in Yala National Park",
    provider: {
      "@type": "TravelAgency",
      "@id": `${SEO_CONFIG.siteUrl}#organization`,
    },
    areaServed: {
      "@type": "Place",
      name: "Yala National Park, Sri Lanka",
    },
  };

  // Location-specific structured data
  if (selectedLocation) {
    return {
      "@context": "https://schema.org",
      "@graph": [
        baseOrganization,
        {
          "@type": "LodgingBusiness",
          "@id": `${SEO_CONFIG.siteUrl}/location/${selectedLocation.id}`,
          name: selectedLocation.name,
          description: selectedLocation.description,
          url: `${SEO_CONFIG.siteUrl}/location/${selectedLocation.id}`,
          image: {
            "@type": "ImageObject",
            url: selectedLocation.image_url,
            width: 800,
            height: 600,
          },
          address: {
            "@type": "PostalAddress",
            addressCountry: "LK",
            addressRegion: "Southern Province",
            addressLocality: selectedLocation.location,
          },
          geo: {
            "@type": "GeoCoordinates",
            latitude: selectedLocation.coordinates[0],
            longitude: selectedLocation.coordinates[1],
          },
          priceRange: `$${selectedLocation.price_per_night}`,
          maximumAttendeeCapacity: selectedLocation.max_guests,
          starRating: {
            "@type": "Rating",
            ratingValue: selectedLocation.rating,
          },
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: selectedLocation.rating,
            reviewCount: 45,
            bestRating: 5,
            worstRating: 1,
          },
        },
      ],
    };
  }

  // Default schema graph for main pages
  return {
    "@context": "https://schema.org",
    "@graph": [
      baseOrganization,
      touristAttraction,
      reviewSchema,
      serviceSchema,
    ],
  };
};

// Main App component
const App = () => {
  const [activeTab, setActiveTab] = useState("camping");
  const [pageLoading, setPageLoading] = useState(true);
  const [currentView, setCurrentView] = useState("main");

  // Enhanced check for current page on mount and URL changes
  // In your App component:

  
  useEffect(() => {
    const checkCurrentPage = () => {
      const currentPage = getCurrentPage();
      console.log("📍 Current page detected:", currentPage);
      
      // Handle legacy hash URLs by redirecting to proper paths
      if (window.location.hash) {
        const hashPage = window.location.hash.substring(1);
        if (['unsubscribe', 'transportation', 'faq', 'privacy', 'terms'].includes(hashPage)) {
          updateURL(hashPage);
          setCurrentView(hashPage);
          return;
        }
      }
      
      setCurrentView(currentPage);
    };

    checkCurrentPage();

    // Listen for URL changes (back/forward)
    const handlePopState = (event) => {
      const currentPage = getCurrentPage();
      console.log("🔄 URL changed via back/forward:", currentPage);
      setCurrentView(currentPage);
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  useEffect(() => {
  // Scroll to top when currentView changes (for page navigation)
  window.scrollTo(0, 0);
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
}, [currentView]);

  // SEO metadata based on current view and active tab
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
      transportation: {
        title:
          "Transportation Services | Yala Mobile Camping - Airport & Safari Transfers",
        description:
          "Reliable transportation services for Yala National Park including airport transfers, city transfers, and safari vehicle rentals with professional drivers.",
        keywords:
          "yala transportation, airport transfer, safari transport, sri lanka transport, yala transfer service",
      },
      unsubscribe: {
        title: "Unsubscribe | Yala Mobile Camping Newsletter",
        description:
          "Unsubscribe from Yala Mobile Camping newsletter. We're sorry to see you go!",
        keywords: "unsubscribe newsletter, Yala Mobile Camping email",
      },
      faq: {
        title: "FAQ | Yala Mobile Camping - Frequently Asked Questions",
        description:
          "Get answers to frequently asked questions about Yala Mobile Camping, safari tours, booking process, and camping experiences.",
        keywords:
          "yala camping faq, safari questions, mobile camping guide, booking help",
      },
      privacy: {
        title: "Privacy Policy | Yala Mobile Camping - Data Protection",
        description:
          "Learn how Yala Mobile Camping protects your privacy and handles your personal information.",
        keywords: "privacy policy, data protection, personal information",
      },
      terms: {
        title: "Terms of Service | Yala Mobile Camping - Booking Terms",
        description:
          "Read our terms of service for safari bookings, camping experiences, and service conditions.",
        keywords: "terms of service, booking conditions, safari terms",
      },
    };
    return metadata[currentView] || metadata[activeTab] || metadata.safaris;
  }, [activeTab, currentView]);

  // Memoized locations data to prevent unnecessary re-renders
  const locations = useMemo(
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
          "An exclusive camping experience inside the heart of Yala jungle. For $950 (per 2 persons), enjoy full-board meals, a full-day guided safari, and one night in our comfortable safari tents — surrounded by the raw sights and sounds of the wild.",
        detailed_description:
          "Yala Wilderness Camp offers a truly unique opportunity to stay inside the untouched wilderness of Sri Lanka's most iconic national park. Nestled deep within Yala's jungle, our camp blends comfort with raw adventure — where leopards roam, elephants wander nearby, and the calls of nocturnal creatures become your night's soundtrack. This $950 package for two includes full-board meals, a full-day guided safari, park entrance fees, and one night's stay in a fully equipped safari tent, ensuring an unforgettable immersion in nature.",
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

  // Also update your handleNavigation function to ensure immediate scroll:
const handleNavigation = (page) => {
  // Immediate scroll to top
  window.scrollTo(0, 0);
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
  
  updateURL(page);
  setCurrentView(page);
};

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
          </>
        );
      case "camping":
        return (
          <>
            <TabSections activeTab={activeTab} />
            <ImageGallery activeTab={activeTab} />
            <CampingSection onInquireNow={() => handleBookNow(locations[0])} />
          </>
        );
      case "about":
        return (
          <>
            <AboutUsSection />
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

  // SEO Meta component
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
      <meta name="author" content={SEO_CONFIG.author} />
      <meta
        name="robots"
        content={
          currentView === "unsubscribe" ? "noindex, nofollow" : "index, follow"
        }
      />
      <meta name="language" content="English" />
      <meta name="revisit-after" content="7 days" />

      {/* Canonical URL */}
      <link rel="canonical" href={canonical || SEO_CONFIG.siteUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonical || SEO_CONFIG.siteUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta
        property="og:image"
        content={`${SEO_CONFIG.siteUrl}${SEO_CONFIG.ogImage}`}
      />
      <meta property="og:site_name" content={SEO_CONFIG.siteName} />
      <meta property="og:locale" content="en_US" />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={canonical || SEO_CONFIG.siteUrl} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta
        property="twitter:image"
        content={`${SEO_CONFIG.siteUrl}${SEO_CONFIG.ogImage}`}
      />
      {SEO_CONFIG.twitterHandle && (
        <meta property="twitter:creator" content={SEO_CONFIG.twitterHandle} />
      )}

      {/* Additional SEO Tags */}
      <meta name="theme-color" content="#059669" />
      <meta name="msapplication-TileColor" content="#059669" />

      {/* JSON-LD structured data - exclude from unsubscribe page */}
      {currentView !== "unsubscribe" && (
        <script type="application/ld+json">
          {JSON.stringify(generateStructuredData(activeTab, selectedLocation, currentView))}
        </script>
      )}
    </Helmet>
  );

  // Back to main handler with proper URL update
 // Update your handleBackToMain function:
const handleBackToMain = () => {
  // Immediate scroll to top
  window.scrollTo(0, 0);
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
  
  updateURL("main");
  setCurrentView("main");
};

  // Transportation Page
  if (currentView === "transportation") {
    console.log("🚗 Rendering transportation page");
    return (
      <HelmetProvider>
        <SEOHead
          title={tabMetadata.title}
          description={tabMetadata.description}
          keywords={tabMetadata.keywords}
          canonical={`${SEO_CONFIG.siteUrl}/transportation`}
        />
        <div className="min-h-screen bg-white">
          {/* Simple header for transportation page */}
          <header className="bg-white shadow-sm sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center py-4">
                <button
                  onClick={handleBackToMain}
                  className="flex items-center text-emerald-600 hover:text-emerald-700 font-medium transition-colors"
                >
                  <ChevronRight className="h-4 w-4 mr-1 rotate-180" />
                  Back to Main Site
                </button>
                <div></div> {/* Spacer for flex layout */}
              </div>
            </div>
          </header>

          <TransportationSection />

          <Footer onNavigate={handleNavigation} />

          <FloatingActionButtons
            onBookNow={() => handleBookNow()}
            onWhatsAppContact={handleWhatsAppContact}
          />
        </div>
      </HelmetProvider>
    );
  }
// In your App.jsx, add this case:
if (currentView === "blog") {
  return (
    <HelmetProvider>
      <SEOHead
        title="Mobile Camping Blog | Yala National Park Wildlife Adventures"
        description="Read about revolutionary mobile camping experiences in Yala National Park, wildlife encounters, and safari adventures in Sri Lanka."
        keywords="yala mobile camping blog, sri lanka safari blog, wildlife camping stories"
        canonical={`${SEO_CONFIG.siteUrl}/blog`}
      />
      <BlogPost onBackToMain={handleBackToMain} />
    </HelmetProvider>
  );
}
  // Unsubscribe Page
  if (currentView === "unsubscribe") {
    console.log("📧 Rendering unsubscribe page");
    return (
      <HelmetProvider>
        <SEOHead
          title={tabMetadata.title}
          description={tabMetadata.description}
          keywords={tabMetadata.keywords}
          canonical={`${SEO_CONFIG.siteUrl}/unsubscribe`}
        />
        <div className="min-h-screen">
          <Unsubscribe onBackToMain={handleBackToMain} />
        </div>
      </HelmetProvider>
    );
  }

  // Location Detail Page
  if (showLocationDetail && selectedLocation) {
    return (
      <HelmetProvider>
        <SEOHead
          title={`${selectedLocation.name} | Premium Safari Camping in ${selectedLocation.location}`}
          description={`Book ${selectedLocation.name} for ${selectedLocation.price_per_night}/night. ${selectedLocation.description} Rating: ${selectedLocation.rating}/5`}
          keywords={`${selectedLocation.name}, ${selectedLocation.location}, safari camping, wildlife tours`}
          canonical={`${SEO_CONFIG.siteUrl}/location/${selectedLocation.id}`}
          ogType="article"
        />
        <div className="min-h-screen bg-gray-50">
          <Header />
          <LocationDetail
            location={selectedLocation}
            onBackToLocations={handleBackToLocations}
            onBookNow={handleBookNow}
          />
          <Footer onNavigate={handleNavigation} />
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
          canonical={`${SEO_CONFIG.siteUrl}/book/${selectedLocation.id}`}
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

  // FAQ Page
  if (currentView === "faq") {
    return (
      <HelmetProvider>
        <SEOHead
          title={tabMetadata.title}
          description={tabMetadata.description}
          keywords={tabMetadata.keywords}
          canonical={`${SEO_CONFIG.siteUrl}/faq`}
        />
        <FAQ onBackToMain={handleBackToMain} />
      </HelmetProvider>
    );
  }

  // Privacy Page
  if (currentView === "privacy") {
    return (
      <HelmetProvider>
        <SEOHead
          title={tabMetadata.title}
          description={tabMetadata.description}
          keywords={tabMetadata.keywords}
          canonical={`${SEO_CONFIG.siteUrl}/privacy`}
        />
        <Privacy onBackToMain={handleBackToMain} />
      </HelmetProvider>
    );
  }

  // Terms Page
  if (currentView === "terms") {
    return (
      <HelmetProvider>
        <SEOHead
          title={tabMetadata.title}
          description={tabMetadata.description}
          keywords={tabMetadata.keywords}
          canonical={`${SEO_CONFIG.siteUrl}/terms`}
        />
        <Terms onBackToMain={handleBackToMain} />
      </HelmetProvider>
    );
  }

  // Main page layout
  console.log("🏠 Rendering main page layout");
  return (
    <HelmetProvider>
      <SEOHead
        title={tabMetadata.title}
        description={tabMetadata.description}
        keywords={tabMetadata.keywords}
        canonical={`${SEO_CONFIG.siteUrl}${activeTab !== 'camping' ? `#${activeTab}` : ''}`}
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
          onNavigate={handleNavigation}
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

          <TripAdvisorSection />

          {/* Call to Action Section */}
          <CallToActionSection
            onBookNow={() => handleBookNow()}
            onWhatsAppContact={handleWhatsAppContact}
          />
        </main>

        <Footer onNavigate={handleNavigation} />
      </div>
    </HelmetProvider>
  );
};

export default App;
