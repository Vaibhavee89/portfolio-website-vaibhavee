import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

export interface AboutMe {
  id: string;
  title: string;
  description: string;
  image_url: string;
  highlight_1_title: string;
  highlight_1_description: string;
  highlight_2_title: string;
  highlight_2_description: string;
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
      const { data, error } = await supabase
        .from('about_me')
        .select('*')
        .single();

      if (error) throw error;
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
