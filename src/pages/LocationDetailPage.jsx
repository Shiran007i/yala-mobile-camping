// src/pages/LocationDetailPage.jsx
import React from 'react'
import { useParams } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import Header from '../components/Header'
import LocationDetail from '../components/LocationDetail'
import InteractiveMap from '../components/InteractiveMap'
import BookingManager from "../components/Booking/BookingManager";
import Footer from '../components/Footer'

const LocationDetailPage = () => {
  const { locationId } = useParams()
  
  return (
    <>
      <Helmet>
        <title>Location Details | Yala Mobile Camping</title>
        <meta name="description" content="Detailed information about specific camping locations in Yala National Park." />
      </Helmet>
      
      <Header />
      <LocationDetail locationId={locationId} />
      <InteractiveMap />
      <BookingManager locationId={locationId} />
      <Footer />
    </>
  )
}

export default LocationDetailPage