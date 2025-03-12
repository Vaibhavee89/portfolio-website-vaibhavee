
import { useState, useEffect } from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { Camera } from 'lucide-react';

// Sample events data - replace with your real events
const eventImages = [
  {
    src: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?auto=format&fit=crop&q=80",
    alt: "Tech Conference 2023",
    caption: "AI/ML Conference"
  },
  {
    src: "D:\portfolio website\portfolio-website-vaibhavee\public\Student_volunteer_conference.jpg",
    alt: "Hackathon 2023",
    caption: "Cloud Computing Hackathon"
  },
  {
    src: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80",
    alt: "Research Symposium",
    caption: "Computer Vision Workshop"
  },
  {
    src: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&q=80",
    alt: "Coding Bootcamp",
    caption: "Deep Learning Bootcamp"
  },
  {
    src: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&q=80",
    alt: "Tech Talk",
    caption: "Research Presentation"
  }
];

const EventCarousel = () => {
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

    const section = document.getElementById('events');
    if (section) observer.observe(section);

    return () => {
      if (section) observer.unobserve(section);
    };
  }, []);

  return (
    <section id="events" className="section bg-secondary/20">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12 flex flex-col items-start">
          <span className="px-4 py-2 rounded-full bg-secondary text-secondary-foreground mb-4">
            Events
          </span>
          <h2 className="section-heading">Event Highlights</h2>
          <p className="section-subheading">
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
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {eventImages.map((event, index) => (
                <CarouselItem key={index} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                  <Card className="overflow-hidden">
                    <CardContent className="p-0 relative group">
                      <div className="aspect-video overflow-hidden">
                        <img 
                          src={event.src} 
                          alt={event.alt}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                        <h3 className="text-white font-semibold text-lg">{event.caption}</h3>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex justify-center mt-6 gap-2">
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
