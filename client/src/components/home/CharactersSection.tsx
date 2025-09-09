import { useState, useEffect } from "react";
import { Link } from "wouter";
import SmartEditable from "@/components/admin/SmartEditable";

const CharactersSection = () => {
  const [filter, setFilter] = useState("all");
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    fetchCharacters();
  }, []);

  const fetchCharacters = async () => {
    // Check cache first
    const cached = localStorage.getItem('characters');
    const cacheTime = localStorage.getItem('characters_time');
    if (cached && Date.now() - parseInt(cacheTime) < 300000) {
      setCharacters(JSON.parse(cached));
      setLoading(false);
      return;
    }

    try {
      const res = await fetch('/api/characters?limit=50');
      if (res.ok) {
        const data = await res.json();
        setCharacters(data);
        // Cache for 5 minutes
        localStorage.setItem('characters', JSON.stringify(data));
        localStorage.setItem('characters_time', Date.now().toString());
      }
    } catch (error) {
      console.error('Failed to fetch characters:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredCharacters = filter === "all" 
    ? characters 
    : characters.filter(character => character.tribe === filter);



  return (
    <div className="min-h-screen p-6" style={{ 
      background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)'
    }}>
      <header className="text-center mb-12">
        <h1 className="text-white text-5xl font-bold mb-4" style={{
          textShadow: '0 0 20px rgba(100, 175, 214, 0.8), 0 0 40px rgba(100, 175, 214, 0.4)'
        }}>
          <SmartEditable
            contentKey="characters.title"
            type="text"
            page="characters"
            section="header"
            defaultValue="CHARACTERS"
          />
        </h1>
        <p className="text-gray-400 max-w-3xl mx-auto text-center mb-8">
          <SmartEditable
            contentKey="characters.description"
            type="text"
            page="characters"
            section="header"
            defaultValue="Heroes and survivors in a post-apocalyptic world, each with their own unique story and motivations."
            multiline={true}
          />
        </p>
        
        {/* Filter buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          <button 
            className={`px-4 py-2 rounded-full font-display transition-colors ${
              filter === "all" 
                ? "bg-white text-gray-900" 
                : "bg-white/20 text-white hover:bg-white/30"
            }`}
            onClick={() => setFilter("all")}
          >
            All
          </button>
          <button 
            className={`px-4 py-2 rounded-full font-display transition-colors ${
              filter === "Nomades" 
                ? "bg-[#1C6E5F] text-white" 
                : "bg-[#1C6E5F]/20 text-[#1C6E5F] border border-[#1C6E5F] hover:bg-[#1C6E5F] hover:text-white"
            }`}
            onClick={() => setFilter("Nomades")}
          >
            Nomads
          </button>
          <button 
            className={`px-4 py-2 rounded-full font-display transition-colors ${
              filter === "Anciens" 
                ? "bg-[#E3A947] text-white" 
                : "bg-[#E3A947]/20 text-[#E3A947] border border-[#E3A947] hover:bg-[#E3A947] hover:text-white"
            }`}
            onClick={() => setFilter("Anciens")}
          >
            Former
          </button>
          <button 
            className={`px-4 py-2 rounded-full font-display transition-colors ${
              filter === "Technos" 
                ? "bg-[#C73E3A] text-white" 
                : "bg-[#C73E3A]/20 text-[#C73E3A] border border-[#C73E3A] hover:bg-[#C73E3A] hover:text-white"
            }`}
            onClick={() => setFilter("Technos")}
          >
            Technos
          </button>
        </div>
        
        <div className="w-32 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto rounded"></div>
      </header>

      <main className="max-w-7xl mx-auto">
        {/* Trading Cards Grid */}
        {loading ? (
          <div className="flex flex-col items-center justify-center mb-12">
            <img 
              src="/attached_assets/kab.png" 
              alt="Loading..." 
              className="w-32 h-32 mb-5"
              style={{ 
                imageRendering: 'auto',
                animation: 'spin 2s linear infinite',
                animationDelay: '0s',
                willChange: 'transform'
              }}
              onLoad={(e) => {
                e.target.style.opacity = '1';
              }}
            />
            <div className="text-white text-xl">Loading characters...</div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8 mb-12">
            {filteredCharacters.map((character, index) => (
            <div 
              key={character._id} 
              className="relative group cursor-pointer"
            >
              {/* Card */}
              <div className="relative bg-gradient-to-br from-gray-800 via-gray-900 to-black rounded-2xl p-4 border-2 border-gray-600 hover:border-purple-400 hover:shadow-[0_0_20px_rgba(168,85,247,0.4)] hover:scale-110 hover:-rotate-1 transition-all duration-500 transform">
                
                {/* Holographic effect */}
                <div className="absolute inset-0 rounded-2xl opacity-20 bg-gradient-to-br from-cyan-400 via-purple-500 to-pink-500 group-hover:opacity-40 transition-opacity duration-500"></div>
                
                {/* Character Image */}
                <div className="relative z-10 mb-4 overflow-visible">
                  <img
                    src={character.image}
                    alt={character.name}
                    loading="lazy"
                    className="w-full h-32 object-contain transition-all duration-700 ease-out hover:scale-[2.5] hover:z-50 relative"
                    style={{
                      filter: 'drop-shadow(3px 6px 8px black)',
                      transformOrigin: 'center'
                    }}
                  />
                </div>
                
                {/* Character Info */}
                <div className="relative z-10 text-center">
                  <h3 className="text-white font-bold text-lg mb-2">{character.name}</h3>
                  <div 
                    className="inline-block px-3 py-1 rounded-full text-xs font-bold text-white mb-3"
                    style={{ backgroundColor: character.tribeColor }}
                  >
                    {character.tribe}
                  </div>
                  
                  <Link href={`/characters/${character._id}`}>
                    <button 
                      className="w-full py-2 rounded-lg font-bold text-white text-sm transition-all duration-300 hover:scale-105"
                      style={{ backgroundColor: character.tribeColor }}
                    >
                      VIEW DETAILS
                    </button>
                  </Link>
                </div>
                

              </div>
            </div>
            ))}
          </div>
        )}


      </main>
    </div>
  );
};

export default CharactersSection;