
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { ArrowLeft, ExternalLink, Github } from 'lucide-react';
import { Project } from '../components/ui-components/ProjectCard';

// Extended project details
interface ProjectDetails extends Project {
  fullDescription: string;
  liveLink?: string;
  githubLink?: string;
  images: string[];
}

const projectsData: ProjectDetails[] = [
  {
    id: "1",
    title: "Portfolio Website",
    description: "This project showcases my work, skills, and experiences in a beautifully crafted and responsive design.",
    fullDescription: "This portfolio website serves as a personal space to highlight my achievements, projects, and professional journey. Built with modern technologies, it ensures a smooth and visually appealing user experience.",
    image: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    images: [
      "https://images.unsplash.com/photo-1541701494587-cb58502866ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2015&q=80",
      "https://images.unsplash.com/photo-1556742031-c6961e8560b0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
    ],
    tags: ["Portfolio", "Skills", "React"],
    liveLink: "https://portfolio-website-vaibhavee.vercel.app/",
    githubLink: "https://github.com/Vaibhavee89/portfolio-website-vaibhavee"
  },
  {
    id: "2",
    title: "Financial Dashboard",
    description: "An interactive dashboard for financial analytics with real-time data visualization.",
    fullDescription: "This financial dashboard project provides users with comprehensive data visualization tools to track investments, analyze market trends, and manage personal finances. The dashboard was built with React and uses advanced charting libraries to display complex financial data in an intuitive way.\n\nKey features include portfolio performance tracking, expense categorization, budget planning tools, and predictive analytics. Real-time data integration was implemented through secure API connections to various financial data providers.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    images: [
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      "https://images.unsplash.com/photo-1543286386-713bdd548da4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
    ],
    tags: ["Dashboard", "Data Visualization", "React"],
    liveLink: "https://example.com",
    githubLink: "https://github.com"
  },
  {
    id: "3",
    title: "Travel Blog Platform",
    description: "A responsive blog platform focused on travel experiences with rich media support.",
    fullDescription: "This travel blog platform was designed to showcase travel stories with a focus on rich media content including high-resolution imagery, videos, and interactive maps. The platform includes a custom CMS that allows writers to easily create and publish content with minimal technical knowledge.\n\nSpecial attention was given to the reading experience, with careful typography choices, comfortable line lengths, and subtle animations that enhance the storytelling without distracting from the content. The responsive design ensures an optimal viewing experience across all devices, particularly important for travel content that is often consumed on mobile devices.",
    image: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    images: [
      "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      "https://images.unsplash.com/photo-1488085061387-422e29b40080?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2031&q=80",
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
    ],
    tags: ["Blog", "Web Development", "CMS"],
    liveLink: "https://example.com",
    githubLink: "https://github.com"
  },
  {
    id: "4",
    title: "Smart Home App",
    description: "A mobile app for controlling smart home devices with a focus on simplicity and usability.",
    fullDescription: "This smart home control application allows users to manage all their connected home devices through a single, intuitive interface. The app was designed with a strong focus on usability, ensuring that complex features remain accessible to users of all technical abilities.\n\nThe app includes features such as device grouping, scenes, schedules, and automation rules. Special attention was given to creating a seamless onboarding process for new devices and intuitive controls for daily use. The interface adapts to user behavior over time, highlighting frequently used features and suggesting automation based on usage patterns.",
    image: "https://images.unsplash.com/photo-1558002038-2f4bb8741991?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    images: [
      "https://images.unsplash.com/photo-1558002038-2f4bb8741991?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      "https://images.unsplash.com/photo-1585771490676-a4e97f979822?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      "https://images.unsplash.com/photo-1581508473471-c9221934233a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
    ],
    tags: ["Mobile App", "IoT", "React Native"],
    liveLink: "https://example.com",
    githubLink: "https://github.com"
  },
  {
    id: "5",
    title: "Fitness Tracking Application",
    description: "A comprehensive fitness app for tracking workouts, nutrition, and health metrics.",
    fullDescription: "This fitness tracking application provides users with tools to monitor their physical activity, nutrition intake, and overall health metrics. The app includes workout plans, exercise libraries with video demonstrations, nutrition tracking, progress visualization, and social features for community support.\n\nDesign considerations included creating an interface that works well during physical activity (larger touch targets, high contrast), integrations with wearable devices, and motivational elements to encourage consistent use. Data visualization was a key component, allowing users to clearly see their progress over time across various metrics.",
    image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    images: [
      "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      "https://images.unsplash.com/photo-1574680096145-d05b474e2155?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80",
      "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
    ],
    tags: ["Mobile App", "Health", "UI/UX Design"],
    liveLink: "https://example.com",
    githubLink: "https://github.com"
  },
  {
    id: "6",
    title: "Photography Portfolio",
    description: "A minimal portfolio website showcasing a photographer's work with immersive viewing experience.",
    fullDescription: "This photography portfolio was designed to showcase the client's work with minimal distractions, placing the focus entirely on the imagery. The design features a clean, minimalist interface with thoughtful transitions between images and galleries.\n\nSpecial attention was given to image loading optimization to ensure fast performance even with high-resolution photography. The gallery viewing experience includes subtle interactions that enhance the presentation without distracting from the content. The responsive design maintains the integrity of the images across all device sizes while ensuring optimal viewing experiences.",
    image: "https://images.unsplash.com/photo-1520390138845-fd2d229dd553?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2092&q=80",
    images: [
      "https://images.unsplash.com/photo-1520390138845-fd2d229dd553?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2092&q=80",
      "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      "https://images.unsplash.com/photo-1554080353-a576cf803bda?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80"
    ],
    tags: ["Portfolio", "Photography", "Gallery"],

    liveLink: "https://example.com",
    githubLink: "https://github.com"
  },
];

const ProjectDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [project, setProject] = useState<ProjectDetails | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    // Find the project by ID
    const foundProject = projectsData.find((p) => p.id === id);
    setProject(foundProject || null);
    
    // Reset animation state and current image when project changes
    setIsVisible(false);
    setCurrentImageIndex(0);
    
    // Trigger animations after a short delay
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, [id]);

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow pt-24 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">Project Not Found</h1>
            <p className="text-muted-foreground mb-6">
              The project you're looking for doesn't exist or has been removed.
            </p>
            <Link to="/#projects" className="button-primary">
              <ArrowLeft size={16} className="mr-2" /> Back to Projects
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev === project.images.length - 1 ? 0 : prev + 1));
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? project.images.length - 1 : prev - 1));
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-24">
        <div className="container mx-auto px-6 py-12">
          <Link 
            to="/#projects" 
            className="inline-flex items-center mb-8 text-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft size={16} className="mr-2" /> Back to Projects
          </Link>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <div className={`mb-8 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
                <div className="bg-card rounded-xl overflow-hidden">
                  <div className="relative aspect-video">
                    <img 
                      src={project.images[currentImageIndex]} 
                      alt={project.title} 
                      className="w-full h-full object-cover"
                    />
                    
                    {project.images.length > 1 && (
                      <div className="absolute inset-0 flex items-center justify-between p-4">
                        <button 
                          onClick={handlePrevImage}
                          className="p-2 bg-background/80 rounded-full text-foreground hover:bg-background transition-colors"
                          aria-label="Previous image"
                        >
                          <ArrowLeft size={24} />
                        </button>
                        <button 
                          onClick={handleNextImage}
                          className="p-2 bg-background/80 rounded-full text-foreground hover:bg-background transition-colors"
                          aria-label="Next image"
                        >
                          <ArrowLeft size={24} className="rotate-180" />
                        </button>
                      </div>
                    )}
                    
                    <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
                      {project.images.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentImageIndex(index)}
                          className={`w-2 h-2 rounded-full transition-all ${
                            currentImageIndex === index
                              ? 'bg-primary w-4'
                              : 'bg-background/60 hover:bg-background'
                          }`}
                          aria-label={`Image ${index + 1}`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className={`space-y-6 ${isVisible ? 'animate-fade-in animate-delay-200' : 'opacity-0'}`}>
                <h1 className="text-3xl md:text-4xl font-bold">{project.title}</h1>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag, index) => (
                    <span 
                      key={index} 
                      className="px-3 py-1 text-xs font-medium bg-secondary rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                
                <div className="prose prose-lg dark:prose-invert">
                  {project.fullDescription.split('\n\n').map((paragraph, index) => (
                    <p key={index} className="text-muted-foreground mb-4">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            </div>
            
            <div className={`lg:col-span-1 ${isVisible ? 'animate-fade-in animate-delay-300' : 'opacity-0'}`}>
              <div className="bg-card border border-border rounded-xl p-6 sticky top-32">
                <h2 className="text-xl font-bold mb-6">Project Details</h2>
              
                  
                  <div className="pt-4 space-y-3">
                    {project.liveLink && (
                      <a 
                        href={project.liveLink} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="button-primary w-full justify-center"
                      >
                        <ExternalLink size={16} /> View Live
                      </a>
                    )}
                    
                    {project.githubLink && (
                      <a 
                        href={project.githubLink} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="button-secondary w-full justify-center"
                      >
                        <Github size={16} /> View Code
                      </a>
                    )}
                  </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ProjectDetail;
