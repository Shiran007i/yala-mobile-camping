// src/components/WhyChooseUsSection/WhyChooseUsSection.jsx
import React from "react";
import { Mountain, Award, Shield } from "lucide-react";
import { Helmet } from "react-helmet";

const WhyChooseUsSection = () => {
  const features = [
    {
      icon: <Mountain className="h-10 w-10 text-emerald-600" />,
      title: "Pioneering Mobile Camping",
      description:
        "First and finest mobile camping experience in Yala National Park, bringing luxury wilderness adventures to Sri Lanka",
    },
    {
      icon: <Award className="h-10 w-10 text-emerald-600" />,
      title: "Expert Wildlife Guides & Rangers",
      description:
        "Experienced Yala National Park guides and certified rangers with decades of wildlife expertise ensure exceptional safari experiences",
    },
    {
      icon: <Shield className="h-10 w-10 text-emerald-600" />,
      title: "Premium Safety & Comfort",
      description:
        "Professional safety protocols, luxury camping facilities, and 24/7 security in Sri Lanka's most famous leopard territory",
    },
  ];

  const statistics = [
    { value: "20+", label: "Years Experience" },
    { value: "98%", label: "Leopard Sightings" },
    { value: "100%", label: "Safety Record" },
    { value: "500+", label: "Happy Campers" },
  ];

  return (
    <section className="py-20 bg-emerald-50">
      <Helmet>
        <title>Why Choose Us | Yala Mobile Camping</title>
        <meta
          name="description"
          content="Discover why Yala Mobile Camping is Sri Lanka's top choice for mobile safari adventures. Expert guides, luxury tents, and the best wildlife experiences in Yala National Park."
        />
        <meta
          name="keywords"
          content="why choose yala camping, sri lanka safari, best yala camping, expert guides, luxury tents, wildlife experience"
        />
        <meta
          property="og:title"
          content="Why Choose Us | Yala Mobile Camping"
        />
        <meta
          property="og:description"
          content="Discover why Yala Mobile Camping is Sri Lanka's top choice for mobile safari adventures."
        />
        <meta property="og:type" content="website" />
      </Helmet>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Why Choose Yala Mobile Camping?
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto">
            Experience Sri Lanka's pioneering mobile camping adventure in Yala
            National Park with expert guides and rangers
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center group">
              <div className="bg-white rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Additional content with statistics */}
        <div className="mt-16 bg-white/70 backdrop-blur-md rounded-3xl p-8 md:p-12 shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Yala Mobile Camping Excellence
              </h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                While mobile camping in Sri Lanka's Yala National Park is
                innovative and new, our team brings together well-experienced
                guides and professional rangers who know every corner of this
                UNESCO World Heritage site.
              </p>
              <p className="text-gray-700 leading-relaxed">
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
                  className="text-center p-4 bg-emerald-100 rounded-xl hover:bg-emerald-200 transition-colors duration-300"
                >
                  <div className="text-2xl font-bold text-emerald-700">
                    {stat.value}
                  </div>
                  <div className="text-sm text-emerald-600">{stat.label}</div>
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
