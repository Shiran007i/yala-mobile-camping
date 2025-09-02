// src/pages/TransportationPage.jsx
import React from "react";
import { TransportationSection } from "../components/Transportation";
import SEO from "../components/SEO.jsx";
import { useNavigate } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { Footer } from '../components';

const TransportationPage = () => {
  const navigate = useNavigate();

  const handleBackToMain = () => {
    navigate('/');
  };

  const transportationSEO = {
    title:
      "Transportation Services | Yala Mobile Camping - Airport & Safari Transfers",
    description:
      "Reliable transportation services for Yala National Park including airport transfers, city transfers, and safari vehicle rentals with professional drivers.",
    keywords:
      "yala transportation, airport transfer, safari transport, sri lanka transport, yala transfer service",
  };

  return (
    <>
      <SEO
        title={transportationSEO.title}
        description={transportationSEO.description}
        keywords={transportationSEO.keywords}
        canonical="https://yalamobilecamping.com/transportation"
      />
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white shadow-sm sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              <button
                onClick={handleBackToMain}
                className="flex items-center text-emerald-600 hover:text-emerald-700 font-medium transition-colors"
              >
                <ChevronRight className="h-4 w-4 mr-1 rotate-180" />
                Back to Yala Camping
              </button>
              <div></div> {/* Spacer for flex layout */}
            </div>
          </div>
        </header>

        <TransportationSection />

        <Footer />
      </div>
    </>
  );
};

export default TransportationPage;
