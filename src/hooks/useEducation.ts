import { useState, useEffect } from 'react';

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
        const res = await fetch('/api/education');
        if (!res.ok) throw new Error('Failed to fetch education');
        const rows: EducationItem[] = await res.json();
        setEducation(rows);
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
