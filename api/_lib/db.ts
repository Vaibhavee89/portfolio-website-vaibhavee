import { neon } from '@neondatabase/serverless';

// Vercel's Postgres storage now provisions through Neon. The connection
// string lands in DATABASE_URL (Neon's own convention) or POSTGRES_URL
// (Vercel's older naming) depending on how the integration was set up —
// support both so this doesn't break based on which env var your project
// ended up with.
const connectionString = process.env.DATABASE_URL || process.env.POSTGRES_URL;

if (!connectionString) {
  throw new Error(
    'DATABASE_URL (or POSTGRES_URL) is not set. Add your Neon/Postgres connection string in Vercel project settings, or in .env.local for local dev.'
  );
}

// fullResults: true makes sql`...` resolve to { rows, fields, ... } instead
// of a bare array, matching the shape the route handlers below use.
export const sql = neon(connectionString, { fullResults: true });
