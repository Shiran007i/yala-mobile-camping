// 3. Create a new Router configuration file
// src/router/index.jsx
import { Routes, Route } from 'react-router-dom'
import HomePage from '../pages/HomePage'
import SafariPage from '../pages/SafariPage'
import CampingPage from '../pages/CampingPage'
import AboutPage from '../pages/AboutPage'
import TransportationPage from '../pages/TransportationPage'
import BookingPage from '../pages/BookingPage'
import LocationDetailPage from '../pages/LocationDetailPage'
import FAQPage from '../pages/FAQPage'
import PrivacyPage from '../pages/PrivacyPage'
import TermsPage from '../pages/TermsPage'
import UnsubscribePage from '../pages/UnsubscribePage'
import BlogPage from '../pages/BlogPage'
import NotFoundPage from '../pages/NotFoundPage'

const AppRouter = () => {
  return (
    <Routes>
      {/* Main pages */}
      <Route path="/" element={<HomePage />} />
      <Route path="/safaris" element={<SafariPage />} />
      <Route path="/camping" element={<CampingPage />} />
      <Route path="/about" element={<AboutPage />} />
      
      {/* Service pages */}
      <Route path="/transportation" element={<TransportationPage />} />
      <Route path="/book/:locationId?" element={<BookingPage />} />
      <Route path="/location/:locationId" element={<LocationDetailPage />} />
      
      {/* Content pages */}
      <Route path="/blog" element={<BlogPage />} />
      <Route path="/faq" element={<FAQPage />} />
      
      {/* Legal pages */}
      <Route path="/privacy" element={<PrivacyPage />} />
      <Route path="/terms" element={<TermsPage />} />
      <Route path="/unsubscribe" element={<UnsubscribePage />} />
      
      {/* 404 page */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}

export default AppRouter
