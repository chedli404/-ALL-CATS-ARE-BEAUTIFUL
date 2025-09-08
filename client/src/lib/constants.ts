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

// Characters data
export const CHARACTERS_DATA = [
  {
    id: 1,
    name: "Milo",
    tribe: "Nomades",
    tribeColor: "var(--nomade)",
    description: "Milo est un explorateur intrépide, toujours à la recherche de nouveaux territoires. Ses longues randonnées lui ont permis de cartographier une grande partie du monde connu des chats. Il est respecté pour sa connaissance des chemins sûrs et des abris temporaires.",
    traits: ["Explorateur", "Cartographe", "Indépendant"],
    image: "/attached_assets/katous.png"
  },
  {
    id: 2,
    name: "Nala",
    tribe: "Anciens",
    tribeColor: "var(--ancien)",
    description: "Gardienne des traditions, Nala est la mémoire vivante de l'ère humaine. Elle connaît les récits que les premiers chats ont transmis sur la disparition des humains et guide les jeunes générations dans la compréhension de leur héritage.",
    traits: ["Sage", "Historienne", "Diplomate"],
    image: "/attached_assets/world1.jpeg"
  },
  {
    id: 3,
    name: "Pixel",
    tribe: "Technos",
    tribeColor: "var(--techno)",
    description: "Pixel a développé une fascination pour les objets laissés par les humains. À force d'observation et d'essais, il a compris comment réactiver certains appareils électroniques et devient progressivement un ingénieur respecté dans sa tribu.",
    traits: ["Inventif", "Curieux", "Persévérant"],
    image: "/attached_assets/world3.jpeg"
  },
  {
    id: 4,
    name: "Luna",
    tribe: "Écologistes",
    tribeColor: "var(--ecologiste)",
    description: "Luna a une connexion particulière avec les plantes. Elle peut identifier les herbes médicinales et comprendre les cycles de floraison. Son jardin est un refuge où elle cultive des plantes rares qui servent à guérir les maladies félines.",
    traits: ["Guérisseuse", "Patiente", "Intuitive"],
    image: "/attached_assets/ecologie.png"
  },
  {
    id: 5,
    name: "Orion",
    tribe: "Mystiques",
    tribeColor: "var(--mystique)",
    description: "Orion passe ses nuits à observer les étoiles. Il prétend communiquer avec des entités invisibles et utilise des rituels pour protéger sa tribu des dangers. Beaucoup de chats font appel à lui pour comprendre leurs rêves et présages.",
    traits: ["Visionnaire", "Méditatif", "Énigmatique"],
    image: "/attached_assets/world6.jpeg"
  },
  {
    id: 6,
    name: "Spark",
    tribe: "Électriques",
    tribeColor: "var(--electrique)",
    description: "Spark est habité par une énergie débordante qui lui permet d'accomplir des exploits physiques impressionnants. On raconte que lors d'un orage, il a été frappé par la foudre mais a survécu, ce qui lui aurait conféré des capacités spéciales.",
    traits: ["Rapide", "Imprévisible", "Charismatique"],
    image: "/attached_assets/world4.jpeg"
  }
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

export const TRIBES_DATA = [
  {
    id: 1,
    name: "Nomades",
    description: "Les chats Nomades ne s'attachent à aucun territoire. Ils parcourent le monde, commerçants et messagers entre les différentes colonies, transmettant nouvelles et objets rares.",
    color: "var(--nomade)",
    strengths: ["Adaptabilité", "Survie", "Communication"],
    icon: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71z"/></svg>`
  },
  {
    id: 2,
    name: "Anciens",
    description: "Gardiens de la mémoire du monde d'avant, ils préservent les connaissances sur les humains et transmettent oralement l'histoire de l'extinction humaine aux nouvelles générations.",
    color: "var(--ancien)",
    strengths: ["Sagesse", "Mémoire", "Diplomatie"],
    icon: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.31-8.86c-1.77-.45-2.34-.94-2.34-1.67 0-.84.79-1.43 2.1-1.43 1.38 0 1.9.66 1.94 1.64h1.71c-.05-1.34-.87-2.57-2.49-2.97V5H10.9v1.69c-1.51.32-2.72 1.3-2.72 2.81 0 1.79 1.49 2.69 3.66 3.21 1.95.46 2.34 1.15 2.34 1.87 0 .53-.39 1.39-2.1 1.39-1.6 0-2.23-.72-2.32-1.64H8.04c.1 1.7 1.36 2.66 2.86 2.97V19h2.34v-1.67c1.52-.29 2.72-1.16 2.73-2.77-.01-2.2-1.9-2.96-3.66-3.42z"/></svg>`
  },
  {
    id: 3,
    name: "Technos",
    description: "Fascinés par les technologies humaines, ils explorent les ruines urbaines pour récupérer et comprendre les objets électroniques. Certains ont même réussi à réactiver d'anciennes machines.",
    color: "var(--techno)",
    strengths: ["Innovation", "Ingéniosité", "Logique"],
    icon: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M22 9V7h-2V5c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-2h2v-2h-2v-2h2v-2h-2V9h2zm-4 10H4V5h14v14zM6 13h5v4H6zm6-6h4v3h-4zm0 4h4v6h-4zm-6-4h5v3H6z"/></svg>`
  },
  {
    id: 4,
    name: "Écologistes",
    description: "Ces chats ont développé une connexion unique avec la nature. Ils cultivent des jardins, étudient les plantes médicinales et maintiennent l'équilibre fragile du nouvel écosystème mondial.",
    color: "var(--ecologiste)",
    strengths: ["Guérison", "Agriculture", "Patience"],
    icon: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 22c4.97 0 9-4.03 9-9-4.97 0-9 4.03-9 9zM5.6 10.25c0 1.38 1.12 2.5 2.5 2.5.53 0 1.01-.16 1.42-.44l-.02.19c0 1.38 1.12 2.5 2.5 2.5s2.5-1.12 2.5-2.5l-.02-.19c.4.28.89.44 1.42.44 1.38 0 2.5-1.12 2.5-2.5 0-1-.59-1.85-1.43-2.25.84-.4 1.43-1.25 1.43-2.25 0-1.38-1.12-2.5-2.5-2.5-.53 0-1.01.16-1.42.44l.02-.19C14.5 2.12 13.38 1 12 1S9.5 2.12 9.5 3.5l.02.19c-.4-.28-.89-.44-1.42-.44-1.38 0-2.5 1.12-2.5 2.5 0 1 .59 1.85 1.43 2.25-.84.4-1.43 1.25-1.43 2.25zM12 5.5c1.38 0 2.5 1.12 2.5 2.5s-1.12 2.5-2.5 2.5S9.5 9.38 9.5 8s1.12-2.5 2.5-2.5zM3 13c0 4.97 4.03 9 9 9 0-4.97-4.03-9-9-9z"/></svg>`
  },
  {
    id: 5,
    name: "Mystiques",
    description: "Spirituels et intuitifs, ils pratiquent des rituels et développent des croyances sur l'invisible. Leurs chamans prétendent communiquer avec l'esprit des humains disparus et prévoir l'avenir.",
    color: "var(--mystique)",
    strengths: ["Intuition", "Rituel", "Vision"],
    icon: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm4.31 9.69L12 16l-4.31-4.31c-.39-.39-.39-1.02 0-1.41.39-.39 1.02-.39 1.41 0L12 13.17l2.89-2.89c.39-.39 1.02-.39 1.41 0 .39.39.39 1.02 0 1.41z"/></svg>`
  },
  {
    id: 6,
    name: "Électriques",
    description: "Dynamiques et imprévisibles, ces chats vivent dans des zones où l'électricité naturelle abonde. Ils ont développé une résistance aux décharges électriques et utilisent cette énergie à leur avantage.",
    color: "var(--electrique)",
    strengths: ["Rapidité", "Réflexes", "Énergie"],
    icon: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M7 2v11h3v9l7-12h-4l4-8z"/></svg>`
  }
];
