// Updated Terms.jsx - With Navigation Props and Scroll to Top
import React, { useEffect } from 'react';
import { ChevronRight } from 'lucide-react';

const Terms = ({ onBackToMain }) => {
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

      {/* Terms Content */}
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="bg-white rounded-lg shadow-md p-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Terms of Service</h1>
          <p className="text-sm text-gray-600 mb-8">Last updated: August 2025</p>

          <div className="prose max-w-none">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Acceptance of Terms</h2>
            <p className="text-gray-700 mb-6">
              By booking our services or using our website, you agree to these terms and conditions. 
              Please read them carefully before making a reservation.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Booking and Payment</h2>
            <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
              <li>Full payment is required to confirm your booking</li>
              <li>Prices are quoted in USD and may change without notice</li>
              <li>Payment can be made via bank transfer or cash upon arrival</li>
              <li>Booking confirmation will be sent within 24 hours of payment</li>
              <li>Group bookings may require different payment terms</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Cancellation Policy</h2>
            <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
              <li>Cancellations must be made 48 hours in advance for full refund</li>
              <li>Cancellations within 48 hours are subject to 50% charge</li>
              <li>Weather-related cancellations will receive full refund or reschedule option</li>
              <li>No-shows are non-refundable</li>
              <li>We reserve the right to cancel tours due to safety concerns</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Safari and Camping Rules</h2>
            <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
              <li>Follow all national park regulations and guide instructions</li>
              <li>No littering or disturbing wildlife</li>
              <li>Maintain safe distances from animals at all times</li>
              <li>No smoking in vehicles or tents</li>
              <li>Alcohol consumption only in designated areas after safari hours</li>
              <li>Quiet hours from 10 PM to 6 AM</li>
              <li>Children must be supervised at all times</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Health and Safety</h2>
            <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
              <li>Participants must disclose any medical conditions at time of booking</li>
              <li>Travel insurance is strongly recommended</li>
              <li>We provide first aid but are not responsible for medical emergencies</li>
              <li>Participants engage in activities at their own risk</li>
              <li>Minimum age for camping is 8 years</li>
              <li>Pregnant women should consult their doctor before participating</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">What's Included</h2>
            <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
              <li>Safari tent accommodation</li>
              <li>All meals (breakfast, lunch, dinner)</li>
              <li>Professional safari guide</li>
              <li>Safari vehicle with fuel</li>
              <li>Park entrance fees</li>
              <li>Camping equipment and bedding</li>
              <li>Basic first aid kit</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">What's Not Included</h2>
            <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
              <li>Transportation to/from the park (available separately)</li>
              <li>Personal travel insurance</li>
              <li>Alcoholic beverages</li>
              <li>Personal expenses and souvenirs</li>
              <li>Gratuities for guides</li>
              <li>Photography equipment</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Limitation of Liability</h2>
            <p className="text-gray-700 mb-6">
              Yala Mobile Camping is not liable for injuries, losses, or damages that may occur during your 
              safari or camping experience. We maintain insurance but recommend all participants have their 
              own comprehensive travel insurance. Our liability is limited to the amount paid for the tour.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Wildlife Viewing</h2>
            <p className="text-gray-700 mb-6">
              While we maintain high success rates for wildlife sightings (85% for leopards), we cannot 
              guarantee specific animal encounters as wildlife behavior is unpredictable. No refunds will 
              be given based on wildlife sighting outcomes.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Force Majeure</h2>
            <p className="text-gray-700 mb-6">
              We are not liable for any failure to perform due to circumstances beyond our control, including 
              but not limited to natural disasters, government actions, terrorism, or pandemic restrictions.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Changes to Terms</h2>
            <p className="text-gray-700 mb-6">
              We reserve the right to modify these terms at any time. Changes will be posted on our website 
              and apply to all bookings made after the posting date.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Contact Information</h2>
            <p className="text-gray-700 mb-4">For questions about these terms, contact us:</p>
            <div className="bg-gray-50 p-4 rounded-lg">
              <ul className="list-none text-gray-700 space-y-2">
                <li><strong>Email:</strong> info@yalamobilecamping.com</li>
                <li><strong>Phone:</strong> +94 716335000</li>
                <li><strong>Address:</strong> No-795/6, Wilhelm Garden, Welipillewa, Dadigamuwa, Sri Lanka</li>
                <li><strong>Emergency Contact:</strong> +94 716335000 (24/7)</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Terms;