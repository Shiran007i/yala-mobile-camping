import React, { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link, useNavigate } from 'react-router-dom'

// Import existing components
import Header from '../components/Header'
import TabSections from '../components/TabSections'
import ImageGallery from '../components/ImageGallery'
import CampingSection from '../components/CampingSection'
import SafariActivitiesSection from '../components/SafariActivitiesSection'
import AboutUsSection from '../components/AboutUsSection'
import YalaWildlifeMap from '../components/YalaWildlifeMap'
import ServicesSection from '../components/ServicesSection'
import WhyChooseUsSection from '../components/WhyChooseUsSection'
import TripAdvisorSection from '../components/TripAdvisorSection'
import CallToActionSection from '../components/CallToActionSection'
import Footer from '../components/Footer'
import { SERVICES_DATA } from '../constants'

const HomePage = () => {
  const [activeTab, setActiveTab] = useState('camping')
  const navigate = useNavigate()

  const handleBookNow = (locationId = '2') => {
    navigate(`/book/${locationId}`)
  }

  const handleWhatsAppContact = () => {
    const phoneNumber = "+94713585926"
    const message = encodeURIComponent("Hi! I'm interested in booking a safari camping experience at Yala National Park.")
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank')
  }

  const handleNavigation = (path) => {
    navigate(path)
  }

  // Function to render content based on active tab
  const renderTabContent = () => {
    switch (activeTab) {
      case 'safaris':
        return (
          <>
            <ImageGallery activeTab={activeTab} />
            <SafariActivitiesSection onInquireNow={() => handleBookNow()} />
          </>
        )
      case 'camping':
        return (
          <>
            <ImageGallery activeTab={activeTab} />
            <CampingSection onInquireNow={() => handleBookNow()} />
          </>
        )
      case 'about':
        return (
          <>
            <AboutUsSection />
          </>
        )
      default:
        return (
          <>
            <ImageGallery activeTab={activeTab} />
            <CampingSection onInquireNow={() => handleBookNow()} />
          </>
        )
    }
  }

  return (
    <>
      <Helmet>
        <title>Yala Mobile Camping | Premium Safari & Wildlife Camping Experience in Sri Lanka</title>
        <meta name="description" content="Experience luxury mobile camping in Yala National Park, Sri Lanka. Witness leopards, elephants & exotic wildlife. Book your adventure today!" />
        <meta name="keywords" content="Yala National Park, mobile camping Sri Lanka, safari camping, wildlife viewing, leopard spotting, eco-tourism, luxury camping" />
        <link rel="canonical" href="https://yalamobilecamping.com/" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Yala Mobile Camping | Premium Safari & Wildlife Camping Experience in Sri Lanka" />
        <meta property="og:description" content="Experience luxury mobile camping in Yala National Park, Sri Lanka. Witness leopards, elephants & exotic wildlife. Book your adventure today!" />
        <meta property="og:url" content="https://yalamobilecamping.com/" />
        <meta property="og:type" content="website" />
        
        {/* JSON-LD Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "TravelAgency",
            "name": "Yala Mobile Camping",
            "url": "https://yalamobilecamping.com",
            "description": "Premium mobile camping experience in Sri Lanka's most famous national park",
            "address": {
              "@type": "PostalAddress",
              "addressCountry": "LK",
              "addressRegion": "Southern Province",
              "addressLocality": "Tissamaharama"
            },
            "telephone": "+94713585926",
            "email": "info@yalamobilecamping.com"
          })}
        </script>
      </Helmet>

      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onNavigate={handleNavigation}
        onInquireNow={() => handleBookNow()}
      />
      
      <TabSections activeTab={activeTab} />
      
      {renderTabContent()}
      
      <YalaWildlifeMap />
      <ServicesSection services={SERVICES_DATA} />
      <WhyChooseUsSection />
      <TripAdvisorSection />
      <CallToActionSection
        onBookNow={handleBookNow}
        onWhatsAppContact={handleWhatsAppContact}
      />
      
      <Footer onNavigate={handleNavigation} />
    </>
  )
}

export default HomePage