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
  title: "Adventure Awaits Under the Open Sky",
  subtitle:
    "Experience the magic of camping — from golden sunsets to starlit nights in the heart of the dry zone",
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
  <section
  id="home"
  className="relative h-screen overflow-hidden -mt-32" // full screen so header overlays
  role="banner"
  aria-label="Hero section showcasing Yala Mobile Camping experience"
>


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
        <picture>
          <img
            src={sunset}
            alt="Stunning safari sunset in Yala National Park with wildlife silhouettes"
            className="absolute inset-0 w-full h-full object-cover bg-center bg-no-repeat"
            loading="eager"
            width="1920"
            height="1080"
          />
        </picture>
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-black/30" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center px-4 lg:px-16 pt-20">
        <div className="max-w-2xl">
          <h1 className="font-light text-4xl md:text-5xl lg:text-6xl mb-6 leading-tight text-white tracking-wide uppercase">
            {slides[currentSlide].title}
          </h1>
          <p className="font-light text-base md:text-lg lg:text-xl mb-12 text-gray-100 leading-relaxed tracking-wide max-w-xl">
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
            className="bg-transparent border border-white text-white px-8 py-3 text-sm font-light uppercase tracking-widest hover:bg-white hover:text-black transition-all duration-300"
          >
            Inquire Now
          </button>
          
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce">
        <div className="flex flex-col items-center">
          <span className="text-xs mb-2 font-light uppercase tracking-wide font-inter">Explore More</span>
          <button 
            onClick={() => {
              const element = document.getElementById("locations");
              if (element) {
                element.scrollIntoView({ behavior: "smooth" });
              }
            }}
            className="w-6 h-10 border border-white rounded-full flex justify-center focus:outline-none focus:ring-2 focus:ring-emerald-400"
            aria-label="Scroll to locations section"
          >
            <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
          </button>
        </div>
      </div>

      {/* Structured data for SEO */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "VideoObject",
          "name": slides[currentSlide].title,
          "description": slides[currentSlide].subtitle,
          "thumbnailUrl": sunset,
          "uploadDate": "2025-01-01",
          "duration": "PT30S"
        })}
      </script>

    </section>
  );
};

export default HeroSection;
