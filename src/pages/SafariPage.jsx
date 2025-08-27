// src/pages/SafariPage.jsx
import React from 'react'
import { Helmet } from 'react-helmet-async'
import Header from '../components/Header'
import TabSections from '../components/TabSections'
import SafariActivitiesSection from '../components/SafariActivitiesSection'
import ImageGallery from '../components/ImageGallery'
import YalaWildlifeMap from '../components/YalaWildlifeMap'
import WhyChooseUsSection from '../components/WhyChooseUsSection'
import CallToActionSection from '../components/CallToActionSection'
import Footer from '../components/Footer'

const SafariPage = () => {
  return (
    <>
      <Helmet>
        <title>Safari Tours | Yala Mobile Camping</title>
        <meta name="description" content="Explore wildlife safari tours in Yala National Park. Spot leopards, elephants, and exotic birds with our expert guides." />
      </Helmet>
      
      <Header />
      <TabSections activeTab="safaris" />
      <ImageGallery activeTab="safaris" />
      <SafariActivitiesSection />
      <YalaWildlifeMap />
      <WhyChooseUsSection />
      <CallToActionSection />
      <Footer />
    </>
  )
}

export default SafariPage