import type { VercelRequest, VercelResponse } from '@vercel/node';
import { sql } from './_lib/db.js';
import { requireAuth } from './_lib/auth.js';

interface EducationInput {
  id: string;
  title: string;
  period: string;
  description: string;
  display_order?: number;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'GET') {
    const { rows } = await sql`SELECT * FROM education ORDER BY display_order ASC`;
    res.status(200).json(rows);
    return;
  }

  // Everything below changes data — require a valid admin session.
  if (requireAuth(req, res)) return;

  if (req.method === 'POST') {
    const e = (req.body ?? {}) as EducationInput;
    if (!e.id || !e.title || !e.period || !e.description) {
      res.status(400).json({ error: 'id, title, period and description are required' });
      return;
    }
    await sql`
      INSERT INTO education (id, title, period, description, display_order)
      VALUES (${e.id}, ${e.title}, ${e.period}, ${e.description}, ${e.display_order ?? 0})
    `;
    res.status(201).json({ ok: true });
    return;
  }

  if (req.method === 'PUT') {
    const e = (req.body ?? {}) as EducationInput;
    if (!e.id) {
      res.status(400).json({ error: 'id is required' });
      return;
    }
    await sql`
      UPDATE education SET
        title = ${e.title}, period = ${e.period}, description = ${e.description},
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
    await sql`DELETE FROM education WHERE id = ${id}`;
    res.status(200).json({ ok: true });
    return;
  }

  res.status(405).json({ error: 'Method not allowed' });
}
