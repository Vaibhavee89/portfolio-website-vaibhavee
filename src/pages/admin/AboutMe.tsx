import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Save, Loader2, User, Plus, Trash2, GripVertical } from 'lucide-react';
import { useAboutMe, Highlight } from '@/hooks/useAboutMe';

export default function AboutMe() {
  const { aboutMe, loading, refetch } = useAboutMe();
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image_url: '',
    highlights: [] as Highlight[],
  });

  const normalizeHighlights = (highlights: Highlight[]) =>
    highlights
      .slice()
      .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
      .map((highlight, index) => ({ ...highlight, order: index }));

  const sanitizeHighlights = (highlights: Highlight[]) =>
    normalizeHighlights(
      highlights.filter((highlight) => {
        const title = highlight.title?.trim() ?? '';
        const description = highlight.description?.trim() ?? '';
        return title !== '' || description !== '';
      })
    );

  useEffect(() => {
    if (aboutMe) {
      setFormData({
        title: aboutMe.title,
        description: aboutMe.description,
        image_url: aboutMe.image_url,
        highlights: normalizeHighlights(aboutMe.highlights || []),
      });
    }
  }, [aboutMe]);

  const addHighlight = () => {
    const newHighlight: Highlight = {
      id: Date.now().toString(),
      title: '',
      description: '',
      order: formData.highlights.length,
    };
    setFormData({
      ...formData,
      highlights: [...formData.highlights, newHighlight],
    });
  };

  const removeHighlight = (id: string) => {
    const filtered = formData.highlights.filter((h) => h.id !== id);
    setFormData({
      ...formData,
      highlights: normalizeHighlights(filtered),
    });
  };

  const updateHighlight = (id: string, field: 'title' | 'description', value: string) => {
    setFormData({
      ...formData,
      highlights: formData.highlights.map((h) =>
        h.id === id ? { ...h, [field]: value } : h
      ),
    });
  };

  const moveHighlight = (index: number, direction: 'up' | 'down') => {
    const newHighlights = [...formData.highlights];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    
    if (targetIndex < 0 || targetIndex >= newHighlights.length) return;
    
    [newHighlights[index], newHighlights[targetIndex]] = [newHighlights[targetIndex], newHighlights[index]];
    
    newHighlights.forEach((h, i) => {
      h.order = i;
    });
    
    setFormData({ ...formData, highlights: newHighlights });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const sanitizedHighlights = sanitizeHighlights(formData.highlights);

      const { error } = await supabase
        .from('about_me')
        .update({
          title: formData.title,
          description: formData.description,
          image_url: formData.image_url,
          highlights: sanitizedHighlights,
        })
        .eq('id', aboutMe?.id);

      if (error) throw error;

      setFormData((prev) => ({
        ...prev,
        highlights: sanitizedHighlights,
      }));

      toast({
        title: 'Success',
        description: 'About Me section updated successfully',
      });

      refetch();
    } catch (error) {
      console.error('Error updating about me:', error);
      toast({
        title: 'Error',
        description: 'Failed to update About Me section',
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
        <User className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-3xl font-bold">About Me Section</h1>
          <p className="text-muted-foreground">Edit your personal introduction and highlights</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Main Content</CardTitle>
            <CardDescription>Your personal introduction and profile image</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="e.g., A passionate technologist"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Write your personal introduction..."
                rows={6}
                required
              />
              <p className="text-xs text-muted-foreground">
                This is your main introduction that appears in the About section
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="image_url">Profile Image URL</Label>
              <Input
                id="image_url"
                value={formData.image_url}
                onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                placeholder="/MyImage.png"
                required
              />
              <p className="text-xs text-muted-foreground">
                Path to your profile image (e.g., /MyImage.png)
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Highlights</CardTitle>
                <CardDescription>Add highlight cards to showcase your key strengths (optional)</CardDescription>
              </div>
              <Button type="button" onClick={addHighlight} size="sm">
                <Plus className="mr-2 h-4 w-4" />
                Add Highlight
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {formData.highlights.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <p>No highlights added yet. Click "Add Highlight" to create one.</p>
              </div>
            ) : (
              formData.highlights.map((highlight, index) => (
                <Card key={highlight.id} className="border-2">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-base">Highlight {index + 1}</CardTitle>
                      <div className="flex items-center gap-2">
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => moveHighlight(index, 'up')}
                          disabled={index === 0}
                          title="Move up"
                        >
                          <GripVertical className="h-4 w-4" />
                        </Button>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => moveHighlight(index, 'down')}
                          disabled={index === formData.highlights.length - 1}
                          title="Move down"
                        >
                          <GripVertical className="h-4 w-4 rotate-180" />
                        </Button>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => removeHighlight(highlight.id)}
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="space-y-2">
                      <Label htmlFor={`highlight_${highlight.id}_title`}>Title</Label>
                      <Input
                        id={`highlight_${highlight.id}_title`}
                        value={highlight.title}
                        onChange={(e) => updateHighlight(highlight.id, 'title', e.target.value)}
                        placeholder="e.g., AI, Cloud & Research"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`highlight_${highlight.id}_description`}>Description</Label>
                      <Textarea
                        id={`highlight_${highlight.id}_description`}
                        value={highlight.description}
                        onChange={(e) => updateHighlight(highlight.id, 'description', e.target.value)}
                        placeholder="Brief description..."
                        rows={2}
                      />
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </CardContent>
        </Card>

        <div className="flex justify-end gap-3">
          <Button type="submit" disabled={saving}>
            {saving ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
