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

  const renderIcon = () => {
    switch (icon) {
      case "compass":
        return <Compass className="w-12 h-12 text-white" />;
      case "circle-dot":
        return <CircleDot className="w-12 h-12 text-white" />;
      case "zap":
        return <Zap className="w-12 h-12 text-white" />;
      case "layers":
        return <Layers className="w-12 h-12 text-white" />;
      default:
        return <CircleDot className="w-12 h-12 text-white" />;
    }
  };

  return (
    <motion.div 
      className="tribe-banner p-6 rounded-lg shadow-lg"
      style={{ 
        backgroundColor: color,
        clipPath: "polygon(0% 0%, 100% 0%, 95% 100%, 5% 100%)"
      }}
      ref={ref}
      variants={fadeIn}
      initial="hidden"
      animate={controls}
    >
      <div className="flex justify-center mb-4">
        <div className="w-20 h-20 bg-earth-dark/20 rounded-full flex items-center justify-center">
          {renderIcon()}
        </div>
      </div>
      
      <h3 className="font-display text-3xl text-white text-center mb-3">{name}</h3>
      
      <div className="text-center mb-4">
        <div className="inline-flex">
          {[1, 2, 3, 4, 5].map((_, i) => (
            <span 
              key={i} 
              className="h-3.5 w-1.5 mx-0.5 inline-block"
              style={{ backgroundColor: name === "NOMADES" ? "#E3A947" : "#8C7F6D" }}
            ></span>
          ))}
        </div>
      </div>
      
      <p className={`${name === "ANCIENS" ? "text-gray-900" : "text-gray-100"} mb-6`}>
        {description}
      </p>
      
      <ul className={`space-y-2 ${name === "ANCIENS" ? "text-gray-800" : "text-gray-200"}`}>
        {strengths.map((strength, index) => (
          <li key={index} className="flex items-center">
            <span className="w-6 text-center">
              {index === 0 ? (
                <Compass className="h-4 w-4 inline" />
              ) : index === 1 ? (
                <Layers className="h-4 w-4 inline" />
              ) : (
                <Zap className="h-4 w-4 inline" />
              )}
            </span>
            <span className="ml-2">{strength}</span>
          </li>
        ))}
      </ul>
      
      <div className="mt-6 text-center">
        <button 
          className={`inline-block ${
            name === "ANCIENS" 
              ? "bg-earth-dark/20 hover:bg-earth-dark/30 text-gray-900" 
              : "bg-white/10 hover:bg-white/20 text-white"
          } font-display px-4 py-2 rounded transition-colors duration-300`}
        >
          DÉCOUVRIR
        </button>
      </div>
    </motion.div>
  );
};

export default TribeBanner;
