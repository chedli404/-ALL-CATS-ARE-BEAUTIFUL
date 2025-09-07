import { useParams, Link } from "wouter";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { CHARACTERS_DATA } from "@/lib/constants";
import { ArrowLeft, Compass, CircleDot, Zap } from "lucide-react";
import { Character } from "@/types";

const CharacterDetail = () => {
  const { id } = useParams();
  const characterId = parseInt(id ?? "0");

  // In a real implementation, this would fetch from the API
  const { data: character, isLoading } = useQuery<Character>({
    queryKey: [`/api/characters/${characterId}`],
    // Using mock data for now
    initialData: CHARACTERS_DATA.find(c => c.id === characterId)
  });

  const renderTribeIcon = (tribe: string) => {
    switch (tribe) {
      case "NOMADES":
        return <Compass className="w-8 h-8 text-white" />;
      case "ANCIENS":
        return <CircleDot className="w-8 h-8 text-white" />;
      case "TECHNOS":
        return <Zap className="w-8 h-8 text-white" />;
      default:
        return <Compass className="w-8 h-8 text-white" />;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!character) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center text-white">
          <h2 className="text-3xl font-display mb-4">Personnage non trouvé</h2>
          <p className="mb-6">Ce personnage n'existe pas dans notre base de données.</p>
          <Link href="/characters">
            <button className="bg-[#1C6E5F] hover:bg-[#1C6E5F]/80 text-white px-6 py-3 rounded-md font-display">
              Retour aux personnages
            </button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 py-24">
      <div className="container mx-auto px-4">
        <Link href="/characters">
          <button className="flex items-center text-white mb-12 hover:underline">
            <ArrowLeft className="mr-2 h-5 w-5" />
            Retour aux personnages
          </button>
        </Link>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative">
              <img 
                src={character.image} 
                alt={character.name} 
                className="w-full h-auto rounded-lg shadow-xl"
              />
              <div 
                className="absolute top-4 right-4 px-4 py-2 rounded-md"
                style={{ backgroundColor: character.tribeColor }}
              >
                <div className="flex items-center">
                  {renderTribeIcon(character.tribe)}
                  <span className="ml-2 font-tech text-white">{character.tribe}</span>
                </div>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="bg-gray-800 p-8 rounded-lg shadow-lg">
              <h1 className="font-display text-4xl text-white mb-2">{character.name}</h1>
              
              <div className="flex flex-wrap gap-2 mb-6">
                {character.traits.map((trait, index) => (
                  <span 
                    key={index} 
                    className="bg-gray-700 text-gray-300 px-3 py-1 rounded-full text-sm font-tech"
                  >
                    {trait}
                  </span>
                ))}
              </div>
              
              <div className="space-y-6 text-gray-300">
                <p className="text-lg">{character.description}</p>
                
                <p>
                  Dans ce monde post-apocalyptique, {character.name} représente une force importante 
                  parmi les survivants félins. Sa présence dans la tribu des {character.tribe} 
                  est déterminante pour leur avenir.
                </p>
                
                <p>
                  Les légendes racontent que {character.name} fut parmi les premiers à explorer 
                  les ruines humaines et à comprendre l'importance de l'héritage laissé derrière.
                </p>
              </div>
              
              <div className="mt-10 pt-6 border-t border-gray-700">
                <h3 className="font-display text-xl text-white mb-4">Relations avec les autres personnages</h3>
                <ul className="space-y-3 text-gray-400">
                  {CHARACTERS_DATA.filter(c => c.id !== character.id).slice(0, 3).map(char => (
                    <li key={char.id} className="flex justify-between">
                      <span>{char.name}</span>
                      <span className="text-gray-500">
                        {char.tribe === character.tribe ? "Allié" : "Neutre"}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default CharacterDetail;
