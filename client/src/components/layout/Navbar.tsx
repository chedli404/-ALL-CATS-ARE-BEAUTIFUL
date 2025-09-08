import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { NAV_LINKS } from "@/lib/constants.ts";
import { Menu, X, LogOut } from "lucide-react";
import logo9abila from "@assets/logo9abila.svg";
import './logo.css';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [location] = useLocation();
  const [scrollPosition, setScrollPosition] = useState(0);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);

  // Handle scroll position for visual effects
  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Check authentication status
  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    if (token && userData) {
      const parsedUser = JSON.parse(userData);
      console.log('User data:', parsedUser);
      setUser(parsedUser);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    window.location.href = '/';
  };

  // Filter nav links based on auth status
  const getNavLinks = () => {
    if (user) {
      return NAV_LINKS.filter(link => !['Login', "S'inscrire"].includes(link.label));
    }
    return NAV_LINKS;
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const logoRef = useRef<HTMLDivElement>(null);

  // Get tribal color based on hovered navigation link
  const getNavAccentColor = (href: string) => {
    switch(href) {
      case "/tribes":
        return "#E3A947"; // Anciens - golden
      case "/characters":
        return "#1C6E5F"; // Nomades - green
      case "/map":
        return "#C73E3A"; // Technos - red
      case "/legends":
        return "#9C4DC4"; // Energy - purple
      case "/world":
        return "#39C9C9"; // Water - teal
      default:
        return "#64afd6"; // Default blue
    }
  };

  // Variants for menu items animation
  const menuItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: custom * 0.1,
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1]
      }
    })
  };

  return (
    <nav 
      className={`fixed top-0 w-full z-50 transition-all duration-300 font-display ${
        scrollPosition > 20 ? "h-[70px] shadow-md" : "h-[90px]"
      }`} 
      style={{ 
        backgroundColor: "rgba(15, 15, 15, 0.95)",
        backdropFilter: "blur(10px)",
        borderBottom: "1px solid rgba(100, 100, 100, 0.1)"
      }}
    > 
      <div className="container mx-auto px-4 h-full">
        <div className="flex items-center justify-between h-full">
          {/* Logo */}
          <motion.div 
            className="flex-shrink-0 w-40 md:w-64 h-full relative overflow-visible" 
            style={{ zIndex: 100 }}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
          >
            <Link href="/" className="block h-full">
              <img
                src={logo9abila}
                alt="Kabila Logo"
                className="absolute w-[400px] h-[150px] -left-[-110px] -top-[30px] md:w-[600px] md:h-[200px] md:-left-[120px] md:-top-[50px] lg:w-[800px] lg:h-[220px] lg:-left-[50px] lg:-top-[60px]"
              />
            </Link>
          </motion.div>
          
          {/* Desktop Navigation */}
          <div className="hidden lg:block relative">
            <div className="flex items-center space-x-6 xl:space-x-10">
              {getNavLinks().map((link) => (
                <motion.div
                  key={link.href}
                  onHoverStart={() => setHoveredLink(link.href)}
                  onHoverEnd={() => setHoveredLink(null)}
                  className="relative"
                  whileHover={{ y: -2 }}
                  transition={{ type: "spring", stiffness: 500, damping: 15 }}
                >
                  <Link 
                    href={link.href}
                    className={`${location === link.href 
                      ? "text-white font-bold" 
                      : "text-gray-300 hover:text-white"}
                      px-3 py-2 font-medium transition-all duration-200 text-sm md:text-base xl:text-lg inline-block`}
                  >
                    {link.label}
                  </Link>
                  
                  {/* Animated underline */}
                  <motion.div 
                    className="absolute -bottom-1 left-0 h-[2px] rounded-full"
                    style={{ backgroundColor: getNavAccentColor(link.href) }}
                    initial={{ width: location === link.href ? "100%" : 0 }}
                    animate={{ 
                      width: (location === link.href || hoveredLink === link.href) ? "100%" : 0,
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  />
                </motion.div>
              ))}
              
              {/* Admin link */}
              {user && user.level === 9 && (
                <motion.div
                  onHoverStart={() => setHoveredLink('/admin')}
                  onHoverEnd={() => setHoveredLink(null)}
                  className="relative"
                  whileHover={{ y: -2 }}
                  transition={{ type: "spring", stiffness: 500, damping: 15 }}
                >
                  <Link 
                    href="/admin"
                    className={`${location === '/admin' 
                      ? "text-white font-bold" 
                      : "text-gray-300 hover:text-white"}
                      px-3 py-2 font-medium transition-all duration-200 text-sm md:text-base xl:text-lg inline-block`}
                  >
                    Admin
                  </Link>
                  
                  <motion.div 
                    className="absolute -bottom-1 left-0 h-[2px] rounded-full"
                    style={{ backgroundColor: '#ff6b35' }}
                    initial={{ width: location === '/admin' ? "100%" : 0 }}
                    animate={{ 
                      width: (location === '/admin' || hoveredLink === '/admin') ? "100%" : 0,
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  />
                </motion.div>
              )}
              
              {/* User info and logout */}
              {user && (
                <div className="flex items-center space-x-4 ml-6">
                  <span className="text-gray-300 text-sm md:text-base">
                    {user.username} {user.level >= 5 && (
                      user.level === 9 ? '(Super Admin)' :
                      user.level === 8 ? '(Admin)' :
                      user.level === 7 ? '(Moderator)' :
                      '(Staff)'
                    )}
                  </span>
                  <motion.button
                    onClick={handleLogout}
                    className="flex items-center space-x-1 text-gray-300 hover:text-white px-3 py-2 font-medium transition-all duration-200 text-sm md:text-base"
                    whileHover={{ y: -2 }}
                    transition={{ type: "spring", stiffness: 500, damping: 15 }}
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Logout</span>
                  </motion.button>
                </div>
              )}
            </div>
          </div>
          
          {/* Mobile Navigation Button */}
          <motion.div 
            className="lg:hidden"
            whileTap={{ scale: 0.9 }}
          >
            <button 
              type="button" 
              className="text-gray-400 hover:text-white p-2 rounded-full bg-[rgba(50,50,50,0.3)]"
              onClick={toggleMenu}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </motion.div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            className={`lg:hidden fixed ${scrollPosition > 20 ? 'top-[70px]' : 'top-[90px]'} left-0 w-full bg-[rgb(15,15,15)] border-t border-gray-800 shadow-xl z-40`}
            style={{ 
              maxHeight: 'calc(100vh - 90px)',
              backdropFilter: "blur(10px)",
            }}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <div className="px-4 py-3 space-y-2 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 90px)' }}>
              {getNavLinks().map((link, index) => (
                <motion.div
                  key={link.href}
                  custom={index}
                  variants={menuItemVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                >
                  <Link
                    href={link.href}
                    className={`block relative overflow-hidden rounded-md text-base md:text-lg font-medium transition-all duration-200 flex items-center`}
                    onClick={toggleMenu}
                  >
                    <motion.div
                      className="w-full px-4 py-4 z-10 relative"
                      whileHover={{ x: 5 }}
                      style={{
                        color: location === link.href ? "white" : "rgb(209, 213, 219)"
                      }}
                    >
                      {link.label}
                    </motion.div>
                    
                    {/* Background indicator */}
                    <motion.div 
                      className="absolute inset-0 z-0"
                      initial={{ x: "-100%" }}
                      animate={{ 
                        x: location === link.href ? 0 : "-100%" 
                      }}
                      style={{ 
                        backgroundColor: getNavAccentColor(link.href),
                        opacity: 0.15
                      }}
                    />
                    
                    {/* Left border indicator */}
                    {location === link.href && (
                      <motion.div 
                        className="absolute left-0 top-0 bottom-0 w-1 z-0"
                        initial={{ height: 0 }}
                        animate={{ height: "100%" }}
                        style={{ backgroundColor: getNavAccentColor(link.href) }}
                      />
                    )}
                  </Link>
                </motion.div>
              ))}
              
              {/* Mobile admin link */}
              {user && user.level === 9 && (
                <motion.div
                  custom={getNavLinks().length}
                  variants={menuItemVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                >
                  <Link
                    href="/admin"
                    className={`block relative overflow-hidden rounded-md text-base md:text-lg font-medium transition-all duration-200 flex items-center`}
                    onClick={toggleMenu}
                  >
                    <motion.div
                      className="w-full px-4 py-4 z-10 relative"
                      whileHover={{ x: 5 }}
                      style={{
                        color: location === '/admin' ? "white" : "rgb(209, 213, 219)"
                      }}
                    >
                      Admin
                    </motion.div>
                  </Link>
                </motion.div>
              )}
              
              {/* Mobile user info and logout */}
              {user && (
                <motion.div
                  custom={getNavLinks().length + (user.level === 9 ? 1 : 0)}
                  variants={menuItemVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  className="border-t border-gray-700 pt-2 mt-2"
                >
                  <div className="px-4 py-2 text-gray-300">
                    {user.username} {user.level >= 5 && (
                      user.level === 9 ? '(Super Admin)' :
                      user.level === 8 ? '(Admin)' :
                      user.level === 7 ? '(Moderator)' :
                      '(Staff)'
                    )}
                  </div>
                  <button
                    onClick={() => {
                      handleLogout();
                      toggleMenu();
                    }}
                    className="w-full text-left px-4 py-4 text-gray-300 hover:text-white flex items-center space-x-2"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Logout</span>
                  </button>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
