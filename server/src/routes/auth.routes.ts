import { Router, Request, Response } from "express";
import { storage } from "../../mongoStorage";
import { insertUserSchema } from "../../../shared/mongoSchema";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const router = Router();
const JWT_SECRET = process.env.JWT_SECRET || 'acab-jwt-secret';

// Register route
router.post("/register", async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;
    
    if (!username || !email || !password) {
      return res.status(400).json({ error: 'Username, email, and password are required' });
    }
    
    // Check if user already exists
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
    
    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    // Create user
    const userData = { username, email, password: hashedPassword, level };
    const newUser = await storage.createUser(userData);
    
    // Create JWT token
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

// Login route
router.post("/login", async (req: Request, res: Response) => {
  try {
    const { identifier, password } = req.body;
    
    if (!identifier || !password) {
      return res.status(400).json({ error: 'Email/username and password are required' });
    }
    
    // Find user by username or email
    const user = await storage.getUserByUsername(identifier);
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    // Verify password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    // Create JWT token
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

export default router;