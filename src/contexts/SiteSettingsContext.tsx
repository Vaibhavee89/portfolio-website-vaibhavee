import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { readVisitorTheme, writeVisitorTheme, resolveTheme } from '@/lib/themes';

// Values used until the API responds, or if it fails. They match the
// migration defaults, so the page looks the same either way.
export const DEFAULT_SETTINGS: Record<string, string> = {
  theme: 'nebula',
  hero_title: 'INNOVATE',
  hero_highlight: 'ITERATE & INSPIRE',
  hero_subtitle: 'Crafting data-driven, immersive experiences across the cloud, AI/ML, and human-centered design. Welcome to my portfolio.',
  hero_image_url: '/femaleprogrammer.png',
  about_title: '',
  about_image_url: '',
};

interface SiteSettingsContextType {
  settings: Record<string, string>;
  // The theme actually applied to the page, after visitor choice and site default.
  activeTheme: string;
  // null means "follow the site default".
  visitorTheme: string | null;
  setVisitorTheme: (id: string | null) => void;
}

const SiteSettingsContext = createContext<SiteSettingsContextType | undefined>(undefined);

export function SiteSettingsProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<Record<string, string>>(DEFAULT_SETTINGS);
  const [visitorTheme, setVisitorThemeState] = useState<string | null>(() => readVisitorTheme());

  useEffect(() => {
    let cancelled = false;
    fetch('/api/settings')
      .then((res) => (res.ok ? res.json() : Promise.reject(new Error('settings unavailable'))))
      .then((data: Record<string, string>) => {
        if (!cancelled) setSettings({ ...DEFAULT_SETTINGS, ...data });
      })
      .catch((err) => {
        // Keep the defaults; the site still renders.
        console.error('Failed to load site settings:', err);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const activeTheme = resolveTheme(visitorTheme, settings.theme);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', activeTheme);
  }, [activeTheme]);

  const setVisitorTheme = useCallback((id: string | null) => {
    writeVisitorTheme(id);
    setVisitorThemeState(id);
  }, []);

  return (
    <SiteSettingsContext.Provider value={{ settings, activeTheme, visitorTheme, setVisitorTheme }}>
      {children}
    </SiteSettingsContext.Provider>
  );
}

export function useSiteSettings() {
  const context = useContext(SiteSettingsContext);
  if (context === undefined) {
    throw new Error('useSiteSettings must be used within a SiteSettingsProvider');
  }
  return context;
}
