import { 
  users, 
  characters, 
  tribes, 
  territories, 
  gameCards, 
  votes, 
  voteOptions, 
  polls,
  type User, 
  type InsertUser, 
  type Character, 
  type InsertCharacter,
  type Tribe,
  type InsertTribe,
  type Territory,
  type InsertTerritory,
  type GameCard,
  type InsertGameCard,
  type Vote,
  type InsertVote,
  type VoteOption,
  type InsertVoteOption,
  type Poll,
  type InsertPoll
} from "@shared/schema";
import { CHARACTERS_DATA, TRIBES_DATA, GAME_CARDS, MAP_REGIONS } from "../client/src/lib/constants";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import { eq, inArray } from "drizzle-orm";

// Database connection
const sql = neon(process.env.DATABASE_URL!);
export const db = drizzle(sql);

export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Character operations
  getCharacter(id: number): Promise<Character | undefined>;
  getAllCharacters(): Promise<Character[]>;
  createCharacter(character: InsertCharacter): Promise<Character>;
  
  // Tribe operations
  getTribe(id: number): Promise<Tribe | undefined>;
  getAllTribes(): Promise<Tribe[]>;
  createTribe(tribe: InsertTribe): Promise<Tribe>;
  
  // Territory operations
  getTerritory(id: number): Promise<Territory | undefined>;
  getAllTerritories(): Promise<Territory[]>;
  createTerritory(territory: InsertTerritory): Promise<Territory>;
  
  // Game card operations
  getGameCard(id: number): Promise<GameCard | undefined>;
  getAllGameCards(): Promise<GameCard[]>;
  createGameCard(gameCard: InsertGameCard): Promise<GameCard>;
  
  // Voting system operations
  getPoll(id: number): Promise<Poll | undefined>;
  getAllPolls(): Promise<Poll[]>;
  createPoll(poll: InsertPoll): Promise<Poll>;
  getPollOptions(pollId: number): Promise<VoteOption[]>;
  createVoteOption(option: InsertVoteOption): Promise<VoteOption>;
  createVote(vote: InsertVote): Promise<Vote>;
  getVotesForPoll(pollId: number): Promise<Vote[]>;
  
  // Initialize demo data
  initializeData(): Promise<void>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private characters: Map<number, Character>;
  private tribes: Map<number, Tribe>;
  private territories: Map<number, Territory>;
  private gameCards: Map<number, GameCard>;
  private polls: Map<number, Poll>;
  private voteOptions: Map<number, VoteOption>;
  private votes: Map<number, Vote>;
  
  private userCurrentId: number;
  private characterCurrentId: number;
  private tribeCurrentId: number;
  private territoryCurrentId: number;
  private gameCardCurrentId: number;
  private pollCurrentId: number;
  private voteOptionCurrentId: number;
  private voteCurrentId: number;

  constructor() {
    this.users = new Map();
    this.characters = new Map();
    this.tribes = new Map();
    this.territories = new Map();
    this.gameCards = new Map();
    this.polls = new Map();
    this.voteOptions = new Map();
    this.votes = new Map();
    
    this.userCurrentId = 1;
    this.characterCurrentId = 1;
    this.tribeCurrentId = 1;
    this.territoryCurrentId = 1;
    this.gameCardCurrentId = 1;
    this.pollCurrentId = 1;
    this.voteOptionCurrentId = 1;
    this.voteCurrentId = 1;
  }

  // User operations
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userCurrentId++;
    const createdAt = new Date().toISOString();
    const user: User = { ...insertUser, id, createdAt };
    this.users.set(id, user);
    return user;
  }
  
  // Character operations
  async getCharacter(id: number): Promise<Character | undefined> {
    return this.characters.get(id);
  }
  
  async getAllCharacters(): Promise<Character[]> {
    return Array.from(this.characters.values());
  }
  
  async createCharacter(insertCharacter: InsertCharacter): Promise<Character> {
    const id = this.characterCurrentId++;
    const character: Character = { ...insertCharacter, id };
    this.characters.set(id, character);
    return character;
  }
  
  // Tribe operations
  async getTribe(id: number): Promise<Tribe | undefined> {
    return this.tribes.get(id);
  }
  
  async getAllTribes(): Promise<Tribe[]> {
    return Array.from(this.tribes.values());
  }
  
  async createTribe(insertTribe: InsertTribe): Promise<Tribe> {
    const id = this.tribeCurrentId++;
    const tribe: Tribe = { ...insertTribe, id };
    this.tribes.set(id, tribe);
    return tribe;
  }
  
  // Territory operations
  async getTerritory(id: number): Promise<Territory | undefined> {
    return this.territories.get(id);
  }
  
  async getAllTerritories(): Promise<Territory[]> {
    return Array.from(this.territories.values());
  }
  
  async createTerritory(insertTerritory: InsertTerritory): Promise<Territory> {
    const id = this.territoryCurrentId++;
    const territory: Territory = { ...insertTerritory, id };
    this.territories.set(id, territory);
    return territory;
  }
  
  // Game card operations
  async getGameCard(id: number): Promise<GameCard | undefined> {
    return this.gameCards.get(id);
  }
  
  async getAllGameCards(): Promise<GameCard[]> {
    return Array.from(this.gameCards.values());
  }
  
  async createGameCard(insertGameCard: InsertGameCard): Promise<GameCard> {
    const id = this.gameCardCurrentId++;
    const gameCard: GameCard = { ...insertGameCard, id };
    this.gameCards.set(id, gameCard);
    return gameCard;
  }
  
  // Voting system operations
  async getPoll(id: number): Promise<Poll | undefined> {
    return this.polls.get(id);
  }
  
  async getAllPolls(): Promise<Poll[]> {
    return Array.from(this.polls.values());
  }
  
  async createPoll(insertPoll: InsertPoll): Promise<Poll> {
    const id = this.pollCurrentId++;
    const poll: Poll = { ...insertPoll, id };
    this.polls.set(id, poll);
    return poll;
  }
  
  async getPollOptions(pollId: number): Promise<VoteOption[]> {
    return Array.from(this.voteOptions.values()).filter(
      (option) => option.pollId === pollId
    );
  }
  
  async createVoteOption(insertVoteOption: InsertVoteOption): Promise<VoteOption> {
    const id = this.voteOptionCurrentId++;
    const voteOption: VoteOption = { ...insertVoteOption, id };
    this.voteOptions.set(id, voteOption);
    return voteOption;
  }
  
  async createVote(insertVote: InsertVote): Promise<Vote> {
    const id = this.voteCurrentId++;
    const createdAt = new Date().toISOString();
    const vote: Vote = { ...insertVote, id, createdAt };
    this.votes.set(id, vote);
    return vote;
  }
  
  async getVotesForPoll(pollId: number): Promise<Vote[]> {
    // Get all options for this poll
    const options = await this.getPollOptions(pollId);
    const optionIds = options.map(option => option.id);
    
    // Filter votes that have an optionId in the list
    return Array.from(this.votes.values()).filter(
      (vote) => optionIds.includes(vote.optionId)
    );
  }
  
  // Initialize demo data
  async initializeData(): Promise<void> {
    // Check if data already exists
    if (this.tribes.size > 0 || this.characters.size > 0) {
      return;
    }
    
    // Create demo user
    await this.createUser({
      username: "demo",
      password: "password123",
      email: "demo@example.com"
    });
    
    // Create tribes
    for (const tribe of TRIBES_DATA) {
      await this.createTribe({
        name: tribe.name,
        description: tribe.description,
        color: tribe.color,
        icon: tribe.icon,
        strengths: tribe.strengths
      });
    }
    
    // Create characters
    for (const character of CHARACTERS_DATA) {
      await this.createCharacter({
        name: character.name,
        tribe: character.tribe,
        description: character.description,
        traits: character.traits,
        imageUrl: character.image,
        tribeIcon: character.tribe.toLowerCase(),
        tribeColor: character.tribeColor
      });
    }
    
    // Create territories
    for (const region of MAP_REGIONS) {
      await this.createTerritory({
        name: region.name,
        description: region.description,
        tribeId: this.getTribeIdByName(region.tribe),
        svgPath: region.path,
        color: region.color
      });
    }
    
    // Create game cards
    for (const card of GAME_CARDS) {
      await this.createGameCard({
        name: card.name,
        type: card.type,
        tribe: card.tribe,
        strength: card.strength,
        description: card.description,
        imageIcon: card.icon
      });
    }
    
    // Create a poll with options
    const poll = await this.createPoll({
      title: "Quelle histoire voulez-vous pour la prochaine saison?",
      description: "Votez pour l'intrigue que vous souhaitez voir dans la prochaine saison de ACAB",
      active: true,
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString() // 30 days from now
    });
    
    // Create poll options
    await this.createVoteOption({
      pollId: poll.id,
      option: "Les Anciens Secrets"
    });
    
    await this.createVoteOption({
      pollId: poll.id,
      option: "La Migration"
    });
    
    await this.createVoteOption({
      pollId: poll.id,
      option: "La Guerre des Tribus"
    });
  }
  
  // Helper method to get tribe ID by name
  private getTribeIdByName(tribeName: string): number | null {
    const tribe = Array.from(this.tribes.values()).find(
      (t) => t.name.toUpperCase() === tribeName.toUpperCase()
    );
    
    return tribe ? tribe.id : null;
  }
}

// PostgreSQL storage implementation 
export class PostgresStorage implements IStorage {
  // User operations
  async getUser(id: number): Promise<User | undefined> {
    const result = await sql`SELECT * FROM users WHERE id = ${id} LIMIT 1`;
    return result.length > 0 ? result[0] : undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const result = await sql`SELECT * FROM users WHERE username = ${username} LIMIT 1`;
    return result.length > 0 ? result[0] : undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const { username, password, email } = insertUser;
    const result = await sql`
      INSERT INTO users (username, password, email)
      VALUES (${username}, ${password}, ${email})
      RETURNING *
    `;
    return result[0];
  }
  
  // Character operations
  async getCharacter(id: number): Promise<Character | undefined> {
    const result = await sql`SELECT * FROM characters WHERE id = ${id} LIMIT 1`;
    return result.length > 0 ? result[0] : undefined;
  }
  
  async getAllCharacters(): Promise<Character[]> {
    return await sql`SELECT * FROM characters`;
  }
  
  async createCharacter(insertCharacter: InsertCharacter): Promise<Character> {
    const { name, tribe, description, traits, imageUrl, tribeIcon, tribeColor } = insertCharacter;
    const result = await sql`
      INSERT INTO characters (name, tribe, description, traits, image_url, tribe_icon, tribe_color)
      VALUES (${name}, ${tribe}, ${description}, ${traits || null}, ${imageUrl || null}, ${tribeIcon || null}, ${tribeColor || null})
      RETURNING *
    `;
    return result[0];
  }
  
  // Tribe operations
  async getTribe(id: number): Promise<Tribe | undefined> {
    const result = await sql`SELECT * FROM tribes WHERE id = ${id} LIMIT 1`;
    return result.length > 0 ? result[0] : undefined;
  }
  
  async getAllTribes(): Promise<Tribe[]> {
    return await sql`SELECT * FROM tribes`;
  }
  
  async createTribe(insertTribe: InsertTribe): Promise<Tribe> {
    const { name, description, color, icon, strengths } = insertTribe;
    const result = await sql`
      INSERT INTO tribes (name, description, color, icon, strengths)
      VALUES (${name}, ${description}, ${color}, ${icon || null}, ${strengths || null})
      RETURNING *
    `;
    return result[0];
  }
  
  // Territory operations
  async getTerritory(id: number): Promise<Territory | undefined> {
    const result = await sql`SELECT * FROM territories WHERE id = ${id} LIMIT 1`;
    return result.length > 0 ? result[0] : undefined;
  }
  
  async getAllTerritories(): Promise<Territory[]> {
    return await sql`SELECT * FROM territories`;
  }
  
  async createTerritory(insertTerritory: InsertTerritory): Promise<Territory> {
    const { name, description, tribeId, svgPath, color } = insertTerritory;
    const result = await sql`
      INSERT INTO territories (name, description, tribe_id, svg_path, color)
      VALUES (${name}, ${description}, ${tribeId || null}, ${svgPath}, ${color})
      RETURNING *
    `;
    return result[0];
  }
  
  // Game card operations
  async getGameCard(id: number): Promise<GameCard | undefined> {
    const result = await sql`SELECT * FROM game_cards WHERE id = ${id} LIMIT 1`;
    return result.length > 0 ? result[0] : undefined;
  }
  
  async getAllGameCards(): Promise<GameCard[]> {
    return await sql`SELECT * FROM game_cards`;
  }
  
  async createGameCard(insertGameCard: InsertGameCard): Promise<GameCard> {
    const { name, type, tribe, strength, description, imageIcon } = insertGameCard;
    const result = await sql`
      INSERT INTO game_cards (name, type, tribe, strength, description, image_icon)
      VALUES (${name}, ${type}, ${tribe || null}, ${strength || null}, ${description}, ${imageIcon || null})
      RETURNING *
    `;
    return result[0];
  }
  
  // Voting system operations
  async getPoll(id: number): Promise<Poll | undefined> {
    const result = await sql`SELECT * FROM polls WHERE id = ${id} LIMIT 1`;
    return result.length > 0 ? result[0] : undefined;
  }
  
  async getAllPolls(): Promise<Poll[]> {
    return await sql`SELECT * FROM polls`;
  }
  
  async createPoll(insertPoll: InsertPoll): Promise<Poll> {
    const { title, description, active, expiresAt } = insertPoll;
    const result = await sql`
      INSERT INTO polls (title, description, active, expires_at)
      VALUES (${title}, ${description}, ${active === undefined ? true : active}, ${expiresAt || null})
      RETURNING *
    `;
    return result[0];
  }
  
  async getPollOptions(pollId: number): Promise<VoteOption[]> {
    return await sql`SELECT * FROM vote_options WHERE poll_id = ${pollId}`;
  }
  
  async createVoteOption(insertVoteOption: InsertVoteOption): Promise<VoteOption> {
    const { pollId, option } = insertVoteOption;
    const result = await sql`
      INSERT INTO vote_options (poll_id, option)
      VALUES (${pollId}, ${option})
      RETURNING *
    `;
    return result[0];
  }
  
  async createVote(insertVote: InsertVote): Promise<Vote> {
    const { userId, optionId } = insertVote;
    const result = await sql`
      INSERT INTO votes (user_id, option_id)
      VALUES (${userId}, ${optionId})
      RETURNING *
    `;
    return result[0];
  }
  
  async getVotesForPoll(pollId: number): Promise<Vote[]> {
    // Get all options for this poll
    const options = await this.getPollOptions(pollId);
    if (options.length === 0) {
      return [];
    }
    
    // Extract option IDs
    const optionIds = options.map(option => option.id);
    
    // Get all votes for these options
    const optionIdsList = optionIds.join(',');
    return await sql`SELECT * FROM votes WHERE option_id IN (${optionIds})`;
  }
  
  // Initialize demo data
  async initializeData(): Promise<void> {
    // Check if data already exists
    const existingTribes = await sql`SELECT * FROM tribes LIMIT 1`;
    if (existingTribes.length > 0) {
      return;
    }
    
    // Create demo user
    await this.createUser({
      username: "demo",
      password: "password123",
      email: "demo@example.com"
    });
    
    // Create tribes
    for (const tribe of TRIBES_DATA) {
      await this.createTribe({
        name: tribe.name,
        description: tribe.description,
        color: tribe.color,
        icon: tribe.icon,
        strengths: tribe.strengths
      });
    }
    
    // Create characters
    for (const character of CHARACTERS_DATA) {
      await this.createCharacter({
        name: character.name,
        tribe: character.tribe,
        description: character.description,
        traits: character.traits,
        imageUrl: character.image,
        tribeIcon: character.tribe.toLowerCase(),
        tribeColor: character.tribeColor
      });
    }
    
    // Create territories
    for (const region of MAP_REGIONS) {
      // Get tribe ID
      const tribe = await this.getTribeByName(region.tribe);
      const tribeId = tribe ? tribe.id : null;
      
      await this.createTerritory({
        name: region.name,
        description: region.description,
        tribeId,
        svgPath: region.path,
        color: region.color
      });
    }
    
    // Create game cards
    for (const card of GAME_CARDS) {
      await this.createGameCard({
        name: card.name,
        type: card.type,
        tribe: card.tribe,
        strength: card.strength,
        description: card.description,
        imageIcon: card.icon
      });
    }
    
    // Create a poll with options
    const poll = await this.createPoll({
      title: "Quelle histoire voulez-vous pour la prochaine saison?",
      description: "Votez pour l'intrigue que vous souhaitez voir dans la prochaine saison de ACAB",
      active: true,
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString() // 30 days from now
    });
    
    // Create poll options
    await this.createVoteOption({
      pollId: poll.id,
      option: "Les Anciens Secrets"
    });
    
    await this.createVoteOption({
      pollId: poll.id,
      option: "La Migration"
    });
    
    await this.createVoteOption({
      pollId: poll.id,
      option: "La Guerre des Tribus"
    });
  }
  
  // Helper method to get tribe ID by name
  private async getTribeByName(tribeName: string): Promise<Tribe | undefined> {
    const tribeNameUpper = tribeName.toUpperCase();
    const tribes = await sql`SELECT * FROM tribes`;
    return tribes.find(t => t.name.toUpperCase() === tribeNameUpper);
  }
}

// Use in-memory storage for now until we resolve type issues
export const storage = new MemStorage();
