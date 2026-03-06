import * as LucideIcons from 'lucide-react';

export const mockAboutMe = {
  id: '1',
  title: 'A passionate technologist',
  description: 'I am a BTech 4th year student passionate about research and specializing in Cloud Computing, AI/ML, Deep Learning and Computer Vision. I love transforming ideas into impactful solutions, whether it\'s developing AI-powered applications, writing research papers, or contributing to meaningful projects. My goal is to bridge the gap between research and real-world applications, constantly pushing the boundaries of technology.',
  image_url: '/MyImage.png',
  highlights: [
    {
      id: '1',
      title: 'AI, Cloud & Research',
      description: 'Bridging intelligent systems with real-world impact.',
      order: 0
    },
    {
      id: '2',
      title: 'Continuous learning',
      description: 'Driven by collaboration, innovation, and community initiatives.',
      order: 1
    }
  ],
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString()
};

export const mockSkills = [
  { name: 'Python', icon_name: 'Code' },
  { name: 'TensorFlow', icon_name: 'Brain' },
  { name: 'PyTorch', icon_name: 'Cpu' },
  { name: 'AWS', icon_name: 'Cloud' },
  { name: 'Docker', icon_name: 'Package' },
  { name: 'React', icon_name: 'Code2' },
  { name: 'Node.js', icon_name: 'Server' },
  { name: 'Git', icon_name: 'GitBranch' },
  { name: 'Linux', icon_name: 'Terminal' },
  { name: 'SQL', icon_name: 'Database' },
  { name: 'MongoDB', icon_name: 'Database' },
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
    description: 'AI-powered spam account detection system using machine learning',
    full_description: 'Developed a comprehensive spam detection system for Instagram using machine learning algorithms. Published research paper in IEEE IC3SE-2024 conference proceedings.',
    image_url: '/placeholder.svg',
    tags: ['Python', 'ML', 'Research'],
    live_link: '',
    github_link: '',
    display_order: 0,
    featured: true
  },
  {
    id: 'prabhawatt',
    title: 'PrabhaWatt',
    description: 'Solar energy management and electricity saving platform',
    full_description: 'A solar energy management platform that helps optimize electricity consumption. Top 10 finalist at Luminous Techno-X Hackathon out of 500+ teams.',
    image_url: '/placeholder.svg',
    tags: ['React', 'IoT', 'Cloud'],
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
    name: 'AWS Certified Solutions Architect',
    issuer: 'Amazon Web Services',
    date: 'January 2024',
    icon_name: 'Award',
    Icon: LucideIcons.Award,
    credential_url: 'https://www.credly.com',
    description: 'Professional certification for AWS cloud architecture',
    display_order: 0
  },
  {
    id: '2',
    name: 'TensorFlow Developer Certificate',
    issuer: 'Google',
    date: 'December 2023',
    icon_name: 'Award',
    Icon: LucideIcons.Award,
    credential_url: 'https://www.credential.net',
    description: 'Professional certification for TensorFlow',
    display_order: 1
  }
];

export const mockEducation = [
  {
    id: '1',
    title: 'Bachelor of Technology in Computer Science',
    period: '2021 - 2025',
    description: 'Specialization in AI/ML and Cloud Computing. Focus on research and practical applications in computer vision and deep learning.',
    display_order: 0
  }
];

export const mockWorkExperience = [
  {
    id: '1',
    title: 'AI Research Intern',
    organisation: 'Tech Company',
    period: '2023 - Present',
    badge: '01',
    description: 'Working on cutting-edge AI/ML projects focused on computer vision and natural language processing.',
    display_order: 0
  },
  {
    id: '2',
    title: 'Cloud Engineering Intern',
    organisation: 'Cloud Solutions Inc',
    period: '2022 - 2023',
    badge: '02',
    description: 'Developed cloud-native applications and implemented CI/CD pipelines using AWS services.',
    display_order: 1
  }
];
