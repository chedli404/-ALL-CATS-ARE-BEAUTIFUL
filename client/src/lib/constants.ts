// Navigation links for main menu
export const NAV_LINKS = [
  { label: "Accueil", href: "/" },
  { label: "Tribus", href: "/tribes" },
  { label: "Personnages", href: "/characters" },
  { label: "Carte", href: "/map" },
  { label: "Légendes", href: "/legends" },
  { label: "Monde", href: "/world" },
  { label: "Login", href: "/login" },
  { label: "S'inscrire", href: "/register" }

];



// Tribes data
// Map regions with tribe territories
export const MAP_REGIONS = [
  {
    id: 1,
    name: "Forêt de l'Est",
    svgPath: "M120,150 L180,120 L220,180 L170,240 L120,210 Z",
    color: "var(--ecologiste)",
    tribeId: 4,
    description: "Une forêt dense qui abrite de nombreuses espèces végétales cultivées par les Écologistes."
  },
  {
    id: 2,
    name: "Montagnes du Nord",
    svgPath: "M250,80 L320,60 L370,120 L340,180 L280,170 L240,130 Z",
    color: "var(--ancien)",
    tribeId: 2,
    description: "Une chaîne de montagnes où les Anciens ont établi leur sanctuaire de connaissances."
  },
  {
    id: 3,
    name: "Ruines Urbaines",
    svgPath: "M350,200 L400,170 L460,210 L450,280 L380,290 L340,250 Z",
    color: "var(--techno)",
    tribeId: 3,
    description: "Les vestiges d'une ancienne métropole humaine, maintenant territoire des Technos."
  },
  {
    id: 4,
    name: "Plaines Centrales",
    svgPath: "M230,190 L290,180 L330,240 L290,300 L220,310 L180,250 Z",
    color: "var(--nomade)",
    tribeId: 1,
    description: "Vastes étendues ouvertes servant de routes migratoires pour les Nomades."
  },
  {
    id: 5,
    name: "Vallée des Brumes",
    svgPath: "M150,280 L210,330 L180,390 L110,370 L90,320 Z",
    color: "var(--mystique)",
    tribeId: 5,
    description: "Une région constamment enveloppée de brouillard où les Mystiques pratiquent leurs rituels."
  },
  {
    id: 6,
    name: "Terres Orageuses",
    svgPath: "M310,330 L380,310 L420,370 L380,430 L310,410 Z",
    color: "var(--electrique)",
    tribeId: 6,
    description: "Zone connue pour ses tempêtes électriques fréquentes, domaine des Électriques."
  }
];

// Game cards for the card game
export const GAME_CARDS = [
  {
    id: 1,
    name: "Patrouilleur Nomade",
    type: "Personnage",
    tribe: "Nomades",
    strength: 3,
    description: "Ajoute +1 à tous les autres personnages Nomades en jeu.",
    imageIcon: "📍"
  },
  {
    id: 2,
    name: "Sage des Anciens",
    type: "Personnage",
    tribe: "Anciens",
    strength: 4,
    description: "Permet de piocher une carte supplémentaire quand il entre en jeu.",
    imageIcon: "📜"
  },
  {
    id: 3,
    name: "Ingénieur Techno",
    type: "Personnage",
    tribe: "Technos",
    strength: 3,
    description: "Peut réparer un artefact détruit et le remettre en jeu.",
    imageIcon: "🔧"
  },
  {
    id: 4,
    name: "Guérisseur Écologiste",
    type: "Personnage",
    tribe: "Écologistes",
    strength: 2,
    description: "Restaure 2 points de vie à un personnage blessé.",
    imageIcon: "🌿"
  },
  {
    id: 5,
    name: "Oracle Mystique",
    type: "Personnage",
    tribe: "Mystiques",
    strength: 2,
    description: "Permet de regarder les 3 prochaines cartes de la pioche.",
    imageIcon: "🔮"
  },
  {
    id: 6,
    name: "Guerrier Électrique",
    type: "Personnage",
    tribe: "Électriques",
    strength: 5,
    description: "Inflige 2 points de dégâts à un personnage adverse.",
    imageIcon: "⚡"
  },
  {
    id: 7,
    name: "Artefact Humain",
    type: "Objet",
    strength: 0,
    description: "Donne +2 de force à un personnage, +3 si c'est un Techno.",
    imageIcon: "💻"
  },
  {
    id: 8,
    name: "Territoire Contesté",
    type: "Territoire",
    strength: 0,
    description: "Le joueur qui a le plus de personnages en jeu contrôle ce territoire (+3 points).",
    imageIcon: "🌄"
  },
  {
    id: 9,
    name: "Tempête Électrique",
    type: "Événement",
    strength: 0,
    description: "Tous les personnages non-Électriques perdent 1 point de force pour ce tour.",
    imageIcon: "🌩️"
  },
  {
    id: 10,
    name: "Alliance Tribale",
    type: "Action",
    strength: 0,
    description: "Choisissez deux tribus; leurs personnages reçoivent +1 de force tant qu'ils sont ensemble.",
    imageIcon: "🤝"
  }
];

// Timeline data
export const TIMELINE_DATA = [
  {
    period: "2050",
    title: "La Catastrophe",
    description: "L'humanité disparaît suite à une série de désastres environnementaux et technologiques.",
    image: "/attached_assets/world2.jpeg",
    color: "#C73E3A"
  },
  {
    period: "2060-2070",
    title: "L'Éveil Félin",
    description: "Les chats commencent à développer une intelligence supérieure et la capacité à communiquer entre eux.",
    image: "/attached_assets/world3.jpeg",
    color: "#1C6E5F"
  },
  {
    period: "2075",
    title: "Les Premières Colonies",
    description: "Formation des premières communautés félines organisées autour des ruines humaines.",
    image: "/attached_assets/world4.jpeg",
    color: "#9C4DC4"
  },
  {
    period: "2080-2090",
    title: "L'Ère des Tribus",
    description: "Émergence des six grandes tribus avec leurs spécificités culturelles et technologiques.",
    image: "/attached_assets/world5.jpeg",
    color: "#E3A947"
  },
  {
    period: "2095-2100",
    title: "L'Équilibre Actuel",
    description: "Établissement d'un équilibre fragile entre les tribus et développement d'un nouveau monde.",
    image: "/attached_assets/world6.jpeg",
    color: "#39C9C9"
  }
];

