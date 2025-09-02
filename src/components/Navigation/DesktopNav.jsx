// src/components/Navigation/DesktopNav.jsx
import React from "react";
import { Link } from "react-router-dom";
import { Mail } from "lucide-react";

const DesktopNav = ({ scrollToSection, textClassName = "", style }) => {
  return (
    <nav className="hidden md:flex items-center space-x-8">
      <button 
        onClick={() => scrollToSection("home")} 
        className={`${textClassName} font-dancing-script hover:scale-105 transition-transform duration-200`}
        style={style}
        aria-label="Go to Home section"
      >
        Home
      </button>
      <button
        onClick={() => scrollToSection("locations")}
        className={`${textClassName} font-dancing-script hover:scale-105 transition-transform duration-200`}
        style={style}
        aria-label="Go to Locations section"
      >
        Locations
      </button>
      <button
        onClick={() => scrollToSection("services")}
        className={`${textClassName} font-dancing-script hover:scale-105 transition-transform duration-200`}
        style={style}
        aria-label="Go to Services section"
      >
        Services
      </button>
      <Link
        to="/transportation"
        className={`${textClassName} font-dancing-script hover:scale-105 transition-transform duration-200`}
        style={style}
        aria-label="Go to Transportation page"
      >
        Transportation
      </Link>
      <Link
        to="/blog"
        className={`${textClassName} font-dancing-script hover:scale-105 transition-transform duration-200`}
        style={style}
        aria-label="Go to Blog page"
      >
        Blog
      </Link>

      {/* Contact Info */}
      <div className="hidden lg:flex items-center space-x-4 text-sm whitespace-nowrap overflow-hidden">
        <a
          href="mailto:info@yalamobilecamping.com"
          className={`${textClassName} flex items-center font-inter hover:scale-105 transition-transform duration-200`}
          aria-label="Email Yala Mobile Camping"
        >
          <Mail className="h-4 w-4 mr-1" aria-hidden="true" />
          <span className="truncate">info@yalamobilecamping.com</span>
        </a>
      </div>
    </nav>
  );
};

export default DesktopNav;
