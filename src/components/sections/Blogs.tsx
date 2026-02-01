
import { useState, useEffect } from 'react';
import { ArrowRight, BookOpen } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useBlogPosts } from '@/hooks/useBlogPosts';

const Blogs = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { blogPosts, loading, error } = useBlogPosts();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    const section = document.getElementById('blogs');
    if (section) observer.observe(section);

    return () => {
      if (section) observer.unobserve(section);
    };
  }, []);

  return (
    <section id="blogs" className="section bg-secondary/60 backdrop-blur-sm px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 sm:mb-12 flex flex-col items-start">
          <span className="px-4 py-3 sm:px-5 rounded-full bg-accent/90 text-accent-foreground mb-3 sm:mb-4 text-base sm:text-lg border border-border/50 font-medium">
            My Thoughts
          </span>
          <h2 className="section-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl">Latest Blog Posts</h2>
          <p className="section-subheading text-xl sm:text-2xl md:text-2xl">
            Insights, tutorials, and reflections from my journey in technology and development.
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-64 bg-card/50 rounded-xl animate-pulse" />
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-destructive">Failed to load blog posts. Please try again later.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8">
            {blogPosts.map((blog, index) => (
              <Card 
                key={blog.id} 
                className={`card-hover overflow-hidden ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm sm:text-base text-muted-foreground">
                      {blog.date} · {blog.readTime} read
                    </span>
                  </div>
                  <CardTitle className="text-xl sm:text-2xl">{blog.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base sm:text-lg line-clamp-3">
                    {blog.excerpt}
                  </CardDescription>
                </CardContent>
                <CardFooter>
                  <Button variant="ghost" className="p-0 h-auto text-primary hover:text-primary hover:bg-transparent" asChild>
                    <a href={blog.devToUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-base">
                      Read on dev.to <ArrowRight className="h-4 w-4" />
                    </a>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
        
        <div className="mt-8 sm:mt-12 flex justify-center">
          <Button variant="outline" size="lg" asChild className="bg-card/90 border-2 border-border hover:bg-card text-base">
            <a href="https://dev.to/vaibhavee_singh89" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
              <BookOpen size={18} />
              View All Posts on dev.to
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Blogs;
