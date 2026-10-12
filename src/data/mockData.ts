import * as LucideIcons from 'lucide-react';

export const mockAboutMe = {
  id: '1',
  title: 'A passionate technologist',
  description: 'I am a Computer Science graduate of Bennett University (Class of 2026) focused on AI, machine learning and cloud-native systems. I work across data platforms, cloud infrastructure and AI engineering, building LLM-powered tools, MCP connectors and AI evaluation pipelines. Earlier I worked on cybersecurity at CDAC and research at CIMFR (CSIR), and my research spans AI systems, cybersecurity and applied machine learning, with IEEE publications and a co-authored book chapter on DDoS threat intelligence.',
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
  },
  {
    id: 'netra',
    title: 'NETRA',
    description: 'AI-powered cybercrime reporting and analysis system',
    full_description: 'NETRA is an AI-powered system for reporting and analysing cybercrime, presented as a publication alongside the DDoS threat intelligence work.',
    image_url: '/placeholder.svg',
    tags: ['Python', 'AI', 'Cybersecurity'],
    live_link: '',
    github_link: '',
    display_order: 2,
    featured: false
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
    image_url: '/GitTogether.jpg',
    alt_text: 'Git Together at Microsoft office Greater Noida- Nov 2024',
    caption: 'Git Together at Microsoft office Greater Noida- Nov 2024',
    display_order: 0
  },
  {
    id: '2',
    image_url: '/Student_volunteer_conference.jpg',
    alt_text: 'Student volunteer at ICICC-2025',
    caption: 'Student Volunteer at ICICC-2025',
    display_order: 1
  },
  {
    id: '3',
    image_url: '/ResearchHackathon.jpg',
    alt_text: 'Participated in Research Hackathon organized at Bennett University during first year of college',
    caption: 'Participated in Research Hackathon organized at Bennett University during first year of college',
    display_order: 2
  },
  {
    id: '4',
    image_url: '/HP_PowerLab.jpg',
    alt_text: 'HP PowerLab Hackathon Certificate',
    caption: 'HP PowerLab Hackathon Certificate',
    display_order: 3
  },
  {
    id: '5',
    image_url: '/Team-Luminous.jpg',
    alt_text: 'With my team at Luminous Techno-X Hackathon',
    caption: 'With my team at Luminous Techno-X Hackathon',
    display_order: 4
  },
  {
    id: '6',
    image_url: '/LuminousHackathon.jpg',
    alt_text: 'Luminous Techno-X Hackathon',
    caption: 'Luminous Techno-X Hackathon',
    display_order: 5
  },
  {
    id: '7',
    image_url: '/ProjectShowcase2ndYear.jpg',
    alt_text: 'Project Showcase during 2nd year of college',
    caption: 'Project Showcase during 2nd year of college',
    display_order: 6
  },
  {
    id: '8',
    image_url: '/AWS_StudentCommunityDay.jpg',
    alt_text: 'AWS Student Community Day',
    caption: 'AWS Student Community Day',
    display_order: 7
  },
  {
    id: '9',
    image_url: '/AnshMehra.jpg',
    alt_text: 'Got an opportunity to meet Ansh Mehra at Google DevFest New Delhi- 2023',
    caption: 'Got an opportunity to meet Ansh Mehra at Google DevFest New Delhi- 2023',
    display_order: 8
  },
  {
    id: '10',
    image_url: '/Paper_Presentation_Certificate.jpg',
    alt_text: 'Paper Presentation Certificate',
    caption: 'Paper Presentation Certificate',
    display_order: 9
  },
  {
    id: '11',
    image_url: '/GoogleDevFest-2023.jpg',
    alt_text: 'Google DevFest New Delhi- 2023',
    caption: 'Google DevFest New Delhi- 2023',
    display_order: 10
  },
  {
    id: '12',
    image_url: '/Hackcbs.jpg',
    alt_text: 'HackCBS 7.0',
    caption: 'HackCBS 7.0',
    display_order: 11
  },
  {
    id: '13',
    image_url: '/Scopely.jpg',
    alt_text: 'GenAI team at Scopely',
    caption: 'GenAI team at Scopely',
    display_order: 12
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
  },
  {
    id: '3',
    title: 'Trainee, Cybersecurity & Network Systems',
    organisation: 'CDAC India',
    period: 'June 2025 - August 2025',
    badge: '03',
    description: 'Contributed to the backend of a Flask-based network auditing tool for automated vulnerability scanning. Built a network simulation to demonstrate and mitigate ping floods and unauthorized access using firewall rules and access control lists.',
    display_order: 2
  },
  {
    id: '4',
    title: 'Internship Trainee, Social Media Research',
    organisation: 'CIMFR (CSIR), Dhanbad',
    period: 'July 2024 - August 2024',
    badge: '04',
    description: 'Researched and analysed social media data, focusing on user engagement and sentiment trends.',
    display_order: 3
  }
];
