import type { VercelRequest, VercelResponse } from '@vercel/node';
import { sql } from './_lib/db';

// Read-only for now — there's no admin UI for blog posts yet. Add POST/PUT/
// DELETE here (mirroring api/skills.ts, with requireAuth) when that's built.
export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }
  const { rows } = await sql`SELECT * FROM blog_posts ORDER BY display_order ASC`;
  res.status(200).json(rows);
}
