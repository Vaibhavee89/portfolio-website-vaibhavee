// Supported site themes. Each id matches a `:root[data-theme="<id>"]` block in
// src/index.css, which overrides the colour tokens. "nebula" is the default
// and lives on :root itself. Keep the list in sync with api/settings.ts.
//
// The theme is set only from the admin panel's Settings page — there is no
// visitor-facing switcher, so every visitor sees whatever the admin chose.

export interface ThemeOption {
  id: string;
  label: string;
  swatch: string; // preview colour for the admin picker
}

export const THEMES: ThemeOption[] = [
  { id: 'nebula', label: 'Nebula Cyan', swatch: 'hsl(189 95% 68%)' },
  { id: 'sunset', label: 'Sunset Ember', swatch: 'hsl(22 95% 62%)' },
  { id: 'emerald', label: 'Emerald Aurora', swatch: 'hsl(152 70% 55%)' },
  { id: 'violet', label: 'Violet Dusk', swatch: 'hsl(265 90% 72%)' },
];

export const DEFAULT_THEME = 'nebula';
