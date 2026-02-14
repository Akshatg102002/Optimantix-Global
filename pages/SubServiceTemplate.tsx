
import React from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { ContactForm } from '../components/ContactForm';
import { ServiceGrowthChart } from '../components/ServiceGrowthChart';
import { Check, ArrowLeft, Star, Zap, Map } from 'lucide-react';
import { motion } from 'framer-motion';
import { SEO } from '../components/SEO';

export const SubServiceTemplate: React.FC = () => {
  const { slug, subSlug } = useParams<{ slug: string; subSlug: string }>();
  const { services } = useData();
  
  const service = services.find(s => s.slug === slug);
  const subService = service?.subServices?.find(sub => sub.slug === subSlug);

  if (!service || !subService) {
    return <Navigate to="/404" replace />;
  }

  return (
    <div className="bg-light dark:bg-dark min-h-screen">
      <SEO 
        title={`${subService.title} - ${service.title}`} 
        description={subService.shortDescription}
      />
      
      {/* Header */}
      <div className="bg-secondary text-white py-20">
        <div className="container mx-auto px-4 md:px-6">
          {/* Responsive Breadcrumb */}
          <div className="flex flex-wrap items-center gap-2 mb-6 text-indigo-200 text-xs md:text-sm font-medium uppercase tracking-wider">
            <Link to="/services" className="hover:text-white transition">Services</Link>
            <span>/</span>
            <Link to={`/services/${service.slug}`} className="hover:text-white transition">{service.title}</Link>
            <span className="hidden md:inline">/</span>
            <span className="w-full md:w-auto mt-1 md:mt-0 md:block block text-white font-bold">{subService.title}</span>
          </div>
          
          <h1 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">{subService.title}</h1>
          <p className="text-xl text-indigo-100 max-w-3xl leading-relaxed">
            {subService.shortDescription}
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 py-16">
        <Link to={`/services/${service.slug}`} className="inline-flex items-center text-primary font-medium hover:underline mb-8">
            <ArrowLeft size={16} className="mr-2" /> Back to {service.title}
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-16">
            
            {/* Overview */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-dark-card rounded-2xl p-8 shadow-sm border border-gray-100 dark:border-gray-800"
            >
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">About this Service</h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-lg mb-8">
                {subService.fullDescription}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                        <Star className="text-yellow-400" size={20} /> Key Features
                    </h3>
                    <ul className="space-y-3">
                        {subService.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-sm text-gray-600 dark:text-gray-400">
                            <Check className="text-green-500 shrink-0 mt-0.5" size={16} />
                            {feature}
                        </li>
                        ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                        <Zap className="text-primary" size={20} /> Benefits
                    </h3>
                    <ul className="space-y-3">
                        {subService.benefits.map((benefit, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-sm text-gray-600 dark:text-gray-400">
                            <div className="w-1.5 h-1.5 rounded-full bg-secondary mt-1.5 shrink-0" />
                            {benefit}
                        </li>
                        ))}
                    </ul>
                  </div>
              </div>
            </motion.div>

            {/* Growth Roadmap */}
            {subService.phases && (
                <div>
                   <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 flex items-center gap-2">
                      <Map className="text-primary" /> Strategic Roadmap
                   </h2>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {subService.phases.map((phase, idx) => (
                          <div key={idx} className="bg-white dark:bg-dark-card p-6 rounded-xl border border-gray-100 dark:border-gray-800 relative hover:-translate-y-1 transition-transform">
                              <div className="absolute -top-3 -left-3 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold text-sm shadow-md">
                                  {idx + 1}
                              </div>
                              <h3 className="font-bold text-lg mb-2 mt-2">{phase.title}</h3>
                              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{phase.description}</p>
                          </div>
                      ))}
                   </div>
                </div>
            )}

            {/* Visuals & Stats */}
            <ServiceGrowthChart stats={subService.stats} serviceName={subService.title} />

            {/* CTA Block */}
            <div className="bg-primary/5 border border-primary/20 rounded-2xl p-8 text-center">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Why Optimantix for {subService.title}?</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-2xl mx-auto">
                    We combine industry expertise with data-driven strategies to ensure you get the best possible ROI. Our team is dedicated to your success on platforms like {subService.title} and beyond.
                </p>
                <div className="flex justify-center gap-4">
                     <Link to="/contact" className="bg-primary text-white px-6 py-3 rounded-lg font-bold hover:bg-secondary transition shadow-lg shadow-primary/20">
                        Speak to an Expert
                     </Link>
                </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <div className="bg-white dark:bg-dark-card rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden mb-8">
                <div className="bg-gray-900 text-white p-6 text-center">
                  <h3 className="text-xl font-bold">Get Started</h3>
                  <p className="text-gray-400 text-sm mt-1">Request a quote for {subService.title}</p>
                </div>
                <div className="p-6">
                  <ContactForm defaultService={service.title} />
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
