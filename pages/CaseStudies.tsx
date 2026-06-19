import React from 'react';
import { AUTHENTIC_CASE_STUDIES } from '../data/caseStudies';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const CaseStudies: React.FC = () => {
  const MotionDiv = motion.div as React.ElementType;

  return (
    <div className="bg-white dark:bg-dark min-h-screen">
{/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-dark relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10 text-center max-w-4xl">
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 text-primary px-4 py-1.5 rounded-full text-sm font-bold uppercase tracking-wider mb-6"
          >
            Success Stories
          </MotionDiv>
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6 tracking-tight"
          >
            Real Results for <span className="text-primary">Real Brands</span>
          </MotionDiv>
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-8 leading-relaxed"
          >
            Discover how we partner with our clients to solve complex marketing challenges, scale revenues, and build lasting digital authority.
          </MotionDiv>
        </div>
      </section>

      {/* Case Studies Grid */}
      <section className="py-16 bg-white dark:bg-dark">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {AUTHENTIC_CASE_STUDIES.map((study, idx) => (
              <MotionDiv
                key={study.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group bg-gray-50 dark:bg-dark-card rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-800 hover:shadow-xl transition-all flex flex-col"
              >
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={study.imageUrl} 
                    alt={study.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 flex gap-2">
                    {study.tags && study.tags.slice(0, 2).map((tag, tIdx) => (
                      <span key={tIdx} className="bg-white/90 dark:bg-dark/90 backdrop-blur text-xs font-bold px-2 py-1 rounded text-gray-900 dark:text-white">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="p-8 flex flex-col flex-grow">
                  <div className="text-sm text-gray-500 dark:text-gray-400 mb-3 font-medium">
                    {new Date(study.date).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 leading-tight group-hover:text-primary transition-colors">
                    <Link to={`/case/${study.slug}`}>{study.title}</Link>
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-8 flex-grow">
                    {study.excerpt}
                  </p>
                  
                  <div className="mt-auto">
                    <Link 
                      to={`/case/${study.slug}`} 
                      className="inline-flex items-center font-bold text-primary hover:text-secondary transition"
                    >
                      Read Case Study <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </MotionDiv>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-gray-50 dark:bg-[#0a0a0a]">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 tracking-tight">Ready to be our next success story?</h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-10">
            Let's discuss how we can apply these proven strategies to your business.
          </p>
          <Link to="/contact" className="inline-flex items-center justify-center bg-primary text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-secondary transition shadow-xl shadow-primary/20 group">
            Start Your Project <ArrowUpRight className="ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </Link>
        </div>
      </section>
    </div>
  );
};
