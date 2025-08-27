
// src/pages/FAQPage.jsx
import React from 'react'
import { Helmet } from 'react-helmet-async'
import Header from '../components/Header'
import FAQ from '../components/FAQ'
import Footer from '../components/Footer'

const FAQPage = () => {
  return (
    <>
      <Helmet>
        <title>Frequently Asked Questions | Yala Mobile Camping</title>
        <meta name="description" content="Find answers to common questions about Yala National Park camping, safari tours, and booking procedures." />
      </Helmet>
      
      <Header />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Frequently Asked Questions</h1>
        <FAQ />
      </div>
      <Footer />
    </>
  )
}

export default FAQPage