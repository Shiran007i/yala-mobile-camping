import React, { useEffect, useRef, useState } from "react";
import { CheckCircle, Clock, MapPin, Tent, Sunrise, Moon } from "lucide-react";
import { Helmet } from "react-helmet";

const TabSections = ({ activeTab }) => {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const headingClasses =
    "text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif italic mb-4 sm:mb-6 text-center transition-all duration-1000 ease-in-out tracking-wider leading-tight";
  const paragraphClasses =
    "text-base sm:text-lg md:text-xl font-lora text-gray-700 font-light leading-relaxed max-w-3xl mx-auto text-center transition-opacity duration-1000 ease-in-out tracking-wider";

  const fadeInClass = isVisible
    ? "opacity-100 translate-y-0"
    : "opacity-0 translate-y-6";

  if (activeTab === "safaris") {
    return (
      <section
        ref={sectionRef}
        className="py-10 sm:py-16 md:py-20 bg-gradient-to-br from-green-50 to-emerald-50 transition-all duration-1000"
      >
        <div className="max-w-7xl mx-auto px-2 sm:px-4 md:px-8 lg:px-12">
          <h2 className={`${headingClasses} text-green-900 ${fadeInClass}`}>
            Yala Safari Adventures
          </h2>
          <p className={`${paragraphClasses} ${fadeInClass}`}>
            Embark on a thrilling wildlife journey through Yala National Park,
            Sri Lanka’s premier safari destination. Renowned for its high
            density of leopards, elephants, sloth bears, and over 200 bird
            species, Yala offers a raw, untamed glimpse into the island’s wild
            heart. Navigate through dry forests, open plains, and freshwater
            lagoons with expert guides, capturing unforgettable moments in
            nature’s playground.
          </p>
        </div>
      </section>
    );
  }

  if (activeTab === "camping") {
    return (
      <section
        ref={sectionRef}
        className="py-10 sm:py-16 md:py-20 bg-gradient-to-br from-orange-50 to-red-50 transition-all duration-1000"
      >
        <div className="max-w-7xl mx-auto px-2 sm:px-4 md:px-8 lg:px-12">
          <h2
            className={`${headingClasses} text-orange-900 ${fadeInClass} leading-loose tracking-widest`}
          >
            Yala Mobile Camping <br />
            Your Ultimate Safari Experience
          </h2>

          <p className={`${paragraphClasses} ${fadeInClass}`}>
            Experience the wild heart of Yala with our mobile camping adventure.
            Your journey begins at the park's entrance, where our team will
            welcome you before embarking on a thrilling safari game drive. As
            dusk settles, we guide you to our campsite, nestled within the
            national park. Enjoy a delicious dinner and the unique thrill of
            nocturnal animal encounters outside your tent. At 5:00 AM, your day
            begins with another exhilarating game drive, concluding your
            unforgettable first night with us.
          </p>
        </div>
      </section>
    );
  }

  if (activeTab === "about") {
    return (
      <section
        ref={sectionRef}
        className="py-10 sm:py-16 md:py-20 bg-gradient-to-br from-blue-50 to-teal-50 transition-all duration-1000"
      >
        <div className="max-w-7xl mx-auto px-2 sm:px-4 md:px-8 lg:px-12">
          <h2 className={`${headingClasses} text-blue-900 ${fadeInClass}`}>
            About CampLanka
          </h2>
          <p className={`${paragraphClasses} text-blue-700 ${fadeInClass}`}>
            Pioneering sustainable wildlife tourism in Sri Lanka since 2018,
            CampLanka connects travelers with authentic wilderness experiences
            rooted in eco-conscious practices and local expertise.
          </p>
        </div>
      </section>
    );
  }

  return null;
};

export default TabSections;
