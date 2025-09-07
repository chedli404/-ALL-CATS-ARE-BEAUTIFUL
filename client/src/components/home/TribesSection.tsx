import { useEffect, useRef, useState } from "react";
import { motion, useAnimation, AnimatePresence } from "framer-motion";
import { useInView } from "framer-motion";
import { Link } from "wouter";
import TribeBanner from "@/components/ui/TribeBanner";
import { TRIBES_DATA } from "@/lib/constants";

const TribesSection = () => {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const [activeTribe, setActiveTribe] = useState<number | null>(null);
  
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };
  
  const getTribeColor = (id: number) => {
    const tribe = TRIBES_DATA.find(t => t.id === id);
    if (tribe) {
      return tribe.color.replace('var(--', '').replace(')', '');
    }
    return 'nomade'; // Default fallback
  };

  return (
    <section 
      id="tribes" 
      className="py-24 px-4 bg-gradient-to-b from-black to-gray-900 relative overflow-hidden" 
      ref={ref}
    >
      {/* Background effects */}
      <div className="absolute inset-0 opacity-10 z-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('/attached_assets/MAP.png')] bg-no-repeat bg-cover opacity-5"></div>
        <div className="absolute top-[10%] left-[8%] w-40 h-40 rounded-full bg-nomades opacity-8 blur-3xl"></div>
        <div className="absolute top-[60%] right-[10%] w-60 h-60 rounded-full bg-anciens opacity-8 blur-3xl"></div>
        <div className="absolute top-[30%] right-[20%] w-32 h-32 rounded-full bg-technos opacity-8 blur-3xl"></div>
        <div className="absolute bottom-[20%] left-[30%] w-48 h-48 rounded-full bg-energy opacity-8 blur-3xl"></div>
      </div>

      <div className="container mx-auto max-w-7xl relative z-10">
        {/* Section header */}
        <motion.div 
          className="text-center mb-16"
          variants={headerVariants}
          initial="hidden"
          animate={controls}
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display text-white mb-4">Les Tribus</h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto font-body">Découvrez les six clans qui composent le nouveau monde</p>
          <div className="w-24 h-1 bg-gradient-to-r from-nomades to-technos mx-auto mt-6"></div>
        </motion.div>
        
        {/* Tribe cards grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          {TRIBES_DATA.map((tribe, index) => (
            <TribeBanner 
              key={tribe.id}
              name={tribe.name}
              description={tribe.description}
              color={tribe.color}
              strengths={tribe.strengths}
              icon={tribe.icon}
              index={index}
              onHover={() => setActiveTribe(tribe.id)}
              onLeave={() => setActiveTribe(null)}
            />
          ))}
        </motion.div>
        
        {/* Tribe comparison - Mobile view: cards */}
        <div className="md:hidden mt-12 space-y-6">
          <motion.h3 
            className="text-2xl font-display text-white text-center mb-8"
            variants={headerVariants}
            initial="hidden"
            animate={controls}
            transition={{ delay: 0.4 }}
          >
            Comparaison des Tribus
          </motion.h3>
          
          <motion.div
            className="space-y-4"
            variants={containerVariants}
            initial="hidden"
            animate={controls}
            transition={{ delay: 0.5 }}
          >
            {['Territoire', 'Philosophie', 'Technologies', 'Relation aux autres'].map((attribute, i) => (
              <motion.div 
                key={attribute}
                className="bg-black/30 backdrop-blur-md rounded-lg border border-gray-800 overflow-hidden shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={controls}
                transition={{ delay: 0.6 + (i * 0.1) }}
              >
                <div className="bg-gray-900 px-4 py-3">
                  <h4 className="font-display text-white">{attribute}</h4>
                </div>
                <div className="p-4 space-y-3">
                  {TRIBES_DATA.map(tribe => (
                    <div key={`${attribute}-${tribe.id}`} className="flex items-center">
                      <div 
                        className="w-3 h-3 rounded-full mr-2"
                        style={{ backgroundColor: tribe.color.includes('var') ? 
                          `var(--${getTribeColor(tribe.id)})` : tribe.color }}
                      ></div>
                      <span className="font-display text-sm text-white mr-2">{tribe.name}:</span>
                      <span className="text-sm text-gray-300">Valeur unique</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
        
        {/* Tribe comparison - Desktop view: table */}
        <motion.div 
          className="hidden md:block mt-16 overflow-x-auto">
          <motion.h3 
            className="text-3xl font-display text-white text-center mb-8"
            variants={headerVariants}
            initial="hidden"
            animate={controls}
            transition={{ delay: 0.4 }}
          >
            Tableau Comparatif des Tribus
          </motion.h3>
          
          <motion.div
            className="rounded-lg overflow-hidden shadow-xl border border-gray-800 bg-black/20 backdrop-blur-sm"
            initial={{ opacity: 0, y: 40 }}
            animate={controls}
            transition={{ opacity: { duration: 0.8 }, y: { duration: 0.5 }, delay: 0.5 }}
            whileHover={{ boxShadow: "0 0 30px rgba(0,0,0,0.5)" }}
          >
            <table className="min-w-full divide-y divide-gray-700">
              <thead>
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-display text-white uppercase tracking-wider bg-gray-900/80">
                    Attributs
                  </th>
                  {TRIBES_DATA.map(tribe => (
                    <th 
                      key={tribe.id} 
                      className="px-4 py-4 text-center text-sm font-display text-white uppercase tracking-wider transition-colors duration-300"
                      style={{ 
                        backgroundColor: activeTribe === tribe.id ? 
                          `var(--${getTribeColor(tribe.id)})` : 
                          `var(--${getTribeColor(tribe.id)}80)`
                      }}
                    >
                      {tribe.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-black/40 divide-y divide-gray-700">
                <tr className="group">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-display text-white bg-gray-900/50">
                    Territoire
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-200 text-center group-hover:bg-nomades/10 transition-colors duration-300">
                    Vastes étendues, routes migratoires
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-200 text-center group-hover:bg-anciens/10 transition-colors duration-300">
                    Sanctuaire naturel, montagnes isolées
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-200 text-center group-hover:bg-technos/10 transition-colors duration-300">
                    Anciennes métropoles, zones industrielles
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-200 text-center group-hover:bg-ecologiste/10 transition-colors duration-300">
                    Forêts denses, zones cultivées
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-200 text-center group-hover:bg-mystique/10 transition-colors duration-300">
                    Vallées brumeuses, lieux sacrés
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-200 text-center group-hover:bg-electrique/10 transition-colors duration-300">
                    Zones orageuses, anciennes centrales
                  </td>
                </tr>
                
                <tr className="group">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-display text-white bg-gray-900/50">
                    Philosophie
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-200 text-center group-hover:bg-nomades/10 transition-colors duration-300">
                    Liberté, échange, exploration
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-200 text-center group-hover:bg-anciens/10 transition-colors duration-300">
                    Tradition, préservation, sagesse
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-200 text-center group-hover:bg-technos/10 transition-colors duration-300">
                    Innovation, progrès, expérimentation
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-200 text-center group-hover:bg-ecologiste/10 transition-colors duration-300">
                    Harmonie, protection, équilibre
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-200 text-center group-hover:bg-mystique/10 transition-colors duration-300">
                    Spiritualité, vision, connexion
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-200 text-center group-hover:bg-electrique/10 transition-colors duration-300">
                    Puissance, vitesse, transformation
                  </td>
                </tr>
                
                <tr className="group">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-display text-white bg-gray-900/50">
                    Forces
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-200 text-center group-hover:bg-nomades/10 transition-colors duration-300">
                    {TRIBES_DATA[0].strengths.join(', ')}
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-200 text-center group-hover:bg-anciens/10 transition-colors duration-300">
                    {TRIBES_DATA[1].strengths.join(', ')}
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-200 text-center group-hover:bg-technos/10 transition-colors duration-300">
                    {TRIBES_DATA[2].strengths.join(', ')}
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-200 text-center group-hover:bg-ecologiste/10 transition-colors duration-300">
                    {TRIBES_DATA[3].strengths.join(', ')}
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-200 text-center group-hover:bg-mystique/10 transition-colors duration-300">
                    {TRIBES_DATA[4].strengths.join(', ')}
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-200 text-center group-hover:bg-electrique/10 transition-colors duration-300">
                    {TRIBES_DATA[5].strengths.join(', ')}
                  </td>
                </tr>
                
                <tr className="group">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-display text-white bg-gray-900/50">
                    Relation au passé
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-200 text-center group-hover:bg-nomades/10 transition-colors duration-300">
                    Observation et apprentissage
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-200 text-center group-hover:bg-anciens/10 transition-colors duration-300">
                    Conservation des connaissances
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-200 text-center group-hover:bg-technos/10 transition-colors duration-300">
                    Réutilisation des technologies
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-200 text-center group-hover:bg-ecologiste/10 transition-colors duration-300">
                    Correction des erreurs humaines
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-200 text-center group-hover:bg-mystique/10 transition-colors duration-300">
                    Communion avec les esprits
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-200 text-center group-hover:bg-electrique/10 transition-colors duration-300">
                    Amélioration des créations
                  </td>
                </tr>
              </tbody>
            </table>
          </motion.div>
        </motion.div>
        
        {/* Call to action */}
        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0 }}
          animate={controls}
          transition={{ opacity: { duration: 0.8 }, delay: 1 }}
        >
          <Link href="/tribes">
            <motion.button
              className="bg-white/5 hover:bg-white/10 text-white border border-white/20 px-8 py-3 rounded-md font-display"
              whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(255,255,255,0.1)" }}
              whileTap={{ scale: 0.98 }}
            >
              EXPLORER LES TRIBUS
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default TribesSection;
