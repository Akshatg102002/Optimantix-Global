import React from 'react';
import { Link } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { Icon } from '../components/Icon';
import { ArrowRight } from 'lucide-react';
import { SEO } from '../components/SEO';

export const ServicesPage: React.FC = () => {
  const { services } = useData();

  return (
    <div className="bg-light dark:bg-dark min-h-screen">
      <SEO 
        title="Our Services" 
        description="Explore our wide range of services including SEO, PPC, Marketplace Management, Web Development, and Branding."
      />
      <div className="bg-white dark:bg-dark-card border-b border-gray-200 dark:border-gray-800 py-20">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">Our Services</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Comprehensive digital solutions tailored to drive growth and efficiency for your business.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <div
                key={service.id}
                className="group bg-white dark:bg-dark-card rounded-2xl p-8 shadow-sm border border-gray-100 dark:border-gray-800 hover:shadow-xl dark:hover:shadow-2xl hover:shadow-indigo-100/50 dark:hover:shadow-none transition-all duration-300 relative overflow-hidden flex flex-col"
              >
                <div className="w-14 h-14 bg-slate-50 dark:bg-slate-800 text-primary rounded-xl flex items-center justify-center mb-6 shadow-sm group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                  <Icon name={service.iconName} size={28} />
                </div>
                
                <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white group-hover:text-secondary dark:group-hover:text-primary transition-colors">{service.title}</h3>
                <p className="text-slate-600 dark:text-gray-400 mb-6 leading-relaxed flex-grow">{service.shortDescription}</p>
                
                <Link 
                  to={`/services/${service.slug}`} 
                  className="inline-flex items-center text-slate-800 dark:text-white font-bold hover:text-primary transition mt-auto"
                >
                  View Details <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};