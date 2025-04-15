import { useState } from "react";
import { Link, useLocation } from "wouter";
import { NAV_LINKS } from "@/lib/constants";
import { Menu } from "lucide-react";
import MobileMenu from "./MobileMenu";
import logo9abila from "@assets/logo9abila.svg";
import './logo.css';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [location] = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="sticky top-0 bg-black/80 backdrop-blur-md z-50  h-[90px] flex items-center font-display" style={{ backgroundColor: "rgb(30, 30, 30)" }}> 
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <img
                src={logo9abila}
                alt="Logo"
                className="w-[800px] h-[220px] left-[-240px]  absolute top-[-50px]"  
              />
            </Link>
          </div>
          
          <div className="hidden md:block">
            <div className="flex items-center space-x-8 ">
              {NAV_LINKS.map((link) => (
                <Link 
                  key={link.href} 
                  href={link.href}
                  className={`${
                    location === link.href 
                      ? "text-white" 
                      : "text-gray-300 hover:text-white "
                  } px-3 py-2 rounded-md  font-medium transition-colors text-[20px]`}
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
