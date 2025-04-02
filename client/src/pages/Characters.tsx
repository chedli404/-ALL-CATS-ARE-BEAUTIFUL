import { useState } from "react";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import CharacterCard from "@/components/ui/CharacterCard";
import { CHARACTERS_DATA } from "@/lib/constants";
import { Character } from "@/types";

const Characters = () => {
  const [filter, setFilter] = useState("all");

  // In a real implementation, this would be replaced with the API call
  const { data: characters, isLoading } = useQuery<Character[]>({
    queryKey: ['/api/characters'],
    // Using mock data for now
    initialData: CHARACTERS_DATA
  });

  const filteredCharacters = characters 
    ? filter === "all" 
      ? characters 
      : characters.filter(character => character.tribe === filter)
    : [];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="bg-gray-900 min-h-screen py-24">
      <div className="container mx-auto px-4">
        <motion.h1 
          className="font-display text-5xl mb-6 text-center text-white"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          PERSONNAGES
        </motion.h1>
        <motion.p 
          className="text-gray-400 max-w-3xl mx-auto text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Découvrez les chats qui survivent dans ce monde post-apocalyptique, chacun avec son histoire et ses motivations uniques.
        </motion.p>
        
        {/* Character filter buttons */}
        <motion.div 
          className="flex flex-wrap justify-center mb-12 gap-3"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
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
        
        {isLoading ? (
          <div className="text-center py-12">
            <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto"></div>
            <p className="text-white mt-4">Chargement des personnages...</p>
          </div>
        ) : (
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {filteredCharacters.map((character, index) => (
              <CharacterCard 
                key={character.id}
                character={character}
                delay={0.1 * index}
              />
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Characters;
