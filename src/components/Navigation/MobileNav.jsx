// src/components/Navigation/MobileNav.jsx
import React, { useState } from "react";
import { Menu, X, Mail } from "lucide-react";

const MobileNav = ({ scrollToSection, textClassName = "", style }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleTransportationClick = () => {
    // Navigate to transportation page using hash routing
   window.location.href = '/transportation';
  setIsMenuOpen(false);
  };

  return (
    <>
      <div className="md:hidden flex items-center">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className={textClassName + " focus:outline-none"}
        >
          {isMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 mt-2 mx-4">
          <div className="px-2 pt-2 pb-3 space-y-1 bg-black/50 backdrop-blur-md rounded-lg border-t border-white/20">
            <button
              onClick={() => {
                scrollToSection("home");
                setIsMenuOpen(false);
              }}
              className={"block px-3 py-2 w-full text-left " + textClassName}
              style={style}
            >
              Home
            </button>
            <button
              onClick={() => {
                scrollToSection("locations");
                setIsMenuOpen(false);
              }}
              className={"block px-3 py-2 w-full text-left " + textClassName}
              style={style}
            >
              Locations
            </button>
            <button
              onClick={() => {
                scrollToSection("services");
                setIsMenuOpen(false);
              }}
              className={"block px-3 py-2 w-full text-left " + textClassName}
              style={style}
            >
              Services
            </button>
            <button
              onClick={handleTransportationClick}
              className={"block px-3 py-2 w-full text-left " + textClassName}
              style={style}
            >
              Transportation
            </button>

            <div className="px-3 py-2 border-t border-white/20 flex flex-col gap-1 text-sm">
              <a
                href="mailto:info@yalamobilecamping.com"
                className={textClassName + " flex items-center break-all"}
                aria-label="Email Yala Mobile Camping"
              >
                <Mail className="h-4 w-4 mr-2" />
                <span className="truncate">info@yalamobilecamping.com</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MobileNav;