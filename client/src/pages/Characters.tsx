import { useRef, useState, useEffect, useMemo } from "react";
import { motion, useInView } from "framer-motion";
import { useLocation } from "wouter";
import "./CharacterPage.css";

interface Character {
  _id: string;
  name: string;
  age?: number;
  description: string;
  tribe: string;
  role?: string;
  image?: string;
  tribeColor?: string; // Optional, can be set dynamically
}

const Characters = () => {
  const section2Ref = useRef<HTMLDivElement>(null);
  const isSection2InView = useInView(section2Ref, { once: false, amount: 0.2 });
  const [, setLocation] = useLocation();

  const [characters, setCharacters] = useState<Character[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState("all");

  // Animation variants
  const titleAnimation = {
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  };

  const subtitleAnimation = {
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, delay: 0.2 },
  };

  const filtersAnimation = {
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, delay: 0.3 },
  };

  // Filter buttons data
  const filters = [
    { key: "all", label: "Tous" },
    { key: "nomades", label: "Nomades" },
    { key: "anciens", label: "Anciens" },
    { key: "technos", label: "Technos" },
    { key: "ecologistes", label: "Écologistes" },
    { key: "mystiques", label: "Mystiques" },
  ];

  // Filtered characters using useMemo
  const filteredCharacters = useMemo(() => {
    return characters.filter(
      (char) => filter === "all" || char.tribe.toLowerCase() === filter
    );
  }, [characters, filter]);

  useEffect(() => {
    fetchCharacters();
  }, []);

  const fetchCharacters = async () => {
    try {
      const res = await fetch("/api/characters");
      if (res.ok) {
        const data = await res.json();
        // Optionally add tribeColor dynamically
        const coloredData = data.map((c: any) => ({
          ...c,
          tribeColor:
            c.tribe.toLowerCase() === "nomades"
              ? "#1C6E5F"
              : c.tribe.toLowerCase() === "anciens"
                ? "#E3A947"
                : c.tribe.toLowerCase() === "technos"
                  ? "#C73E3A"
                  : c.tribe.toLowerCase() === "ecologistes"
                    ? "#4A9D3D"
                    : c.tribe.toLowerCase() === "mystiques"
                      ? "#8A2BE2"
                    : "#666666",
        }));
        setCharacters(coloredData);
      } else {
        throw new Error("Failed to fetch characters");
      }
    } catch (error) {
      if (error instanceof Error) setError(error.message);
      else setError(String(error));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="character-page min-h-screen p-6" style={{
      background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)'
    }}>
      <div className="character-container max-w-7xl mx-auto">
        {/* Hero Section */}
        <motion.h1
          className="character-title text-white text-5xl font-bold mb-4 text-center"
          {...titleAnimation}
          style={{
            textShadow: "0 0 20px rgba(100, 175, 214, 0.8), 0 0 40px rgba(100, 175, 214, 0.4)",
          }}
        >
          PERSONNAGES
        </motion.h1>

        <motion.p
          className="character-subtitle text-gray-400 max-w-3xl mx-auto text-center mb-8"
          {...subtitleAnimation}
        >
          Découvrez les chats qui survivent dans ce monde post-apocalyptique,
          chacun avec son histoire et ses motivations uniques.
        </motion.p>

        {/* Filter Buttons */}
        <motion.div className="flex flex-wrap justify-center gap-3 mb-8" {...filtersAnimation}>
          {filters.map((filterItem) => {
            const active = filter === filterItem.key;
            let bgColor = "";
            let textColor = "text-white";
            let border = "";
            if (filterItem.key === "nomades") {
              bgColor = active ? "bg-[#1C6E5F]" : "bg-[#1C6E5F]/20";
              border = active ? "" : "border border-[#1C6E5F]";
            } else if (filterItem.key === "anciens") {
              bgColor = active ? "bg-[#E3A947]" : "bg-[#E3A947]/20";
              border = active ? "" : "border border-[#E3A947]";
            } else if (filterItem.key === "technos") {
              bgColor = active ? "bg-[#C73E3A]" : "bg-[#C73E3A]/20";
              border = active ? "" : "border border-[#C73E3A]";
            } else if (filterItem.key === "ecologistes") {
              bgColor = active ? "bg-[#4A9D3D]" : "bg-[#4A9D3D]/20";
              border = active ? "" : "border border-[#4A9D3D]";
            } else if (filterItem.key === "mystiques") {
              bgColor = active ? "bg-purple-600" : "bg-purple-600/20";
              border = active ? "" : "border border-purple-600";
            } else if (filterItem.key === "all") {
              bgColor = active ? "bg-white" : "bg-white/20";
              textColor = active ? "text-gray-900" : "text-white";
            }
            return (
              <button
                key={filterItem.key}
                className={`px-4 py-2 rounded-full font-display transition-colors ${bgColor} ${textColor} ${border} hover:bg-opacity-40`}
                onClick={() => setFilter(filterItem.key)}
              >
                {filterItem.label}
              </button>
            );
          })}
        </motion.div>

        <div className="w-32 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto rounded mb-8"></div>

        {/* Characters Grid */}
        <section ref={section2Ref}>
          {isLoading ? (
            <div className="flex flex-col items-center justify-center mb-12">
              <img
                src="/attached_assets/kab.png"
                alt="Loading..."
                className="w-32 h-32 mb-5"
                style={{
                  imageRendering: 'auto',
                  animation: 'spin 2s linear infinite',
                  willChange: 'transform'
                }}
              />
              <div className="text-white text-xl">Chargement des personnages...</div>
            </div>
          ) : error ? (
            <div className="text-center text-white">
              <p>Erreur de chargement des personnages</p>
              <button
                onClick={fetchCharacters}
                className="mt-2 px-4 py-2 bg-purple-600 rounded text-white font-bold hover:bg-purple-700 transition-colors"
              >
                Réessayer
              </button>
            </div>
          ) : (
            <motion.div
              className="min-h-[80vh] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8 mb-12"
              initial={{ opacity: 0 }}
              animate={isSection2InView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.8 }}
            >
              {filteredCharacters.map((char) => (
                <motion.div
                  key={char._id}
                  className="relative group cursor-pointer"
                  initial={{ opacity: 0, y: 50 }}
                  animate={isSection2InView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  {/* Card */}
                  <div className="relative bg-gradient-to-br from-gray-800 via-gray-900 to-black rounded-2xl p-4 border-2 border-gray-600 hover:border-purple-400 hover:shadow-[0_0_20px_rgba(168,85,247,0.4)] hover:scale-110 hover:-rotate-1 transition-all duration-500 transform">

                    {/* Holographic effect */}
                    <div className="absolute inset-0 rounded-2xl opacity-20 bg-gradient-to-br from-cyan-400 via-purple-500 to-pink-500 group-hover:opacity-40 transition-opacity duration-500"></div>

                    {/* Character Image */}
                    {char.image && (
                      <div className="relative z-10 mb-4 overflow-visible">
                        <img
                          src={char.image}
                          alt={char.name}
                          className="w-full h-32 object-contain transition-transform duration-300 hover:scale-[2]"
                          style={{ filter: 'drop-shadow(3px 6px 8px black)', transformOrigin: 'center' }}
                        />
                      </div>
                    )}

                    {/* Character Info */}
                    <div className="relative z-10 text-center">
                      <h3 className="text-white font-bold text-lg mb-2">{char.name}</h3>
                      <div
                        className="inline-block px-3 py-1 rounded-full text-xs font-bold text-white mb-3"
                        style={{ backgroundColor: char.tribeColor }}
                      >
                        {char.tribe}
                      </div>
                      <button
                        className="w-full py-2 rounded-lg font-bold text-white text-sm transition-all duration-300 hover:scale-105"
                        style={{ backgroundColor: char.tribeColor }}
                        onClick={() => setLocation(`/character/${char._id}`)}
                      >
                        VIEW DETAILS
                      </button>
                    </div>

                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </section>
      </div>
    </div>
  );
};

export default Characters;
