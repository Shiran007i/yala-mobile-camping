// src/pages/AboutPage.jsx
import React from "react";
import { AboutUsSection } from "../components";
import SEO from "../components/SEO.jsx";

const AboutPage = () => {
  const aboutSEO = {
    title: "About Us | Yala Mobile Camping - Sustainable Wildlife Tourism",
    description:
      "Learn about our commitment to sustainable tourism and wildlife conservation. Expert guides, eco-friendly practices, authentic experiences.",
    keywords:
      "sustainable tourism, wildlife conservation, eco-tourism Sri Lanka, responsible travel",
  };

  return (
    <>
      <SEO
        title={aboutSEO.title}
        description={aboutSEO.description}
        keywords={aboutSEO.keywords}
        canonical="https://yalamobilecamping.com/about"
      />
      <AboutUsSection />
    </>
  );
};

export default AboutPage;