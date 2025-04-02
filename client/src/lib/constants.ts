// Tribe colors
export const TRIBE_COLORS = {
  NOMADES: "#1C6E5F",
  ANCIENS: "#E3A947",
  TECHNOS: "#C73E3A",
};

// Background colors
export const BACKGROUND_COLORS = {
  EARTH: "#BDB298",
  EARTH_DARK: "#8C7F6D",
  ENERGY: "#9C4DC4",
  WATER: "#39C9C9",
};

// Map regions data with info from the attached image
export const MAP_REGIONS = [
  {
    id: "energie",
    name: "Zone d'Énergie",
    description: "Vestiges de centrales électriques où l'énergie ancienne continue de circuler.",
    tribe: "Anciens",
    path: "M100,100 L300,100 L280,250 L150,270 Z",
    color: "#E3A947"
  },
  {
    id: "plastique",
    name: "Océan de Plastique",
    description: "Territoires engloutis par la lente désintégration des déchets du passé.",
    tribe: "Indépendant",
    path: "M300,100 L500,100 L520,200 L280,250 Z",
    color: "#9C4DC4"
  },
  {
    id: "eau",
    name: "Eaux Mutantes",
    description: "Zones aquatiques aux propriétés mystérieuses et dangereuses.",
    tribe: "Technos",
    path: "M500,100 L700,100 L650,300 L520,200 Z",
    color: "#39C9C9"
  },
  {
    id: "montagne",
    name: "Montagnes Hostiles",
    description: "Terres élevées et difficiles d'accès où se cachent des ressources rares.",
    tribe: "Nomades",
    path: "M650,300 L700,500 L500,450 L520,350 Z",
    color: "#333333"
  },
  {
    id: "vert",
    name: "Sanctuaire Vert",
    description: "Rare poche de verdure où la nature lutte pour reprendre ses droits.",
    tribe: "Nomades",
    path: "M520,350 L500,450 L300,400 L280,300 Z",
    color: "#1C6E5F"
  },
  {
    id: "volcans",
    name: "Terres Brûlantes",
    description: "Régions où le sol lui-même brûle, alimenté par des tempêtes toxiques.",
    tribe: "Technos",
    path: "M300,400 L500,450 L100,500 L150,350 Z",
    color: "#C73E3A"
  },
  {
    id: "centre",
    name: "La Confluence",
    description: "Point de rencontre des différentes tribus, zone neutre et de commerce.",
    tribe: "Zone neutre",
    path: "M150,270 L280,250 L280,300 L150,350 Z",
    color: "#BDB298"
  }
];

// Timeline data
export const TIMELINE_DATA = [
  {
    period: "2050 - 2070",
    title: "CHUTE DE L'HUMANITÉ",
    description: "Les humains disparaissent graduellement dans des circonstances mystérieuses, laissant derrière eux technologies et infrastructures. La nature commence à reprendre ses droits.",
    color: "#C73E3A",
    image: "/attached_assets/1.pdf-image-001.jpg"
  },
  {
    period: "2070 - 2085",
    title: "ÉVEIL FÉLIN",
    description: "Les chats développent une intelligence accrue et des capacités adaptatives. Ils commencent à explorer les ruines humaines, s'organisant en petits groupes pour survivre.",
    color: "#E3A947",
    image: "/attached_assets/1.pdf-image-001.jpg"
  },
  {
    period: "2085 - 2100",
    title: "FORMATION DES TRIBUS",
    description: "Les chats se divisent en tribus distinctes suivant différentes idéologies et approches face à l'héritage humain. Émergence des quatre principales factions qui façonnent le nouveau monde.",
    color: "#1C6E5F",
    image: "/attached_assets/1.pdf-image-002.jpg"
  }
];

// Tribe data
export const TRIBES_DATA = [
  {
    id: 1,
    name: "NOMADES",
    description: "Refusant l'ancrage et la sédentarité, les Nomades parcourent le monde, guidés par l'instinct et l'adaptabilité. Leur mode de vie repose sur le mouvement perpétuel, l'échange et l'autosuffisance.",
    color: "#1C6E5F",
    strengths: [
      "Explorateurs et cartographes",
      "Médiateurs entre tribus",
      "Adaptabilité exceptionnelle"
    ],
    icon: "/attached_assets/1.pdf-image-004.jpg"
  },
  {
    id: 2,
    name: "ANCIENS",
    description: "Gardiens de la sagesse et de l'équilibre, les Anciens préservent la mémoire du passé tout en construisant des communautés harmonieuses avec la nature environnante.",
    color: "#E3A947",
    strengths: [
      "Archivistes et conteurs",
      "Harmonisation avec la nature",
      "Sagesse et diplomatie"
    ],
    icon: "/attached_assets/1.pdf-image-004.jpg"
  },
  {
    id: 3,
    name: "TECHNOS",
    description: "Fascinés par les technologies des humains, les Technos cherchent à comprendre et maîtriser ces outils anciens. Ils construisent leur société sur les vestiges technologiques du passé.",
    color: "#C73E3A",
    strengths: [
      "Innovation et expérimentation",
      "Réutilisation des technologies",
      "Maîtrise de l'énergie ancienne"
    ],
    icon: "/attached_assets/1.pdf-image-004.jpg"
  }
];

// Character data
export const CHARACTERS_DATA = [
  {
    id: 1,
    name: "HRNY",
    tribe: "NOMADES",
    tribeColor: "#1C6E5F",
    description: "Hrny incarne l'élégance et l'oisiveté des hautes sphères. Bourgeoise jusqu'au bout des griffes, elle évolue dans un monde de luxe et de privilèges, où tout lui est acquis sans qu'elle n'ait à lever la patte.",
    traits: ["Élégante", "Manipulatrice", "Raffinée"],
    image: "/attached_assets/1.pdf-image-014.jpg"
  },
  {
    id: 2,
    name: "JBAL",
    tribe: "NOMADES",
    tribeColor: "#1C6E5F",
    description: "Jbal est une force de la nature, une silhouette imposante qui se dresse comme un rempart entre le chaos et ceux qui ne peuvent se défendre. Immense, puissant, mais silencieux, il incarne une présence rassurante pour les opprimés.",
    traits: ["Protecteur", "Puissant", "Gardien"],
    image: "/attached_assets/1.pdf-image-015.jpg"
  },
  {
    id: 3,
    name: "AHRA",
    tribe: "ANCIENS",
    tribeColor: "#E3A947",
    description: "Ahra est une énigme vivante, un paradoxe que peu osent approcher. On raconte que, depuis qu'elle a maîtrisé un pouvoir obscur venu des ténèbres, elle ne laisse derrière elle que destruction et silence.",
    traits: ["Mystérieuse", "Puissante", "Énigmatique"],
    image: "/attached_assets/1.pdf-image-016.jpg"
  }
];

// Game cards data
export const GAME_CARDS = [
  {
    id: 1,
    name: "JBAL",
    type: "character",
    tribe: "NOMADES",
    strength: 3,
    description: "Protecteur des faibles",
    color: "#1C6E5F",
    icon: "compass"
  },
  {
    id: 2,
    name: "CHYB",
    type: "character",
    tribe: "TECHNOS",
    strength: 4,
    description: "Sage des technologies",
    color: "#C73E3A",
    icon: "circle-dot"
  },
  {
    id: 3,
    name: "ADEL",
    type: "character",
    tribe: "ANCIENS",
    strength: 4,
    description: "Gardien de la sagesse",
    color: "#E3A947",
    icon: "layers"
  },
  {
    id: 4,
    name: "ARTEFACT",
    type: "item",
    strength: 2,
    description: "Générateur d'énergie",
    color: "#9C4DC4",
    icon: "zap"
  },
  {
    id: 5,
    name: "TERRITOIRE",
    type: "location",
    strength: 3,
    description: "Ruines Anciennes",
    color: "#333333",
    icon: "users"
  }
];

// Navigation links
export const NAV_LINKS = [
  { href: "/", label: "Accueil" },
  { href: "/world", label: "Le Monde" },
  { href: "/tribes", label: "Tribus" },
  { href: "/characters", label: "Personnages" },
  { href: "/map", label: "Carte" },
  { href: "/legends", label: "Légendes" },
  { href: "/artifacts", label: "Artefacts" },
  { href: "/game", label: "Jeu" }
];
