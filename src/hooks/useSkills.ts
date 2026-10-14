import { useState, useEffect } from 'react';
import * as LucideIcons from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export interface Skill {
  name: string;
  Icon: LucideIcon;
}

interface SkillRow {
  id: string;
  name: string;
  icon_name: string;
  display_order: number;
}

export const useSkills = () => {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        setLoading(true);
        const res = await fetch('/api/skills');
        if (!res.ok) throw new Error('Failed to fetch skills');
        const rows: SkillRow[] = await res.json();

        setSkills(
          rows.map((row) => ({
            name: row.name,
            Icon: (LucideIcons as unknown as Record<string, LucideIcon>)[row.icon_name] || LucideIcons.Code,
          }))
        );
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
