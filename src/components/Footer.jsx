import React, { useState } from "react";
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
  CheckCircle,
  AlertCircle,
  Loader2,
  UserX, // Added for unsubscribe icon
} from "lucide-react";
import logo from "../assets/images/logo.png";
import { Helmet } from "react-helmet";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [subscriptionState, setSubscriptionState] = useState("idle"); // idle, loading, success, error
  const [message, setMessage] = useState("");

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubscription = async (e) => {
    e.preventDefault();

    // Reset previous state
    setMessage("");

    // Validation
    if (!email.trim()) {
      setSubscriptionState("error");
      setMessage("Please enter your email address");
      setTimeout(() => setSubscriptionState("idle"), 3000);
      return;
    }

    if (!validateEmail(email)) {
      setSubscriptionState("error");
      setMessage("Please enter a valid email address");
      setTimeout(() => setSubscriptionState("idle"), 3000);
      return;
    }

    // Start loading
    setSubscriptionState("loading");

    try {
      // API call to subscribe
      const response = await fetch("/api/newsletter/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.trim(),
          source: "footer_signup",
          timestamp: new Date().toISOString(),
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSubscriptionState("success");
        setMessage("🎉 Successfully subscribed! Welcome to our community!");
        setEmail(""); // Clear the input

        // Reset to idle after 5 seconds
        setTimeout(() => {
          setSubscriptionState("idle");
          setMessage("");
        }, 5000);
      } else {
        throw new Error(data.message || "Subscription failed");
      }
    } catch (error) {
      console.error("Newsletter subscription error:", error);
      setSubscriptionState("error");
      setMessage(
        error.message.includes("already subscribed")
          ? "You're already subscribed to our newsletter!"
          : "Oops! Something went wrong. Please try again."
      );

      // Reset to idle after 5 seconds
      setTimeout(() => {
        setSubscriptionState("idle");
        setMessage("");
      }, 5000);
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
                <button
                  onClick={() =>
                    window.open(
                      "https://www.facebook.com/profile.php?id=61579679243080",
                      "_blank"
                    )
                  }
                  className="bg-gray-800 hover:bg-emerald-600 p-2 sm:p-3 rounded-lg transition-colors duration-200 group"
                >
                  
                  <Facebook className="h-4 w-4 sm:h-5 sm:w-5 group-hover:scale-110 transition-transform" />
                </button>
                <button
                  onClick={() =>
                    window.open(
                      "https://www.instagram.com/yalamobilecamping/",
                      "_blank"
                    )
                  }
                  className="bg-gray-800 hover:bg-emerald-600 p-2 sm:p-3 rounded-lg transition-colors duration-200 group"
                >
                  <Instagram className="h-4 w-4 sm:h-5 sm:w-5 group-hover:scale-110 transition-transform" />
                </button>
                <button className="bg-gray-800 hover:bg-emerald-600 p-2 sm:p-3 rounded-lg transition-colors duration-200 group">
                  <Twitter className="h-4 w-4 sm:h-5 sm:w-5 group-hover:scale-110 transition-transform" />
                </button>
                <button className="bg-gray-800 hover:bg-emerald-600 p-2 sm:p-3 rounded-lg transition-colors duration-200 group">
                  <Globe className="h-4 w-4 sm:h-5 sm:w-5 group-hover:scale-110 transition-transform" />
                </button>
              </div>

              {/* Enhanced Newsletter Signup */}
              <div className="max-w-md">
                <h4 className="text-base sm:text-lg font-semibold mb-2 sm:mb-3 flex items-center space-x-2">
                  <Mail className="h-4 w-4 sm:h-5 sm:w-5 text-emerald-500" />
                  <span>Stay Updated</span>
                </h4>
                <p className="text-gray-400 text-xs sm:text-sm mb-3">
                  Get the latest updates on new locations, special offers, and
                  camping tips!
                </p>

                <form onSubmit={handleSubscription} className="space-y-3">
                  <div className="flex">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      disabled={subscriptionState === "loading"}
                      className={`flex-1 px-3 sm:px-4 py-2 bg-gray-800 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-white placeholder-gray-400 text-xs sm:text-base transition-colors ${
                        subscriptionState === "error"
                          ? "border-red-500"
                          : subscriptionState === "success"
                          ? "border-green-500"
                          : "border-gray-700"
                      } ${subscriptionState === "loading" ? "opacity-50" : ""}`}
                    />
                    <button
                      type="submit"
                      disabled={subscriptionState === "loading"}
                      className={`px-4 sm:px-6 py-2 rounded-r-lg transition-all font-medium text-xs sm:text-base flex items-center space-x-2 ${
                        subscriptionState === "loading"
                          ? "bg-gray-600 cursor-not-allowed"
                          : subscriptionState === "success"
                          ? "bg-green-600 hover:bg-green-700"
                          : "bg-emerald-600 hover:bg-emerald-700"
                      }`}
                    >
                      {subscriptionState === "loading" ? (
                        <>
                          <Loader2 className="h-3 w-3 sm:h-4 sm:w-4 animate-spin" />
                          <span>Subscribing...</span>
                        </>
                      ) : subscriptionState === "success" ? (
                        <>
                          <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4" />
                          <span>Subscribed!</span>
                        </>
                      ) : (
                        <span>Subscribe</span>
                      )}
                    </button>
                  </div>

                  {/* Status Message */}
                  {message && (
                    <div
                      className={`flex items-center space-x-2 p-2 rounded-lg text-xs sm:text-sm ${
                        subscriptionState === "success"
                          ? "bg-green-900/20 border border-green-800 text-green-400"
                          : subscriptionState === "error"
                          ? "bg-red-900/20 border border-red-800 text-red-400"
                          : "bg-blue-900/20 border border-blue-800 text-blue-400"
                      }`}
                    >
                      {subscriptionState === "success" ? (
                        <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                      ) : subscriptionState === "error" ? (
                        <AlertCircle className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                      ) : null}
                      <span>{message}</span>
                    </div>
                  )}

                  {/* Enhanced Newsletter Policy with Unsubscribe Link */}
                  <div className="text-gray-500 text-xs space-y-1">
                    <p>
                      By subscribing, you agree to receive marketing emails.
                    </p>
                    <div className="flex items-center space-x-2">
                      <span>Already subscribed?</span>
                      <a
                        href="/unsubscribe"
                        className="inline-flex items-center space-x-1 text-red-400 hover:text-red-300 transition-colors underline"
                      >
                        <UserX className="h-3 w-3" />
                        <span>Unsubscribe</span>
                      </a>
                    </div>
                  </div>
                </form>
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
                    <p className="text-gray-400">94716335000</p>
                    <p className="text-gray-400 text-sm">Mon-Sun: 7AM-10PM</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Mail className="h-5 w-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-gray-400">info@yalamobilecamping.com</p>
                    <p className="text-gray-400 text-sm">
                      We reply within 24hrs
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <MapPin className="h-5 w-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-gray-400">No-795/6,Wilhelm Garden</p>
                    <p className="text-gray-400">Welipillewa , Dadigamuwa</p>
                    <p className="text-gray-400">Sri Lanka</p>
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
                  +9471 358 5926
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="border-t border-gray-800 mt-8 sm:mt-12 pt-6 sm:pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-3 sm:space-y-4 md:space-y-0">
              <div className="flex flex-col md:flex-row items-center space-y-1 sm:space-y-2 md:space-y-0 md:space-x-4 sm:space-x-6">
                <p className="text-gray-400 text-center md:text-left text-xs sm:text-base">
                  &copy; {currentYear} Yala Mobile Camping. All rights reserved.
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
                {/* Added Unsubscribe Link in Footer Links */}
                {/* <a
                  href="/unsubscribe"
                  className="hover:text-red-300 text-red-400 transition-colors"
                >
                  Unsubscribe1
                </a> */}
              </div>
            </div>
          </div>

          {/* Certifications */}
          {/* <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-gray-800">
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
          </div> */}
        </div>
      </footer>
    </>
  );
};

export default Footer;
