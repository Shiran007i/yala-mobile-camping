
// src/pages/TransportationPage.jsx
import React from 'react'
import { Helmet } from 'react-helmet-async'
import Header from '../components/Header'
import Transportation from '../components/Transportation'
import CallToActionSection from '../components/CallToActionSection'
import Footer from '../components/Footer'

const TransportationPage = () => {
  return (
    <>
      <Helmet>
        <title>Transportation Services | Yala Mobile Camping</title>
        <meta name="description" content="Convenient transportation services to Yala National Park. Safe, comfortable, and reliable transfers for your safari adventure." />
      </Helmet>
      
      <Header />
      <Transportation />
      <CallToActionSection />
      <Footer />
    </>
  )
}

export default TransportationPage