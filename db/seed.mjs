// One-time (or re-runnable) setup + seed script for the Vercel Postgres
// database. Creates tables if they don't exist, then upserts the content
// currently in src/data/mockData.ts so the live site isn't empty after
// switching from static mock data to the database.
//
// Usage:
//   1. `vercel link` then `vercel env pull .env.local` to get POSTGRES_URL
//      locally (see README section this script's output points to).
//   2. `npm run db:seed`
//
// Safe to re-run: every insert is an upsert (ON CONFLICT DO UPDATE), so
// running this again just refreshes rows to match mockData.ts rather than
// duplicating them.

import { config } from 'dotenv';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { neon } from '@neondatabase/serverless';

config({ path: '.env.local' });

const connectionString = process.env.DATABASE_URL || process.env.POSTGRES_URL;

if (!connectionString) {
  console.error(
    '\nDATABASE_URL (or POSTGRES_URL) is not set. Run `vercel link` then `vercel env pull .env.local` first.\n'
  );
  process.exit(1);
}

const sql = neon(connectionString, { fullResults: true });

const __dirname = dirname(fileURLToPath(import.meta.url));

// --- Content (mirrors src/data/mockData.ts, without the lucide-react Icon
// resolution — that stays client-side, driven by icon_name) -----------------

const aboutMe = {
  id: '1',
  title: 'A passionate technologist',
  description:
    'I am a Computer Science graduate of Bennett University (Class of 2026) focused on AI, machine learning and cloud-native systems. I work across data platforms, cloud infrastructure and AI engineering, building LLM-powered tools, MCP connectors and AI evaluation pipelines. Earlier I worked on cybersecurity at CDAC and research at CIMFR (CSIR), and my research spans AI systems, cybersecurity and applied machine learning, with IEEE publications and a co-authored book chapter on DDoS threat intelligence.',
  image_url: '/MyImage.png',
};

const aboutMeHighlights = [
  { id: '1', title: 'Data Platform & Cloud', description: 'Airflow, Apache Pinot, AWS migrations and Terraform-managed infrastructure.', display_order: 0 },
  { id: '2', title: 'AI Engineering', description: 'MCP connectors, AI agents, semantic search and LLM evaluation.', display_order: 1 },
];

const skills = [
  ['Python', 'Code'], ['C++', 'Cpu'], ['JavaScript', 'Code2'], ['SQL', 'Database'],
  ['LLMs & AI Agents', 'Brain'], ['MCP', 'Workflow'], ['Semantic Search', 'Search'],
  ['Apache Airflow', 'Workflow'], ['Apache Pinot', 'Database'], ['Kafka', 'Server'],
  ['Redis', 'Server'], ['AWS', 'Cloud'], ['Docker', 'Package'], ['Kubernetes', 'Package'],
  ['Terraform', 'Cloud'], ['Argo CD', 'GitBranch'], ['Grafana', 'Terminal'],
  ['React', 'Code2'], ['Next.js', 'Code2'], ['Node.js', 'Server'], ['Git', 'GitBranch'],
  ['CI/CD', 'Workflow'],
].map(([name, icon_name], index) => ({ id: String(index + 1), name, icon_name, display_order: index }));

const projects = [
  { id: 'spam-detection', title: 'Instagram Spam Detection', description: 'Machine learning system for identifying spam accounts on Instagram', full_description: 'Research on identifying spam accounts on Instagram using machine learning. Published as "Identifying Spam Accounts on Instagram" in the IEEE IC3SE-2024 proceedings.', image_url: '/placeholder.svg', tags: ['Python', 'Machine Learning', 'Research'], live_link: '', github_link: '', display_order: 0, featured: true },
  { id: 'prabhawatt', title: 'PrabhaWatt', description: 'Solar energy management and electricity saving platform', full_description: 'A solar energy management platform for optimizing electricity consumption. Top 10 Grand Finalist at Luminous Techno-X 2024.', image_url: '/placeholder.svg', tags: ['Solar Energy', 'Energy Management', 'Hackathon'], live_link: '', github_link: '', display_order: 1, featured: true },
  { id: 'netra', title: 'NETRA', description: 'AI-powered cybercrime reporting and analysis system', full_description: 'NETRA is an AI-powered system for reporting and analysing cybercrime, presented as a publication alongside the DDoS threat intelligence work.', image_url: '/placeholder.svg', tags: ['Python', 'AI', 'Cybersecurity'], live_link: '', github_link: '', display_order: 2, featured: false },
];

const blogPosts = [
  { id: 'getting-started-ml', title: 'Getting Started with Machine Learning', excerpt: 'A beginner-friendly guide to understanding machine learning concepts', date: '2024-01-15', read_time: '5 min read', dev_to_url: 'https://dev.to', display_order: 0 },
];

const events = [
  { id: '1', image_url: '/GitTogether.jpg', alt_text: 'Git Together at Microsoft office Greater Noida- Nov 2024', caption: 'Git Together at Microsoft office Greater Noida- Nov 2024', display_order: 0 },
  { id: '2', image_url: '/Student_volunteer_conference.jpg', alt_text: 'Student volunteer at ICICC-2025', caption: 'Student Volunteer at ICICC-2025', display_order: 1 },
  { id: '3', image_url: '/ResearchHackathon.jpg', alt_text: 'Participated in Research Hackathon organized at Bennett University during first year of college', caption: 'Participated in Research Hackathon organized at Bennett University during first year of college', display_order: 2 },
  { id: '4', image_url: '/HP_PowerLab.jpg', alt_text: 'HP PowerLab Hackathon Certificate', caption: 'HP PowerLab Hackathon Certificate', display_order: 3 },
  { id: '5', image_url: '/Team-Luminous.jpg', alt_text: 'With my team at Luminous Techno-X Hackathon', caption: 'With my team at Luminous Techno-X Hackathon', display_order: 4 },
  { id: '6', image_url: '/LuminousHackathon.jpg', alt_text: 'Luminous Techno-X Hackathon', caption: 'Luminous Techno-X Hackathon', display_order: 5 },
  { id: '7', image_url: '/ProjectShowcase2ndYear.jpg', alt_text: 'Project Showcase during 2nd year of college', caption: 'Project Showcase during 2nd year of college', display_order: 6 },
  { id: '8', image_url: '/AWS_StudentCommunityDay.jpg', alt_text: 'AWS Student Community Day', caption: 'AWS Student Community Day', display_order: 7 },
  { id: '9', image_url: '/AnshMehra.jpg', alt_text: 'Got an opportunity to meet Ansh Mehra at Google DevFest New Delhi- 2023', caption: 'Got an opportunity to meet Ansh Mehra at Google DevFest New Delhi- 2023', display_order: 8 },
  { id: '10', image_url: '/Paper_Presentation_Certificate.jpg', alt_text: 'Paper Presentation Certificate', caption: 'Paper Presentation Certificate', display_order: 9 },
  { id: '11', image_url: '/GoogleDevFest-2023.jpg', alt_text: 'Google DevFest New Delhi- 2023', caption: 'Google DevFest New Delhi- 2023', display_order: 10 },
  { id: '12', image_url: '/Hackcbs.jpg', alt_text: 'HackCBS 7.0', caption: 'HackCBS 7.0', display_order: 11 },
  { id: '13', image_url: '/Scopely.jpg', alt_text: 'GenAI team at Scopely', caption: 'GenAI team at Scopely', display_order: 12 },
];

const certifications = [
  { id: '1', name: 'AWS Certified Cloud Practitioner', issuer: 'Amazon Web Services', date: '', icon_name: 'Award', credential_url: '', description: 'AWS Cloud fundamentals certification', display_order: 0 },
  { id: '2', name: 'Generative AI Fundamentals Accreditation', issuer: 'Databricks Academy', date: '', icon_name: 'Award', credential_url: '', description: 'Generative AI fundamentals accreditation from Databricks Academy', display_order: 1 },
];

const education = [
  { id: '1', title: 'B.Tech in Computer Science and Engineering, Bennett University (Greater Noida, India)', period: '2022 - 2026', description: 'CGPA: 8.37/10.', display_order: 0 },
];

const workExperience = [
  { id: '1', title: 'Software Development Engineer Intern, Data Platform', organisation: 'Blinkit', period: 'April 2026 - October 2026', badge: '01', description: 'Built GET, PUT and DELETE REST APIs and refactored a capacity planner into a dynamic, multi-tenant system with React UI and YAML-defined forecast metrics. Built an Airflow DAG that syncs business-unit metrics into AWS RDS, and an AI agent for self-service DAG debugging (integrating Airflow, Commuter, Slack and Grafana MCPs) that let analysts self-resolve 200+ failures a day. Added Claude Code and GitHub CLI to a JupyterHub deployment used by 1,400+ users, led cross-account AWS migrations with Terraform, Atlantis and Argo CD, and automated Apache Pinot table onboarding with Airflow.', display_order: 0 },
  { id: '2', title: 'AI Engineering Intern', organisation: 'Scopely', period: 'September 2025 - March 2026', badge: '02', description: 'Designed and deployed 15+ reusable MCP connectors for Claude Code, Codex and the internal AI platform, covering Google Workspace, Confluence, Unity and internal APIs. Added authentication and role-based access control for MCPs on the internal AI chat platform used by 3,000+ employees. Built an AI-powered presentation evaluation platform for 50+ hackathon teams, migrated an AI Assistant from the OpenAI Assistants API to the Responses API, and designed LLM evaluation metrics integrated with Braintrust.', display_order: 1 },
  { id: '3', title: 'Trainee, Cybersecurity & Network Systems', organisation: 'CDAC India', period: 'June 2025 - August 2025', badge: '03', description: 'Contributed to the backend of a Flask-based network auditing tool for automated vulnerability scanning. Built a network simulation to demonstrate and mitigate ping floods and unauthorized access using firewall rules and access control lists.', display_order: 2 },
  { id: '4', title: 'Internship Trainee, Social Media Research', organisation: 'CIMFR (CSIR), Dhanbad', period: 'July 2024 - August 2024', badge: '04', description: 'Researched and analysed social media data, focusing on user engagement and sentiment trends.', display_order: 3 },
];

// --- Run -------------------------------------------------------------------

async function main() {
  console.log('Creating tables (if they do not already exist)...');
  const schema = readFileSync(join(__dirname, 'schema.sql'), 'utf-8');
  // @vercel/postgres's sql tag doesn't support multi-statement strings, so
  // split on blank-line-separated CREATE TABLE statements and run each.
  const statements = schema.split(/;\s*\n/).map((s) => s.trim()).filter(Boolean);
  for (const statement of statements) {
    await sql.query(statement);
  }

  console.log('Seeding about_me...');
  await sql`
    INSERT INTO about_me (id, title, description, image_url)
    VALUES (${aboutMe.id}, ${aboutMe.title}, ${aboutMe.description}, ${aboutMe.image_url})
    ON CONFLICT (id) DO UPDATE SET
      title = EXCLUDED.title, description = EXCLUDED.description, image_url = EXCLUDED.image_url, updated_at = now()
  `;

  console.log('Seeding about_me_highlights...');
  await sql`DELETE FROM about_me_highlights`;
  for (const h of aboutMeHighlights) {
    await sql`
      INSERT INTO about_me_highlights (id, title, description, display_order)
      VALUES (${h.id}, ${h.title}, ${h.description}, ${h.display_order})
    `;
  }

  console.log(`Seeding ${skills.length} skills...`);
  for (const s of skills) {
    await sql`
      INSERT INTO skills (id, name, icon_name, display_order)
      VALUES (${s.id}, ${s.name}, ${s.icon_name}, ${s.display_order})
      ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, icon_name = EXCLUDED.icon_name, display_order = EXCLUDED.display_order
    `;
  }

  console.log(`Seeding ${projects.length} projects...`);
  for (const p of projects) {
    await sql`
      INSERT INTO projects (id, title, description, full_description, image_url, tags, live_link, github_link, display_order, featured)
      VALUES (${p.id}, ${p.title}, ${p.description}, ${p.full_description}, ${p.image_url}, ${p.tags}, ${p.live_link}, ${p.github_link}, ${p.display_order}, ${p.featured})
      ON CONFLICT (id) DO UPDATE SET
        title = EXCLUDED.title, description = EXCLUDED.description, full_description = EXCLUDED.full_description,
        image_url = EXCLUDED.image_url, tags = EXCLUDED.tags, live_link = EXCLUDED.live_link,
        github_link = EXCLUDED.github_link, display_order = EXCLUDED.display_order, featured = EXCLUDED.featured
    `;
  }

  console.log(`Seeding ${blogPosts.length} blog posts...`);
  for (const b of blogPosts) {
    await sql`
      INSERT INTO blog_posts (id, title, excerpt, date, read_time, dev_to_url, display_order)
      VALUES (${b.id}, ${b.title}, ${b.excerpt}, ${b.date}, ${b.read_time}, ${b.dev_to_url}, ${b.display_order})
      ON CONFLICT (id) DO UPDATE SET
        title = EXCLUDED.title, excerpt = EXCLUDED.excerpt, date = EXCLUDED.date,
        read_time = EXCLUDED.read_time, dev_to_url = EXCLUDED.dev_to_url, display_order = EXCLUDED.display_order
    `;
  }

  console.log(`Seeding ${events.length} events...`);
  for (const e of events) {
    await sql`
      INSERT INTO events (id, image_url, alt_text, caption, display_order)
      VALUES (${e.id}, ${e.image_url}, ${e.alt_text}, ${e.caption}, ${e.display_order})
      ON CONFLICT (id) DO UPDATE SET
        image_url = EXCLUDED.image_url, alt_text = EXCLUDED.alt_text, caption = EXCLUDED.caption, display_order = EXCLUDED.display_order
    `;
  }

  console.log(`Seeding ${certifications.length} certifications...`);
  for (const c of certifications) {
    await sql`
      INSERT INTO certifications (id, name, issuer, date, icon_name, credential_url, description, display_order)
      VALUES (${c.id}, ${c.name}, ${c.issuer}, ${c.date}, ${c.icon_name}, ${c.credential_url}, ${c.description}, ${c.display_order})
      ON CONFLICT (id) DO UPDATE SET
        name = EXCLUDED.name, issuer = EXCLUDED.issuer, date = EXCLUDED.date, icon_name = EXCLUDED.icon_name,
        credential_url = EXCLUDED.credential_url, description = EXCLUDED.description, display_order = EXCLUDED.display_order
    `;
  }

  console.log(`Seeding ${education.length} education entries...`);
  for (const ed of education) {
    await sql`
      INSERT INTO education (id, title, period, description, display_order)
      VALUES (${ed.id}, ${ed.title}, ${ed.period}, ${ed.description}, ${ed.display_order})
      ON CONFLICT (id) DO UPDATE SET
        title = EXCLUDED.title, period = EXCLUDED.period, description = EXCLUDED.description, display_order = EXCLUDED.display_order
    `;
  }

  console.log(`Seeding ${workExperience.length} work experience entries...`);
  for (const w of workExperience) {
    await sql`
      INSERT INTO work_experience (id, title, organisation, period, badge, description, display_order)
      VALUES (${w.id}, ${w.title}, ${w.organisation}, ${w.period}, ${w.badge}, ${w.description}, ${w.display_order})
      ON CONFLICT (id) DO UPDATE SET
        title = EXCLUDED.title, organisation = EXCLUDED.organisation, period = EXCLUDED.period,
        badge = EXCLUDED.badge, description = EXCLUDED.description, display_order = EXCLUDED.display_order
    `;
  }

  console.log('\nDone. The database now mirrors src/data/mockData.ts.');
}

main().catch((err) => {
  console.error('Seed failed:', err);
  process.exit(1);
});
