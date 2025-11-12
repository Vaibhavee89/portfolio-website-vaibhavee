import { useState, useEffect } from 'react';
import {
  Code,
  BookOpen,
  Trophy,
  Briefcase,
  FileCode,
  Brain,
  Database,
  MessageSquare,
  BarChart,
  Cloud,
  Smartphone,
  Award,
  GraduationCap,
  BadgeCheck,
  Server,
  Github,
  GitBranch,
  Zap,
  BookMarked,
  Component,
  KeyRound,
  Share2,
  MessageCircle,
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

interface Skill {
  name: string;
  Icon: LucideIcon;
}

interface Certification {
  name: string;
  issuer: string;
  date: string;
  Icon: LucideIcon;
  //credentialId?: string;
  credentialUrl?: string;
  description?: string;
}

const skills: Skill[] = [
  { name: 'Python', Icon: FileCode },
  { name: 'JavaScript', Icon: Zap },
  { name: 'TypeScript', Icon: Code },
  { name: 'React', Icon: Component },
  { name: 'Next.js', Icon: Code },
  { name: 'TensorFlow', Icon: Brain },
  { name: 'PyTorch', Icon: Brain },
  { name: 'Scikit-learn', Icon: Database },
  { name: 'Pandas', Icon: Database },
  { name: 'NumPy', Icon: Database },
  { name: 'NLP', Icon: MessageSquare },
  { name: 'Computer Vision', Icon: Smartphone },
  { name: 'PowerBI', Icon: BarChart },
  { name: 'Tableau', Icon: BarChart },
  { name: 'AWS', Icon: Cloud },
  { name: 'GCP', Icon: Cloud },
  { name: 'Git', Icon: GitBranch },
  { name: 'GitHub', Icon: Github },
  { name: 'Docker', Icon: Server },
  { name: 'Kubernetes', Icon: Server },
  { name: 'Jupyter', Icon: BookMarked },
  { name: 'SQL', Icon: Database },
  { name: 'NoSQL', Icon: Database },
  { name: 'HTML/CSS', Icon: Code },
];

const certifications: Certification[] = [
  {
    name: "AWS Cloud Practitioner",
    issuer: "Amazon Web Services",
    date: "May 2024",
    Icon: Cloud,
    //credentialId: "AWS-CP-123456",
    credentialUrl: "https://www.credly.com/badges/8ebcbe71-30e8-4961-9c8b-4ad852f0aed5/public_url",
    description: "Fundamental knowledge of AWS Cloud, services, and terminology. Covers security, technology, billing, pricing, and core services."
  },
  {
    name: "Supervised Machine Learning: Classification",
    issuer: "IBM",
    date: "Nov 2024",
    Icon: Brain,
    //credentialId: "",
    credentialUrl: "https://coursera.org/share/cd753b05dce213265c899ae6cdb81d75",
    description: "This course introduces the concept of Ensemble Learning, Machine Learning(ML) Algorithms, Supervised Learning, Classification Algorithms, Decision Tree"
  },
  {
    name: "Improving Deep Neural Networks: Hyperparameter Tuning, Regularization, and Optimization",
    issuer: "Deeplearning.AI",
    date: "Nov 2024",
    Icon: Brain,
    //credentialId: "",
    credentialUrl: "https://coursera.org/share/ec108e28939b593ac32dd1721302c122",
    description: "This course offers skills in TensorFlow, Deep Learning, Hyperparameter turing, Mathematical Optimization"
  },
  {
    name: "Simulation and Modeling of Natural Processes",
    issuer: "University of Geneva",
    date: "Nov 2024",
    Icon: Award,
    //credentialId: "ML-SPEC-345678",
    credentialUrl: "https://coursera.org/share/af94e2e3392a83c452a9090e19ab3374",
    description: "Computer Programming, Python Programming, Mathematics, Probability ans Statisctics"
  },
  {
    name: "The Bits and Bytes of Computer Networking",
    issuer: "Google",
    date: "Apr 2024",
    Icon: GraduationCap,
    //credentialId: "DL-SPEC-901234",
    credentialUrl: "https://coursera.org/share/64b9a6e0733428bc7eb1160be6ac745d",
    description: "In-depth knowledge of computer networks such as Domain Name System, IP addressing, and routing."
  },
  {
    name: "Introduction to Computers, Operating Systems & Security",
    issuer: "Microsoft",
    date: "Apr 2024",
    Icon: GraduationCap,
    //credentialId: "DL-SPEC-901234",
    credentialUrl: "https://coursera.org/share/adfe89cc12c35b9c0c6469869b9f72fb",
    description: "In-depth knowledge of Operating Systems, Computer Architecture and Cloud Computing"
  },
  {
    name: "Foundations of User Experience (UX) Design",
    issuer: "Google",
    date: "Jul 2023",
    Icon: GraduationCap,
    //credentialId: "DL-SPEC-901234",
    credentialUrl: "https://coursera.org/share/6ea80fd2cfb6166fe1d581f173ce6735",
    description: "Introduction to User Experience (UX), Prototype, Wireframe, User Expericence Design (UXD), UX Research"
  },
];

export const About = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedCertificate, setSelectedCertificate] = useState<Certification | null>(null);
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

  const handleShowCredentials = (cert: Certification) => {
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
        <div className="mb-12 flex flex-col items-start">
          <span className="px-4 py-2 rounded-full bg-secondary text-secondary-foreground mb-4">
            About Me
          </span>
          <p className="section-subheading">
            I am a BTech 4th year student passionate about research and specializing in Cloud Computing, AI/ML, Deep Learning and Computer Vision. I love transforming ideas into impactful solutions, whether it's developing AI-powered applications, writing research papers, or contributing to meaningful projects. My goal is to bridge the gap between research and real-world applications, constantly pushing the boundaries of technology.
          </p>
        </div>

        <div className={`mb-16 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
          <div className="flex items-center mb-6">
            <BookOpen className="text-primary mr-3" size={28} />
            <h3 className="text-2xl font-bold">Educational Journey</h3>
          </div>
          <div className="space-y-4 pl-4 border-l-2 border-secondary">
            <div className="relative">
              <div className="absolute -left-[25px] w-12 h-12 rounded-full bg-secondary flex items-center justify-center">
                <span className="font-bold">Since 2022</span>
              </div>
              <div className="pl-10">
                <h4 className="text-xl font-semibold">Bachelor of Technology</h4>
                <p className="text-muted-foreground">Computer Science & Engineering</p>
                <p className="text-sm text-muted-foreground">Bennett University, Expected May 2026</p>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -left-[25px] w-12 h-12 rounded-full bg-secondary flex items-center justify-center">
                <span className="font-bold">2022</span>
              </div>
              <div className="pl-10">
                <h4 className="text-xl font-semibold">Secondary School</h4>
                <p className="text-muted-foreground">Science with Computer Science</p>
                <p className="text-sm text-muted-foreground">Delhi Public School, Dhanbad, 2020-2022</p>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -left-[25px] w-12 h-12 rounded-full bg-secondary flex items-center justify-center">
                <span className="font-bold">2020</span>
              </div>
              <div className="pl-10">
                <h4 className="text-xl font-semibold">High School</h4>
                <p className="text-muted-foreground">Core Subjects</p>
                <p className="text-sm text-muted-foreground">Delhi Public School, Dhanbad, 2020</p>
              </div>
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
                    <button
                      type="button"
                      className="glow-button glow-button--secondary flex items-center justify-center gap-2"
                      onClick={handleScrollToSection('contact')}
                    >
                      <MessageCircle size={16} />
                      Contact Me
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
          <div className="flex items-center mb-6">
            <Briefcase className="text-primary mr-3" size={28} />
            <h3 className="text-2xl font-bold">Work History</h3>
          </div>
          <div className="space-y-6 pl-4 border-l-2 border-secondary">
          <div className="relative">
              <div className="absolute -left-[25px] w-12 h-12 rounded-full bg-secondary flex items-center justify-center">
                <span className="font-bold">2025</span>
              </div>
              <div className="pl-10">
                <h4 className="text-xl font-semibold">Intern</h4>
                <p className="text-muted-foreground">CDAC</p>
                <p className="text-sm text-muted-foreground">02nd June 2025- 11th August 2025</p>
                <p className="mt-2 text-muted-foreground">
                  Worked on a network simulation project designed to demonstrate and mitigate multiple cyberattacks, including ping flood and unauthorized access, using firewall rules, ACLs, and network security best practices. Also contributed to the Development of Network Auditing Tool using Python Flask, NMAP, Postman, GCP
                </p>
              </div>
            </div>
            <div className="relative">
            
              <div className="absolute -left-[25px] w-12 h-12 rounded-full bg-secondary flex items-center justify-center">
                <span className="font-bold">2024</span>
              </div>
              <div className="pl-10">
                <h4 className="text-xl font-semibold">Internship Trainee</h4>
                <p className="text-muted-foreground">CSIR-CIMFR,Dhanbad</p>
                <p className="text-sm text-muted-foreground">Jul 2024 - Aug 2024</p>
                <p className="mt-2 text-muted-foreground">
                  Contributed to the research and analysis of user sentiments on educational videos uploaded on various social media platforms of the organization by developing analytics dashboard. 
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -left-[25px] w-12 h-12 rounded-full bg-secondary flex items-center justify-center">
                <span className="font-bold">2023</span>
              </div>
              <div className="pl-10">
                <h4 className="text-xl font-semibold">Research co-head</h4>
                <p className="text-muted-foreground">WIE-IEEE, Bennett Chapter</p>
                <p className="text-sm text-muted-foreground">September 2023 - May 2024</p>
                <p className="mt-2 text-muted-foreground">
                Worked closely with the content and technical team in organizing and executing research-focused initia
                tives, workshops, and projects.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -left-[25px] w-12 h-12 rounded-full bg-secondary flex items-center justify-center">
                <span className="font-bold">2023</span>
              </div>
              <div className="pl-10">
                <h4 className="text-xl font-semibold">Design co-head</h4>
                <p className="text-muted-foreground">Bennett Cloud Computing Club & Product Design and Technology Club</p>
                <p className="text-sm text-muted-foreground">September 2023 - May 2024</p>
                <p className="mt-2 text-muted-foreground">
                Spearheaded design initiatives for cloud-related projects and supported club events by organizing hands-on sessions on AWS and GCP to promote cloud skills among students.
                </p>
              </div>
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
