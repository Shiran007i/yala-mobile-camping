// src/pages/TermsPage.jsx
import React from "react";
import { Terms } from "../components";
import SEO from "../components/SEO.jsx";

const TermsPage = () => {
  const termsSEO = {
    title: "Terms of Service | Yala Mobile Camping - Booking Terms",
    description:
      "Read our terms of service for safari bookings, camping experiences, and service conditions.",
    keywords: "terms of service, booking conditions, safari terms",
  };

  return (
    <>
      <SEO
        title={termsSEO.title}
        description={termsSEO.description}
        keywords={termsSEO.keywords}
        canonical="https://yalamobilecamping.com/terms"
      />
      <Terms />
    </>
  );
};

export default TermsPage;
