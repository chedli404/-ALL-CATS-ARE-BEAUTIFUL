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
      return "tribe-nomades-bg bg-[#1c7f5f] from-[#1c7f5f]/80 to-[#1c7f5f]";
    } else if (name === "ANCIENS") {
      return "tribe-anciens-bg bg-[#e5ab47] from-[#e5ab47]/80 to-[#e5ab47]";
    } else if (name === "TECHNOS") {
      return "tribe-technos-bg bg-[#c73e3a] from-[#c73e3a]/80 to-[#c73e3a]";
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
      className="tribe-banner-container"
      ref={ref}
      variants={fadeIn}
      initial="hidden"
      animate={controls}
    >
      <div className="tribe-title-header">
        <h3 className="tribe-title">{name}</h3>
      </div>
      
      <div 
        className={`tribe-content-body ${getBannerBackground()}`}
        style={{ 
          clipPath: "polygon(0% 0%, 100% 0%, 95% 96%, 5% 96%, 0% 100%)",
          boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
          minHeight: "340px"
        }}
      >
        <div className="tribe-symbol-container">
          <div className="tribe-symbol-circle">
            {getSymbol()}
          </div>
        </div>
        
        <div className="tribe-decorative-element">
          <svg viewBox="0 0 100 40" className="tribe-decorative-svg">
            <path d="M10 30 L50 5 L90 30" 
                  stroke={name === "TECHNOS" ? "#ff6259" : name === "ANCIENS" ? "#f8d77e" : "#5ecfc1"} 
                  strokeWidth="2" 
                  fill="none" />
            <circle cx="50" cy="30" r="5" 
                    fill={name === "TECHNOS" ? "#ff6259" : name === "ANCIENS" ? "#f8d77e" : "#5ecfc1"} />
          </svg>
        </div>
        
        <div className="tribe-description-container">
          <p className={`tribe-description ${name === "ANCIENS" ? "text-dark" : "text-light"}`}>
            {description.length > 120 ? description.substring(0, 120) + "..." : description}
          </p>
        </div>
        
        <ul className={`tribe-strengths-list ${name === "ANCIENS" ? "text-dark" : "text-light"}`}>
          {strengths.map((strength, index) => (
            <li key={index} className="tribe-strength-item">
              <span className="tribe-strength-icon">
                {index === 0 ? (
                  <Compass className="tribe-strength-icon-small" />
                ) : index === 1 ? (
                  <Layers className="tribe-strength-icon-small" />
                ) : (
                  <Zap className="tribe-strength-icon-small" />
                )}
              </span>
              <span className="tribe-strength-text">{strength}</span>
            </li>
          ))}
        </ul>
        
        <div className="tribe-decoration-bottom">
          {[...Array(7)].map((_, i) => (
            <div 
              key={i} 
              className="tribe-decoration-tassel"
              style={{ 
                backgroundColor: name === "NOMADES" ? "#5ecfc1" : 
                               name === "ANCIENS" ? "#f8d77e" : "#ff6259",
                transform: "translateY(3px)"
              }}
            ></div>
          ))}
        </div>
      </div>
      
      <div className="tribe-button-container">
        <button 
          className={`tribe-discover-button
            ${name === "NOMADES" ? "button-nomades" : 
              name === "ANCIENS" ? "button-anciens" : 
              "button-technos"}`}
        >
          DÉCOUVRIR
        </button>
      </div>
    </motion.div>
  );
};

export default TribeBanner;
