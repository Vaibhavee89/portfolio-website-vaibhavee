-- Fix RLS Policies for Admin Write Access
-- Run this in Supabase SQL Editor to fix the delete/update permissions

-- Drop existing admin write policies
DROP POLICY IF EXISTS "Admin write access" ON projects;
DROP POLICY IF EXISTS "Admin write access" ON project_images;
DROP POLICY IF EXISTS "Admin write access" ON skills;
DROP POLICY IF EXISTS "Admin write access" ON certifications;
DROP POLICY IF EXISTS "Admin write access" ON education;
DROP POLICY IF EXISTS "Admin write access" ON work_experience;
DROP POLICY IF EXISTS "Admin write access" ON blog_posts;
DROP POLICY IF EXISTS "Admin write access" ON events;
DROP POLICY IF EXISTS "Admin write access" ON site_settings;

-- Create corrected admin write access policies
-- These check if the authenticated user's email exists in admin_users table

CREATE POLICY "Admin write access" ON projects FOR ALL 
USING (
  EXISTS (
    SELECT 1 FROM admin_users 
    WHERE email = auth.jwt() ->> 'email'
  )
);

CREATE POLICY "Admin write access" ON project_images FOR ALL 
USING (
  EXISTS (
    SELECT 1 FROM admin_users 
    WHERE email = auth.jwt() ->> 'email'
  )
);

CREATE POLICY "Admin write access" ON skills FOR ALL 
USING (
  EXISTS (
    SELECT 1 FROM admin_users 
    WHERE email = auth.jwt() ->> 'email'
  )
);

CREATE POLICY "Admin write access" ON certifications FOR ALL 
USING (
  EXISTS (
    SELECT 1 FROM admin_users 
    WHERE email = auth.jwt() ->> 'email'
  )
);

CREATE POLICY "Admin write access" ON education FOR ALL 
USING (
  EXISTS (
    SELECT 1 FROM admin_users 
    WHERE email = auth.jwt() ->> 'email'
  )
);

CREATE POLICY "Admin write access" ON work_experience FOR ALL 
USING (
  EXISTS (
    SELECT 1 FROM admin_users 
    WHERE email = auth.jwt() ->> 'email'
  )
);

CREATE POLICY "Admin write access" ON blog_posts FOR ALL 
USING (
  EXISTS (
    SELECT 1 FROM admin_users 
    WHERE email = auth.jwt() ->> 'email'
  )
);

CREATE POLICY "Admin write access" ON events FOR ALL 
USING (
  EXISTS (
    SELECT 1 FROM admin_users 
    WHERE email = auth.jwt() ->> 'email'
  )
);

CREATE POLICY "Admin write access" ON site_settings FOR ALL 
USING (
  EXISTS (
    SELECT 1 FROM admin_users 
    WHERE email = auth.jwt() ->> 'email'
  )
);
