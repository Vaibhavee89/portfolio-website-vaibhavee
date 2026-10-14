import { createContext, useContext, useEffect, useState } from 'react';
import { DEFAULT_THEME, THEMES } from '@/lib/themes';

// Values used until the API responds, or if it fails. They match the
// migration defaults, so the page looks the same either way.
export const DEFAULT_SETTINGS: Record<string, string> = {
  theme: DEFAULT_THEME,
  hero_title: 'INNOVATE',
  hero_highlight: 'ITERATE & INSPIRE',
  hero_subtitle: 'Crafting data-driven, immersive experiences across the cloud, AI/ML, and human-centered design. Welcome to my portfolio.',
  hero_image_url: '/femaleprogrammer.png',
  about_title: '',
  about_image_url: '',
};

interface SiteSettingsContextType {
  settings: Record<string, string>;
  // The theme applied to the page — set only via Settings in the admin
  // panel. There is no visitor-facing switcher; every visitor sees the
  // site default.
  activeTheme: string;
}

const SiteSettingsContext = createContext<SiteSettingsContextType | undefined>(undefined);

export function SiteSettingsProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<Record<string, string>>(DEFAULT_SETTINGS);

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

  const activeTheme = THEMES.some((t) => t.id === settings.theme) ? settings.theme : DEFAULT_THEME;

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', activeTheme);
  }, [activeTheme]);

  return (
    <SiteSettingsContext.Provider value={{ settings, activeTheme }}>
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
