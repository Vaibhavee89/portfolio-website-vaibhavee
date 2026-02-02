import { createClient } from '@supabase/supabase-js';
import type { Database } from '../types/database.types';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY!;
const supabase = createClient<Database>(supabaseUrl, supabaseKey);

type Project = Database['public']['Tables']['projects']['Row'];
type Skill = Database['public']['Tables']['skills']['Row'];
type Education = Database['public']['Tables']['education']['Row'];
type WorkExperience = Database['public']['Tables']['work_experience']['Row'];
type Certification = Database['public']['Tables']['certifications']['Row'];
type BlogPost = Database['public']['Tables']['blog_posts']['Row'];

interface KnowledgeChunk {
  content: string;
  metadata: {
    type: string;
    source: string;
    title?: string;
    [key: string]: any;
  };
}

async function aggregateKnowledgeBase(): Promise<KnowledgeChunk[]> {
  const chunks: KnowledgeChunk[] = [];

  const profileInfo = {
    content: `I am Vaibhavee Singh, a BTech 4th year student passionate about research and specializing in Cloud Computing, AI/ML, Deep Learning and Computer Vision. I love transforming ideas into impactful solutions, whether it's developing AI-powered applications, writing research papers, or contributing to meaningful projects. My goal is to bridge the gap between research and real-world applications, constantly pushing the boundaries of technology.
    
    I focus on AI, Cloud & Research, bridging intelligent systems with real-world impact. I am driven by continuous learning, collaboration, innovation, and community initiatives.
    
    Contact Information:
    - Email: vaibhaveesingh89@gmail.com
    - LinkedIn: https://www.linkedin.com/in/vaibhavee-singh-1b7996252/
    - Portfolio: https://portfolio-website-vaibhavee.vercel.app`,
    metadata: {
      type: 'profile',
      source: 'about_section',
      title: 'About Vaibhavee Singh'
    }
  };
  chunks.push(profileInfo);

  try {
    const { data: projects, error: projectsError } = await supabase
      .from('projects')
      .select('*')
      .order('display_order', { ascending: true });

    if (projectsError) throw projectsError;

    if (projects) {
      for (const project of projects as Project[]) {
        chunks.push({
          content: `Project: ${project.title}
          
Description: ${project.description}

${project.full_description ? `Full Description: ${project.full_description}` : ''}

Technologies: ${project.tags?.join(', ') || 'N/A'}

${project.live_link ? `Live Demo: ${project.live_link}` : ''}
${project.github_link ? `GitHub: ${project.github_link}` : ''}`,
          metadata: {
            type: 'project',
            source: 'projects_table',
            title: project.title,
            id: project.id,
            tags: project.tags || []
          }
        });
      }
    }

    const { data: skills, error: skillsError } = await supabase
      .from('skills')
      .select('*')
      .order('display_order', { ascending: true });

    if (skillsError) throw skillsError;

    if (skills && skills.length > 0) {
      const skillsList = (skills as Skill[]).map(s => s.name).join(', ');
      chunks.push({
        content: `Technical Skills and Technologies:

Vaibhavee is proficient in the following technologies and tools: ${skillsList}.

These skills span across various domains including programming languages, frameworks, cloud platforms, AI/ML tools, and development technologies.`,
        metadata: {
          type: 'skills',
          source: 'skills_table',
          title: 'Technical Skills',
          skills: (skills as Skill[]).map(s => s.name)
        }
      });
    }

    const { data: education, error: educationError } = await supabase
      .from('education')
      .select('*')
      .order('display_order', { ascending: true });

    if (educationError) throw educationError;

    if (education) {
      for (const edu of education as Education[]) {
        chunks.push({
          content: `Education: ${edu.title}

Period: ${edu.period}

Details: ${edu.description}`,
          metadata: {
            type: 'education',
            source: 'education_table',
            title: edu.title,
            period: edu.period
          }
        });
      }
    }

    const { data: workExperience, error: workError } = await supabase
      .from('work_experience')
      .select('*')
      .order('display_order', { ascending: true });

    if (workError) throw workError;

    if (workExperience) {
      for (const work of workExperience as WorkExperience[]) {
        chunks.push({
          content: `Work Experience: ${work.title}

Organization: ${work.organisation}

Period: ${work.period}

Description: ${work.description}`,
          metadata: {
            type: 'work_experience',
            source: 'work_experience_table',
            title: work.title,
            organisation: work.organisation,
            period: work.period
          }
        });
      }
    }

    const { data: certifications, error: certsError } = await supabase
      .from('certifications')
      .select('*')
      .order('display_order', { ascending: true });

    if (certsError) throw certsError;

    if (certifications) {
      for (const cert of certifications as Certification[]) {
        chunks.push({
          content: `Certification: ${cert.name}

Issuer: ${cert.issuer}

Date: ${cert.date}

${cert.description ? `Description: ${cert.description}` : ''}
${cert.credential_url ? `Credential URL: ${cert.credential_url}` : ''}`,
          metadata: {
            type: 'certification',
            source: 'certifications_table',
            title: cert.name,
            issuer: cert.issuer,
            date: cert.date
          }
        });
      }
    }

    const { data: blogPosts, error: blogError } = await supabase
      .from('blog_posts')
      .select('*')
      .order('display_order', { ascending: true });

    if (blogError) throw blogError;

    if (blogPosts) {
      for (const blog of blogPosts as BlogPost[]) {
        chunks.push({
          content: `Blog Post: ${blog.title}

Excerpt: ${blog.excerpt}

Published: ${blog.date}

Read Time: ${blog.read_time}

Link: ${blog.dev_to_url}`,
          metadata: {
            type: 'blog_post',
            source: 'blog_posts_table',
            title: blog.title,
            date: blog.date,
            url: blog.dev_to_url
          }
        });
      }
    }

    const achievements = {
      content: `Achievements and Recognition:

1. Top 10 Grand Finalist at Luminous Techno-X Hackathon
   - Contributed to the development of PrabhaWatt, a solar energy management and electricity saving platform
   - Placed among the top 10 finalists out of 500+ teams

2. Published Research Paper
   - Published a research paper on "Spam accounts detection on Instagram" in IEEE IC3SE-2024 conference proceedings
   - Demonstrates expertise in machine learning and social media analysis`,
      metadata: {
        type: 'achievements',
        source: 'about_section',
        title: 'Achievements and Recognition'
      }
    };
    chunks.push(achievements);

  } catch (error) {
    console.error('Error aggregating knowledge base:', error);
    throw error;
  }

  console.log(`\n✅ Successfully aggregated ${chunks.length} knowledge chunks`);
  return chunks;
}

export { aggregateKnowledgeBase };
export type { KnowledgeChunk };

// Run if this is the main module
if (import.meta.url === `file://${process.argv[1]}`) {
  aggregateKnowledgeBase()
    .then(chunks => {
      console.log('\nKnowledge Base Summary:');
      const typeCounts = chunks.reduce((acc, chunk) => {
        acc[chunk.metadata.type] = (acc[chunk.metadata.type] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);
      
      Object.entries(typeCounts).forEach(([type, count]) => {
        console.log(`  - ${type}: ${count} chunks`);
      });
    })
    .catch(error => {
      console.error('Failed to aggregate knowledge base:', error);
      process.exit(1);
    });
}
