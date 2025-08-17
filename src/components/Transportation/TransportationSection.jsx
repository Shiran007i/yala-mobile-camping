// src/components/Transportation/TransportationSection.jsx
import React, { useState } from "react";
import { 
  Tent, 
  Mountain, 
  Shield, 
  Camera, 
  Coffee, 
  Car,
  Clock,
  Users,
  DollarSign,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Phone,
  Mail
} from "lucide-react";
import { Helmet } from "react-helmet";
import { TRANSPORTATION_DATA, ARROW_TOURS_DATA } from "../../constants/transportationData";
import { WHATSAPP_NUMBER, COMPANY_PHONE } from "../../constants";

const iconMap = {
  Tent,
  Mountain,
  Shield,
  Camera,
  Coffee,
  Car,
};

const TransportationSection = () => {
  const [expandedCard, setExpandedCard] = useState(null);
  const [showArrowTours, setShowArrowTours] = useState(true);

  const toggleCard = (id) => {
    setExpandedCard(expandedCard === id ? null : id);
  };

  const handleWhatsAppContact = (service = null) => {
    let message = "Hi! I'm interested in your transportation services.";
    
    if (service) {
      message = `Hi! I'm interested in your ${service.title} service (${service.price}). Could you provide more information about availability and booking?`;
    } else {
      message += " Could you provide more information?";
    }
    
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`, "_blank");
  };

  const handleArrowToursContact = () => {
    window.open(ARROW_TOURS_DATA.websiteUrl, "_blank");
  };

  return (
    <>
      <Helmet>
        <title>Transportation Services | Yala Mobile Camping</title>
        <meta
          name="description"
          content="Reliable transportation services for Yala National Park including airport transfers, city transfers, and safari vehicle rentals."
        />
        <meta
          name="keywords"
          content="yala transportation, airport transfer, safari transport, sri lanka transport, yala transfer service"
        />
      </Helmet>

      <section id="transportation" className="py-20 bg-slate-50 relative">
      
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6">
              Transportation Services
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Comfortable and reliable transport solutions to get you to your Yala adventure
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Transportation Services - Left 3 columns */}
            <div className="lg:col-span-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {TRANSPORTATION_DATA.map((service) => {
                  const IconComponent = iconMap[service.icon];
                  const isExpanded = expandedCard === service.id;
                  
                  return (
                    <div
                      key={service.id}
                      className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border border-slate-200 flex flex-col overflow-hidden transform hover:scale-105 hover:rotate-0"
                    >
                      {/* Header Section */}
                      <div className="p-6 pb-2">
                        <div className="flex items-center space-x-4 mb-4">
                          <div className="bg-slate-100 p-3 rounded-lg">
                            {IconComponent && <IconComponent className="h-6 w-6 text-slate-600" />}
                          </div>
                          <div className="flex-1">
                            <h3 className="text-xl font-semibold text-slate-800 mb-1">
                              {service.title}
                            </h3>
                            <p className="text-2xl font-bold text-slate-700">
                              {service.price}
                            </p>
                          </div>
                        </div>
                        
                        {/* Duration & Vehicle Info */}
                        <div className="flex items-center justify-between text-slate-500 mb-3">
                          <div className="flex items-center space-x-2">
                            <Clock className="h-4 w-4" />
                            <span className="font-medium">{service.duration}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Users className="h-4 w-4" />
                            <span className="font-medium">{service.vehicleTypes[0]}</span>
                          </div>
                        </div>

                        {/* Description */}
                        <p className="text-slate-600 mb-4 leading-relaxed">
                          {service.description}
                        </p>
                      </div>

                      {/* Image Area - Shows when not expanded */}
                      {!isExpanded && (
                        <div className="mx-6 mb-4 h-32 bg-gradient-to-br from-slate-100 to-slate-200 rounded-lg relative overflow-hidden transition-all duration-300">
                          <div className="absolute inset-0 flex items-center justify-center">
                            {IconComponent && <IconComponent className="h-12 w-12 text-slate-400" />}
                          </div>
                          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-transparent"></div>
                          {/* Decorative elements */}
                          <div className="absolute top-2 left-2 w-6 h-6 bg-blue-200/30 rounded-full"></div>
                          <div className="absolute bottom-2 right-2 w-4 h-4 bg-slate-300/40 rounded-full"></div>
                        </div>
                      )}

                      {/* Expanded Details - Shows when expanded */}
                      {isExpanded && (
                        <div className="px-6 mb-4 animate-fadeIn">
                          <div className="pt-2 border-t border-slate-100 space-y-6">
                            {/* Features */}
                            <div>
                              <h4 className="font-semibold text-slate-800 mb-3">
                                What's Included:
                              </h4>
                              <ul className="space-y-2">
                                {service.features.map((feature, idx) => (
                                  <li key={idx} className="text-slate-600 flex items-start">
                                    <div className="h-2 w-2 bg-slate-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                                    <span>{feature}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>

                            {/* Vehicle Types */}
                            <div>
                              <h4 className="font-semibold text-slate-800 mb-3">
                                Available Vehicles:
                              </h4>
                              <div className="flex flex-wrap gap-2">
                                {service.vehicleTypes.map((vehicle, idx) => (
                                  <span
                                    key={idx}
                                    className="bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-sm font-medium"
                                  >
                                    {vehicle}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Fixed Action Buttons */}
                      <div className="flex space-x-3 mt-auto px-6 pb-6">
                        <button
                          onClick={() => handleWhatsAppContact(service)}
                          className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-3 px-4 rounded-lg font-medium transition-all duration-200 hover:scale-105 active:scale-95"
                        >
                          Book Now
                        </button>
                        <button
                          onClick={() => toggleCard(service.id)}
                          className="px-4 py-3 border border-slate-200 hover:border-slate-300 text-slate-700 rounded-lg transition-all duration-200 flex items-center space-x-2 hover:scale-105 active:scale-95"
                        >
                          <span>{isExpanded ? "Close" : "Details"}</span>
                          {isExpanded ? (
                            <ChevronUp className="h-4 w-4" />
                          ) : (
                            <ChevronDown className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Arrow Ceylon Tours Advertisement - Right 1 column */}
            {showArrowTours && (
              <div className="lg:col-span-1">
                <div className="sticky top-24">
                  <div className="bg-blue-500 text-white rounded-lg shadow-lg p-5 relative">
                    {/* Close Button */}
                    <button
                      onClick={() => setShowArrowTours(false)}
                      className="absolute top-3 right-3 text-white/80 hover:text-white text-lg font-light"
                    >
                      ×
                    </button>

                    {/* Content */}
                    <div className="pr-5">
                      <div className="text-center mb-5">
                        <h3 className="text-lg font-bold mb-2">
                          {ARROW_TOURS_DATA.companyName}
                        </h3>
                        <p className="text-blue-100 text-sm mb-3">
                          {ARROW_TOURS_DATA.tagline}
                        </p>
                        <p className="text-blue-50 text-sm leading-relaxed">
                          {ARROW_TOURS_DATA.description}
                        </p>
                      </div>

                      {/* Popular Packages */}
                      <div className="mb-5">
                        <h4 className="font-semibold mb-3 text-white text-sm">
                          Popular Tours:
                        </h4>
                        <div className="space-y-2">
                          {ARROW_TOURS_DATA.popularPackages.slice(0, 3).map((pkg, idx) => (
                            <div key={idx} className="bg-blue-400/30 rounded-md p-2">
                              <p className="text-white font-medium text-sm">{pkg.name}</p>
                              <p className="text-blue-100 text-xs mt-1">{pkg.duration}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Features */}
                      <div className="mb-5">
                        <h4 className="font-semibold mb-2 text-white text-sm">
                          Why Choose Us:
                        </h4>
                        <ul className="space-y-1">
                          {ARROW_TOURS_DATA.features.slice(0, 4).map((feature, idx) => (
                            <li key={idx} className="text-sm text-blue-50 flex items-start">
                              <div className="h-1.5 w-1.5 bg-blue-200 rounded-full mt-1.5 mr-2 flex-shrink-0"></div>
                              <span className="text-xs">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* CTA Buttons */}
                      <div className="space-y-2">
                        <button
                          onClick={handleArrowToursContact}
                          className="w-full bg-white text-blue-600 hover:bg-blue-50 py-2.5 px-3 rounded-md text-sm font-medium transition-colors duration-200 flex items-center justify-center space-x-2"
                        >
                          <ExternalLink className="h-4 w-4" />
                          <span>Visit Website</span>
                        </button>
                        
                        <div className="grid grid-cols-2 gap-2">
                          <a
                            href={`tel:${ARROW_TOURS_DATA.contactInfo.phone}`}
                            className="bg-blue-400/30 hover:bg-blue-400/50 py-2 px-2 rounded-md transition-colors duration-200 text-xs font-medium flex items-center justify-center space-x-1"
                          >
                            <Phone className="h-3 w-3" />
                            <span>Call</span>
                          </a>
                          <a
                            href={`https://wa.me/${ARROW_TOURS_DATA.contactInfo.whatsapp}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-green-600 hover:bg-green-700 py-2 px-2 rounded-md transition-colors duration-200 text-xs font-medium flex items-center justify-center space-x-1"
                          >
                            <Mail className="h-3 w-3" />
                            <span>WhatsApp</span>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Bottom CTA Section with Image */}
          <div className="mt-16 bg-white rounded-xl border border-slate-200 overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
              {/* Left Column - Image */}
              <div className="h-64 lg:h-auto bg-gradient-to-br from-blue-100 to-slate-100 relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Car className="h-24 w-24 text-blue-300" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-transparent"></div>
                {/* Decorative elements */}
                <div className="absolute top-4 left-4 w-12 h-12 bg-blue-200/30 rounded-full"></div>
                <div className="absolute bottom-8 right-8 w-8 h-8 bg-slate-300/40 rounded-full"></div>
                <div className="absolute top-1/3 right-6 w-6 h-6 bg-blue-300/50 rounded-full"></div>
              </div>
              
              {/* Right Column - Content */}
              <div className="p-8 flex flex-col justify-center">
                <h3 className="text-2xl font-bold text-slate-800 mb-4">
                  Need Custom Transportation?
                </h3>
                <p className="text-slate-600 mb-8 text-lg leading-relaxed">
                  We offer flexible transportation solutions tailored to your specific needs. 
                  Contact us to discuss your requirements and get a personalized quote.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={() => handleWhatsAppContact()}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center space-x-3"
                  >
                    <Phone className="h-5 w-5" />
                    <span>Contact via WhatsApp</span>
                  </button>
                  <a
                    href={`tel:${COMPANY_PHONE}`}
                    className="border-2 border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center space-x-3"
                  >
                    <Phone className="h-5 w-5" />
                    <span>Call Now</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default TransportationSection;
