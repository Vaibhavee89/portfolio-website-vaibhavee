
import { Github, Linkedin, Mail, Twitter, Youtube } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-secondary py-12 border-t border-border">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <Link to="/" className="text-2xl font-bold font-mono tracking-tight">
              Portfolio.
            </Link>
            <p className="text-muted-foreground max-w-xs">
            Innovate. Iterate. Inspire.
            </p>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-bold">Navigation</h3>
            <nav className="flex flex-col space-y-2">
              <Link to="/" className="hover:text-primary transition-colors">Home</Link>
              <a href="/#about" className="hover:text-primary transition-colors">About</a>
              <a href="/#projects" className="hover:text-primary transition-colors">Projects</a>
              <Link to="/blog" className="hover:text-primary transition-colors">Blog</Link>
              <a href="/#contact" className="hover:text-primary transition-colors">Contact</a>
            </nav>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-bold">Connect</h3>
            <div className="flex space-x-4">
              <a href="https://github.com/Vaibhavee89" target="_blank" rel="noopener noreferrer" className="p-2 bg-background rounded-full hover:text-primary transition-colors" aria-label="GitHub">
                <Github size={20} />
              </a>
              <a href="https://www.linkedin.com/in/vaibhavee-singh-1b7996252/" target="_blank" rel="noopener noreferrer" className="p-2 bg-background rounded-full hover:text-primary transition-colors" aria-label="LinkedIn">
                <Linkedin size={20} />
              </a>
              <a href="https://x.com/VaibhaveeSingh3" target="_blank" rel="noopener noreferrer" className="p-2 bg-background rounded-full hover:text-primary transition-colors" aria-label="Twitter">
                <Twitter size={20} />
              </a>
              <a href="mailto:vaibhaveesingh89@gmail.com" className="p-2 bg-background rounded-full hover:text-primary transition-colors" aria-label="Email">
                <Mail size={20} />
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-border mt-8 pt-8 text-center text-muted-foreground">
          <p>© {2025} Portfolio. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
