import type { VercelRequest, VercelResponse } from '@vercel/node';
import { sql } from './_lib/db.js';
import { requireAuth } from './_lib/auth.js';

interface EventInput {
  id: string;
  image_url: string;
  alt_text: string;
  caption: string;
  display_order?: number;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'GET') {
    const { rows } = await sql`SELECT * FROM events ORDER BY display_order ASC`;
    res.status(200).json(rows);
    return;
  }

  // Everything below changes data — require a valid admin session.
  if (requireAuth(req, res)) return;

  if (req.method === 'POST') {
    const e = (req.body ?? {}) as EventInput;
    if (!e.id || !e.image_url || !e.alt_text || !e.caption) {
      res.status(400).json({ error: 'id, image_url, alt_text and caption are required' });
      return;
    }
    await sql`
      INSERT INTO events (id, image_url, alt_text, caption, display_order)
      VALUES (${e.id}, ${e.image_url}, ${e.alt_text}, ${e.caption}, ${e.display_order ?? 0})
    `;
    res.status(201).json({ ok: true });
    return;
  }

  if (req.method === 'PUT') {
    const e = (req.body ?? {}) as EventInput;
    if (!e.id) {
      res.status(400).json({ error: 'id is required' });
      return;
    }
    await sql`
      UPDATE events SET
        image_url = ${e.image_url}, alt_text = ${e.alt_text}, caption = ${e.caption},
        display_order = ${e.display_order ?? 0}
      WHERE id = ${e.id}
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
    await sql`DELETE FROM events WHERE id = ${id}`;
    res.status(200).json({ ok: true });
    return;
  }

  res.status(405).json({ error: 'Method not allowed' });
}
