import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

const SESSION_SECRET = process.env.SESSION_SECRET || 'digergain-production-ultra-secret-2026';
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'anoopkp10@gmail.com';
// Default bcrypt hash for 'DigerGain@2026!'
const DEFAULT_PASSWORD_HASH = bcrypt.hashSync('DigerGain@2026!', 10);
const ADMIN_PASSWORD_HASH = process.env.ADMIN_PASSWORD_HASH || DEFAULT_PASSWORD_HASH;

export interface AdminSession {
  email: string;
  role: 'admin';
  iat: number;
  exp: number;
}

export async function verifyAdminCredentials(email: string, password: string): Promise<boolean> {
  if (email.trim().toLowerCase() !== ADMIN_EMAIL.trim().toLowerCase()) {
    return false;
  }
  return bcrypt.compare(password, ADMIN_PASSWORD_HASH);
}

export function generateSessionToken(email: string): string {
  return jwt.sign(
    { email, role: 'admin' },
    SESSION_SECRET,
    { expiresIn: '7d' }
  );
}

export function verifySessionToken(token: string): AdminSession | null {
  try {
    return jwt.verify(token, SESSION_SECRET) as AdminSession;
  } catch (err) {
    return null;
  }
}

export function requireAdminAuth(req: Request, res: Response, next: NextFunction): void {
  // Check cookie or Authorization header
  const token = req.cookies?.['dg_session'] || 
    (req.headers.authorization?.startsWith('Bearer ') ? req.headers.authorization.slice(7) : null);

  if (!token) {
    res.status(401).json({ success: false, message: 'Unauthorized: Admin session required' });
    return;
  }

  const session = verifySessionToken(token);
  if (!session) {
    res.status(401).json({ success: false, message: 'Session expired or invalid. Please log in again.' });
    return;
  }

  (req as any).admin = session;
  next();
}
