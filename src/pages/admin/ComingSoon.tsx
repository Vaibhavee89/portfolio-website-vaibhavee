import { useLocation } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Construction } from 'lucide-react';

// Shown for admin sidebar sections that don't have an editor yet. Without this
// the nested route renders nothing and the page looks broken.
export default function ComingSoon() {
  const { pathname } = useLocation();
  const section = pathname.split('/').filter(Boolean).pop() ?? 'This section';
  const label = section.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());

  return (
    <Card className="max-w-xl">
      <CardHeader>
        <div className="flex items-center gap-3">
          <Construction className="h-6 w-6 text-primary" />
          <CardTitle>{label}</CardTitle>
        </div>
        <CardDescription>
          The editor for this section isn't built yet. The public site still shows its content from the database.
        </CardDescription>
      </CardHeader>
      <CardContent />
    </Card>
  );
}
