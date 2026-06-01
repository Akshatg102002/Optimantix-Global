import React from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { SEO } from '../components/SEO';
import { AUTHENTIC_CASE_STUDIES } from '../data/caseStudies';
import { ArrowLeft, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';
import { RichContent } from '../components/RichContent';
import { ShareButtons } from '../components/ShareButtons';

export const CaseDetails: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  
  const study = AUTHENTIC_CASE_STUDIES.find(s => s.slug === slug);
  
  if (!study) {
    return <Navigate to="/404" replace />;
  }

  const MotionDiv = motion.div as React.ElementType;

  return (
    <div className="bg-gray-50 dark:bg-[#0a0a0a] min-h-screen pt-24 pb-16">
      <SEO 
        title={study.metaTitle || study.title} 
        description={study.metaDescription || study.excerpt}
      />
      
      {/* Hero Header */}
      <div className="container mx-auto px-4 pt-8 pb-12 max-w-4xl text-center">
        <MotionDiv
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 flex flex-wrap justify-center gap-2"
        >
          {study.tags && study.tags.map((tag, idx) => (
            <span key={idx} className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
              {tag}
            </span>
          ))}
        </MotionDiv>
        <MotionDiv
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 dark:text-white mb-6 tracking-tight leading-tight"
        >
          {study.title}
        </MotionDiv>
        <MotionDiv
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
        >
          {study.excerpt}
        </MotionDiv>
      </div>

      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          {/* Main Visual */}
          <MotionDiv 
             initial={{ opacity: 0, scale: 0.95 }}
             animate={{ opacity: 1, scale: 1 }}
             transition={{ delay: 0.2 }}
             className="w-full h-auto md:h-[500px] mb-12 rounded-3xl overflow-hidden shadow-2xl"
          >
            <img src={study.imageUrl} alt={study.title} className="w-full h-full object-cover" />
          </MotionDiv>

          <Link to="/case-studies" className="inline-flex items-center text-gray-500 hover:text-primary font-medium transition mb-8">
            <ArrowLeft size={16} className="mr-2" /> Back to Case Studies
          </Link>

          <MotionDiv 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white dark:bg-dark-card rounded-3xl p-8 md:p-12 shadow-sm border border-gray-100 dark:border-gray-800"
          >
            {/* Meta Info */}
            <div className="flex flex-wrap gap-6 mb-10 text-sm text-gray-500 dark:text-gray-400 border-b border-gray-100 dark:border-gray-800 pb-6">
                <div className="flex items-center gap-2 font-medium">
                    <Calendar size={18} className="text-primary" />
                    {new Date(study.date).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
                </div>
            </div>

            {/* Content */}
            <RichContent content={study.content} variant="case-study" imageAlt={study.title} />
            
            <div className="mt-12 pt-8 border-t border-gray-100 dark:border-gray-800">
                <ShareButtons title={study.title} url={window.location.href} />
            </div>

          </MotionDiv>

          {/* CTA */}
          <MotionDiv 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 bg-gradient-to-br from-primary/10 to-primary/5 dark:from-primary/20 dark:to-dark-card border border-primary/20 rounded-3xl p-10 text-center shadow-lg"
          >
                <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Want similar results?</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto text-lg leading-relaxed">
                    Let's discuss how we can help you achieve your business goals. We partner with ambitious brands to scale their digital growth.
                </p>
                <div className="flex justify-center gap-4">
                     <Link to="/contact" className="bg-primary text-white px-8 py-4 rounded-xl font-bold hover:bg-secondary transition shadow-xl shadow-primary/30">
                        Get a Custom Proposal
                     </Link>
                </div>
            </MotionDiv>
        </div>
      </div>
    </div>
  );
};
