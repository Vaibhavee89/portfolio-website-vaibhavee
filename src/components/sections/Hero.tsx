
import { ArrowDown, ArrowRight, Rocket } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { handleScrollToSection } from "@/lib/utils";

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
    <section className="min-h-screen flex flex-col justify-center items-center relative px-4 sm:px-8 lg:px-12 py-24">
      <div className="w-full max-w-6xl mx-auto grid lg:grid-cols-[1.15fr_minmax(280px,1fr)] gap-10 items-center">
        <div className="order-2 lg:order-1 space-y-8 text-center lg:text-left animate-fade-in">
          <span className="inline-flex items-center gap-2 starlight-pill badge-pulse mx-auto lg:mx-0">
            <span className="w-2.5 h-2.5 rounded-full bg-primary shadow-[0_0_18px_rgba(80,213,255,0.9)]"></span>
            Hello, I'm Vaibhavee Singh
          </span>

          <div className="space-y-4">
            <p className="uppercase tracking-[0.6em] text-xs sm:text-sm text-primary/80">Innovate · Iterate · Interstellar</p>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.05] text-foreground/95">
              <span className="libertinus-mono-regular">
                INNOVATE&nbsp;&ndash;&nbsp;ITERATE&nbsp;&ndash;&nbsp;INSPIRE
              </span>
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground/80 max-w-2xl mx-auto lg:mx-0">
              Crafting data-driven, immersive experiences across the cloud, AI/ML, and human-centered design. Welcome to mission control for my portfolio.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 sm:gap-6">
            <button
              type="button"
              onClick={handleDownloadResume}
              className="glow-button glow-button--primary group"
              aria-label="Launch mission by downloading resume"
            >
              <Rocket size={18} className="group-hover:scale-110 transition-transform duration-300" />
              Launch Mission
            </button>

            <button
              type="button"
              onClick={handleScrollToSection('contact')}
              className="glow-button glow-button--secondary group"
              aria-label="Navigate to contact section"
            >
              <span className="uppercase tracking-[0.3em] text-xs">Contact</span>
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-300" />
            </button>
          </div>
        </div>

        <div className="order-1 lg:order-2 justify-self-center w-full max-w-xs sm:max-w-sm lg:max-w-md animate-fade-in animate-delay-200">
          <div className="quantum-portal">
            <div className="portal-glow" />
            <div className="portal-core">
              <img
                src="/femaleprogrammer.png"
                alt="Vaibhavee Singh"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce">
        <Button
          variant="ghost"
          onClick={handleScrollToSection('about')}
          aria-label="Scroll down"
          className="p-2 rounded-full border border-primary/30 bg-black/40 hover:bg-primary/10"
        >
          <ArrowDown size={22} className="text-primary" />
        </Button>
      </div>

      <div className="absolute -top-10 left-[8%] w-28 h-28 sm:w-48 sm:h-48 rounded-full bg-primary/10 blur-3xl animate-float"></div>
      <div className="absolute bottom-10 right-[12%] w-40 h-40 sm:w-72 sm:h-72 rounded-full bg-accent/15 blur-3xl animate-float animate-delay-300"></div>
    </section>
  );
};

export default Hero;
