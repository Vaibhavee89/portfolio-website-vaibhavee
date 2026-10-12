import * as LucideIcons from 'lucide-react';

export const mockAboutMe = {
  id: '1',
  title: 'A passionate technologist',
  description: 'I am a Software Development Engineer with a B.Tech in Computer Science and Engineering from Bennett University (2022 - 2026). I work across data platforms, cloud infrastructure and AI engineering, building internal tools for analysts and engineers, Airflow and Pinot automation, and LLM integrations such as MCP connectors and AI agents. I enjoy turning messy operational problems into reliable, self-service systems.',
  image_url: '/MyImage.png',
  highlights: [
    {
      id: '1',
      title: 'Data Platform & Cloud',
      description: 'Airflow, Apache Pinot, AWS migrations and Terraform-managed infrastructure.',
      order: 0
    },
    {
      id: '2',
      title: 'AI Engineering',
      description: 'MCP connectors, AI agents, semantic search and LLM evaluation.',
      order: 1
    }
  ],
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString()
};

export const mockSkills = [
  { name: 'Python', icon_name: 'Code' },
  { name: 'C++', icon_name: 'Cpu' },
  { name: 'JavaScript', icon_name: 'Code2' },
  { name: 'SQL', icon_name: 'Database' },
  { name: 'LLMs & AI Agents', icon_name: 'Brain' },
  { name: 'MCP', icon_name: 'Workflow' },
  { name: 'Semantic Search', icon_name: 'Search' },
  { name: 'Apache Airflow', icon_name: 'Workflow' },
  { name: 'Apache Pinot', icon_name: 'Database' },
  { name: 'Kafka', icon_name: 'Server' },
  { name: 'Redis', icon_name: 'Server' },
  { name: 'AWS', icon_name: 'Cloud' },
  { name: 'Docker', icon_name: 'Package' },
  { name: 'Kubernetes', icon_name: 'Package' },
  { name: 'Terraform', icon_name: 'Cloud' },
  { name: 'Argo CD', icon_name: 'GitBranch' },
  { name: 'Grafana', icon_name: 'Terminal' },
  { name: 'React', icon_name: 'Code2' },
  { name: 'Next.js', icon_name: 'Code2' },
  { name: 'Node.js', icon_name: 'Server' },
  { name: 'Git', icon_name: 'GitBranch' },
  { name: 'CI/CD', icon_name: 'Workflow' }
].map((skill, index) => ({
  id: String(index + 1),
  name: skill.name,
  icon_name: skill.icon_name,
  Icon: (LucideIcons as any)[skill.icon_name] || LucideIcons.Code,
  display_order: index
}));

export const mockProjects = [
  {
    id: 'spam-detection',
    title: 'Instagram Spam Detection',
    description: 'Machine learning system for identifying spam accounts on Instagram',
    full_description: 'Research on identifying spam accounts on Instagram using machine learning. Published as "Identifying Spam Accounts on Instagram" in the IEEE IC3SE-2024 proceedings.',
    image_url: '/placeholder.svg',
    tags: ['Python', 'Machine Learning', 'Research'],
    live_link: '',
    github_link: '',
    display_order: 0,
    featured: true
  },
  {
    id: 'prabhawatt',
    title: 'PrabhaWatt',
    description: 'Solar energy management and electricity saving platform',
    full_description: 'A solar energy management platform for optimizing electricity consumption. Top 10 Grand Finalist at Luminous Techno-X 2024.',
    image_url: '/placeholder.svg',
    tags: ['Solar Energy', 'Energy Management', 'Hackathon'],
    live_link: '',
    github_link: '',
    display_order: 1,
    featured: true
  }
];

export const mockBlogPosts = [
  {
    id: 'getting-started-ml',
    title: 'Getting Started with Machine Learning',
    excerpt: 'A beginner-friendly guide to understanding machine learning concepts',
    date: '2024-01-15',
    read_time: '5 min read',
    dev_to_url: 'https://dev.to'
  }
];

export const mockEvents = [
  {
    id: '1',
    image_url: '/placeholder.svg',
    alt_text: 'Tech Conference',
    caption: 'Speaking at Tech Conference 2024',
    display_order: 0
  }
];

export const mockCertifications = [
  {
    id: '1',
    name: 'AWS Certified Cloud Practitioner',
    issuer: 'Amazon Web Services',
    date: '',
    icon_name: 'Award',
    Icon: LucideIcons.Award,
    credential_url: '',
    description: 'AWS Cloud fundamentals certification',
    display_order: 0
  },
  {
    id: '2',
    name: 'Generative AI Fundamentals Accreditation',
    issuer: 'Databricks Academy',
    date: '',
    icon_name: 'Award',
    Icon: LucideIcons.Award,
    credential_url: '',
    description: 'Generative AI fundamentals accreditation from Databricks Academy',
    display_order: 1
  }
];

export const mockEducation = [
  {
    id: '1',
    title: 'B.Tech in Computer Science and Engineering, Bennett University (Greater Noida, India)',
    period: '2022 - 2026',
    description: 'CGPA: 8.37/10.',
    display_order: 0
  }
];

export const mockWorkExperience = [
  {
    id: '1',
    title: 'Software Development Engineer Intern, Data Platform',
    organisation: 'Blinkit',
    period: 'April 2026 - October 2026',
    badge: '01',
    description: 'Built GET, PUT and DELETE REST APIs and refactored a capacity planner into a dynamic, multi-tenant system with React UI and YAML-defined forecast metrics. Built an Airflow DAG that syncs business-unit metrics into AWS RDS, and an AI agent for self-service DAG debugging (integrating Airflow, Commuter, Slack and Grafana MCPs) that let analysts self-resolve 200+ failures a day. Added Claude Code and GitHub CLI to a JupyterHub deployment used by 1,400+ users, led cross-account AWS migrations with Terraform, Atlantis and Argo CD, and automated Apache Pinot table onboarding with Airflow.',
    display_order: 0
  },
  {
    id: '2',
    title: 'AI Engineering Intern',
    organisation: 'Scopely',
    period: 'September 2025 - March 2026',
    badge: '02',
    description: 'Designed and deployed 15+ reusable MCP connectors for Claude Code, Codex and the internal AI platform, covering Google Workspace, Confluence, Unity and internal APIs. Added authentication and role-based access control for MCPs on the internal AI chat platform used by 3,000+ employees. Built an AI-powered presentation evaluation platform for 50+ hackathon teams, migrated an AI Assistant from the OpenAI Assistants API to the Responses API, and designed LLM evaluation metrics integrated with Braintrust.',
    display_order: 1
  }
];
