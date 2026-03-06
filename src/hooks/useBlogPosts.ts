import { useState, useEffect } from 'react';
import { mockBlogPosts } from '@/data/mockData';

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  devToUrl: string;
}

export const useBlogPosts = () => {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        setLoading(true);
        // Simulate async operation
        await new Promise(resolve => setTimeout(resolve, 200));

        const formattedPosts: BlogPost[] = mockBlogPosts.map(post => ({
          id: post.id,
          title: post.title,
          excerpt: post.excerpt,
          date: post.date,
          readTime: post.read_time,
          devToUrl: post.dev_to_url
        }));

        setBlogPosts(formattedPosts);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch blog posts');
        console.error('Error fetching blog posts:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogPosts();
  }, []);

  return { blogPosts, loading, error };
};
