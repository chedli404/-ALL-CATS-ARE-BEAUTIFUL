import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Pyramid, CircleDot, Zap, Tent, Cpu, Shrub, VenetianMask } from "lucide-react";
import { Link } from "wouter";

interface TribeBannerProps {
  name: string;
  description: string;
  color: string;
  strengths: string[];
  icon: string;
  index: number;
  onHover?: () => void;
  onLeave?: () => void;
}

const TribeBanner = ({ 
  name, 
  description, 
  color, 
  strengths, 
  icon, 
  index, 
  onHover, 
  onLeave 
}: TribeBannerProps) => {
  const bannerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(bannerRef, { once: true, amount: 0.2 });

  const getIconComponent = () => {
    switch (name) {
      case "Nomades":
        return <Tent className="h-8 w-8" />;
      case "Anciens":
        return <Pyramid className="h-8 w-8" />;
      case "Technos":
        return <Cpu className="h-8 w-8" />;
      case "Écologistes":
        return <Shrub className="h-8 w-8" />;
      case "Mystiques":
        return <VenetianMask className="h-8 w-8" />;
      case "Électriques":
        return <Zap className="h-8 w-8" />;
      default:
        return <CircleDot className="h-8 w-8" />;
    }
  };

  const renderIcon = () => {
    if (icon && icon.startsWith('<svg')) {
      return <div dangerouslySetInnerHTML={{ __html: icon }} className="h-8 w-8" />;
    }
    return getIconComponent();
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <motion.div 
      ref={bannerRef}
      className="overflow-hidden rounded-lg shadow-xl bg-gray-900/70 backdrop-blur-sm border border-gray-800 relative h-full group"
      variants={itemVariants}
      whileHover={{ translateY: -8 }}
      onHoverStart={onHover}
      onHoverEnd={onLeave}
      transition={{ duration: 0.3 }}
    >
      {/* Top colored accent - tribe banner style */}
      <div 
        className="h-3 w-full tribe-banner"
        style={{ backgroundColor: color }}
      />

      <div className="p-6 relative z-10">
        {/* Tribe name and icon */}
        <div className="flex items-center gap-3 mb-4">
          <div 
            className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center shadow-inner"
            style={{ 
              backgroundColor: `${color}30`, 
              color: color,
              boxShadow: `inset 0 0 15px ${color}30, 0 0 5px ${color}50`
            }}
          >
            {renderIcon()}
          </div>
          <h3 
            className="font-display text-2xl text-white flex-grow transition-colors duration-300 group-hover:text-white"
            style={{ color: color }}
          >
            {name}
          </h3>
        </div>

        {/* Description */}
        <p className="font-body text-gray-300 mb-6 leading-relaxed line-clamp-5">
          {description}
        </p>

        {/* Strengths */}
        <div className="mt-auto">
          <h4 className="font-display text-sm text-gray-400 mb-2 uppercase tracking-wider">Forces</h4>
          <div className="flex flex-wrap gap-2">
            {strengths?.map((strength, i) => (
              <span 
                key={i}
                className="inline-block text-xs px-3 py-1 rounded-full transition-all duration-300 group-hover:scale-105"
                style={{ 
                  backgroundColor: `${color}20`,
                  color: color,
                  borderColor: `${color}40`,
                  borderWidth: "1px"
                }}
              >
                {strength}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Background decorative elements */}
      <div 
        className="absolute -bottom-12 -right-12 w-40 h-40 rounded-full opacity-10 transition-opacity duration-300 group-hover:opacity-20"
        style={{ backgroundColor: color }}
      />
      <div 
        className="absolute top-1/2 left-0 w-full h-24 bg-gradient-to-r opacity-5 transition-opacity duration-300 group-hover:opacity-10"
        style={{ backgroundImage: `linear-gradient(to right, transparent, ${color}, transparent)` }}
      />
      
      {/* Hover overlay for link */}
      <Link href="/tribes">
        <div className="absolute inset-0 cursor-pointer z-0"></div>
      </Link>
    </motion.div>
  );
};

export default TribeBanner;