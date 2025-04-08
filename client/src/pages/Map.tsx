import { motion } from "framer-motion";
import InteractiveMap from "@/components/ui/InteractiveMap";
import { TRIBES_DATA } from "@/lib/constants";

const Map = () => {
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
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1 
            className="font-display text-5xl mb-6 text-center"
            variants={itemVariants}
          >
            CARTOGRAPHIE DU MONDE
          </motion.h1>
          <motion.p 
            className="text-gray-700 max-w-3xl mx-auto text-center mb-16"
            variants={itemVariants}
          >
            Le monde de 2100 n'est plus qu'un assemblage chaotique de territoires façonnés par les vestiges d'une humanité disparue et la domination des nouveaux maîtres.
          </motion.p>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <motion.div variants={itemVariants}>
              <InteractiveMap />
              
              <div className="mt-8 bg-earth-dark/10 p-6 rounded-lg">
                <h3 className="font-display text-xl mb-3">Légende</h3>
                <div className="grid grid-cols-2 gap-4">
                  {TRIBES_DATA.map(tribe => (
                    <div key={tribe.id} className="flex items-center">
                      <span 
                        className="w-4 h-4 rounded-full mr-2"
                        style={{ backgroundColor: tribe.color }}
                      ></span>
                      <span>{tribe.name}</span>
                    </div>
                  ))}
                  <div className="flex items-center">
                    <span className="w-4 h-4 rounded-full mr-2 bg-[#9C4DC4]"></span>
                    <span>Zone d'Énergie</span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-4 h-4 rounded-full mr-2 bg-[#39C9C9]"></span>
                    <span>Zone Aquatique</span>
                  </div>
                </div>
              </div>
            </motion.div>
            
            <motion.div variants={itemVariants}>
              <h2 className="font-display text-3xl mb-6">TERRITOIRES ET RESSOURCES</h2>
              
              <div className="space-y-8">
                <div>
                  <h3 className="font-display text-xl mb-3">Un monde fracturé</h3>
                  <p className="text-gray-700 mb-4">
                    Chaque région porte la marque d'une ressource qui a survécu au cataclysme, devenant à la fois une bénédiction et une malédiction pour ceux qui y vivent. D'immenses terres irradiées s'étendent à perte de vue, parcourues de structures déformées par le temps et la radioactivité.
                  </p>
                  <p className="text-gray-700">
                    Ailleurs, des cités de métal et de câbles s'élèvent, vestiges d'une technologie qui refuse de s'éteindre. Des océans de plastique et de déchets engloutissent des territoires entiers, où tout ce qui existe est façonné par la lente désintégration du passé.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-display text-xl mb-3">Frontières et Conflits</h3>
                  <p className="text-gray-700">
                    Les frontières entre les territoires sont souvent contestées, créant des zones tampons où les lois des tribus ne s'appliquent pas. Ces espaces deviennent des lieux de commerce, d'échange, mais aussi de tensions et parfois d'affrontements.
                  </p>
                </div>
                
                <div className="bg-earth-dark/20 p-6 rounded-lg">
                  <blockquote className="text-gray-700 italic border-l-4 border-gray-500 pl-4">
                    "Cet univers morcelé est un champ de bataille silencieux, où chaque territoire renferme ses propres règles, ses propres monstres et ses propres espoirs. Mais qui sait quels secrets dorment encore sous les décombres de l'ancien monde?"
                    <footer className="mt-2 text-gray-600">— Chroniques des Anciens</footer>
                  </blockquote>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Map;
