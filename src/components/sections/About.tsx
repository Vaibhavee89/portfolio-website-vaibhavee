import { useState, useEffect } from 'react';
import {
  Code,
  BookOpen,
  Trophy,
  Briefcase,
  BadgeCheck,
  KeyRound,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { handleScrollToSection } from '@/lib/utils';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Card, CardContent } from '@/components/ui/card';
import { useSkills } from '@/hooks/useSkills';
import { useCertifications } from '@/hooks/useCertifications';
import { useEducation } from '@/hooks/useEducation';
import { useWorkExperience } from '@/hooks/useWorkExperience';
import { useAboutMe } from '@/hooks/useAboutMe';

export const About = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedCertificate, setSelectedCertificate] = useState<any>(null);
  
  const { aboutMe, loading: aboutLoading } = useAboutMe();
  const { skills, loading: skillsLoading } = useSkills();
  const { certifications, loading: certsLoading } = useCertifications();
  const { education, loading: eduLoading } = useEducation();
  const { workExperience, loading: workLoading } = useWorkExperience();
  const [dialogOpen, setDialogOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    const section = document.getElementById('about');
    if (section) observer.observe(section);

    return () => {
      if (section) observer.unobserve(section);
    };
  }, []);

  const handleShowCredentials = (cert: any) => {
    if (cert.credentialUrl) {
      setSelectedCertificate(cert);
      setDialogOpen(true);
    } else {
      toast({
        title: "Credential Information",
        description: "Detailed credential information not available at this time.",
        duration: 3000,
      });
    }
  };

  return (
    <section id="about" className="section">
      <div className="max-w-7xl mx-auto">
        <div className={`${isVisible ? 'animate-fade-in' : 'opacity-0'} mb-16`}>
          <span className="px-4 py-2 rounded-full bg-secondary text-secondary-foreground inline-block">
            About Me
          </span>
          <div className="glass-card mt-6 mx-auto w-full max-w-5xl p-6 sm:p-8 md:p-10 flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-12">
            {aboutLoading ? (
              <div className="w-full text-center py-8">
                <p className="text-muted-foreground">Loading...</p>
              </div>
            ) : aboutMe ? (
              <>
                <div className="flex-shrink-0 w-full max-w-[260px]">
                  <div className="relative aspect-square w-full overflow-hidden rounded-[24px] border border-primary/30 bg-card/80 shadow-[0_18px_42px_rgba(26,160,255,0.18)]">
                    <img
                      src={aboutMe.image_url}
                      alt="Portrait of Vaibhavee"
                      className="h-full w-full object-cover object-top"
                    />
                  </div>
                </div>
                <div className="space-y-4 text-center md:text-left">
                  <h3 className="text-2xl sm:text-3xl font-bold text-foreground">
                    {aboutMe.title}
                  </h3>
                  <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                    {aboutMe.description}
                  </p>
                  <div className="grid w-full gap-3 sm:grid-cols-2 text-sm sm:text-base text-muted-foreground/90">
                    <div className="rounded-xl border border-primary/20 bg-card/60 px-4 py-3 backdrop-blur-sm">
                      <p className="font-semibold text-foreground">{aboutMe.highlight_1_title}</p>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {aboutMe.highlight_1_description}
                      </p>
                    </div>
                    <div className="rounded-xl border border-primary/20 bg-card/60 px-4 py-3 backdrop-blur-sm">
                      <p className="font-semibold text-foreground">{aboutMe.highlight_2_title}</p>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {aboutMe.highlight_2_description}
                      </p>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="w-full text-center py-8">
                <p className="text-muted-foreground">No content available</p>
              </div>
            )}
          </div>
        </div>

        <div className={`mb-16 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
          <div className="flex items-center gap-3 mb-8">
            <BookOpen className="text-primary" size={28} />
            <h3 className="text-2xl font-bold">Educational Journey</h3>
          </div>
          <div className="relative pl-8 md:pl-12">
            <span className="pointer-events-none absolute left-3 md:left-5 top-2 bottom-2 w-px bg-primary/30" aria-hidden="true" />
            <div className="space-y-10">
              {education.map((item, index) => (
                <div key={index} className="relative">
                  <span className="absolute -left-7 md:-left-9 top-1.5 flex h-4 w-4 items-center justify-center">
                    <span className="h-3 w-3 rounded-full bg-primary shadow-[0_0_16px_rgba(80,213,255,0.55)]" />
                  </span>
                  <div className="rounded-xl border border-border/40 bg-card/40 px-5 py-4 backdrop-blur-sm">
                    <h4 className="text-xl font-semibold text-foreground">{item.title}</h4>
                    <p className="mt-1 text-sm font-medium uppercase tracking-[0.3em] text-primary/90">{item.period}</p>
                    <p className="mt-3 text-sm sm:text-base leading-relaxed text-muted-foreground">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className={`mb-16 ${isVisible ? 'animate-fade-in animate-delay-150' : 'opacity-0'}`}>
          <div className="databank-shell relative">
            <div className="databank-shell__title">
              <BadgeCheck className="text-primary" size={30} />
              <h3>Certifications Databank</h3>
            </div>

            <div className="certification-grid">
              {certifications.map((cert, index) => (
                <div key={index} className="cert-card">
                  <div className="cert-card__header">
                    <div className="cert-card__icon">
                      <cert.Icon size={26} className="drop-shadow-[0_0_12px_rgba(80,213,255,0.6)]" />
                    </div>
                    <div className="cert-card__meta">
                      <h4>{cert.name}</h4>
                      <p>{cert.issuer}</p>
                      <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground/70">{cert.date}</p>
                    </div>
                  </div>

                  <div className="cert-card__actions">
                    <button
                      type="button"
                      className="glow-button glow-button--primary flex items-center justify-center gap-2"
                      onClick={() => handleShowCredentials(cert)}
                    >
                      <KeyRound size={16} />
                      Show Credentials
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className={`mb-16 ${isVisible ? 'animate-fade-in animate-delay-200' : 'opacity-0'}`}>
          <div className="flex items-center mb-6">
            <Code className="text-primary mr-3" size={28} />
            <h3 className="text-2xl font-bold">Skills & Technologies</h3>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {skills.map((skill, index) => (
              <div 
                key={index} 
                className="flex flex-col items-center p-4 bg-card rounded-xl border border-border hover:shadow-md transition-all"
              >
                <skill.Icon className="text-primary mb-2" size={32} />
                <span className="text-sm font-medium text-center">{skill.name}</span>
              </div>
            ))}
          </div>
        </div>

        <div className={`mb-16 ${isVisible ? 'animate-fade-in animate-delay-300' : 'opacity-0'}`}>
          <div className="flex items-center gap-3 mb-8">
            <Briefcase className="text-primary" size={28} />
            <h3 className="text-2xl font-bold">Work History</h3>
          </div>
          <div className="relative pl-8 md:pl-12">
            <span className="pointer-events-none absolute left-3 md:left-5 top-2 bottom-2 w-px bg-primary/30" aria-hidden="true" />
            <div className="space-y-10">
              {workExperience.map((role, index) => (
                <div key={index} className="relative">
                  <span className="absolute -left-7 md:-left-9 top-1.5 flex h-6 w-6 items-center justify-center">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground shadow-[0_0_16px_rgba(80,213,255,0.55)]">
                      {role.badge}
                    </span>
                  </span>
                  <div className="rounded-xl border border-border/40 bg-card/40 px-5 py-4 backdrop-blur-sm">
                    <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                      <h4 className="text-xl font-semibold text-foreground">{role.title}</h4>
                      <span className="text-sm font-medium uppercase tracking-[0.3em] text-primary/90">{role.period}</span>
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground/80">{role.organisation}</p>
                    <p className="mt-3 text-sm sm:text-base leading-relaxed text-muted-foreground">{role.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className={`${isVisible ? 'animate-fade-in animate-delay-400' : 'opacity-0'}`}>
          <div className="flex items-center mb-6">
            <Trophy className="text-primary mr-3" size={28} />
            <h3 className="text-2xl font-bold">Achievements</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 bg-card rounded-xl border border-border">
              <h4 className="text-xl font-semibold mb-2">Top 10 Grand Finalist at Luminous Techno-X Hackathon</h4>
              <p className="text-muted-foreground">
                Contributed to the development of PrabhaWatt- a solar energy management and electricity saving platform,
                placing among the top 10 finalists out of 500+ teams.
              </p>
            </div>
            <div className="p-6 bg-card rounded-xl border border-border">
              <h4 className="text-xl font-semibold mb-2">Published Research Paper</h4>
              <p className="text-muted-foreground">
              Published a research paper on "Spam accounts detection on Instagram" in IEEE IC3SE-2024 conference proceedings.
              </p>
            </div>
          </div>
        </div>
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        {selectedCertificate && (
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>{selectedCertificate.name}</DialogTitle>
              <DialogDescription>
                Issued by {selectedCertificate.issuer} in {selectedCertificate.date}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      {/* <span className="font-medium">Credential ID:</span>
                      <span>{selectedCertificate.credentialId}</span> */}
                    </div>
                    {selectedCertificate.description && (
                      <div className="mt-4">
                        <span className="font-medium block mb-1">Description:</span>
                        <p className="text-sm text-muted-foreground">{selectedCertificate.description}</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
              <div className="flex justify-end">
                <Button 
                  variant="default" 
                  onClick={() => {
                    if (selectedCertificate.credentialUrl) {
                      window.open(selectedCertificate.credentialUrl, '_blank');
                    }
                  }}
                >
                  Verify Credential
                </Button>
              </div>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </section>
  );
};

export default About;
