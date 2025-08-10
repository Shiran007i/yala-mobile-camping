
import React, { useState } from 'react';
import BookingForm from './BookingForm';
import BookingConfirmation from './BookingConfirmation';

const BookingManager = ({ selectedLocation }) => {
  const [bookingStep, setBookingStep] = useState('form'); // 'form' or 'confirmation'
  const [bookingDetails, setBookingDetails] = useState(null);

  const handleBookingComplete = (details) => {
    console.log('Booking completed:', details);
    setBookingDetails(details);
    setBookingStep('confirmation');
  };

  const handleBackToBooking = () => {
    setBookingStep('form');
    // Keep booking details in case user wants to go back and forth
  };

  const handleNewBooking = () => {
    setBookingDetails(null);
    setBookingStep('form');
    // Scroll to top for better UX
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Show confirmation page
  if (bookingStep === 'confirmation' && bookingDetails) {
    return (
      <BookingConfirmation
        bookingDetails={bookingDetails}
        onBackToBooking={handleBackToBooking}
        onNewBooking={handleNewBooking}
      />
    );
  }

  // Show booking form (default)
  return (
    <BookingForm
      selectedLocation={selectedLocation}
      onBookingComplete={handleBookingComplete}
    />
  );
};

export default BookingManager;