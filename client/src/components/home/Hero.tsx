import { Link } from "wouter";
import { ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";

const Hero = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.src = "/attached_assets/9abila.MP4";
    }
  }, []);

  return (
    <header className="hero-section">
      <div className="hero-background">
        <video 
          ref={videoRef}
          autoPlay 
          loop 
          muted 
          playsInline
          className="hero-video"
        />
        <div className="hero-overlay"></div>
      </div>
      
      <motion.div 
        className="hero-content"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="hero-content-container">
          <div className="hero-text-block">
            <h2 className="hero-title">
              ALL CATS ARE BEAUTIFUL</h2>
            <p className="hero-description">
              Le monde n'est plus qu'un écho du passé. Les grandes cités s'effondrent, rongées par le temps et la nature. Mais tout n'a pas disparu. Les chats survivent.
            </p>
          </div>
          
          <div className="hero-buttons-block">
            <Link href="#world">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="button-primary"
              >
                DÉCOUVRIR L'UNIVERS
              </motion.button>
            </Link>
            <Link href="/characters">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="button-outline"
              >
                LES PERSONNAGES
              </motion.button>
            </Link>
          </div>
        </div>
      </motion.div>
      
      <motion.div 
        className="scroll-indicator"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
      >
        <a href="#world" className="scroll-indicator-link">
          <ChevronDown className="scroll-indicator-icon" />
        </a>
      </motion.div>
    </header>
  );
};

export default Hero;
