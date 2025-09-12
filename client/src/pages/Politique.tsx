import { motion } from "framer-motion";
import { Crown, Scale, Users, Shield, Sword, Flag, Vote } from "lucide-react";

const Politique = () => {
  const governanceSystems = [
    {
      tribe: "Anciens",
      system: "Gérontocratie Éclairée",
      icon: <Crown className="w-8 h-8" />,
      color: "#f59e0b",
      description: "Gouvernance par les plus sages et expérimentés",
      structure: "Conseil des Anciens (7 membres)",
      decisions: "Consensus basé sur l'expérience et la tradition",
      strengths: ["Stabilité", "Sagesse collective", "Préservation des savoirs"],
      challenges: ["Résistance au changement", "Processus lents"]
    },
    {
      tribe: "Nomades",
      system: "Démocratie Itinérante",
      icon: <Vote className="w-8 h-8" />,
      color: "#22c55e",
      description: "Décisions collectives prises lors des assemblées mobiles",
      structure: "Assemblée générale rotative",
      decisions: "Vote majoritaire avec droit de véto des guides",
      strengths: ["Flexibilité", "Participation active", "Adaptation rapide"],
      challenges: ["Coordination difficile", "Instabilité temporaire"]
    },
    {
      tribe: "Technos",
      system: "Méritocratie Technique",
      icon: <Scale className="w-8 h-8" />,
      color: "#8b5cf6",
      description: "Leadership basé sur les compétences techniques",
      structure: "Conseil des Ingénieurs (5 spécialistes)",
      decisions: "Analyse data-driven et expertise technique",
      strengths: ["Efficacité", "Innovation", "Solutions pragmatiques"],
      challenges: ["Manque d'empathie", "Négligence des aspects humains"]
    }
  ];

  const alliances = [
    {
      name: "Pacte des Eaux Pures",
      members: ["Anciens", "Nomades"],
      type: "Alliance Ressource",
      color: "#06b6d4",
      description: "Partage et protection des sources d'eau non-contaminées",
      benefits: "Accès garanti aux oasis, protection mutuelle des points d'eau",
      duration: "Renouvelé tous les 3 ans"
    },
    {
      name: "Coalition Technologique",
      members: ["Technos", "Anciens"],
      type: "Alliance Savoir",
      color: "#8b5cf6",
      description: "Échange de connaissances techniques et historiques",
      benefits: "Recherche collaborative, préservation des technologies",
      duration: "Permanent avec clauses de révision"
    },
    {
      name: "Front de Défense Commune",
      members: ["Toutes les tribus"],
      type: "Alliance Militaire",
      color: "#ef4444",
      description: "Coopération face aux menaces extérieures majeures",
      benefits: "Réponse coordonnée aux crises, partage d'intelligence",
      duration: "Activé selon les besoins"
    }
  ];

  const conflicts = [
    {
      name: "Guerre des Fréquences",
      year: "2113",
      parties: ["Technos", "Nomades"],
      cause: "Contrôle des réseaux de communication",
      resolution: "Traité de partage des bandes radio",
      status: "Résolu"
    },
    {
      name: "Dispute des Territoires Nord",
      year: "2114",
      parties: ["Anciens", "Nomades"],
      cause: "Droits de passage et exploitation minière",
      resolution: "Médiation en cours",
      status: "En négociation"
    },
    {
      name: "Crise des Brevets",
      year: "2115",
      parties: ["Technos", "Anciens"],
      cause: "Propriété intellectuelle des innovations",
      resolution: "Système de licences partagées",
      status: "Résolu"
    }
  ];

  const laws = [
    {
      title: "Loi de Neutralité des Oasis",
      description: "Interdiction de militariser les sources d'eau pure",
      scope: "Inter-tribal",
      enforcement: "Conseil de Médiation"
    },
    {
      title: "Code de l'Hospitalité",
      description: "Obligation d'assistance aux voyageurs en détresse",
      scope: "Universel",
      enforcement: "Honneur tribal"
    },
    {
      title: "Protocole de Partage Technologique",
      description: "Règles d'échange et de protection des innovations",
      scope: "Technos-Anciens",
      enforcement: "Tribunal Technique"
    },
    {
      title: "Charte des Droits Mutants",
      description: "Protection contre la discrimination génétique",
      scope: "Universel",
      enforcement: "Conseil des Droits"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-900 via-gray-900 to-blue-900 pt-24">
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-6xl font-bold text-white mb-6 bg-gradient-to-r from-red-400 to-blue-400 bg-clip-text text-transparent">
            Politique & Gouvernance
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Dans un monde fragmenté, chaque tribu a développé son propre système de gouvernance. 
            Découvrez les structures politiques qui régissent la société post-apocalyptique.
          </p>
        </motion.div>

        {/* Governance Systems */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-8 text-center flex items-center justify-center">
            <Flag className="w-8 h-8 text-red-400 mr-3" />
            Systèmes de Gouvernance
          </h2>
          <div className="space-y-8">
            {governanceSystems.map((system, index) => (
              <motion.div
                key={system.tribe}
                initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.3 }}
                className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 border border-gray-700"
              >
                <div className="flex items-center mb-6">
                  <div 
                    className="p-4 rounded-lg mr-6"
                    style={{ backgroundColor: `${system.color}20`, color: system.color }}
                  >
                    {system.icon}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">{system.tribe}</h3>
                    <p className="text-xl" style={{ color: system.color }}>{system.system}</p>
                  </div>
                </div>
                
                <p className="text-gray-300 mb-6">{system.description}</p>
                
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-2">Structure:</h4>
                    <p className="text-gray-300">{system.structure}</p>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-2">Prise de décision:</h4>
                    <p className="text-gray-300">{system.decisions}</p>
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-lg font-semibold text-green-400 mb-2">Forces:</h4>
                    <ul className="space-y-1">
                      {system.strengths.map((strength, i) => (
                        <li key={i} className="text-gray-300 text-sm flex items-center">
                          <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                          {strength}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-red-400 mb-2">Défis:</h4>
                    <ul className="space-y-1">
                      {system.challenges.map((challenge, i) => (
                        <li key={i} className="text-gray-300 text-sm flex items-center">
                          <div className="w-2 h-2 bg-red-400 rounded-full mr-2"></div>
                          {challenge}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Alliances */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-white mb-8 text-center flex items-center justify-center">
            <Users className="w-8 h-8 text-blue-400 mr-3" />
            Alliances Stratégiques
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {alliances.map((alliance, index) => (
              <motion.div
                key={alliance.name}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 + index * 0.2 }}
                className="bg-gray-800/50 rounded-xl p-6 border border-gray-700"
                style={{ borderColor: `${alliance.color}40` }}
              >
                <h3 className="text-xl font-bold text-white mb-2">{alliance.name}</h3>
                <p className="text-sm mb-3" style={{ color: alliance.color }}>{alliance.type}</p>
                <p className="text-gray-300 mb-4 text-sm">{alliance.description}</p>
                
                <div className="space-y-3">
                  <div>
                    <p className="text-gray-400 text-xs mb-1">Membres:</p>
                    <p className="text-gray-300 text-sm">{alliance.members.join(", ")}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-xs mb-1">Avantages:</p>
                    <p className="text-gray-300 text-sm">{alliance.benefits}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-xs mb-1">Durée:</p>
                    <p className="text-gray-300 text-sm">{alliance.duration}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Conflicts & Laws */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Recent Conflicts */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.8 }}
            className="bg-gradient-to-br from-red-900/30 to-orange-900/30 rounded-xl p-6 border border-red-500/30"
          >
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
              <Sword className="w-6 h-6 text-red-400 mr-3" />
              Conflits Récents
            </h3>
            <div className="space-y-4">
              {conflicts.map((conflict, index) => (
                <div key={conflict.name} className="bg-gray-800/50 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="text-white font-semibold">{conflict.name}</h4>
                    <span className="text-xs text-gray-400">{conflict.year}</span>
                  </div>
                  <p className="text-gray-300 text-sm mb-2">{conflict.cause}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-400">{conflict.parties.join(" vs ")}</span>
                    <span 
                      className={`text-xs px-2 py-1 rounded ${
                        conflict.status === 'Résolu' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'
                      }`}
                    >
                      {conflict.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Legal Framework */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 2 }}
            className="bg-gradient-to-br from-blue-900/30 to-purple-900/30 rounded-xl p-6 border border-blue-500/30"
          >
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
              <Scale className="w-6 h-6 text-blue-400 mr-3" />
              Cadre Légal
            </h3>
            <div className="space-y-4">
              {laws.map((law, index) => (
                <div key={law.title} className="bg-gray-800/50 rounded-lg p-4">
                  <h4 className="text-white font-semibold mb-2">{law.title}</h4>
                  <p className="text-gray-300 text-sm mb-3">{law.description}</p>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-blue-400">Portée: {law.scope}</span>
                    <span className="text-purple-400">Application: {law.enforcement}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Politique;