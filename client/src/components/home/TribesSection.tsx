import { useEffect, useRef } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "framer-motion";
import TribeBanner from "@/components/ui/TribeBanner";
import { TRIBES_DATA } from "@/lib/constants";

const TribesSection = () => {
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
    <section id="tribes" className="py-24" style={{ backgroundColor: 'rgb(39, 58, 70)' }}  ref={ref}>
      <div className="container mx-auto px-4">
        <motion.h2 
          className="font-display text-5xl mb-16 text-center"
          variants={fadeIn}
          initial="hidden"
          animate={controls}
        >
          LES TRIBUS
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TRIBES_DATA.map((tribe, index) => (
            <TribeBanner 
              key={tribe.id}
              name={tribe.name}
              description={tribe.description}
              color={tribe.color}
              strengths={tribe.strengths}
              icon={tribe.icon}
              delay={0.2 + (index * 0.2)}
            />
          ))}
        </div>
        
        {/* Tribe comparison table */}
        <motion.div 
          className="mt-24 overflow-x-auto rounded-lg shadow-lg"
          variants={fadeIn}
          initial="hidden"
          animate={controls}
          transition={{ delay: 0.8 }}
        >
          <table className="min-w-full bg-white divide-y divide-gray-200">
            <thead className="bg-gray-800">
              <tr>
                <th scope="col" className="px-6 py-4 text-left text-sm font-display text-white uppercase tracking-wider">Attributs</th>
                <th scope="col" className="px-6 py-4 text-center text-sm font-display text-white uppercase tracking-wider" style={{ backgroundColor: "#1C6E5F" }}>Nomades</th>
                <th scope="col" className="px-6 py-4 text-center text-sm font-display text-white uppercase tracking-wider" style={{ backgroundColor: "#E3A947" }}>Anciens</th>
                <th scope="col" className="px-6 py-4 text-center text-sm font-display text-white uppercase tracking-wider" style={{ backgroundColor: "#C73E3A" }}>Technos</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 bg-gray-100">Territoire</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 text-center">Aucun fixe</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 text-center">Zones vertes</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 text-center">Anciennes métropoles</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 bg-gray-100">Relation au passé</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 text-center">Observation</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 text-center">Préservation</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 text-center">Réutilisation</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 bg-gray-100">Compétences</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 text-center">Adaptation, survie</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 text-center">Sagesse, guérison</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 text-center">Ingénierie, énergie</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 bg-gray-100">Vision d'avenir</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 text-center">Exploration continue</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 text-center">Équilibre et tradition</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 text-center">Progrès technologique</td>
              </tr>
            </tbody>
          </table>
        </motion.div>
      </div>
    </section>
  );
};

export default TribesSection;
