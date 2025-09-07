import { useEffect, useRef } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import { Link } from "wouter";
import GameCard from "@/components/ui/GameCard";
import { GAME_CARDS } from "@/lib/constants";
import { Users, Hourglass, Gamepad } from "lucide-react";

const GameSection = () => {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  
  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [controls, isInView]);
  
  const headerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      transition: { 
        delay: custom * 0.2,
        duration: 0.8,
        ease: [0.215, 0.61, 0.355, 1]
      }
    })
  };

  const cardContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.6 }
    }
  };

  return (
    <section 
      id="game" 
      className="py-24 px-4 bg-gradient-to-b from-black to-gray-900 overflow-hidden relative" 
      ref={ref}
    >
      {/* Background decorative elements */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-technos/5 rounded-full blur-3xl opacity-50"></div>
      <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-anciens/5 rounded-full blur-3xl opacity-50"></div>
      
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          variants={headerVariants}
          initial="hidden"
          animate={controls}
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display text-white mb-4">Jeu de Société ACAB</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto font-body">Plongez dans l'univers ACAB avec ce jeu de cartes stratégique</p>
          <div className="w-24 h-1 bg-gradient-to-r from-technos to-mystique mx-auto mt-6"></div>
        </motion.div>
        
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
            {/* Game image display */}
            <motion.div
              custom={1}
              variants={fadeInUp}
              initial="hidden"
              animate={controls}
            >
              <div className="rounded-xl overflow-hidden shadow-2xl border border-gray-800 bg-gray-900/50 p-1">
                <div className="relative overflow-hidden rounded-lg">
                  <img 
                    src="/attached_assets/IMG_0302.png" 
                    alt="Kabila Card Game" 
                    className="w-full h-auto object-cover rounded-lg transform transition-transform duration-700 hover:scale-105" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-60"></div>
                  
                  {/* Badge */}
                  <motion.div 
                    className="absolute -top-5 -right-5 w-28 h-28 bg-technos rounded-full flex items-center justify-center shadow-lg"
                    initial={{ rotate: 12, scale: 0 }}
                    animate={{ rotate: 12, scale: 1 }}
                    transition={{ delay: 0.9, type: "spring", stiffness: 300 }}
                  >
                    <div className="text-center">
                      <div className="font-display text-white text-base font-bold">NOUVEAU</div>
                      <div className="font-display text-white text-xl font-bold">JEU</div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
            
            {/* Game info text */}
            <motion.div
              custom={2}
              variants={fadeInUp}
              initial="hidden"
              animate={controls}
            >
              <div className="space-y-6">
                <h3 className="font-display text-3xl text-white border-l-4 border-technos pl-4">Mécanique de Jeu</h3>
                
                <p className="text-gray-300 font-body leading-relaxed">
                  Directement inspiré de l'univers du projet Kabila, ce jeu de société invite les joueurs à incarner les différentes tribus félines dans leur quête de survie et de reconstruction d'un monde nouveau après la disparition des humains.
                </p>
                
                <ul className="space-y-6 text-gray-300">
                  <li className="flex items-start bg-gray-800/30 p-4 rounded-lg backdrop-blur-sm hover:bg-gray-800/50 transition-colors duration-300">
                    <span className="shrink-0 w-10 h-10 rounded-full bg-technos/20 flex items-center justify-center text-technos">
                      <Users className="h-5 w-5" />
                    </span>
                    <div className="ml-4">
                      <span className="font-display text-white text-lg">2-6 joueurs</span>
                      <p className="font-body">Chaque joueur incarne une tribu avec ses propres capacités spéciales.</p>
                    </div>
                  </li>
                  
                  <li className="flex items-start bg-gray-800/30 p-4 rounded-lg backdrop-blur-sm hover:bg-gray-800/50 transition-colors duration-300">
                    <span className="shrink-0 w-10 h-10 rounded-full bg-technos/20 flex items-center justify-center text-technos">
                      <Hourglass className="h-5 w-5" />
                    </span>
                    <div className="ml-4">
                      <span className="font-display text-white text-lg">45-60 minutes</span>
                      <p className="font-body">Une partie complète avec exploration, conquête de territoires et confrontations.</p>
                    </div>
                  </li>
                  
                  <li className="flex items-start bg-gray-800/30 p-4 rounded-lg backdrop-blur-sm hover:bg-gray-800/50 transition-colors duration-300">
                    <span className="shrink-0 w-10 h-10 rounded-full bg-technos/20 flex items-center justify-center text-technos">
                      <Gamepad className="h-5 w-5" />
                    </span>
                    <div className="ml-4">
                      <span className="font-display text-white text-lg">Stratégie & Exploration</span>
                      <p className="font-body">Combinaison d'actions stratégiques, de gestion de ressources et de découverte de l'univers ACAB.</p>
                    </div>
                  </li>
                </ul>
                
                <motion.div 
                  className="pt-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.4 }}
                >
                  <Link href="/game">
                    <motion.button
                      whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(199, 62, 58, 0.5)" }}
                      whileTap={{ scale: 0.95 }}
                      className="inline-block bg-technos hover:bg-technos/90 text-white font-display text-lg px-8 py-3 rounded-md transition-all duration-300 shadow-lg"
                    >
                      DÉCOUVRIR LE JEU
                    </motion.button>
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </div>
          
          {/* Game Cards Preview */}
          <motion.div
            variants={headerVariants}
            initial="hidden"
            animate={controls}
            transition={{ delay: 0.8 }}
            className="text-center mb-12"
          >
            <h3 className="font-display text-3xl text-white mb-2">Aperçu des Cartes</h3>
            <p className="text-gray-400 max-w-2xl mx-auto mb-12">Découvrez quelques-unes des cartes que vous pourrez utiliser pour bâtir votre stratégie</p>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-16"
            variants={cardContainerVariants}
            initial="hidden"
            animate={controls}
          >
            {GAME_CARDS.slice(0, 5).map((card, index) => (
              <GameCard 
                key={card.id}
                card={card}
                delay={0.1 * index}
              />
            ))}
          </motion.div>
          
          <motion.div 
            className="text-center"
            variants={fadeInUp}
            custom={5}
            initial="hidden"
            animate={controls}
          >
            <Link href="/game">
              <motion.button 
                className="inline-block border-2 border-white/80 text-white hover:bg-white/10 font-display text-lg px-8 py-3 rounded-md transition-all duration-300 backdrop-blur-sm"
                whileHover={{ scale: 1.05, borderColor: "rgba(255,255,255,1)" }}
                whileTap={{ scale: 0.95 }}
              >
                VOIR TOUTES LES CARTES
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default GameSection;
