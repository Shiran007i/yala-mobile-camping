// src/pages/PrivacyPage.jsx
import React from "react";
import { Privacy } from "../components";
import SEO from "../components/SEO.jsx";

const PrivacyPage = () => {
  const privacySEO = {
    title: "Privacy Policy | Yala Mobile Camping - Data Protection",
    description:
      "Learn how Yala Mobile Camping protects your privacy and handles your personal information.",
    keywords: "privacy policy, data protection, personal information",
  };

  return (
    <>
      <SEO
        title={privacySEO.title}
        description={privacySEO.description}
        keywords={privacySEO.keywords}
        canonical="https://yalamobilecamping.com/privacy"
      />
      <Privacy />
    </>
  );
};

export default PrivacyPage;