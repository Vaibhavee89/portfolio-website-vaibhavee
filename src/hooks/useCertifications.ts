import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import * as LucideIcons from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export interface Certification {
  name: string;
  issuer: string;
  date: string;
  Icon: LucideIcon;
  credentialUrl?: string;
  description?: string;
}

export const useCertifications = () => {
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCertifications = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('certifications')
          .select('*')
          .order('display_order', { ascending: true });

        if (error) throw error;

        const formattedCertifications: Certification[] = (data || []).map(cert => {
          const IconComponent = (LucideIcons as any)[cert.icon_name] || LucideIcons.Award;
          return {
            name: cert.name,
            issuer: cert.issuer,
            date: cert.date,
            Icon: IconComponent,
            credentialUrl: cert.credential_url || undefined,
            description: cert.description || undefined
          };
        });

        setCertifications(formattedCertifications);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch certifications');
        console.error('Error fetching certifications:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCertifications();
  }, []);

  return { certifications, loading, error };
};
