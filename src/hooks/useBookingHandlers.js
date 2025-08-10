// src/hooks/useBookingHandlers.js
import { useState, useCallback } from 'react';
import { WHATSAPP_NUMBER } from '../constants';

export const useBookingHandlers = (locations) => {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [showLocationDetail, setShowLocationDetail] = useState(false);

  const handleBookNow = useCallback((location = null) => {
    const locationToBook = location || locations[0];
    setSelectedLocation(locationToBook);
    setShowLocationDetail(false);
    setShowBookingForm(true);
  }, [locations]);

  const handleWhatsAppContact = useCallback(() => {
    const message = `Hi! I'm interested in booking a Yala Mobile Camping experience. Could you please provide more information about availability and pricing?

I'd like to know more about:
🏕️ Yala Mobile Camp
📅 Available dates
💰 Pricing details
👥 Group size options

Thank you!`;

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
  }, []);

  const handleBookingComplete = useCallback((bookingData) => {
    setShowBookingForm(false);
    setShowLocationDetail(false);
    setSelectedLocation(null);
    alert("Booking submitted successfully! We will contact you soon.");
  }, []);

  return {
    selectedLocation,
    showBookingForm,
    showLocationDetail,
    handleBookNow,
    handleWhatsAppContact,
    handleLocationSelect,
    handleBackToLocations,
    handleBookingComplete,
  };
};