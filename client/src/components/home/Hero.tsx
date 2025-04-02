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
    <header className="relative h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <video 
          ref={videoRef}
          autoPlay 
          loop 
          muted 
          playsInline
          className="object-cover w-full h-full opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-earth-dark/90"></div>
      </div>
      
      <motion.div 
        className="container mx-auto px-4 z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="md:w-1/2 text-left mb-8 md:mb-0">
            <h2 className="font-display text-5xl text-white mb-4 tracking-wide -ml-12">ALL CATS ARE BEAUTIFUL</h2>
            <p className="max-w-xl text-lg text-gray-200">
              Le monde n'est plus qu'un écho du passé. Les grandes cités s'effondrent, rongées par le temps et la nature. Mais tout n'a pas disparu. Les chats survivent.
            </p>
          </div>
          
          <div className="md:w-1/2 flex flex-col md:flex-row justify-end items-center space-y-4 md:space-y-0 md:space-x-4">
            <Link href="#world">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full md:w-auto bg-technos hover:bg-technos/80 text-white font-display text-xl px-8 py-3 rounded-md transition-colors duration-300"
              >
                DÉCOUVRIR L'UNIVERS
              </motion.button>
            </Link>
            <Link href="/characters">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full md:w-auto bg-transparent border-2 border-white text-white hover:bg-white/10 font-display text-xl px-8 py-3 rounded-md transition-colors duration-300"
              >
                LES PERSONNAGES
              </motion.button>
            </Link>
          </div>
        </div>
      </motion.div>
      
      <motion.div 
        className="absolute bottom-8 left-0 right-0 text-center"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
      >
        <a href="#world" className="text-white">
          <ChevronDown className="h-8 w-8 mx-auto" />
        </a>
      </motion.div>
    </header>
  );
};

export default Hero;
