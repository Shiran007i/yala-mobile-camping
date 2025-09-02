// src/components/Navigation/MobileNav.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Mail } from "lucide-react";

const MobileNav = ({ scrollToSection, textClassName = "", style }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <div className="md:hidden flex items-center">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className={`${textClassName} focus:outline-none focus:ring-2 focus:ring-emerald-400 rounded p-1`}
          aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? (
            <X className="h-6 w-6" aria-hidden="true" />
          ) : (
            <Menu className="h-6 w-6" aria-hidden="true" />
          )}
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 mt-2 mx-4">
          <nav className="px-2 pt-2 pb-3 space-y-1 bg-black/50 backdrop-blur-md rounded-lg border-t border-white/20">
            <button
              onClick={() => {
                scrollToSection("home");
                setIsMenuOpen(false);
              }}
              className={`block px-3 py-2 w-full text-left font-dancing-script ${textClassName} hover:bg-white/10 rounded transition-colors`}
              style={style}
              aria-label="Go to Home section"
            >
              Home
            </button>
            <button
              onClick={() => {
                scrollToSection("locations");
                setIsMenuOpen(false);
              }}
              className={`block px-3 py-2 w-full text-left font-dancing-script ${textClassName} hover:bg-white/10 rounded transition-colors`}
              style={style}
              aria-label="Go to Locations section"
            >
              Locations
            </button>
            <button
              onClick={() => {
                scrollToSection("services");
                setIsMenuOpen(false);
              }}
              className={`block px-3 py-2 w-full text-left font-dancing-script ${textClassName} hover:bg-white/10 rounded transition-colors`}
              style={style}
              aria-label="Go to Services section"
            >
              Services
            </button>
            <Link
              to="/about"
              onClick={() => setIsMenuOpen(false)}
              className={`block px-3 py-2 w-full text-left font-dancing-script ${textClassName} hover:bg-white/10 rounded transition-colors`}
              style={style}
              aria-label="Go to About page"
            >
              About
            </Link>
            <Link
              to="/transportation"
              onClick={() => setIsMenuOpen(false)}
              className={`block px-3 py-2 w-full text-left font-dancing-script ${textClassName} hover:bg-white/10 rounded transition-colors`}
              style={style}
              aria-label="Go to Transportation page"
            >
              Transportation
            </Link>
            <Link
              to="/blog"
              onClick={() => setIsMenuOpen(false)}
              className={`block px-3 py-2 w-full text-left font-dancing-script ${textClassName} hover:bg-white/10 rounded transition-colors`}
              style={style}
              aria-label="Go to Blog page"
            >
              Blog
            </Link>

            <div className="px-3 py-2 border-t border-white/20 flex flex-col gap-1 text-sm">
              <a
                href="mailto:info@yalamobilecamping.com"
                className={`${textClassName} flex items-center break-all font-inter hover:bg-white/10 rounded p-2 transition-colors`}
                aria-label="Email Yala Mobile Camping"
              >
                <Mail className="h-4 w-4 mr-2 flex-shrink-0" aria-hidden="true" />
                <span className="truncate">info@yalamobilecamping.com</span>
              </a>
            </div>
          </nav>
        </div>
      )}
    </>
  );
};

export default MobileNav;
