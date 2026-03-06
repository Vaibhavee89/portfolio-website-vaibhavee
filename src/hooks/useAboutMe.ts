import { useState, useEffect } from 'react';
import { mockAboutMe } from '@/data/mockData';

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
      // Simulate async operation
      await new Promise(resolve => setTimeout(resolve, 300));
      setAboutMe(mockAboutMe);
    } catch (err) {
      console.error('Error fetching about me:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch about me data');
    } finally {
      setLoading(false);
    }
  }

  return { aboutMe, loading, error, refetch: fetchAboutMe };
}
