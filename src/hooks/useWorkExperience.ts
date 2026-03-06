import { useState, useEffect } from 'react';
import { mockWorkExperience } from '@/data/mockData';

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
        // Simulate async operation
        await new Promise(resolve => setTimeout(resolve, 200));

        const formattedWork: WorkItem[] = mockWorkExperience.map(work => ({
          title: work.title,
          organisation: work.organisation,
          period: work.period,
          description: work.description,
          badge: work.badge
        }));

        setWorkExperience(formattedWork);
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
