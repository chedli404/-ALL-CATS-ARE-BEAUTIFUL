import mongoose from 'mongoose';
import { 
  User, Character, Tribe, Territory, GameCard, Poll, VoteOption, Vote,
  InsertUser, InsertCharacter, InsertTribe, InsertTerritory, 
  InsertGameCard, InsertPoll, InsertVoteOption, InsertVote,
  UserType, CharacterType, TribeType, TerritoryType, GameCardType,
  PollType, VoteOptionType, VoteType
} from '../shared/mongoSchema';

// MongoDB connection
const connectMongoDB = async (connectionString: string) => {
  try {
    await mongoose.connect(connectionString);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw error;
  }
};

export interface IStorage {
  // User operations
  getUser(id: string): Promise<UserType | null>;
  getUserByUsername(username: string): Promise<UserType | null>;
  createUser(user: InsertUser): Promise<UserType>;
  
  // Character operations
  getCharacter(id: string): Promise<CharacterType | null>;
  getAllCharacters(): Promise<CharacterType[]>;
  createCharacter(character: InsertCharacter): Promise<CharacterType>;
  
  // Tribe operations
  getTribe(id: string): Promise<TribeType | null>;
  getAllTribes(): Promise<TribeType[]>;
  createTribe(tribe: InsertTribe): Promise<TribeType>;
  
  // Territory operations
  getTerritory(id: string): Promise<TerritoryType | null>;
  getAllTerritories(): Promise<TerritoryType[]>;
  createTerritory(territory: InsertTerritory): Promise<TerritoryType>;
  
  // Game card operations
  getGameCard(id: string): Promise<GameCardType | null>;
  getAllGameCards(): Promise<GameCardType[]>;
  createGameCard(gameCard: InsertGameCard): Promise<GameCardType>;
  
  // Voting system operations
  getPoll(id: string): Promise<PollType | null>;
  getAllPolls(): Promise<PollType[]>;
  createPoll(poll: InsertPoll): Promise<PollType>;
  getPollOptions(pollId: string): Promise<VoteOptionType[]>;
  createVoteOption(option: InsertVoteOption): Promise<VoteOptionType>;
  createVote(vote: InsertVote): Promise<VoteType>;
  getVotesForPoll(pollId: string): Promise<VoteType[]>;
  
  // Initialize demo data
  initializeData(): Promise<void>;
  
  // Connect to database
  connect(): Promise<void>;
}

export class MongoStorage implements IStorage {
  private connectionString: string;
  
  constructor(connectionString: string) {
    this.connectionString = connectionString;
  }
  
  async connect(): Promise<void> {
    await connectMongoDB(this.connectionString);
  }
  
  // User operations
  async getUser(id: string): Promise<UserType | null> {
    return await User.findById(id);
  }
  
  async getUserByUsername(username: string): Promise<UserType | null> {
    return await User.findOne({ username });
  }
  
  async createUser(user: InsertUser): Promise<UserType> {
    const newUser = new User(user);
    return await newUser.save();
  }
  
  // Character operations
  async getCharacter(id: string): Promise<CharacterType | null> {
    return await Character.findById(id);
  }
  
  async getAllCharacters(): Promise<CharacterType[]> {
    return await Character.find();
  }
  
  async createCharacter(character: InsertCharacter): Promise<CharacterType> {
    const newCharacter = new Character(character);
    return await newCharacter.save();
  }
  
  // Tribe operations
  async getTribe(id: string): Promise<TribeType | null> {
    return await Tribe.findById(id);
  }
  
  async getAllTribes(): Promise<TribeType[]> {
    return await Tribe.find();
  }
  
  async createTribe(tribe: InsertTribe): Promise<TribeType> {
    const newTribe = new Tribe(tribe);
    return await newTribe.save();
  }
  
  // Territory operations
  async getTerritory(id: string): Promise<TerritoryType | null> {
    return await Territory.findById(id);
  }
  
  async getAllTerritories(): Promise<TerritoryType[]> {
    return await Territory.find();
  }
  
  async createTerritory(territory: InsertTerritory): Promise<TerritoryType> {
    const newTerritory = new Territory(territory);
    return await newTerritory.save();
  }
  
  // Game card operations
  async getGameCard(id: string): Promise<GameCardType | null> {
    return await GameCard.findById(id);
  }
  
  async getAllGameCards(): Promise<GameCardType[]> {
    return await GameCard.find();
  }
  
  async createGameCard(gameCard: InsertGameCard): Promise<GameCardType> {
    const newGameCard = new GameCard(gameCard);
    return await newGameCard.save();
  }
  
  // Voting system operations
  async getPoll(id: string): Promise<PollType | null> {
    return await Poll.findById(id);
  }
  
  async getAllPolls(): Promise<PollType[]> {
    return await Poll.find();
  }
  
  async createPoll(poll: InsertPoll): Promise<PollType> {
    const newPoll = new Poll(poll);
    return await newPoll.save();
  }
  
  async getPollOptions(pollId: string): Promise<VoteOptionType[]> {
    return await VoteOption.find({ pollId });
  }
  
  async createVoteOption(option: InsertVoteOption): Promise<VoteOptionType> {
    const newVoteOption = new VoteOption(option);
    return await newVoteOption.save();
  }
  
  async createVote(vote: InsertVote): Promise<VoteType> {
    const newVote = new Vote(vote);
    return await newVote.save();
  }
  
  async getVotesForPoll(pollId: string): Promise<VoteType[]> {
    const options = await VoteOption.find({ pollId });
    const optionIds = options.map(option => option._id);
    return await Vote.find({ optionId: { $in: optionIds } });
  }
  
  // Initialize demo data
  async initializeData(): Promise<void> {
    // Check if data already exists
    const characterCount = await Character.countDocuments();
    if (characterCount > 0) {
      console.log('Data already initialized');
      return;
    }

    console.log('Initializing demo data...');
    
    // Create tribes
    const tribes = [
      {
        name: 'Nomades',
        description: 'Les Nomades sont des voyageurs perpétuels, adaptés à la survie dans les terres désolées.',
        color: '#e67e22',
        strengths: ['Adaptabilité', 'Survie', 'Connaissance des territoires'],
        icon: 'compass'
      },
      {
        name: 'Anciens',
        description: 'Les Anciens préservent la mémoire du monde d\'avant, gardiens des traditions et de l\'histoire.',
        color: '#8e44ad',
        strengths: ['Sagesse', 'Connaissances ancestrales', 'Diplomatie'],
        icon: 'book'
      },
      {
        name: 'Technos',
        description: 'Les Technos explorent et réparent les reliques technologiques du passé pour construire l\'avenir.',
        color: '#3498db',
        strengths: ['Innovation', 'Ingénierie', 'Maîtrise des machines'],
        icon: 'cpu'
      }
    ];
    
    const createdTribes = await Promise.all(tribes.map(tribe => {
      const newTribe = new Tribe(tribe);
      return newTribe.save();
    }));
    
    // Create characters
    const characters = [
      {
        name: 'HBAK',
        tribe: 'Nomades',
        tribeColor: '#e67e22',
        description: 'Chef des Nomades, stratège et négociateur hors pair.',
        traits: ['Leader', 'Diplomate', 'Protecteur'],
        image: '/assets/hbak.jpg'
      },
      {
        name: 'RAAD',
        tribe: 'Anciens',
        tribeColor: '#8e44ad',
        description: 'Gardien des archives, possède une mémoire prodigieuse des temps anciens.',
        traits: ['Sage', 'Pacifique', 'Observateur'],
        image: '/assets/raad.jpg'
      },
      {
        name: 'ZBIB',
        tribe: 'Technos',
        tribeColor: '#3498db',
        description: 'Ingénieur de génie, capable de réparer presque n\'importe quelle technologie.',
        traits: ['Inventif', 'Curieux', 'Méthodique'],
        image: '/assets/zbib.jpg'
      }
    ];
    
    await Promise.all(characters.map(character => {
      const newCharacter = new Character(character);
      return newCharacter.save();
    }));
    
    // Create territories
    const territories = [
      {
        name: 'Terres Arides',
        description: 'Une vaste étendue désertique où survivent les plus adaptables.',
        tribe: 'Nomades',
        path: 'M50,50 L150,50 L150,150 L50,150 Z',
        color: '#e67e22'
      },
      {
        name: 'Bibliothèque Centrale',
        description: 'Un sanctuaire de connaissances où les Anciens préservent la mémoire.',
        tribe: 'Anciens',
        path: 'M200,50 L300,50 L300,150 L200,150 Z',
        color: '#8e44ad'
      },
      {
        name: 'Dôme Technologique',
        description: 'Le centre d\'innovation où les Technos développent leurs inventions.',
        tribe: 'Technos',
        path: 'M350,50 L450,50 L450,150 L350,150 Z',
        color: '#3498db'
      }
    ];
    
    await Promise.all(territories.map(territory => {
      const newTerritory = new Territory(territory);
      return newTerritory.save();
    }));
    
    // Create game cards
    const gameCards = [
      {
        name: 'Chasseur Nomade',
        type: 'Personnage',
        tribe: 'Nomades',
        strength: 3,
        description: 'Peut se déplacer dans n\'importe quel territoire sans pénalité.',
        color: '#e67e22',
        icon: 'user'
      },
      {
        name: 'Grimoire Ancien',
        type: 'Artefact',
        tribe: 'Anciens',
        strength: 2,
        description: 'Permet de piocher 2 cartes supplémentaires.',
        color: '#8e44ad',
        icon: 'book'
      },
      {
        name: 'Drone Réparé',
        type: 'Technologie',
        tribe: 'Technos',
        strength: 4,
        description: 'Permet d\'explorer un territoire caché.',
        color: '#3498db',
        icon: 'cpu'
      }
    ];
    
    await Promise.all(gameCards.map(gameCard => {
      const newGameCard = new GameCard(gameCard);
      return newGameCard.save();
    }));
    
    // Create poll
    const newPoll = new Poll({
      title: 'Quelle tribu préférez-vous?',
      description: 'Votez pour votre tribu favorite dans l\'univers ACAB.',
      active: true,
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 days from now
    });
    
    const savedPoll = await newPoll.save();
    
    // Create vote options
    const voteOptions = [
      {
        pollId: savedPoll._id,
        option: 'Nomades'
      },
      {
        pollId: savedPoll._id,
        option: 'Anciens'
      },
      {
        pollId: savedPoll._id,
        option: 'Technos'
      }
    ];
    
    await Promise.all(voteOptions.map(option => {
      const newVoteOption = new VoteOption(option);
      return newVoteOption.save();
    }));
    
    console.log('Demo data initialized successfully');
  }
}

// Create storage instance with connection string
const MONGO_URI = 'mongodb+srv://chedlifrini:Ht9LRz0E2qXN8skP@cluster0.amsc9.mongodb.net/9abila';
export const storage = new MongoStorage(MONGO_URI);

// For backward compatibility: MemStorage still available but unused
export class MemStorage implements IStorage {
  async connect(): Promise<void> {
    console.log('Using in-memory storage (not connected to MongoDB)');
  }

  async getUser(id: string): Promise<any> { return null; }
  async getUserByUsername(username: string): Promise<any> { return null; }
  async createUser(user: InsertUser): Promise<any> { return {}; }
  async getCharacter(id: string): Promise<any> { return null; }
  async getAllCharacters(): Promise<any[]> { return []; }
  async createCharacter(character: InsertCharacter): Promise<any> { return {}; }
  async getTribe(id: string): Promise<any> { return null; }
  async getAllTribes(): Promise<any[]> { return []; }
  async createTribe(tribe: InsertTribe): Promise<any> { return {}; }
  async getTerritory(id: string): Promise<any> { return null; }
  async getAllTerritories(): Promise<any[]> { return []; }
  async createTerritory(territory: InsertTerritory): Promise<any> { return {}; }
  async getGameCard(id: string): Promise<any> { return null; }
  async getAllGameCards(): Promise<any[]> { return []; }
  async createGameCard(gameCard: InsertGameCard): Promise<any> { return {}; }
  async getPoll(id: string): Promise<any> { return null; }
  async getAllPolls(): Promise<any[]> { return []; }
  async createPoll(poll: InsertPoll): Promise<any> { return {}; }
  async getPollOptions(pollId: string): Promise<any[]> { return []; }
  async createVoteOption(option: InsertVoteOption): Promise<any> { return {}; }
  async createVote(vote: InsertVote): Promise<any> { return {}; }
  async getVotesForPoll(pollId: string): Promise<any[]> { return []; }
  async initializeData(): Promise<void> { return; }
}