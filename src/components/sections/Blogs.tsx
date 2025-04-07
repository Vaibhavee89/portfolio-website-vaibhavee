
import { useState, useEffect } from 'react';
import { ArrowRight, BookOpen } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  devToUrl: string;
}

const sampleBlogs: BlogPost[] = [
  {
    id: "blog-1",
    title: "Tech Giants vs. Open Source: The Arms Race of GenAI",
    excerpt: "An epic clash unfolds between tech giants and open-source rebels, each vying to shape the future of generative AI through innovation, access, and control.",
    date: "March 5, 2025",
    readTime: "3 min",
    devToUrl: "https://dev.to/vaibhavee_singh89/tech-giants-vs-open-source-the-arms-race-of-genai-381p"
  },
  {
    id: "blog-2",
    title: "Live Coding and Hot Code Swapping- Updating a running program without restarting it",
    excerpt: "Discover how Live Coding and Hot Code Swapping can supercharge your development workflow by letting you update code on the fly—no restarts needed!",
    date: "March 15, 2025",
    readTime: "13 min",
    devToUrl: "https://dev.to/vaibhavee_singh89/live-coding-hot-code-swapping-updating-a-running-program-without-restarting-it-35f9"
  },
  {
    id: "blog-3",
    title: "Meta Programming - Writing code that generates or modifies other code dynamically",
    excerpt: "Unlock the power of metaprogramming to automate tasks like logging by letting your code dynamically write and modify itself.",
    date: "March 20, 2025",
    readTime: "8 min",
    devToUrl: "https://dev.to/vaibhavee_singh89/meta-programming-writing-code-that-generates-or-modifies-other-code-dynamically-11ck"
  }
];

const Blogs = () => {
  const [isVisible, setIsVisible] = useState(false);

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
    <section id="blogs" className="section">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12 flex flex-col items-start">
          <span className="px-4 py-2 rounded-full bg-accent text-accent-foreground mb-4">
            My Thoughts
          </span>
          <h2 className="section-heading">Latest Blog Posts</h2>
          <p className="section-subheading">
            Insights, tutorials, and reflections from my journey in technology and development.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sampleBlogs.map((blog, index) => (
            <Card 
              key={blog.id} 
              className={`card-hover overflow-hidden border ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardHeader className="pb-3">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs text-muted-foreground">
                    {blog.date} · {blog.readTime} read
                  </span>
                </div>
                <CardTitle className="text-xl">{blog.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm line-clamp-3">
                  {blog.excerpt}
                </CardDescription>
              </CardContent>
              <CardFooter>
                <Button variant="ghost" className="p-0 h-auto text-primary hover:text-primary hover:bg-transparent" asChild>
                  <a href={blog.devToUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1">
                    Read on dev.to <ArrowRight className="h-4 w-4" />
                  </a>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        
        <div className="mt-12 flex justify-center">
          <Button variant="outline" size="lg" asChild>
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
