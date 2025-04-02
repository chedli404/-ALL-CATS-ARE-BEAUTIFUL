import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { TRIBES_DATA } from "@/lib/constants";
import { Tribe } from "@/types";
import TribeBanner from "@/components/ui/TribeBanner";
import { Compass, CircleDot, Zap } from "lucide-react";

const Tribes = () => {
  // In a real implementation, this would fetch from the API
  const { data: tribes, isLoading } = useQuery<Tribe[]>({
    queryKey: ['/api/tribes'],
    // Using mock data for now
    initialData: TRIBES_DATA
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  const renderTribeIcon = (icon: string) => {
    switch (icon) {
      case "compass":
        return <Compass className="h-6 w-6" />;
      case "circle-dot":
        return <CircleDot className="h-6 w-6" />;
      case "zap":
        return <Zap className="h-6 w-6" />;
      default:
        return <CircleDot className="h-6 w-6" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-earth to-earth-dark py-24">
      <div className="container mx-auto px-4">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1 
            className="font-display text-5xl mb-6 text-center"
            variants={itemVariants}
          >
            LES TRIBUS
          </motion.h1>
          <motion.p 
            className="text-gray-700 max-w-3xl mx-auto text-center mb-16"
            variants={itemVariants}
          >
            Après la disparition de l'humanité, les chats survivants se sont organisés en tribus distinctes, chacune avec sa propre vision du monde et son approche face à l'héritage humain.
          </motion.p>
          
          {isLoading ? (
            <div className="text-center py-12">
              <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto"></div>
              <p className="text-gray-700 mt-4">Chargement des tribus...</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
                {tribes.map((tribe, index) => (
                  <TribeBanner 
                    key={tribe.id}
                    name={tribe.name}
                    description={tribe.description}
                    color={tribe.color}
                    strengths={tribe.strengths}
                    icon={tribe.icon}
                    delay={0.1 * index}
                  />
                ))}
              </div>
              
              <motion.div variants={itemVariants}>
                <h2 className="font-display text-3xl mb-8 text-center">CULTURE ET ORGANISATION</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
                  <div className="bg-white/10 p-6 rounded-lg shadow-lg">
                    <h3 className="font-display text-2xl mb-4 flex items-center">
                      <Compass className="h-6 w-6 mr-2 text-nomades" />
                      <span>Les Nomades</span>
                    </h3>
                    <p className="mb-4">
                      Refusant toute forme de sédentarité, les Nomades parcourent le monde post-apocalyptique en petits groupes familiaux. Sans territoire fixe, ils traversent les zones les plus dangereuses, guidés par un instinct de survie extraordinaire.
                    </p>
                    <p className="mb-4">
                      Leur organisation sociale est souple, basée sur les compétences plus que sur une hiérarchie figée. Les décisions importantes sont prises collectivement lors de rassemblements appelés "Cercles", où chaque voix compte.
                    </p>
                    <p>
                      Pour les Nomades, la véritable richesse réside dans l'expérience accumulée et dans la découverte de nouveaux territoires. Ils sont les messagers du monde, transportant nouvelles et objets rares entre les différentes tribus.
                    </p>
                    
                    <div className="mt-6 pt-6 border-t border-earth-dark/30">
                      <h4 className="font-display text-lg mb-2">Rituels et traditions</h4>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>La cérémonie du "Premier Pas" quand un chaton est prêt à voyager</li>
                        <li>L'échange des routes, où sont partagées les découvertes de l'année</li>
                        <li>Le tatouage des territoires, marquant sur leur pelage les zones explorées</li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="bg-white/10 p-6 rounded-lg shadow-lg">
                    <h3 className="font-display text-2xl mb-4 flex items-center">
                      <CircleDot className="h-6 w-6 mr-2 text-anciens" />
                      <span>Les Anciens</span>
                    </h3>
                    <p className="mb-4">
                      Gardiens de la mémoire, les Anciens ont choisi de préserver et transmettre l'histoire du monde. Ils ont établi leurs communautés dans d'anciennes bibliothèques et musées, protégeant les savoirs du passé.
                    </p>
                    <p className="mb-4">
                      Leur société est structurée autour d'un conseil des sages, dirigé par le plus ancien et le plus sage d'entre eux. Chaque membre a une responsabilité spécifique : archiviste, conteur, guérisseur ou diplomate.
                    </p>
                    <p>
                      Les Anciens croient en l'harmonie avec la nature et considèrent que les erreurs de l'humanité ne doivent pas être répétées. Ils cultivent des jardins médicinaux et vivent en symbiose avec leur environnement.
                    </p>
                    
                    <div className="mt-6 pt-6 border-t border-earth-dark/30">
                      <h4 className="font-display text-lg mb-2">Rituels et traditions</h4>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>La veillée des histoires, où sont racontés les récits du passé</li>
                        <li>La transmission du savoir, rituel d'apprentissage intergénérationnel</li>
                        <li>Le cercle d'équinoxe, célébration du cycle de la nature</li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="bg-white/10 p-6 rounded-lg shadow-lg md:col-span-2">
                    <h3 className="font-display text-2xl mb-4 flex items-center">
                      <Zap className="h-6 w-6 mr-2 text-technos" />
                      <span>Les Technos</span>
                    </h3>
                    <p className="mb-4">
                      Fascinés par les technologies humaines, les Technos se sont installés dans les ruines des métropoles. Ils expérimentent, réparent et réinventent les anciennes machines, créant un mode de vie unique mêlant instinct félin et innovation technologique.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <p className="mb-4">
                          Leur hiérarchie est basée sur les connaissances techniques et l'innovation. Les "Éveilleurs" sont les leaders respectés pour leur capacité à réactiver les anciennes technologies. Sous leur direction, différentes guildes spécialisées travaillent sur des projets spécifiques.
                        </p>
                        <p>
                          Les Technos croient que la maîtrise des technologies est la clé de la survie et du progrès. Ils cherchent à comprendre pourquoi l'humanité a disparu tout en exploitant ses créations.
                        </p>
                      </div>
                      <div>
                        <h4 className="font-display text-lg mb-2">Rituels et traditions</h4>
                        <ul className="list-disc pl-5 space-y-1">
                          <li>L'éveil, cérémonie où une nouvelle technologie est activée</li>
                          <li>Le grand partage, échange de connaissances entre guildes</li>
                          <li>La quête des artefacts, expéditions organisées dans les zones inexplorées</li>
                          <li>Le challenge de l'Innovateur, compétition annuelle de création</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
              
              <motion.div 
                className="overflow-x-auto rounded-lg shadow-lg"
                variants={itemVariants}
              >
                <table className="min-w-full bg-white divide-y divide-gray-200">
                  <thead className="bg-gray-800">
                    <tr>
                      <th scope="col" className="px-6 py-4 text-left text-sm font-display text-white uppercase tracking-wider">Attributs</th>
                      <th scope="col" className="px-6 py-4 text-center text-sm font-display text-white uppercase tracking-wider" style={{ backgroundColor: "#1C6E5F" }}>Nomades</th>
                      <th scope="col" className="px-6 py-4 text-center text-sm font-display text-white uppercase tracking-wider" style={{ backgroundColor: "#E3A947" }}>Anciens</th>
                      <th scope="col" className="px-6 py-4 text-center text-sm font-display text-white uppercase tracking-wider" style={{ backgroundColor: "#C73E3A" }}>Technos</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 bg-gray-100">Territoire</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 text-center">Aucun fixe</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 text-center">Zones vertes</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 text-center">Anciennes métropoles</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 bg-gray-100">Relation au passé</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 text-center">Observation</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 text-center">Préservation</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 text-center">Réutilisation</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 bg-gray-100">Compétences</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 text-center">Adaptation, survie</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 text-center">Sagesse, guérison</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 text-center">Ingénierie, énergie</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 bg-gray-100">Vision d'avenir</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 text-center">Exploration continue</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 text-center">Équilibre et tradition</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 text-center">Progrès technologique</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 bg-gray-100">Leadership</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 text-center">Collectif, par expérience</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 text-center">Conseil des sages</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 text-center">Hiérarchie méritocratique</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 bg-gray-100">Ressources valorisées</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 text-center">Cartes, routes</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 text-center">Livres, plantes</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 text-center">Pièces, énergie</td>
                    </tr>
                  </tbody>
                </table>
              </motion.div>
            </>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Tribes;
