// Adds the site_settings table and inserts defaults. Unlike db/seed.mjs this
// never touches existing content tables, and it never overwrites a value that
// has already been saved (ON CONFLICT DO NOTHING), so it is safe to re-run.
//
// Usage: npm run db:migrate-settings

import { config } from 'dotenv';
import { neon } from '@neondatabase/serverless';

config({ path: '.env.local' });

const connectionString = process.env.DATABASE_URL || process.env.POSTGRES_URL;
if (!connectionString) {
  console.error('\nDATABASE_URL is not set. See BACKEND_SETUP.md.\n');
  process.exit(1);
}

const sql = neon(connectionString, { fullResults: true });

const defaults = [
  ['theme', 'nebula'],
  ['hero_title', 'INNOVATE'],
  ['hero_highlight', 'ITERATE & INSPIRE'],
  ['hero_subtitle', 'Crafting data-driven, immersive experiences across the cloud, AI/ML, and human-centered design. Welcome to my portfolio.'],
  ['hero_image_url', '/femaleprogrammer.png'],
  ['about_title', ''],
  ['about_image_url', ''],
];

async function main() {
  await sql.query(`
    CREATE TABLE IF NOT EXISTS site_settings (
      key TEXT PRIMARY KEY,
      value TEXT NOT NULL DEFAULT '',
      updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
    )
  `);
  for (const [key, value] of defaults) {
    await sql.query(
      'INSERT INTO site_settings (key, value) VALUES ($1, $2) ON CONFLICT (key) DO NOTHING',
      [key, value]
    );
  }
  console.log('site_settings table ready with defaults.');
}

main().catch((err) => {
  console.error('Migration failed:', err);
  process.exit(1);
});
