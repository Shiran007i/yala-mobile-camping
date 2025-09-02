import React, { createContext, useState, useCallback, useContext, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { WHATSAPP_NUMBER } from '../constants';
import camp3 from "../assets/images/camp3.webp";

const BookingUIContext = createContext();

export const useBookingUI = () => useContext(BookingUIContext);

export const BookingUIProvider = ({ children }) => {
  const navigate = useNavigate();
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [showLocationDetail, setShowLocationDetail] = useState(false);

  const locations = useMemo(
    () => [
      {
        id: 2,
        name: "Yala Mobile Camp",
        location: "Yala National Park",
        coordinates: [6.3725, 81.5185],
        price_per_per_night: 700,
        rating: 4.9,
        max_guests: 10,
        image_url: camp3,
        description:
          "An exclusive camping experience inside the heart of Yala jungle. For $700 (per 2 persons), enjoy full-board meals, a full-day guided safari, and one night in our comfortable safari tents — surrounded by the raw sights and sounds of the wild.",
      },
    ],
    []
  );

  const handleBookNow = useCallback((location = null) => {
    const locationToBook = location || locations[0];
    setSelectedLocation(locationToBook);
    setShowLocationDetail(false);
    setShowBookingForm(true);
    navigate('/book'); // Navigate to the booking page
  }, [locations, navigate]);

  const handleWhatsAppContact = useCallback(() => {
    const message = `Hi! I'm interested in booking a Yala Mobile Camping experience. Could you please provide more information about availability and pricing?`;
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  }, []);

  const handleLocationSelect = useCallback((location) => {
    setSelectedLocation(location);
    setShowLocationDetail(true);
  }, []);

  const handleBackToLocations = useCallback(() => {
    setShowLocationDetail(false);
    setShowBookingForm(false);
    setSelectedLocation(null);
    navigate('/'); // Navigate back to home/locations page
  }, [navigate]);

  const handleBookingComplete = useCallback((bookingData) => {
    setShowBookingForm(false);
    setShowLocationDetail(false);
    setSelectedLocation(null);
    alert("Booking submitted successfully! We will contact you soon.");
    navigate('/'); // Navigate back to home after booking
  }, [navigate]);

  const value = {
    locations,
    selectedLocation,
    showBookingForm,
    showLocationDetail,
    handleBookNow,
    handleWhatsAppContact,
    handleLocationSelect,
    handleBackToLocations,
    handleBookingComplete,
  };

  return (
    <BookingUIContext.Provider value={value}>
      {children}
    </BookingUIContext.Provider>
  );
};