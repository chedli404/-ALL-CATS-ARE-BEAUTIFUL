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
      className="bg-gray-800 rounded-lg overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
      ref={ref}
      variants={cardVariants}
      initial="hidden"
      animate={controls}
    >
      <div className="relative">
        <img 
          src={character.image} 
          alt={`${character.name} character`} 
          className="w-full h-48 object-cover"
        />
        <div 
          className="absolute top-2 right-2 px-2 py-1 rounded text-xs text-white" 
          style={{ backgroundColor: character.tribeColor }}
        >
          {character.tribe}
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex items-center mb-3">
          <div 
            className="w-8 h-8 rounded-full flex items-center justify-center mr-3" 
            style={{ backgroundColor: character.tribeColor }}
          >
            {renderTribeIcon()}
          </div>
          <h3 className="font-display text-xl text-white">{character.name}</h3>
        </div>
        
        <p className="text-gray-400 mb-4 text-sm line-clamp-2">
          {character.description}
        </p>
        
        <div className="flex flex-wrap gap-1 mb-4">
          {character.traits.slice(0, 2).map((trait, index) => (
            <span 
              key={index} 
              className="inline-block bg-gray-700 rounded px-2 py-1 text-xs text-gray-300"
            >
              {trait}
            </span>
          ))}
        </div>
        
        <Link href={`/characters/${character._id || character.id}`}>
          <button 
            className="text-sm font-medium hover:underline"
            style={{ color: character.tribeColor }}
          >
            VOIR PLUS →
          </button>
        </Link>
      </div>
    </motion.div>
  );
};

export default CharacterCard;
