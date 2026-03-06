import { useState, useEffect } from 'react';
import { mockCertifications } from '@/data/mockData';
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
        // Simulate async operation
        await new Promise(resolve => setTimeout(resolve, 200));

        const formattedCertifications: Certification[] = mockCertifications.map(cert => ({
          name: cert.name,
          issuer: cert.issuer,
          date: cert.date,
          Icon: cert.Icon,
          credentialUrl: cert.credential_url || undefined,
          description: cert.description || undefined
        }));

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
