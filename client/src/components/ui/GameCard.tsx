import { motion } from "framer-motion";
import { GAME_CARDS } from "@/lib/constants.ts";
import { Circle, User, Map, Zap, Bookmark, FileBarChart2 } from "lucide-react";

type GameCardType = {
  id: number;
  name: string;
  type: string;
  tribe?: string;
  strength: number;
  description: string;
  imageIcon: string;
};

interface GameCardProps {
  card: GameCardType;
  delay?: number;
}

const GameCard = ({ card, delay = 0 }: GameCardProps) => {
  const cardVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { 
        type: "spring",
        stiffness: 400, 
        damping: 20, 
        mass: 1,
        delay 
      }
    }
  };

  // Set card color based on tribe or type
  const getCardColor = () => {
    if (card.tribe) {
      switch (card.tribe) {
        case "Nomades": return "var(--nomade)";
        case "Anciens": return "var(--ancien)";
        case "Technos": return "var(--techno)";
        case "Écologistes": return "var(--ecologiste)";
        case "Mystiques": return "var(--mystique)";
        case "Électriques": return "var(--electrique)";
        default: return "#555";
      }
    } else {
      // For non-tribe cards based on type
      switch (card.type) {
        case "Objet": return "#1f8c9d";
        case "Territoire": return "#5c8c37";
        case "Événement": return "#8c3762";
        case "Action": return "#8c6f37";
        default: return "#555";
      }
    }
  };

  const renderIcon = () => {
    if (card.imageIcon) {
      return <div className="text-4xl">{card.imageIcon}</div>;
    }

    switch (card.type) {
      case "Personnage":
        return <User className="w-12 h-12" />;
      case "Objet":
        return <Circle className="w-12 h-12" />;
      case "Territoire":
        return <Map className="w-12 h-12" />;
      case "Événement":
        return <Zap className="w-12 h-12" />;
      case "Action":
        return <FileBarChart2 className="w-12 h-12" />;
      default:
        return <Bookmark className="w-12 h-12" />;
    }
  };

  const cardBgColor = getCardColor();

  return (
    <motion.div 
      className="relative w-48 h-64 rounded-lg overflow-hidden shadow-xl group"
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover={{ 
        scale: 1.05,
        rotate: 2,
        transition: { duration: 0.2 }
      }}
      style={{ 
        backgroundImage: `linear-gradient(to bottom, ${cardBgColor}DD, ${cardBgColor}99)`,
        boxShadow: `0 8px 20px rgba(0, 0, 0, 0.3), 0 0 0 1px ${cardBgColor}33`
      }}
    >
      {/* Card frame and border details */}
      <div className="absolute inset-px border border-white/10 rounded-lg pointer-events-none"></div>
      <div className="absolute inset-0 bg-[url('/attached_assets/histoir.png')] bg-cover bg-center opacity-5"></div>
      
      {/* Card header with type and tribe */}
      <div className="px-3 py-2 border-b border-white/20 bg-black/30 flex justify-between items-center">
        <span className="font-display text-xs text-white/90">{card.type}</span>
        {card.tribe && (
          <span className="font-display text-xs px-2 py-0.5 rounded-full text-white/90 bg-white/10">
            {card.tribe}
          </span>
        )}
      </div>
      
      {/* Card main content */}
      <div className="h-[calc(100%-70px)] p-3 flex flex-col">
        {/* Card icon area */}
        <div className="flex justify-center items-center mb-3">
          <div className="w-16 h-16 rounded-full bg-black/20 flex items-center justify-center text-white">
            {renderIcon()}
          </div>
        </div>
        
        {/* Card name */}
        <h5 className="font-display text-center text-white text-base mb-2">{card.name}</h5>
        
        {/* Strength indicators (if any) */}
        {card.strength > 0 && (
          <div className="flex justify-center space-x-1 mb-2">
            {[...Array(card.strength)].map((_, i) => (
              <span 
                key={i} 
                className="inline-block w-2 h-2 bg-white rounded-full"
                style={{ boxShadow: "0 0 5px rgba(255,255,255,0.7)" }}
              />
            ))}
          </div>
        )}
        
        {/* Card description */}
        <p className="text-white/90 text-xs text-center mt-auto">{card.description}</p>
      </div>
      
      {/* Card bottom frame */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10"></div>
      
      {/* Hover effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
    </motion.div>
  );
};

export default GameCard;
