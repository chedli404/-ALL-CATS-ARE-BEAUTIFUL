import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "wouter";
import { Users, Hourglass, Gamepad, Download } from "lucide-react";
import { GAME_CARDS } from "@/lib/constants";
import NewAnimatedHeading from "@/components/ui/NewAnimatedHeading";
import GameSection from "@/components/home/GameSection";

const GameFeature = ({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) => {
  return (
    <motion.div 
      className="flex items-start gap-4"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex-shrink-0 w-12 h-12 rounded-full bg-glass backdrop-blur-sm border border-white border-opacity-10 flex items-center justify-center text-primary">
        {icon}
      </div>
      <div>
        <h3 className="heading-section text-lg text-primary mb-1">{title}</h3>
        <p className="body-text text-text-dim">{description}</p>
      </div>
    </motion.div>
  );
};

const StepCard = ({ number, title, description }: { number: string, title: string, description: string }) => {
  return (
    <motion.div 
      className="bg-glass backdrop-blur-sm border border-white border-opacity-5 p-6 rounded-lg relative overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
    >
      <div className="absolute -top-6 -right-6 w-16 h-16 flex items-center justify-center">
        <div className="w-full h-full rounded-full bg-primary opacity-10"></div>
      </div>
      <div className="flex gap-4 items-start relative z-10">
        <div className="flex-shrink-0 w-10 h-10 bg-primary bg-opacity-20 rounded-lg flex items-center justify-center border border-primary border-opacity-30">
          <span className="heading-section text-primary">{number}</span>
        </div>
        <div>
          <h3 className="heading-section text-lg mb-2">{title}</h3>
          <p className="body-text text-text-dim">{description}</p>
        </div>
      </div>
    </motion.div>
  );
};

const Game = () => {
  const section1Ref = useRef<HTMLDivElement>(null);
  const section2Ref = useRef<HTMLDivElement>(null);
  const section3Ref = useRef<HTMLDivElement>(null);
  
  const isSection1InView = useInView(section1Ref, { once: false, amount: 0.2 });
  const isSection2InView = useInView(section2Ref, { once: false, amount: 0.2 });
  const isSection3InView = useInView(section3Ref, { once: false, amount: 0.2 });

  return (
    <div className="min-h-screen bg-background-dark">
      {/* Hero Section */}
      <section ref={section1Ref} className="section-container py-24 relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <motion.div 
            className="absolute inset-0 bg-grid opacity-5"
            initial={{ opacity: 0 }}
            animate={isSection1InView ? { opacity: 0.05 } : { opacity: 0 }}
            transition={{ duration: 1.5 }}
          />
          
          {/* Accent elements */}
          <motion.div 
            className="absolute -top-40 -right-40 w-96 h-96 rounded-full blur-3xl"
            style={{ background: "radial-gradient(circle at center, var(--primary)30, transparent)" }}
            initial={{ opacity: 0 }}
            animate={isSection1InView ? { opacity: 0.3 } : { opacity: 0 }}
            transition={{ duration: 1 }}
          />
          <motion.div 
            className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full blur-3xl"
            style={{ background: "radial-gradient(circle at center, var(--techno)30, transparent)" }}
            initial={{ opacity: 0 }}
            animate={isSection1InView ? { opacity: 0.3 } : { opacity: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          />
        </div>

        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <NewAnimatedHeading 
              text="JEU DE SOCIété KABILA" 
              subtitle="Plongez dans l'univers félin de 2100 avec ce jeu de cartes stratégique" 
              accent="primary"
              size="lg"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isSection1InView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <div className="relative">
                <motion.div 
                  className="absolute inset-0 bg-techno opacity-10 blur-md rounded-lg"
                  animate={{ 
                    scale: [1, 1.05, 1],
                    opacity: [0.1, 0.15, 0.1]
                  }}
                  transition={{ 
                    duration: 5,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                />
                <div className="relative bg-glass backdrop-blur-sm p-6 rounded-lg border border-white border-opacity-5 shadow-2xl">
                  <img 
                    src="/attached_assets/IMG_0299.png" 
                    alt="Card game prototype" 
                    className="w-full h-auto rounded shadow-lg"
                  />
                  <div className="absolute -top-5 -right-5 w-24 h-24 bg-techno rounded-full flex items-center justify-center transform rotate-12 shadow-lg border border-white border-opacity-10">
                    <span className="heading-section text-white text-center text-sm">NOUVEAU<br />JEU</span>
                  </div>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={isSection1InView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <NewAnimatedHeading 
                text="MÉCANIQUE DE JEU" 
                accent="secondary"
                size="md"
                align="left"
              />
              
              <p className="body-text text-text-dim my-6">
                Directement tiré de l'univers du projet Kabila, ce jeu de société invite les joueurs à incarner les différents clans félins dans leur quête de survie et de reconstruction. À travers des mécaniques de stratégie et de coopération, les joueurs explorent les tensions idéologiques et les défis environnementaux.
              </p>
              
              <div className="space-y-6 mb-8">
                <GameFeature 
                  icon={<Users className="h-5 w-5" />}
                  title="2-5 joueurs"
                  description="Chaque joueur incarne une tribu féline avec ses propres capacités et forces uniques"
                />
                
                <GameFeature 
                  icon={<Hourglass className="h-5 w-5" />}
                  title="45-60 minutes"
                  description="Une partie complète avec exploration des territoires et confrontations stratégiques"
                />
                
                <GameFeature 
                  icon={<Gamepad className="h-5 w-5" />}
                  title="Stratégie & Exploration"
                  description="Mélange d'actions stratégiques, d'alliances et de découverte dans un monde post-humain"
                />
              </div>
              
              <motion.button
                className="px-8 py-3 heading-section rounded-md bg-primary text-white hover:bg-opacity-90 transition-all duration-300 glow-shadow"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                PRÉCOMMANDER
              </motion.button>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Game Cards Section */}
      <GameSection />
      
      {/* How to Play Section */}
      <section ref={section3Ref} className="section-container py-24 relative overflow-hidden">
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <motion.div 
            className="absolute inset-0 bg-grid opacity-5"
            initial={{ opacity: 0 }}
            animate={isSection3InView ? { opacity: 0.05 } : { opacity: 0 }}
            transition={{ duration: 1.5 }}
          />
          
          {/* Accent elements */}
          <motion.div 
            className="absolute top-0 left-0 w-1/3 h-full"
            initial={{ opacity: 0 }}
            animate={isSection3InView ? { opacity: 0.1 } : { opacity: 0 }}
            transition={{ duration: 1 }}
          >
            <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
              <motion.circle 
                cx="30" 
                cy="70" 
                r="30" 
                fill="var(--tertiary)" 
                opacity="0.1"
                initial={{ r: 0 }}
                animate={isSection3InView ? { r: 30 } : { r: 0 }}
                transition={{ duration: 2, delay: 0.5 }}
              />
            </svg>
          </motion.div>
        </div>
        
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <NewAnimatedHeading 
              text="COMMENT JOUER" 
              subtitle="Apprenez les règles de base du jeu de cartes Kabila" 
              accent="tertiary"
              size="lg"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <StepCard 
              number="01"
              title="Préparation"
              description="Chaque joueur choisit une tribu et reçoit son paquet de cartes spécifique. Le plateau de jeu représentant les différents territoires est placé au centre de la table."
            />
            
            <StepCard 
              number="02"
              title="Tours de jeu"
              description="À son tour, un joueur peut effectuer deux actions parmi: explorer un territoire, collecter des ressources, jouer une carte personnage ou artefact, ou attaquer un territoire adverse."
            />
            
            <StepCard 
              number="03"
              title="Conditions de victoire"
              description="Le jeu se termine lorsqu'un joueur a rempli l'objectif de sa tribu ou lorsque le paquet de cartes événements est épuisé. Le joueur avec le plus de points remporte la partie."
            />
          </div>
          
          <motion.div 
            className="bg-glass backdrop-blur-sm p-8 rounded-lg border border-white border-opacity-5 max-w-3xl mx-auto relative"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
          >
            <blockquote className="body-text text-text-dim italic border-l-2 border-tertiary pl-4">
              "Dans ce monde où les chats ont pris la place des humains, chaque tribu lutte pour sa vision du futur. Voulez-vous préserver la nature, exploiter la technologie, ou perpétuer les traditions? À vous de choisir et de mener votre clan vers la victoire."
              <footer className="mt-2 text-tertiary">— Manuel du Jeu Kabila</footer>
            </blockquote>
            
            <div className="absolute -top-5 -left-5 w-10 h-10 text-tertiary opacity-50">
              <svg viewBox="0 0 24 24" fill="none" className="w-full h-full" stroke="currentColor" strokeWidth="1">
                <path d="M3 21c9 0 9-9 9-9s0-9-9-9"/>
                <path d="M21 21c-9 0-9-9-9-9s0-9 9-9"/>
              </svg>
            </div>
            
            <div className="absolute -bottom-5 -right-5 w-10 h-10 text-tertiary opacity-50 transform rotate-180">
              <svg viewBox="0 0 24 24" fill="none" className="w-full h-full" stroke="currentColor" strokeWidth="1">
                <path d="M3 21c9 0 9-9 9-9s0-9-9-9"/>
                <path d="M21 21c-9 0-9-9-9-9s0-9 9-9"/>
              </svg>
            </div>
          </motion.div>
          
          <div className="text-center mt-16">
            <motion.button
              className="inline-flex items-center px-8 py-3 heading-section rounded-md bg-tertiary bg-opacity-10 text-tertiary hover:bg-opacity-20 transition-all duration-300 border border-tertiary border-opacity-30"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <Download className="mr-2 h-5 w-5" />
              TÉLÉCHARGER LES RÈGLES COMPLÈTES
            </motion.button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Game;
