import express, { type Express, type Request } from "express";
import { createServer, type Server } from "http";
import { storage } from "./mongoStorage";
import { z } from "zod";
import { insertUserSchema } from "../shared/mongoSchema";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import session from "express-session";

// Extend Request type to include user property
interface AuthenticatedRequest extends Request {
  user?: any;
}

const JWT_SECRET = process.env.JWT_SECRET || 'acab-jwt-secret';

// Permission levels
const PERMISSIONS = {
  VIEW_USERS: 5,
  MANAGE_CONTENT: 7,
  MANAGE_USERS: 8,
  FULL_ACCESS: 9
};

// Admin middleware
const requireAdmin = async (req: AuthenticatedRequest, res: any, next: any) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'No token provided' });
    }
    
    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, JWT_SECRET) as { id: string };
    
    const user = await storage.getUser(decoded.id);
    if (!user || user.level < 5) {
      return res.status(403).json({ error: 'Admin access required' });
    }
    
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

// Permission-specific middleware
const requirePermission = (minLevel: number) => {
  return async (req: AuthenticatedRequest, res: any, next: any) => {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'No token provided' });
      }
      
      const token = authHeader.split(' ')[1];
      const decoded = jwt.verify(token, JWT_SECRET) as { id: string };
      
      const user = await storage.getUser(decoded.id);
      if (!user || user.level < minLevel) {
        return res.status(403).json({ error: 'Insufficient permissions' });
      }
      
      req.user = user;
      next();
    } catch (error) {
      res.status(401).json({ error: 'Invalid token' });
    }
  };
};

export async function registerRoutes(app: Express): Promise<Server> {
  const httpServer = createServer(app);

  // Configure session
  app.use(
    session({
      secret: process.env.SESSION_SECRET || 'acab-session-secret',
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 24 * 60 * 60 * 1000, // 1 day
        secure: process.env.NODE_ENV === 'production',
      },
    })
  );

  // Auth routes
  app.post('/api/auth/register', async (req, res) => {
    try {
      const { username, email, password } = req.body;
      
      if (!username || !email || !password) {
        return res.status(400).json({ error: 'Username, email, and password are required' });
      }
      
      const existingUser = await storage.getUserByUsername(username);
      if (existingUser) {
        return res.status(400).json({ error: 'Username is already taken' });
      }
      
      const existingEmail = await storage.getUserByUsername(email);
      if (existingEmail) {
        return res.status(400).json({ error: 'Email is already registered' });
      }
      
      // Check if this is the first user - make them admin
      const userCount = await storage.getUserCount();
      const level = userCount === 0 ? 9 : 1;
      console.log('User count:', userCount, 'Level assigned:', level);
      
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      
      const userData = { username, email, password: hashedPassword, level };
      const newUser = await storage.createUser(userData);
      console.log('Created user with level:', newUser.level);
      
      const token = jwt.sign(
        { id: newUser._id, username: newUser.username, email: newUser.email, level: newUser.level },
        JWT_SECRET,
        { expiresIn: '7d' }
      );
      
      res.status(201).json({ 
        token,
        user: { id: newUser._id, username: newUser.username, email: newUser.email, level: newUser.level }
      });
    } catch (error) {
      console.error("Registration error:", error);
      res.status(500).json({ error: "Failed to register user" });
    }
  });

  app.post('/api/auth/login', async (req, res) => {
    try {
      const { identifier, password } = req.body;
      
      if (!identifier || !password) {
        return res.status(400).json({ error: 'Email/username and password are required' });
      }
      
      const user = await storage.getUserByUsername(identifier);
      if (!user) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }
      
      console.log('User from DB:', user);
      console.log('User level:', user.level);
      
      const isMatch = await bcrypt.compare(password, user.password);
      
      if (!isMatch) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }
      
      const token = jwt.sign(
        { id: user._id, username: user.username, email: user.email, level: user.level },
        JWT_SECRET,
        { expiresIn: '7d' }
      );
      
      res.json({ 
        token,
        user: { id: user._id, username: user.username, email: user.email, level: user.level }
      });
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({ error: "Failed to login" });
    }
  });

  app.get('/api/auth/me', async (req, res) => {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'No token provided' });
      }
      
      const token = authHeader.split(' ')[1];
      const decoded = jwt.verify(token, JWT_SECRET) as { id: string };
      
      const user = await storage.getUser(decoded.id);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      
      res.json({ user: { ...user, password: undefined } });
    } catch (error) {
      console.error('Auth error:', error);
      res.status(401).json({ error: 'Invalid token' });
    }
  });

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
      const character = await storage.getCharacter(req.params.id);
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
      const tribe = await storage.getTribe(req.params.id);
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

  // Admin routes
  app.get('/api/admin/users', requirePermission(PERMISSIONS.VIEW_USERS), async (req, res) => {
    try {
      const users = await storage.getAllUsers();
      res.json(users.map(user => ({ ...user, password: undefined })));
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch users' });
    }
  });

  // Content management (Level 7+)
  app.post('/api/admin/characters', requirePermission(PERMISSIONS.MANAGE_CONTENT), async (req, res) => {
    try {
      const character = await storage.createCharacter(req.body);
      res.status(201).json(character);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create character' });
    }
  });

  app.delete('/api/admin/characters/:id', requirePermission(PERMISSIONS.MANAGE_CONTENT), async (req, res) => {
    try {
      await storage.deleteCharacter(req.params.id);
      res.json({ message: 'Character deleted' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete character' });
    }
  });

  // User management (Level 8+)
  app.put('/api/admin/users/:id/level', requirePermission(PERMISSIONS.MANAGE_USERS), async (req: AuthenticatedRequest, res) => {
    try {
      const { level } = req.body;
      if (level > req.user.level) {
        return res.status(403).json({ error: 'Cannot promote user above your level' });
      }
      await storage.updateUserLevel(req.params.id, level);
      res.json({ message: 'User level updated' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to update user level' });
    }
  });

  app.delete('/api/admin/users/:id', requirePermission(PERMISSIONS.MANAGE_USERS), async (req, res) => {
    try {
      await storage.deleteUser(req.params.id);
      res.json({ message: 'User deleted' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete user' });
    }
  });

  // Temporary endpoint to make yourself admin (remove after use)
  app.post('/api/make-admin', async (req, res) => {
    try {
      const { username } = req.body;
      const user = await storage.getUserByUsername(username);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      
      await storage.updateUserLevel((user as any)._id.toString(), 9);
      res.json({ message: 'User promoted to admin' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to promote user' });
    }
  });

  // Migrate existing users to have role field
  app.post('/api/migrate-users', async (req, res) => {
    try {
      await storage.migrateUsersLevel();
      res.json({ message: 'Users migrated successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Migration failed' });
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
      const poll = await storage.getPoll(req.params.id);
      if (!poll) {
        return res.status(404).json({ message: "Poll not found" });
      }
      const options = await storage.getPollOptions(req.params.id);
      res.json({ ...poll, options });
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch poll" });
    }
  });

  app.post("/api/votes", async (req, res) => {
    try {
      const vote = await storage.createVote(req.body);
      res.status(201).json(vote);
    } catch (error) {
      res.status(500).json({ message: "Failed to create vote" });
    }
  });

  return httpServer;
}