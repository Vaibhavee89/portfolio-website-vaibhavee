
import { useState, useEffect } from 'react';
import { Code, Palette, Globe } from 'lucide-react';

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
  {name: 'Web Development', level: 50},
  {name: 'Tools', level: 50},
  {name: 'Technical Writing', level: 50},
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
        <div className="mb-12 flex flex-col items-start">
          <span className="px-4 py-2 rounded-full bg-secondary text-secondary-foreground mb-4">
            About Me
          </span>
          <h2 className="section-heading">Who I Am</h2>
          <p className="section-subheading">
            I am BTech 3rd year student passionate about research and specializing in Cloud Computing, AI/ML, Deep Learning and Computer Vision. I love transforming ideas into impactful solutions, whether it's developing AI- powered applications, writing research papers, or contributing to meaningful projects. My goal is to bridge the gap between research and real-world applications, constantly pushing the boundaries of technology.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className={`space-y-6 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
            <h3 className="text-2xl font-bold">My Journey</h3>
            <p className="text-muted-foreground">
              With over 5 years of experience in the tech industry, I've worked with startups, agencies, 
              and established companies to create digital products that are both beautiful and functional.
            </p>
            <p className="text-muted-foreground">
              I believe that great design is about solving problems, not just making things look pretty. 
              My approach combines creative thinking with a methodical, user-centered design process.
            </p>
            <p className="text-muted-foreground">
              When I'm not designing or coding, you'll find me exploring new places, reading about emerging 
              tech trends, or experimenting with new creative tools and techniques.
            </p>
          </div>

          <div className={`${isVisible ? 'animate-fade-in animate-delay-200' : 'opacity-0'}`}>
            <h3 className="text-2xl font-bold mb-6">My Skills</h3>
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
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          <div className={`p-6 bg-card rounded-xl border border-border ${isVisible ? 'animate-fade-in animate-delay-300' : 'opacity-0'}`}>
            <Palette className="text-primary mb-4" size={32} />
            <h3 className="text-xl font-bold mb-2">Design</h3>
            <p className="text-muted-foreground">
              Creating intuitive and visually appealing interfaces that provide exceptional user experiences.
            </p>
          </div>
          <div className={`p-6 bg-card rounded-xl border border-border ${isVisible ? 'animate-fade-in animate-delay-400' : 'opacity-0'}`}>
            <Code className="text-primary mb-4" size={32} />
            <h3 className="text-xl font-bold mb-2">Development</h3>
            <p className="text-muted-foreground">
              Building robust, scalable web applications using modern technologies and best practices.
            </p>
          </div>
          <div className={`p-6 bg-card rounded-xl border border-border ${isVisible ? 'animate-fade-in animate-delay-500' : 'opacity-0'}`}>
            <Globe className="text-primary mb-4" size={32} />
            <h3 className="text-xl font-bold mb-2">Strategy</h3>
            <p className="text-muted-foreground">
              Developing comprehensive digital strategies that align with business goals and user needs.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
