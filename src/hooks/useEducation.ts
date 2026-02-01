import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

export interface EducationItem {
  title: string;
  period: string;
  description: string;
}

export const useEducation = () => {
  const [education, setEducation] = useState<EducationItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEducation = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('education')
          .select('*')
          .order('display_order', { ascending: true });

        if (error) throw error;

        const formattedEducation: EducationItem[] = (data || []).map(edu => ({
          title: edu.title,
          period: edu.period,
          description: edu.description
        }));

        setEducation(formattedEducation);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch education');
        console.error('Error fetching education:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchEducation();
  }, []);

  return { education, loading, error };
};
