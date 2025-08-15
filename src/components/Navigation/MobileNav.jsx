// MobileNav.jsx
import React, { useState } from "react";
import { Menu, X, Phone, Mail } from "lucide-react";

const MobileNav = ({ scrollToSection, textClassName = "" }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
            >
              Home
            </button>
            <button
              onClick={() => {
                scrollToSection("locations");
                setIsMenuOpen(false);
              }}
              className={"block px-3 py-2 w-full text-left " + textClassName}
            >
              Locations
            </button>
            <button
              onClick={() => {
                scrollToSection("services");
                setIsMenuOpen(false);
              }}
              className={"block px-3 py-2 w-full text-left " + textClassName}
            >
              Services
            </button>

            <div className="px-3 py-2 border-t border-white/20 flex flex-col gap-1 text-sm">
              {/* <a
                href="tel:+94771234567"
                className={textClassName + " flex items-center mb-1 break-all"}
                aria-label="Call Yala Mobile Camping"
              >
                <Phone className="h-4 w-4 mr-2" />
                <span className="truncate">94716335000</span>
              </a> */}
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
