// src/components/CallToActionSection/CallToActionSection.jsx
import React from "react";
import { Calendar, MessageCircle, Phone } from "lucide-react";
import { COMPANY_PHONE } from "../../constants";
import { Helmet } from "react-helmet";

import safariBg from "../../assets/images/safari/Yala_mibile_camping_safari31.webp";

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
      {/* <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full"></div>
        <div className="absolute bottom-10 right-10 w-24 h-24 bg-white rounded-full"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-white rounded-full"></div>
      </div> */}
      {/* Background Image */}
      {/* Background Image with Dark Overlay */}
      {/* Background Image with Gradient Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${safariBg})` }}
      >
        {/* Gradient overlay from bottom to top */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
      </div>

      <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8 relative z-10">
        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
          Ready for Your Adventure?
        </h2>
        <p className="text-xl mb-8 text-gray-200">
          Book your Sri Lankan camping experience today and create memories that
          will last a lifetime
        </p>

        {/* Booking Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-8">
          <button
            onClick={onBookNow}
            className="border border-[#8B5E3C] text-[#8B5E3C] bg-transparent px-6 py-2 text-base font-medium 
             transition-all duration-300 ease-in-out 
             hover:bg-white hover:text-black hover:scale-105 hover:shadow-[0_0_15px_#8B5E3C] 
             rounded-none flex items-center"
          >
            <Calendar className="h-4 w-4 mr-2" />
            Inquire Now
          </button>

          <button
            onClick={onWhatsAppContact}
            className="border border-[#8B5E3C] text-[#8B5E3C] bg-transparent px-6 py-2 text-base font-medium 
             transition-all duration-300 ease-in-out 
             hover:bg-[#8B5E3C] hover:text-green-400 hover:scale-105 hover:shadow-[0_0_15px_#8B5E3C] 
             rounded-none flex items-center"
          >
            <MessageCircle className="h-4 w-4 mr-2" />
            WhatsApp Us
          </button>
        </div>

        {/* Contact Information */}
        {/* <div className="pt-8 border-t border-emerald-400/30 text-gray-200">
    <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
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
  </div> */}
      </div>
    </section>
  );
};

export default CallToActionSection;
