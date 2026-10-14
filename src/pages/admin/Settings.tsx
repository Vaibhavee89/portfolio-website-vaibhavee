import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ImageUpload } from '@/components/admin/ImageUpload';
import { useToast } from '@/hooks/use-toast';
import { THEMES } from '@/lib/themes';
import { DEFAULT_SETTINGS } from '@/contexts/SiteSettingsContext';
import { Loader2, Save, Settings as SettingsIcon } from 'lucide-react';

type FormState = typeof DEFAULT_SETTINGS;

export default function SettingsPage() {
  const [form, setForm] = useState<FormState>(DEFAULT_SETTINGS);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch('/api/settings');
        if (!res.ok) throw new Error('Failed to load settings');
        const data: Record<string, string> = await res.json();
        setForm({ ...DEFAULT_SETTINGS, ...data } as FormState);
      } catch (error) {
        toast({
          title: 'Error',
          description: error instanceof Error ? error.message : 'Failed to load settings',
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [toast]);

  const update = (key: keyof FormState, value: string) => setForm((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch('/api/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to save settings');
      toast({ title: 'Settings saved', description: 'Refresh the public site to see changes.' });
    } catch (error) {
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to save settings',
        variant: 'destructive',
      });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <SettingsIcon className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-3xl font-bold">Settings</h1>
          <p className="text-muted-foreground">Theme, landing page and About section content</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Colour Theme</CardTitle>
            <CardDescription>
              The default for new visitors. Visitors can change it from the header, and their choice is remembered in their browser.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid gap-3 sm:grid-cols-2">
              {THEMES.map((theme) => (
                <label
                  key={theme.id}
                  className={`flex cursor-pointer items-center gap-3 rounded-lg border p-3 transition-colors ${
                    form.theme === theme.id ? 'border-primary bg-primary/10' : 'border-border hover:bg-muted/50'
                  }`}
                >
                  <input
                    type="radio"
                    name="theme"
                    value={theme.id}
                    checked={form.theme === theme.id}
                    onChange={() => update('theme', theme.id)}
                    className="sr-only"
                  />
                  <span className="h-6 w-6 rounded-full border border-border" style={{ backgroundColor: theme.swatch }} />
                  <span className="font-medium">{theme.label}</span>
                </label>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Landing Page (Hero)</CardTitle>
            <CardDescription>The headline and image at the top of your home page</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="hero_title">Headline (first line)</Label>
                <Input id="hero_title" value={form.hero_title} onChange={(e) => update('hero_title', e.target.value)} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="hero_highlight">Headline (gradient line)</Label>
                <Input id="hero_highlight" value={form.hero_highlight} onChange={(e) => update('hero_highlight', e.target.value)} />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="hero_subtitle">Subtitle</Label>
              <Textarea id="hero_subtitle" rows={3} value={form.hero_subtitle} onChange={(e) => update('hero_subtitle', e.target.value)} />
            </div>
            <ImageUpload
              label="Hero Image"
              value={form.hero_image_url}
              onChange={(url) => update('hero_image_url', url)}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>About Section</CardTitle>
            <CardDescription>
              Leave a field empty to use the value from the About Me page. The description and highlights are still managed there.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="about_title">Heading</Label>
              <Input id="about_title" value={form.about_title} onChange={(e) => update('about_title', e.target.value)} placeholder="Leave empty to use About Me title" />
            </div>
            <ImageUpload
              label="Portrait Image (leave empty to use About Me image)"
              value={form.about_image_url}
              onChange={(url) => update('about_image_url', url)}
            />
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button type="submit" disabled={saving}>
            {saving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
            {saving ? 'Saving...' : 'Save Settings'}
          </Button>
        </div>
      </form>
    </div>
  );
}
