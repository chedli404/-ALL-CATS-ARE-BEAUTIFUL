import { motion } from "framer-motion";
import { Coins, TrendingUp, Package, Zap, Droplets, Wrench, Gem } from "lucide-react";

const Economie = () => {
  const currencies = [
    {
      name: "Éclats d'Énergie",
      symbol: "⚡",
      icon: <Zap className="w-6 h-6" />,
      color: "#f59e0b",
      value: "Monnaie principale",
      description: "Cristaux énergétiques récupérés des anciennes technologies",
      usage: "Échanges inter-tribaux, technologies avancées"
    },
    {
      name: "Gouttes Pures",
      symbol: "💧",
      icon: <Droplets className="w-6 h-6" />,
      color: "#06b6d4",
      value: "Très haute valeur",
      description: "Eau purifiée et certifiée non-contaminée",
      usage: "Médecine, agriculture, consommation de luxe"
    },
    {
      name: "Pièces de Ferraille",
      symbol: "🔧",
      icon: <Wrench className="w-6 h-6" />,
      color: "#64748b",
      value: "Monnaie courante",
      description: "Métaux récupérés et traités des ruines urbaines",
      usage: "Échanges quotidiens, réparations, construction"
    }
  ];

  const resources = [
    {
      name: "Composants Technologiques",
      rarity: "Rare",
      color: "#8b5cf6",
      sources: ["Ruines urbaines", "Laboratoires abandonnés", "Satellites crashés"],
      uses: ["Réparation d'équipements", "Création de nouveaux outils", "Échange de haute valeur"]
    },
    {
      name: "Matières Organiques Pures",
      rarity: "Très Rare",
      color: "#22c55e",
      sources: ["Zones non-contaminées", "Jardins hydroponiques", "Élevages protégés"],
      uses: ["Alimentation", "Médecine naturelle", "Semences"]
    },
    {
      name: "Combustibles Alternatifs",
      rarity: "Commun",
      color: "#ef4444",
      sources: ["Biomasse fermentée", "Panneaux solaires", "Éoliennes artisanales"],
      uses: ["Transport", "Chauffage", "Alimentation électrique"]
    },
    {
      name: "Matériaux de Construction",
      rarity: "Commun",
      color: "#f97316",
      sources: ["Démolition contrôlée", "Carrières", "Recyclage"],
      uses: ["Habitat", "Fortifications", "Infrastructure"]
    }
  ];

  const tradeRoutes = [
    {
      name: "Route du Nord",
      tribes: ["Anciens", "Technos"],
      goods: "Savoirs anciens ↔ Technologies réparées",
      danger: "Faible",
      frequency: "Hebdomadaire"
    },
    {
      name: "Corridor Central",
      tribes: ["Nomades", "Toutes tribus"],
      goods: "Informations géographiques ↔ Ressources diverses",
      danger: "Modéré",
      frequency: "Quotidienne"
    },
    {
      name: "Passage de l'Est",
      tribes: ["Technos", "Nomades"],
      goods: "Équipements ↔ Matières premières",
      danger: "Élevé",
      frequency: "Mensuelle"
    }
  ];

  const marketData = [
    { resource: "Éclats d'Énergie", trend: "+12%", price: "1.2k Ferraille", status: "hausse" },
    { resource: "Eau Pure", trend: "-3%", price: "800 Ferraille", status: "baisse" },
    { resource: "Composants Tech", trend: "+25%", price: "2.1k Ferraille", status: "hausse" },
    { resource: "Nourriture Bio", trend: "+8%", price: "450 Ferraille", status: "hausse" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-900 via-gray-900 to-yellow-900 pt-24">
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-6xl font-bold text-white mb-6 bg-gradient-to-r from-emerald-400 to-yellow-400 bg-clip-text text-transparent">
            Économie Post-Apocalyptique
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Dans un monde où les anciennes monnaies n'ont plus de valeur, de nouveaux systèmes économiques 
            ont émergé, basés sur la rareté, l'utilité et la survie.
          </p>
        </motion.div>

        {/* Currency System */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-8 text-center flex items-center justify-center">
            <Coins className="w-8 h-8 text-yellow-400 mr-3" />
            Système Monétaire
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {currencies.map((currency, index) => (
              <motion.div
                key={currency.name}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 hover:border-yellow-500/50 transition-all duration-300"
              >
                <div className="flex items-center mb-4">
                  <div 
                    className="p-3 rounded-lg mr-4 text-4xl"
                    style={{ backgroundColor: `${currency.color}20`, color: currency.color }}
                  >
                    {currency.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">{currency.name}</h3>
                    <p className="text-gray-400">{currency.value}</p>
                  </div>
                </div>
                <p className="text-gray-300 mb-3">{currency.description}</p>
                <div className="bg-gray-700/50 rounded-lg p-3">
                  <p className="text-sm text-gray-400 mb-1">Utilisation:</p>
                  <p className="text-sm text-gray-300">{currency.usage}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Resources */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-white mb-8 text-center flex items-center justify-center">
            <Package className="w-8 h-8 text-emerald-400 mr-3" />
            Ressources Stratégiques
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {resources.map((resource, index) => (
              <motion.div
                key={resource.name}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8 + index * 0.1 }}
                className="bg-gray-800/50 rounded-xl p-6 border border-gray-700"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-white">{resource.name}</h3>
                  <span 
                    className="px-3 py-1 rounded-full text-sm font-semibold"
                    style={{ backgroundColor: `${resource.color}20`, color: resource.color }}
                  >
                    {resource.rarity}
                  </span>
                </div>
                <div className="space-y-3">
                  <div>
                    <p className="text-gray-400 text-sm mb-1">Sources:</p>
                    <div className="flex flex-wrap gap-2">
                      {resource.sources.map((source, i) => (
                        <span key={i} className="bg-gray-700 px-2 py-1 rounded text-xs text-gray-300">
                          {source}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm mb-1">Utilisations:</p>
                    <div className="flex flex-wrap gap-2">
                      {resource.uses.map((use, i) => (
                        <span key={i} className="bg-gray-700 px-2 py-1 rounded text-xs text-gray-300">
                          {use}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Trade Routes */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Routes Commerciales</h2>
          <div className="space-y-4">
            {tradeRoutes.map((route, index) => (
              <motion.div
                key={route.name}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.4 + index * 0.2 }}
                className="bg-gradient-to-r from-emerald-900/30 to-yellow-900/30 rounded-xl p-6 border border-emerald-500/30"
              >
                <div className="grid md:grid-cols-4 gap-4">
                  <div>
                    <h3 className="text-lg font-bold text-white mb-2">{route.name}</h3>
                    <p className="text-gray-400 text-sm">Tribus: {route.tribes.join(", ")}</p>
                  </div>
                  <div>
                    <p className="text-emerald-400 font-semibold mb-1">Échanges:</p>
                    <p className="text-gray-300 text-sm">{route.goods}</p>
                  </div>
                  <div>
                    <p className="text-yellow-400 font-semibold mb-1">Danger:</p>
                    <p className="text-gray-300 text-sm">{route.danger}</p>
                  </div>
                  <div>
                    <p className="text-blue-400 font-semibold mb-1">Fréquence:</p>
                    <p className="text-gray-300 text-sm">{route.frequency}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Market Trends */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8 }}
          className="bg-gray-800/50 rounded-xl p-8 border border-gray-700"
        >
          <h2 className="text-3xl font-bold text-white mb-8 text-center flex items-center justify-center">
            <TrendingUp className="w-8 h-8 text-green-400 mr-3" />
            Tendances du Marché
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {marketData.map((item, index) => (
              <motion.div
                key={item.resource}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2 + index * 0.1 }}
                className="bg-gray-700/50 rounded-lg p-4 text-center"
              >
                <h4 className="text-white font-semibold mb-2">{item.resource}</h4>
                <p className="text-2xl font-bold mb-1" style={{ color: item.status === 'hausse' ? '#22c55e' : '#ef4444' }}>
                  {item.trend}
                </p>
                <p className="text-gray-400 text-sm">{item.price}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Economie;