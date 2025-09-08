import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MAP_REGIONS } from '@/lib/constants.ts';
import NewAnimatedHeading from './NewAnimatedHeading';

interface RegionTooltipProps {
  region: typeof MAP_REGIONS[0];
  position: { x: number; y: number };
  onClose: () => void;
}

const RegionTooltip = ({ region, position, onClose }: RegionTooltipProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.2 }}
      className="absolute z-20 bg-glass backdrop-blur-lg p-4 rounded-lg shadow-xl border border-white border-opacity-10 max-w-xs w-full"
      style={{
        left: position.x,
        top: position.y + 20,
        transform: 'translateX(-50%)',
      }}
    >
      <div 
        className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-4 h-4 rotate-45"
        style={{ backgroundColor: region.color, opacity: 0.6 }}
      />
      <h3 
        className="heading-section text-lg mb-2"
        style={{ color: region.color }}
      >
        {region.name}
      </h3>
      <p className="text-text-dim text-sm mb-3">{region.description}</p>
      <div 
        className="text-xs py-1 px-2 rounded-full inline-block"
        style={{ backgroundColor: `${region.color}20`, color: region.color }}
      >
        {MAP_REGIONS.find(t => t.tribeId === region.tribeId)?.name || 'Territoire neutre'}
      </div>
      <button
        onClick={onClose}
        className="absolute top-2 right-2 text-text-dim hover:text-white transition-colors"
      >
        ×
      </button>
    </motion.div>
  );
};

const InteractiveMap = () => {
  const [activeRegion, setActiveRegion] = useState<typeof MAP_REGIONS[0] | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const mapRef = useRef<SVGSVGElement>(null);
  const [mapSize, setMapSize] = useState({ width: 0, height: 0 });
  
  // Update map size on window resize
  useEffect(() => {
    const updateMapSize = () => {
      if (mapRef.current) {
        const { width, height } = mapRef.current.getBoundingClientRect();
        setMapSize({ width, height });
      }
    };
    
    updateMapSize();
    window.addEventListener('resize', updateMapSize);
    return () => window.removeEventListener('resize', updateMapSize);
  }, []);
  
  const handleRegionClick = (region: typeof MAP_REGIONS[0], event: React.MouseEvent<SVGPathElement>) => {
    const svgRect = mapRef.current?.getBoundingClientRect();
    if (svgRect) {
      const x = event.clientX - svgRect.left;
      const y = event.clientY - svgRect.top;
      setTooltipPosition({ x, y });
      setActiveRegion(region);
    }
  };
  
  return (
    <div className="relative">
      <svg 
        ref={mapRef}
        viewBox="0 0 600 500"
        className="w-full border border-white border-opacity-10 rounded-lg bg-glass backdrop-blur-md p-4"
      >
        {/* Base layer / background */}
        <rect 
          x="0" 
          y="0" 
          width="600" 
          height="500" 
          fill="rgba(18, 18, 18, 0.5)" 
          rx="10" 
          ry="10" 
        />
        
        {/* Grid lines for map */}
        <g opacity="0.1">
          {Array(15).fill(0).map((_, i) => (
            <line 
              key={`h-${i}`}
              x1="0" 
              y1={i * 40} 
              x2="600" 
              y2={i * 40} 
              stroke="white" 
              strokeWidth="1" 
            />
          ))}
          {Array(15).fill(0).map((_, i) => (
            <line 
              key={`v-${i}`}
              x1={i * 40} 
              y1="0" 
              x2={i * 40} 
              y2="500" 
              stroke="white" 
              strokeWidth="1" 
            />
          ))}
        </g>
        
        {/* Territory regions */}
        {MAP_REGIONS.map((region) => (
          <g key={region.id}>
            <motion.path
              d={region.svgPath}
              fill={`${region.color}30`}
              stroke={region.color}
              strokeWidth="2"
              onClick={(e: React.MouseEvent<SVGPathElement>) => handleRegionClick(region, e)}
              whileHover={{ 
                fill: `${region.color}50`,
                filter: 'drop-shadow(0 0 5px rgba(255, 255, 255, 0.5))'
              }}
              transition={{ duration: 0.2 }}
              style={{ cursor: 'pointer' }}
            />
          </g>
        ))}
        
        {/* Decorative elements - rivers or paths */}
        <path 
          d="M100,100 Q200,50 300,150 T500,200 Q450,300 350,350 T150,380" 
          fill="none" 
          stroke="rgba(77, 195, 247, 0.4)" 
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray="1 10"
        />
        
        {/* Map legend */}
        <g transform="translate(20, 430)">
          <rect x="0" y="0" width="120" height="50" fill="rgba(0,0,0,0.3)" rx="5" ry="5" />
          <text x="10" y="20" fill="var(--text-dim)" className="text-xs">LÉGENDE</text>
          <rect x="10" y="30" width="10" height="10" fill="var(--primary)" opacity="0.5" />
          <text x="25" y="38" fill="var(--text-light)" className="text-xs">Territoires tribaux</text>
        </g>
      </svg>
      
      {/* Tooltip for active region */}
      <AnimatePresence>
        {activeRegion && (
          <RegionTooltip 
            region={activeRegion} 
            position={tooltipPosition}
            onClose={() => setActiveRegion(null)}
          />
        )}
      </AnimatePresence>
      
      {/* Controls */}
      <div className="absolute bottom-5 right-5 flex space-x-2">
        <motion.button
          className="p-2 rounded-full bg-glass backdrop-blur-sm text-white hover:bg-primary hover:bg-opacity-20 transition-all duration-200"
          whileTap={{ scale: 0.95 }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
        </motion.button>
        <motion.button
          className="p-2 rounded-full bg-glass backdrop-blur-sm text-white hover:bg-primary hover:bg-opacity-20 transition-all duration-200"
          whileTap={{ scale: 0.95 }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M8 12h8"/><path d="M12 8v8"/></svg>
        </motion.button>
      </div>
    </div>
  );
};

export default InteractiveMap;