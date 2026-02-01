import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  FolderKanban,
  Award,
  GraduationCap,
  Briefcase,
  FileText,
  Image,
  Code,
  ArrowRight,
} from 'lucide-react';

interface Stats {
  projects: number;
  skills: number;
  certifications: number;
  education: number;
  workExperience: number;
  blogPosts: number;
  events: number;
}

export default function Dashboard() {
  const [stats, setStats] = useState<Stats>({
    projects: 0,
    skills: 0,
    certifications: 0,
    education: 0,
    workExperience: 0,
    blogPosts: 0,
    events: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const [projects, skills, certs, edu, work, blogs, events] = await Promise.all([
          supabase.from('projects').select('id', { count: 'exact', head: true }),
          supabase.from('skills').select('id', { count: 'exact', head: true }),
          supabase.from('certifications').select('id', { count: 'exact', head: true }),
          supabase.from('education').select('id', { count: 'exact', head: true }),
          supabase.from('work_experience').select('id', { count: 'exact', head: true }),
          supabase.from('blog_posts').select('id', { count: 'exact', head: true }),
          supabase.from('events').select('id', { count: 'exact', head: true }),
        ]);

        setStats({
          projects: projects.count || 0,
          skills: skills.count || 0,
          certifications: certs.count || 0,
          education: edu.count || 0,
          workExperience: work.count || 0,
          blogPosts: blogs.count || 0,
          events: events.count || 0,
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchStats();
  }, []);

  const statCards = [
    { name: 'Projects', count: stats.projects, icon: FolderKanban, href: '/admin/projects', color: 'text-blue-500' },
    { name: 'Skills', count: stats.skills, icon: Code, href: '/admin/skills', color: 'text-green-500' },
    { name: 'Certifications', count: stats.certifications, icon: Award, href: '/admin/certifications', color: 'text-yellow-500' },
    { name: 'Education', count: stats.education, icon: GraduationCap, href: '/admin/education', color: 'text-purple-500' },
    { name: 'Work Experience', count: stats.workExperience, icon: Briefcase, href: '/admin/work-experience', color: 'text-orange-500' },
    { name: 'Blog Posts', count: stats.blogPosts, icon: FileText, href: '/admin/blog-posts', color: 'text-pink-500' },
    { name: 'Events', count: stats.events, icon: Image, href: '/admin/events', color: 'text-cyan-500' },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground mt-2">
          Manage your portfolio content from one place
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {statCards.map((stat) => (
          <Card key={stat.name} className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.name}</CardTitle>
              <stat.icon className={`h-5 w-5 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.count}</div>
              <Link to={stat.href}>
                <Button variant="link" className="px-0 mt-2 h-auto text-xs">
                  Manage <ArrowRight className="ml-1 h-3 w-3" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common tasks to manage your portfolio</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Link to="/admin/projects">
            <Button variant="outline" className="w-full justify-start">
              <FolderKanban className="mr-2 h-4 w-4" />
              Add New Project
            </Button>
          </Link>
          <Link to="/admin/blog-posts">
            <Button variant="outline" className="w-full justify-start">
              <FileText className="mr-2 h-4 w-4" />
              Add Blog Post
            </Button>
          </Link>
          <Link to="/admin/certifications">
            <Button variant="outline" className="w-full justify-start">
              <Award className="mr-2 h-4 w-4" />
              Add Certification
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
