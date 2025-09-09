import { motion } from "framer-motion";
import { Leaf, TreePine, Droplets, Wind, Sun, Zap } from "lucide-react";

const Ecologie = () => {
  const ecosystems = [
    {
      name: "Forêts Mutantes",
      icon: <TreePine className="w-8 h-8" />,
      color: "#22c55e",
      description: "Des arbres aux propriétés bioluminescentes qui filtrent les radiations",
      details: "Ces forêts mystérieuses ont évolué pour absorber et neutraliser les radiations post-apocalyptiques. Leurs racines forment un réseau de communication complexe."
    },
    {
      name: "Oasis Purifiées",
      icon: <Droplets className="w-8 h-8" />,
      color: "#06b6d4",
      description: "Sources d'eau pure protégées par des barrières naturelles",
      details: "Rares sanctuaires où l'eau reste cristalline grâce à des micro-organismes symbiotiques qui décomposent les toxines."
    },
    {
      name: "Zones de Vent",
      icon: <Wind className="w-8 h-8" />,
      color: "#8b5cf6",
      description: "Corridors atmosphériques où l'air reste respirable",
      details: "Courants d'air perpétuels créés par des formations géologiques uniques, dispersant les particules toxiques."
    },
    {
      name: "Jardins Solaires",
      icon: <Sun className="w-8 h-8" />,
      color: "#f59e0b",
      description: "Cultures adaptées aux nouvelles conditions climatiques",
      details: "Plantes génétiquement adaptées qui prospèrent sous le soleil filtré, produisant des nutriments essentiels."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 via-gray-900 to-blue-900 pt-24">
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-6xl font-bold text-white mb-6 bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
            Écologie Post-Apocalyptique
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Dans ce monde transformé, la nature a trouvé des moyens extraordinaires de survivre et de prospérer. 
            Découvrez les écosystèmes uniques qui ont émergé des cendres de l'ancien monde.
          </p>
        </motion.div>

        {/* Ecosystems Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {ecosystems.map((ecosystem, index) => (
            <motion.div
              key={ecosystem.name}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.2 }}
              className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 border border-gray-700 hover:border-green-500/50 transition-all duration-300"
            >
              <div className="flex items-center mb-4">
                <div 
                  className="p-3 rounded-lg mr-4"
                  style={{ backgroundColor: `${ecosystem.color}20`, color: ecosystem.color }}
                >
                  {ecosystem.icon}
                </div>
                <h3 className="text-2xl font-bold text-white">{ecosystem.name}</h3>
              </div>
              <p className="text-gray-300 mb-4">{ecosystem.description}</p>
              <p className="text-gray-400 text-sm leading-relaxed">{ecosystem.details}</p>
            </motion.div>
          ))}
        </div>

        {/* Environmental Challenges */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-gradient-to-r from-red-900/30 to-orange-900/30 rounded-xl p-8 mb-16 border border-red-500/30"
        >
          <h2 className="text-3xl font-bold text-white mb-6 flex items-center">
            <Zap className="w-8 h-8 text-red-400 mr-3" />
            Défis Environnementaux
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-red-400 mb-2">73%</div>
              <p className="text-gray-300">Zones contaminées</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-orange-400 mb-2">12°C</div>
              <p className="text-gray-300">Augmentation moyenne</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-yellow-400 mb-2">27%</div>
              <p className="text-gray-300">Espèces adaptées</p>
            </div>
          </div>
        </motion.div>

        {/* Restoration Efforts */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="bg-gradient-to-r from-green-900/30 to-blue-900/30 rounded-xl p-8 border border-green-500/30"
        >
          <h2 className="text-3xl font-bold text-white mb-6 flex items-center">
            <Leaf className="w-8 h-8 text-green-400 mr-3" />
            Efforts de Restauration
          </h2>
          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">Projet Symbiose</h3>
                <p className="text-gray-300">Création de partenariats entre espèces mutantes pour accélérer la décontamination naturelle des sols.</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">Réseaux Mycorhiziens</h3>
                <p className="text-gray-300">Utilisation de champignons modifiés pour créer des réseaux de communication et de partage de ressources entre plantes.</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">Sanctuaires Climatiques</h3>
                <p className="text-gray-300">Établissement de zones protégées où les conditions pré-apocalyptiques sont maintenues artificiellement.</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Ecologie;