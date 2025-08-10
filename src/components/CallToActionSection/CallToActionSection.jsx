// src/components/CallToActionSection/CallToActionSection.jsx
import React from "react";
import { Calendar, MessageCircle, Phone } from "lucide-react";
import { COMPANY_PHONE } from "../../constants";
import { Helmet } from "react-helmet";

const CallToActionSection = ({ onBookNow, onWhatsAppContact }) => {
  return (
    <section className="py-20 bg-gradient-to-r from-emerald-600 to-blue-600 text-white relative overflow-hidden">
      <Helmet>
        <title>Call to Action | Yala Mobile Camping and Safari</title>
        <meta
          name="description"
          content="Ready for your Yala adventure? Book your mobile camping and safari experience in Yala National Park, Sri Lanka today!"
        />
        <meta
          name="keywords"
          content="book yala mobile camping, yala safari booking, sri lanka camping reservation, yala national park call to action"
        />
        <meta
          property="og:title"
          content="Call to Action | Yala Mobile Camping and Safari"
        />
        <meta
          property="og:description"
          content="Book your Yala Mobile Camping and Safari experience in Yala National Park, Sri Lanka now!"
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:image"
          content="https://yalamobilecamping.com/og-cta.webp"
        />
        <link rel="canonical" href="https://yalamobilecamping.com/book-now" />
      </Helmet>

      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full"></div>
        <div className="absolute bottom-10 right-10 w-24 h-24 bg-white rounded-full"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-white rounded-full"></div>
      </div>

      <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8 relative z-10">
        <h2 className="text-4xl md:text-5xl font-bold mb-6">
          Ready for Your Adventure?
        </h2>
        <p className="text-xl mb-8 text-emerald-100">
          Book your Sri Lankan camping experience today and create memories that
          will last a lifetime
        </p>

        {/* Booking Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
          <button
            onClick={onBookNow}
            className="bg-white text-emerald-600 hover:bg-gray-100 px-8 py-4 rounded-full text-lg font-semibold transition-all transform hover:scale-105 flex items-center shadow-lg"
          >
            <Calendar className="h-5 w-5 mr-2" />
            Book Now
          </button>

          <button
            onClick={onWhatsAppContact}
            className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all transform hover:scale-105 flex items-center shadow-lg"
          >
            <MessageCircle className="h-5 w-5 mr-2" />
            WhatsApp Us
          </button>
        </div>

        {/* Contact Information */}
        <div className="pt-8 border-t border-emerald-400/30">
          <div className="flex flex-col sm:flex-row justify-center items-center gap-6 text-emerald-100">
            <div className="flex items-center hover:text-white transition-colors">
              <MessageCircle className="h-5 w-5 mr-2" />
              <span>WhatsApp: {COMPANY_PHONE}</span>
            </div>
            <div className="flex items-center hover:text-white transition-colors">
              <Phone className="h-5 w-5 mr-2" />
              <span>Call: {COMPANY_PHONE}</span>
            </div>
            <div className="flex items-center hover:text-white transition-colors">
              <Calendar className="h-5 w-5 mr-2" />
              <span>Available 24/7 for bookings</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToActionSection;
