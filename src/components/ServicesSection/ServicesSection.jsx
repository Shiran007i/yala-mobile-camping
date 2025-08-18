// src/components/ServicesSection/ServicesSection.jsx
import React from "react";
import {
  Tent,
  Mountain,
  Shield,
  Camera,
  Coffee,
  Car,
  ExternalLink,
} from "lucide-react";
import { Helmet } from "react-helmet";
import safariImage from "../../assets/images/safari-services1.png"; // ✅ import the image

const iconMap = {
  Tent,
  Mountain,
  Shield,
  Camera,
  Coffee,
  Car,
};

const ServicesSection = ({ services }) => {
  const scrollToTransportation = () => {
    const element = document.getElementById("transportation");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    } else {
      // If the transportation section is not found on current page,
      // you might want to navigate to a different page
      console.log("Transportation section not found on current page");
      // Uncomment below if you want to navigate to a separate transportation page
      // window.location.href = '/transportation';
      // or if using React Router:
      // navigate('/transportation');
    }
  };

  // Enhanced function with better UX and proper positioning
  const handleTransportationClick = () => {
    const element = document.getElementById("transportation");
    
    if (element) {
      // Calculate proper scroll position with header offset
      const headerOffset = 100; // Adjust this value based on your header height
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });

      // Optional: Add a highlight effect when reaching the section
      setTimeout(() => {
        element.style.boxShadow = "0 0 20px rgba(16, 185, 129, 0.3)";
        element.style.transition = "box-shadow 0.3s ease";

        setTimeout(() => {
          element.style.boxShadow = "none";
        }, 2000);
      }, 800);
    } else {
      // Handle case where transportation section is not on current page
      // Navigate to transportation page with proper hash handling
      const currentUrl = window.location.href.split('#')[0]; // Remove existing hash
      
      // Set the hash first
      window.location.hash = '#transportation';
      
      // Use setTimeout to ensure DOM is ready after navigation
      setTimeout(() => {
        const transportElement = document.getElementById("transportation");
        if (transportElement) {
          // Scroll to top of the transportation section with offset
          const headerOffset = 100; // Adjust based on your header height
          const elementRect = transportElement.getBoundingClientRect();
          const absoluteElementTop = elementRect.top + window.pageYOffset;
          const targetPosition = absoluteElementTop - headerOffset;
          
          window.scrollTo({
            top: targetPosition,
            behavior: "smooth"
          });
        } else {
          // Fallback: scroll to a position that shows the section properly
          setTimeout(() => {
            const fallbackElement = document.getElementById("transportation");
            if (fallbackElement) {
              const rect = fallbackElement.getBoundingClientRect();
              const scrollTop = window.pageYOffset + rect.top - 100;
              window.scrollTo({
                top: scrollTop,
                behavior: "smooth"
              });
            }
          }, 100);
        }
      }, 100);
    }
  };

  return (
    <>
      <Helmet>
        <title>Yala Safari Services | Yala Mobile Camping and Safari</title>
        <meta
          name="description"
          content="Discover all the services offered by Yala Mobile Camping and Safari, including guided safaris, luxury camping, and custom wildlife experiences in Yala National Park."
        />
        <meta
          name="keywords"
          content="yala safari services, yala mobile camping, sri lanka safari, guided safari, luxury camping, yala national park services"
        />
        <meta
          property="og:title"
          content="Yala Safari Services | Yala Mobile Camping and Safari"
        />
        <meta
          property="og:description"
          content="Explore the full range of services from Yala Mobile Camping and Safari in Yala National Park, Sri Lanka."
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:image"
          content="https://yalamobilecamping.com/og-services.webp"
        />
        <link rel="canonical" href="https://yalamobilecamping.com/services" />
      </Helmet>

      <section id="services" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Our Services
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need for an unforgettable camping adventure in Sri
              Lanka
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const IconComponent = iconMap[service.icon];
              const isTransportationService = service.isTransportationLink;

              return (
                <div
                  key={index}
                  className={`bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 group hover:border-emerald-200 ${
                    isTransportationService
                      ? "cursor-pointer relative overflow-hidden hover:shadow-2xl hover:scale-105"
                      : ""
                  }`}
                  onClick={
                    isTransportationService
                      ? handleTransportationClick
                      : undefined
                  }
                >
                  {/* Transportation Service Special Styling */}
                  {isTransportationService && (
                    <>
                      {/* Gradient overlay for visual appeal */}
                      <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>

                      {/* External link icon */}
                      <div className="absolute top-4 right-4 bg-emerald-100 text-emerald-600 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-110">
                        <ExternalLink className="h-4 w-4" />
                      </div>

                      {/* Click hint */}
                      <div
                        onClick={handleTransportationClick}
                        className="absolute top-2 left-2 bg-emerald-500 text-white text-xs px-2 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer"
                      >
                        Click to explore
                      </div>
                    </>
                  )}

                  <div
                    className={`text-emerald-600 mb-4 group-hover:scale-110 transition-transform duration-300 relative z-10 ${
                      isTransportationService
                        ? "group-hover:text-emerald-700"
                        : ""
                    }`}
                  >
                    {IconComponent && <IconComponent className="h-8 w-8" />}
                  </div>

                  <h3
                    className={`text-xl font-bold text-gray-900 mb-3 relative z-10 ${
                      isTransportationService ? "group-hover:text-gray-800" : ""
                    }`}
                  >
                    {service.title}
                  </h3>

                  <p
                    className={`text-gray-600 relative z-10 ${
                      isTransportationService ? "group-hover:text-gray-700" : ""
                    }`}
                  >
                    {service.description}
                  </p>

                  {/* Transportation Service Additional Info */}
                  {isTransportationService && (
                    <div className="mt-6 pt-4 border-t border-gray-100 relative z-10">
                      <div className="flex items-center text-emerald-600 text-sm font-medium group-hover:text-emerald-700 transition-colors duration-300">
                        <span>View All Transportation Options</span>
                        <ExternalLink className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                      </div>

                      {/* Additional visual feedback */}
                      <div className="mt-2 h-1 bg-gradient-to-r from-emerald-500 to-emerald-300 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Additional CTA for Transportation */}
          <div className="mt-12 text-center">
            <div
              className="relative rounded-2xl p-8 border border-emerald-100 bg-cover bg-center"
              style={{ backgroundImage: `url(${safariImage})` }}
            >
              {/* Overlay to make text readable */}
              <div className="absolute inset-0 bg-white/70 rounded-2xl"></div>

              {/* Content */}
              <div className="relative z-10">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Need Complete Travel Solutions?
                </h3>
                <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                  Looking for comprehensive tour packages with transportation,
                  accommodation, and guided experiences? Check out our partner's
                  custom tour offerings for complete Sri Lanka adventures.
                </p>
                <button
                  onClick={() =>
                    window.open("https://arrow-tours-sihd.vercel.app", "_blank")
                  }
                  className="border-2 border-[#8B5E3C] text-[#8B5E3C] px-8 py-3 font-medium transition-colors duration-200 inline-flex items-center space-x-2 hover:bg-[#8B5E3C] hover:text-white rounded-none"
                >
                  <span>Explore Custom Tours</span>
                  <ExternalLink className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ServicesSection;
