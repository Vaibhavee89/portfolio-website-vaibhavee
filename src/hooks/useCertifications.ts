import { useState, useEffect } from 'react';
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

interface CertificationRow {
  id: string;
  name: string;
  issuer: string;
  date: string | null;
  icon_name: string;
  credential_url: string | null;
  description: string | null;
}

export const useCertifications = () => {
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCertifications = async () => {
      try {
        setLoading(true);
        const res = await fetch('/api/certifications');
        if (!res.ok) throw new Error('Failed to fetch certifications');
        const rows: CertificationRow[] = await res.json();

        setCertifications(
          rows.map((cert) => ({
            name: cert.name,
            issuer: cert.issuer,
            date: cert.date || '',
            Icon: (LucideIcons as unknown as Record<string, LucideIcon>)[cert.icon_name] || LucideIcons.Award,
            credentialUrl: cert.credential_url || undefined,
            description: cert.description || undefined,
          }))
        );
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
