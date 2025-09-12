import {  GAME_CARDS, MAP_REGIONS } from "../client/src/lib/constants";

// Define types for the memory storage
export type User = {
  id: number;
  username: string;
  password: string;
  email: string;
  displayName?: string;
  createdAt: string;
};

export type InsertUser = {
  username: string;
  password: string;
  email: string;
  displayName?: string;
};

export type Character = {
  id: number;
  name: string;
  tribe: string;
  description: string;
  traits?: string;
  imageUrl?: string;
  tribeIcon?: string;
  tribeColor?: string;
};

export type InsertCharacter = {
  name: string;
  tribe: string;
  description: string;
  traits?: string;
  imageUrl?: string;
  tribeIcon?: string;
  tribeColor?: string;
};

export type Tribe = {
  id: number;
  name: string;
  description: string;
  color: string;
  icon: string;
  strengths?: string;
};

export type InsertTribe = {
  name: string;
  description: string;
  color: string;
  icon: string;
  strengths?: string;
};

export type Territory = {
  id: number;
  name: string;
  description: string;
  tribeId?: number;
  svgPath: string;
  color: string;
};

export type InsertTerritory = {
  name: string;
  description: string;
  tribeId?: number;
  svgPath: string;
  color: string;
};

export type GameCard = {
  id: number;
  name: string;
  type: string;
  tribe?: string;
  strength?: number;
  description: string;
  imageIcon?: string;
};

export type InsertGameCard = {
  name: string;
  type: string;
  tribe?: string;
  strength?: number;
  description: string;
  imageIcon?: string;
};


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
  
  
  // Initialize demo data
  initializeData(): Promise<void>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private characters: Map<number, Character>;
  private tribes: Map<number, Tribe>;
  private territories: Map<number, Territory>;
  private gameCards: Map<number, GameCard>;

  
  private userCurrentId: number;
  private characterCurrentId: number;
  private tribeCurrentId: number;
  private territoryCurrentId: number;
  private gameCardCurrentId: number;

  constructor() {
    this.users = new Map();
    this.characters = new Map();
    this.tribes = new Map();
    this.territories = new Map();
    this.gameCards = new Map();
 
    this.userCurrentId = 1;
    this.characterCurrentId = 1;
    this.tribeCurrentId = 1;
    this.territoryCurrentId = 1;
    this.gameCardCurrentId = 1;

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
    
  // Auto-seeding of tribes is disabled. Add tribes manually via admin or API if needed.
    
   
    
    // Create territories
    for (const region of MAP_REGIONS) {
      const tribeId = this.getTribeId(region.tribeId);
      await this.createTerritory({
        name: region.name,
        description: region.description,
        tribeId: tribeId !== null ? tribeId : undefined,
        svgPath: region.svgPath,
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
        imageIcon: card.imageIcon
      });
    }
   
  
  }

  // Helper method to get tribe ID by tribeId
  private getTribeId(tribeId: number): number | null {
    const tribe = this.tribes.get(tribeId);
    return tribe ? tribe.id : null;
  }
}

// Use in-memory storage for the project
export const storage = new MemStorage();
