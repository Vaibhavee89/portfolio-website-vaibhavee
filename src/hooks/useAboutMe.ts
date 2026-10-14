import { useState, useEffect } from 'react';

export interface Highlight {
  id: string;
  title: string;
  description: string;
  order: number;
}

export interface AboutMe {
  id: string;
  title: string;
  description: string;
  image_url: string;
  highlights: Highlight[];
  created_at: string;
  updated_at: string;
}

export function useAboutMe() {
  const [aboutMe, setAboutMe] = useState<AboutMe | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchAboutMe();
  }, []);

  async function fetchAboutMe() {
    try {
      setLoading(true);
      const res = await fetch('/api/about-me');
      if (!res.ok) throw new Error('Failed to fetch about me data');
      const data: AboutMe = await res.json();
      setAboutMe(data);
    } catch (err) {
      console.error('Error fetching about me:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch about me data');
    } finally {
      setLoading(false);
    }
  }

  return { aboutMe, loading, error, refetch: fetchAboutMe };
}
