import React, { useState, useEffect } from "react";

// Updated Hero Section Component with tab navigation
const HeroSection = ({ activeTab, setActiveTab }) => {
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
    <div>
      {/* Main Hero Section */}
      <section
        id="home"
        className="relative h-[60vh] sm:h-[70vh] md:h-[80vh] lg:h-[90vh] overflow-hidden"
      >
        {/* Single background image */}
        <div className="absolute inset-0">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(https://images.unsplash.com/photo-1549366021-9f761d040a94?w=1200&q=80)`,
            }}
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>

        {/* Content positioned to the left */}
        <div className="relative z-10 h-full flex items-center px-4 sm:px-8 md:px-12 lg:px-16 xl:px-24">
          <div className="max-w-2xl w-full">
            <h1 className="font-serif italic text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl mb-4 sm:mb-6 leading-tight text-white tracking-wide drop-shadow-lg">
              {slides[currentSlide].title}
            </h1>
            <p className="font-sans text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl mb-6 sm:mb-8 text-gray-100 leading-loose tracking-wide drop-shadow-md">
              {slides[currentSlide].subtitle}
            </p>

            {/* Inquire Button */}
            <button className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-5 sm:px-6 py-2 sm:py-2.5 text-sm sm:text-base md:text-lg font-medium rounded-full hover:from-amber-600 hover:to-orange-600 transition-all duration-300 shadow-lg transform hover:scale-105">
              Inquire Now
            </button>
          </div>
        </div>

        {/* Scroll Indicator - Centered */}
        <div className="absolute bottom-6 sm:bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce">
          <div className="flex flex-col items-center">
            <span className="text-xs sm:text-sm mb-2 font-medium">
              Scroll Down
            </span>
            <div className="w-5 sm:w-6 h-8 sm:h-10 border-2 border-white rounded-full flex justify-center">
              <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Navigation Tabs */}
      <div className="bg-white shadow-md">
        <div className="max-w-6xl mx-auto px-2 sm:px-4">
          <nav className="flex flex-wrap justify-center space-x-2 sm:space-x-8 py-2 sm:py-4">
            <button
              onClick={() => setActiveTab("safaris")}
              className={`font-medium text-base sm:text-lg border-b-2 pb-1 sm:pb-2 transition-all duration-300 ${
                activeTab === "safaris"
                  ? "text-amber-600 border-amber-600"
                  : "text-gray-700 border-transparent hover:text-amber-600 hover:border-amber-600"
              }`}
            >
              Safaris
            </button>
            <button
              onClick={() => setActiveTab("camping")}
              className={`font-medium text-base sm:text-lg border-b-2 pb-1 sm:pb-2 transition-all duration-300 ${
                activeTab === "camping"
                  ? "text-amber-600 border-amber-600"
                  : "text-gray-700 border-transparent hover:text-amber-600 hover:border-amber-600"
              }`}
            >
              Camping
            </button>
            <button
              onClick={() => setActiveTab("about")}
              className={`font-medium text-base sm:text-lg border-b-2 pb-1 sm:pb-2 transition-all duration-300 ${
                activeTab === "about"
                  ? "text-amber-600 border-amber-600"
                  : "text-gray-700 border-transparent hover:text-amber-600 hover:border-amber-600"
              }`}
            >
              About Us
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
