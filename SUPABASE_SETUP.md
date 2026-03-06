# Supabase Project Setup Guide

Your portfolio website needs a new Supabase project. Follow these steps:

## Step 1: Create New Supabase Project

1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Click "New Project"
3. Fill in:
   - **Name**: `portfolio-website` (or any name you prefer)
   - **Database Password**: Create a strong password (save it!)
   - **Region**: Choose closest to your location
4. Wait 2-3 minutes for project to be ready

## Step 2: Get Your Credentials

1. Once project is ready, go to **Settings** → **API**
2. Copy these values:
   - **Project URL** (looks like: `https://xxxxx.supabase.co`)
   - **anon/public key** (under "Project API keys")

3. Update your `.env` file:
```bash
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key_here
```

## Step 3: Set Up Database Schema

Go to **SQL Editor** in your Supabase dashboard and run these SQL scripts **in order**:

### 3.1 Main Schema (Run this first)
Copy and paste the entire content from: `supabase/schema_with_data.sql`

This creates:
- projects table
- skills table
- blog_posts table
- events table
- certifications table
- education table
- work_experience table

### 3.2 About Me Section (Run this second)
Copy and paste the entire content from: `supabase/about_me_schema_v2.sql`

This creates:
- about_me table with highlights

### 3.3 RLS Policies Fix (Run this third)
Copy and paste the entire content from: `supabase/simple_rls_fix.sql`

This ensures proper security policies.

## Step 4: Verify Setup

1. Restart your dev server:
```bash
# Stop the current server (Ctrl+C)
npm run dev
```

2. Check browser console - no more errors!
3. Your content should now load properly

## Step 5: Admin Panel Access

The admin login credentials might need to be set up in Supabase Authentication:
1. Go to **Authentication** → **Users**
2. Click "Add user"
3. Create an admin account (email + password)

## Optional: Knowledge Base (For Chat Assistant)

If you want to re-enable the chat assistant later:
- Run: `supabase/knowledge_base_schema.sql`
- This creates vector embeddings support

---

## Quick Troubleshooting

**Still seeing "No content available"?**
- Check browser console for errors
- Verify .env variables are correct
- Restart dev server after changing .env

**Tables not appearing?**
- Make sure you ran all SQL scripts
- Check for errors in SQL Editor output
