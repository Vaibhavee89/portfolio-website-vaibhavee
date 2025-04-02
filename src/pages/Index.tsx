
import { useEffect } from 'react';
import emailjs from 'emailjs-com';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import Hero from '../components/sections/Hero';
import About from '../components/sections/About';
import Projects from '../components/sections/Projects';
import Blogs from '../components/sections/Blogs';
import Contact from '../components/sections/Contact';
import EventCarousel from '../components/sections/EventCarousel';

const Index = () => {
  useEffect(() => {
    // Initialize EmailJS
    emailjs.init("user_yourUserId"); // Replace with your actual USER_ID from EmailJS
    
    // Animation on scroll
    const animateOnScroll = () => {
      const elements = document.querySelectorAll('.animate-on-scroll');
      
      elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementHeight = element.getBoundingClientRect().height;
        const windowHeight = window.innerHeight;
        
        if (elementTop < windowHeight - elementHeight / 2) {
          element.classList.add('animated');
        }
      });
    };
    
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Initial check
    
    return () => window.removeEventListener('scroll', animateOnScroll);
  }, []);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        <Hero />
        <About />
        <Projects />
        <Blogs />
        <EventCarousel />
        <Contact />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
