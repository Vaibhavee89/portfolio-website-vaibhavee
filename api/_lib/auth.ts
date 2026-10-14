import type { VercelRequest, VercelResponse } from '@vercel/node';
import jwt from 'jsonwebtoken';
import { serialize, parse } from 'cookie';

const COOKIE_NAME = 'admin_session';
const SESSION_DURATION_SECONDS = 60 * 60 * 8; // 8 hours

function getJwtSecret(): string {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error('JWT_SECRET environment variable is not set');
  }
  return secret;
}

export function createSessionCookie(email: string): string {
  const token = jwt.sign({ email }, getJwtSecret(), { expiresIn: SESSION_DURATION_SECONDS });
  return serialize(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    maxAge: SESSION_DURATION_SECONDS,
  });
}

export function clearSessionCookie(): string {
  return serialize(COOKIE_NAME, '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    maxAge: 0,
  });
}

export function getSessionEmail(req: VercelRequest): string | null {
  const cookies = parse(req.headers.cookie || '');
  const token = cookies[COOKIE_NAME];
  if (!token) return null;
  try {
    const payload = jwt.verify(token, getJwtSecret()) as { email: string };
    return payload.email;
  } catch {
    return null;
  }
}

/**
 * Call at the top of any admin write handler. If the request has no valid
 * session, this sends the 401 response itself and returns true — the
 * caller should just `return` immediately when this returns true.
 *
 * This is the real security boundary: the client-side ProtectedRoute/
 * AuthContext is only for UI state (what to show), never trust it alone.
 */
export function requireAuth(req: VercelRequest, res: VercelResponse): boolean {
  const email = getSessionEmail(req);
  if (!email) {
    res.status(401).json({ error: 'Not authenticated' });
    return true;
  }
  return false;
}
