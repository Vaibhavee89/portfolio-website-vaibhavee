
import { useState, useEffect } from 'react';
import ProjectCard, { Project } from '../ui-components/ProjectCard';

const projects: Project[] = [
  {
    id: "1",
    title: "Portfolio-Website",
    description: "This portfolio website serves as a personal space to highlight my achievements, projects, and professional journey.",
    image: "/PortfolioProject(2).png",
    tags: ["Portfolio", "skills"]  },
  {
    id: "2",
    title: "QuizWhiz",
    description: "A fast and interactive quiz app with a wide range of categories and questions.",
    image: "/TriviaQuiz.png",
    tags: ["Quiz", "TriviaChallenge"],
  },
  {
    id: "3",
    title: "Short.ly",
    description: "A URL shortening service that provides detailed analytics and custom short links.",
    image: "/Shortly.png",
    tags: ["URL", "Shortner", "Analytics"],
  },
  {
    id: "4",
    title: "Crypto Wallet Mobile App",
    description: "Designed a mobile app for managing cryptocurrency transactions, including wallet management and transaction history.",
    image: "/Crypto.avif",
    tags: ["Mobile App", "Crypto Wallet", "UI/UX Design"],
  },
  {
    id: "6",
    title: "Sudoku-Solver",
    description: "This is a simple Sudoku solver application written in C++. It takes a 9x9 Sudoku puzzle as input and solves it using a backtracking algorithm.",
    image: "SudokuSolver.png",
    tags: ["C++", "Backtracking Algorithm", "Conceptual Problem Solving"],
  },
  {
    id: "7",
    title: "Ziplyn",
    description: "Experimental project to create a file compression and extraction utility in Rust.",
    image: "Ziplyn.png",
    tags: ["Rust", "File Compression", "File Extraction"],
  },
];

export const Projects = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    const section = document.getElementById('projects');
    if (section) observer.observe(section);

    return () => {
      if (section) observer.unobserve(section);
    };
  }, []);

  return (
    <section id="projects" className="section bg-card/80 backdrop-blur-sm border-y border-border/50 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 sm:mb-12 flex flex-col items-start">
          <span className="px-4 py-3 sm:px-5 rounded-full bg-accent/90 text-accent-foreground mb-3 sm:mb-4 text-base sm:text-lg border border-border/50 font-medium">
            My Work
          </span>
          <h2 className="section-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl">Featured Projects</h2>
          <p className="section-subheading text-xl sm:text-2xl md:text-2xl">
            A selection of my recent work across various domains.
            Each project represents a unique challenge and solution.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8">
          {projects.map((project, index) => (
            <div 
              key={project.id} 
              className={isVisible ? `animate-fade-in animate-delay-${index * 100}` : 'opacity-0'}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <ProjectCard project={project} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
