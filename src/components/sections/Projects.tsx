
import { useState, useEffect } from 'react';
import ProjectCard from '../ui-components/ProjectCard';
import { useProjects } from '@/hooks/useProjects';

export const Projects = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { projects, loading, error } = useProjects();

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

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-96 bg-card/50 rounded-xl animate-pulse" />
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-destructive">Failed to load projects. Please try again later.</p>
          </div>
        ) : (
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
        )}
      </div>
    </section>
  );
};

export default Projects;
