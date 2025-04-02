import { useState, useEffect, useRef } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "framer-motion";
import CharacterCard from "@/components/ui/CharacterCard";
import { CHARACTERS_DATA } from "@/lib/constants";

const CharactersSection = () => {
  const [filter, setFilter] = useState("all");
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  
  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [controls, isInView]);
  
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  const filteredCharacters = filter === "all" 
    ? CHARACTERS_DATA 
    : CHARACTERS_DATA.filter(character => character.tribe === filter);

  return (
    <section id="characters" className="py-24 bg-gray-900" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.h2 
          className="font-display text-5xl mb-6 text-center text-white"
          variants={fadeIn}
          initial="hidden"
          animate={controls}
        >
          PERSONNAGES
        </motion.h2>
        <motion.p 
          className="text-gray-400 max-w-3xl mx-auto text-center mb-16"
          variants={fadeIn}
          initial="hidden"
          animate={controls}
          transition={{ delay: 0.2 }}
        >
          Des héros et survivants dans un monde post-apocalyptique, chacun avec sa propre histoire et ses motivations uniques.
        </motion.p>
        
        {/* Character filter buttons */}
        <motion.div 
          className="flex flex-wrap justify-center mb-12 gap-3"
          variants={fadeIn}
          initial="hidden"
          animate={controls}
          transition={{ delay: 0.3 }}
        >
          <button 
            className={`px-4 py-2 rounded-full font-display transition-colors ${
              filter === "all" 
                ? "bg-white text-gray-900" 
                : "bg-white/20 text-white hover:bg-white/30"
            }`}
            onClick={() => setFilter("all")}
          >
            Tous
          </button>
          <button 
            className={`px-4 py-2 rounded-full font-display transition-colors ${
              filter === "NOMADES" 
                ? "bg-[#1C6E5F] text-white" 
                : "bg-[#1C6E5F]/20 text-[#1C6E5F] border border-[#1C6E5F] hover:bg-[#1C6E5F] hover:text-white"
            }`}
            onClick={() => setFilter("NOMADES")}
          >
            Nomades
          </button>
          <button 
            className={`px-4 py-2 rounded-full font-display transition-colors ${
              filter === "ANCIENS" 
                ? "bg-[#E3A947] text-white" 
                : "bg-[#E3A947]/20 text-[#E3A947] border border-[#E3A947] hover:bg-[#E3A947] hover:text-white"
            }`}
            onClick={() => setFilter("ANCIENS")}
          >
            Anciens
          </button>
          <button 
            className={`px-4 py-2 rounded-full font-display transition-colors ${
              filter === "TECHNOS" 
                ? "bg-[#C73E3A] text-white" 
                : "bg-[#C73E3A]/20 text-[#C73E3A] border border-[#C73E3A] hover:bg-[#C73E3A] hover:text-white"
            }`}
            onClick={() => setFilter("TECHNOS")}
          >
            Technos
          </button>
        </motion.div>
        
        {/* Characters grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCharacters.map((character, index) => (
            <CharacterCard 
              key={character.id}
              character={character}
              delay={0.4 + (index * 0.1)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CharactersSection;
