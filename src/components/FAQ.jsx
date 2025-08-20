// Complete FAQ.jsx
import React from 'react';
import { ChevronRight, ChevronDown } from 'lucide-react';

const FAQ = () => {
  const [openItems, setOpenItems] = React.useState([]);

  const faqs = [
    {
      question: "What's included in the mobile camping package?",
      answer: "Our packages include comfortable safari tents, all meals (breakfast, lunch, dinner), professional safari guide, park entrance fees, safari vehicle, and all camping equipment."
    },
    {
      question: "What's the best time to visit Yala National Park?",
      answer: "February to July offers the best wildlife viewing opportunities with dry weather and animals gathering near water sources. This is also when we have the highest leopard sighting success rate of 85%."
    },
    {
      question: "How likely am I to see leopards?",
      answer: "We maintain an impressive 85% leopard sighting success rate due to our experienced local guides who know the leopards' territories and behavior patterns."
    },
    {
      question: "Is mobile camping safe?",
      answer: "Absolutely. Our camps are set up in designated safe zones with 24/7 security protocols. We have emergency communication systems and our guides are trained in wilderness first aid."
    },
    {
      question: "What should I bring for the camping experience?",
      answer: "We provide all camping essentials. You should bring comfortable safari clothing, sturdy walking shoes, hat, sunscreen, insect repellent, camera with extra batteries, and personal medications."
    },
    {
      question: "Are there bathroom facilities at the campsite?",
      answer: "Yes, we provide clean, private bathroom facilities at all our campsites with proper sanitation systems that are environmentally friendly."
    },
    {
      question: "Can children participate in mobile camping?",
      answer: "Children aged 8 and above are welcome. We ensure extra safety measures and have child-friendly activities. Children under 12 must be accompanied by adults at all times."
    },
    {
      question: "What if weather conditions are poor?",
      answer: "We monitor weather closely and have contingency plans. Our tents are waterproof and we provide alternative indoor activities if needed. Safety is always our priority."
    },
    {
      question: "What is the cancellation policy?",
      answer: "Cancellations must be made 48 hours in advance for a full refund. Weather-related cancellations will receive a full refund or reschedule option. No-shows are non-refundable."
    },
    {
      question: "Do you provide transportation from Colombo?",
      answer: "Yes, we offer transportation services from Colombo Airport, major hotels, and other locations. Please check our Transportation page for detailed pricing and booking information."
    }
  ];

  const toggleItem = (index) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const handleBackToMain = () => {
   window.history.pushState(null, '', '/');
  window.location.reload(); 
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <button
              onClick={handleBackToMain}
              className="flex items-center text-emerald-600 hover:text-emerald-700 font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 rounded-md p-2"
            >
              <ChevronRight className="h-4 w-4 mr-1 rotate-180" />
              Back to Main Site
            </button>
            <div></div>
          </div>
        </div>
      </header>

      {/* FAQ Content */}
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h1>
          <p className="text-xl text-gray-600">Everything you need to know about Yala Mobile Camping</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
              <button
                onClick={() => toggleItem(index)}
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <h3 className="text-lg font-semibold text-gray-900 pr-4">{faq.question}</h3>
                {openItems.includes(index) ? (
                  <ChevronDown className="h-5 w-5 text-emerald-600 flex-shrink-0 transform transition-transform duration-200" />
                ) : (
                  <ChevronRight className="h-5 w-5 text-gray-400 flex-shrink-0 transform transition-transform duration-200" />
                )}
              </button>
              
              {openItems.includes(index) && (
                <div className="px-6 pb-4 border-t border-gray-100">
                  <div className="pt-4">
                    <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Contact Section */}
        <div className="mt-16 bg-emerald-600 rounded-lg p-8 text-center text-white">
          <h2 className="text-2xl font-bold mb-4">Still have questions?</h2>
          <p className="text-emerald-100 mb-6">Our team is here to help you plan the perfect safari adventure</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:+94713585926"
              className="bg-white text-emerald-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-300"
            >
              Call: +94 71 358 5926
            </a>
            <a
              href="mailto:info@yalamobilecamping.com"
              className="bg-emerald-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-emerald-800 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-300"
            >
              Email Us
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;