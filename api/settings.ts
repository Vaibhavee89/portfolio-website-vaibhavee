import type { VercelRequest, VercelResponse } from '@vercel/node';
import { sql } from './_lib/db.js';
import { requireAuth } from './_lib/auth.js';

// Keep in sync with src/lib/themes.ts. The server re-checks the theme id so a
// bad value can't be saved even if someone bypasses the admin form.
const THEME_IDS = ['nebula', 'sunset', 'emerald', 'violet'];

// Only these keys can be written. Anything else in the request body is ignored.
const ALLOWED_KEYS = [
  'theme',
  'hero_title',
  'hero_highlight',
  'hero_subtitle',
  'hero_image_url',
  'about_title',
  'about_image_url',
] as const;

type SettingKey = (typeof ALLOWED_KEYS)[number];

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'GET') {
    const { rows } = await sql`SELECT key, value FROM site_settings`;
    const settings: Record<string, string> = {};
    for (const row of rows) settings[row.key] = row.value;
    res.status(200).json(settings);
    return;
  }

  if (req.method === 'PUT') {
    if (requireAuth(req, res)) return;

    const body = (req.body ?? {}) as Record<string, unknown>;

    if (body.theme !== undefined && !THEME_IDS.includes(String(body.theme))) {
      res.status(400).json({ error: 'Unknown theme' });
      return;
    }

    for (const key of ALLOWED_KEYS) {
      if (body[key] === undefined) continue;
      const value = String(body[key] ?? '').slice(0, 500);
      await sql`
        INSERT INTO site_settings (key, value, updated_at)
        VALUES (${key as SettingKey}, ${value}, now())
        ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value, updated_at = now()
      `;
    }

    res.status(200).json({ ok: true });
    return;
  }

  res.status(405).json({ error: 'Method not allowed' });
}
