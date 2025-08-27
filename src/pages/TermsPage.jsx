// src/pages/TermsPage.jsx
import React from 'react'
import { Helmet } from 'react-helmet-async'
import Header from '../components/Header'
import Terms from '../components/Terms'
import Footer from '../components/Footer'

const TermsPage = () => {
  return (
    <>
      <Helmet>
        <title>Terms of Service | Yala Mobile Camping</title>
        <meta name="description" content="Read our terms of service for booking and using Yala Mobile Camping services." />
      </Helmet>
      
      <Header />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Terms of Service</h1>
        <Terms />
      </div>
      <Footer />
    </>
  )
}

export default TermsPage