// src/pages/CampingPage.jsx
import React from "react";
import {
  ImageGallery,
  CampingSection,
} from "../components";
import SEO from "../components/SEO.jsx";
import { useBookingUI } from "../contexts/BookingUIContext";

const CampingPage = () => {
  const { locations, handleBookNow } = useBookingUI();

  const campingSEO = {
    title: "Luxury Mobile Camping | Yala National Park Accommodation Sri Lanka",
    description:
      "Experience premium mobile camping at Yala National Park. Comfortable tents, gourmet meals, and unforgettable wildlife encounters.",
    keywords:
      "mobile camping Sri Lanka, glamping Yala, eco-friendly accommodation, luxury tents",
  };

  return (
    <>
      <SEO
        title={campingSEO.title}
        description={campingSEO.description}
        keywords={campingSEO.keywords}
        canonical="https://yalamobilecamping.com/camping"
      />
      <ImageGallery activeTab="camping" />
      <CampingSection onInquireNow={() => handleBookNow(locations[0])} />
    </>
  );
};

export default CampingPage;
