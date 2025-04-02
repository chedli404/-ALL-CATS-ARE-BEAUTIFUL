import { useState } from "react";
import { Link, useLocation } from "wouter";
import { NAV_LINKS } from "@/lib/constants";
import { Menu } from "lucide-react";
import MobileMenu from "./MobileMenu";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [location] = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-content">
          <div className="navbar-logo-container">
            <Link href="/" className="navbar-logo-link">
              <div className="navbar-logo">
                <span className="logo-text">AC</span>
              </div>
              <span className="navbar-title">ACAB</span>
            </Link>
          </div>
          
          <div className="navbar-links-desktop">
            <div className="navbar-links-list">
              {NAV_LINKS.map((link) => (
                <Link 
                  key={link.href} 
                  href={link.href}
                  className={`navbar-link ${location === link.href ? "navbar-link-active" : "navbar-link-inactive"}`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
          
          <div className="navbar-menu-mobile">
            <button 
              type="button" 
              className="navbar-menu-button"
              onClick={toggleMenu}
            >
              <Menu className="menu-icon" />
            </button>
          </div>
        </div>
      </div>
      
      <MobileMenu isOpen={isMenuOpen} onClose={toggleMenu} />
    </nav>
  );
};

export default Navbar;
