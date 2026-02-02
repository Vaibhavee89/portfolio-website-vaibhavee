import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Save, Loader2, User } from 'lucide-react';
import { useAboutMe } from '@/hooks/useAboutMe';

export default function AboutMe() {
  const { aboutMe, loading, refetch } = useAboutMe();
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image_url: '',
    highlight_1_title: '',
    highlight_1_description: '',
    highlight_2_title: '',
    highlight_2_description: '',
  });

  useEffect(() => {
    if (aboutMe) {
      setFormData({
        title: aboutMe.title,
        description: aboutMe.description,
        image_url: aboutMe.image_url,
        highlight_1_title: aboutMe.highlight_1_title,
        highlight_1_description: aboutMe.highlight_1_description,
        highlight_2_title: aboutMe.highlight_2_title,
        highlight_2_description: aboutMe.highlight_2_description,
      });
    }
  }, [aboutMe]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const { error } = await supabase
        .from('about_me')
        .update({
          title: formData.title,
          description: formData.description,
          image_url: formData.image_url,
          highlight_1_title: formData.highlight_1_title,
          highlight_1_description: formData.highlight_1_description,
          highlight_2_title: formData.highlight_2_title,
          highlight_2_description: formData.highlight_2_description,
        })
        .eq('id', aboutMe?.id);

      if (error) throw error;

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
            <CardTitle>Highlight 1</CardTitle>
            <CardDescription>First highlight card (left side)</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="highlight_1_title">Title</Label>
              <Input
                id="highlight_1_title"
                value={formData.highlight_1_title}
                onChange={(e) => setFormData({ ...formData, highlight_1_title: e.target.value })}
                placeholder="e.g., AI, Cloud & Research"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="highlight_1_description">Description</Label>
              <Textarea
                id="highlight_1_description"
                value={formData.highlight_1_description}
                onChange={(e) => setFormData({ ...formData, highlight_1_description: e.target.value })}
                placeholder="Brief description..."
                rows={2}
                required
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Highlight 2</CardTitle>
            <CardDescription>Second highlight card (right side)</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="highlight_2_title">Title</Label>
              <Input
                id="highlight_2_title"
                value={formData.highlight_2_title}
                onChange={(e) => setFormData({ ...formData, highlight_2_title: e.target.value })}
                placeholder="e.g., Continuous learning"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="highlight_2_description">Description</Label>
              <Textarea
                id="highlight_2_description"
                value={formData.highlight_2_description}
                onChange={(e) => setFormData({ ...formData, highlight_2_description: e.target.value })}
                placeholder="Brief description..."
                rows={2}
                required
              />
            </div>
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
