// src/pages/CampingPage.jsx
import React from 'react'
import { Helmet } from 'react-helmet-async'
import Header from '../components/Header'
import TabSections from '../components/TabSections'
import CampingSection from '../components/CampingSection'
import ImageGallery from '../components/ImageGallery'
import ServicesSection from '../components/ServicesSection'
import WhyChooseUsSection from '../components/WhyChooseUsSection'
import CallToActionSection from '../components/CallToActionSection'
import Footer from '../components/Footer'
import { SERVICES_DATA } from '../constants'

const CampingPage = () => {
  return (
    <>
      <Helmet>
        <title>Mobile Camping | Yala Mobile Camping</title>
        <meta name="description" content="Experience luxury mobile camping in Yala National Park with premium amenities and wildlife viewing opportunities." />
      </Helmet>
      
      <Header />
      <TabSections activeTab="camping" />
      <ImageGallery activeTab="camping" />
      <CampingSection />
      <ServicesSection services={SERVICES_DATA} />
      <WhyChooseUsSection />
      <CallToActionSection />
      <Footer />
    </>
  )
}

export default CampingPage