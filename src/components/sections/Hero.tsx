
import { ArrowDown } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";

export const Hero = () => {
  const { toast } = useToast();

  const handleDownloadResume = () => {
    try {
      // Create a link element
      const link = document.createElement('a');
      // Set the href to the path of your resume PDF
      link.href = '/resume.pdf'; // This assumes you'll place the PDF in the public folder
      // Set the download attribute to suggest a filename
      link.download = 'Vaibhavee_Singh_Resume.pdf';
      // For Safari compatibility
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      // Append to the document
      document.body.appendChild(link);
      // Trigger the download
      link.click();
      // Clean up
      document.body.removeChild(link);
      
      toast({
        title: "Success!",
        description: "Resume download started",
        duration: 3000,
      });
    } catch (error) {
      console.error("Download error:", error);
      toast({
        title: "Download failed",
        description: "Please try again or contact me directly",
        variant: "destructive",
        duration: 5000,
      });
    }
  };

  const handleScrollToSection = (sectionId: string) => (event: React.MouseEvent | React.TouchEvent) => {
    event.preventDefault();
    
    // Enhanced scroll functionality with fallbacks
    try {
      const section = document.getElementById(sectionId);
      if (section) {
        // Check if smooth scrolling is supported
        if ('scrollBehavior' in document.documentElement.style) {
          section.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
          // Fallback for browsers that don't support smooth scrolling
          const offsetTop = section.getBoundingClientRect().top + window.pageYOffset;
          window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
          });
        }
      } else {
        console.warn(`Section with id "${sectionId}" not found`);
      }
    } catch (error) {
      console.error("Scrolling error:", error);
      // Ultimate fallback, just change location hash
      window.location.hash = sectionId;
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
    <section className="min-h-screen flex flex-col justify-center items-center relative px-6 py-20">
      <div className="w-full max-w-7xl mx-auto flex flex-col md:flex-row items-center text-center md:text-left gap-8">
        <div className="flex-1 flex flex-col items-center md:items-start">
          <span className="inline-block px-4 py-2 rounded-full bg-secondary text-secondary-foreground mb-6 animate-fade-in">
            Hello, I'm Vaibhavee Singh
          </span>
          
          <h1 className="text-4xl md:text-7xl font-bold mb-6 tracking-tight leading-tight animate-fade-in animate-delay-100">
            INNOVATE-ITERATE-INSPIRE
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-2xl mb-8 animate-fade-in animate-delay-200">
            "Innovation is the ability to see change as an opportunity, not a threat." - Steve Jobs 
          </p>
          
          <div className="flex flex-wrap justify-center md:justify-start gap-4 animate-fade-in animate-delay-300">
            <Button 
              onClick={handleDownloadResume}
              variant="default"
              className="bg-primary text-primary-foreground px-6 py-2 rounded-md"
              aria-label="Download Resume"
            >
              Download Resume
            </Button>
            
            <Button 
              variant="outline"
              className="bg-background text-foreground border-border px-6 py-2 rounded-md"
              onClick={handleScrollToSection('contact')}
              aria-label="Get in Touch"
            >
              Get in Touch
            </Button>
          </div>
        </div>
        
        <div className="flex-1 mt-8 md:mt-0 animate-fade-in animate-delay-200">
          <div className="relative w-full max-w-md mx-auto">
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
      
      <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 animate-bounce">
        <Button 
          variant="ghost"
          onClick={handleScrollToSection('about')}
          aria-label="Scroll down"
          className="p-2"
        >
          <ArrowDown size={24} />
        </Button>
      </div>
      
      {/* Background elements */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-primary/5 blur-3xl animate-float"></div>
      <div className="absolute bottom-1/3 right-1/4 w-96 h-96 rounded-full bg-primary/5 blur-3xl animate-float animate-delay-300"></div>
    </section>
  );
};

export default Hero;
