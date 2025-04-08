import { motion } from "framer-motion";
import { Book, Bookmark, PlayCircle } from "lucide-react";
import { Link } from "wouter";

const Legends = () => {
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

  // Sample episodes data
  const episodes = [
    {
      id: 1,
      title: "L'Éveil",
      description: "Le premier épisode nous plonge dans les derniers jours de l'humanité et l'émergence d'une conscience nouvelle chez les félins.",
      image: "https://images.unsplash.com/photo-1598188306155-25e400eb5078?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      season: 1,
      episode: 1,
      duration: "22min"
    },
    {
      id: 2,
      title: "Les Ruines",
      description: "Les chats explorent les vestiges des villes humaines et découvrent les traces laissées par leurs anciens maîtres.",
      image: "https://images.unsplash.com/photo-1504197832061-98356e3dcdcf?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      season: 1,
      episode: 2,
      duration: "24min"
    },
    {
      id: 3,
      title: "Premiers Conflits",
      description: "Les différentes visions du monde commencent à diviser les chats, annonçant la naissance des tribus.",
      image: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      season: 1,
      episode: 3,
      duration: "25min"
    }
  ];

  // Sample comic book data
  const comics = [
    {
      id: 1,
      title: "ACAB - Origines",
      description: "Le roman graphique qui raconte les débuts du monde post-humain et la naissance des tribus félines.",
      image: "https://images.unsplash.com/photo-1516041384399-e6b65108aece?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      pages: 124,
      author: "Zied Belaifa"
    },
    {
      id: 2,
      title: "Les Chroniques d'HRNY",
      description: "Les aventures de l'énigmatique HRNY à travers les terres désolées et les intrigues des tribus.",
      image: "https://images.unsplash.com/photo-1511044568932-338cba0ad803?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      pages: 86,
      author: "Sarra Bdiri"
    }
  ];

  return (
    <div className="min-h-screen  py-24" style={{ backgroundColor: "rgb(20, 36, 45)" }}>
      <div className="container mx-auto px-4">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1 
            className="font-display text-5xl mb-6 text-center text-white"
            variants={itemVariants}
          >
            LÉGENDES ET RÉCITS
          </motion.h1>
          <motion.p 
            className="text-gray-400 max-w-3xl mx-auto text-center mb-16"
            variants={itemVariants}
          >
            Découvrez l'univers ACAB à travers des bandes dessinées captivantes et une série animée qui racontent l'histoire d'un monde où les chats ont hérité de la Terre.
          </motion.p>
          
          {/* Series Section */}
          <motion.div 
            className="mb-24"
            variants={itemVariants}
          >
            <div className="flex items-center justify-between mb-8">
              <h2 className="font-display text-3xl text-white flex items-center">
                <PlayCircle className="mr-3 h-8 w-8 text-technos" />
                SÉRIE ANIMÉE
              </h2>
              <div className="bg-technos/20 text-technos px-3 py-1 rounded-md font-tech">
                SAISON 1
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {episodes.map((episode, index) => (
                <motion.div 
                  key={episode.id}
                  className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
                  variants={itemVariants}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                >
                  <div className="relative">
                    <img 
                      src={episode.image} 
                      alt={episode.title} 
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-0 right-0 bg-black/70 px-3 py-1 m-2 rounded text-xs font-tech text-white">
                      {episode.duration}
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent py-2 px-4">
                      <div className="flex justify-between items-end">
                        <span className="text-white font-tech text-sm">
                          Épisode {episode.episode}
                        </span>
                        <button className="bg-technos hover:bg-technos/80 text-white rounded-full p-2 transition-colors">
                          <PlayCircle className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="font-display text-xl text-white mb-2">{episode.title}</h3>
                    <p className="text-gray-400 text-sm mb-4">{episode.description}</p>
                    <div className="flex justify-between items-center">
                      <button className="text-technos hover:text-technos/80 text-sm font-tech transition-colors flex items-center">
                        <Bookmark className="h-4 w-4 mr-1" />
                        AJOUTER
                      </button>
                      <span className="text-gray-500 text-xs">Diffusé le 12/06/2023</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <div className="mt-8 text-center">
              <button className="border border-white/20 text-white hover:bg-white/10 px-6 py-3 rounded-md font-display transition-colors">
                VOIR TOUS LES ÉPISODES
              </button>
            </div>
          </motion.div>
          
          {/* Voting Section */}
          <motion.div 
            className="bg-gradient-to-r from-earth-dark/30 to-earth/30 rounded-lg p-8 mb-24"
            variants={itemVariants}
          >
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="font-display text-3xl text-white mb-4">VOTEZ POUR LA PROCHAINE SAISON</h2>
              <p className="text-gray-300 mb-8">
                Participez à l'évolution de l'univers ACAB en votant pour les thèmes que vous souhaitez voir explorés dans la prochaine saison de la série animée.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div className="bg-black/20 p-4 rounded-lg hover:bg-black/30 transition-colors cursor-pointer">
                  <h3 className="font-display text-white mb-2">Les Anciens Secrets</h3>
                  <p className="text-gray-400 text-sm">Exploration des technologies oubliées et des secrets enfouis</p>
                  <div className="mt-4 w-full bg-gray-700 h-3 rounded-full overflow-hidden">
                    <div className="bg-technos h-full" style={{ width: "65%" }}></div>
                  </div>
                  <div className="mt-1 text-right text-xs text-gray-400">65%</div>
                </div>
                
                <div className="bg-black/20 p-4 rounded-lg hover:bg-black/30 transition-colors cursor-pointer">
                  <h3 className="font-display text-white mb-2">La Migration</h3>
                  <p className="text-gray-400 text-sm">Le grand voyage des Nomades vers des terres inconnues</p>
                  <div className="mt-4 w-full bg-gray-700 h-3 rounded-full overflow-hidden">
                    <div className="bg-nomades h-full" style={{ width: "25%" }}></div>
                  </div>
                  <div className="mt-1 text-right text-xs text-gray-400">25%</div>
                </div>
                
                <div className="bg-black/20 p-4 rounded-lg hover:bg-black/30 transition-colors cursor-pointer">
                  <h3 className="font-display text-white mb-2">La Guerre des Tribus</h3>
                  <p className="text-gray-400 text-sm">Le conflit entre les différentes factions pour le contrôle des ressources</p>
                  <div className="mt-4 w-full bg-gray-700 h-3 rounded-full overflow-hidden">
                    <div className="bg-anciens h-full" style={{ width: "10%" }}></div>
                  </div>
                  <div className="mt-1 text-right text-xs text-gray-400">10%</div>
                </div>
              </div>
              
              <button className="bg-technos hover:bg-technos/80 text-white font-display px-6 py-3 rounded-md transition-colors">
                SOUMETTRE MON VOTE
              </button>
            </div>
          </motion.div>
          
          {/* Comics Section */}
          <motion.div variants={itemVariants}>
            <div className="flex items-center mb-8">
              <h2 className="font-display text-3xl text-white flex items-center">
                <Book className="mr-3 h-8 w-8 text-anciens" />
                BANDES DESSINÉES
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {comics.map((comic, index) => (
                <motion.div 
                  key={comic.id}
                  className="flex bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
                  variants={itemVariants}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                >
                  <div className="w-1/3">
                    <img 
                      src={comic.image} 
                      alt={comic.title} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="w-2/3 p-6">
                    <h3 className="font-display text-xl text-white mb-2">{comic.title}</h3>
                    <p className="text-gray-400 text-sm mb-4">{comic.description}</p>
                    <div className="flex justify-between items-center">
                      <div>
                        <span className="text-gray-500 text-xs block">Auteur: {comic.author}</span>
                        <span className="text-gray-500 text-xs block">{comic.pages} pages</span>
                      </div>
                      <button className="bg-anciens hover:bg-anciens/80 text-white px-4 py-2 rounded font-display text-sm transition-colors">
                        DÉCOUVRIR
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <div className="mt-12 text-center">
              <Link href="#">
                <button className="border border-white/20 text-white hover:bg-white/10 px-6 py-3 rounded-md font-display transition-colors">
                  EXPLORER LA COLLECTION COMPLÈTE
                </button>
              </Link>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Legends;
