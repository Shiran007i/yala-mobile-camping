// src/layouts/MainLayout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header, Footer, FloatingActionButtons } from '../components';
import { useBookingUI } from '../contexts/BookingUIContext';

const MainLayout = () => {
  const { handleBookNow, handleWhatsAppContact } = useBookingUI();

  return (
    <div className="min-h-screen bg-white">
      <FloatingActionButtons
        onBookNow={() => handleBookNow()}
        onWhatsAppContact={handleWhatsAppContact}
      />
      <Header onInquireNow={() => handleBookNow()} />
      <main id="main-content" role="main">
        <Outlet /> {/* Child pages will render here */}
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
