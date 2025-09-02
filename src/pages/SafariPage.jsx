// src/pages/SafariPage.jsx
import React from "react";
import {
  ImageGallery,
  SafariActivitiesSection,
} from "../components";
import SEO from "../components/SEO.jsx";
import { useBookingUI } from "../contexts/BookingUIContext";

const SafariPage = () => {
  const { locations, handleBookNow } = useBookingUI();

  const safariSEO = {
    title: "Safari Adventures | Yala Mobile Camping - Wildlife Tours Sri Lanka",
    description:
      "Join expert-guided safari tours in Yala National Park. Spot leopards, elephants, and 200+ bird species. Best safari experience in Sri Lanka.",
    keywords:
      "Yala safari tours, Sri Lankan wildlife, leopard spotting, elephant watching, bird watching tours",
  };

  return (
    <>
      <SEO
        title={safariSEO.title}
        description={safariSEO.description}
        keywords={safariSEO.keywords}
        canonical="https://yalamobilecamping.com/safaris"
      />
      <ImageGallery activeTab="safaris" />
      <SafariActivitiesSection onInquireNow={() => handleBookNow(locations[0])} />
    </>
  );
};

export default SafariPage;
