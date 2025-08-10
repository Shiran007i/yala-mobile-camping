import React from "react";
import { Helmet } from "react-helmet";

const TripAdvisorSection = () => {
  return (
    <>
      <Helmet>
        <title>TripAdvisor Reviews | Yala Mobile Camping and Safari</title>
        <meta
          name="description"
          content="See what guests say about Yala Mobile Camping and Safari on TripAdvisor. Read reviews and testimonials for our Yala National Park camping and safari experiences."
        />
        <meta
          name="keywords"
          content="yala mobile camping reviews, tripadvisor yala safari, sri lanka camping testimonials, yala national park reviews"
        />
        <meta
          property="og:title"
          content="TripAdvisor Reviews | Yala Mobile Camping and Safari"
        />
        <meta
          property="og:description"
          content="Read TripAdvisor reviews for Yala Mobile Camping and Safari in Yala National Park, Sri Lanka."
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:image"
          content="https://yalamobilecamping.com/og-tripadvisor.webp"
        />
        <link
          rel="canonical"
          href="https://yalamobilecamping.com/tripadvisor"
        />
      </Helmet>
      <section className="py-20 bg-gray-50">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center mb-8">
            <img
              src="https://static.tacdn.com/img2/brand_refresh/Tripadvisor_lockup_horizontal_secondary_registered.svg"
              alt="TripAdvisor"
              className="h-12 mx-auto"
            />
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            TripAdvisor Reviews
          </h2>
          <p className="text-lg text-gray-700 mb-8">
            This feature is{" "}
            <span className="font-semibold text-green-600">coming soon</span>.
            <br />
            Soon you’ll be able to read real guest reviews and ratings for our
            Yala mobile camping and safari experiences!
          </p>
        </div>
      </section>
    </>
  );
};

export default TripAdvisorSection;
