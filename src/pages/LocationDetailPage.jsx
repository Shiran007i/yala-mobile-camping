// src/pages/LocationDetailPage.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import LocationDetail from '../components/LocationDetail';
import { useBookingUI } from '../contexts/BookingUIContext';
import SEO from '../components/SEO.jsx';

const LocationDetailPage = () => {
  const { locationId } = useParams();
  const { locations, handleBookNow, handleBackToLocations } = useBookingUI();
  const [location, setLocation] = useState(null);

  useEffect(() => {
    const foundLocation = locations.find(loc => loc.id === parseInt(locationId));
    if (foundLocation) {
      setLocation(foundLocation);
      // Optionally, set this as the selected location in context if it's the primary way to view details
      // handleLocationSelect(foundLocation); // Uncomment if you want to set it in context on direct access
    } else {
      // Handle case where location is not found (e.g., redirect to 404 or locations page)
      console.error("Location not found for ID:", locationId);
      // navigate('/404'); // Example: if you have a navigate hook
    }
  }, [locationId, locations]);

  if (!location) {
    return <div className="text-center py-20">Loading location details...</div>; // Or a proper loading spinner
  }

  const pageTitle = `${location.name} | Yala Mobile Camping`;
  const pageDescription = `Explore ${location.name} in ${location.location}. ${location.description}`; // Use location.description
  const pageKeywords = `${location.name}, ${location.location}, safari camping, wildlife tours`;

  return (
    <>
      <SEO
        title={pageTitle}
        description={pageDescription}
        keywords={pageKeywords}
        canonical={`https://yalamobilecamping.com/location/${location.id}`}
      />
      <LocationDetail
        location={location}
        onBackToLocations={handleBackToLocations}
        onBookNow={handleBookNow}
      />
    </>
  );
};

export default LocationDetailPage;
