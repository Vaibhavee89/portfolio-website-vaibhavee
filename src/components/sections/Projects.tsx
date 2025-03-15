
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
  // {
  //   id: "4",
  //   title: "AetherMed",
  //   description: "A mobile app for controlling smart home devices with a focus on simplicity and usability.",
  //   image: "https://images.unsplash.com/photo-1558002038-2f4bb8741991?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
  //   tags: ["Mobile App", "IoT", "React Native"],
  // },
  // {
  //   id: "5",
  //   title: "BreezeNow",
  //   description: "A comprehensive fitness app for tracking workouts, nutrition, and health metrics.",
  //   image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
  //   tags: ["Mobile App", "Health", "UI/UX Design"],
  // },
  // {
  //   id: "6",
  //   title: "NumGenie",
  //   description: "A minimal portfolio website showcasing a photographer's work with immersive viewing experience.",
  //   image: "https://images.unsplash.com/photo-1520390138845-fd2d229dd553?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2092&q=80",
  //   tags: ["Portfolio", "Photography", "Gallery"],
  // },
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
    <section id="projects" className="section bg-secondary">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12 flex flex-col items-start">
          <span className="px-4 py-2 rounded-full bg-accent text-accent-foreground mb-4">
            My Work
          </span>
          <h2 className="section-heading">Featured Projects</h2>
          <p className="section-subheading">
            A selection of my recent work across various domains.
            Each project represents a unique challenge and solution.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
