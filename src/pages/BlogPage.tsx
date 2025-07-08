
import { useState, useEffect } from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { ArrowRight } from 'lucide-react';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  image: string;
  devToUrl: string;
}

const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Tech Giants vs. Open Source: The Arms Race of GenAI',
    excerpt: 'Explore the core principles that make minimalist design so effective and timeless.',
    date: 'Mar 5, 2025',
    image: "",
    devToUrl: 'https://dev.to/vaibhavee/tech-giants-vs-open-source-the-arms-race-of-genai'
  },
  {
    id: '2',
    title: 'Building Scalable React Applications',
    excerpt: 'Learn the best practices for creating React applications that scale well as they grow.',
    date: 'May 22, 2023',
    image: 'https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    devToUrl: 'https://dev.to/vaibhavee/building-scalable-react-applications'
  },
  {
    id: '3',
    title: 'The Future of UI Animation',
    excerpt: 'How motion design is shaping the future of user interfaces and experiences.',
    date: 'April 10, 2023',
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    devToUrl: 'https://dev.to/vaibhavee/the-future-of-ui-animation'
  },
  {
    id: '4',
    title: 'Typography in Modern Web Design',
    excerpt: 'Why typography matters more than ever in modern web design and how to use it effectively.',
    date: 'March 28, 2023',
    image: 'https://images.unsplash.com/photo-1651140849623-a1d7ac2f1f1c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    devToUrl: 'https://dev.to/vaibhavee/typography-in-modern-web-design'
  },
  {
    id: '5',
    title: 'Optimizing Web Performance',
    excerpt: 'Strategies for improving web performance and why it matters for user experience.',
    date: 'February 15, 2023',
    image: 'https://images.unsplash.com/photo-1534972195531-d756b9bfa9f2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    devToUrl: 'https://dev.to/vaibhavee/optimizing-web-performance'
  },
  {
    id: '6',
    title: 'The Psychology of Color in Web Design',
    excerpt: 'How color choices impact user perception and behavior in digital experiences.',
    date: 'January 30, 2023',
    image: 'https://images.unsplash.com/photo-1579547945413-497e1b99dac0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2039&q=80',
    devToUrl: 'https://dev.to/vaibhavee/the-psychology-of-color-in-web-design'
  }
];

const BlogPage = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-transparent">
      <Header />
      
      <main className="flex-grow pt-24">
        <section className="section">
          <div className="max-w-7xl mx-auto">
            <div className="mb-12 flex flex-col items-start">
              <span className="px-4 py-2 rounded-full bg-secondary text-secondary-foreground mb-4 animate-fade-in">
                My Blog
              </span>
              <h1 className="section-heading animate-fade-in animate-delay-100">
                Thoughts & Insights
              </h1>
              <p className="section-subheading animate-fade-in animate-delay-200">
                Sharing my learning 
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts.map((post, index) => (
                <article 
                  key={post.id} 
                  className={`bg-card border border-border rounded-xl overflow-hidden card-hover ${
                    isVisible ? 'animate-fade-in' : 'opacity-0'
                  }`}
                  style={{ animationDelay: `${index * 100 + 400}ms` }}
                >
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                  </div>
                  
                  <div className="p-6">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-sm text-muted-foreground">{post.date}</span>
                    </div>
                    
                    <h2 className="text-xl font-bold mb-2 line-clamp-2">{post.title}</h2>
                    <p className="text-muted-foreground mb-4 line-clamp-3">{post.excerpt}</p>
                    
                    <a
                      href={post.devToUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center font-medium text-foreground hover:text-primary transition-colors"
                    >
                      Read on dev.to <ArrowRight size={16} className="ml-1" />
                    </a>
                  </div>
                </article>
              ))}
            </div>
            
            <div className="mt-12 flex justify-center">
              <a 
                href="https://dev.to/vaibhavee" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                View All Posts on dev.to <ArrowRight size={18} className="ml-2" />
              </a>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default BlogPage;
