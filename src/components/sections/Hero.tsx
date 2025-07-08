
import { ArrowDown } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { useEffect } from 'react';
import { Button } from "@/components/ui/button";

export const Hero = () => {
  const { toast } = useToast();

  const handleDownloadResume = () => {
    try {
      // For most modern browsers
      fetch('/resume.pdf')
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.blob();
        })
        .then(blob => {
          // Create blob link to download
          const url = window.URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', 'Vaibhavee_Singh_Resume.pdf');
          
          // Append to html link element page
          document.body.appendChild(link);
          
          // Start download
          link.click();
          
          // Clean up and remove the link
          link.parentNode?.removeChild(link);
          window.URL.revokeObjectURL(url);
          
          toast({
            title: "Success!",
            description: "Resume download started",
            duration: 3000,
          });
        })
        .catch(error => {
          console.error("Download error:", error);
          
          // Fallback for browsers that don't support fetch or blob
          const link = document.createElement('a');
          link.href = '/resume.pdf';
          link.download = 'Vaibhavee_Singh_Resume.pdf';
          link.target = '_blank';
          link.rel = 'noopener noreferrer';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          
          toast({
            title: "Success!",
            description: "Resume download started",
            duration: 3000,
          });
        });
    } catch (error) {
      console.error("Download error:", error);
      
      // Ultimate fallback
      window.open('/resume.pdf', '_blank', 'noopener,noreferrer');
      
      toast({
        title: "Success!",
        description: "Resume download started in new tab",
        duration: 3000,
      });
    }
  };

  const handleScrollToSection = (sectionId: string) => (event: React.MouseEvent | React.TouchEvent) => {
    event.preventDefault();
    
    const section = document.getElementById(sectionId);
    if (!section) {
      console.warn(`Section with id "${sectionId}" not found`);
      return;
    }
    
    // Try multiple scroll methods for maximum browser compatibility
    try {
      // Method 1: Modern smooth scrolling
      if ('scrollBehavior' in document.documentElement.style) {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } 
      // Method 2: jQuery-like animation fallback
      else {
        const targetPosition = section.getBoundingClientRect().top + window.pageYOffset;
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        const duration = 1000;
        let start: number | null = null;
        
        const step = (timestamp: number) => {
          if (!start) start = timestamp;
          const progress = timestamp - start;
          const percentage = Math.min(progress / duration, 1);
          
          // Easing function for smoother animation
          const easeInOutQuad = (t: number) => {
            return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
          };
          
          window.scrollTo(0, startPosition + distance * easeInOutQuad(percentage));
          
          if (progress < duration) {
            window.requestAnimationFrame(step);
          }
        };
        
        window.requestAnimationFrame(step);
      }
    } catch (error) {
      console.error("Scroll error:", error);
      
      // Fallback 1: Basic scroll
      try {
        window.scrollTo({
          top: section.offsetTop,
          behavior: 'smooth'
        });
      } catch (fallbackError) {
        console.error("Fallback scroll error:", fallbackError);
        
        // Fallback 2: Most basic scroll
        window.scrollTo(0, section.offsetTop);
        
        // Fallback 3: Location hash as last resort
        window.location.hash = sectionId;
      }
    }
  };
  
  // Ensure anchor links work on initial page load
  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash) {
        const id = window.location.hash.substring(1);
        const element = document.getElementById(id);
        if (element) {
          setTimeout(() => {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }, 100);
        }
      }
    };
    
    // Run once on component mount
    handleHashChange();
    
    // Add event listener for hash changes
    window.addEventListener('hashchange', handleHashChange);
    
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  return (
    <section className="min-h-screen flex flex-col justify-center items-center relative px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
      <div className="w-full max-w-7xl mx-auto flex flex-col lg:flex-row items-center text-center lg:text-left gap-8 lg:gap-12">
        <div className="flex-1 flex flex-col items-center lg:items-start order-2 lg:order-1">
          <span className="inline-block px-3 py-2 sm:px-4 rounded-full bg-secondary text-secondary-foreground mb-4 sm:mb-6 animate-fade-in text-sm sm:text-base">
            Hello, I'm Vaibhavee Singh
          </span>
          
          <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6 tracking-tight leading-tight animate-fade-in animate-delay-100 animate-bouncy">
            <span className="libertinus-mono-regular typing-animation block">
              INNOVATE-ITERATE-INSPIRE
            </span>
          </h1>
          
          <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-3 sm:gap-4 animate-fade-in animate-delay-300 w-full sm:w-auto">
            <Button 
              onClick={handleDownloadResume}
              variant="default"
              className="bg-primary text-primary-foreground px-6 sm:px-10 py-6 sm:py-8 rounded-md text-sm sm:text-base w-full sm:w-auto"
              aria-label="Download Resume"
            >
              Download Resume
            </Button>
            
            <Button 
              variant="outline"
              className="bg-background text-foreground border-border px-6 sm:px-10 py-6 sm:py-8 rounded-md text-sm sm:text-base w-full sm:w-auto"
              onClick={handleScrollToSection('contact')}
              aria-label="Get in Touch"
            >
              Get in Touch
            </Button>
          </div>
        </div>
        
        <div className="flex-1 mt-8 lg:mt-0 animate-fade-in animate-delay-200 order-1 lg:order-2">
          <div className="relative w-full max-w-xs sm:max-w-sm md:max-w-md mx-auto">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-2xl blur-md"></div>
            <div className="relative aspect-square rounded-2xl overflow-hidden border border-border">
              <img 
                src="/femaleprogrammer.png" 
                alt="Vaibhavee Singh" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-8 sm:bottom-12 left-1/2 transform -translate-x-1/2 animate-bounce">
        <Button 
          variant="ghost"
          onClick={handleScrollToSection('about')}
          aria-label="Scroll down"
          className="p-2"
        >
          <ArrowDown size={20} className="sm:w-6 sm:h-6" />
        </Button>
      </div>
      
      {/* Background elements */}
      <div className="absolute top-1/4 left-1/4 w-32 h-32 sm:w-64 sm:h-64 rounded-full bg-primary/5 blur-3xl animate-float"></div>
      <div className="absolute bottom-1/3 right-1/4 w-48 h-48 sm:w-96 sm:h-96 rounded-full bg-primary/5 blur-3xl animate-float animate-delay-300"></div>
    </section>
  );
};

export default Hero;
