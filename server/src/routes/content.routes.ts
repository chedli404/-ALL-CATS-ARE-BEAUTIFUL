import { Router } from "express";
import { requirePermission, PERMISSIONS, AuthenticatedRequest } from "../middleware/permissionMiddleware";

const router = Router();

router.get('/content/:key', async (req, res) => {
  try {
    const { Content } = await import('../../contentSchema');
    const content = await Content.findOne({ key: req.params.key });
    if (!content) {
      return res.status(404).json({ error: 'Content not found' });
    }
    res.json(content);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch content' });
  }
});

router.put('/content/:key', requirePermission(PERMISSIONS.EDIT_MODE), async (req: AuthenticatedRequest, res) => {
  try {
    const { Content } = await import('../../contentSchema');
    const { value, type, page, section } = req.body;
    const user = (req as any).user;
    
    const content = await Content.findOneAndUpdate(
      { key: req.params.key },
      { 
        value, 
        type, 
        page, 
        section, 
        updatedAt: new Date(), 
        updatedBy: user._id 
      },
      { upsert: true, new: true }
    );
    
    res.json(content);
  } catch (error) {
    res.status(500).json({ error: 'Failed to save content' });
  }
});

export default router;