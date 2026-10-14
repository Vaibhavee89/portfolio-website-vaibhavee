import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import SpaceBackground from "./components/three/SpaceBackground";
import ProtectedRoute from "./components/admin/ProtectedRoute";
import AdminLayout from "./components/admin/AdminLayout";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import BlogPage from "./pages/BlogPage";
import ProjectDetail from "./pages/ProjectDetail";
import Login from "./pages/admin/Login";
import Dashboard from "./pages/admin/Dashboard";
import Projects from "./pages/admin/Projects";
import Skills from "./pages/admin/Skills";
import AboutMe from "./pages/admin/AboutMe";
import ComingSoon from "./pages/admin/ComingSoon";
import Certifications from "./pages/admin/Certifications";
import Education from "./pages/admin/Education";
import WorkExperience from "./pages/admin/WorkExperience";
import BlogPosts from "./pages/admin/BlogPosts";
import Events from "./pages/admin/Events";

const queryClient = new QueryClient();

// The space scene is for the public portfolio pages only — the admin
// dashboard uses its own plain UI, so it's skipped there.
const SiteBackground = () => {
  const { pathname } = useLocation();
  if (pathname.startsWith("/admin")) return null;
  return <SpaceBackground />;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <SiteBackground />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/project/:id" element={<ProjectDetail />} />
            
            <Route path="/admin/login" element={<Login />} />
            <Route
              path="/admin/*"
              element={
                <ProtectedRoute>
                  <AdminLayout />
                </ProtectedRoute>
              }
            >
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="projects" element={<Projects />} />
              <Route path="skills" element={<Skills />} />
              <Route path="about" element={<AboutMe />} />
              <Route path="certifications" element={<Certifications />} />
              <Route path="education" element={<Education />} />
              <Route path="work-experience" element={<WorkExperience />} />
              <Route path="blog-posts" element={<BlogPosts />} />
              <Route path="events" element={<Events />} />
              {/* Sidebar sections without an editor yet — show a placeholder instead of a blank page */}
              <Route path="*" element={<ComingSoon />} />
            </Route>
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;