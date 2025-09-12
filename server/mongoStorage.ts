import mongoose from 'mongoose';
import { 
  User, Tribe, Territory, GameCard, Poll, VoteOption, Vote, TribeImage, UserPollStatus,
  InsertUser, InsertTribe, InsertTerritory, 
  InsertGameCard, InsertPoll, InsertVoteOption, InsertVote,
  UserType,  TribeType, TerritoryType, GameCardType,
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
  getAllUsers(): Promise<UserType[]>;
  getUserCount(): Promise<number>;
  updateUserLevel(id: string, level: number): Promise<void>;
  deleteUser(id: string): Promise<void>;
  updateTribe(id: string, data: any): Promise<TribeType>;
  deleteTribe(id: string): Promise<void>;
  createTribeImage(tribeId: string, tribeName: string, imageData: string): Promise<any>;
  getTribeImages(): Promise<any[]>;
  deleteTribeImage(tribeId: string): Promise<void>;
  migrateUsersLevel(): Promise<void>;
  createUser(user: InsertUser): Promise<UserType>;
  
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
  
  // Poll-based voting system operations
  getAllPolls(): Promise<PollType[]>;
  getPollOptions(pollId: string): Promise<VoteOptionType[]>;
  createVoteOption(option: { pollId: string, option: string }): Promise<VoteOptionType>;
  getUserPollStatus(username: string, pollId: string): Promise<any>;
  voteForPoll(username: string, pollId: string, optionId: string): Promise<{ status: string, vote?: VoteType, userPollStatus?: any }>;
  
  // Initialize demo data
  initializeData(): Promise<void>;
  
  // Connect to database
  connect(): Promise<void>;
}

export class MongoStorage implements IStorage {
  // Poll-based voting system operations
  async getAllPolls(): Promise<PollType[]> {
    return await Poll.find();
  }

  async getPollOptions(pollId: string): Promise<VoteOptionType[]> {
    return await VoteOption.find({ pollId });
  }

  async createVoteOption(option: { pollId: string, option: string }): Promise<VoteOptionType> {
    const newVoteOption = new VoteOption(option);
    return await newVoteOption.save() as unknown as VoteOptionType;
  }

  async getUserPollStatus(username: string, pollId: string): Promise<any> {
    return await UserPollStatus.findOne({ username, pollId });
  }

  async voteForPoll(username: string, pollId: string, optionId: string): Promise<{ status: string, vote?: VoteType, userPollStatus?: any }> {
    let userStatus = await UserPollStatus.findOne({ username, pollId });
    if (!userStatus) {
      // First vote
      userStatus = new UserPollStatus({ username, pollId, hasVoted: true, hasChanged: false, currentVote: optionId });
      await userStatus.save();
      const vote = new Vote({ username, optionId });
      await vote.save();
      await VoteOption.findByIdAndUpdate(optionId, { $inc: { voteCount: 1 } });
      return { status: 'voted', vote, userPollStatus: userStatus };
    } else if (userStatus.hasVoted && !userStatus.hasChanged) {
      // Allow one change
      const prevOptionId = userStatus.currentVote;
      userStatus.hasChanged = true;
      userStatus.currentVote = optionId;
      await userStatus.save();
      // Remove previous vote
      await VoteOption.findByIdAndUpdate(prevOptionId, { $inc: { voteCount: -1 } });
      // Add new vote
      await VoteOption.findByIdAndUpdate(optionId, { $inc: { voteCount: 1 } });
      const vote = new Vote({ username, optionId });
      await vote.save();
      return { status: 'changed', vote, userPollStatus: userStatus };
    } else {
      // Already voted and changed
      return { status: 'locked', userPollStatus: userStatus };
    }
  }
  private connectionString: string;
  
  constructor(connectionString: string) {
    this.connectionString = connectionString;
  }
  
  async connect(): Promise<void> {
    await connectMongoDB(this.connectionString);
  }
  
  // User operations
  async getUser(id: string): Promise<UserType | null> {
    const user = await User.findById(id);
    if (!user) return null;
    return {
      ...user.toObject(),
      displayName: user.displayName || undefined
    } as unknown as UserType;
  }
  
  async getAllUsers(): Promise<UserType[]> {
    const users = await User.find();
    return users.map(user => ({
      ...user.toObject(),
      displayName: user.displayName || undefined
    })) as unknown as UserType[];
  }
  
  async getUserCount(): Promise<number> {
    return await User.countDocuments();
  }
  
  async updateUserLevel(id: string, level: number): Promise<void> {
    await User.findByIdAndUpdate(id, { level });
  }
  
  async deleteUser(id: string): Promise<void> {
    await User.findByIdAndDelete(id);
  }
  
  async updateTribe(id: string, data: any): Promise<TribeType> {
    console.log('Updating tribe in DB with data:', data);
    const tribe = await Tribe.findByIdAndUpdate(id, data, { new: true });
    if (!tribe) throw new Error('Tribe not found');
    console.log('Updated tribe from DB:', tribe);
    return {
      ...tribe.toObject(),
      image: tribe.image || undefined
    } as unknown as TribeType;
  }
  
  async deleteTribe(id: string): Promise<void> {
    await Tribe.findByIdAndDelete(id);
    await TribeImage.deleteMany({ tribeId: id });
  }
  
  async createTribeImage(tribeId: string, tribeName: string, imageData: string): Promise<any> {
    await TribeImage.findOneAndDelete({ tribeId });
    const tribeImage = new TribeImage({ tribeId, tribeName, imageData });
    return await tribeImage.save();
  }
  
  async getTribeImages(): Promise<any[]> {
    return await TribeImage.find();
  }
  
  async deleteTribeImage(tribeId: string): Promise<void> {
    await TribeImage.findOneAndDelete({ tribeId });
  }
  
  async migrateUsersLevel(): Promise<void> {
    // Add level field to users that don't have it
    await User.updateMany(
      { level: { $exists: false } },
      { $set: { level: 1 } }
    );
  }
  
  async getUserByUsername(username: string): Promise<UserType | null> {
    const user = await User.findOne({ 
      $or: [{ username }, { email: username }]
    });
    if (!user) return null;
    return {
      ...user.toObject(),
      displayName: user.displayName || undefined
    } as unknown as UserType;
  }
  
  async createUser(user: InsertUser): Promise<UserType> {
    const newUser = new User(user);
    const savedUser = await newUser.save();
    return {
      ...savedUser.toObject(),
      displayName: savedUser.displayName || undefined
    } as unknown as UserType;
  }

  // Tribe operations
  async getTribe(id: string): Promise<TribeType | null> {
    return await Tribe.findById(id);
  }
  
  async getAllTribes(): Promise<TribeType[]> {
    const tribes = await Tribe.find();
    return tribes.map(tribe => ({
      ...tribe.toObject(),
      image: tribe.image || undefined
    })) as unknown as TribeType[];
  }
  
  async createTribe(tribe: InsertTribe): Promise<TribeType> {
    const newTribe = new Tribe(tribe);
    const savedTribe = await newTribe.save();
    return {
      ...savedTribe.toObject(),
      image: savedTribe.image || undefined
    } as unknown as TribeType;
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
    const savedGameCard = await newGameCard.save();
    return {
      ...savedGameCard.toObject(),
      tribe: savedGameCard.tribe || undefined
    } as unknown as GameCardType;
  }
  
  // ...existing code...
  
  async initializeData(): Promise<void> {
    // Tribe auto-seeding disabled. Add tribes manually via admin or API if needed.
    
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
    
    console.log('Demo data initialized successfully');
  }
  
  async getAllCharacters2(): Promise<any[]> {
    return await mongoose.connection.collection("characters2").find({}).toArray();
  }
  
  async getcharacters2(id: string): Promise<any> {
    return await mongoose.connection.collection("characters2").findOne({ _id: new mongoose.Types.ObjectId(id) });
  }
}

// Create storage instance with connection string
const MONGO_URI = 'mongodb+srv://chedlifrini:Ht9LRz0E2qXN8skP@cluster0.amsc9.mongodb.net/9abila';
export const storage = new MongoStorage(MONGO_URI);

// For backward compatibility: MemStorage still available but unused
export class MemStorage implements IStorage {
  async getAllPolls(): Promise<any[]> { return []; }
  async getPollOptions(pollId: string): Promise<any[]> { return []; }
  async createVoteOption(option: { pollId: string, option: string }): Promise<any> { return {}; }
  async getUserPollStatus(userId: string, pollId: string): Promise<any> { return null; }
  async voteForPoll(userId: string, pollId: string, optionId: string): Promise<any> { return { status: 'locked' }; }
  async connect(): Promise<void> {
    console.log('Using in-memory storage (not connected to MongoDB)');
  }

  async getUser(id: string): Promise<any> { return null; }
  async getUserByUsername(username: string): Promise<any> { return null; }
  async getAllUsers(): Promise<any[]> { return []; }
  async getUserCount(): Promise<number> { return 0; }
  async updateUserLevel(id: string, level: number): Promise<void> { return; }
  async deleteUser(id: string): Promise<void> { return; }
  async updateTribe(id: string, data: any): Promise<any> { return {}; }
  async deleteTribe(id: string): Promise<void> { return; }
  async createTribeImage(tribeId: string, tribeName: string, imageData: string): Promise<any> { return {}; }
  async getTribeImages(): Promise<any[]> { return []; }
  async deleteTribeImage(tribeId: string): Promise<void> { return; }
  async migrateUsersLevel(): Promise<void> { return; }
  async createUser(user: InsertUser): Promise<any> { return {}; }
  async getTribe(id: string): Promise<any> { return null; }
  async getAllTribes(): Promise<any[]> { return []; }
  async createTribe(tribe: InsertTribe): Promise<any> { return {}; }
  async getTerritory(id: string): Promise<any> { return null; }
  async getAllTerritories(): Promise<any[]> { return []; }
  async createTerritory(territory: InsertTerritory): Promise<any> { return {}; }
  async getGameCard(id: string): Promise<any> { return null; }
  async getAllGameCards(): Promise<any[]> { return []; }
  async createGameCard(gameCard: InsertGameCard): Promise<any> { return {}; }
  // ...existing code...
  async initializeData(): Promise<void> { return; }
}