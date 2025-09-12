import React from 'react';
import { useParams } from 'wouter';
import { motion } from 'framer-motion';
import { ArrowLeft, Users } from 'lucide-react';
import { FaLeaf, FaMicrochip, FaMountain, FaGlobe } from 'react-icons/fa';

interface Character {
    _id: string;
    name: string;
    description: string;
    tribe: string;
    tribeColor: string;
    image: string;
    traits: string[];
    relations?: { name: string; description: string }[];
}
const tribeIcons: { [key: string]: JSX.Element } = {
    Nomades: <FaGlobe className="h-5 w-5 text-white" />,
    Anciens: <FaMountain className="h-5 w-5 text-white" />,
    Technos: <FaMicrochip className="h-5 w-5 text-white" />,
    Écologistes: <FaLeaf className="h-5 w-5 text-white" />,
};
const renderTribeIcon = (tribe: string) => {
    return tribeIcons[tribe] || <Users className="h-5 w-5 text-white" />;
};
export const CharacterDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [character, setCharacter] = React.useState<Character | null>(null);
    const [isLoading, setIsLoading] = React.useState(true);

    React.useEffect(() => {
        const fetchCharacter = async () => {
            try {
                const response = await fetch(`/api/characters/${id}`);
                const data = await response.json();
                setCharacter(data);
            } catch (error) {
                console.error("Error fetching character:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchCharacter();
    }, [id]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!character) {
        return <div>Character not found</div>;
    }

return (
    <div className="min-h-screen bg-gray-900 py-24">
      <div className="container mx-auto px-4">
        <button 
          onClick={() => window.history.back()}
          className="flex items-center text-white mb-12 hover:underline"
        >
          <ArrowLeft className="mr-2 h-5 w-5" />
          Retour aux personnages
        </button>
        
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
                  {character.relations && character.relations.map((relation, index) => (
                    <li key={index} className="flex items-center">
                      <span className="mr-2">{relation.name}:</span>
                      <span>{relation.description}</span>
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
