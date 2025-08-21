import React, { useEffect } from "react";
import { Helmet } from "react-helmet";

const TripAdvisorSection = () => {
  useEffect(() => {
    // Load TripAdvisor widget script
    const script = document.createElement('script');
    script.src = "https://www.jscache.com/wejs?wtype=selfserveprop&uniq=196&locationId=33411134&lang=en_US&rating=true&nreviews=5&writereviewlink=true&popIdx=true&iswide=false&border=true&display_version=2";
    script.async = true;
    script.setAttribute('data-loadtrk', '');
    script.onload = function() { this.loadtrk = true; };
    
    // Find the widget container and append script
    const widgetContainer = document.getElementById('TA_selfserveprop196');
    if (widgetContainer && !document.querySelector('script[src*="jscache.com/wejs"]')) {
      document.body.appendChild(script);
    }

    return () => {
      // Cleanup script on component unmount
      const existingScript = document.querySelector('script[src*="jscache.com/wejs"]');
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, []);

  return (
    <>
      <Helmet>
        <title>TripAdvisor Reviews | Yala Mobile Camping and Safari</title>
        <meta
          name="description"
          content="See what guests say about Yala Mobile Camping and Safari on TripAdvisor. Read reviews and testimonials for our Yala National Park camping and safari experiences."
        />
        <meta
          name="keywords"
          content="yala mobile camping reviews, tripadvisor yala safari, sri lanka camping testimonials, yala national park reviews"
        />
        <meta
          property="og:title"
          content="TripAdvisor Reviews | Yala Mobile Camping and Safari"
        />
        <meta
          property="og:description"
          content="Read TripAdvisor reviews for Yala Mobile Camping and Safari in Yala National Park, Sri Lanka."
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:image"
          content="https://yalamobilecamping.com/og-tripadvisor.webp"
        />
        <link
          rel="canonical"
          href="https://yalamobilecamping.com/tripadvisor"
        />
      </Helmet>
      
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-8">
            Guest Reviews & Testimonials
          </h2>
          <p className="text-lg text-gray-700 mb-12">
            See what our guests say about their unforgettable Yala National Park experiences
          </p>
          
          {/* TripAdvisor Widget Container */}
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-2xl mx-auto">
            <div 
              id="TA_selfserveprop196" 
              className="TA_selfserveprop"
            >
              <ul id="nChCmYW" className="TA_links 54hvDX">
                <li id="SjiuOuTA" className="0hm7RbRKiS">
                  <a 
                    target="_blank" 
                    href="https://www.tripadvisor.com/Attraction_Review-g19899440-d33411134-Reviews-Yala_Mobile_Camping-Yala_Southern_Province.html"
                    rel="noopener noreferrer"
                  >
                    <img 
                      src="https://www.tripadvisor.com/img/cdsi/img2/branding/v2/Tripadvisor_lockup_horizontal_secondary_registered-11900-2.svg" 
                      alt="TripAdvisor"
                      className="h-8 mx-auto"
                    />
                  </a>
                </li>
              </ul>
            </div>
          </div>
          
          {/* Call to Action */}
          <div className="mt-8">
            <a
              href="https://www.tripadvisor.com/Attraction_Review-g19899440-d33411134-Reviews-Yala_Mobile_Camping-Yala_Southern_Province.html"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors duration-200"
            >
              View All Reviews on TripAdvisor
              <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>
        </div>
      </section>
    </>
  );
};

export default TripAdvisorSection;
