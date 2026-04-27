import React, { useEffect } from 'react';
import { ContactForm } from '../components/ContactForm';
import { SEO } from '../components/SEO';
import { ParallaxHero } from '../components/ParallaxHero';
import { Mail, MapPin, Phone } from 'lucide-react';

export const Contact: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-light dark:bg-dark min-h-screen text-slate-900 dark:text-gray-100 transition-colors duration-300">
      <SEO 
        title="Contact Us" 
        description="Get in touch with Optimantix Global. We are ready to help you scale your business with tailored digital solutions." 
      />
      
      <ParallaxHero 
        title="Contact Us"
        subtitle="Let's build something remarkable together."
        imageUrl="https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&q=80&w=2000"
        height="50vh"
      />

      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Details Side */}
          <div className="flex flex-col justify-center space-y-8">
            <div>
              <h2 className="text-3xl font-bold mb-4">We'd love to hear from you</h2>
              <p className="text-gray-600 dark:text-gray-400">
                Whether you have a question about our services, pricing, need a demo, or anything else, our team is ready to answer all your questions.
              </p>
            </div>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="p-3 bg-primary/10 text-primary rounded-xl mr-4 flex-shrink-0">
                   <Mail size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Email Us</h3>
                  <p className="text-gray-600 dark:text-gray-400">info@optimantix.com</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="p-3 bg-primary/10 text-primary rounded-xl mr-4 flex-shrink-0">
                   <Phone size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Call Us</h3>
                  <p className="text-gray-600 dark:text-gray-400">+91 (123) 456-7890</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="p-3 bg-primary/10 text-primary rounded-xl mr-4 flex-shrink-0">
                   <MapPin size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Visit Us</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    New Delhi, India<br />
                    Global Operations Support
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Form Side */}
          <div className="bg-white dark:bg-dark-card rounded-2xl shadow-xl border border-gray-100 dark:border-gray-800 p-2 sm:p-4">
             <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
};
