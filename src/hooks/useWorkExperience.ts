import { useState, useEffect } from 'react';

export interface WorkItem {
  title: string;
  organisation: string;
  period: string;
  description: string;
  badge: string;
}

export const useWorkExperience = () => {
  const [workExperience, setWorkExperience] = useState<WorkItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWorkExperience = async () => {
      try {
        setLoading(true);
        const res = await fetch('/api/work-experience');
        if (!res.ok) throw new Error('Failed to fetch work experience');
        const rows: WorkItem[] = await res.json();
        setWorkExperience(rows);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch work experience');
        console.error('Error fetching work experience:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchWorkExperience();
  }, []);

  return { workExperience, loading, error };
};
