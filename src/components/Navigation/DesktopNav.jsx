// DesktopNav.jsx
import React from "react";
import { Phone, Mail } from "lucide-react";

const DesktopNav = ({ scrollToSection, textClassName = "" }) => {
  return (
    <nav className="hidden md:flex items-center space-x-8">
      <button onClick={() => scrollToSection("home")} className={textClassName}>
        Home
      </button>
      <button
        onClick={() => scrollToSection("locations")}
        className={textClassName}
      >
        Locations
      </button>
      <button
        onClick={() => scrollToSection("services")}
        className={textClassName}
      >
        Services
      </button>

      {/* Contact Info */}
      <div className="hidden md:flex items-center space-x-4 text-sm whitespace-nowrap overflow-hidden">
        <a
          href="tel:+94771234567"
          className={textClassName + " flex items-center"}
        >
          <Phone className="h-4 w-4 mr-1" />
          <span className="truncate">+94 77 123 4567</span>
        </a>
        <a
          href="mailto:info@yalamobilecamping.com"
          className={textClassName + " flex items-center"}
        >
          <Mail className="h-4 w-4 mr-1" />
          <span className="truncate">info@yalamobilecamping.com</span>
        </a>
      </div>
    </nav>
  );
};

export default DesktopNav;
