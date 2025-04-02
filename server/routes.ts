import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";
import { 
  insertUserSchema, 
  insertCharacterSchema,
  insertTribeSchema,
  insertTerritorySchema,
  insertGameCardSchema,
  insertVoteSchema,
  insertPollSchema,
  insertVoteOptionSchema
} from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Characters routes
  app.get("/api/characters", async (req, res) => {
    try {
      const characters = await storage.getAllCharacters();
      res.json(characters);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch characters" });
    }
  });

  app.get("/api/characters/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const character = await storage.getCharacter(id);
      
      if (!character) {
        return res.status(404).json({ message: "Character not found" });
      }
      
      res.json(character);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch character" });
    }
  });

  // Tribes routes
  app.get("/api/tribes", async (req, res) => {
    try {
      const tribes = await storage.getAllTribes();
      res.json(tribes);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch tribes" });
    }
  });

  app.get("/api/tribes/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const tribe = await storage.getTribe(id);
      
      if (!tribe) {
        return res.status(404).json({ message: "Tribe not found" });
      }
      
      res.json(tribe);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch tribe" });
    }
  });

  // Territories routes
  app.get("/api/territories", async (req, res) => {
    try {
      const territories = await storage.getAllTerritories();
      res.json(territories);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch territories" });
    }
  });

  // Game cards routes
  app.get("/api/game-cards", async (req, res) => {
    try {
      const cards = await storage.getAllGameCards();
      res.json(cards);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch game cards" });
    }
  });

  // Voting system routes
  app.get("/api/polls", async (req, res) => {
    try {
      const polls = await storage.getAllPolls();
      res.json(polls);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch polls" });
    }
  });

  app.get("/api/polls/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const poll = await storage.getPoll(id);
      
      if (!poll) {
        return res.status(404).json({ message: "Poll not found" });
      }
      
      const options = await storage.getPollOptions(id);
      
      res.json({
        ...poll,
        options
      });
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch poll" });
    }
  });

  app.post("/api/votes", async (req, res) => {
    try {
      const voteData = insertVoteSchema.parse(req.body);
      const vote = await storage.createVote(voteData);
      res.status(201).json(vote);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid vote data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create vote" });
    }
  });

  // Initialize data
  await storage.initializeData();
  
  const httpServer = createServer(app);

  return httpServer;
}
