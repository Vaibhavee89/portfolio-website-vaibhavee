-- SIMPLE RLS FIX - Run this in Supabase SQL Editor
-- This allows ANY authenticated user to write to tables
-- More secure version checks admin_users table

-- Drop existing policies
DROP POLICY IF EXISTS "Admin write access" ON projects;
DROP POLICY IF EXISTS "Admin write access" ON project_images;
DROP POLICY IF EXISTS "Admin write access" ON skills;
DROP POLICY IF EXISTS "Admin write access" ON certifications;
DROP POLICY IF EXISTS "Admin write access" ON education;
DROP POLICY IF EXISTS "Admin write access" ON work_experience;
DROP POLICY IF EXISTS "Admin write access" ON blog_posts;
DROP POLICY IF EXISTS "Admin write access" ON events;
DROP POLICY IF EXISTS "Admin write access" ON site_settings;

-- Create simple policies - any authenticated user can write
CREATE POLICY "Authenticated write access" ON projects 
FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated write access" ON project_images 
FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated write access" ON skills 
FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated write access" ON certifications 
FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated write access" ON education 
FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated write access" ON work_experience 
FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated write access" ON blog_posts 
FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated write access" ON events 
FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated write access" ON site_settings 
FOR ALL USING (auth.role() = 'authenticated');
