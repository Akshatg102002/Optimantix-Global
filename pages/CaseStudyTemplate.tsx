import React from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { Helmet } from 'react-helmet-async';
import { ParallaxHero } from '../components/ParallaxHero';
import { ArrowLeft, Calendar, Tag } from 'lucide-react';
import { motion } from 'framer-motion';
import { RichContent } from '../components/RichContent';
import { ShareButtons } from '../components/ShareButtons';
import { SITE_URL, truncateDescription } from '../data/seoData';

export const CaseStudyTemplate: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { caseStudies, services } = useData();
  
  const study = caseStudies.find(s => s.slug === slug);
  
  if (!study) {
    return <Navigate to="/404" replace />;
  }

  const service = services.find(s => s.id === study.serviceId);
  const subService = service?.subServices?.find(ss => ss.id === study.subServiceId);

  const MotionDiv = motion.div as React.ElementType;

  const canonical = `${SITE_URL}/case-studies/${study.slug}`;
  const seoTitle = study.metaTitle || `${study.title} | Optimantix Global`;
  const seoDescription = truncateDescription(study.metaDescription || study.excerpt, 155);

  return (
    <div className="bg-light dark:bg-dark min-h-screen">
      <Helmet>
        <title>{seoTitle}</title>
        <meta name="description" content={seoDescription} />
        <link rel="canonical" href={canonical} />
        <meta property="og:title" content={seoTitle} />
        <meta property="og:description" content={seoDescription} />
        <meta property="og:url" content={canonical} />
        <meta property="og:type" content="article" />
      </Helmet>

      <ParallaxHero
        title={study.title}
        subtitle={study.excerpt}
        imageUrl={study.imageUrl}
        imageAltText={study.imageAltText}
      />

      <div className="container mx-auto px-4 md:px-6 py-16">
        <Link to="/" className="inline-flex items-center text-primary font-medium hover:underline mb-8">
            <ArrowLeft size={16} className="mr-2" /> Back to Home
        </Link>

        <div className="max-w-4xl mx-auto">
          <MotionDiv 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-dark-card rounded-2xl p-8 md:p-12 shadow-sm border border-gray-100 dark:border-gray-800"
          >
            {/* Meta Info */}
            <div className="flex flex-wrap gap-4 mb-8 text-sm text-gray-500 dark:text-gray-400 border-b border-gray-100 dark:border-gray-800 pb-6">
                <div className="flex items-center gap-2">
                    <Calendar size={16} />
                    {new Date(study.date).toLocaleDateString()}
                </div>
                {service && (
                    <div className="flex items-center gap-2">
                        <Tag size={16} />
                        <Link to={`/services/${service.slug}`} className="hover:text-primary transition">
                            {service.title}
                        </Link>
                        {subService && (
                            <>
                                <span>/</span>
                                <Link to={`/services/${service.slug}/${subService.slug}`} className="hover:text-primary transition">
                                    {subService.title}
                                </Link>
                            </>
                        )}
                    </div>
                )}
            </div>

            {/* Content */}
            <RichContent content={study.content} variant="case-study" imageAlt={study.title} />
            <ShareButtons title={study.title} url={window.location.href} />

            {/* Tags */}
            {study.tags && study.tags.length > 0 && (
                <div className="mt-12 pt-8 border-t border-gray-100 dark:border-gray-800">
                    <h3 className="text-sm font-bold uppercase text-gray-500 mb-4">Tags</h3>
                    <div className="flex flex-wrap gap-2">
                        {study.tags.map((tag, idx) => (
                            <span key={idx} className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-3 py-1 rounded-full text-sm">
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
            )}
          </MotionDiv>

          {/* CTA */}
          <div className="mt-12 bg-primary/5 border border-primary/20 rounded-2xl p-8 text-center">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Want similar results?</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-2xl mx-auto">
                    Let's discuss how we can help you achieve your business goals with our {service?.title || 'services'}.
                </p>
                <div className="flex justify-center gap-4">
                     <Link to="/contact" className="bg-primary text-white px-6 py-3 rounded-lg font-bold hover:bg-secondary transition shadow-lg shadow-primary/20">
                        Get a Quote
                     </Link>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};
