import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

// Extend Express Request to include user info
export interface AuthRequest extends Request {
  user?: {
    userId: string;
    email: string;
  };
}

export const authenticateToken = (req: AuthRequest, res: Response, next: NextFunction): void => {
  const authHeader = req.headers['authorization'];
  // Token is usually in format "Bearer TOKEN"
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    res.status(401).json({ error: 'Access denied, token missing' });
    return;
  }

  const jwtSecret = process.env.JWT_SECRET || 'fallback_secret_key_for_development_only_12345';

  jwt.verify(token, jwtSecret, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid token' });
    }
    
    // Attach the user payload to the request object
    req.user = user as { userId: string; email: string };
    next();
  });
};
