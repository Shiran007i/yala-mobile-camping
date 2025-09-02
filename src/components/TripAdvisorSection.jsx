import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";

const TripAdvisorSection = () => {
  const [widgetLoaded, setWidgetLoaded] = useState(false);

  useEffect(() => {
    // Clean up any existing TripAdvisor scripts
    const existingScript = document.querySelector('script[src*="jscache.com/wejs"]');
    if (existingScript) {
      existingScript.remove();
    }

    // Load TripAdvisor widget script with correct location ID
    const script = document.createElement('script');
    script.src = "https://www.jscache.com/wejs?wtype=selfserveprop&uniq=196&locationId=33411755&lang=en_US&rating=true&nreviews=5&writereviewlink=true&popIdx=true&iswide=true&border=true&display_version=2";
    script.async = true;
    script.setAttribute('data-loadtrk', '');
    
    script.onload = function() { 
      this.loadtrk = true;
      setWidgetLoaded(true);
    };

    script.onerror = function() {
      console.error('Failed to load TripAdvisor widget');
      setWidgetLoaded(false);
    };
    
    // Append script to document body
    document.body.appendChild(script);

    return () => {
      // Cleanup script on component unmount
      const scriptToRemove = document.querySelector('script[src*="jscache.com/wejs"]');
      if (scriptToRemove) {
        scriptToRemove.remove();
      }
    };
  }, []);

  return (
    <>
      <Helmet>
        <title>TripAdvisor Reviews | Yala Mobile Camping and Safari</title>
        <meta
          name="description"
          content="See what guests say about Yala Mobile Camping and Safari on TripAdvisor. Read authentic reviews and testimonials for our Yala National Park camping and safari experiences."
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
          content="Read authentic TripAdvisor reviews for Yala Mobile Camping and Safari in Yala National Park, Sri Lanka."
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
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Guest Reviews & Testimonials
            </h2>
            <p className="text-lg text-gray-700 mb-8 max-w-3xl mx-auto">
              Don't just take our word for it - see what our guests say about their authentic 
              Yala National Park camping and safari experiences on TripAdvisor
            </p>
            
            {/* TripAdvisor Branding */}
            <div className="flex justify-center items-center mb-8">
              <img 
                src="https://www.tripadvisor.com/img/cdsi/img2/branding/v2/Tripadvisor_lockup_horizontal_secondary_registered-11900-2.svg" 
                alt="TripAdvisor"
                className="h-10"
              />
              <span className="ml-4 text-2xl font-bold text-gray-700">Reviews</span>
            </div>
          </div>

          {/* Main TripAdvisor Widget Container */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            {/* Loading State */}
            {!widgetLoaded && (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
                <p className="text-gray-600 text-lg">Loading authentic TripAdvisor reviews...</p>
                <p className="text-gray-500 text-sm mt-2">Fetching real guest experiences</p>
              </div>
            )}
            
            {/* TripAdvisor Widget */}
            <div 
              id="TA_selfserveprop196" 
              className="TA_selfserveprop"
              style={{ minHeight: widgetLoaded ? 'auto' : '300px' }}
            >
              <ul id="nChCmYW" className="TA_links">
                <li id="SjiuOuTA">
                  <a 
                    target="_blank" 
                    href="https://www.tripadvisor.com/Hotel_Review-g612381-d33411755-Reviews-Yala_Mobile_Camping-Yala_National_Park.html"
                    rel="noopener noreferrer"
                    className="block text-center p-4 hover:bg-gray-50 rounded-lg transition-colors duration-200"
                  >
                    <span className="text-green-600 font-semibold">View on TripAdvisor</span>
                  </a>
                </li>
              </ul>
            </div>

            {/* Fallback if widget fails to load */}
            {widgetLoaded === false && (
              <div className="text-center py-8 border-2 border-dashed border-gray-300 rounded-lg">
                <p className="text-gray-600 mb-4">
                  Unable to load reviews widget. View our reviews directly on TripAdvisor:
                </p>
                <a
                  href="https://www.tripadvisor.com/Hotel_Review-g612381-d33411755-Reviews-Yala_Mobile_Camping-Yala_National_Park.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors duration-200"
                >
                  Read Our Reviews
                  <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            )}
          </div>

          {/* Additional Information */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Why TripAdvisor Reviews Matter
              </h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-green-600 mt-0.5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Authentic reviews from verified guests
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-green-600 mt-0.5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Unbiased feedback and ratings
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-green-600 mt-0.5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Recent experiences and photos
                </li>
              </ul>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Share Your Experience
              </h3>
              <p className="text-gray-700 mb-4">
                Have you stayed with us? We'd love to hear about your Yala adventure! 
                Your review helps other travelers discover our unique mobile camping experience.
              </p>
              <a
                href="https://www.tripadvisor.com/Hotel_Review-g612381-d33411755-Reviews-Yala_Mobile_Camping-Yala_National_Park.html"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-green-600 font-semibold hover:text-green-700 transition-colors duration-200"
              >
                Write a Review
                <svg className="ml-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
              </a>
            </div>
          </div>
          
          {/* Main Call to Action */}
          <div className="text-center bg-gradient-to-r from-green-600 to-green-700 rounded-xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">
              Ready for Your Own Yala Adventure?
            </h3>
            <p className="text-green-100 mb-6 max-w-2xl mx-auto">
              Join hundreds of satisfied guests who have experienced the magic of Yala National Park 
              with our authentic mobile camping safari.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://www.tripadvisor.com/Hotel_Review-g612381-d33411755-Reviews-Yala_Mobile_Camping-Yala_National_Park.html"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 bg-white text-green-700 font-semibold rounded-lg hover:bg-gray-100 transition-colors duration-200"
              >
                Read All Reviews
                <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
              {/* <a
                href="/book-now"
                className="inline-flex items-center px-6 py-3 bg-yellow-500 text-green-900 font-semibold rounded-lg hover:bg-yellow-400 transition-colors duration-200"
              >
                Book Your MobileCamping
                <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a1 1 0 011-1h6a1 1 0 011 1v4h3a1 1 0 011 1v8a1 1 0 01-1 1H5a1 1 0 01-1-1V8a1 1 0 011-1h3z" />
                </svg>
              </a> */}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default TripAdvisorSection;
