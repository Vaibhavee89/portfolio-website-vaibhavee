import type { VercelRequest, VercelResponse } from '@vercel/node';
import { sql } from './_lib/db.js';
import { requireAuth } from './_lib/auth.js';

interface WorkExperienceInput {
  id: string;
  title: string;
  organisation: string;
  period: string;
  badge: string;
  description: string;
  display_order?: number;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'GET') {
    const { rows } = await sql`SELECT * FROM work_experience ORDER BY display_order ASC`;
    res.status(200).json(rows);
    return;
  }

  // Everything below changes data — require a valid admin session.
  if (requireAuth(req, res)) return;

  if (req.method === 'POST') {
    const w = (req.body ?? {}) as WorkExperienceInput;
    if (!w.id || !w.title || !w.organisation || !w.period || !w.description) {
      res.status(400).json({ error: 'id, title, organisation, period and description are required' });
      return;
    }
    await sql`
      INSERT INTO work_experience (id, title, organisation, period, badge, description, display_order)
      VALUES (${w.id}, ${w.title}, ${w.organisation}, ${w.period}, ${w.badge || ''},
              ${w.description}, ${w.display_order ?? 0})
    `;
    res.status(201).json({ ok: true });
    return;
  }

  if (req.method === 'PUT') {
    const w = (req.body ?? {}) as WorkExperienceInput;
    if (!w.id) {
      res.status(400).json({ error: 'id is required' });
      return;
    }
    await sql`
      UPDATE work_experience SET
        title = ${w.title}, organisation = ${w.organisation}, period = ${w.period},
        badge = ${w.badge || ''}, description = ${w.description}, display_order = ${w.display_order ?? 0}
      WHERE id = ${w.id}
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
    await sql`DELETE FROM work_experience WHERE id = ${id}`;
    res.status(200).json({ ok: true });
    return;
  }

  res.status(405).json({ error: 'Method not allowed' });
}
