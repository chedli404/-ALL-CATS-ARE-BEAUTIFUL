import { Router } from "express";
import { storage } from "../../mongoStorage";
import { PERMISSIONS, requirePermission, AuthenticatedRequest } from "../middleware/permissionMiddleware";

const router = Router();
const EDIT_MODE_SECRET = 'dev_secret_2024';
const EDIT_MODE_ENABLED = true;

router.get('/users', requirePermission(PERMISSIONS.VIEW_USERS), async (req, res) => {
  try {
    const users = await storage.getAllUsers();
    res.json(users.map(user => ({ ...user, password: undefined })));
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

// Content management (Level 7+)
router.post('/characters', requirePermission(PERMISSIONS.MANAGE_CONTENT), async (req: AuthenticatedRequest, res) => {
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

router.delete('/characters/:id', requirePermission(PERMISSIONS.MANAGE_CONTENT), async (req, res) => {
  try {
    await storage.deleteCharacter(req.params.id);
    res.json({ message: 'Character deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete character' });
  }
});

// User management (Level 8+)
router.put('/users/:id/level', requirePermission(PERMISSIONS.MANAGE_USERS), async (req: AuthenticatedRequest, res) => {
  try {
    const { level } = req.body;
    if (level > req.user.level) {
      return res.status(403).json({ error: 'Cannot promote user above your level' });
    }
    if (level === 10 && req.user.level < 10) {
      return res.status(403).json({ error: 'Only developers can create other developers' });
    }
    await storage.updateUserLevel(req.params.id, level);
    res.json({ message: 'User level updated' });
  } catch (error: any) {
    res.status(500).json({ error: 'Failed to update user level' });
  }
});

router.delete('/users/:id', requirePermission(PERMISSIONS.MANAGE_USERS), async (req, res) => {
  try {
    await storage.deleteUser(req.params.id);
    res.json({ message: 'User deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete user' });
  }
});

// Tribe management (Level 7+)
router.post('/tribes', requirePermission(PERMISSIONS.MANAGE_CONTENT), async (req, res) => {
  try {
    console.log('Creating tribe with data:', req.body);
    const tribe = await storage.createTribe(req.body);
    res.status(201).json(tribe);
  } catch (error) {
    console.error('Tribe creation error:', error);
    res.status(500).json({ error: 'Failed to create tribe' });
  }
});

router.put('/tribes/:id', requirePermission(PERMISSIONS.MANAGE_CONTENT), async (req, res) => {
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

router.delete('/tribes/:id', requirePermission(PERMISSIONS.MANAGE_CONTENT), async (req, res) => {
  try {
    await storage.deleteTribe(req.params.id);
    res.json({ message: 'Tribe deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete tribe' });
  }
});

// Character management (Level 7+)
router.put('/characters/:id', requirePermission(PERMISSIONS.MANAGE_CONTENT), async (req, res) => {
  try {
    const character = await storage.updateCharacter(req.params.id, req.body);
    res.json(character);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update character' });
  }
});

// File upload (Level 7+)
router.post('/upload', requirePermission(PERMISSIONS.MANAGE_CONTENT), async (req, res) => {
  try {
    // Basic file upload endpoint - would need multer middleware for actual file handling
    res.json({ message: 'File upload endpoint - implement with multer' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to upload file' });
  }
});

// Site settings (Level 10+)
router.get('/settings', requirePermission(PERMISSIONS.EDIT_MODE), async (req, res) => {
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

router.put('/settings', requirePermission(PERMISSIONS.EDIT_MODE), async (req, res) => {
  try {
    // Update site settings
    res.json({ message: 'Settings updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update settings' });
  }
});

// Tribe Images
router.post('/tribe-images', requirePermission(PERMISSIONS.MANAGE_CONTENT), async (req, res) => {
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

router.get('/tribe-images', requirePermission(PERMISSIONS.MANAGE_CONTENT), async (req, res) => {
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

router.delete('/tribe-images/:tribeId', requirePermission(PERMISSIONS.MANAGE_CONTENT), async (req, res) => {
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
router.get('/analytics', requirePermission(PERMISSIONS.VIEW_USERS), async (req, res) => {
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

// Edit mode activation endpoint
router.post('/activate-edit-mode', requirePermission(PERMISSIONS.FULL_ACCESS), async (req: AuthenticatedRequest, res) => {
  try {
    const { secretKey } = req.body;
    const user = req.user;
    
    console.log('Edit mode activation attempt');
    console.log('User:', user);
    console.log('User level:', user?.level);
    console.log('Required level:', PERMISSIONS.EDIT_MODE);
    console.log('Edit mode enabled:', EDIT_MODE_ENABLED);
    
    if (!EDIT_MODE_ENABLED) {
      return res.status(403).json({ error: 'Edit mode is disabled' });
    }
    
    if (user.level < PERMISSIONS.EDIT_MODE) {
      return res.status(403).json({ error: 'Insufficient permissions for edit mode' });
    }
    
    console.log('Received secret key:', secretKey);
    console.log('Expected secret key:', EDIT_MODE_SECRET);
    console.log('Keys match:', secretKey === EDIT_MODE_SECRET);
    
    if (secretKey !== EDIT_MODE_SECRET) {
      return res.status(403).json({ error: 'Invalid secret key' });
    }
    
    // Generate edit mode session (expires in 30 minutes)
    const editToken = jwt.sign(
      { userId: user._id, editMode: true },
      process.env.JWT_SECRET || 'acab-jwt-secret',
      { expiresIn: '30m' }
    );
    
    res.json({ 
      editToken,
      message: 'Edit mode activated',
      expiresIn: 30 * 60 * 1000 // 30 minutes in milliseconds
    });
  } catch (error: any) {
    res.status(500).json({ error: 'Failed to activate edit mode' });
  }
});

// Temporary endpoint to make yourself admin (remove after use)
router.post('/make-admin', requirePermission(PERMISSIONS.FULL_ACCESS), async (req, res) => {
  try {
    const { username } = req.body;
    const user = await storage.getUserByUsername(username);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    await storage.updateUserLevel((user as any)._id.toString(), 10);
    res.json({ message: 'User promoted to developer' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to promote user' });
  }
});

// Migrate existing users to have role field
router.post('/migrate-users', requirePermission(PERMISSIONS.FULL_ACCESS), async (req, res) => {
  try {
    await storage.migrateUsersLevel();
    res.json({ message: 'Users migrated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Migration failed' });
  }
});

export { router as adminRoutes };