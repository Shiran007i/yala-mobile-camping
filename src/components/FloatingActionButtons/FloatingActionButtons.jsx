// src/components/FloatingActionButtons/FloatingActionButtons.jsx
import React from "react";
import { MessageCircle, Calendar } from "lucide-react";
import { Helmet } from "react-helmet";

const FloatingActionButtons = ({ onBookNow, onWhatsAppContact }) => {
  return (
    <>
      <Helmet>
        <title>Quick Actions | Yala Mobile Camping and Safari</title>
        <meta
          name="description"
          content="Use our floating action buttons for quick access to booking, contact, and navigation on Yala Mobile Camping and Safari."
        />
        <meta
          name="keywords"
          content="yala mobile camping quick actions, floating action buttons, yala safari navigation, sri lanka camping shortcuts"
        />
        <meta
          property="og:title"
          content="Quick Actions | Yala Mobile Camping and Safari"
        />
        <meta
          property="og:description"
          content="Access quick actions for booking and contact on Yala Mobile Camping and Safari."
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:image"
          content="https://yalamobilecamping.com/og-fab.webp"
        />
        <link
          rel="canonical"
          href="https://yalamobilecamping.com/quick-actions"
        />
      </Helmet>

      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
        {/* WhatsApp Floating Button */}
        <button
          onClick={onWhatsAppContact}
          className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 group"
          title="Contact us on WhatsApp"
          aria-label="Contact via WhatsApp"
        >
          <MessageCircle className="h-6 w-6" />
          <span className="absolute right-full mr-3 top-1/2 transform -translate-y-1/2 bg-gray-900 text-white px-3 py-1 rounded-lg text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
            WhatsApp Chat
          </span>
        </button>

        {/* Book Now Floating Button */}
        <button
          onClick={onBookNow}
          className="bg-emerald-600 hover:bg-emerald-700 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 group"
          title="Book your adventure now"
          aria-label="Book now"
        >
          <Calendar className="h-6 w-6" />
          <span className="absolute right-full mr-3 top-1/2 transform -translate-y-1/2 bg-gray-900 text-white px-3 py-1 rounded-lg text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
            Book Now
          </span>
        </button>
      </div>
    </>
  );
};

export default FloatingActionButtons;
