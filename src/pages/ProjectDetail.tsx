
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
    image: "/PortfolioProject(2).png",
    images: [
      "/PortfolioProject(2).png",    
    ],
    tags: ["Portfolio", "Skills"],
    liveLink: "https://portfolio-website-vaibhavee.vercel.app/",
    githubLink: "https://github.com/Vaibhavee89/portfolio-website-vaibhavee"
  },
  {
    id: "2",
    title: "Quiz-Whiz",
    description: "Welcome to QuizWhiz, a fast and interactive trivia quiz app that pulls questions from Trivia API and provides instant feedback! ",
    fullDescription: "Welcome to QuizWhiz, a fast and interactive trivia quiz app that pulls questions from Trivia API and provides instant feedback! ",
    image: "/TriviaQuiz.png",
    images: [
      "/TriviaQuiz.png"
    ],
    tags: ["Quiz", "Trivia-Challenge"],
    liveLink: "quiz-whiz-red.vercel.app",
    githubLink: "https://github.com/Vaibhavee89/QuizWhiz"
  },
  {
    id: "3",
    title: "Short.ly",
    description: "Short.ly is a simple API that shortens long URLs and redirects users when they access the shortened links. It is built with modern web technologies, ensuring fast performance and a seamless experience.",
    fullDescription: "Short.ly is a simple API that shortens long URLs and redirects users when they access the shortened links. It is built with modern web technologies, ensuring fast performance and a seamless experience.",
    image: "/Shortly.png",
    images: ["/Shortly.png"
    ],
    tags: ["URLs", "Web Development", "API"],
    liveLink: "https://short-ly-wine.vercel.app/",
    githubLink: "https://github.com/Vaibhavee89/Short.ly"
  },
  {
    id: "4",
    title: "Sudoku-Solver",
    description: "Sudoku Solver is a web application that allows users to input a Sudoku puzzle and get the solution instantly. The app uses a backtracking algorithm to solve the puzzle efficiently.",
    fullDescription: "Sudoku Solver is a web application that allows users to input a Sudoku puzzle and get the solution instantly. The app uses a backtracking algorithm to solve the puzzle efficiently.",
    image: "/SudokuSolver.png",
    images: ["/SudokuSolver.png"
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
    title: "Sudoku-Solver",
    description: "Sudoku Solver is a web application that allows users to input a Sudoku puzzle and get the solution instantly. The app uses a backtracking algorithm to solve the puzzle efficiently.",
    fullDescription: "Sudoku Solver is a web application that allows users to input a Sudoku puzzle and get the solution instantly. The app uses a backtracking algorithm to solve the puzzle efficiently.",
    image: "/SudokuSolver.png",
    images: ["/SudokuSolver.png"
    ],
    tags: ["C++", "Backtracking Algorithm", "Conceptual Problem Solving"],

    //liveLink: "https://example.com",
    githubLink: "https://github.com/Vaibhavee89/Sudoku-Solver"
  },
  {
    id: "7",
    title: "Ziplyn",
    description: "Experimental project to create a file compression and extraction utility in Rust.",
    fullDescription: "Ziplyn is an experimental project to create a file compression and extraction utility in Rust. The application is designed to be fast, efficient, and user-friendly, with a focus on simplicity and performance. Ziplyn supports a wide range of file formats and compression algorithms, allowing users to compress and extract files with ease.",
    image: "/Ziplyn.png",
    images: ["/Ziplyn.png"
    ],
    tags: ["Rust", "File Comprerssion", "File Extraction"],

    //liveLink: "https://example.com",
    githubLink: "https://github.com/Vaibhavee89/Ziplyn"
  }
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
