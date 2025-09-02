// src/pages/FAQPage.jsx
import React from "react";
import { FAQ } from "../components";
import SEO from "../components/SEO.jsx";

const FAQPage = () => {
  const faqSEO = {
    title: "FAQ | Yala Mobile Camping - Frequently Asked Questions",
    description:
      "Get answers to frequently asked questions about Yala Mobile Camping, safari tours, booking process, and camping experiences.",
    keywords:
      "yala camping faq, safari questions, mobile camping guide, booking help",
  };

  return (
    <>
      <SEO
        title={faqSEO.title}
        description={faqSEO.description}
        keywords={faqSEO.keywords}
        canonical="https://yalamobilecamping.com/faq"
      />
      <FAQ />
    </>
  );
};

export default FAQPage;