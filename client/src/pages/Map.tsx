import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import InteractiveMap from "@/components/ui/InteractiveMap";
import NewAnimatedHeading from "@/components/ui/NewAnimatedHeading";
import { MAP_REGIONS, TRIBES_DATA } from "@/lib/constants";

const Map = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const regionsRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 });
  const isRegionsInView = useInView(regionsRef, { once: false, amount: 0.1 });
  const isContentInView = useInView(contentRef, { once: false, amount: 0.1 });

  return (
    <div className="min-h-screen py-24 bg-background-dark" ref={sectionRef}>
      {/* Background pattern */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <motion.div 
          className="absolute inset-0 bg-grid opacity-5"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 0.05 } : { opacity: 0 }}
          transition={{ duration: 1.5 }}
        />
        
        {/* Accent elements */}
        <motion.div 
          className="absolute -top-40 -right-40 w-96 h-96 rounded-full blur-3xl"
          style={{ background: "radial-gradient(circle at center, var(--primary)30, transparent)" }}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 0.3 } : { opacity: 0 }}
          transition={{ duration: 1 }}
        />
        <motion.div 
          className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full blur-3xl"
          style={{ background: "radial-gradient(circle at center, var(--secondary)30, transparent)" }}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 0.3 } : { opacity: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        />
      </div>
      
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <NewAnimatedHeading 
            text="CARTOGRAPHIE DU MONDE" 
            subtitle="Le monde de 2100 n'est plus qu'un assemblage chaotique de territoires façonnés par les vestiges d'une humanité disparue" 
            accent="primary"
            size="lg"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <motion.div 
            className="relative z-10"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="bg-glass backdrop-blur-sm p-4 lg:p-6 rounded-lg border border-white border-opacity-5 shadow-2xl relative">
              <InteractiveMap />
              
              {/* Decorative corner elements */}
              <div className="absolute top-0 left-0 w-6 h-6 border-t border-l border-primary opacity-50 -translate-x-1 -translate-y-1" />
              <div className="absolute top-0 right-0 w-6 h-6 border-t border-r border-primary opacity-50 translate-x-1 -translate-y-1" />
              <div className="absolute bottom-0 left-0 w-6 h-6 border-b border-l border-primary opacity-50 -translate-x-1 translate-y-1" />
              <div className="absolute bottom-0 right-0 w-6 h-6 border-b border-r border-primary opacity-50 translate-x-1 translate-y-1" />
            </div>
            
            <motion.div 
              className="mt-8 bg-glass backdrop-blur-sm p-6 rounded-lg border border-white border-opacity-5"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <h3 className="heading-section text-lg mb-4 text-primary">Légende</h3>
              <div className="grid grid-cols-2 gap-4">
                {TRIBES_DATA.map(tribe => (
                  <div key={tribe.id} className="flex items-center">
                    <span 
                      className="w-4 h-4 rounded-full mr-2"
                      style={{ backgroundColor: tribe.color }}
                    ></span>
                    <span className="body-text text-text-dim">{tribe.name}</span>
                  </div>
                ))}
                <div className="flex items-center">
                  <span className="w-4 h-4 rounded-full mr-2 bg-[#9C4DC4]"></span>
                  <span className="body-text text-text-dim">Zone d'Énergie</span>
                </div>
                <div className="flex items-center">
                  <span className="w-4 h-4 rounded-full mr-2 bg-[#39C9C9]"></span>
                  <span className="body-text text-text-dim">Zone Aquatique</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
          
          <motion.div 
            ref={contentRef}
            initial={{ opacity: 0, x: 40 }}
            animate={isContentInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 40 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <NewAnimatedHeading 
              text="TERRITOIRES ET RESSOURCES" 
              accent="secondary"
              size="md"
              align="left"
            />
            
            <div className="space-y-8 mt-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isContentInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <h3 className="heading-section text-lg mb-3 text-secondary">Un monde fracturé</h3>
                <p className="body-text text-text-dim mb-4">
                  Chaque région porte la marque d'une ressource qui a survécu au cataclysme, devenant à la fois une bénédiction et une malédiction pour ceux qui y vivent. D'immenses terres irradiées s'étendent à perte de vue, parcourues de structures déformées par le temps et la radioactivité.
                </p>
                <p className="body-text text-text-dim">
                  Ailleurs, des cités de métal et de câbles s'élèvent, vestiges d'une technologie qui refuse de s'éteindre. Des océans de plastique et de déchets engloutissent des territoires entiers, où tout ce qui existe est façonné par la lente désintégration du passé.
                </p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isContentInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <h3 className="heading-section text-lg mb-3 text-secondary">Frontières et Conflits</h3>
                <p className="body-text text-text-dim">
                  Les frontières entre les territoires sont souvent contestées, créant des zones tampons où les lois des tribus ne s'appliquent pas. Ces espaces deviennent des lieux de commerce, d'échange, mais aussi de tensions et parfois d'affrontements.
                </p>
              </motion.div>
              
              <motion.div 
                className="bg-glass backdrop-blur-sm p-6 rounded-lg border border-white border-opacity-5"
                initial={{ opacity: 0, y: 20 }}
                animate={isContentInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.7 }}
              >
                <blockquote className="body-text text-text-dim italic border-l-2 border-tertiary pl-4">
                  "Cet univers morcelé est un champ de bataille silencieux, où chaque territoire renferme ses propres règles, ses propres monstres et ses propres espoirs. Mais qui sait quels secrets dorment encore sous les décombres de l'ancien monde?"
                  <footer className="mt-2 text-tertiary">— Chroniques des Anciens</footer>
                </blockquote>
              </motion.div>
            </div>
          </motion.div>
        </div>
        
        <div className="mt-20" ref={regionsRef}>
          <NewAnimatedHeading 
            text="ZONES DE TERRITOIRE" 
            subtitle="Chaque région abrite une communauté distincte avec sa propre culture et ses traditions"
            accent="tertiary"
            size="md"
          />
          
          <motion.div 
            className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            initial={{ opacity: 0 }}
            animate={isRegionsInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {MAP_REGIONS.map((region, index) => (
              <motion.div
                key={region.id}
                className="bg-glass backdrop-blur-sm p-6 rounded-lg border border-white border-opacity-5 relative overflow-hidden"
                initial={{ opacity: 0, y: 30 }}
                animate={isRegionsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                {/* Decorative background shape */}
                <div 
                  className="absolute -right-12 -top-12 w-32 h-32 rounded-full opacity-10"
                  style={{ backgroundColor: region.color }}
                />
                
                <h3 
                  className="text-xl heading-section mb-3 relative z-10"
                  style={{ color: region.color }}
                >
                  {region.name}
                </h3>
                
                <p className="text-text-dim body-text relative z-10">
                  {region.description}
                </p>
                
                <div 
                  className="absolute bottom-0 left-0 h-1 opacity-40"
                  style={{ backgroundColor: region.color, width: '30%' }}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Map;
