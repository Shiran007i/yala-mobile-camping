// src/pages/HomePage.jsx
import React, { useState } from "react";
import { TabSections, CampingSection, YalaWildlifeMap, ImageGallery, SafariActivitiesSection, TripAdvisorSection, ServicesSection, WhyChooseUsSection, CallToActionSection, TabNavigation } from "../components";
import SEO from "../components/SEO.jsx";
import { useBookingUI } from "../contexts/BookingUIContext";
import { SERVICES_DATA } from "../constants";

const HomePage = () => {
  const [activeTab, setActiveTab] = useState("camping");
  const { locations, handleBookNow, handleWhatsAppContact } = useBookingUI();

  const tabMetadata = {
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
    };

  const currentSEO = tabMetadata[activeTab] || tabMetadata.camping;

  const renderTabContent = () => {
    switch (activeTab) {
      case "safaris":
        return (
          <>
            <TabSections activeTab={activeTab} setActiveTab={setActiveTab} />
            <ImageGallery activeTab={activeTab} />
            <SafariActivitiesSection
              onInquireNow={() => handleBookNow(locations[0])}
            />
          </>
        );
      case "camping":
        return (
          <>
            <TabSections activeTab={activeTab} setActiveTab={setActiveTab} />
            <ImageGallery activeTab={activeTab} />
            <CampingSection onInquireNow={() => handleBookNow(locations[0])} />
          </>
        );
      default:
        return (
          <>
            <TabSections activeTab={activeTab} setActiveTab={setActiveTab} />
            <ImageGallery activeTab={activeTab} />
            <SafariActivitiesSection
              onInquireNow={() => handleBookNow(locations[0])}
            />
          </>
        );
    }
  };

  return (
    <>
      <SEO
        title={currentSEO.title}
        description={currentSEO.description}
        keywords={currentSEO.keywords}
      />
      <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
      <section
        id="tab-content"
        aria-live="polite"
        aria-label={`${activeTab} content`}
      >
        {renderTabContent()}
      </section>

      <section
        id="locations"
        className="py-20 bg-gray-50"
        aria-label="Featured camping locations"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <YalaWildlifeMap />
        </div>
      </section>

      <ServicesSection services={SERVICES_DATA} />
      <WhyChooseUsSection />
      <TripAdvisorSection />
      <CallToActionSection
        onBookNow={() => handleBookNow()}
        onWhatsAppContact={handleWhatsAppContact}
      />
    </>
  );
};

export default HomePage;
