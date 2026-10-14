import { THEMES } from '@/lib/themes';
import { useSiteSettings } from '@/contexts/SiteSettingsContext';

// Lets visitors pick a theme. The choice is saved in their browser; "Site
// default" clears it and follows whatever the admin set in Settings.
export default function ThemeSwitcher() {
  const { activeTheme, visitorTheme, setVisitorTheme } = useSiteSettings();

  return (
    <div className="flex items-center gap-2">
      <span
        className="h-3 w-3 rounded-full border border-border"
        style={{ backgroundColor: THEMES.find((t) => t.id === activeTheme)?.swatch }}
        aria-hidden="true"
      />
      <select
        aria-label="Choose colour theme"
        value={visitorTheme ?? ''}
        onChange={(e) => setVisitorTheme(e.target.value || null)}
        className="rounded-md border border-border bg-card/80 px-2 py-1 text-sm text-foreground backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-ring"
      >
        <option value="">Site default</option>
        {THEMES.map((theme) => (
          <option key={theme.id} value={theme.id}>
            {theme.label}
          </option>
        ))}
      </select>
    </div>
  );
}
