-- Admin Panel Database Schema with Initial Data Migration
-- Execute this SQL in your Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Drop existing tables if they exist (for clean migration)
DROP TABLE IF EXISTS project_images CASCADE;
DROP TABLE IF EXISTS projects CASCADE;
DROP TABLE IF EXISTS skills CASCADE;
DROP TABLE IF EXISTS certifications CASCADE;
DROP TABLE IF EXISTS education CASCADE;
DROP TABLE IF EXISTS work_experience CASCADE;
DROP TABLE IF EXISTS blog_posts CASCADE;
DROP TABLE IF EXISTS events CASCADE;
DROP TABLE IF EXISTS site_settings CASCADE;
DROP TABLE IF EXISTS admin_users CASCADE;

-- Admin users table
CREATE TABLE admin_users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Projects table
CREATE TABLE projects (
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

-- Project images table
CREATE TABLE project_images (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id TEXT REFERENCES projects(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Skills table
CREATE TABLE skills (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  icon_name TEXT NOT NULL,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Certifications table
CREATE TABLE certifications (
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
CREATE TABLE education (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  period TEXT NOT NULL,
  description TEXT NOT NULL,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Work experience table
CREATE TABLE work_experience (
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
CREATE TABLE blog_posts (
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
CREATE TABLE events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  image_url TEXT NOT NULL,
  alt_text TEXT NOT NULL,
  caption TEXT NOT NULL,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Site settings table
CREATE TABLE site_settings (
  key TEXT PRIMARY KEY,
  value JSONB NOT NULL,
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Insert admin user
INSERT INTO admin_users (email) VALUES ('vaibhaveesingh89@gmail.com');

-- Insert Projects
INSERT INTO projects (id, title, description, full_description, image_url, tags, live_link, github_link, display_order, featured) VALUES
('1', 'Portfolio-Website', 'This portfolio website serves as a personal space to highlight my achievements, projects, and professional journey.', 'This portfolio website serves as a personal space to highlight my achievements, projects, and professional journey. Built with modern technologies, it ensures a smooth and visually appealing user experience.', '/PortfolioProject(2).png', ARRAY['Portfolio', 'skills'], 'https://portfolio-website-vaibhavee.vercel.app/', 'https://github.com/Vaibhavee89/portfolio-website-vaibhavee', 0, true),
('2', 'QuizWhiz', 'A fast and interactive quiz app with a wide range of categories and questions.', 'Welcome to QuizWhiz, a fast and interactive trivia quiz app that pulls questions from Trivia API and provides instant feedback!', '/TriviaQuiz.png', ARRAY['Quiz', 'TriviaChallenge'], 'https://quiz-whiz-red.vercel.app/', 'https://github.com/Vaibhavee89/QuizWhiz', 1, false),
('3', 'Short.ly', 'A URL shortening service that provides detailed analytics and custom short links.', 'Short.ly is a simple API that shortens long URLs and redirects users when they access the shortened links. It is built with modern web technologies, ensuring fast performance and a seamless experience.', '/Shortly.png', ARRAY['URL', 'Shortner', 'Analytics'], 'https://short-ly-wine.vercel.app/', 'https://github.com/Vaibhavee89/Short.ly', 2, false),
('4', 'Crypto Wallet Mobile App', 'Designed a mobile app for managing cryptocurrency transactions, including wallet management and transaction history.', 'This project is a mobile application designed to manage cryptocurrency transactions, including wallet management and transaction history. The app provides a user-friendly interface for users to view their wallet balance, transaction history, and perform transactions securely.', '/Crypto.avif', ARRAY['Mobile App', 'Crypto Wallet', 'UI/UX Design'], NULL, NULL, 3, false),
('6', 'Sudoku-Solver', 'This is a simple Sudoku solver application written in C++. It takes a 9x9 Sudoku puzzle as input and solves it using a backtracking algorithm.', 'Sudoku Solver is a web application that allows users to input a Sudoku puzzle and get the solution instantly. The app uses a backtracking algorithm to solve the puzzle efficiently.', '/SudokuSolver.png', ARRAY['C++', 'Backtracking Algorithm', 'Conceptual Problem Solving'], NULL, 'https://github.com/Vaibhavee89/Sudoku-Solver', 4, false),
('7', 'Ziplyn', 'Experimental project to create a file compression and extraction utility in Rust.', 'Ziplyn is an experimental project to create a file compression and extraction utility in Rust. The application is designed to be fast, efficient, and user-friendly, with a focus on simplicity and performance.', '/Ziplyn.png', ARRAY['Rust', 'File Compression', 'File Extraction'], NULL, 'https://github.com/Vaibhavee89/Ziplyn', 5, false);

-- Insert Project Images
INSERT INTO project_images (project_id, image_url, display_order) VALUES
('1', '/PortfolioProject(2).png', 0),
('2', '/TriviaQuiz.png', 0),
('3', '/Shortly.png', 0),
('4', '/Crypto.avif', 0),
('6', '/SudokuSolver.png', 0),
('7', '/Ziplyn.png', 0);

-- Insert Skills
INSERT INTO skills (name, icon_name, display_order) VALUES
('Python', 'FileCode', 0),
('JavaScript', 'Zap', 1),
('TypeScript', 'Code', 2),
('React', 'Component', 3),
('Next.js', 'Code', 4),
('TensorFlow', 'Brain', 5),
('PyTorch', 'Brain', 6),
('Scikit-learn', 'Database', 7),
('Pandas', 'Database', 8),
('NumPy', 'Database', 9),
('NLP', 'MessageSquare', 10),
('Computer Vision', 'Smartphone', 11),
('PowerBI', 'BarChart', 12),
('Tableau', 'BarChart', 13),
('AWS', 'Cloud', 14),
('GCP', 'Cloud', 15),
('Git', 'GitBranch', 16),
('GitHub', 'Github', 17),
('Docker', 'Server', 18),
('Kubernetes', 'Server', 19),
('Jupyter', 'BookMarked', 20),
('SQL', 'Database', 21),
('NoSQL', 'Database', 22),
('HTML/CSS', 'Code', 23);

-- Insert Certifications
INSERT INTO certifications (name, issuer, date, icon_name, credential_url, description, display_order) VALUES
('AWS Cloud Practitioner', 'Amazon Web Services', 'May 2024', 'Cloud', 'https://www.credly.com/badges/8ebcbe71-30e8-4961-9c8b-4ad852f0aed5/public_url', 'Fundamental knowledge of AWS Cloud, services, and terminology. Covers security, technology, billing, pricing, and core services.', 0),
('Supervised Machine Learning: Classification', 'IBM', 'Nov 2024', 'Brain', 'https://coursera.org/share/cd753b05dce213265c899ae6cdb81d75', 'This course introduces the concept of Ensemble Learning, Machine Learning(ML) Algorithms, Supervised Learning, Classification Algorithms, Decision Tree', 1),
('Improving Deep Neural Networks: Hyperparameter Tuning, Regularization, and Optimization', 'Deeplearning.AI', 'Nov 2024', 'Brain', 'https://coursera.org/share/ec108e28939b593ac32dd1721302c122', 'This course offers skills in TensorFlow, Deep Learning, Hyperparameter turing, Mathematical Optimization', 2),
('Simulation and Modeling of Natural Processes', 'University of Geneva', 'Nov 2024', 'Award', 'https://coursera.org/share/af94e2e3392a83c452a9090e19ab3374', 'Computer Programming, Python Programming, Mathematics, Probability ans Statisctics', 3),
('The Bits and Bytes of Computer Networking', 'Google', 'Apr 2024', 'GraduationCap', 'https://coursera.org/share/64b9a6e0733428bc7eb1160be6ac745d', 'In-depth knowledge of computer networks such as Domain Name System, IP addressing, and routing.', 4),
('Introduction to Computers, Operating Systems & Security', 'Microsoft', 'Apr 2024', 'GraduationCap', 'https://coursera.org/share/adfe89cc12c35b9c0c6469869b9f72fb', 'In-depth knowledge of Operating Systems, Computer Architecture and Cloud Computing', 5),
('Foundations of User Experience (UX) Design', 'Google', 'Jul 2023', 'GraduationCap', 'https://coursera.org/share/6ea80fd2cfb6166fe1d581f173ce6735', 'Introduction to User Experience (UX), Prototype, Wireframe, User Expericence Design (UXD), UX Research', 6);

-- Insert Education
INSERT INTO education (title, period, description, display_order) VALUES
('B.Tech in Computer Science & Engineering', '2022 - 2026', 'Pursuing a bachelor''s with a focus on Artificial Intelligence, Machine Learning, Cloud Computing, and Computer Vision, building strong foundations in data structures, algorithms, and distributed systems.', 0),
('Cloud Certifications & Research', '2024', 'Completed multiple industry-recognized credentials across AWS and deep learning, applying the knowledge to practical projects and research-led initiatives.', 1),
('High School Diploma — Science with Computer Science', '2020 - 2022', 'Graduated with honors while leading technology-driven activities, laying a strong analytical and mathematical groundwork for my engineering journey.', 2);

-- Insert Work Experience
INSERT INTO work_experience (title, organisation, period, badge, description, display_order) VALUES
('Cybersecurity & Network Simulation Intern', 'Centre for Development of Advanced Computing (C-DAC)', 'Jun 2025 – Aug 2025', '25', 'Built and demonstrated network attack simulations including ping flood and unauthorized access mitigation using ACLs and firewall policies. Co-developed a Python Flask network auditing tool leveraging Nmap, Postman, and GCP services.', 0),
('Internship Trainee – Analytics & Research', 'CSIR-Central Institute of Mining and Fuel Research', 'Jul 2024 – Aug 2024', '24', 'Led sentiment analysis for educational video content and delivered dashboards capturing audience engagement insights to support strategic communication decisions.', 1),
('Research Co-head', 'WIE-IEEE, Bennett Chapter', 'Sep 2023 – May 2024', '23', 'Planned and executed research-focused initiatives, workshops, and collaborative projects that increased member participation in innovation and scholarship.', 2),
('Design Co-head', 'Bennett Cloud Computing Club & Product Design and Technology Club', 'Sep 2023 – May 2024', '23', 'Directed design strategy for cloud-centric events, enabling hands-on AWS and GCP sessions that elevated the club''s technical outreach efforts.', 3);

-- Insert Blog Posts
INSERT INTO blog_posts (id, title, excerpt, date, read_time, dev_to_url, display_order) VALUES
('blog-1', 'Tech Giants vs. Open Source: The Arms Race of GenAI', 'An epic clash unfolds between tech giants and open-source rebels, each vying to shape the future of generative AI through innovation, access, and control.', 'March 5, 2025', '3 min', 'https://dev.to/vaibhavee_singh89/tech-giants-vs-open-source-the-arms-race-of-genai-381p', 0),
('blog-2', 'Live Coding and Hot Code Swapping- Updating a running program without restarting it', 'Discover how Live Coding and Hot Code Swapping can supercharge your development workflow by letting you update code on the fly—no restarts needed!', 'March 15, 2025', '13 min', 'https://dev.to/vaibhavee_singh89/live-coding-hot-code-swapping-updating-a-running-program-without-restarting-it-35f9', 1),
('blog-3', 'Meta Programming - Writing code that generates or modifies other code dynamically', 'Unlock the power of metaprogramming to automate tasks like logging by letting your code dynamically write and modify itself.', 'March 20, 2025', '8 min', 'https://dev.to/vaibhavee_singh89/meta-programming-writing-code-that-generates-or-modifies-other-code-dynamically-11ck', 2);

-- Insert Events
INSERT INTO events (image_url, alt_text, caption, display_order) VALUES
('/GitTogether.jpg', 'Git Together at Microsoft office Greater Noida- Nov 2024', 'Git Together at Microsoft office Greater Noida- Nov 2024', 0),
('/Student_volunteer_conference.jpg', 'Student volunteer at ICICC-2025', 'Student Volunteer at ICICC-2025', 1),
('/ResearchHackathon.jpg', 'Participated in Research Hackathon organized at Bennett University during first year of college', 'Participated in Research Hackathon organized at Bennett University during first year of college', 2),
('/HP_PowerLab.jpg', 'HP PowerLab Hackathon Certificate', 'HP PowerLab Hackathon Certificate', 3),
('/Team-Luminous.jpg', 'With my team at Luminous Techno-X Hackathon', 'With my team at Luminous Techno-X Hackathon', 4),
('/LuminousHackathon.jpg', 'Luminous Techno-X Hackathon', 'Luminous Techno-X Hackathon', 5),
('/ProjectShowcase2ndYear.jpg', 'Project Showcase during 2nd year of college', 'Project Showcase during 2nd year of college', 6),
('/AWS_StudentCommunityDay.jpg', 'AWS Student Community Day', 'AWS Student Community Day', 7),
('/AnshMehra.jpg', 'Got an opportunity to meet Ansh Mehra at Google DevFest New Delhi- 2023', 'Got an opportunity to meet Ansh Mehra at Google DevFest New Delhi- 2023', 8),
('/Paper_Presentation_Certificate.jpg', 'Paper Presentation Certificate', 'Paper Presentation Certificate', 9),
('/GoogleDevFest-2023.jpg', 'Google DevFest New Delhi- 2023', 'Google DevFest New Delhi- 2023', 10),
('/Hackcbs.jpg', 'HackCBS 7.0', 'HackCBS 7.0', 11);

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
