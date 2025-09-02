// src/components/SEO/index.jsx
import React from "react";
import { Helmet } from "react-helmet-async";

// Reusable SEO component
const SEO = ({ title, description, keywords, canonical, ogType = "website" }) => {
  const SEO_CONFIG = {
    siteName: "Yala Mobile Camping",
    siteUrl: "https://yalamobilecamping.com",
    author: "Yala Mobile Camping",
    twitterHandle: "@yalamobilecamping",
    ogImage: "/images/yala-camping-hero.webp",
  };

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={SEO_CONFIG.author} />
      <meta name="robots" content="index, follow" />
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
    </Helmet>
  );
};

export default SEO;
