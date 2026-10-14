import type { VercelRequest, VercelResponse } from '@vercel/node';
import { sql } from './_lib/db.js';
import { requireAuth } from './_lib/auth.js';

interface HighlightInput {
  id: string;
  title: string;
  description: string;
  order: number;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'GET') {
    const aboutRows = await sql`SELECT * FROM about_me WHERE id = '1'`;
    const about = aboutRows.rows[0];
    if (!about) {
      res.status(404).json({ error: 'About Me content not found — has the database been seeded?' });
      return;
    }
    const highlightRows = await sql`SELECT * FROM about_me_highlights ORDER BY display_order ASC`;
    res.status(200).json({
      id: about.id,
      title: about.title,
      description: about.description,
      image_url: about.image_url,
      created_at: about.created_at,
      updated_at: about.updated_at,
      highlights: highlightRows.rows.map((h) => ({
        id: h.id,
        title: h.title,
        description: h.description,
        order: h.display_order,
      })),
    });
    return;
  }

  if (req.method === 'PUT') {
    if (requireAuth(req, res)) return;

    const { title, description, image_url, highlights } = (req.body ?? {}) as {
      title: string;
      description: string;
      image_url: string;
      highlights: HighlightInput[];
    };

    if (!title || !description || !image_url) {
      res.status(400).json({ error: 'title, description and image_url are required' });
      return;
    }

    await sql`
      UPDATE about_me
      SET title = ${title}, description = ${description}, image_url = ${image_url}, updated_at = now()
      WHERE id = '1'
    `;

    await sql`DELETE FROM about_me_highlights`;
    for (const h of highlights ?? []) {
      await sql`
        INSERT INTO about_me_highlights (id, title, description, display_order)
        VALUES (${h.id}, ${h.title}, ${h.description}, ${h.order})
      `;
    }

    res.status(200).json({ ok: true });
    return;
  }

  res.status(405).json({ error: 'Method not allowed' });
}
