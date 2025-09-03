import React, { useState, useEffect } from "react";
import logo from "../../assets/images/logo.png";
import DesktopNav from "../Navigation/DesktopNav";
import MobileNav from "../Navigation/MobileNav";
import HeroSection from "./HeroSection";
import TabNavigation from "../Navigation/TabNavigation";

const Header = ({ onInquireNow }) => {
  const [showUpButton, setShowUpButton] = useState(false);
  const [menuDark, setMenuDark] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [headerVisible, setHeaderVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrollY(currentScrollY);
      
      // Update states
      setShowUpButton(currentScrollY > 300);
      setMenuDark(currentScrollY > 500);
      setIsScrolled(currentScrollY > 50);
      
      // Header visibility logic
      if (currentScrollY <= 0) {
        setHeaderVisible(true);
      } else if (Math.abs(currentScrollY - lastScrollY) < 5) {
        return;
      } else if (currentScrollY > lastScrollY && currentScrollY > 200) {
        setHeaderVisible(false);
      } else if (currentScrollY < lastScrollY) {
        setHeaderVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Calculate effects based on scroll position
  const maxScrollForEffects = 600;
  const scrollProgress = Math.min(scrollY / maxScrollForEffects, 1);
  
  // Header blur: 0 to 20px
  const headerBlur = scrollProgress * 20;
  
  // Logo scale: 1 to 0.6 (zoom out when scrolling down)
  const logoScale = 1 - (scrollProgress * 0.4);
  
  // Background opacity
  const bgOpacity = scrollProgress * 0.9;

  return (
    <>
      {/* Sticky Navigation Header */}
      <header
  className={`sticky top-0 z-50 w-full transition-all duration-500 ease-in-out ${
    isScrolled
      ? "bg-white/10 backdrop-blur-md shadow-md"
      : "bg-transparent"
  }`}


        // style={{
        //   backdropFilter: `blur(${headerBlur}px)`,
        //   WebkitBackdropFilter: `blur(${headerBlur}px)`,
        //   backgroundColor: `rgba(255, 255, 255, ${bgOpacity})`,
        //   borderBottom: isScrolled ? '1px solid rgba(255, 255, 255, 0.2)' : 'none',
        // }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`flex justify-between items-center transition-all duration-300 ${
            isScrolled ? "py-2" : "py-4"
          }`}>
            {/* Logo + Text Grouped Left */}
            <div className="flex items-center space-x-2 select-none">
              <div className="relative flex flex-row justify-center items-center">
                <span
                  className={`italic drop-shadow-lg -z-20 -mt-4 leading-none transition-all duration-300 ${
                    isScrolled 
                      ? "text-2xl sm:text-3xl md:text-4xl text-emerald-800" 
                      : "text-3xl sm:text-4xl md:text-5xl text-white"
                  }`}
                  style={{
                    fontFamily: "Dancing Script, cursive",
                    textShadow: isScrolled 
                      ? "1px 1px 0 #065f46, 0 2px 8px rgba(0,0,0,0.25)" 
                      : "2px 2px 0 #1e293b, 0 4px 12px rgba(0,0,0,0.5)",
                    fontWeight: 400,
                  }}
                >
                  Yala
                </span>
                
                {/* Logo with zoom effect */}
                <img
                  src={logo}
                  alt="Yala Mobile Camping"
                  className={`z-10 shadow-xl -mt-2 mx-2 drop-shadow-lg transition-all duration-500 ease-out ${
                    isScrolled 
                      ? "h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14" 
                      : "h-14 w-14 sm:h-16 sm:w-16 md:h-20 md:w-20"
                  }`}
                  style={{
                    transform: `scale(${logoScale})`,
                    transformOrigin: 'center',
                  }}
                />
                
                <span
                  className={`italic drop-shadow-lg z-20 whitespace-nowrap mt-8 -ml-9 transition-all duration-300 ${
                    isScrolled 
                      ? "text-sm sm:text-base md:text-lg text-emerald-700" 
                      : "text-base sm:text-lg md:text-xl text-white"
                  }`}
                  style={{
                    fontFamily: "Dancing Script, cursive",
                    textShadow: isScrolled 
                      ? "1px 1px 0 #065f46, 0 2px 8px rgba(0,0,0,0.25)" 
                      : "2px 2px 0 #1e293b, 0 4px 12px rgba(0,0,0,0.5)",
                    fontWeight: 400,
                  }}
                >
                  Mobile Camping
                </span>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <DesktopNav
                scrollToSection={scrollToSection}
                textClassName={
                  `transition-colors duration-300 text-[1.15rem] px-3 py-1 rounded font-medium hover:text-emerald-600 hover:bg-emerald-50 ${
                    menuDark || isScrolled ? "text-emerald-900" : "text-white"
                  }`
                }
                style={{ fontFamily: "Dancing Script, cursive" }}
              />
            </div>

            {/* Mobile Navigation */}
            <div className="md:hidden">
              <MobileNav
                scrollToSection={scrollToSection}
                textClassName={
                  `transition-colors duration-300 text-lg px-3 py-1 rounded font-medium hover:text-emerald-600 hover:bg-emerald-50 ${
                    menuDark || isScrolled ? "text-emerald-900" : "text-white"
                  }`
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
          className="fixed bottom-6 left-6 z-40 bg-emerald-600 hover:bg-emerald-700 text-white p-3 rounded-full shadow-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-emerald-400 hover:scale-110"
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
      <div className="relative">
        <HeroSection onInquireNow={onInquireNow} />
      </div>
    </>
  );
};

export default Header;