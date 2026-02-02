-- About Me Section Database Schema V2 - Dynamic Highlights
-- Execute this SQL in your Supabase SQL Editor

-- Drop old table if exists (backup data first if needed!)
DROP TABLE IF EXISTS about_me CASCADE;

-- About Me table with dynamic highlights
CREATE TABLE IF NOT EXISTS about_me (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL DEFAULT 'A passionate technologist',
  description TEXT NOT NULL,
  image_url TEXT DEFAULT '/MyImage.png',
  highlights JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Insert default About Me content with highlights array
INSERT INTO about_me (
  title,
  description,
  image_url,
  highlights
) VALUES (
  'A passionate technologist',
  'I am a BTech 4th year student passionate about research and specializing in Cloud Computing, AI/ML, Deep Learning and Computer Vision. I love transforming ideas into impactful solutions, whether it''s developing AI-powered applications, writing research papers, or contributing to meaningful projects. My goal is to bridge the gap between research and real-world applications, constantly pushing the boundaries of technology.',
  '/MyImage.png',
  '[
    {
      "id": "1",
      "title": "AI, Cloud & Research",
      "description": "Bridging intelligent systems with real-world impact.",
      "order": 0
    },
    {
      "id": "2",
      "title": "Continuous learning",
      "description": "Driven by collaboration, innovation, and community initiatives.",
      "order": 1
    }
  ]'::jsonb
)
ON CONFLICT DO NOTHING;

-- Enable RLS
ALTER TABLE about_me ENABLE ROW LEVEL SECURITY;

-- Policy: Allow public read access
CREATE POLICY "Allow public read access to about_me"
  ON about_me
  FOR SELECT
  TO public
  USING (true);

-- Policy: Allow authenticated users to update
CREATE POLICY "Allow authenticated users to update about_me"
  ON about_me
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create trigger to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_about_me_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_about_me_timestamp
BEFORE UPDATE ON about_me
FOR EACH ROW
EXECUTE FUNCTION update_about_me_updated_at();
