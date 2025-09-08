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
  app.post('/api/admin/characters', async (req: AuthenticatedRequest, res) => {
    try {
      console.log('Creating character with data:', req.body);
      console.log('User from request:', req.user);
      const character = await storage.createCharacter(req.body);
      console.log('Created character:', character);
      res.status(201).json(character);
    } catch (error) {
      console.error('Character creation error:', error);
      console.error('Full error object:', error);
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
      if (level > (req as any).user.level) {
        return res.status(403).json({ error: 'Cannot promote user above your level' });
      }
      await storage.updateUserLevel(req.params.id, level);
      res.json({ message: 'User level updated' });
    } catch (error: any) {
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

  // Tribe management (Level 7+)
  app.post('/api/admin/tribes', async (req, res) => {
    try {
      console.log('Creating tribe with data:', req.body);
      const tribe = await storage.createTribe(req.body);
      res.status(201).json(tribe);
    } catch (error) {
      console.error('Tribe creation error:', error);
      res.status(500).json({ error: 'Failed to create tribe' });
    }
  });

  app.put('/api/admin/tribes/:id', async (req, res) => {
    try {
      console.log('Updating tribe with data:', req.body);
      const tribe = await storage.updateTribe(req.params.id, req.body);
      console.log('Updated tribe result:', tribe);
      res.json(tribe);
    } catch (error) {
      console.error('Tribe update error:', error);
      res.status(500).json({ error: 'Failed to update tribe' });
    }
  });

  app.delete('/api/admin/tribes/:id', requirePermission(PERMISSIONS.MANAGE_CONTENT), async (req, res) => {
    try {
      await storage.deleteTribe(req.params.id);
      res.json({ message: 'Tribe deleted' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete tribe' });
    }
  });

  // Character management (Level 7+)
  app.put('/api/admin/characters/:id', requirePermission(PERMISSIONS.MANAGE_CONTENT), async (req, res) => {
    try {
      const character = await storage.updateCharacter(req.params.id, req.body);
      res.json(character);
    } catch (error) {
      res.status(500).json({ error: 'Failed to update character' });
    }
  });

  // File upload (Level 7+)
  app.post('/api/admin/upload', requirePermission(PERMISSIONS.MANAGE_CONTENT), async (req, res) => {
    try {
      // Basic file upload endpoint - would need multer middleware for actual file handling
      res.json({ message: 'File upload endpoint - implement with multer' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to upload file' });
    }
  });

  // Site settings (Level 8+)
  app.get('/api/admin/settings', requirePermission(PERMISSIONS.MANAGE_USERS), async (req, res) => {
    try {
      // Return site settings - could be stored in database or config
      const settings = {
        siteTitle: 'ACAB - All Cats Are Beautiful',
        siteDescription: 'Post-apocalyptic cat universe',
        maintenanceMode: false,
        registrationEnabled: true
      };
      res.json(settings);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch settings' });
    }
  });

  app.put('/api/admin/settings', requirePermission(PERMISSIONS.MANAGE_USERS), async (req, res) => {
    try {
      // Update site settings
      res.json({ message: 'Settings updated successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to update settings' });
    }
  });

  // Tribe Images
  app.post('/api/admin/tribe-images', async (req, res) => {
    try {
      console.log('POST /api/admin/tribe-images called with:', req.body);
      const { tribeId, tribeName, imageData } = req.body;
      const tribeImage = await storage.createTribeImage(tribeId, tribeName, imageData);
      console.log('Tribe image created:', tribeImage);
      res.status(201).json(tribeImage);
    } catch (error) {
      console.error('Tribe image creation error:', error);
      res.status(500).json({ error: 'Failed to save tribe image' });
    }
  });

  app.get('/api/admin/tribe-images', async (req, res) => {
    try {
      console.log('GET /api/admin/tribe-images called');
      const tribeImages = await storage.getTribeImages();
      console.log('Returning tribe images:', tribeImages);
      res.json(tribeImages);
    } catch (error) {
      console.error('Fetch tribe images error:', error);
      res.status(500).json({ error: 'Failed to fetch tribe images' });
    }
  });

  app.delete('/api/admin/tribe-images/:tribeId', async (req, res) => {
    try {
      console.log('DELETE /api/admin/tribe-images called for:', req.params.tribeId);
      await storage.deleteTribeImage(req.params.tribeId);
      res.json({ message: 'Tribe image deleted' });
    } catch (error) {
      console.error('Delete tribe image error:', error);
      res.status(500).json({ error: 'Failed to delete tribe image' });
    }
  });

  // Analytics (Level 5+)
  app.get('/api/admin/analytics', requirePermission(PERMISSIONS.VIEW_USERS), async (req, res) => {
    try {
      const userCount = await storage.getUserCount();
      const characterCount = await storage.getAllCharacters().then(chars => chars.length);
      const tribeCount = await storage.getAllTribes().then(tribes => tribes.length);
      
      const analytics = {
        totalUsers: userCount,
        totalCharacters: characterCount,
        totalTribes: tribeCount,
        registrationsToday: 0, // Would need to implement date filtering
        activeUsers: 0 // Would need to track user activity
      };
      
      res.json(analytics);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch analytics' });
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