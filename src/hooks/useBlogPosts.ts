import { useState, useEffect } from 'react';

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  devToUrl: string;
}

interface BlogPostRow {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  read_time: string;
  dev_to_url: string;
}

export const useBlogPosts = () => {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        setLoading(true);
        const res = await fetch('/api/blog-posts');
        if (!res.ok) throw new Error('Failed to fetch blog posts');
        const rows: BlogPostRow[] = await res.json();

        setBlogPosts(
          rows.map((post) => ({
            id: post.id,
            title: post.title,
            excerpt: post.excerpt,
            date: post.date,
            readTime: post.read_time,
            devToUrl: post.dev_to_url,
          }))
        );
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
