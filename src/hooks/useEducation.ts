import { useState, useEffect } from 'react';
import { mockEducation } from '@/data/mockData';

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
        // Simulate async operation
        await new Promise(resolve => setTimeout(resolve, 200));

        const formattedEducation: EducationItem[] = mockEducation.map(edu => ({
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
