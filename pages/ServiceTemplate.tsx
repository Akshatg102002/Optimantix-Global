import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { Icon } from '../components/Icon';
import { ContactForm } from '../components/ContactForm';
import { Check, Star } from 'lucide-react';
import { motion } from 'framer-motion';

export const ServiceTemplate: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { services } = useData();
  const service = services.find(s => s.slug === slug);

  if (!service) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="bg-light">
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
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="bg-indigo-50 p-3 rounded-lg text-primary">
                  <Icon name={service.iconName} size={32} />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Overview</h2>
              </div>
              <p className="text-gray-600 leading-relaxed text-lg mb-8">
                {service.fullDescription}
              </p>

              <h3 className="text-xl font-bold text-gray-900 mb-4">Key Features</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {service.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <Check className="text-green-500 shrink-0" size={18} />
                    <span className="text-gray-700 font-medium">{feature}</span>
                  </div>
                ))}
              </div>
            </motion.div>

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
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden mb-8">
                <div className="bg-gray-900 text-white p-6 text-center">
                  <span className="block text-gray-400 text-sm mb-1">Pricing starts at</span>
                  <span className="text-3xl font-bold">{service.pricing}</span>
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