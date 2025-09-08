import { useState } from "react";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { CHARACTERS_DATA } from "@/lib/constants";
import { Character } from "@/types";
import RotatingCards from "@/components/characters/RotatingCards";

// Log for debugging
console.log('Characters data:', CHARACTERS_DATA);

const Characters = () => {
  const [filter, setFilter] = useState("all");

  const { data: characters, isLoading, refetch } = useQuery<Character[]>({
    queryKey: ['characters', Date.now()],
    queryFn: async () => {
      console.log('Fetching characters from API...');
      const res = await fetch('/api/characters?' + Date.now());
      if (!res.ok) throw new Error('Failed to fetch characters');
      const data = await res.json();
      console.log('Characters received from API:', data);
      return data;
    },
    staleTime: 0,
    cacheTime: 0,
    refetchOnMount: true,
    refetchOnWindowFocus: true
  });

  return (
    <div style={{ 
      backgroundColor: "#1a1a1a", 
      minHeight: "100vh",
      position: "relative",
      paddingTop: "2rem",
      paddingBottom: "6rem"
    }}>
      <div className="container mx-auto px-4">
        <motion.h1 
          className="text-5xl mb-4 text-center"
          style={{ 
            color: "#64afd6", 
            fontFamily: '"Nunito Sans", sans-serif',
            fontWeight: 600 
          }}
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
          style={{ fontFamily: '"Nunito Sans", sans-serif' }}
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
            className={`px-4 py-2 rounded-full transition-colors ${
              filter === "all" 
                ? "bg-white text-gray-900" 
                : "bg-white/20 text-white hover:bg-white/30"
            }`}
            onClick={() => setFilter("all")}
            style={{ fontFamily: '"Nunito Sans", sans-serif' }}
          >
            Tous
          </button>
          <button 
            className={`px-4 py-2 rounded-full transition-colors ${
              filter === "Nomades" 
                ? "bg-[#1C6E5F] text-white" 
                : "bg-[#1C6E5F]/20 text-[#1C6E5F] border border-[#1C6E5F] hover:bg-[#1C6E5F] hover:text-white"
            }`}
            onClick={() => setFilter("Nomades")}
            style={{ fontFamily: '"Nunito Sans", sans-serif' }}
          >
            Nomades
          </button>
          <button 
            className={`px-4 py-2 rounded-full transition-colors ${
              filter === "Anciens" 
                ? "bg-[#E3A947] text-white" 
                : "bg-[#E3A947]/20 text-[#E3A947] border border-[#E3A947] hover:bg-[#E3A947] hover:text-white"
            }`}
            onClick={() => setFilter("Anciens")}
            style={{ fontFamily: '"Nunito Sans", sans-serif' }}
          >
            Anciens
          </button>
          <button 
            className={`px-4 py-2 rounded-full transition-colors ${
              filter === "Technos" 
                ? "bg-[#C73E3A] text-white" 
                : "bg-[#C73E3A]/20 text-[#C73E3A] border border-[#C73E3A] hover:bg-[#C73E3A] hover:text-white"
            }`}
            onClick={() => setFilter("Technos")}
            style={{ fontFamily: '"Nunito Sans", sans-serif' }}
          >
            Technos
          </button>
          <button 
            className={`px-4 py-2 rounded-full transition-colors ${
              filter === "ÉCOLOGISTES" 
                ? "bg-[#4A9D3D] text-white" 
                : "bg-[#4A9D3D]/20 text-[#4A9D3D] border border-[#4A9D3D] hover:bg-[#4A9D3D] hover:text-white"
            }`}
            onClick={() => setFilter("ÉCOLOGISTES")}
            style={{ fontFamily: '"Nunito Sans", sans-serif' }}
          >
            Écologistes
          </button>
        </motion.div>
        
        {isLoading ? (
          <div className="text-center py-12">
            <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto"></div>
            <p className="text-white mt-4" style={{ fontFamily: '"Nunito Sans", sans-serif' }}>Chargement des personnages...</p>
          </div>
        ) : (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="min-h-[80vh] relative"
          >
            {console.log('Characters data:', characters)}
            <RotatingCards characters={characters || []} filter={filter} />
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Characters;