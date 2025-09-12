import { motion } from "framer-motion";
import { History, Cpu, Zap, FileText, Compass } from "lucide-react";
import { useRef, useEffect } from "react";
import { useInView } from "framer-motion";

const Artifacts = () => {
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

  // Sample artifacts data
  const artifacts = [
    {
      id: 1,
      name: "Le Communicateur",
      description: "Un ancien smartphone qui émet encore des impulsions électromagnétiques. Les Technos croient qu'il pourrait contenir les derniers messages de l'humanité.",
      type: "Technologie",
      location: "Métropole Abandonnée",
      tribe: "Technos",
      image: "https://images.unsplash.com/photo-1580910051074-3eb694886505?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      icon: <Cpu className="h-6 w-6" />
    },
    {
      id: 2,
      name: "Manuscrit d'Espoir",
      description: "Un journal intime écrit par l'un des derniers humains, décrivant les événements qui ont mené à leur disparition et contenant des indices sur un possible refuge.",
      type: "Document",
      location: "Bibliothèque des Anciens",
      tribe: "Anciens",
      image: "https://images.unsplash.com/photo-1516414447565-b14be0adf13e?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      icon: <FileText className="h-6 w-6" />
    },
    {
      id: 3,
      name: "La Boussole Éternelle",
      description: "Une boussole qui ne pointe pas vers le nord, mais vers la source d'énergie la plus proche. Un outil précieux pour les expéditions dans les terres inconnues.",
      type: "Outil",
      location: "Territoire des Nomades",
      tribe: "Nomades",
      image: "https://images.unsplash.com/photo-1533162507191-d90c625b2640?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      icon: <Compass className="h-6 w-6" />
    },
    {
      id: 4,
      name: "Cellule d'Énergie Infinie",
      description: "Un petit appareil cylindrique qui génère une énergie continue depuis des décennies. Son fonctionnement reste un mystère, même pour les plus brillants des Technos.",
      type: "Énergie",
      location: "Zone de Fusion",
      tribe: "Technos",
      image: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      icon: <Zap className="h-6 w-6" />
    }
  ];

  // Artifact timeline entries
  const timelineEntries = [
    {
      year: "2072",
      title: "Découverte du premier artefact",
      description: "Un groupe de chats errants découvre un objet lumineux dans les ruines d'un laboratoire, marquant le début de l'intérêt pour les reliques humaines."
    },
    {
      year: "2081",
      title: "Formation de la Guilde des Collectionneurs",
      description: "Les premiers Technos s'organisent pour cataloguer et étudier les artefacts trouvés dans les ruines urbaines."
    },
    {
      year: "2095",
      title: "La Grande Expédition",
      description: "Une alliance entre Nomades et Technos organise la plus grande exploration à ce jour, ramenant plus de cent artefacts uniques."
    },
    {
      year: "2100",
      title: "L'Ère des Artefacts",
      description: "Les objets humains deviennent des symboles de pouvoir et de connaissance, façonnant la politique et les relations entre les tribus."
    }
  ];

  // Refs and animations for timeline
  const timelineRef = useRef(null);
  const isTimelineInView = useInView(timelineRef, { once: true, amount: 0.2 });

  return (
    <div className="min-h-screen  py-24 " style={{ backgroundColor: "rgb(20, 36, 45)" }}  >
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
            OBJETS & ARTEFACTS
          </motion.h1>
          <motion.p 
            className="text-gray-700 max-w-3xl mx-auto text-center mb-16"
            variants={itemVariants}
          >
            Des vestiges mystérieux d'une civilisation disparue, ces objets sont aujourd'hui des trésors convoités par les différentes tribus félines. Ils racontent l'histoire de l'humanité et détiennent parfois des pouvoirs inattendus.
          </motion.p>
          
          {/* Timeline Section */}
          <motion.div 
            className="mb-24"
            variants={itemVariants}
            ref={timelineRef}
          >
            <div className="flex items-center mb-8">
              <h2 className="font-display text-3xl flex items-center">
                <History className="mr-3 h-8 w-8 text-technos" />
                CHRONOLOGIE DES DÉCOUVERTES
              </h2>
            </div>
            
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-0 md:left-1/2 top-0 h-full w-1 bg-gray-700 transform md:translate-x-0 translate-x-4"></div>
              
              {timelineEntries.map((entry, index) => (
                <div 
                  key={index} 
                  className={`flex flex-col md:flex-row items-start mb-12 relative ${
                    index % 2 === 0 ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  {/* Timeline dot */}
                  <div 
                    className={`absolute left-4 md:left-1/2 w-8 h-8 bg-technos rounded-full z-10 flex items-center justify-center transform md:translate-x-0 md:translate-x-[-16px] ${
                      isTimelineInView ? 'opacity-100' : 'opacity-0'
                    } transition-opacity duration-500 delay-${index * 300}`}
                    style={{ 
                      transition: 'opacity 0.5s',
                      transitionDelay: `${index * 0.3}s`,
                      opacity: isTimelineInView ? 1 : 0
                    }}
                  >
                    <div className="w-4 h-4 bg-white rounded-full"></div>
                  </div>
                  
                  {/* Content */}
                  <div 
                    className={`md:w-1/2 pl-12 md:pl-0 ${
                      index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'
                    } ${
                      isTimelineInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                    }`}
                    style={{ 
                      transition: 'opacity 0.5s, transform 0.5s',
                      transitionDelay: `${index * 0.3 + 0.2}s`,
                      opacity: isTimelineInView ? 1 : 0,
                      transform: isTimelineInView ? 'translateY(0)' : 'translateY(10px)'
                    }}
                  >
                    <span className="font-tech text-sm text-technos">
                      {entry.year}
                    </span>
                    <h3 className="font-display text-xl mt-1 mb-2">{entry.title}</h3>
                    <p className="text-gray-700">{entry.description}</p>
                  </div>
                  
                  <div className="hidden md:block md:w-1/2"></div>
                </div>
              ))}
            </div>
          </motion.div>
          
          {/* Artifacts Grid */}
          <motion.h2 
            className="font-display text-3xl mb-8 text-center"
            variants={itemVariants}
          >
            COLLECTION D'ARTEFACTS
          </motion.h2>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16"
            variants={containerVariants}
          >
            {artifacts.map((artifact, index) => (
              <motion.div 
                key={artifact.id}
                className="bg-white/10 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
                variants={itemVariants}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <div className="grid grid-cols-3 h-full">
                  <div className="col-span-1">
                    <img 
                      src={artifact.image} 
                      alt={artifact.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="col-span-2 p-6">
                    <div className="flex items-center mb-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 ${
                        artifact.tribe === "Technos" ? "bg-technos" : 
                        artifact.tribe === "Anciens" ? "bg-anciens" : "bg-nomades"
                      }`}>
                        {artifact.icon}
                      </div>
                      <h3 className="font-display text-xl">{artifact.name}</h3>
                    </div>
                    
                    <p className="text-gray-700 mb-4">{artifact.description}</p>
                    
                    <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
                      <div>
                        <span className="font-bold">Type:</span> {artifact.type}
                      </div>
                      <div>
                        <span className="font-bold">Lieu:</span> {artifact.location}
                      </div>
                      <div>
                        <span className="font-bold">Possesseur:</span> {artifact.tribe}
                      </div>
                    </div>
                    
                    <button className={`mt-4 px-4 py-2 rounded text-white font-display text-sm ${
                      artifact.tribe === "Technos" ? "bg-technos hover:bg-technos/80" : 
                      artifact.tribe === "Anciens" ? "bg-anciens hover:bg-anciens/80" : "bg-nomades hover:bg-nomades/80"
                    } transition-colors`}>
                      EXAMINER
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
          
          {/* Interactive Encyclopedia */}
          <motion.div 
            className="bg-earth-dark/20 p-8 rounded-lg shadow-lg"
            variants={itemVariants}
          >
            <div className="text-center mb-8">
              <h2 className="font-display text-3xl mb-4">ENCYCLOPÉDIE INTERACTIVE</h2>
              <p className="text-gray-700 max-w-3xl mx-auto">
                Explorez la base de données complète des artefacts découverts par les tribus félines. Recherchez par type, fonction ou tribu possesseur.
              </p>
            </div>
            
            <div className="flex flex-col md:flex-row justify-center gap-4 mb-8">
              <input 
                type="text" 
                placeholder="Rechercher un artefact..." 
                className="px-4 py-2 bg-white/50 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-technos"
              />
              
              <select className="px-4 py-2 bg-white/50 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-technos">
                <option value="">Tous les types</option>
                <option value="technologie">Technologie</option>
                <option value="document">Document</option>
                <option value="outil">Outil</option>
                <option value="energie">Énergie</option>
              </select>
              
              <select className="px-4 py-2 bg-white/50 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-technos">
                <option value="">Toutes les tribus</option>
                <option value="Technos">Technos</option>
                <option value="Anciens">Anciens</option>
                <option value="Nomades">Nomades</option>
              </select>
              
              <button className="px-6 py-2 bg-technos text-white rounded-md hover:bg-technos/80 transition-colors">
                Rechercher
              </button>
            </div>
            
            <div className="bg-white/30 p-6 rounded-lg text-center">
              <p className="text-gray-700">
                Explorez notre base de données interactive pour découvrir plus de 200 artefacts catalogués par les explorateurs.
              </p>
              <button className="mt-4 px-6 py-2 bg-earth-dark text-white rounded-md hover:bg-earth-dark/80 transition-colors font-display">
                ACCÉDER À L'ENCYCLOPÉDIE COMPLÈTE
              </button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Artifacts;
