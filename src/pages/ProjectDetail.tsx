
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { ArrowLeft, ExternalLink, Github } from 'lucide-react';
import { useProjectDetails } from '../hooks/useProjects';

const ProjectDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { project, loading, error } = useProjectDetails(id || '');
  const [isVisible, setIsVisible] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    setIsVisible(false);
    setCurrentImageIndex(0);
    
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-transparent">
        <Header />
        <main className="flex-grow pt-24 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="min-h-screen flex flex-col bg-transparent">
        <Header />
        <main className="flex-grow pt-24 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">Project Not Found</h1>
            <p className="text-muted-foreground mb-6">
              {error || "The project you're looking for doesn't exist or has been removed."}
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
    <div className="min-h-screen flex flex-col bg-transparent">
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
                  {(project.fullDescription || project.description).split('\n\n').map((paragraph, index) => (
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
