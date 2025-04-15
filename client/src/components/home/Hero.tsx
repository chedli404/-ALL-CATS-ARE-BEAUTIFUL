import { Link } from "wouter";
import { ChevronDown } from "lucide-react";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <header className="relative h-screen flex items-center justify-center overflow-hidden" style={{ backgroundColor: "rgb(30, 30, 30)" }}>
      <motion.div
        className="hero-container flex flex-col md:flex-row items-center"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        {/* Left side - Content */}
        <motion.div
          className="hero-content w-full md:w-1/2 pr-0 md:pr-8"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <h1 className="font-display text-5xl mb-6 text-white ml-[140px] text-[#64afd6]">ALL CATS ARE BEAUTIFUL</h1>
          <p className=" font-display text-[20px] text-gray-300 mb-8 ml-[50px] ">
            Le monde n'est plus qu'un écho du passé. Les grandes cités s'effondrent,<br></br> rongées par le temps et la nature. Mais tout n'a pas disparu. Les chats survivent.
          </p>
          <div className="buttons-container flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
            <Link href="#world">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className=" ml-[110px] w-full md:w-auto bg-technos hover:bg-technos/80 text-white font-display text-xl px-8 py-3 rounded-md transition-colors duration-300"
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
        </motion.div>

        {/* Right side - Video */}
        <motion.div
          className="hero-video w-full md:w-1/2 mt-8 md:mt-0"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <video
            className="rounded-lg  w-full"
            autoPlay
            loop
            muted
            playsInline
            style={{ 
              filter: "brightness(1.1)",
              
              opacity: 0.9, 
              paddingRight: "10px",
            }}
          >
            <source src="/attached_assets/last1.mov" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </motion.div>
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
