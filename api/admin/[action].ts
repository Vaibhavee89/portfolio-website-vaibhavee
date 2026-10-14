import type { VercelRequest, VercelResponse } from '@vercel/node';
import bcrypt from 'bcryptjs';
import { createSessionCookie, clearSessionCookie, getSessionEmail } from '../_lib/auth.js';

// Minimal in-memory rate limiter. Resets on a cold start, which is fine for
// a single-admin login — it just raises the cost of brute-forcing, it
// doesn't need to be perfectly durable across instances.
const attempts = new Map<string, { count: number; resetAt: number }>();
const MAX_ATTEMPTS = 10;
const WINDOW_MS = 15 * 60 * 1000;

function isRateLimited(key: string): boolean {
  const now = Date.now();
  const entry = attempts.get(key);
  if (!entry || now > entry.resetAt) {
    attempts.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }
  entry.count += 1;
  return entry.count > MAX_ATTEMPTS;
}

async function handleLogin(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const ip = (req.headers['x-forwarded-for'] as string)?.split(',')[0]?.trim()
    || req.socket.remoteAddress
    || 'unknown';
  if (isRateLimited(ip)) {
    res.status(429).json({ error: 'Too many login attempts. Try again later.' });
    return;
  }

  const { email, password } = (req.body ?? {}) as { email?: string; password?: string };

  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPasswordHash = process.env.ADMIN_PASSWORD_HASH;

  if (!adminEmail || !adminPasswordHash) {
    console.error('ADMIN_EMAIL or ADMIN_PASSWORD_HASH is not configured');
    res.status(500).json({ error: 'Admin login is not configured on the server' });
    return;
  }

  if (!email || !password || email.toLowerCase() !== adminEmail.toLowerCase()) {
    res.status(401).json({ error: 'Invalid email or password' });
    return;
  }

  const valid = await bcrypt.compare(password, adminPasswordHash);
  if (!valid) {
    res.status(401).json({ error: 'Invalid email or password' });
    return;
  }

  res.setHeader('Set-Cookie', createSessionCookie(adminEmail));
  res.status(200).json({ email: adminEmail });
}

function handleLogout(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }
  res.setHeader('Set-Cookie', clearSessionCookie());
  res.status(200).json({ ok: true });
}

function handleMe(req: VercelRequest, res: VercelResponse) {
  const email = getSessionEmail(req);
  if (!email) {
    res.status(200).json({ authenticated: false });
    return;
  }
  res.status(200).json({ authenticated: true, email });
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { action } = req.query;

  switch (action) {
    case 'login':
      await handleLogin(req, res);
      return;
    case 'logout':
      handleLogout(req, res);
      return;
    case 'me':
      handleMe(req, res);
      return;
    default:
      res.status(404).json({ error: 'Not found' });
  }
}
