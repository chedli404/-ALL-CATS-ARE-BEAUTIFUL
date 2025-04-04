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
    <nav className="sticky top-0 bg-black/80 backdrop-blur-md z-50 border-b border-earth/20">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <div className="w-10 h-10 bg-earth rounded-full flex items-center justify-center mr-3">
                <span className="font-display text-lg text-gray-900">AC</span>
              </div>
              <span className="font-display text-xl text-white">ACAB</span>
            </Link>
          </div>
          
          <div className="hidden md:block">
            <div className="flex items-center space-x-4">
              {NAV_LINKS.map((link) => (
                <Link 
                  key={link.href} 
                  href={link.href}
                  className={`${
                    location === link.href 
                      ? "text-white" 
                      : "text-gray-300 hover:text-white"
                  } px-3 py-2 rounded-md text-sm font-medium transition-colors`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
          
          <div className="md:hidden">
            <button 
              type="button" 
              className="text-gray-400 hover:text-white"
              onClick={toggleMenu}
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
      
      <MobileMenu isOpen={isMenuOpen} onClose={toggleMenu} />
    </nav>
  );
};

export default Navbar;
