
// src/pages/UnsubscribePage.jsx
import React from 'react'
import { Helmet } from 'react-helmet-async'
import Header from '../components/Header'
import Unsubscribe from '../components/Unsubscribe'
import Footer from '../components/Footer'

const UnsubscribePage = () => {
  return (
    <>
      <Helmet>
        <title>Unsubscribe | Yala Mobile Camping</title>
        <meta name="description" content="Unsubscribe from our mailing list." />
      </Helmet>
      
      <Header />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Unsubscribe</h1>
        <Unsubscribe />
      </div>
      <Footer />
    </>
  )
}

export default UnsubscribePage