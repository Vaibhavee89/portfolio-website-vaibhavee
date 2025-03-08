import { ArrowDown } from 'lucide-react';

export const Hero = () => {
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
            <a href="#projects" className="button-primary">
              Download Resume
            </a>
            <a href="#contact" className="button-secondary">
              Get in Touch
            </a>
          </div>
        </div>
        
        <div className="flex-1 mt-8 md:mt-0 animate-fade-in animate-delay-200">
          <div className="relative w-full max-w-md mx-auto">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-2xl blur-md"></div>
            <div className="relative aspect-square rounded-2xl overflow-hidden border border-border">
<img 
  src="public/femaleprogrammer.png" 
  alt="Vaibhavee Singh" 
  className="w-full h-full object-cover"
/>
            </div>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 animate-bounce">
        <a href="#about" aria-label="Scroll down">
          <ArrowDown size={24} />
        </a>
      </div>
      
      {/* Background elements */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-primary/5 blur-3xl animate-float"></div>
      <div className="absolute bottom-1/3 right-1/4 w-96 h-96 rounded-full bg-primary/5 blur-3xl animate-float animate-delay-300"></div>
    </section>
  );
};

export default Hero;

