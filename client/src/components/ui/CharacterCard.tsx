import { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "wouter";
import { Character } from "@/types";
import { Compass, CircleDot, Zap } from "lucide-react";

interface CharacterCardProps {
  character: Character;
  delay?: number;
}

const CharacterCard = ({ character, delay = 0 }: CharacterCardProps) => {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  
  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [controls, isInView]);
  
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, delay }
    }
  };

  const renderTribeIcon = () => {
    switch (character.tribe) {
      case "NOMADES":
        return <Compass className="w-6 h-6 text-white" />;
      case "ANCIENS":
        return <CircleDot className="w-6 h-6 text-white" />;
      case "TECHNOS":
        return <Zap className="w-6 h-6 text-white" />;
      default:
        return <Compass className="w-6 h-6 text-white" />;
    }
  };

  return (
    <motion.div 
      className="character-card"
      ref={ref}
      variants={cardVariants}
      initial="hidden"
      animate={controls}
    >
      <div className="character-image-container">
        <img 
          src={character.image} 
          alt={`${character.name} character`} 
          className="character-image"
        />
        <div 
          className="character-tribe-badge" 
          style={{ backgroundColor: character.tribeColor }}
        >
          <span className="character-tribe-name">{character.tribe}</span>
        </div>
      </div>
      
      <div className="character-info-container">
        <div className="character-header">
          <div 
            className="character-icon" 
            style={{ backgroundColor: character.tribeColor }}
          >
            {renderTribeIcon()}
          </div>
          <h3 className="character-name">{character.name}</h3>
        </div>
        
        <p className="character-description">
          {character.description}
        </p>
        
        <div className="character-footer">
          <div className="character-traits-container">
            {character.traits.map((trait, index) => (
              <span 
                key={index} 
                className="character-trait-badge"
              >
                {trait}
              </span>
            ))}
          </div>
          <Link href={`/characters/${character.id}`}>
            <button 
              className="character-detail-button"
              style={{ color: character.tribeColor }}
            >
              VOIR PLUS
            </button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default CharacterCard;
