
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import ThemeToggle from '../ui-components/ThemeToggle';

interface NavItem {
  label: string;
  href: string;
  external?: boolean;
}

const navItems: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/#about' },
  { label: 'Projects', href: '/#projects' },
  { label: 'Blogs', href: 'https://dev.to/vaibhavee_singh89', external: true },
  { label: 'Contact', href: '/#contact' },
];

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll event to change header style
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-background/90 backdrop-blur-md shadow-sm py-2' : 'bg-transparent py-4'
    }`}>
      <div className="container mx-auto px-6 flex items-center justify-between">
        <Link 
          to="/" 
          className={`font-bold font-mono tracking-tight transition-all duration-300 ${
            isScrolled ? 'text-xl' : 'text-2xl'
          }`}
          onClick={closeMenu}
        >
          Vaibhavee ʚɞ
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          {navItems.map((item) => (
            item.external ? (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`nav-link transition-all duration-300 ${
                  isScrolled ? 'text-sm py-1 px-3' : 'py-2 px-4'
                }`}
              >
                {item.label}
              </a>
            ) : item.href.startsWith('/#') ? (
              <a
                key={item.label}
                href={item.href}
                className={`nav-link transition-all duration-300 ${
                  isScrolled ? 'text-sm py-1 px-3' : 'py-2 px-4'
                }`}
              >
                {item.label}
              </a>
            ) : (
              <Link
                key={item.label}
                to={item.href}
                className={`nav-link transition-all duration-300 ${
                  isScrolled ? 'text-sm py-1 px-3' : 'py-2 px-4'
                }`}
              >
                {item.label}
              </Link>
            )
          ))}
          <div className="ml-4">
            <ThemeToggle />
          </div>
        </nav>

        {/* Mobile Navigation Toggle */}
        <div className="flex items-center md:hidden">
          <ThemeToggle />
          <button
            className="ml-4 p-2 text-foreground"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-background z-40 pt-20">
          <nav className="flex flex-col items-center justify-center h-full">
            {navItems.map((item) => (
              item.external ? (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="nav-link text-xl py-4"
                  onClick={closeMenu}
                >
                  {item.label}
                </a>
              ) : item.href.startsWith('/#') ? (
                <a
                  key={item.label}
                  href={item.href}
                  className="nav-link text-xl py-4"
                  onClick={closeMenu}
                >
                  {item.label}
                </a>
              ) : (
                <Link
                  key={item.label}
                  to={item.href}
                  className="nav-link text-xl py-4"
                  onClick={closeMenu}
                >
                  {item.label}
                </Link>
              )
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
