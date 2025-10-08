// Updated Privacy.jsx - With Navigation Props and Scroll to Top
import React, { useEffect } from 'react';
import { ChevronRight } from 'lucide-react';

const Privacy = ({ onBackToMain }) => {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, []);

  const handleBackClick = () => {
    if (onBackToMain) {
      onBackToMain();
    } else {
      window.history.pushState(null, '', '/');
      window.location.reload(); 
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <button
              onClick={handleBackClick}
              className="flex items-center text-emerald-600 hover:text-emerald-700 font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 rounded-md p-2"
            >
              <ChevronRight className="h-4 w-4 mr-1 rotate-180" />
              Back to Main Site
            </button>
            <div></div>
          </div>
        </div>
      </header>

      {/* Privacy Policy Content */}
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="bg-white rounded-lg shadow-md p-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Privacy Policy</h1>
          <p className="text-sm text-gray-600 mb-8">Last updated: August 2025</p>

          <div className="prose max-w-none">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Information We Collect</h2>
            <p className="text-gray-700 mb-6">
              We collect information you provide when booking tours, subscribing to newsletters, or contacting us. 
              This includes your name, email, phone number, booking preferences, and any special requirements you may have.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">How We Use Your Information</h2>
            <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
              <li>Process your safari and camping bookings</li>
              <li>Send booking confirmations and updates</li>
              <li>Provide customer support and respond to inquiries</li>
              <li>Send promotional emails and newsletters (with your consent)</li>
              <li>Improve our services and customer experience</li>
              <li>Comply with legal obligations</li>
              <li>Ensure safety and security of our guests</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Information Sharing</h2>
            <p className="text-gray-700 mb-6">
              We do not sell, trade, or rent your personal information to third parties. We may share your information with 
              trusted service providers who assist in operating our business, conducting tours, or servicing you, such as:
            </p>
            <ul className="list-disc list-inside text-gray-700 mb-6 space-y-1">
              <li>Local guides and safari operators</li>
              <li>Transportation providers</li>
              <li>Accommodation partners</li>
              <li>Payment processors</li>
              <li>Emergency services when necessary</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Data Security</h2>
            <p className="text-gray-700 mb-6">
              We implement appropriate security measures to protect your personal information against unauthorized access, 
              alteration, disclosure, or destruction. However, no internet transmission is 100% secure, and we cannot 
              guarantee absolute security.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Your Rights</h2>
            <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
              <li>Access your personal data</li>
              <li>Correct inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Unsubscribe from marketing emails</li>
              <li>Object to data processing</li>
              <li>Request data portability</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Cookies and Tracking</h2>
            <p className="text-gray-700 mb-6">
              We use cookies and similar technologies to improve your browsing experience, analyze website traffic, 
              and understand user preferences. You can control cookie settings through your browser preferences.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Data Retention</h2>
            <p className="text-gray-700 mb-6">
              We retain your personal information for as long as necessary to provide our services and comply with 
              legal obligations. Booking information is typically retained for 7 years for tax and legal compliance.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Contact Information</h2>
            <p className="text-gray-700 mb-4">For questions about this privacy policy or to exercise your rights, contact us:</p>
            <div className="bg-gray-50 p-4 rounded-lg">
              <ul className="list-none text-gray-700 space-y-2">
                <li><strong>Email:</strong> info@yalamobilecamping.com</li>
                <li><strong>Phone:</strong> +94 716335000</li>
                <li><strong>Address:</strong> No-795/6, Wilhelm Garden, Welipillewa, Dadigamuwa, Sri Lanka</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Privacy;