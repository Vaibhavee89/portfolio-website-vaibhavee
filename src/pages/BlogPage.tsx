
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
  category: string;
}

const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'The Principles of Minimalist Design',
    excerpt: 'Explore the core principles that make minimalist design so effective and timeless.',
    date: 'June 15, 2023',
    image: 'https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2067&q=80',
    category: 'Design',
  },
  // {
  //   id: '2',
  //   title: 'Building Scalable React Applications',
  //   excerpt: 'Learn the best practices for creating React applications that scale well as they grow.',
  //   date: 'May 22, 2023',
  //   image: 'https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
  //   category: 'Development',
  // },
  // {
  //   id: '3',
  //   title: 'The Future of UI Animation',
  //   excerpt: 'How motion design is shaping the future of user interfaces and experiences.',
  //   date: 'April 10, 2023',
  //   image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
  //   category: 'Animation',
  // },
  // {
  //   id: '4',
  //   title: 'Typography in Modern Web Design',
  //   excerpt: 'Why typography matters more than ever in modern web design and how to use it effectively.',
  //   date: 'March 28, 2023',
  //   image: 'https://images.unsplash.com/photo-1651140849623-a1d7ac2f1f1c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
  //   category: 'Typography',
  // },
  // {
  //   id: '5',
  //   title: 'Optimizing Web Performance',
  //   excerpt: 'Strategies for improving web performance and why it matters for user experience.',
  //   date: 'February 15, 2023',
  //   image: 'https://images.unsplash.com/photo-1534972195531-d756b9bfa9f2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
  //   category: 'Performance',
  // },
  // {
  //   id: '6',
  //   title: 'The Psychology of Color in Web Design',
  //   excerpt: 'How color choices impact user perception and behavior in digital experiences.',
  //   date: 'January 30, 2023',
  //   image: 'https://images.unsplash.com/photo-1579547945413-497e1b99dac0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2039&q=80',
  //   category: 'Design',
  // },
];

const categories = ['All', ...Array.from(new Set(blogPosts.map((post) => post.category)))];

const BlogPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>(blogPosts);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    if (selectedCategory === 'All') {
      setFilteredPosts(blogPosts);
    } else {
      setFilteredPosts(blogPosts.filter((post) => post.category === selectedCategory));
    }
  }, [selectedCategory]);

  return (
    <div className="min-h-screen flex flex-col">
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
            
            <div className="flex flex-wrap gap-2 mb-10 animate-fade-in animate-delay-300">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full transition-all ${
                    selectedCategory === category
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-secondary text-secondary-foreground hover:bg-primary/10'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post, index) => (
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
                      <span className="px-3 py-1 text-xs font-medium bg-secondary rounded-full">
                        {post.category}
                      </span>
                      <span className="text-sm text-muted-foreground">{post.date}</span>
                    </div>
                    
                    <h2 className="text-xl font-bold mb-2 line-clamp-2">{post.title}</h2>
                    <p className="text-muted-foreground mb-4 line-clamp-3">{post.excerpt}</p>
                    
                    <a
                      href={`/blog/${post.id}`}
                      className="inline-flex items-center font-medium text-foreground hover:text-primary transition-colors"
                    >
                      Read More <ArrowRight size={16} className="ml-1" />
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default BlogPage;
