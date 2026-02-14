
import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { Icon } from '../components/Icon';
import { ContactForm } from '../components/ContactForm';
import { Check, Star, Settings, Package, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';
import { SEO } from '../components/SEO';

export const ServiceTemplate: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { services } = useData();
  const service = services.find(s => s.slug === slug);

  if (!service) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="bg-light dark:bg-dark min-h-screen">
      <SEO 
        title={service.title} 
        description={service.shortDescription}
      />
      {/* Header */}
      <div className="bg-secondary text-white py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex items-center gap-4 mb-4 text-indigo-200 text-sm font-medium uppercase tracking-wider">
            <span>Services</span>
            <span>/</span>
            <span>{service.title}</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">{service.title}</h1>
          <p className="text-xl text-indigo-100 max-w-3xl leading-relaxed">
            {service.shortDescription}
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            
            {/* Overview */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-dark-card rounded-2xl p-8 shadow-sm border border-gray-100 dark:border-gray-800"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="bg-indigo-50 dark:bg-slate-800 p-3 rounded-lg text-primary">
                  <Icon name={service.iconName} size={32} />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Overview</h2>
              </div>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-lg mb-8">
                {service.fullDescription}
              </p>

              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Key Features</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {service.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <Check className="text-green-500 shrink-0" size={18} />
                    <span className="text-gray-700 dark:text-gray-300 font-medium">{feature}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Process Steps */}
            <div className="space-y-6">
                <div className="flex items-center gap-2 mb-2">
                    <Settings className="text-primary" />
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Our Process</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {service.processSteps?.map((step, idx) => (
                        <div key={idx} className="bg-white dark:bg-dark-card p-6 rounded-xl border border-gray-100 dark:border-gray-800 relative overflow-hidden">
                             <div className="absolute top-0 right-0 p-4 opacity-5 font-bold text-6xl text-primary">{idx + 1}</div>
                             <h4 className="font-bold text-lg mb-2 relative z-10">{step.title}</h4>
                             <p className="text-sm text-gray-600 dark:text-gray-400 relative z-10">{step.description}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Benefits & Deliverables */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                 <div className="bg-white dark:bg-dark-card p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800">
                     <div className="flex items-center gap-2 mb-4">
                        <TrendingUp className="text-green-500" />
                        <h3 className="text-lg font-bold">Benefits</h3>
                     </div>
                     <ul className="space-y-3">
                        {service.benefits?.map((item, idx) => (
                             <li key={idx} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                                 <Check className="text-green-500 shrink-0 mt-0.5" size={16} />
                                 {item}
                             </li>
                        ))}
                     </ul>
                 </div>
                 <div className="bg-white dark:bg-dark-card p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800">
                     <div className="flex items-center gap-2 mb-4">
                        <Package className="text-secondary" />
                        <h3 className="text-lg font-bold">Deliverables</h3>
                     </div>
                     <ul className="space-y-3">
                        {service.deliverables?.map((item, idx) => (
                             <li key={idx} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                                 <div className="w-1.5 h-1.5 rounded-full bg-secondary mt-1.5 shrink-0" />
                                 {item}
                             </li>
                        ))}
                     </ul>
                 </div>
            </div>

            {/* Why Us Block */}
            <div className="bg-gradient-to-br from-primary to-orange-400 rounded-2xl p-8 text-white shadow-lg">
              <div className="flex items-start gap-4">
                <Star className="shrink-0 fill-white text-white" size={32} />
                <div>
                  <h3 className="text-xl font-bold mb-2">Why choose us for {service.title}?</h3>
                  <p className="opacity-90 leading-relaxed">
                    We bring years of experience and a results-oriented approach. Our team stays updated with the latest trends in {service.title} to ensure you get the best competitive advantage.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <div className="bg-white dark:bg-dark-card rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden mb-8">
                <div className="bg-gray-900 text-white p-6 text-center">
                  <h3 className="text-xl font-bold">Ready to Start?</h3>
                  <p className="text-gray-400 text-sm mt-1">Get a custom quote today.</p>
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
