// Updated Footer.jsx - Path-based Navigation for SEO
import React, { useState } from 'react';
import { Mail, Phone, MapPin, Facebook, Instagram, Twitter } from 'lucide-react';
import { WHATSAPP_NUMBER, COMPANY_PHONE, COMPANY_EMAIL } from '../constants';

const Footer = ({ onNavigate }) => {
  const [email, setEmail] = useState('');
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [subscribeMessage, setSubscribeMessage] = useState('');

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    
    if (!email.trim()) {
      setSubscribeMessage('Please enter a valid email address');
      return;
    }

    setIsSubscribing(true);
    setSubscribeMessage('');

    try {
      const response = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email.trim(),
          source: 'footer_newsletter',
          timestamp: new Date().toISOString(),
        }),
      });

      const data = await response.json();
      
      if (data.success) {
        setSubscribeMessage('Thank you for subscribing! Check your email for confirmation.');
        setEmail('');
      } else {
        setSubscribeMessage(data.message || 'Something went wrong. Please try again.');
      }
    } catch (error) {
      console.error('Newsletter subscription error:', error);
      setSubscribeMessage('Network error. Please try again later.');
    } finally {
      setIsSubscribing(false);
    }
  };

  // Handle navigation with proper URL updates
  const handleNavClick = (page, e) => {
    e.preventDefault();
    
    if (onNavigate) {
      onNavigate(page);
    } else {
      // Fallback for direct URL navigation
      const newPath = page === "main" ? "/" : `/${page}`;
      window.history.pushState({ page }, '', newPath);
      window.location.reload();
    }
  };

  return (
    <footer className="bg-slate-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 lg:col-span-2">
            <div className="mb-6">
              <h3 className="text-2xl font-bold mb-2">Yala Mobile Camping</h3>
              <p className="text-slate-300 mb-4">
                Experience the wild like never before. Premium mobile camping adventures 
                in Sri Lanka's most iconic national park.
              </p>
            </div>

            {/* Newsletter Signup */}
            <div className="mb-6">
              <h4 className="text-lg font-semibold mb-3">Stay Updated</h4>
              <p className="text-slate-400 mb-3 text-sm">
                Get exclusive offers, wildlife updates, and adventure tips
              </p>
              <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-1 px-3 py-2 bg-slate-700 text-white border border-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  disabled={isSubscribing}
                />
                <button
                  type="submit"
                  disabled={isSubscribing}
                  className="bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-600 disabled:cursor-not-allowed text-white px-4 py-2 rounded-md font-medium transition-colors duration-200 whitespace-nowrap"
                >
                  {isSubscribing ? 'Subscribing...' : 'Subscribe'}
                </button>
              </form>
              {subscribeMessage && (
                <p className={`mt-2 text-sm ${
                  subscribeMessage.includes('Thank you') || subscribeMessage.includes('already subscribed')
                    ? 'text-emerald-400' 
                    : 'text-red-400'
                }`}>
                  {subscribeMessage}
                </p>
              )}
            </div>

            {/* Social Links */}
            {/* Social Links */}
            <div className="flex space-x-4">
              <a
                href="https://www.facebook.com/yalamobilecamping"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-slate-700 hover:bg-slate-600 p-2 rounded-md transition-colors duration-200"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="https://www.instagram.com/yalamobilecamping/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-slate-700 hover:bg-slate-600 p-2 rounded-md transition-colors duration-200"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="bg-slate-700 hover:bg-slate-600 p-2 rounded-md transition-colors duration-200"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={(e) => handleNavClick('main', e)}
                  className="text-slate-300 hover:text-white transition-colors duration-200 text-left"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={(e) => handleNavClick('transportation', e)}
                  className="text-slate-300 hover:text-white transition-colors duration-200 text-left"
                >
                  Transportation
                </button>
              </li>
               <li>
                <button
                  onClick={(e) => handleNavClick('blog', e)}
                  className="text-slate-300 hover:text-white transition-colors duration-200 text-left"
                >
                  Blog
                </button>
              </li>
              <li>
                <button
                  onClick={(e) => handleNavClick('faq', e)}
                  className="text-slate-300 hover:text-white transition-colors duration-200 text-left"
                >
                  FAQ
                </button>
              </li>
              <li>
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-300 hover:text-white transition-colors duration-200"
                >
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <Phone className="h-5 w-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                <div>
                  <a 
                    href={`tel:${COMPANY_PHONE}`}
                    className="text-slate-300 hover:text-white transition-colors duration-200"
                  >
                    +94 71 358 5926
                  </a>
                  <br />
                  <a 
                    href={`https://wa.me/${WHATSAPP_NUMBER}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-300 hover:text-white transition-colors duration-200 text-sm"
                  >
                    WhatsApp Available
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Mail className="h-5 w-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                <a 
                  href={`mailto:${COMPANY_EMAIL}`}
                  className="text-slate-300 hover:text-white transition-colors duration-200"
                >
                  {COMPANY_EMAIL}
                </a>
              </div>

              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                <div className="text-slate-300">
                  <p>No-795/6, Wilhelm Garden</p>
                  <p>Welipillewa, Dadigamuwa</p>
                  <p>Sri Lanka</p>
                </div>
              </div>
            </div>
               {/* ADD THIS NEW SECTION - Developer Credit */}
<div className="mt-8 pt-6">
  <div className="text-center">
    <p className="text-slate-500 text-sm mb-2">
      Powered by <span className="text-red-700 font-semibold">Artisan</span>
    </p>
    <p className="text-slate-600 text-xs">
      "Crafting Digital Excellence Through IT Solutions & Strategic Advertising"
    </p>
  </div>
</div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-700 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-slate-400 mb-4 md:mb-0">
              <p>&copy; 2025 Yala Mobile Camping. All rights reserved.</p>
            </div>
            <div className="flex space-x-6 text-sm">
              <button
                onClick={(e) => handleNavClick('privacy', e)}
                className="text-slate-400 hover:text-white transition-colors duration-200"
              >
                Privacy Policy
              </button>
              <button
                onClick={(e) => handleNavClick('terms', e)}
                className="text-slate-400 hover:text-white transition-colors duration-200"
              >
                Terms of Service
              </button>
              <button
                onClick={(e) => handleNavClick('faq', e)}
                className="text-slate-400 hover:text-white transition-colors duration-200"
              >
                FAQ
              </button>
            </div>
            
          </div>
          
        </div>
  
      </div>
    </footer>
  );
};

export default Footer;
