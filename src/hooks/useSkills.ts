import { useState, useEffect } from 'react';
import { mockSkills } from '@/data/mockData';
import type { LucideIcon } from 'lucide-react';

export interface Skill {
  name: string;
  Icon: LucideIcon;
}

export const useSkills = () => {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        setLoading(true);
        // Simulate async operation
        await new Promise(resolve => setTimeout(resolve, 200));
        setSkills(mockSkills);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch skills');
        console.error('Error fetching skills:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchSkills();
  }, []);

  return { skills, loading, error };
};
