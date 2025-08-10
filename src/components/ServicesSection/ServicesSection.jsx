// src/components/ServicesSection/ServicesSection.jsx
import React from "react";
import { Tent, Mountain, Shield, Camera, Coffee, Car } from "lucide-react";
import { Helmet } from "react-helmet";

const iconMap = {
  Tent,
  Mountain,
  Shield,
  Camera,
  Coffee,
  Car,
};

const ServicesSection = ({ services }) => {
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
              return (
                <div
                  key={index}
                  className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 group hover:border-emerald-200"
                >
                  <div className="text-emerald-600 mb-4 group-hover:scale-110 transition-transform duration-300">
                    {IconComponent && <IconComponent className="h-8 w-8" />}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {service.title}
                  </h3>
                  <p className="text-gray-600">{service.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};

export default ServicesSection;
