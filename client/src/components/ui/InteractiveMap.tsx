import { useState } from "react";
import { motion } from "framer-motion";
import { MAP_REGIONS } from "@/lib/constants";

interface RegionInfo {
  name: string;
  description: string;
  tribe: string;
}

const InteractiveMap = () => {
  const [hoveredRegion, setHoveredRegion] = useState<RegionInfo | null>(null);

  const handleMouseEnter = (region: any) => {
    setHoveredRegion({
      name: region.name,
      description: region.description,
      tribe: region.tribe
    });
  };

  const handleMouseLeave = () => {
    setHoveredRegion(null);
  };

  return (
    <div className="relative rounded-lg overflow-hidden shadow-xl">
      <div className="relative">
        {/* Map Base Image */}
        <img 
          src="/attached_assets/MAP.png" 
          alt="ACAB World Map" 
          className="w-full h-auto"
        />
        
        {/* Interactive Overlay */}
        <svg 
          viewBox="0 0 800 600" 
          className="absolute top-0 left-0 w-full h-full"
          style={{ pointerEvents: 'none' }}
        >
          {/* Regions - set to transparent but keep the hover effects */}
          {MAP_REGIONS.map((region) => (
            <motion.path
              key={region.id}
              d={region.path}
              fill="transparent"
              stroke="transparent"
              className="cursor-pointer"
              style={{ pointerEvents: 'auto' }}
              onMouseEnter={() => handleMouseEnter(region)}
              onMouseLeave={handleMouseLeave}
              whileHover={{ 
                opacity: 0.2,
                fill: region.color,
                transition: { duration: 0.3 }
              }}
            />
          ))}
        </svg>
      </div>
      
      {/* Map Overlay Info Box */}
      {hoveredRegion && (
        <div className="absolute top-4 right-4 bg-black/80 p-4 rounded-lg max-w-xs backdrop-blur-sm">
          <h4 className="font-display text-xl text-white mb-2">{hoveredRegion.name}</h4>
          <p className="text-gray-300 text-sm mb-2">{hoveredRegion.description}</p>
          <div className="flex items-center">
            <span className="text-xs font-tech text-gray-400 mr-2">Contrôlé par:</span>
            <span className="text-xs font-tech text-white">{hoveredRegion.tribe}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default InteractiveMap;
