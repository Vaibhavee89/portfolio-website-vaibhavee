import { useState, useEffect } from 'react';

export interface EventImage {
  src: string;
  alt: string;
  caption: string;
}

interface EventRow {
  id: string;
  image_url: string;
  alt_text: string;
  caption: string;
}

export const useEvents = () => {
  const [events, setEvents] = useState<EventImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const res = await fetch('/api/events');
        if (!res.ok) throw new Error('Failed to fetch events');
        const rows: EventRow[] = await res.json();

        setEvents(
          rows.map((event) => ({
            src: event.image_url,
            alt: event.alt_text,
            caption: event.caption,
          }))
        );
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch events');
        console.error('Error fetching events:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  return { events, loading, error };
};
