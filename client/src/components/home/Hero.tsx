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
        className="container mx-auto px-4 z-10 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="flex justify-center mb-6">
          <div className="relative w-40 h-40">
            <div className="absolute inset-0 bg-earth rounded-full flex items-center justify-center">
              <h1 className="font-display text-6xl tracking-wide text-gray-900">
                <span className="block text-7xl">AC</span>
                <span className="block -mt-4 text-7xl">AB</span>
              </h1>
            </div>
            <div className="absolute -bottom-2 left-0 w-full text-center">
              <div className="inline-block bg-black/80 px-3 py-1 rounded-full">
                <span className="text-white text-xs font-tech tracking-wider">L'HÉRITAGE</span>
              </div>
            </div>
          </div>
        </div>
        
        <h2 className="font-display text-4xl text-white mt-6 mb-4 tracking-wide">ALL CATS ARE BEAUTIFUL</h2>
        <p className="max-w-3xl mx-auto text-lg text-gray-200 mb-8">
          Le monde n'est plus qu'un écho du passé. Les grandes cités s'effondrent, rongées par le temps et la nature. Mais tout n'a pas disparu. Les chats survivent.
        </p>
        
        <div className="mt-12">
          <Link href="#world">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block bg-technos hover:bg-technos/80 text-white font-display text-xl px-8 py-3 rounded-md transition-colors duration-300 mr-4"
            >
              DÉCOUVRIR L'UNIVERS
            </motion.button>
          </Link>
          <Link href="/characters">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block bg-transparent border-2 border-white text-white hover:bg-white/10 font-display text-xl px-8 py-3 rounded-md transition-colors duration-300"
            >
              LES PERSONNAGES
            </motion.button>
          </Link>
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
