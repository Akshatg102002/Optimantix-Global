
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { Calendar, ArrowRight, Filter } from 'lucide-react';
import { ParallaxHero } from '../components/ParallaxHero';
import { motion, AnimatePresence } from 'framer-motion';

export const CaseStudyList: React.FC = () => {
  const { caseStudies, services } = useData();
  const [selectedServiceId, setSelectedServiceId] = useState<string>('all');

  const filteredStudies = selectedServiceId === 'all' 
    ? caseStudies 
    : caseStudies.filter(s => s.serviceId === selectedServiceId);

  const MotionDiv = motion.div as React.ElementType;

  return (
    <div className="min-h-screen bg-light dark:bg-dark">
      
      <ParallaxHero 
         title="Case Studies"
         subtitle="Real results for real businesses. Explore our portfolio of success stories."
         imageUrl="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=2000"
         height="50vh"
      />

      <div className="container mx-auto px-4 md:px-6 py-16">
        {/* Filters */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
          <button
            onClick={() => setSelectedServiceId('all')}
            className={`px-6 py-2 rounded-full text-sm font-bold transition-all duration-300 ${
              selectedServiceId === 'all' 
                ? 'bg-primary text-white shadow-lg shadow-primary/20' 
                : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-100 dark:border-gray-800'
            }`}
          >
            All Projects
          </button>
          {services.map(service => (
            <button
              key={service.id}
              onClick={() => setSelectedServiceId(service.id)}
              className={`px-6 py-2 rounded-full text-sm font-bold transition-all duration-300 ${
                selectedServiceId === service.id 
                  ? 'bg-primary text-white shadow-lg shadow-primary/20' 
                  : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-100 dark:border-gray-800'
              }`}
            >
              {service.title}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredStudies.map(study => {
              const service = services.find(s => s.id === study.serviceId);
              return (
                <MotionDiv
                  key={study.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                >
                  <Link 
                    to={`/case-studies/${study.slug}`} 
                    className="group block bg-white dark:bg-dark-card rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-100 dark:border-gray-800 h-full flex flex-col"
                  >
                    <div className="relative h-64 overflow-hidden">
                      <img
                        src={study.imageUrl}
                        alt={study.imageAltText || study.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
                        <span className="text-white font-bold flex items-center gap-2">
                          View Case Study <ArrowRight size={18} />
                        </span>
                      </div>
                      {service && (
                        <div className="absolute top-4 left-4">
                          <span className="bg-primary/90 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-lg shadow-lg">
                            {service.title}
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="p-8 flex-grow flex flex-col">
                      <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400 mb-4">
                        <div className="flex items-center gap-1.5">
                          <Calendar size={14} className="text-primary" />
                          <span>{new Date(study.date).toLocaleDateString(undefined, { year: 'numeric', month: 'long' })}</span>
                        </div>
                      </div>
                      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-primary transition-colors line-clamp-2 leading-tight">
                        {study.title}
                      </h2>
                      <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-3 mb-6 leading-relaxed">
                        {study.excerpt}
                      </p>
                      <div className="mt-auto pt-4 border-t border-gray-50 dark:border-gray-800 flex items-center justify-between">
                        <span className="text-primary font-bold text-sm group-hover:translate-x-1 transition-transform inline-flex items-center gap-2">
                          Read Success Story <ArrowRight size={16} />
                        </span>
                      </div>
                    </div>
                  </Link>
                </MotionDiv>
              );
            })}
          </AnimatePresence>
        </div>

        {filteredStudies.length === 0 && (
          <div className="text-center py-20">
            <div className="bg-gray-100 dark:bg-gray-800 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Filter className="text-gray-400" size={32} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">No Case Studies Found</h3>
            <p className="text-gray-500 dark:text-gray-400">Try selecting a different category.</p>
          </div>
        )}
      </div>
    </div>
  );
};
