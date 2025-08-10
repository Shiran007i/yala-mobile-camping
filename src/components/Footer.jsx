import React from "react";
import {
  Tent,
  Facebook,
  Instagram,
  Twitter,
  Phone,
  Mail,
  MapPin,
  Clock,
  Globe,
  Heart,
} from "lucide-react";
import logo from "../assets/images/logo.png";
import { Helmet } from "react-helmet";

const Footer = () => {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const currentYear = new Date().getFullYear();

  return (
    <>
      <Helmet>
        <title>Contact & Info | Yala Mobile Camping and Safari</title>
        <meta
          name="description"
          content="Contact Yala Mobile Camping and Safari for bookings, inquiries, and more information about our Yala National Park camping and safari experiences."
        />
        <meta
          name="keywords"
          content="contact yala mobile camping, yala safari contact, sri lanka camping info, yala national park contact, safari booking"
        />
        <meta
          property="og:title"
          content="Contact & Info | Yala Mobile Camping and Safari"
        />
        <meta
          property="og:description"
          content="Get in touch with Yala Mobile Camping and Safari for bookings and information about Yala National Park experiences."
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:image"
          content="https://campingyala.com/og-contact.webp"
        />
        {/* No canonical tag here to avoid conflicts. Only set canonical in main route components. */}
      </Helmet>
      <footer
        id="contact"
        className="bg-gray-900 text-white text-sm sm:text-base"
      >
        <div className="max-w-7xl mx-auto px-2 sm:px-4 md:px-8 lg:px-12 py-10 sm:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Brand & Description */}
            <div className="lg:col-span-2">
              <div className="flex items-center space-x-2 mb-4 sm:mb-6">
                <img
                  src={logo}
                  alt="Yala Mobile Camping"
                  className="h-10 w-10 sm:h-12 sm:w-12 mr-0"
                />
                <span className="text-xl sm:text-2xl font-bold">
                  Yala Mobile Camping
                </span>
              </div>
              <p className="text-gray-400 mb-4 sm:mb-6 max-w-md leading-relaxed text-xs sm:text-base">
                Discover the beauty of Sri Lanka through authentic camping
                experiences. We provide safe, comfortable, and memorable
                adventures that connect you with nature and local culture.
              </p>

              {/* Social Media */}
              <div className="flex space-x-3 sm:space-x-4 mb-4 sm:mb-6">
                <button className="bg-gray-800 hover:bg-emerald-600 p-2 sm:p-3 rounded-lg transition-colors duration-200 group">
                  <Facebook className="h-4 w-4 sm:h-5 sm:w-5 group-hover:scale-110 transition-transform" />
                </button>
                <button className="bg-gray-800 hover:bg-emerald-600 p-2 sm:p-3 rounded-lg transition-colors duration-200 group">
                  <Instagram className="h-4 w-4 sm:h-5 sm:w-5 group-hover:scale-110 transition-transform" />
                </button>
                <button className="bg-gray-800 hover:bg-emerald-600 p-2 sm:p-3 rounded-lg transition-colors duration-200 group">
                  <Twitter className="h-4 w-4 sm:h-5 sm:w-5 group-hover:scale-110 transition-transform" />
                </button>
                <button className="bg-gray-800 hover:bg-emerald-600 p-2 sm:p-3 rounded-lg transition-colors duration-200 group">
                  <Globe className="h-4 w-4 sm:h-5 sm:w-5 group-hover:scale-110 transition-transform" />
                </button>
              </div>

              {/* Newsletter Signup */}
              <div className="max-w-md">
                <h4 className="text-base sm:text-lg font-semibold mb-2 sm:mb-3">
                  Stay Updated
                </h4>
                <div className="flex">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 px-3 sm:px-4 py-2 bg-gray-800 border border-gray-700 rounded-l-lg focus:outline-none focus:border-emerald-500 text-white placeholder-gray-400 text-xs sm:text-base"
                  />
                  <button className="bg-emerald-600 hover:bg-emerald-700 px-4 sm:px-6 py-2 rounded-r-lg transition-colors font-medium text-xs sm:text-base">
                    Subscribe
                  </button>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-base sm:text-lg font-semibold mb-4 sm:mb-6">
                Quick Links
              </h3>
              <ul className="space-y-2 sm:space-y-3">
                <li>
                  <button
                    onClick={() => scrollToSection("home")}
                    className="text-gray-400 hover:text-white transition-colors duration-200 hover:translate-x-1 transform"
                  >
                    Home
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("locations")}
                    className="text-gray-400 hover:text-white transition-colors duration-200 hover:translate-x-1 transform"
                  >
                    Locations
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("services")}
                    className="text-gray-400 hover:text-white transition-colors duration-200 hover:translate-x-1 transform"
                  >
                    Services
                  </button>
                </li>
                <li>
                  <a
                    href="/about"
                    className="text-gray-400 hover:text-white transition-colors duration-200 hover:translate-x-1 transform"
                  >
                    About Us
                  </a>
                </li>
                <li>
                  <a
                    href="/gallery"
                    className="text-gray-400 hover:text-white transition-colors duration-200 hover:translate-x-1 transform"
                  >
                    Gallery
                  </a>
                </li>
                <li>
                  <a
                    href="/blog"
                    className="text-gray-400 hover:text-white transition-colors duration-200 hover:translate-x-1 transform"
                  >
                    Blog
                  </a>
                </li>
                <li>
                  <a
                    href="/faq"
                    className="text-gray-400 hover:text-white transition-colors duration-200 hover:translate-x-1 transform"
                  >
                    FAQ
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="text-base sm:text-lg font-semibold mb-4 sm:mb-6">
                Contact Info
              </h3>
              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-start space-x-3">
                  <Phone className="h-5 w-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-gray-400">+94 77 123 4567</p>
                    <p className="text-gray-400 text-sm">Mon-Sun: 7AM-10PM</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Mail className="h-5 w-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-gray-400">info@camplanka.com</p>
                    <p className="text-gray-400 text-sm">
                      We reply within 24hrs
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <MapPin className="h-5 w-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-gray-400">123 Galle Road,</p>
                    <p className="text-gray-400">Colombo 03, Sri Lanka</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Clock className="h-5 w-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-gray-400">Emergency Support</p>
                    <p className="text-gray-400 text-sm">24/7 Available</p>
                  </div>
                </div>
              </div>

              {/* Emergency Contact */}
              <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-red-900/20 border border-red-800 rounded-lg">
                <h4 className="text-red-400 font-semibold mb-1 sm:mb-2">
                  Emergency Hotline
                </h4>
                <p className="text-red-300 font-bold text-base sm:text-lg">
                  +94 11 911 9119
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="border-t border-gray-800 mt-8 sm:mt-12 pt-6 sm:pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-3 sm:space-y-4 md:space-y-0">
              <div className="flex flex-col md:flex-row items-center space-y-1 sm:space-y-2 md:space-y-0 md:space-x-4 sm:space-x-6">
                <p className="text-gray-400 text-center md:text-left text-xs sm:text-base">
                  &copy; {currentYear} CampLanka. All rights reserved.
                </p>
                <div className="flex items-center space-x-1 text-gray-400 text-xs sm:text-base">
                  <span>Made with</span>
                  <Heart className="h-3 w-3 sm:h-4 sm:w-4 text-red-500 fill-current animate-pulse" />
                  <span>in Sri Lanka</span>
                </div>
              </div>

              <div className="flex flex-wrap justify-center md:justify-end space-x-4 sm:space-x-6 text-xs sm:text-sm text-gray-400">
                <a
                  href="/privacy"
                  className="hover:text-white transition-colors"
                >
                  Privacy Policy
                </a>
                <a href="/terms" className="hover:text-white transition-colors">
                  Terms of Service
                </a>
                <a
                  href="/cookies"
                  className="hover:text-white transition-colors"
                >
                  Cookie Policy
                </a>
              </div>
            </div>
          </div>

          {/* Certifications */}
          <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-gray-800">
            <div className="flex flex-wrap justify-center items-center space-x-4 sm:space-x-8 opacity-60">
              <div className="text-xs text-gray-500 text-center">
                <p className="font-semibold">Licensed by</p>
                <p>Sri Lanka Tourism Board</p>
              </div>
              <div className="text-xs text-gray-500 text-center">
                <p className="font-semibold">Certified</p>
                <p>Eco Tourism Operator</p>
              </div>
              <div className="text-xs text-gray-500 text-center">
                <p className="font-semibold">Member of</p>
                <p>Adventure Travel Association</p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
