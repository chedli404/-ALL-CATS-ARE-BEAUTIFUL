import { motion } from "framer-motion";
import { Link } from "wouter";
import GameCard from "@/components/ui/GameCard";
import { GAME_CARDS } from "@/lib/constants";
import { Users, Hourglass, Gamepad, Download } from "lucide-react";

const Game = () => {
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

  return (
    <div className="min-h-screen  py-24" style={{ backgroundColor: "rgb(20, 36, 45)" }}>
      <div className="container mx-auto px-4">
        <motion.div
          className="max-w-5xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1 
            className="font-display text-5xl mb-6 text-center text-white"
            variants={itemVariants}
          >
            JEU DE SOCIÉTÉ ACAB
          </motion.h1>
          <motion.p 
            className="text-gray-400 max-w-3xl mx-auto text-center mb-16"
            variants={itemVariants}
          >
            Plongez dans l'univers ACAB avec ce jeu de cartes stratégique où vous incarnerez l'une des tribus félines dans leur quête de survie et de pouvoir.
          </motion.p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
            <motion.div variants={itemVariants}>
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
            
            <motion.div variants={itemVariants}>
              <h2 className="font-display text-3xl mb-6 text-white">MÉCANIQUE DE JEU</h2>
              
              <p className="text-gray-400 mb-6">
                Directement tiré de l'univers du projet ACAB, ce jeu de société invite les joueurs à incarner les différents clans félins dans leur quête de survie et de reconstruction. À travers des mécaniques de stratégie et de coopération, les joueurs explorent les tensions idéologiques et les défis environnementaux.
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
              
              <button className="inline-block bg-technos hover:bg-technos/80 text-white font-display text-lg px-6 py-3 rounded-md transition-colors duration-300">
                PRÉCOMMANDER
              </button>
            </motion.div>
          </div>
          
          <motion.h2 
            className="font-display text-3xl mb-8 text-center text-white"
            variants={itemVariants}
          >
            APERÇU DES CARTES
          </motion.h2>
          
          <motion.div 
            className="flex flex-wrap justify-center gap-6 mb-12"
            variants={containerVariants}
          >
            {GAME_CARDS.map((card, index) => (
              <GameCard 
                key={card.id}
                card={card}
                delay={0.1 * index}
              />
            ))}
          </motion.div>
          
          <motion.div 
            className="mb-16"
            variants={itemVariants}
          >
            <h2 className="font-display text-3xl mb-6 text-white text-center">COMMENT JOUER</h2>
            
            <div className="bg-gray-800 p-6 rounded-lg">
              <div className="space-y-8">
                <div>
                  <h3 className="font-display text-xl text-white mb-2">1. Préparation</h3>
                  <p className="text-gray-400">
                    Chaque joueur choisit une tribu et reçoit son paquet de cartes spécifique. Le plateau de jeu représentant les différents territoires est placé au centre de la table. Chaque joueur place son marqueur de tribu sur son territoire de départ.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-display text-xl text-white mb-2">2. Les tours de jeu</h3>
                  <p className="text-gray-400">
                    À son tour, un joueur peut effectuer deux actions parmi: explorer un territoire, collecter des ressources, jouer une carte personnage ou artefact, attaquer un territoire adverse ou fortifier sa position.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-display text-xl text-white mb-2">3. Conditions de victoire</h3>
                  <p className="text-gray-400">
                    Le jeu se termine lorsqu'un joueur a rempli l'objectif de sa tribu ou lorsque le paquet de cartes événements est épuisé. Dans ce dernier cas, le joueur avec le plus de points de victoire remporte la partie.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            className="text-center"
            variants={itemVariants}
          >
            <button className="inline-flex items-center border-2 border-white text-white hover:bg-white/10 font-display text-lg px-6 py-3 rounded-md transition-colors duration-300">
              <Download className="mr-2 h-5 w-5" />
              TÉLÉCHARGER LES RÈGLES COMPLÈTES
            </button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Game;
