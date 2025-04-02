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
    <div className="characters-page">
      <div className="page-container">
        <motion.h1 
          className="page-title"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          PERSONNAGES
        </motion.h1>
        <motion.p 
          className="page-description"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Découvrez les chats qui survivent dans ce monde post-apocalyptique, chacun avec son histoire et ses motivations uniques.
        </motion.p>
        
        {/* Character filter buttons */}
        <motion.div 
          className="filter-buttons-container"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <button 
            className={`filter-button ${filter === "all" ? "filter-button-active" : "filter-button-all"}`}
            onClick={() => setFilter("all")}
          >
            Tous
          </button>
          <button 
            className={`filter-button ${filter === "NOMADES" ? "filter-button-nomades-active" : "filter-button-nomades"}`}
            onClick={() => setFilter("NOMADES")}
          >
            Nomades
          </button>
          <button 
            className={`filter-button ${filter === "ANCIENS" ? "filter-button-anciens-active" : "filter-button-anciens"}`}
            onClick={() => setFilter("ANCIENS")}
          >
            Anciens
          </button>
          <button 
            className={`filter-button ${filter === "TECHNOS" ? "filter-button-technos-active" : "filter-button-technos"}`}
            onClick={() => setFilter("TECHNOS")}
          >
            Technos
          </button>
        </motion.div>
        
        {isLoading ? (
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p className="loading-text">Chargement des personnages...</p>
          </div>
        ) : (
          <motion.div 
            className="characters-grid"
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
