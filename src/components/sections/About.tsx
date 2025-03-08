
import { useState, useEffect } from 'react';
import { Code, Palette, Globe, BookOpen, Trophy, Briefcase } from 'lucide-react';

interface Skill {
  name: string;
  level: number;
}

const skills: Skill[] = [
  { name: 'Languages', level: 90 },
  { name: 'ML/DL Frameworks', level: 85 },
  { name: 'Data Processing', level: 80 },
  { name: 'NLP', level: 85 },
  { name: 'Visualization', level: 75 },
  { name: 'Cloud', level: 70 },
  { name: 'Web Development', level: 50 },
  { name: 'Tools', level: 50 },
  { name: 'Technical Writing', level: 50 },
];

export const About = () => {
  const [isVisible, setIsVisible] = useState(false);

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

  return (
    <section id="about" className="section">
      <div className="max-w-7xl mx-auto">
        {/* About Me Header */}
        <div className="mb-12 flex flex-col items-start">
          <span className="px-4 py-2 rounded-full bg-secondary text-secondary-foreground mb-4">
            About Me
          </span>
          <p className="section-subheading text-justify">
            I am a BTech 3rd year student passionate about research and specializing in Cloud Computing, AI/ML, Deep Learning and Computer Vision. I love transforming ideas into impactful solutions, whether it's developing AI-powered applications, writing research papers, or contributing to meaningful projects. My goal is to bridge the gap between research and real-world applications, constantly pushing the boundaries of technology.
          </p>
        </div>

        {/* Educational Journey */}
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

        {/* Skills and Technologies */}
        <div className={`mb-16 ${isVisible ? 'animate-fade-in animate-delay-200' : 'opacity-0'}`}>
          <div className="flex items-center mb-6">
            <Code className="text-primary mr-3" size={28} />
            <h3 className="text-2xl font-bold">Skills & Technologies</h3>
          </div>
          <div className="space-y-4">
            {skills.map((skill, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium">{skill.name}</span>
                  <span className="text-sm text-muted-foreground">{skill.level}%</span>
                </div>
                <div className="w-full bg-secondary rounded-full h-2">
                  <div 
                    className="bg-primary h-2 rounded-full transition-all duration-1000 ease-out"
                    style={{ 
                      width: isVisible ? `${skill.level}%` : '0%',
                      transitionDelay: `${index * 100}ms`
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Work History */}
        <div className={`mb-16 ${isVisible ? 'animate-fade-in animate-delay-300' : 'opacity-0'}`}>
          <div className="flex items-center mb-6">
            <Briefcase className="text-primary mr-3" size={28} />
            <h3 className="text-2xl font-bold">Work History</h3>
          </div>
          <div className="space-y-6 pl-4 border-l-2 border-secondary">
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

        {/* Achievements */}
        <div className={`mb-16 ${isVisible ? 'animate-fade-in animate-delay-400' : 'opacity-0'}`}>
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
            {/* <div className="p-6 bg-card rounded-xl border border-border">
              <h4 className="text-xl font-semibold mb-2">Dean's List</h4>
              <p className="text-muted-foreground">
                Recognized for academic excellence by being named to the Dean's List for three consecutive semesters.
              </p>
            </div>
            <div className="p-6 bg-card rounded-xl border border-border">
              <h4 className="text-xl font-semibold mb-2">Hackathon Winner</h4>
              <p className="text-muted-foreground">
                Won first place in the university's annual hackathon for developing an accessible technology solution
                for visually impaired users.
              </p>
            </div> */}
          </div>
        </div>

        {/* Core Competencies */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          <div className={`p-6 bg-card rounded-xl border border-border ${isVisible ? 'animate-fade-in animate-delay-500' : 'opacity-0'}`}>
            <Palette className="text-primary mb-4" size={32} />
            <h3 className="text-xl font-bold mb-2">Research</h3>
            <p className="text-muted-foreground">
              Conducting thorough research in AI/ML domains with a focus on developing innovative solutions.
            </p>
          </div>
          <div className={`p-6 bg-card rounded-xl border border-border ${isVisible ? 'animate-fade-in animate-delay-600' : 'opacity-0'}`}>
            <Code className="text-primary mb-4" size={32} />
            <h3 className="text-xl font-bold mb-2">Development</h3>
            <p className="text-muted-foreground">
              Building robust applications using modern technologies and AI/ML frameworks.
            </p>
          </div>
          <div className={`p-6 bg-card rounded-xl border border-border ${isVisible ? 'animate-fade-in animate-delay-700' : 'opacity-0'}`}>
            <Globe className="text-primary mb-4" size={32} />
            <h3 className="text-xl font-bold mb-2">Innovation</h3>
            <p className="text-muted-foreground">
              Bridging the gap between research and real-world applications to create impactful solutions.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
