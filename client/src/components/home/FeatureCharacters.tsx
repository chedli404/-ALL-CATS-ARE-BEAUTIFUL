import { useState, useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { CHARACTERS_DATA } from '@/lib/constants';
import RotatingCards from '@/components/characters/RotatingCards';
import AnimatedHeading from '@/components/ui/AnimatedHeading';

const FeatureCharacters = () => {
  // Use state for filter to maintain consistency with the Characters page
  const [filter] = useState("all");
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.3 });
  
  // Parallax effect for background
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.3, 1, 1, 0.3]);
  
  return (
    <motion.div 
      ref={sectionRef}
      className="relative py-20 overflow-hidden"
      style={{ backgroundColor: "#111111" }}
    >
      {/* Animated background patterns */}
      <motion.div 
        className="absolute inset-0 z-0 pointer-events-none" 
        style={{ 
          backgroundImage: `
            radial-gradient(circle at 20% 30%, rgba(28, 110, 95, 0.1), transparent 20%),
            radial-gradient(circle at 80% 70%, rgba(227, 169, 71, 0.1), transparent 25%),
            radial-gradient(circle at 50% 50%, rgba(199, 62, 58, 0.05), transparent 50%)
          `,
          y: backgroundY,
          opacity
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        {/* Use the reusable AnimatedHeading component */}
        <AnimatedHeading 
          text="PERSONNAGES" 
          color="#64afd6"
          fontSize="text-3xl sm:text-4xl md:text-5xl"
        />
        
        <motion.p 
          className="text-gray-300 max-w-3xl mx-auto text-center mb-16 text-lg leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          style={{ fontFamily: '"Nunito Sans", sans-serif' }}
        >
          Découvrez les chats qui survivent dans ce monde post-apocalyptique, chacun avec son histoire et ses motivations uniques.
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="min-h-[70vh] md:min-h-[80vh] relative"
        >
          {/* Custom card container with subtle animation */}
          <div className="relative">
            {/* Glowing background circles */}
            <motion.div 
              className="absolute -top-20 -left-20 w-40 h-40 rounded-full blur-3xl z-0 opacity-20 bg-[#1C6E5F]"
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.2, 0.3, 0.2],
              }}
              transition={{ 
                repeat: Infinity, 
                duration: 8,
                ease: "easeInOut" 
              }}
            />
            <motion.div 
              className="absolute -bottom-20 -right-20 w-60 h-60 rounded-full blur-3xl z-0 opacity-20 bg-[#C73E3A]"
              animate={{ 
                scale: [1, 1.3, 1],
                opacity: [0.2, 0.25, 0.2],
              }}
              transition={{ 
                repeat: Infinity, 
                duration: 10,
                ease: "easeInOut",
                delay: 1
              }}
            />

            {/* Use the shared RotatingCards component with character data */}
            <RotatingCards 
              characters={CHARACTERS_DATA} 
              filter={filter}
            />
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default FeatureCharacters;