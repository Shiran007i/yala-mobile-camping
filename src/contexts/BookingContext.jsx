// Simple BookingContext.jsx - No backend dependency
import React, { createContext, useContext, useState } from 'react';

const BookingContext = createContext({});

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
};

export const BookingProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [lastBooking, setLastBooking] = useState(null);

  // Mock function to create a guest booking
  const createBooking = async (bookingData) => {
    setLoading(true);
    console.log('Simulating booking creation with data:', bookingData);

    // Simulate an API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    const newBooking = {
      ...bookingData,
      id: Math.random().toString(36).substr(2, 9),
      booking_reference: `YMC-${Date.now()}`,
      status: 'pending',
      created_at: new Date().toISOString()
    };

    console.log('✅ Mock booking created successfully:', newBooking);
    setLastBooking(newBooking);
    setLoading(false);
    return newBooking;
  };

  const value = {
    loading,
    lastBooking,
    createBooking,
  };

  return (
    <BookingContext.Provider value={value}>
      {children}
    </BookingContext.Provider>
  );
};
