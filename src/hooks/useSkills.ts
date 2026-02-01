import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import * as LucideIcons from 'lucide-react';
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
        const { data, error } = await supabase
          .from('skills')
          .select('*')
          .order('display_order', { ascending: true });

        if (error) throw error;

        const formattedSkills: Skill[] = (data || []).map(skill => {
          const IconComponent = (LucideIcons as any)[skill.icon_name] || LucideIcons.Code;
          return {
            name: skill.name,
            Icon: IconComponent
          };
        });

        setSkills(formattedSkills);
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
