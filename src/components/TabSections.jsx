import React, { useEffect, useRef, useState } from "react";
import { CheckCircle, Clock, MapPin, Tent, Sunrise, Moon } from "lucide-react";
import { Helmet } from "react-helmet";
import yalaElephantsImg from '../assets/images/camping/yala_elephants.webp';
import morningSafariImg from '../assets/images/activities/morning-safari.webp';

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

  // Mobile Camping Tab (now first priority)
  if (activeTab === "camping") {
    return (
      <>
        <Helmet>
          <title>Yala Mobile Camping Sri Lanka | Overnight Safari Experience in Yala National Park</title>
          <meta
            name="description"
            content="Experience authentic mobile camping in Yala National Park with overnight safari adventures. Sleep under stars, encounter leopards, elephants & wildlife with expert guides. Book your Yala camping safari today!"
          />
          <meta
            name="keywords"
            content="Yala mobile camping, Sri Lanka camping safari, overnight safari Yala, Yala National Park camping, leopard safari camping, wildlife camping Sri Lanka, mobile camp Yala, safari tent experience"
          />
          <meta property="og:title" content="Yala Mobile Camping Sri Lanka | Overnight Safari Experience" />
          <meta property="og:description" content="Sleep under stars in Yala National Park with mobile camping safari. Encounter leopards, elephants & 200+ bird species. Expert guides, authentic experience." />
          <meta property="og:type" content="website" />
          <meta property="og:image" content="https://yalamobilecamping.com/images/camping/yala-mobile-camping-elephants.webp" />
          <meta property="og:url" content="https://yalamobilecamping.com/mobile-camping" />
          <link rel="canonical" href="https://yalamobilecamping.com/mobile-camping" />
          <script type="application/ld+json">
            {JSON.stringify({
              "@context": "https://schema.org",
              "@type": "TouristAttraction",
              "name": "Yala Mobile Camping Experience",
              "description": "Authentic mobile camping experience in Yala National Park with overnight safari adventures, wildlife encounters, and expert naturalist guides.",
              "url": "https://yalamobilecamping.com/mobile-camping",
              "image": "https://yalamobilecamping.com/images/camping/yala-mobile-camping-elephants.webp",
              "address": {
                "@type": "PostalAddress",
                "addressCountry": "LK",
                "addressRegion": "Southern Province",
                "addressLocality": "Yala National Park"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": "6.3725",
                "longitude": "81.5205"
              },
              "offers": {
                "@type": "Offer",
                "description": "Mobile camping safari experience in Yala National Park",
                "priceCurrency": "USD",
                "availability": "https://schema.org/InStock"
              },
              "provider": {
                "@type": "Organization",
                "name": "Yala Mobile Camping",
                "url": "https://yalamobilecamping.com",
                "telephone": "+94716335000"
              }
            })}
          </script>
        </Helmet>
        <section
          ref={sectionRef}
          className="py-6 sm:py-10 md:py-16 lg:py-20 bg-gradient-to-br from-orange-50 to-red-50 transition-all duration-1000"
          itemScope
          itemType="https://schema.org/TouristAttraction"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-start">
              {/* Image */}
              <div className={`order-1 ${fadeInClass}`}>
                <div className="relative overflow-hidden rounded-lg shadow-2xl">
                  <img
                    src={yalaElephantsImg}
                    alt="Yala Mobile Camping Experience with Wild Elephants in Yala National Park Sri Lanka"
                    title="Mobile Camping Safari in Yala National Park - Encounter Wild Elephants"
                    className="w-full h-[250px] sm:h-[300px] md:h-[400px] lg:h-[500px] object-cover transition-transform duration-700 hover:scale-105"
                    loading="lazy"
                    itemProp="image"
                    width="500"
                    height="400"
                  />
                </div>
              </div>
              
              {/* Text Content */}
              <div className={`order-2 ${fadeInClass} min-h-[250px] sm:min-h-[300px] lg:h-[400px] xl:h-[500px] flex flex-col justify-between`}>
                {/* Title Box */}
                <div className="border-l-4 border-gray-400 p-2 sm:p-3 mb-3 sm:mb-4">
                  <p className="text-xs sm:text-sm font-medium text-gray-600 uppercase tracking-wider">
                    Did you know? Yala has the highest leopard density in the world!
                  </p>
                </div>
                
                <div className="flex-1">
                  <h1 
                    className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-serif italic mb-2 sm:mb-3 md:mb-4 text-orange-900 transition-all duration-1000 ease-in-out tracking-wider leading-tight"
                    itemProp="name"
                  >
                    Yala Mobile Camping Sri Lanka <br />
                    <span className="text-sm sm:text-base md:text-lg text-gray-600 font-normal not-italic">Your Ultimate Overnight Safari Experience</span>
                  </h1>
                  
                  <div className="space-y-3 sm:space-y-4" itemProp="description">
                    <p className="text-sm sm:text-base lg:text-lg font-lora text-gray-700 font-light leading-relaxed transition-opacity duration-1000 ease-in-out tracking-wide">
                      Experience authentic <strong>mobile camping in Yala National Park</strong>, Sri Lanka's premier wildlife destination.
                      Your adventure begins at the park entrance with our expert naturalist guides before embarking on an unforgettable 
                      <em>overnight safari game drive</em>.
                    </p>
                    <p className="text-sm sm:text-base font-lora text-gray-600 font-light leading-relaxed">
                      As dusk settles over the wilderness, we guide you to our carefully selected <strong>mobile campsite</strong> within 
                      the national park. Enjoy authentic Sri Lankan cuisine and experience the thrill of nocturnal wildlife encounters 
                      right outside your comfortable safari tent.
                    </p>
                    <p className="text-sm sm:text-base font-lora text-gray-600 font-light leading-relaxed">
                      Wake to the sounds of the wild at 5:00 AM for an exhilarating dawn game drive, maximizing your chances of spotting 
                      <strong>leopards, elephants, sloth bears</strong>, and over 200 bird species that call Yala home.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }

  // Safari Tab (now second)
  if (activeTab === "safaris") {
    return (
      <>
        <Helmet>
          <title>Yala Safari Tours Sri Lanka | Leopard Safari & Wildlife Game Drives in Yala National Park</title>
          <meta
            name="description"
            content="Join expert-guided Yala safari tours to spot Sri Lankan leopards, elephants, sloth bears & 200+ bird species. Morning & evening game drives with professional naturalists. Book your Yala safari adventure!"
          />
          <meta
            name="keywords"
            content="Yala safari tours, Sri Lanka leopard safari, Yala National Park safari, wildlife game drive, morning safari Yala, evening safari tours, leopard spotting safari, elephant safari Sri Lanka"
          />
          <meta property="og:title" content="Yala Safari Tours Sri Lanka | Leopard Safari & Wildlife Adventures" />
          <meta property="og:description" content="Expert-guided safari tours in Yala National Park. Spot Sri Lankan leopards, elephants & diverse wildlife with professional naturalist guides." />
          <meta property="og:type" content="website" />
          <meta property="og:image" content="https://yalamobilecamping.com/images/activities/yala-morning-safari.webp" />
          <meta property="og:url" content="https://yalamobilecamping.com/safari-tours" />
          <link rel="canonical" href="https://yalamobilecamping.com/safari-tours" />
          <script type="application/ld+json">
            {JSON.stringify({
              "@context": "https://schema.org",
              "@type": "TouristActivity",
              "name": "Yala Safari Tours",
              "description": "Professional wildlife safari tours in Yala National Park featuring leopard spotting, elephant encounters, and bird watching with expert naturalist guides.",
              "url": "https://yalamobilecamping.com/safari-tours",
              "image": "https://yalamobilecamping.com/images/activities/yala-morning-safari.webp",
              "location": {
                "@type": "Place",
                "name": "Yala National Park",
                "address": {
                  "@type": "PostalAddress",
                  "addressCountry": "LK",
                  "addressRegion": "Southern Province"
                }
              },
              "offers": {
                "@type": "Offer",
                "description": "Guided safari tours in Yala National Park",
                "priceCurrency": "USD",
                "availability": "https://schema.org/InStock"
              },
              "provider": {
                "@type": "Organization",
                "name": "Yala Mobile Camping",
                "url": "https://yalamobilecamping.com",
                "telephone": "+94716335000"
              }
            })}
          </script>
        </Helmet>
        <section
          ref={sectionRef}
          className="py-6 sm:py-10 md:py-16 lg:py-20 bg-gradient-to-br from-green-50 to-emerald-50 transition-all duration-1000"
          itemScope
          itemType="https://schema.org/TouristActivity"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-start">
              {/* Text Content */}
              <div className={`order-2 lg:order-1 ${fadeInClass} min-h-[250px] sm:min-h-[300px] lg:h-[400px] xl:h-[500px] flex flex-col justify-between`}>
                {/* Title Box */}
                <div className="border-l-4 border-gray-400 p-2 sm:p-3 mb-3 sm:mb-4">
                  <p className="text-xs sm:text-sm font-medium text-gray-600 uppercase tracking-wider">
                    Fun Fact: Sri Lankan leopards are the largest leopard subspecies in Asia!
                  </p>
                </div>
                
                <div className="flex-1">
                  <h2 
                    className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-serif italic mb-2 sm:mb-3 md:mb-4 text-green-900 transition-all duration-1000 ease-in-out tracking-wider leading-tight"
                    itemProp="name"
                  >
                    Yala Safari Adventures Sri Lanka
                  </h2>
                  
                  <div className="space-y-3 sm:space-y-4" itemProp="description">
                    <p className="text-sm sm:text-base lg:text-lg font-lora text-gray-700 font-light leading-relaxed transition-opacity duration-1000 ease-in-out tracking-wide">
                      Embark on thrilling <strong>Yala safari tours</strong> through Sri Lanka's premier wildlife destination. 
                      Renowned for having the world's highest density of <em>Sri Lankan leopards</em>, plus majestic elephants, 
                      elusive sloth bears, and over 200 bird species in their natural habitat.
                    </p>
                    <p className="text-sm sm:text-base font-lora text-gray-600 font-light leading-relaxed">
                      Navigate through diverse ecosystems including dry monsoon forests, open grasslands, and pristine 
                      freshwater lagoons with our <strong>professional naturalist guides</strong> who ensure exceptional 
                      wildlife viewing opportunities.
                    </p>
                    <p className="text-sm sm:text-base font-lora text-gray-600 font-light leading-relaxed">
                      Our <strong>morning safari tours</strong> begin at dawn when wildlife is most active, offering optimal 
                      conditions for leopard sightings, elephant encounters, and spectacular bird watching experiences in 
                      Yala National Park.
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Image */}
              <div className={`order-1 lg:order-2 ${fadeInClass}`}>
                <div className="relative overflow-hidden rounded-lg shadow-2xl">
                  <img
                    src={morningSafariImg}
                    alt="Morning Safari Game Drive in Yala National Park Sri Lanka - Leopard and Wildlife Spotting"
                    title="Yala Morning Safari Tour - Professional Wildlife Game Drive Experience"
                    className="w-full h-[250px] sm:h-[300px] md:h-[400px] lg:h-[500px] object-cover transition-transform duration-700 hover:scale-105"
                    loading="lazy"
                    itemProp="image"
                    width="500"
                    height="400"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }

  // About Tab (now third)
  if (activeTab === "about") {
    return (
      <>
        <Helmet>
          <title>About Yala Mobile Camping | Sustainable Wildlife Tourism Sri Lanka Since 2018</title>
          <meta
            name="description"
            content="Learn about Yala Mobile Camping - pioneering sustainable wildlife tourism in Sri Lanka since 2018. Authentic wilderness experiences with eco-conscious practices and local expertise in Yala National Park."
          />
          <meta
            name="keywords"
            content="about Yala Mobile Camping, sustainable tourism Sri Lanka, eco-friendly safari, wildlife conservation, local expertise Yala, authentic wilderness experience, responsible tourism"
          />
          <meta property="og:title" content="About Yala Mobile Camping | Sustainable Wildlife Tourism Sri Lanka" />
          <meta property="og:description" content="Pioneering sustainable wildlife tourism since 2018. Authentic wilderness experiences with eco-conscious practices in Yala National Park." />
          <meta property="og:type" content="website" />
          <meta property="og:image" content="https://yalamobilecamping.com/images/about/sustainable-tourism.webp" />
          <meta property="og:url" content="https://yalamobilecamping.com/about" />
          <link rel="canonical" href="https://yalamobilecamping.com/about" />
          <script type="application/ld+json">
            {JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Yala Mobile Camping",
              "description": "Pioneering sustainable wildlife tourism in Sri Lanka since 2018, connecting travelers with authentic wilderness experiences rooted in eco-conscious practices and local expertise.",
              "url": "https://yalamobilecamping.com",
              "foundingDate": "2018",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "No-795/6, Wilhelm Garden, Welipillewa, Dadigamuwa",
                "addressCountry": "LK",
                "addressRegion": "Western Province"
              },
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+94716335000",
                "contactType": "Customer Service",
                "availableLanguage": ["English", "Sinhala"]
              },
              "sameAs": [
                "https://www.facebook.com/profile.php?id=61579679243080",
                "https://www.instagram.com/yalamobilecamping/"
              ]
            })}
          </script>
        </Helmet>
        <section
          ref={sectionRef}
          className="py-10 sm:py-16 md:py-20 bg-gradient-to-br from-blue-50 to-teal-50 transition-all duration-1000"
          itemScope
          itemType="https://schema.org/Organization"
        >
          <div className="max-w-7xl mx-auto px-2 sm:px-4 md:px-8 lg:px-12">
            <h2 
              className={`${headingClasses} text-blue-900 ${fadeInClass}`}
              itemProp="name"
            >
              About Yala Mobile Camping
            </h2>
            <p 
              className={`${paragraphClasses} text-blue-700 ${fadeInClass}`}
              itemProp="description"
            >
              Pioneering <strong>sustainable wildlife tourism in Sri Lanka since 2018</strong>,
              Yala Mobile Camping connects travelers with authentic wilderness experiences
              rooted in eco-conscious practices and local expertise in Yala National Park.
            </p>
          </div>
        </section>
      </>
    );
  }

  return null;
};

export default TabSections;