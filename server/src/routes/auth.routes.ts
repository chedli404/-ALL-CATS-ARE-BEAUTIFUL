import { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { storage } from "../../mongoStorage";
import { AuthenticatedRequest } from "../middleware/permissionMiddleware";

const router = Router();
const JWT_SECRET = process.env.JWT_SECRET || 'acab-jwt-secret';

router.post('/register', async (req, res) => {
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
    
    // Generate verification token
    const { generateVerificationToken, sendVerificationEmail } = await import('../../emailService');
    const verificationToken = generateVerificationToken();
    const verificationExpires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours
    
    const userData = { 
      username, 
      email, 
      password: hashedPassword, 
      level,
      isVerified: false,
      verificationToken,
      verificationExpires
    };
    const newUser = await storage.createUser(userData);
    console.log('Created user with level:', newUser.level);
    
    // Send verification email
    try {
      await sendVerificationEmail(email, username, verificationToken);
    } catch (emailError) {
      console.error('Failed to send verification email:', emailError);
    }
    
    res.status(201).json({ 
      message: 'Registration successful! Please check your email to verify your account.',
      user: { id: newUser._id, username: newUser.username, email: newUser.email, isVerified: false }
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ error: "Failed to register user" });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { identifier, password } = req.body;
    
    if (!identifier || !password) {
      return res.status(400).json({ error: 'Email/username and password are required' });
    }
    
    const user = await storage.getUserByUsername(identifier);
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    if (!(user as any).isVerified) {
      return res.status(401).json({ error: 'Please verify your email before logging in' });
    }
    
    console.log('User from DB:', user);
    console.log('User level:', user.level);
    console.log('User ID:', user._id);
    
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

router.get('/me', async (req, res) => {
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

router.post('/resend-verification', async (req, res) => {
  try {
    const { email } = req.body;
    
    const { User } = await import('../../../shared/mongoSchema');
    const user = await User.findOne({ email, isVerified: false });
    
    if (!user) {
      return res.status(400).json({ error: 'User not found or already verified' });
    }
    
    // Generate new token
    const { generateVerificationToken, sendVerificationEmail } = await import('../../emailService');
    const verificationToken = generateVerificationToken();
    const verificationExpires = new Date(Date.now() + 24 * 60 * 60 * 1000);
    
    user.verificationToken = verificationToken;
    user.verificationExpires = verificationExpires;
    await user.save();
    
    await sendVerificationEmail(email, user.username, verificationToken);
    
    res.json({ message: 'Verification email sent!' });
  } catch (error) {
    console.error('Resend verification error:', error);
    res.status(500).json({ error: 'Failed to resend verification email' });
  }
});

// Email verification redirect (for Gmail compatibility)
router.get('/verify/:token', async (req, res) => {
  try {
    const { token } = req.params;
    
    const { User } = await import('../../../shared/mongoSchema');
    const user = await User.findOne({ 
      verificationToken: token,
      verificationExpires: { $gt: new Date() }
    });
    
    if (!user) {
      return res.redirect('/verify-email?status=error&message=Invalid or expired token');
    }
    
    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationExpires = undefined;
    await user.save();
    
    // Generate login token
    const loginToken = jwt.sign(
      { id: user._id, username: user.username, email: user.email, level: user.level },
      JWT_SECRET,
      { expiresIn: '7d' }
    );
    
    res.redirect(`/verify-email?status=success&token=${loginToken}&user=${encodeURIComponent(JSON.stringify({ id: user._id, username: user.username, email: user.email, level: user.level }))}`);
  } catch (error) {
    console.error('Email verification error:', error);
    res.redirect('/verify-email?status=error&message=Verification failed');
  }
});

export default router;