// Simple BookingContext.jsx - No authentication needed!
import React, { createContext, useContext, useState } from 'react';
import { supabase } from '../lib/supabase';

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

  // Create a guest booking - simple and straightforward
  const createBooking = async (bookingData) => {
    setLoading(true);
    try {
      console.log('Creating guest booking:', bookingData);
      
      const { data, error } = await supabase
        .from("bookings")
        .insert([{
          ...bookingData,
          status: 'pending',
          created_at: new Date().toISOString()
        }])
        .select()
        .single();

      if (error) {
        console.error("Error creating booking:", error);
        throw error;
      }
      
      console.log('✅ Booking created successfully:', data);
      setLastBooking(data);
      
      return data;
      
    } catch (error) {
      console.error("❌ Booking creation failed:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Send booking confirmation email (you can integrate with your email service)
  const sendBookingConfirmation = async (booking) => {
    try {
      // You can integrate with services like:
      // - EmailJS for client-side emails
      // - Supabase Edge Functions for server-side emails
      // - External email services
      
      console.log('📧 Sending booking confirmation to:', booking.email);
      console.log('🎫 Booking reference:', booking.booking_reference);
      
      // For now, just log the booking details
      // You'll handle actual email sending through your preferred method
      
      return true;
    } catch (error) {
      console.error('❌ Failed to send confirmation email:', error);
      return false;
    }
  };

  // Generate WhatsApp message for booking
  const generateWhatsAppMessage = (booking) => {
    const message = `
🏕️ *New Yala Mobile Camping Booking*

📋 *Booking Details:*
• Reference: ${booking.booking_reference}
• Name: ${booking.first_name} ${booking.last_name}
• Email: ${booking.email}
• Phone: ${booking.phone}
• Dates: ${booking.check_in} to ${booking.check_out}
• Group Size: ${booking.group_size} people
• Accommodation: ${booking.accommodation_type}
• Meal Plan: ${booking.meal_plan}
• Total Cost: $${booking.total_cost}

💬 *Special Requests:*
${booking.special_requests || 'None'}

Please confirm availability and send payment details.
    `.trim();
    
    return encodeURIComponent(message);
  };

  // Send booking to WhatsApp (opens WhatsApp with pre-filled message)
  const sendToWhatsApp = (booking, phoneNumber = '+94771234567') => {
    const message = generateWhatsAppMessage(booking);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };

  // Check booking status by reference number (optional feature)
  const checkBookingStatus = async (bookingReference) => {
    try {
      const { data, error } = await supabase
        .from('bookings')
        .select('*')
        .eq('booking_reference', bookingReference)
        .single();
        
      if (error) throw error;
      
      return data;
    } catch (error) {
      console.error('Error checking booking status:', error);
      return null;
    }
  };

  const value = {
    loading,
    lastBooking,
    createBooking,
    sendBookingConfirmation,
    sendToWhatsApp,
    checkBookingStatus,
    generateWhatsAppMessage
  };

  return (
    <BookingContext.Provider value={value}>
      {children}
    </BookingContext.Provider>
  );
};