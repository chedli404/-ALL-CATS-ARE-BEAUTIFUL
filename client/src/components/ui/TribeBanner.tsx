import { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Compass, CircleDot, Zap, Layers } from "lucide-react";

interface TribeBannerProps {
  name: string;
  description: string;
  color: string;
  strengths: string[];
  icon: string;
  delay?: number;
}

const TribeBanner = ({ name, description, color, strengths, icon, delay = 0 }: TribeBannerProps) => {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  
  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [controls, isInView]);
  
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, delay }
    }
  };

  const getBannerBackground = () => {
    if (name === "NOMADES") {
      return "bg-[#1c7f5f] from-[#1c7f5f]/80 to-[#1c7f5f]";
    } else if (name === "ANCIENS") {
      return "bg-[#e5ab47] from-[#e5ab47]/80 to-[#e5ab47]";
    } else if (name === "TECHNOS") {
      return "bg-[#c73e3a] from-[#c73e3a]/80 to-[#c73e3a]";
    }
    return "";
  };

  const getSymbolColor = () => {
    if (name === "NOMADES") {
      return "#5ecfc1"; // Light teal for Nomades symbol
    } else if (name === "ANCIENS") {
      return "#f8d77e"; // Light yellow for Anciens symbol
    } else if (name === "TECHNOS") {
      return "#ff6259"; // Light red for Technos symbol
    }
    return "white";
  };

  const getSymbol = () => {
    if (name === "NOMADES") {
      return (
        <svg viewBox="0 0 100 100" className="w-16 h-16">
          <circle cx="50" cy="50" r="40" fill={getSymbolColor()} />
          <path d="M30 30 L70 70 M30 70 L70 30 M50 20 L50 80 M20 50 L80 50" stroke="black" strokeWidth="5" fill="none" />
        </svg>
      );
    } else if (name === "ANCIENS") {
      return (
        <svg viewBox="0 0 100 100" className="w-16 h-16">
          <circle cx="50" cy="50" r="40" fill={getSymbolColor()} />
          <path d="M50 25 L50 75 M35 55 C35 70, 65 70, 65 55" stroke="black" strokeWidth="5" fill="none" />
          <circle cx="50" cy="35" r="3" fill="black" />
        </svg>
      );
    } else if (name === "TECHNOS") {
      return (
        <svg viewBox="0 0 100 100" className="w-16 h-16">
          <circle cx="50" cy="50" r="40" fill={getSymbolColor()} />
          <path d="M40 25 L60 75 M30 45 L70 45" stroke="black" strokeWidth="5" fill="none" />
        </svg>
      );
    }
    return <CircleDot className="w-16 h-16 text-white" />;
  };

  return (
    <motion.div 
      className="tribe-banner flex flex-col items-center max-w-xs mx-auto h-full"
      ref={ref}
      variants={fadeIn}
      initial="hidden"
      animate={controls}
    >
      <div className="tribe-name-banner w-full text-center py-2 mb-1 bg-gray-800">
        <h3 className="font-display text-2xl text-white">{name}</h3>
      </div>
      
      <div 
        className={`banner-body relative w-full pt-6 pb-12 px-4 ${getBannerBackground()} bg-gradient-to-b`}
        style={{ 
          clipPath: "polygon(0% 0%, 100% 0%, 95% 96%, 5% 96%, 0% 100%)",
          boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
          minHeight: "340px"
        }}
      >
        <div className="flex justify-center mb-6">
          <div className="rounded-full p-1 border-2 border-gray-800/40 bg-gray-900/10">
            {getSymbol()}
          </div>
        </div>
        
        <div className="banner-sunrays w-32 h-8 mx-auto mb-4">
          <svg viewBox="0 0 100 40" className="w-full h-full">
            <path d="M10 30 L50 5 L90 30" 
                  stroke={name === "TECHNOS" ? "#ff6259" : name === "ANCIENS" ? "#f8d77e" : "#5ecfc1"} 
                  strokeWidth="2" 
                  fill="none" />
            <circle cx="50" cy="30" r="5" 
                    fill={name === "TECHNOS" ? "#ff6259" : name === "ANCIENS" ? "#f8d77e" : "#5ecfc1"} />
          </svg>
        </div>
        
        <div className="banner-description mb-6">
          <p className={`text-sm text-center ${name === "ANCIENS" ? "text-gray-800" : "text-gray-100"}`}>
            {description.length > 120 ? description.substring(0, 120) + "..." : description}
          </p>
        </div>
        
        <ul className={`space-y-1 mt-4 text-sm ${name === "ANCIENS" ? "text-gray-800" : "text-gray-100"}`}>
          {strengths.map((strength, index) => (
            <li key={index} className="flex items-center">
              <span className="w-5 text-center">
                {index === 0 ? (
                  <Compass className="h-3 w-3 inline" />
                ) : index === 1 ? (
                  <Layers className="h-3 w-3 inline" />
                ) : (
                  <Zap className="h-3 w-3 inline" />
                )}
              </span>
              <span className="ml-2 text-xs">{strength}</span>
            </li>
          ))}
        </ul>
        
        <div className="banner-tassels absolute bottom-0 left-0 right-0 h-3 flex justify-center">
          {[...Array(7)].map((_, i) => (
            <div 
              key={i} 
              className="tassel mx-1 w-1 h-6"
              style={{ 
                backgroundColor: name === "NOMADES" ? "#5ecfc1" : 
                               name === "ANCIENS" ? "#f8d77e" : "#ff6259",
                transform: "translateY(3px)"
              }}
            ></div>
          ))}
        </div>
      </div>
      
      <div className="mt-4 text-center">
        <button 
          className={`inline-block font-display px-4 py-1 text-sm rounded transition-colors duration-300
            ${name === "NOMADES" ? "bg-[#1c7f5f] hover:bg-[#1c7f5f]/80 text-white" : 
              name === "ANCIENS" ? "bg-[#e5ab47] hover:bg-[#e5ab47]/80 text-gray-800" : 
              "bg-[#c73e3a] hover:bg-[#c73e3a]/80 text-white"}`}
        >
          DÉCOUVRIR
        </button>
      </div>
    </motion.div>
  );
};

export default TribeBanner;
