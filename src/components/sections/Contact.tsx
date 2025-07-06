import { useState, useEffect } from 'react';
import { Mail, MapPin, Phone } from 'lucide-react';
import emailjs from 'emailjs-com';
import { useToast } from '@/hooks/use-toast';

export const Contact = () => {
  const { toast } = useToast();
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const SERVICE_ID = "service_wqr1eqz"; // Replace with your EmailJS service ID
  const TEMPLATE_ID = "template_dsixo6b"; // Replace with your EmailJS template ID
  const USER_ID = "Hg7wXBdt1MlC-kuOOAEMi"; // Replace with your EmailJS user ID

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

    const section = document.getElementById('contact');
    if (section) observer.observe(section);

    return () => {
      if (section) observer.unobserve(section);
    };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        subject: formData.subject,
        message: formData.message,
        to_name: 'Vaibhavee Singh', // Your name
        reply_to: formData.email,
      };

      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        templateParams,
        USER_ID
      );

      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      
      toast({
        title: "Success!",
        description: "Your message has been sent successfully. I'll get back to you soon!",
        duration: 5000,
      });
      
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
      
    } catch (error) {
      console.error("Email sending failed:", error);
      setIsSubmitting(false);
      
      toast({
        title: "Error",
        description: "Failed to send your message. Please try again or contact me directly via email.",
        variant: "destructive",
        duration: 5000,
      });
    }
  };

  return (
    <section id="contact" className="section">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12 flex flex-col items-start">
          <span className="px-4 py-2 rounded-full bg-secondary text-secondary-foreground mb-4">
            Contact
          </span>
          <h2 className="section-heading">Get In Touch</h2>
          <p className="section-subheading">
            Have a project in mind or want to chat? Feel free to reach out through the form below or using my contact information.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className={`space-y-8 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
            <div className="flex items-start">
              <div className="p-3 bg-secondary rounded-full mr-4">
                <MapPin className="text-primary" size={24} />
              </div>
              <div>
                <h3 className="text-lg font-bold mb-1">Location</h3>
                <p className="text-muted-foreground">Greater Noida, Uttar Pradesh</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="p-3 bg-secondary rounded-full mr-4">
                <Mail className="text-primary" size={24} />
              </div>
              <div>
                <h3 className="text-lg font-bold mb-1">Email</h3>
                <a 
                  href="mailto:vaibhaveesingh89@gmail.com" 
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  vaibhaveesingh89@gmail.com
                </a>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="p-3 bg-secondary rounded-full mr-4">
                <Phone className="text-primary" size={24} />
              </div>
              <div>
                <h3 className="text-lg font-bold mb-1">Phone</h3>
                <a 
                  href="tel:+919934110241" 
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  +91 9934110241
                </a>
              </div>
            </div>
          </div>
          
          <div className={`${isVisible ? 'animate-fade-in animate-delay-300' : 'opacity-0'}`}>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block mb-2 font-medium">
                  Your Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="w-full p-3 bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                  placeholder="John Doe"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  disabled={isSubmitting}
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block mb-2 font-medium">
                  Your Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full p-3 bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                  placeholder="john@example.com"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  disabled={isSubmitting}
                />
              </div>
              
              <div>
                <label htmlFor="subject" className="block mb-2 font-medium">
                  Subject *
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  className="w-full p-3 bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                  placeholder="Project Inquiry"
                  required
                  value={formData.subject}
                  onChange={handleChange}
                  disabled={isSubmitting}
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block mb-2 font-medium">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  className="w-full p-3 bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none"
                  placeholder="Hello, I'm interested in working with you on..."
                  required
                  value={formData.message}
                  onChange={handleChange}
                  disabled={isSubmitting}
                ></textarea>
              </div>
              
              <button
                type="submit"
                className="button-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-foreground mr-2"></div>
                    Sending...
                  </div>
                ) : (
                  'Send Message'
                )}
              </button>
              
              {isSubmitted && (
                <div className="p-4 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100 rounded-md">
                  Thank you! Your message has been sent successfully. I'll get back to you soon!
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;