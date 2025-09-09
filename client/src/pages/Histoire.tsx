import { motion } from "framer-motion";
import { Clock, Flame, Shield, Skull, Crown, Sword } from "lucide-react";

const Histoire = () => {
  const timeline = [
    {
      year: "2087",
      title: "Le Grand Effondrement",
      icon: <Flame className="w-6 h-6" />,
      color: "#ef4444",
      description: "L'événement qui a tout changé. Les systèmes technologiques ont défailli simultanément à travers le monde.",
      details: "Une cascade de pannes en chaîne a paralysé les infrastructures mondiales. Les causes restent mystérieuses, certains parlent d'une IA rebelle, d'autres d'une tempête solaire."
    },
    {
      year: "2089",
      title: "Les Premières Tribus",
      icon: <Shield className="w-6 h-6" />,
      color: "#22c55e",
      description: "Formation des premiers groupes organisés de survivants autour de ressources vitales.",
      details: "Les survivants se regroupent par affinités et compétences. Les Anciens gardent les savoirs, les Nomades explorent, les Technos réparent."
    },
    {
      year: "2094",
      title: "La Grande Guerre des Ressources",
      icon: <Sword className="w-6 h-6" />,
      color: "#f59e0b",
      description: "Conflit majeur pour le contrôle des dernières réserves d'eau pure et de technologie fonctionnelle.",
      details: "Cinq années de guerre brutale qui ont redessiné les territoires. Les alliances se forment et se brisent au gré des découvertes."
    },
    {
      year: "2101",
      title: "L'Émergence des Légendes",
      icon: <Crown className="w-6 h-6" />,
      color: "#8b5cf6",
      description: "Apparition des premiers individus aux capacités extraordinaires, façonnant l'avenir des tribus.",
      details: "Des mutations bénéfiques créent des leaders charismatiques dotés de pouvoirs uniques. Ils deviennent les figures mythiques de leur époque."
    },
    {
      year: "2108",
      title: "Le Pacte de Kabila",
      icon: <Clock className="w-6 h-6" />,
      color: "#06b6d4",
      description: "Signature du traité fondateur établissant les règles de coexistence entre les tribus.",
      details: "Après des négociations tendues, les tribus acceptent de partager certaines ressources et de respecter des territoires neutres."
    },
    {
      year: "2115",
      title: "L'Ère Actuelle",
      icon: <Skull className="w-6 h-6" />,
      color: "#64748b",
      description: "Période de stabilité relative où les tribus ont trouvé leur équilibre dans ce nouveau monde.",
      details: "Aujourd'hui, chaque tribu a développé sa propre culture et ses spécialités, créant un écosystème complexe de relations."
    }
  ];

  const legends = [
    {
      name: "Zara la Voyante",
      tribe: "Anciens",
      achievement: "Prédit la Grande Tempête de 2103",
      description: "Ses visions ont sauvé des milliers de vies"
    },
    {
      name: "Kael le Marcheur",
      tribe: "Nomades", 
      achievement: "Découverte des Oasis du Sud",
      description: "Premier à cartographier les terres inexplorées"
    },
    {
      name: "Nova l'Ingénieuse",
      tribe: "Technos",
      achievement: "Invention du Purificateur d'Air Portable",
      description: "Révolutionna la survie en zone contaminée"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-900 via-gray-900 to-red-900 pt-24">
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-6xl font-bold text-white mb-6 bg-gradient-to-r from-amber-400 to-red-400 bg-clip-text text-transparent">
            Histoire de Kabila
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            De l'effondrement de l'ancien monde à l'émergence des tribus, découvrez les événements 
            qui ont façonné notre civilisation post-apocalyptique.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Chronologie des Événements</h2>
          <div className="space-y-8">
            {timeline.map((event, index) => (
              <motion.div
                key={event.year}
                initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.2 }}
                className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'} gap-8`}
              >
                <div className="flex-1">
                  <div className={`bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 ${index % 2 === 0 ? 'text-right' : 'text-left'}`}>
                    <div className="flex items-center gap-3 mb-3" style={{ justifyContent: index % 2 === 0 ? 'flex-end' : 'flex-start' }}>
                      <div 
                        className="p-2 rounded-lg"
                        style={{ backgroundColor: `${event.color}20`, color: event.color }}
                      >
                        {event.icon}
                      </div>
                      <h3 className="text-2xl font-bold text-white">{event.title}</h3>
                    </div>
                    <p className="text-gray-300 mb-2">{event.description}</p>
                    <p className="text-gray-400 text-sm">{event.details}</p>
                  </div>
                </div>
                <div className="flex-shrink-0">
                  <div 
                    className="w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-sm border-4"
                    style={{ backgroundColor: event.color, borderColor: `${event.color}40` }}
                  >
                    {event.year}
                  </div>
                </div>
                <div className="flex-1"></div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Legendary Figures */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="bg-gradient-to-r from-purple-900/30 to-amber-900/30 rounded-xl p-8 border border-purple-500/30"
        >
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Figures Légendaires</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {legends.map((legend, index) => (
              <motion.div
                key={legend.name}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4 + index * 0.2 }}
                className="bg-gray-800/50 rounded-lg p-6 text-center border border-gray-700 hover:border-purple-500/50 transition-all duration-300"
              >
                <h3 className="text-xl font-bold text-white mb-2">{legend.name}</h3>
                <p className="text-purple-400 mb-3">{legend.tribe}</p>
                <p className="text-amber-400 font-semibold mb-2">{legend.achievement}</p>
                <p className="text-gray-300 text-sm">{legend.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Historical Impact */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6 }}
          className="mt-16 text-center"
        >
          <h2 className="text-3xl font-bold text-white mb-6">L'Héritage du Passé</h2>
          <p className="text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Chaque événement de notre histoire a laissé une marque indélébile sur notre société. 
            Les leçons du passé guident nos décisions présentes et façonnent notre vision de l'avenir. 
            Dans ce monde transformé, nous portons à la fois les cicatrices et la sagesse de nos ancêtres.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Histoire;