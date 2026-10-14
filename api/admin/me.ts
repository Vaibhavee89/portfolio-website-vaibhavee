import type { VercelRequest, VercelResponse } from '@vercel/node';
import { getSessionEmail } from '../_lib/auth.js';

export default function handler(req: VercelRequest, res: VercelResponse) {
  const email = getSessionEmail(req);
  if (!email) {
    res.status(200).json({ authenticated: false });
    return;
  }
  res.status(200).json({ authenticated: true, email });
}
