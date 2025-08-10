import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import sunset from "../../assets/images/safari-sunset.webp";

const HeroSection = ({ onInquireNow }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: "Discover Mobile Camping in YALA",
      subtitle:
        "Seize the chance to stay in a mobile camp near Yala National Park and let the jungle become your living room",
    },
    {
      title: "Adventure Awaits in Paradise",
      subtitle:
        "From misty mountains to pristine beaches, create unforgettable memories in nature",
    },
    {
      title: "Reconnect with Nature",
      subtitle:
        "Escape the ordinary and immerse yourself in Sri Lanka's breathtaking landscapes",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="home" className="relative h-[70vh] overflow-hidden">
      <Helmet>
        <title>
          Yala Mobile Camping | Sri Lanka Safari & Wildlife Adventure
        </title>
        <meta
          name="description"
          content="Experience the thrill of mobile camping in Yala National Park, Sri Lanka. Wake up to wildlife, explore the jungle, and enjoy luxury tents in the wild."
        />
        <meta
          name="keywords"
          content="yala mobile camping, sri lanka safari, wildlife adventure, luxury camping, yala national park, jungle camp"
        />
        <meta
          property="og:title"
          content="Yala Mobile Camping | Sri Lanka Safari & Wildlife Adventure"
        />
        <meta
          property="og:description"
          content="Experience the thrill of mobile camping in Yala National Park, Sri Lanka. Wake up to wildlife, explore the jungle, and enjoy luxury tents in the wild."
        />
        <meta property="og:type" content="website" />
      </Helmet>

      {/* Background Image */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${sunset})` }}
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center px-4 lg:px-16 pt-20">
        <div className="max-w-2xl">
          <h1 className="font-serif italic text-4xl md:text-6xl lg:text-7xl mb-6 leading-tight text-white tracking-wide">
            {slides[currentSlide].title}
          </h1>
          <p className="font-sans text-lg md:text-xl lg:text-2xl mb-8 text-gray-100 leading-loose tracking-wide">
            {slides[currentSlide].subtitle}
          </p>
          <button
            onClick={() => {
              if (onInquireNow) {
                onInquireNow();
              } else {
                console.error("onInquireNow function not provided!");
              }
            }}
            className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-6 py-2.5 text-base font-medium rounded-full hover:from-amber-600 hover:to-orange-600 transition-all duration-300 shadow-lg transform hover:scale-105"
          >
            Inquire Now
          </button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce">
        <div className="flex flex-col items-center">
          <span className="text-sm mb-2 font-medium">Scroll Down</span>
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
