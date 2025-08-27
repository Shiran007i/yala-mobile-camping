

// src/pages/AboutPage.jsx
import React from 'react'
import { Helmet } from 'react-helmet-async'
import Header from '../components/Header'
import AboutUsSection from '../components/AboutUsSection'
import WhyChooseUsSection from '../components/WhyChooseUsSection'
import TripAdvisorSection from '../components/TripAdvisorSection'
import Footer from '../components/Footer'

const AboutPage = () => {
  return (
    <>
      <Helmet>
        <title>About Us | Yala Mobile Camping</title>
        <meta name="description" content="Learn about Yala Mobile Camping's mission to provide exceptional wildlife experiences and eco-friendly camping solutions." />
      </Helmet>
      
      <Header />
      <AboutUsSection />
      <WhyChooseUsSection />
      <TripAdvisorSection />
      <Footer />
    </>
  )
}

export default AboutPage