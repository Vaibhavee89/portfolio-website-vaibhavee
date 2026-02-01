import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

export interface EventImage {
  src: string;
  alt: string;
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
        const { data, error } = await supabase
          .from('events')
          .select('*')
          .order('display_order', { ascending: true });

        if (error) throw error;

        const formattedEvents: EventImage[] = (data || []).map(event => ({
          src: event.image_url,
          alt: event.alt_text,
          caption: event.caption
        }));

        setEvents(formattedEvents);
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
