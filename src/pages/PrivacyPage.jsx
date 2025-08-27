
// src/pages/PrivacyPage.jsx
import React from 'react'
import { Helmet } from 'react-helmet-async'
import Header from '../components/Header'
import Privacy from '../components/Privacy'
import Footer from '../components/Footer'

const PrivacyPage = () => {
  return (
    <>
      <Helmet>
        <title>Privacy Policy | Yala Mobile Camping</title>
        <meta name="description" content="Read our privacy policy to understand how we collect, use, and protect your personal information." />
      </Helmet>
      
      <Header />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Privacy Policy</h1>
        <Privacy />
      </div>
      <Footer />
    </>
  )
}

export default PrivacyPage