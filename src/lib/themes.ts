// Supported site themes. Each id matches a `:root[data-theme="<id>"]` block in
// src/index.css, which overrides the colour tokens. "nebula" is the default
// and lives on :root itself. Keep the list in sync with api/settings.ts.

export interface ThemeOption {
  id: string;
  label: string;
  swatch: string; // preview colour for the picker
}

export const THEMES: ThemeOption[] = [
  { id: 'nebula', label: 'Nebula Cyan', swatch: 'hsl(189 95% 68%)' },
  { id: 'sunset', label: 'Sunset Ember', swatch: 'hsl(22 95% 62%)' },
  { id: 'emerald', label: 'Emerald Aurora', swatch: 'hsl(152 70% 55%)' },
  { id: 'violet', label: 'Violet Dusk', swatch: 'hsl(265 90% 72%)' },
];

export const DEFAULT_THEME = 'nebula';

const VISITOR_THEME_KEY = 'visitor_theme';

// localStorage can throw (private windows, blocked storage), so every access
// is wrapped and falls back to "no preference".
export function readVisitorTheme(): string | null {
  try {
    const value = window.localStorage.getItem(VISITOR_THEME_KEY);
    return value && THEMES.some((t) => t.id === value) ? value : null;
  } catch {
    return null;
  }
}

export function writeVisitorTheme(id: string | null) {
  try {
    if (id === null) window.localStorage.removeItem(VISITOR_THEME_KEY);
    else window.localStorage.setItem(VISITOR_THEME_KEY, id);
  } catch {
    // Ignore: the choice still applies for this page view.
  }
}

export function resolveTheme(visitorChoice: string | null, siteDefault: string | undefined): string {
  const candidates = [visitorChoice, siteDefault, DEFAULT_THEME];
  return candidates.find((id) => id && THEMES.some((t) => t.id === id)) ?? DEFAULT_THEME;
}
