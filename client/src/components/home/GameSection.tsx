import { useEffect, useRef } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "framer-motion";
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
  
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <section id="game" className="py-24 " style={{ backgroundColor: 'rgb(35, 35, 35)' }} ref={ref}>
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <motion.h2 
            className="font-display text-5xl mb-6 text-center text-[#64afd6]"
            variants={fadeIn}
            initial="hidden"
            animate={controls}
          >
            JEU DE SOCIÉTÉ ACAB
          </motion.h2>
          <motion.p 
            className="text-gray-400 max-w-3xl mx-auto text-center mb-16"
            variants={fadeIn}
            initial="hidden"
            animate={controls}
            transition={{ delay: 0.2 }}
          >
            Plongez dans l'univers ACAB avec ce jeu de cartes stratégique où vous incarnerez l'une des tribus félines dans leur quête de survie et de pouvoir.
          </motion.p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
            <motion.div
              variants={fadeIn}
              initial="hidden"
              animate={controls}
              transition={{ delay: 0.3 }}
            >
              <div className="relative bg-gradient-to-br from-earth to-earth-dark p-6 rounded-lg shadow-lg">
                <img 
                  src="https://images.unsplash.com/photo-1615196832010-793f201a9829?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                  alt="Card game prototype" 
                  className="w-full h-auto rounded shadow-lg"
                />
                <div className="absolute -top-5 -right-5 w-24 h-24 bg-technos rounded-full flex items-center justify-center transform rotate-12 shadow-lg">
                  <span className="font-display text-white text-center text-sm">NOUVEAU<br />JEU</span>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              variants={fadeIn}
              initial="hidden"
              animate={controls}
              transition={{ delay: 0.4 }}
            >
              <h3 className="font-display text-3xl mb-6 text-white">MÉCANIQUE DE JEU</h3>
              
              <p className="text-gray-400 mb-6">
                Directement tiré de l'univers du projet ACAB, ce jeu de société invite les joueurs à incarner les différents clans félins dans leur quête de survie et de reconstruction.
              </p>
              
              <ul className="space-y-4 mb-8 text-gray-400">
                <li className="flex items-start">
                  <span className="inline-block w-8 text-center text-technos text-xl">
                    <Users className="h-5 w-5 mx-auto" />
                  </span>
                  <div className="ml-4">
                    <span className="font-display text-white">2-5 joueurs</span>
                    <p className="text-sm">Chaque joueur incarne une tribu avec ses propres capacités</p>
                  </div>
                </li>
                
                <li className="flex items-start">
                  <span className="inline-block w-8 text-center text-technos text-xl">
                    <Hourglass className="h-5 w-5 mx-auto" />
                  </span>
                  <div className="ml-4">
                    <span className="font-display text-white">45-60 minutes</span>
                    <p className="text-sm">Une partie complète avec exploration et confrontations</p>
                  </div>
                </li>
                
                <li className="flex items-start">
                  <span className="inline-block w-8 text-center text-technos text-xl">
                    <Gamepad className="h-5 w-5 mx-auto" />
                  </span>
                  <div className="ml-4">
                    <span className="font-display text-white">Stratégie & Exploration</span>
                    <p className="text-sm">Mélange d'actions stratégiques et de découverte</p>
                  </div>
                </li>
              </ul>
              
              <Link href="/game">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-block bg-technos hover:bg-technos/80 text-white font-display text-lg px-6 py-3 rounded-md transition-colors duration-300"
                >
                  EN SAVOIR PLUS
                </motion.button>
              </Link>
            </motion.div>
          </div>
          
          {/* Game Cards Preview */}
          <motion.h3 
            className="font-display text-3xl mb-8 text-center text-white"
            variants={fadeIn}
            initial="hidden"
            animate={controls}
            transition={{ delay: 0.5 }}
          >
            APERÇU DES CARTES
          </motion.h3>
          
          <motion.div 
            className="flex flex-wrap justify-center gap-6 mb-12"
            variants={fadeIn}
            initial="hidden"
            animate={controls}
            transition={{ delay: 0.6 }}
          >
            {GAME_CARDS.map((card, index) => (
              <GameCard 
                key={card.id}
                card={card}
                delay={0.7 + (index * 0.1)}
              />
            ))}
          </motion.div>
          
          <motion.div 
            className="text-center"
            variants={fadeIn}
            initial="hidden"
            animate={controls}
            transition={{ delay: 1.2 }}
          >
            <Link href="/game">
              <button className="inline-block border-2 border-white text-white hover:bg-white/10 font-display text-lg px-6 py-3 rounded-md transition-colors duration-300">
                RÈGLES COMPLÈTES
              </button>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default GameSection;
