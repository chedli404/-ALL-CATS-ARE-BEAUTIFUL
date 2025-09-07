import React from 'react';
import { motion } from 'framer-motion';

const Introduction: React.FC = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6 }
    }
  };

  return (
    <div className="introduction relative py-20 px-4 md:px-8 lg:px-16 bg-gradient-to-b from-gray-900 to-black overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          className="flex flex-col md:flex-row items-center justify-between gap-8 lg:gap-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {/* Text Content */}
          <motion.div className="w-full md:w-1/2 order-2 md:order-1" variants={itemVariants}>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display text-white mb-6">L'ère des humains est révolue</h2>
            <div className="text-gray-200 text-base md:text-lg space-y-4 leading-relaxed font-body">
              <p>
                L'ère des humains n'est plus qu'un souvenir effacé par le vent et la poussière. Leur monde, jadis grandiose et indomptable, s'est effondré sous le poids de ses propres excès, ne laissant derrière lui que des ruines hantées par l'écho de leur disparition.
              </p>
              <p>
                Désormais, une nouvelle espèce règne sur les vestiges de cette civilisation éteinte : les chats.
              </p>
              <p>
                Nés dans l'ombre de l'apocalypse, ils ont appris à dompter le chaos. Là où l'humanité voyait sa fin, eux ont trouvé un nouveau départ. Certains ont exploité les restes de l'ancienne technologie, d'autres ont embrassé les mutations et les forces mystérieuses qui ont émergé du cataclysme.
              </p>
              <p>
                Des cités se sont reformées, des tribus se sont levées, des pouvoirs se sont consolidés. Mais si le monde a changé de maîtres, il n'a pas pour autant changé de nature...
              </p>
            </div>
          </motion.div>
          
          {/* Image */}
          <motion.div 
            className="w-full md:w-1/2 order-1 md:order-2 mb-8 md:mb-0"
            variants={itemVariants}
          >
            <div className="relative rounded-lg overflow-hidden shadow-2xl border border-gray-800">
              <img 
                src="/attached_assets/9abila 3d.png"
                alt="Introduction Image"
                className="w-full h-auto object-cover" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent pointer-events-none"></div>
            </div>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-1/4 left-0 w-32 h-32 md:w-64 md:h-64 bg-nomades/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-0 w-32 h-32 md:w-64 md:h-64 bg-technos/10 rounded-full blur-3xl pointer-events-none"></div>
    </div>
  );
};

export default Introduction;