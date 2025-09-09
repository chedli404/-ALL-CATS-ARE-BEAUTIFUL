import { motion } from "framer-motion";
import { Heart, Users, Brain, Dna, Shield, Zap } from "lucide-react";

const Humanite = () => {
  const mutations = [
    {
      name: "Vision Nocturne",
      icon: <Brain className="w-8 h-8" />,
      color: "#8b5cf6",
      prevalence: "23%",
      description: "Capacité à voir clairement dans l'obscurité totale",
      benefits: "Navigation nocturne, chasse, exploration de zones sombres"
    },
    {
      name: "Résistance Radiologique",
      icon: <Shield className="w-8 h-8" />,
      color: "#22c55e", 
      prevalence: "31%",
      description: "Immunité naturelle aux radiations de faible intensité",
      benefits: "Survie en zones contaminées, récupération de ressources"
    },
    {
      name: "Empathie Amplifiée",
      icon: <Heart className="w-8 h-8" />,
      color: "#ef4444",
      prevalence: "18%",
      description: "Perception accrue des émotions et intentions d'autrui",
      benefits: "Médiation, leadership, détection de menaces"
    },
    {
      name: "Métabolisme Adaptatif",
      icon: <Zap className="w-8 h-8" />,
      color: "#f59e0b",
      prevalence: "27%",
      description: "Capacité à survivre avec très peu de nourriture",
      benefits: "Endurance prolongée, exploration longue distance"
    }
  ];

  const socialStructures = [
    {
      title: "Conseils Tribaux",
      description: "Gouvernance collective basée sur l'expertise et l'expérience",
      members: "5-12 membres élus",
      role: "Décisions stratégiques et résolution de conflits majeurs"
    },
    {
      title: "Guildes Spécialisées", 
      description: "Organisations professionnelles regroupant les artisans et experts",
      members: "Variable selon la spécialité",
      role: "Formation, innovation et maintien des standards de qualité"
    },
    {
      title: "Cercles de Sagesse",
      description: "Groupes informels d'anciens et de sages conseillers",
      members: "3-8 membres cooptés",
      role: "Guidance spirituelle et préservation des traditions"
    }
  ];

  const values = [
    {
      name: "Solidarité",
      description: "L'entraide mutuelle est la clé de la survie collective",
      example: "Partage des ressources lors des pénuries"
    },
    {
      name: "Adaptabilité",
      description: "La capacité à s'adapter rapidement aux changements",
      example: "Adoption de nouvelles technologies ou méthodes"
    },
    {
      name: "Respect de la Diversité",
      description: "Valorisation des différences comme source de force",
      example: "Intégration des mutations comme atouts communautaires"
    },
    {
      name: "Mémoire Collective",
      description: "Préservation et transmission des savoirs ancestraux",
      example: "Récits oraux et archives des événements passés"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-gray-900 to-purple-900 pt-24">
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-6xl font-bold text-white mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            L'Humanité Transformée
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            L'apocalypse n'a pas seulement changé le monde, elle a transformé l'humanité elle-même. 
            Découvrez comment notre espèce s'est adaptée et a évolué dans ce nouveau paradigme.
          </p>
        </motion.div>

        {/* Mutations Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-8 text-center flex items-center justify-center">
            <Dna className="w-8 h-8 text-purple-400 mr-3" />
            Mutations Bénéfiques
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {mutations.map((mutation, index) => (
              <motion.div
                key={mutation.name}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.2 }}
                className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 hover:border-purple-500/50 transition-all duration-300"
              >
                <div className="flex items-center mb-4">
                  <div 
                    className="p-3 rounded-lg mr-4"
                    style={{ backgroundColor: `${mutation.color}20`, color: mutation.color }}
                  >
                    {mutation.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">{mutation.name}</h3>
                    <p className="text-gray-400">Prévalence: {mutation.prevalence}</p>
                  </div>
                </div>
                <p className="text-gray-300 mb-3">{mutation.description}</p>
                <div className="bg-gray-700/50 rounded-lg p-3">
                  <p className="text-sm text-gray-400 mb-1">Avantages:</p>
                  <p className="text-sm text-gray-300">{mutation.benefits}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Social Structures */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-white mb-8 text-center flex items-center justify-center">
            <Users className="w-8 h-8 text-blue-400 mr-3" />
            Structures Sociales
          </h2>
          <div className="space-y-6">
            {socialStructures.map((structure, index) => (
              <motion.div
                key={structure.title}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1 + index * 0.2 }}
                className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 rounded-xl p-6 border border-blue-500/30"
              >
                <h3 className="text-2xl font-bold text-white mb-3">{structure.title}</h3>
                <p className="text-gray-300 mb-4">{structure.description}</p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-blue-400 font-semibold">Composition:</p>
                    <p className="text-gray-300">{structure.members}</p>
                  </div>
                  <div>
                    <p className="text-purple-400 font-semibold">Rôle:</p>
                    <p className="text-gray-300">{structure.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Core Values */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Valeurs Fondamentales</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={value.name}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.6 + index * 0.1 }}
                className="bg-gray-800/50 rounded-lg p-6 border border-gray-700"
              >
                <h3 className="text-xl font-bold text-white mb-3">{value.name}</h3>
                <p className="text-gray-300 mb-3">{value.description}</p>
                <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg p-3">
                  <p className="text-sm text-gray-400 mb-1">Exemple concret:</p>
                  <p className="text-sm text-gray-300">{value.example}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Population Statistics */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8 }}
          className="bg-gradient-to-r from-gray-800/50 to-gray-700/50 rounded-xl p-8 border border-gray-600"
        >
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Démographie Actuelle</h2>
          <div className="grid md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-4xl font-bold text-blue-400 mb-2">~2.3M</div>
              <p className="text-gray-300">Population totale</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-purple-400 mb-2">67%</div>
              <p className="text-gray-300">Avec mutations</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-green-400 mb-2">89%</div>
              <p className="text-gray-300">Taux de survie</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-yellow-400 mb-2">156</div>
              <p className="text-gray-300">Communautés actives</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Humanite;