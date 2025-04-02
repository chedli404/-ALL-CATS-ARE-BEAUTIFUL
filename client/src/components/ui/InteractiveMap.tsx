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
    <div className="relative bg-earth-dark rounded-lg overflow-hidden shadow-lg">
      <svg viewBox="0 0 800 600" className="w-full h-auto">
        {/* Map Base */}
        <path d="M100,100 L700,100 L700,500 L100,500 Z" fill="#8C7F6D" stroke="#333" strokeWidth="2" />
        
        {/* Regions */}
        {MAP_REGIONS.map((region) => (
          <motion.path
            key={region.id}
            d={region.path}
            fill={region.color}
            stroke="#333"
            strokeWidth="2"
            className="cursor-pointer"
            onMouseEnter={() => handleMouseEnter(region)}
            onMouseLeave={handleMouseLeave}
            whileHover={{ 
              filter: "brightness(1.2)",
              transition: { duration: 0.3 }
            }}
          />
        ))}
        
        {/* Territories Labels */}
        <text x="200" y="170" fill="white" fontFamily="'Bebas Neue', cursive" fontSize="24">ÉNERGIE</text>
        <text x="390" y="150" fill="white" fontFamily="'Bebas Neue', cursive" fontSize="24">PLASTIQUE</text>
        <text x="580" y="150" fill="white" fontFamily="'Bebas Neue', cursive" fontSize="24">EAU</text>
        <text x="600" y="400" fill="white" fontFamily="'Bebas Neue', cursive" fontSize="24">MONTAGNE</text>
        <text x="380" y="370" fill="white" fontFamily="'Bebas Neue', cursive" fontSize="24">VERT</text>
        <text x="230" y="420" fill="white" fontFamily="'Bebas Neue', cursive" fontSize="24">VOLCANS</text>
        <text x="200" y="300" fill="#333" fontFamily="'Bebas Neue', cursive" fontSize="18">CENTRE</text>
        
        {/* Tribe Territories */}
        <circle cx="200" cy="170" r="15" fill="#E3A947" stroke="#333" strokeWidth="2" />
        <circle cx="600" cy="400" r="15" fill="#1C6E5F" stroke="#333" strokeWidth="2" />
        <circle cx="230" cy="420" r="15" fill="#C73E3A" stroke="#333" strokeWidth="2" />
      </svg>
      
      {/* Map Overlay Info Box */}
      {hoveredRegion && (
        <div className="absolute top-4 right-4 bg-black/80 p-4 rounded-lg max-w-xs">
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
