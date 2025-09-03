import React from "react";
import { Link } from "react-router-dom";
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
    <div style={{ position: "relative" }}>
      <div style={{ position: "absolute", top: "1rem", left: "1rem", zIndex: 10 }}>
        <Link to="/" style={{ textDecoration: "none", color: "#333" }}>
          &larr; Back to Home
        </Link>
      </div>
      <SEO
        title={aboutSEO.title}
        description={aboutSEO.description}
        keywords={aboutSEO.keywords}
        canonical="https://yalamobilecamping.com/about"
      />
      <AboutUsSection />
    </div>
  );
};

export default AboutPage;