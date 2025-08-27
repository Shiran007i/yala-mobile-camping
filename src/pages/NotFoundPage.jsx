// src/pages/NotFoundPage.jsx
import React from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import Header from '../components/Header'
import Footer from '../components/Footer'

const NotFoundPage = () => {
  return (
    <>
      <Helmet>
        <title>Page Not Found | Yala Mobile Camping</title>
        <meta name="description" content="The page you're looking for doesn't exist." />
      </Helmet>
      
      <Header />
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-600 mb-8">Page Not Found</h2>
        <p className="text-gray-500 mb-8">The page you're looking for doesn't exist.</p>
        <Link 
          to="/" 
          className="inline-block bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
        >
          Return Home
        </Link>
      </div>
      <Footer />
    </>
  )
}

export default NotFoundPage