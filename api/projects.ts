import type { VercelRequest, VercelResponse } from '@vercel/node';
import { sql } from './_lib/db.js';
import { requireAuth } from './_lib/auth.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'GET') {
    const id = req.query.id as string | undefined;
    if (id) {
      const { rows } = await sql`SELECT * FROM projects WHERE id = ${id}`;
      if (rows.length === 0) {
        res.status(404).json({ error: 'Project not found' });
        return;
      }
      res.status(200).json(rows[0]);
      return;
    }
    const { rows } = await sql`SELECT * FROM projects ORDER BY display_order ASC`;
    res.status(200).json(rows);
    return;
  }

  if (requireAuth(req, res)) return;

  if (req.method === 'POST') {
    const p = (req.body ?? {}) as {
      id: string; title: string; description: string; full_description?: string | null;
      image_url?: string | null; tags: string[]; live_link?: string | null;
      github_link?: string | null; display_order?: number; featured?: boolean;
    };
    if (!p.id || !p.title || !p.description) {
      res.status(400).json({ error: 'id, title and description are required' });
      return;
    }
    await sql`
      INSERT INTO projects (id, title, description, full_description, image_url, tags, live_link, github_link, display_order, featured)
      VALUES (${p.id}, ${p.title}, ${p.description}, ${p.full_description ?? null}, ${p.image_url ?? null},
              ${p.tags ?? []}, ${p.live_link ?? null}, ${p.github_link ?? null}, ${p.display_order ?? 0}, ${p.featured ?? false})
    `;
    res.status(201).json({ ok: true });
    return;
  }

  if (req.method === 'PUT') {
    const p = (req.body ?? {}) as {
      id: string; title: string; description: string; full_description?: string | null;
      image_url?: string | null; tags: string[]; live_link?: string | null;
      github_link?: string | null; display_order?: number; featured?: boolean;
    };
    if (!p.id) {
      res.status(400).json({ error: 'id is required' });
      return;
    }
    await sql`
      UPDATE projects SET
        title = ${p.title}, description = ${p.description}, full_description = ${p.full_description ?? null},
        image_url = ${p.image_url ?? null}, tags = ${p.tags ?? []}, live_link = ${p.live_link ?? null},
        github_link = ${p.github_link ?? null}, display_order = ${p.display_order ?? 0}, featured = ${p.featured ?? false}
      WHERE id = ${p.id}
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
    await sql`DELETE FROM projects WHERE id = ${id}`;
    res.status(200).json({ ok: true });
    return;
  }

  res.status(405).json({ error: 'Method not allowed' });
}
