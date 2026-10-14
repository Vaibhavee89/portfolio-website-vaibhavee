import type { VercelRequest, VercelResponse } from '@vercel/node';
import { sql } from './_lib/db.js';
import { requireAuth } from './_lib/auth.js';

interface BlogPostInput {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  read_time: string;
  dev_to_url: string;
  display_order?: number;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'GET') {
    const { rows } = await sql`SELECT * FROM blog_posts ORDER BY display_order ASC`;
    res.status(200).json(rows);
    return;
  }

  // Everything below changes data — require a valid admin session.
  if (requireAuth(req, res)) return;

  if (req.method === 'POST') {
    const b = (req.body ?? {}) as BlogPostInput;
    if (!b.id || !b.title || !b.excerpt || !b.date || !b.dev_to_url) {
      res.status(400).json({ error: 'id, title, excerpt, date and dev_to_url are required' });
      return;
    }
    await sql`
      INSERT INTO blog_posts (id, title, excerpt, date, read_time, dev_to_url, display_order)
      VALUES (${b.id}, ${b.title}, ${b.excerpt}, ${b.date}, ${b.read_time || ''},
              ${b.dev_to_url}, ${b.display_order ?? 0})
    `;
    res.status(201).json({ ok: true });
    return;
  }

  if (req.method === 'PUT') {
    const b = (req.body ?? {}) as BlogPostInput;
    if (!b.id) {
      res.status(400).json({ error: 'id is required' });
      return;
    }
    await sql`
      UPDATE blog_posts SET
        title = ${b.title}, excerpt = ${b.excerpt}, date = ${b.date}, read_time = ${b.read_time || ''},
        dev_to_url = ${b.dev_to_url}, display_order = ${b.display_order ?? 0}
      WHERE id = ${b.id}
    `;
    res.status(200).json({ ok: true });
    return;
  }

  if (req.method === 'DELETE') {
    const id = (req.query.id as string) || (req.body as { id?: string } | undefined)?.id;
    if (!id) {
      res.status(400).json({ error: 'id is required' });
      return;
    }
    await sql`DELETE FROM blog_posts WHERE id = ${id}`;
    res.status(200).json({ ok: true });
    return;
  }

  res.status(405).json({ error: 'Method not allowed' });
}
