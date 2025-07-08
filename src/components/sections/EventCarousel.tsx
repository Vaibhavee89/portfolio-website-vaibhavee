
import { useState, useEffect, useCallback } from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { Camera } from 'lucide-react';
import useEmblaCarousel from 'embla-carousel-react';

// Sample events data - replace with your real events
const eventImages = [
  {
    src: "/GitTogether.jpg",
    alt: "Git Together at Microsoft office Greater Noida- Nov 2024",
    caption: "Git Together at Microsoft office Greater Noida- Nov 2024"
  },
  {
    src: "/Student_volunteer_conference.jpg",
    alt: "Student volunteer at ICICC-2025",
    caption: "Student Volunteer at ICICC-2025"
  },
  {
    src: "/ResearchHackathon.jpg",
    alt: "Participated in Research Hackathon organized at Bennett University during first year of college",
    caption: "Participated in Research Hackathon organized at Bennett University during first year of college"
  },
  {
    src: "/HP_PowerLab.jpg",
    alt: "HP PowerLab Hackathon Certificate",
    caption: "HP PowerLab Hackathon Certificate"
  },
  {
    src: "/Team-Luminous.jpg",
    alt: "With my team at Luminous Techno-X Hackathon",
    caption: "With my team at Luminous Techno-X Hackathon"
  },
  {
    src: "/LuminousHackathon.jpg",
    alt: "Luminous Techno-X Hackathon",
    caption: "Luminous Techno-X Hackathon"
  },
  {
    src: "/ProjectShowcase2ndYear.jpg",
    alt: "Project Showcase during 2nd year of college",
    caption: "Project Showcase during 2nd year of college"
  },
  {
    src: "/AWS_StudentCommunityDay.jpg",
    alt: "AWS Student Community Day",
    caption: "AWS Student Community Day"
  },
  {
    src: "/AnshMehra.jpg",
    alt: "Got an opportunity to meet Ansh Mehra at Google DevFest New Delhi- 2023",
    caption: "Got an opportunity to meet Ansh Mehra at Google DevFest New Delhi- 2023"
  },
  {
    src: "/Paper_Presentation_Certificate.jpg",
    alt: "Paper Presentation Certificate",
    caption: "Paper Presentation Certificate"
  },
  {
    src: "/GoogleDevFest-2023.jpg",
    alt: "Google DevFest New Delhi- 2023",
    caption: "Google DevFest New Delhi- 2023"
  },
  {
    src: "/Hackcbs.jpg",
    alt: "HackCBS 7.0",
    caption: "HackCBS 7.0"
  },
];

const EventCarousel = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [api, setApi] = useState<ReturnType<typeof useEmblaCarousel>[1]>();
  
  // Auto-scroll functionality
  const autoScroll = useCallback(() => {
    if (api) {
      api.scrollNext();
    }
  }, [api]);
  
  // Set up auto-scroll interval
  useEffect(() => {
    if (!api || !isVisible) return;
    
    const intervalId = setInterval(autoScroll, 3000); // Auto-scroll every 3 seconds
    
    return () => clearInterval(intervalId);
  }, [api, autoScroll, isVisible]);

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

    const section = document.getElementById('events');
    if (section) observer.observe(section);

    return () => {
      if (section) observer.unobserve(section);
    };
  }, []);

  return (
    <section id="events" className="section bg-secondary/20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 sm:mb-12 flex flex-col items-start">
          <span className="px-3 py-2 sm:px-4 rounded-full bg-secondary text-secondary-foreground mb-3 sm:mb-4 text-sm sm:text-base">
            Events
          </span>
          <h2 className="section-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl">Event Highlights</h2>
          <p className="section-subheading text-base sm:text-lg md:text-xl">
            A glimpse of the workshops, conferences, and events I've participated in throughout my journey.
          </p>
        </div>
        
        <div className={isVisible ? 'animate-fade-in' : 'opacity-0'}>
          <Carousel 
            className="w-full"
            opts={{
              align: "start",
              loop: true,
            }}
            setApi={setApi}
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {eventImages.map((event, index) => (
                <CarouselItem key={index} className="pl-2 md:pl-4 basis-full sm:basis-1/2 lg:basis-1/3">
                  <Card className="overflow-hidden">
                    <CardContent className="p-0 relative group">
                      <div className="aspect-video overflow-hidden">
                        <img 
                          src={event.src} 
                          alt={event.alt}
                          className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110"
                          onError={(e) => {
                            console.error(`Failed to load image: ${event.src}`);
                            e.currentTarget.src = "https://placehold.co/600x400?text=Image+Not+Found";
                          }}
                        />
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3 sm:p-4">
                        <h3 className="text-white font-semibold text-sm sm:text-base lg:text-lg">{event.caption}</h3>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex justify-center mt-4 sm:mt-6 gap-2">
              <CarouselPrevious className="static translate-y-0 mx-2" />
              <CarouselNext className="static translate-y-0 mx-2" />
            </div>
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default EventCarousel;
