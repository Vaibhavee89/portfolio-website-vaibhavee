import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
}

export interface ProjectDetails extends Project {
  fullDescription: string;
  liveLink?: string;
  githubLink?: string;
  images: string[];
}

export const useProjects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('projects')
          .select('*')
          .order('display_order', { ascending: true });

        if (error) throw error;

        const formattedProjects: Project[] = (data || []).map(project => ({
          id: project.id,
          title: project.title,
          description: project.description,
          image: project.image_url || '',
          tags: project.tags || []
        }));

        setProjects(formattedProjects);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch projects');
        console.error('Error fetching projects:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return { projects, loading, error };
};

export const useProjectDetails = (projectId: string) => {
  const [project, setProject] = useState<ProjectDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjectDetails = async () => {
      try {
        setLoading(true);
        
        const { data: projectData, error: projectError } = await supabase
          .from('projects')
          .select('*')
          .eq('id', projectId)
          .single();

        if (projectError) throw projectError;
        if (!projectData) throw new Error('Project not found');

        const { data: imagesData, error: imagesError } = await supabase
          .from('project_images')
          .select('image_url')
          .eq('project_id', projectId)
          .order('display_order', { ascending: true });

        if (imagesError) throw imagesError;

        const images = imagesData?.map(img => img.image_url) || [];
        if (images.length === 0 && projectData.image_url) {
          images.push(projectData.image_url);
        }

        const formattedProject: ProjectDetails = {
          id: projectData.id,
          title: projectData.title,
          description: projectData.description,
          fullDescription: projectData.full_description || projectData.description,
          image: projectData.image_url || '',
          tags: projectData.tags || [],
          liveLink: projectData.live_link || undefined,
          githubLink: projectData.github_link || undefined,
          images: images
        };

        setProject(formattedProject);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch project details');
        console.error('Error fetching project details:', err);
      } finally {
        setLoading(false);
      }
    };

    if (projectId) {
      fetchProjectDetails();
    }
  }, [projectId]);

  return { project, loading, error };
};
