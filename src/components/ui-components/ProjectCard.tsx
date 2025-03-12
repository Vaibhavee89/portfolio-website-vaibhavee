import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
}

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div 
      className="card-hover rounded-xl overflow-hidden bg-card border border-border h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative overflow-hidden aspect-video">
        <img 
          src={project.image} 
          alt={project.title} 
          className="w-full h-full object-contain transition-transform duration-700 ease-out"
          style={{
            transform: isHovered ? 'scale(1.05)' : 'scale(1)'
          }}
          onError={(e) => {
            console.error(`Failed to load image: ${project.image}`);
            e.currentTarget.src = "https://placehold.co/600x400?text=Image+Not+Found";
          }}
        />
        <div className={`absolute inset-0 bg-black/40 opacity-0 transition-opacity duration-300 ${isHovered ? 'opacity-100' : ''}`}>
          <div className="flex justify-end p-4">
            <Link 
              to={`/project/${project.id}`}
              className="p-2 bg-white text-black rounded-full opacity-0 transform translate-y-4 transition-all duration-300"
              style={{
                opacity: isHovered ? 1 : 0,
                transform: isHovered ? 'translateY(0)' : 'translateY(4px)'
              }}
            >
              <ArrowUpRight size={20} />
            </Link>
          </div>
        </div>
      </div>
      
      <div className="p-6">
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
        
        <h3 className="text-xl font-bold mb-2">{project.title}</h3>
        <p className="text-muted-foreground mb-4">{project.description}</p>
        
        <Link 
          to={`/project/${project.id}`}
          className="inline-flex items-center font-medium text-foreground hover:text-primary transition-colors"
        >
          View Project <ArrowUpRight size={16} className="ml-1" />
        </Link>
      </div>
    </div>
  );
};

export default ProjectCard;
