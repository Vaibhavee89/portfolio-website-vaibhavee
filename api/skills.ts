import type { VercelRequest, VercelResponse } from '@vercel/node';
import { sql } from './_lib/db';
import { requireAuth } from './_lib/auth';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'GET') {
    const { rows } = await sql`SELECT * FROM skills ORDER BY display_order ASC`;
    res.status(200).json(rows);
    return;
  }

  // Everything below mutates data — require a valid session.
  if (requireAuth(req, res)) return;

  if (req.method === 'POST') {
    const { id, name, icon_name, display_order } = (req.body ?? {}) as {
      id: string; name: string; icon_name: string; display_order: number;
    };
    if (!id || !name || !icon_name) {
      res.status(400).json({ error: 'id, name and icon_name are required' });
      return;
    }
    await sql`
      INSERT INTO skills (id, name, icon_name, display_order)
      VALUES (${id}, ${name}, ${icon_name}, ${display_order ?? 0})
    `;
    res.status(201).json({ ok: true });
    return;
  }

  if (req.method === 'PUT') {
    const { id, name, icon_name, display_order } = (req.body ?? {}) as {
      id: string; name: string; icon_name: string; display_order: number;
    };
    if (!id) {
      res.status(400).json({ error: 'id is required' });
      return;
    }
    await sql`
      UPDATE skills SET name = ${name}, icon_name = ${icon_name}, display_order = ${display_order ?? 0}
      WHERE id = ${id}
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
    await sql`DELETE FROM skills WHERE id = ${id}`;
    res.status(200).json({ ok: true });
    return;
  }

  res.status(405).json({ error: 'Method not allowed' });
}
