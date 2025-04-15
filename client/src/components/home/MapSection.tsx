import { useEffect, useRef } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "framer-motion";
import InteractiveMap from "@/components/ui/InteractiveMap";

const MapSection = () => {
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
    <section id="map" className="py-24 "style={{ backgroundColor: 'rgb(30, 30, 30)' }} ref={ref}>
      <div className="container mx-auto px-4">
        <motion.h2 
          className="font-display text-5xl mb-6 text-center text-[#64afd6]"
          variants={fadeIn}
          initial="hidden"
          animate={controls}
        >
          CARTOGRAPHIE
        </motion.h2>
        <motion.p 
          className="text-white max-w-3xl mx-auto text-center mb-16"
          variants={fadeIn}
          initial="hidden"
          animate={controls}
          transition={{ delay: 0.2 }}
        >
          Le monde de 2100 n'est plus qu'un assemblage chaotique de territoires façonnés par les vestiges d'une humanité disparue et la domination des nouveaux maîtres.
        </motion.p>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            variants={fadeIn}
            initial="hidden"
            animate={controls}
            transition={{ delay: 0.3 }}
          >
            <InteractiveMap />
          </motion.div>
          
          <motion.div
            variants={fadeIn}
            initial="hidden"
            animate={controls}
            transition={{ delay: 0.4 }}
          >
            <h3 className="font-display text-3xl mb-6">TERRITOIRES ET RESSOURCES</h3>
            
            <p className="text-white mb-6">
              Chaque région porte la marque d'une ressource qui a survécu au cataclysme, devenant à la fois une bénédiction et une malédiction pour ceux qui y vivent. D'immenses terres irradiées s'étendent à perte de vue, parcourues de structures déformées par le temps et la radioactivité.
            </p>
            
            <ul className="space-y-4 mb-8">
              <li className="flex items-start">
                <span className="inline-block w-4 h-4 rounded-full bg-[#9C4DC4] mt-1 mr-3"></span>
                <div>
                  <span className="font-display text-lg">Zone d'Énergie</span>
                  <p className="text-white text-sm">Vestiges de centrales électriques et installations énergétiques où l'énergie ancienne continue de circuler.</p>
                </div>
              </li>
              
              <li className="flex items-start">
                <span className="inline-block w-4 h-4 rounded-full bg-[#1C6E5F] mt-1 mr-3"></span>
                <div>
                  <span className="font-display text-lg">Sanctuaires Verts</span>
                  <p className="text-white text-sm">Rares poches de végétation où la nature a repris ses droits, offrant refuge et ressources.</p>
                </div>
              </li>
              
              <li className="flex items-start">
                <span className="inline-block w-4 h-4 rounded-full bg-[#39C9C9] mt-1 mr-3"></span>
                <div>
                  <span className="font-display text-lg">Océans Transformés</span>
                  <p className="text-white text-sm">Étendues d'eau mutante aux propriétés mystérieuses, aussi dangereuses que prometteuses.</p>
                </div>
              </li>
              
              <li className="flex items-start">
                <span className="inline-block w-4 h-4 rounded-full bg-[#C73E3A] mt-1 mr-3"></span>
                <div>
                  <span className="font-display text-lg">Terres Brûlantes</span>
                  <p className="text-white text-sm">Régions où le sol lui-même brûle, alimenté par des tempêtes de suie et d'hydrocarbures.</p>
                </div>
              </li>
            </ul>
            
            <div className="bg-earth-dark/20 p-4 rounded-lg">
              <p className="text-gray-400 italic text-sm">
                "Cet univers morcelé est un champ de bataille silencieux, où chaque territoire renferme ses propres règles, ses propres monstres et ses propres espoirs."
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default MapSection;
