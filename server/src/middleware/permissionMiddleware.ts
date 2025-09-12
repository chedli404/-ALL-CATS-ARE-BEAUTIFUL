import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { storage } from "../../mongoStorage";

const JWT_SECRET = process.env.JWT_SECRET || 'acab-jwt-secret';

// Permission levels
export const PERMISSIONS = {
  VIEW_USERS: 5,
  MANAGE_CONTENT: 7,
  MANAGE_USERS: 8,
  FULL_ACCESS: 9,
  EDIT_MODE: 10
};

export interface AuthenticatedRequest extends Request {
  user?: any;
}

// Admin middleware
export const requireAdmin = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
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
export const requirePermission = (minLevel: number) => {
  return async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
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