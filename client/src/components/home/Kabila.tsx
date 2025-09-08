import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const Kabila = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <section id="kabila" className="py-24 bg-gradient-to-b from-gray-900 to-gray-900" ref={ref}>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="text-center mb-16"
          variants={fadeIn}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">KABILA</h1>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto mb-8">
            Un média innovant utilisant l'art digital pour sensibiliser et mobiliser
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          <motion.div 
            className="relative mb-12"
            variants={fadeIn}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            transition={{ delay: 0.2 }}
          >
            <img
              src="/attached_assets/IMG_0292.png"
              alt="Kabila"
              className="w-full max-w-2xl mx-auto rounded-2xl shadow-2xl border border-gray-800"
            />
            <div className="absolute -inset-4 bg-gradient-to-r from-[#64afd6]/20 to-[#1C6E5F]/20 rounded-2xl blur-xl -z-10"></div>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 gap-8 text-center md:text-left"
            variants={fadeIn}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            transition={{ delay: 0.4 }}
          >
            <div className="bg-gray-800 bg-opacity-50 p-6 rounded-lg border border-gray-700">
              <h3 className="text-xl font-semibold mb-3 text-[#E3A947]">Notre Mission</h3>
              <p className="text-gray-300 leading-relaxed">
                Kabila se distingue comme un média innovant, utilisant l'art digital pour sensibiliser et mobiliser autour des enjeux cruciaux de notre époque. Nous croyons fermement que l'information et la créativité peuvent transformer la société.
              </p>
            </div>
            
            <div className="bg-gray-800 bg-opacity-50 p-6 rounded-lg border border-gray-700">
              <h3 className="text-xl font-semibold mb-3 text-[#1C6E5F]">Notre Vision</h3>
              <p className="text-gray-300 leading-relaxed">
                En mettant en avant des sujets souvent négligés, nous cherchons à créer une communauté engagée et à inciter à l'action pour un monde plus juste et durable. Rejoignez cette aventure avec nous.
              </p>
            </div>
          </motion.div>
          
          <motion.div 
            className="text-center mt-12"
            variants={fadeIn}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            transition={{ delay: 0.6 }}
          >
            <motion.button 
              className="px-4 py-2 rounded-full font-display transition-colors bg-white text-gray-900 hover:bg-white/80"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              Nous Contacter
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Kabila;