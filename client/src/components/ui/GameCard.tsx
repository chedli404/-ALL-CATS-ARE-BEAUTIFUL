import { motion } from "framer-motion";
import { GameCard as GameCardType } from "@/types";
import { Circle, User, Map, Zap } from "lucide-react";

interface GameCardProps {
  card: GameCardType;
  delay?: number;
}

const GameCard = ({ card, delay = 0 }: GameCardProps) => {
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, delay }
    }
  };

  const renderIcon = () => {
    switch (card.icon) {
      case "compass":
        return <Circle className="w-12 h-12 text-white" />;
      case "circle-dot":
        return <Circle className="w-12 h-12 text-white" />;
      case "zap":
        return <Zap className="w-12 h-12 text-white" />;
      case "users":
        return <User className="w-12 h-12 text-white" />;
      case "layers":
        return <Map className="w-12 h-12 text-white" />;
      default:
        return <Circle className="w-12 h-12 text-white" />;
    }
  };

  return (
    <motion.div 
      className="w-40 h-56 rounded-lg shadow-lg overflow-hidden transform hover:rotate-3 hover:scale-110 transition-transform duration-300"
      style={{ 
        background: `linear-gradient(to bottom right, ${card.color}, ${card.color}70)`
      }}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="h-1/2 p-2">
        <div className="bg-black/20 w-full h-full rounded flex items-center justify-center">
          {renderIcon()}
        </div>
      </div>
      <div className="h-1/2 bg-black/40 p-3">
        <h5 className="font-display text-white text-center mb-1">{card.name}</h5>
        <div className="flex justify-center space-x-1 mb-2">
          {[...Array(card.strength)].map((_, i) => (
            <span key={i} className="inline-block w-2 h-2 bg-white rounded-full"></span>
          ))}
        </div>
        <p className="text-white text-xs text-center">{card.description}</p>
      </div>
    </motion.div>
  );
};

export default GameCard;
