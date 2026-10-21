# Admin backend setup (Vercel Postgres / Neon)

This covers the one-time setup needed to make the admin panel actually work.
Everything in the codebase is already written — what's left are steps that
require your own Vercel account access.

## 1. Create the database

1. Go to your project on [vercel.com](https://vercel.com) → **Storage** tab.
2. Create a database. Vercel's Postgres offering now runs on **Neon** — you'll
   see it listed as a Neon integration, not literally "Vercel Postgres"
   anymore. That's expected; it's the same thing the name just changed.
3. Connect it to this project when prompted.

## 2. Link your local checkout to the Vercel project

```sh
npx vercel login
npx vercel link             # run inside this repo, follow the prompts
npx vercel env pull .env.local
```

(Using `npx` instead of a global `npm install -g vercel` avoids the
`EACCES`/permission-denied error that command often hits on macOS, since it
doesn't need to write into a root-owned global `node_modules`. If you'd
rather have a persistent `vercel` command instead of typing `npx` each time,
fix the underlying npm permissions — see
[docs.npmjs.com/resolving-eacces-permissions-errors](https://docs.npmjs.com/resolving-eacces-permissions-errors-when-installing-packages-globally) —
rather than using `sudo npm install -g`, which tends to create more
permission problems later.)

That last command writes `.env.local` with the database connection string
(`DATABASE_URL` or `POSTGRES_URL`) pulled from your Vercel project. This file
is already gitignored — it will never be committed.

## 3. Generate your admin credentials

Pick the email you'll log in with and a strong password, then:

```sh
npm run auth:hash -- "your-chosen-password"
```

This prints an `ADMIN_PASSWORD_HASH` value. The plaintext password is never
stored anywhere — only this hash is, and only the hash is what the login API
compares against.

Also generate a random session-signing secret:

```sh
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

## 4. Set environment variables

Add these in **Vercel → Project Settings → Environment Variables** (and to
`.env.local` for local testing with `npx vercel dev`):

| Variable | Value |
|---|---|
| `ADMIN_EMAIL` | the email you chose in step 3 |
| `ADMIN_PASSWORD_HASH` | the hash printed in step 3 |
| `JWT_SECRET` | the random hex string from step 3 |

`DATABASE_URL`/`POSTGRES_URL` is already set — Vercel added it automatically
when you connected the database in step 1.

## 5. Create tables and seed initial content

```sh
npm run db:seed
```

This creates all the tables (if they don't already exist) and populates them
with the content currently in `src/data/mockData.ts` — so the site isn't
empty the first time it reads from the database. Safe to re-run; it upserts
rather than duplicating rows.

## 6. Test locally

Plain `npm run dev` **will not run the `/api` routes** — Vite's dev server
just serves their raw source as text, it doesn't execute them as serverless
functions. To actually exercise the admin login and API routes locally, use:

```sh
npx vercel dev
```

Then visit `/admin/login`, sign in with the email/password from step 3, and
confirm you can edit a project/skill/About Me and see it persist after a
refresh.

## 7. Deploy

Push to your connected branch (or `npx vercel --prod`). The environment
variables you set in step 4 apply automatically; nothing else to configure.

## 8. Contact form (Resend)

The "Get In Touch" form on the homepage posts to `api/contact.ts`, which
sends the message via [Resend](https://resend.com).

1. Sign up at [resend.com](https://resend.com) (free tier, no card needed)
   and create an API key under **API Keys**.
2. Add these environment variables (same place as step 4):

   | Variable | Value |
   |---|---|
   | `RESEND_API_KEY` | the key from resend.com |
   | `CONTACT_TO_EMAIL` | the inbox that should receive contact messages (falls back to `ADMIN_EMAIL` if unset) |

3. The endpoint sends from Resend's shared `onboarding@resend.dev` address,
   which works immediately with no DNS setup — fine for receiving your own
   contact-form mail. If you verify a custom domain in the Resend dashboard
   later, update the `from` address in `api/contact.ts` to use it.

---

## What's actually protected, and how

- `ProtectedRoute` / `AuthContext` on the frontend are **UI convenience
  only** — they decide what to render, nothing more.
- The real boundary is server-side: every write endpoint
  (`api/skills.ts`, `api/projects.ts`, `api/about-me.ts`) calls
  `requireAuth()` from `api/_lib/auth.ts`, which verifies a signed,
  httpOnly, `sameSite=strict` session cookie before touching the database.
  A request without a valid cookie gets a 401, regardless of what the
  client claims.
- `api/admin/login.ts` rate-limits repeated attempts per IP (10 per 15
  minutes) to raise the cost of brute-forcing the password.
- Public `GET` endpoints (reading projects/skills/etc. for the live site)
  need no auth — only the write paths do.

## Extending this to the remaining content types

`blog-posts.ts`, `events.ts`, `certifications.ts`, `education.ts`, and
`work-experience.ts` are currently **read-only** — there's no admin UI for
them yet (only Projects, Skills, and About Me have edit screens today).
To add one, follow the exact pattern in `api/skills.ts` (GET public,
POST/PUT/DELETE behind `requireAuth`) and `src/pages/admin/Skills.tsx`
(fetch/create/update/delete calls) for both the API and the admin page.
