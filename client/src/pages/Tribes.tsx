import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { TRIBES_DATA } from "@/lib/constants";
import { Tribe } from "@/types";
import TribeBanner from "@/components/ui/TribeBanner";
import { Compass, CircleDot, Zap, Map, Book, Settings, Users } from "lucide-react";

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

  const getTribeIconComponent = (tribeName: string) => {
    switch (tribeName) {
      case "NOMADES":
        return <Compass className="h-6 w-6 text-[#5ecfc1]" />;
      case "ANCIENS":
        return <Book className="h-6 w-6 text-[#f8d77e]" />;
      case "TECHNOS":
        return <Zap className="h-6 w-6 text-[#ff6259]" />;
      default:
        return <CircleDot className="h-6 w-6" />;
    }
  };

  const getTribeBackgroundImage = (tribeName: string) => {
    switch (tribeName) {
      case "NOMADES":
        return "bg-gradient-to-br from-[#1c7f5f]/80 to-[#1c7f5f]";
      case "ANCIENS":
        return "bg-gradient-to-br from-[#e5ab47]/80 to-[#e5ab47]";
      case "TECHNOS":
        return "bg-gradient-to-br from-[#c73e3a]/80 to-[#c73e3a]";
      default:
        return "bg-gray-800";
    }
  };

  const getTribeTextColor = (tribeName: string) => {
    return tribeName === "ANCIENS" ? "text-gray-800" : "text-white";
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 py-12">
      <div className="container mx-auto px-4">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="relative"
        >
          {/* Background Image with Banner Art */}
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <img 
              src="/attached_assets/1.pdf-image-004.jpg" 
              alt="ACAB Tribe Banners" 
              className="w-full h-full object-cover object-center"
            />
          </div>
          
          <motion.h1 
            className="font-display text-5xl mb-3 text-center text-white"
            variants={itemVariants}
          >
            LES TRIBUS
          </motion.h1>
          
          <motion.div 
            className="w-20 h-1 bg-gradient-to-r from-[#1c7f5f] via-[#e5ab47] to-[#c73e3a] mx-auto mb-6"
            variants={itemVariants}
          ></motion.div>
          
          <motion.p 
            className="text-gray-300 max-w-3xl mx-auto text-center mb-16"
            variants={itemVariants}
          >
            Après la disparition de l'humanité, les chats survivants se sont organisés en tribus distinctes, chacune avec sa propre vision du monde et son approche face à l'héritage humain.
          </motion.p>
          
          {isLoading ? (
            <div className="text-center py-12">
              <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto"></div>
              <p className="text-gray-300 mt-4">Chargement des tribus...</p>
            </div>
          ) : (
            <>
              {/* Main Tribe Banners Section */}
              <div className="relative z-10">
                <img 
                  src="/attached_assets/1.pdf-image-004.jpg" 
                  alt="ACAB Tribe Banners" 
                  className="w-full max-w-4xl mx-auto rounded-lg shadow-2xl mb-12 md:mb-16"
                />
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 md:mb-24 max-w-5xl mx-auto">
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
              </div>
              
              {/* Tribe Details Section */}
              <motion.div variants={itemVariants} className="mt-8 mb-16">
                <h2 className="font-display text-3xl mb-10 text-center text-white">CULTURE ET TERRITOIRE</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-16">
                  {tribes.map((tribe) => (
                    <div 
                      key={`details-${tribe.id}`} 
                      className={`${getTribeBackgroundImage(tribe.name)} p-6 rounded-lg shadow-xl`}
                    >
                      <div className="flex items-center mb-4">
                        {getTribeIconComponent(tribe.name)}
                        <h3 className={`font-display text-2xl ml-3 ${getTribeTextColor(tribe.name)}`}>
                          {tribe.name}
                        </h3>
                      </div>
                      
                      <div className={`tribe-details mb-4 ${getTribeTextColor(tribe.name)} opacity-90`}>
                        <div className="flex items-center mb-3">
                          <Map className="h-4 w-4 mr-2" />
                          <span className="font-medium">
                            {tribe.name === "NOMADES" ? "Territoire: Non défini, en mouvement constant" : 
                             tribe.name === "ANCIENS" ? "Territoire: Forêts et anciennes bibliothèques" : 
                             "Territoire: Ruines technologiques"}
                          </span>
                        </div>
                        
                        <div className="flex items-center mb-3">
                          <Book className="h-4 w-4 mr-2" />
                          <span className="font-medium">
                            {tribe.name === "NOMADES" ? "Croyance: L'expérience et le mouvement" : 
                             tribe.name === "ANCIENS" ? "Croyance: Harmonie et préservation" : 
                             "Croyance: Progrès et innovation"}
                          </span>
                        </div>
                        
                        <div className="flex items-center mb-3">
                          <Settings className="h-4 w-4 mr-2" />
                          <span className="font-medium">
                            {tribe.name === "NOMADES" ? "Compétence: Adaptation et survie" : 
                             tribe.name === "ANCIENS" ? "Compétence: Sagesse et guérison" : 
                             "Compétence: Ingénierie et technologie"}
                          </span>
                        </div>
                        
                        <div className="flex items-center">
                          <Users className="h-4 w-4 mr-2" />
                          <span className="font-medium">
                            {tribe.name === "NOMADES" ? "Structure: Groupes familiaux égalitaires" : 
                             tribe.name === "ANCIENS" ? "Structure: Conseil des sages" : 
                             "Structure: Hiérarchie technocratique"}
                          </span>
                        </div>
                      </div>
                      
                      <div className={`mt-5 pt-5 border-t ${tribe.name === "ANCIENS" ? "border-gray-800/30" : "border-white/20"}`}>
                        <h4 className={`font-display text-lg mb-2 ${getTribeTextColor(tribe.name)}`}>Rituels et traditions</h4>
                        <ul className={`list-disc pl-5 space-y-1 text-sm ${tribe.name === "ANCIENS" ? "text-gray-800/90" : "text-white/90"}`}>
                          {tribe.name === "NOMADES" ? (
                            <>
                              <li>La cérémonie du "Premier Pas"</li>
                              <li>L'échange des routes</li>
                              <li>Le tatouage des territoires</li>
                            </>
                          ) : tribe.name === "ANCIENS" ? (
                            <>
                              <li>La veillée des histoires</li>
                              <li>La transmission du savoir</li>
                              <li>Le cercle d'équinoxe</li>
                            </>
                          ) : (
                            <>
                              <li>L'éveil des technologies</li>
                              <li>Le grand partage</li>
                              <li>La quête des artefacts</li>
                              <li>Le challenge de l'Innovateur</li>
                            </>
                          )}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
              
              {/* Comparative Table */}
              <motion.div 
                className="overflow-x-auto rounded-lg shadow-2xl max-w-5xl mx-auto"
                variants={itemVariants}
              >
                <table className="min-w-full bg-gray-900 divide-y divide-gray-700">
                  <thead>
                    <tr>
                      <th scope="col" className="px-6 py-4 text-left text-sm font-display text-white uppercase tracking-wider bg-gray-800">Attributs</th>
                      <th scope="col" className="px-6 py-4 text-center text-sm font-display text-white uppercase tracking-wider" style={{ backgroundColor: "#1C6E5F" }}>Nomades</th>
                      <th scope="col" className="px-6 py-4 text-center text-sm font-display text-gray-800 uppercase tracking-wider" style={{ backgroundColor: "#E3A947" }}>Anciens</th>
                      <th scope="col" className="px-6 py-4 text-center text-sm font-display text-white uppercase tracking-wider" style={{ backgroundColor: "#C73E3A" }}>Technos</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-700">
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white bg-gray-800">Territoire</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300 text-center">Aucun fixe</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300 text-center">Zones vertes</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300 text-center">Anciennes métropoles</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white bg-gray-800">Relation au passé</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300 text-center">Observation</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300 text-center">Préservation</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300 text-center">Réutilisation</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white bg-gray-800">Compétences</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300 text-center">Adaptation, survie</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300 text-center">Sagesse, guérison</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300 text-center">Ingénierie, énergie</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white bg-gray-800">Vision d'avenir</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300 text-center">Exploration continue</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300 text-center">Équilibre et tradition</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300 text-center">Progrès technologique</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white bg-gray-800">Leadership</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300 text-center">Collectif, par expérience</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300 text-center">Conseil des sages</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300 text-center">Hiérarchie méritocratique</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white bg-gray-800">Ressources valorisées</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300 text-center">Cartes, routes</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300 text-center">Livres, plantes</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300 text-center">Pièces, énergie</td>
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
