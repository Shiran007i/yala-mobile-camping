import React, { useState, useEffect } from "react";
import logo from "../../assets/images/logo.png";
import DesktopNav from "../Navigation/DesktopNav";
import MobileNav from "../Navigation/MobileNav";
import HeroSection from "./HeroSection";
import TabNavigation from "../Navigation/TabNavigation";

const Header = ({ onInquireNow }) => {
  const [showUpButton, setShowUpButton] = useState(false);
  const [menuDark, setMenuDark] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowUpButton(window.scrollY > 300);
      // Switch menu color after 500px (adjust as needed for hero height)
      setMenuDark(window.scrollY > 500);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {/* Navigation Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-transparent backdrop-blur-sm transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            {/* Logo + Text Grouped Left */}
            <div className="flex items-center space-x-2 select-none">
              <div className="relative flex flex-row justify-center items-center">
                <span
                  className="text-3xl sm:text-4xl md:text-5xl italic text-white drop-shadow-lg -z-20 -mt-4 leading-none"
                  style={{
                    fontFamily: "Dancing Script, cursive",
                    color: "#fffbe7",
                    textShadow: "2px 2px 0 #1e293b, 0 4px 12px #0008",
                    fontWeight: 400,
                  }}
                >
                  Yala
                </span>
                <img
                  src={logo}
                  alt="Yala Mobile Camping"
                  className="h-14 w-14 sm:h-16 sm:w-16 md:h-20 md:w-20 z-10 shadow-xl -mt-2 mx-2"
                />
                <span
                  className="text-base sm:text-lg md:text-xl italic text-white drop-shadow-lg z-20 whitespace-nowrap mt-8 -ml-9"
                  style={{
                    fontFamily: "Dancing Script, cursive",
                    color: "#fffbe7",
                    textShadow: "2px 2px 0 #1e293b, 0 4px 12px #0008",
                    fontWeight: 400,
                  }}
                >
                  Mobile Camping
                </span>
              </div>
            </div>

            {/* Desktop Navigation - Hidden on mobile */}
            <div className="hidden md:block">
              <DesktopNav
                scrollToSection={scrollToSection}
                textClassName={
                  `transition-colors duration-300 text-[1.15rem] px-3 py-1 rounded` +
                  ` drop-shadow-lg hover:text-emerald-600 hover:bg-emerald-50 ${menuDark ? "text-emerald-900" : "text-white"}`
                }
                style={{ fontFamily: "Dancing Script, cursive" }}
              />
            </div>

            {/* Mobile Navigation - Only visible on mobile */}
            <div className="md:hidden">
              <MobileNav
                scrollToSection={scrollToSection}
                textClassName={
                  `transition-colors duration-300 text-lg px-3 py-1 rounded` +
                  ` drop-shadow-lg hover:text-emerald-600 hover:bg-emerald-50 ${menuDark ? "text-emerald-900" : "text-white"}`
                }
                style={{ fontFamily: "Dancing Script, cursive" }}
              />
            </div>
          </div>
        </div>
      </header>

      {/* Floating Back to Top Button */}
      {showUpButton && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-6 left-6 z-50 bg-emerald-600 hover:bg-emerald-700 text-white p-3 rounded-full shadow-lg transition-all duration-500 focus:outline-none focus:ring-2 focus:ring-emerald-400 animate-fade-in-up"
          aria-label="Back to top"
          style={{
            opacity: showUpButton ? 1 : 0,
            transform: showUpButton ? "translateY(0)" : "translateY(40px)",
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 15l7-7 7 7"
            />
          </svg>
        </button>
      )}

      {/* Hero Section */}
      <HeroSection onInquireNow={onInquireNow} />
    </>
  );
};

export default Header;