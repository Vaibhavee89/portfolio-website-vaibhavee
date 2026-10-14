import type { VercelRequest, VercelResponse } from '@vercel/node';
import { sql } from './_lib/db.js';
import { requireAuth } from './_lib/auth.js';

interface CertificationInput {
  id: string;
  name: string;
  issuer: string;
  date?: string | null;
  icon_name?: string | null;
  credential_url?: string | null;
  description?: string | null;
  display_order?: number;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'GET') {
    const { rows } = await sql`SELECT * FROM certifications ORDER BY display_order ASC`;
    res.status(200).json(rows);
    return;
  }

  // Everything below changes data — require a valid admin session.
  if (requireAuth(req, res)) return;

  if (req.method === 'POST') {
    const c = (req.body ?? {}) as CertificationInput;
    if (!c.id || !c.name || !c.issuer) {
      res.status(400).json({ error: 'id, name and issuer are required' });
      return;
    }
    await sql`
      INSERT INTO certifications (id, name, issuer, date, icon_name, credential_url, description, display_order)
      VALUES (${c.id}, ${c.name}, ${c.issuer}, ${c.date ?? null}, ${c.icon_name || 'Award'},
              ${c.credential_url ?? null}, ${c.description ?? null}, ${c.display_order ?? 0})
    `;
    res.status(201).json({ ok: true });
    return;
  }

  if (req.method === 'PUT') {
    const c = (req.body ?? {}) as CertificationInput;
    if (!c.id) {
      res.status(400).json({ error: 'id is required' });
      return;
    }
    await sql`
      UPDATE certifications SET
        name = ${c.name}, issuer = ${c.issuer}, date = ${c.date ?? null},
        icon_name = ${c.icon_name || 'Award'}, credential_url = ${c.credential_url ?? null},
        description = ${c.description ?? null}, display_order = ${c.display_order ?? 0}
      WHERE id = ${c.id}
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
    await sql`DELETE FROM certifications WHERE id = ${id}`;
    res.status(200).json({ ok: true });
    return;
  }

  res.status(405).json({ error: 'Method not allowed' });
}
