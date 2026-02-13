import React from 'react';
import { ContactForm } from '../components/ContactForm';
import { CheckCircle2, MapPin, Phone, Mail, Clock } from 'lucide-react';

export const Contact: React.FC = () => {
  return (
    <div className="bg-light dark:bg-dark min-h-screen">
      <div className="bg-gray-900 text-white py-20">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Contact Us</h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
             Ready to start your project? Get in touch with us today.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <span className="text-primary font-bold uppercase tracking-wider text-sm">Get In Touch</span>
              <h2 className="text-3xl font-bold dark:text-white mt-2 mb-6">Let's Start a Conversation</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-8 text-lg leading-relaxed">
                Whether you have a question about features, pricing, or anything else, our team is ready to answer all your questions.
              </p>
              
              <div className="space-y-6 mb-12">
                <div className="flex items-start gap-4">
                  <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm text-primary">
                    <CheckCircle2 size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg dark:text-white">Expert Consultation</h4>
                    <p className="text-gray-500 dark:text-gray-400">Free initial strategy session to understand your goals.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm text-primary">
                    <CheckCircle2 size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg dark:text-white">Tailored Solutions</h4>
                    <p className="text-gray-500 dark:text-gray-400">Custom packages designed for your specific business needs.</p>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-dark-card p-8 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700">
                <h3 className="font-bold text-xl mb-6 dark:text-white">Contact Info</h3>
                <ul className="space-y-4">
                    <li className="flex items-start gap-4 text-gray-600 dark:text-gray-400">
                        <MapPin className="text-primary mt-1 shrink-0" />
                        <span>C-13, Sector 58, Noida, 201301, India</span>
                    </li>
                    <li className="flex items-center gap-4 text-gray-600 dark:text-gray-400">
                        <Phone className="text-primary shrink-0" />
                        <span>+91 9910343016</span>
                    </li>
                    <li className="flex items-center gap-4 text-gray-600 dark:text-gray-400">
                        <Mail className="text-primary shrink-0" />
                        <span>info@optimantix.com</span>
                    </li>
                    <li className="flex items-center gap-4 text-gray-600 dark:text-gray-400 pt-4 border-t border-gray-100 dark:border-gray-700">
                        <Clock className="text-secondary shrink-0" />
                        <span>Mon - Fri, 9:00 AM - 6:00 PM IST</span>
                    </li>
                </ul>
              </div>
            </div>
            
            <div>
                <ContactForm />
            </div>
        </div>
      </div>
    </div>
  );
};