// src/components/Navigation/DesktopNav.jsx
import React from "react";
import { Mail } from "lucide-react";

const DesktopNav = ({ scrollToSection, textClassName = "", style }) => {
  const handleTransportationClick = () => {
    // Navigate to transportation page using hash routing
    window.location.href = '/transportation';
    // Trigger a page reload to ensure the route change is detected
    //window.location.reload();
  };

  return (
    <nav className="hidden md:flex items-center space-x-8">
      <button 
        onClick={() => scrollToSection("home")} 
        className={textClassName}
        style={style}
      >
        Home
      </button>
      <button
        onClick={() => scrollToSection("locations")}
        className={textClassName}
        style={style}
      >
        Locations
      </button>
      <button
        onClick={() => scrollToSection("services")}
        className={textClassName}
        style={style}
      >
        Services
      </button>
      <button
        onClick={handleTransportationClick}
        className={textClassName}
        style={style}
      >
        Transportation      </button>

      {/* Contact Info */}
      <div className="hidden md:flex items-center space-x-4 text-sm whitespace-nowrap overflow-hidden">
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