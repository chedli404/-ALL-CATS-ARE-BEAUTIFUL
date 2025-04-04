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
      className="bg-gray-800 rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-2"
      ref={ref}
      variants={cardVariants}
      initial="hidden"
      animate={controls}
    >
      <div className="relative">
        <img 
          src={character.image} 
          alt={`${character.name} character`} 
          className="w-full h-64 object-cover"
        />
        <div 
          className="absolute top-0 right-0 m-4 px-3 py-1 rounded-full" 
          style={{ backgroundColor: character.tribeColor }}
        >
          <span className="text-white text-xs font-tech">{character.tribe}</span>
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex items-center mb-4">
          <div 
            className="w-12 h-12 rounded-full flex items-center justify-center mr-4" 
            style={{ backgroundColor: character.tribeColor }}
          >
            {renderTribeIcon()}
          </div>
          <h3 className="font-display text-2xl text-white">{character.name}</h3>
        </div>
        
        <p className="text-gray-400 mb-6 line-clamp-3">
          {character.description}
        </p>
        
        <div className="flex justify-between items-center">
          <div>
            {character.traits.map((trait, index) => (
              <span 
                key={index} 
                className="inline-block bg-gray-700 rounded-full px-3 py-1 text-sm font-tech text-gray-300 mr-2 mb-2"
              >
                {trait}
              </span>
            ))}
          </div>
          <Link href={`/characters/${character.id}`}>
            <button 
              className="text-white font-display"
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
