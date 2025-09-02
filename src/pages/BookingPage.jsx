// src/pages/BookingPage.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import BookingManager from '../components/Booking/BookingManager';
import { useBookingUI } from '../contexts/BookingUIContext';
import SEO from '../components/SEO.jsx';
import { Header, Footer } from '../components'; // Import Header and Footer
import { ChevronRight } from 'lucide-react';

const BookingPage = () => {
  const { locationId } = useParams();
  const navigate = useNavigate();
  const { locations, selectedLocation, handleLocationSelect, handleBackToLocations } = useBookingUI();
  const [currentLocation, setCurrentLocation] = useState(null);

  useEffect(() => {
    if (selectedLocation) {
      setCurrentLocation(selectedLocation);
    } else if (locationId) {
      const foundLocation = locations.find(loc => loc.id === parseInt(locationId));
      if (foundLocation) {
        setCurrentLocation(foundLocation);
        handleLocationSelect(foundLocation); // Set it in context for consistency
      } else {
        // Location ID in URL but not found in data
        navigate('/404'); // Redirect to 404 page
      }
    } else {
      // No selectedLocation and no locationId in URL, so no location to book
      // This is the case for /book without any ID or prior selection
      navigate('/'); // Redirect to home or locations page
    }
  }, [locationId, selectedLocation, locations, navigate, handleLocationSelect, handleBackToLocations]);

  if (!currentLocation) {
    // Show a loading state or nothing while location is being determined/redirected
    return <div className="text-center py-20">Loading booking details...</div>;
  }

  return (
    <>
      <SEO
        title={`Book ${currentLocation.name} | Yala Mobile Camping`}
        description={`Complete your booking for a memorable stay at ${currentLocation.name}.`}
      />

      <div className="min-h-screen bg-gray-50">
        {/* Simple Header for Booking Page */}
        <header className="bg-white shadow-sm sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              <button
                onClick={handleBackToLocations} // Use handleBackToLocations from context
                className="flex items-center text-emerald-600 hover:text-emerald-700 font-medium transition-colors"
              >
                <ChevronRight className="h-4 w-4 mr-1 rotate-180" />
                Back to Locations
              </button>
              <div></div> {/* Spacer for flex layout */}
            </div>
          </div>
        </header>

        <div className="container mx-auto px-4 py-8">
          <BookingManager selectedLocation={currentLocation} />
        </div>

        <Footer />
      </div>
    </>
  );
};

export default BookingPage;
