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
    <div className="tribes-page">
      <div className="page-container">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="tribes-content"
        >
          {/* Background Image with Banner Art */}
          <div className="tribes-background">
            <img 
              src="/attached_assets/1.pdf-image-004.jpg" 
              alt="ACAB Tribe Banners" 
              className="background-image"
            />
          </div>
          
          <motion.h1 
            className="page-title"
            variants={itemVariants}
          >
            LES TRIBUS
          </motion.h1>
          
          <motion.div 
            className="tribes-divider"
            variants={itemVariants}
          ></motion.div>
          
          <motion.p 
            className="page-description"
            variants={itemVariants}
          >
            Après la disparition de l'humanité, les chats survivants se sont organisés en tribus distinctes, chacune avec sa propre vision du monde et son approche face à l'héritage humain.
          </motion.p>
          
          {isLoading ? (
            <div className="loading-container">
              <div className="loading-spinner"></div>
              <p className="loading-text">Chargement des tribus...</p>
            </div>
          ) : (
            <>
              {/* Main Tribe Banners Section */}
              <div className="tribes-showcase">
                <img 
                  src="/attached_assets/1.pdf-image-004.jpg" 
                  alt="ACAB Tribe Banners" 
                  className="tribes-banner-image"
                />
                
                <div className="tribes-banners-grid">
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
              <motion.div variants={itemVariants} className="tribes-details-section">
                <h2 className="section-title">CULTURE ET TERRITOIRE</h2>
                
                <div className="tribes-details-grid">
                  {tribes.map((tribe) => (
                    <div 
                      key={`details-${tribe.id}`} 
                      className={`tribe-details-card ${getTribeBackgroundImage(tribe.name)}`}
                    >
                      <div className="tribe-details-header">
                        {getTribeIconComponent(tribe.name)}
                        <h3 className={`tribe-details-title ${getTribeTextColor(tribe.name)}`}>
                          {tribe.name}
                        </h3>
                      </div>
                      
                      <div className={`tribe-attributes ${getTribeTextColor(tribe.name)} tribe-attributes-opacity`}>
                        <div className="tribe-attribute">
                          <Map className="attribute-icon" />
                          <span className="attribute-text">
                            {tribe.name === "NOMADES" ? "Territoire: Non défini, en mouvement constant" : 
                             tribe.name === "ANCIENS" ? "Territoire: Forêts et anciennes bibliothèques" : 
                             "Territoire: Ruines technologiques"}
                          </span>
                        </div>
                        
                        <div className="tribe-attribute">
                          <Book className="attribute-icon" />
                          <span className="attribute-text">
                            {tribe.name === "NOMADES" ? "Croyance: L'expérience et le mouvement" : 
                             tribe.name === "ANCIENS" ? "Croyance: Harmonie et préservation" : 
                             "Croyance: Progrès et innovation"}
                          </span>
                        </div>
                        
                        <div className="tribe-attribute">
                          <Settings className="attribute-icon" />
                          <span className="attribute-text">
                            {tribe.name === "NOMADES" ? "Compétence: Adaptation et survie" : 
                             tribe.name === "ANCIENS" ? "Compétence: Sagesse et guérison" : 
                             "Compétence: Ingénierie et technologie"}
                          </span>
                        </div>
                        
                        <div className="tribe-attribute">
                          <Users className="attribute-icon" />
                          <span className="attribute-text">
                            {tribe.name === "NOMADES" ? "Structure: Groupes familiaux égalitaires" : 
                             tribe.name === "ANCIENS" ? "Structure: Conseil des sages" : 
                             "Structure: Hiérarchie technocratique"}
                          </span>
                        </div>
                      </div>
                      
                      <div className={`tribe-rituals-section ${tribe.name === "ANCIENS" ? "tribe-rituals-border-anciens" : "tribe-rituals-border-others"}`}>
                        <h4 className={`tribe-rituals-title ${getTribeTextColor(tribe.name)}`}>Rituels et traditions</h4>
                        <ul className={`tribe-rituals-list ${tribe.name === "ANCIENS" ? "text-dark-opacity" : "text-light-opacity"}`}>
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
                className="tribes-comparison-container"
                variants={itemVariants}
              >
                <table className="tribes-comparison-table">
                  <thead>
                    <tr>
                      <th scope="col" className="table-header table-header-attribute">Attributs</th>
                      <th scope="col" className="table-header table-header-nomades">Nomades</th>
                      <th scope="col" className="table-header table-header-anciens">Anciens</th>
                      <th scope="col" className="table-header table-header-technos">Technos</th>
                    </tr>
                  </thead>
                  <tbody className="table-body">
                    <tr>
                      <td className="table-cell table-cell-attribute">Territoire</td>
                      <td className="table-cell table-cell-tribe">Aucun fixe</td>
                      <td className="table-cell table-cell-tribe">Zones vertes</td>
                      <td className="table-cell table-cell-tribe">Anciennes métropoles</td>
                    </tr>
                    <tr>
                      <td className="table-cell table-cell-attribute">Relation au passé</td>
                      <td className="table-cell table-cell-tribe">Observation</td>
                      <td className="table-cell table-cell-tribe">Préservation</td>
                      <td className="table-cell table-cell-tribe">Réutilisation</td>
                    </tr>
                    <tr>
                      <td className="table-cell table-cell-attribute">Compétences</td>
                      <td className="table-cell table-cell-tribe">Adaptation, survie</td>
                      <td className="table-cell table-cell-tribe">Sagesse, guérison</td>
                      <td className="table-cell table-cell-tribe">Ingénierie, énergie</td>
                    </tr>
                    <tr>
                      <td className="table-cell table-cell-attribute">Vision d'avenir</td>
                      <td className="table-cell table-cell-tribe">Exploration continue</td>
                      <td className="table-cell table-cell-tribe">Équilibre et tradition</td>
                      <td className="table-cell table-cell-tribe">Progrès technologique</td>
                    </tr>
                    <tr>
                      <td className="table-cell table-cell-attribute">Leadership</td>
                      <td className="table-cell table-cell-tribe">Collectif, par expérience</td>
                      <td className="table-cell table-cell-tribe">Conseil des sages</td>
                      <td className="table-cell table-cell-tribe">Hiérarchie méritocratique</td>
                    </tr>
                    <tr>
                      <td className="table-cell table-cell-attribute">Ressources valorisées</td>
                      <td className="table-cell table-cell-tribe">Cartes, routes</td>
                      <td className="table-cell table-cell-tribe">Livres, plantes</td>
                      <td className="table-cell table-cell-tribe">Pièces, énergie</td>
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
