-- Admin Panel Database Schema for Portfolio Website
-- Execute this SQL in your Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Admin users table
CREATE TABLE IF NOT EXISTS admin_users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Projects table
CREATE TABLE IF NOT EXISTS projects (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  full_description TEXT,
  image_url TEXT,
  tags TEXT[] NOT NULL DEFAULT '{}',
  live_link TEXT,
  github_link TEXT,
  display_order INTEGER DEFAULT 0,
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Project images table (for multiple images per project)
CREATE TABLE IF NOT EXISTS project_images (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id TEXT REFERENCES projects(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Skills table
CREATE TABLE IF NOT EXISTS skills (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  icon_name TEXT NOT NULL,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Certifications table
CREATE TABLE IF NOT EXISTS certifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  issuer TEXT NOT NULL,
  date TEXT NOT NULL,
  icon_name TEXT NOT NULL,
  credential_url TEXT,
  description TEXT,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Education table
CREATE TABLE IF NOT EXISTS education (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  period TEXT NOT NULL,
  description TEXT NOT NULL,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Work experience table
CREATE TABLE IF NOT EXISTS work_experience (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  organisation TEXT NOT NULL,
  period TEXT NOT NULL,
  badge TEXT NOT NULL,
  description TEXT NOT NULL,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Blog posts table
CREATE TABLE IF NOT EXISTS blog_posts (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  excerpt TEXT NOT NULL,
  date TEXT NOT NULL,
  read_time TEXT NOT NULL,
  dev_to_url TEXT NOT NULL,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Events table
CREATE TABLE IF NOT EXISTS events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  image_url TEXT NOT NULL,
  alt_text TEXT NOT NULL,
  caption TEXT NOT NULL,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Site settings table (for contact info, etc.)
CREATE TABLE IF NOT EXISTS site_settings (
  key TEXT PRIMARY KEY,
  value JSONB NOT NULL,
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Enable Row Level Security on all tables
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE certifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE education ENABLE ROW LEVEL SECURITY;
ALTER TABLE work_experience ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

-- Public read access policies
CREATE POLICY "Public read access" ON projects FOR SELECT USING (true);
CREATE POLICY "Public read access" ON project_images FOR SELECT USING (true);
CREATE POLICY "Public read access" ON skills FOR SELECT USING (true);
CREATE POLICY "Public read access" ON certifications FOR SELECT USING (true);
CREATE POLICY "Public read access" ON education FOR SELECT USING (true);
CREATE POLICY "Public read access" ON work_experience FOR SELECT USING (true);
CREATE POLICY "Public read access" ON blog_posts FOR SELECT USING (true);
CREATE POLICY "Public read access" ON events FOR SELECT USING (true);
CREATE POLICY "Public read access" ON site_settings FOR SELECT USING (true);

-- Authenticated admin write access policies
CREATE POLICY "Admin write access" ON projects FOR ALL USING (
  auth.uid() IN (SELECT id FROM admin_users WHERE email = auth.jwt() ->> 'email')
);

CREATE POLICY "Admin write access" ON project_images FOR ALL USING (
  auth.uid() IN (SELECT id FROM admin_users WHERE email = auth.jwt() ->> 'email')
);

CREATE POLICY "Admin write access" ON skills FOR ALL USING (
  auth.uid() IN (SELECT id FROM admin_users WHERE email = auth.jwt() ->> 'email')
);

CREATE POLICY "Admin write access" ON certifications FOR ALL USING (
  auth.uid() IN (SELECT id FROM admin_users WHERE email = auth.jwt() ->> 'email')
);

CREATE POLICY "Admin write access" ON education FOR ALL USING (
  auth.uid() IN (SELECT id FROM admin_users WHERE email = auth.jwt() ->> 'email')
);

CREATE POLICY "Admin write access" ON work_experience FOR ALL USING (
  auth.uid() IN (SELECT id FROM admin_users WHERE email = auth.jwt() ->> 'email')
);

CREATE POLICY "Admin write access" ON blog_posts FOR ALL USING (
  auth.uid() IN (SELECT id FROM admin_users WHERE email = auth.jwt() ->> 'email')
);

CREATE POLICY "Admin write access" ON events FOR ALL USING (
  auth.uid() IN (SELECT id FROM admin_users WHERE email = auth.jwt() ->> 'email')
);

CREATE POLICY "Admin write access" ON site_settings FOR ALL USING (
  auth.uid() IN (SELECT id FROM admin_users WHERE email = auth.jwt() ->> 'email')
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_projects_display_order ON projects(display_order);
CREATE INDEX IF NOT EXISTS idx_project_images_project_id ON project_images(project_id);
CREATE INDEX IF NOT EXISTS idx_skills_display_order ON skills(display_order);
CREATE INDEX IF NOT EXISTS idx_certifications_display_order ON certifications(display_order);
CREATE INDEX IF NOT EXISTS idx_education_display_order ON education(display_order);
CREATE INDEX IF NOT EXISTS idx_work_experience_display_order ON work_experience(display_order);
CREATE INDEX IF NOT EXISTS idx_blog_posts_display_order ON blog_posts(display_order);
CREATE INDEX IF NOT EXISTS idx_events_display_order ON events(display_order);

-- Insert admin user (replace with your email)
INSERT INTO admin_users (email) VALUES ('vaibhaveesingh89@gmail.com')
ON CONFLICT (email) DO NOTHING;
