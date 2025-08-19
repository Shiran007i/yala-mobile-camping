// src/components/WhyChooseUsSection/WhyChooseUsSection.jsx
import React from "react";
import yalaElephants from '/src/assets/images/camping/yala_swamp.webp';
import safariGuide from '/src/assets/images/safari/Yala_mibile_camping_safari4.webp';
import campingBed from '/src/assets/images/camping/Camping_bed.webp';

const WhyChooseUsSection = () => {
  const features = [
    {
      title: "Pioneering Mobile Camping",
      shortDescription: "First and finest mobile camping experience in Yala National Park",
      detailedDescription: "Experience Sri Lanka's revolutionary mobile camping concept that brings the wilderness directly to you. Our state-of-the-art mobile units are strategically positioned in prime wildlife viewing locations within Yala National Park, offering you unparalleled access to leopard territories and elephant corridors. Unlike traditional fixed camps, our mobile setup allows us to follow wildlife movements and seasonal patterns, ensuring you're always in the heart of the action. Each mobile camp is equipped with luxury amenities including comfortable bedding, private bathrooms, and gourmet dining facilities - all while maintaining minimal environmental impact.",
      image: yalaElephants,
      alt: "Mobile camping setup in Yala National Park wilderness"
    },
    {
      title: "Expert Wildlife Guides & Rangers",
      shortDescription: "Experienced guides with decades of wildlife expertise",
      detailedDescription: "Our team consists of certified naturalists and professional rangers who have dedicated their lives to understanding Yala's complex ecosystem. With an average of 15+ years of experience in the park, our guides possess intimate knowledge of leopard behavior patterns, elephant migration routes, and the best times for wildlife photography. They are trained in animal behavior, conservation biology, and emergency wilderness response. Our multilingual guides share fascinating stories about Sri Lankan wildlife conservation efforts while ensuring your safety and maximizing your chances of witnessing rare wildlife encounters, including the elusive Sri Lankan leopard.",
      image: safariGuide,
      alt: "Expert wildlife guide observing leopards in Yala"
    },
    {
      title: "Premium Safety & Comfort",
      shortDescription: "Professional safety protocols and luxury camping facilities",
      detailedDescription: "Safety is our paramount concern in one of Sri Lanka's most wild and untamed environments. Our comprehensive safety protocols include 24/7 armed security personnel, satellite communication systems for emergency contact, and medical first aid stations at each camp location. All our mobile units are built to withstand extreme weather conditions and equipped with backup power systems. We maintain a 100% safety record through rigorous equipment maintenance, regular staff training, and strict adherence to national park regulations. Our luxury camping facilities feature premium bedding, en-suite bathrooms with hot water, air conditioning, and fine dining experiences under the stars.",
     image: campingBed,
      alt: "Luxury mobile camp with safety equipment and comfortable facilities"
    },
  ];

  const statistics = [
    { value: "20+", label: "Years Experience" },
    { value: "98%", label: "Leopard Sightings" },
    { value: "100%", label: "Safety Record" },
    { value: "500+", label: "Happy Campers" },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif text-black mb-6 leading-tight italic">
            Why Camping with Us?
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Experience Sri Lanka's pioneering mobile camping adventure in Yala
            National Park with expert guides and rangers
          </p>
        </div>

        {/* Enhanced Features Section */}
        <div className="space-y-20">
          {features.map((feature, index) => (
            <div key={index} className="group">
              <div className={`grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch ${
                index % 2 === 1 ? 'lg:flex-row-reverse' : ''
              }`}>
                {/* Image Side */}
                <div className={`${index % 2 === 1 ? 'lg:order-2' : 'lg:order-1'} relative`}>
                  <div className="relative overflow-hidden rounded-lg shadow-lg group-hover:shadow-xl transition-all duration-300">
                    <img
                      src={feature.image}
                      alt={feature.alt}
                      className="w-full aspect-square object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                  </div>
                </div>

                {/* Content Side */}
                <div className={`${index % 2 === 1 ? 'lg:order-1' : 'lg:order-2'} flex flex-col justify-center space-y-4`}>
                  <div>
                    {/* Small box tag before heading */}
                    <div className="inline-block mb-3">
                      <span className="text-gray-500 text-xs font-normal px-0 py-1 uppercase tracking-widest">
                        {feature.shortDescription}
                      </span>
                    </div>
                    
                    <h3 className="text-2xl lg:text-3xl font-serif text-black mb-4 leading-tight italic">
                      {feature.title}
                    </h3>
                  </div>
                  
                  <div className="text-gray-600">
                    <p className="leading-relaxed text-base">
                      {feature.detailedDescription}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Statistics Section */}
        <div className="mt-20 bg-gray-50 rounded-lg p-8 md:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-black text-black mb-4 tracking-tight">
                Yala Mobile Camping Excellence
              </h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                While mobile camping in Sri Lanka's Yala National Park is
                innovative and new, our team brings together well-experienced
                guides and professional rangers who know every corner of this
                UNESCO World Heritage site.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Our Yala mobile camping specialists combine cutting-edge camping
                technology with traditional wildlife knowledge, ensuring you
                experience the best leopard spotting opportunities and authentic
                Sri Lankan wilderness adventures.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {statistics.map((stat, index) => (
                <div
                  key={index}
                  className="text-center p-6 bg-white rounded-lg hover:shadow-md transition-all duration-300"
                >
                  <div className="text-3xl font-black text-black mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-500 font-normal uppercase tracking-wider">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;
