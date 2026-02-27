
import React from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { Icon } from '../components/Icon';
import { ContactForm } from '../components/ContactForm';
import { Check, Star, Settings, Package, TrendingUp, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { SEO } from '../components/SEO';
import { ParallaxHero } from '../components/ParallaxHero';

export const ServiceTemplate: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { services, caseStudies } = useData();
  const service = services.find(s => s.slug === slug);
  
  const MotionDiv = motion.div as any;

  if (!service) {
    return <Navigate to="/" replace />;
  }

  const relevantCaseStudies = caseStudies.filter(cs => cs.serviceId === service.id);

  // Helper to get image based on slug (fallback if not in data object)
  const getServiceImage = (slug: string) => {
    switch(slug) {
        case 'digital-marketing': return 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=2000';
        case 'marketplace-management': return 'https://images.unsplash.com/photo-1661956602116-aa6865609028?auto=format&fit=crop&q=80&w=2000';
        case 'development': return 'https://images.unsplash.com/photo-1555099962-4199c345e5dd?auto=format&fit=crop&q=80&w=2000';
        case 'graphic-design': return 'https://images.unsplash.com/photo-1626785774573-4b799314346d?auto=format&fit=crop&q=80&w=2000';
        case 'hosting': return 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=2000';
        case 'communications': return 'https://images.unsplash.com/photo-1577563908411-5077b6dc7624?auto=format&fit=crop&q=80&w=2000';
        default: return 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=2000';
    }
  };

  const hasFeatures = service.features && service.features.length > 0;
  const hasProcess = service.processSteps && service.processSteps.length > 0;
  const hasBenefits = service.benefits && service.benefits.length > 0;
  const hasDeliverables = service.deliverables && service.deliverables.length > 0;

  return (
    <div className="bg-light dark:bg-dark min-h-screen">
      <SEO 
        title={service.title} 
        description={service.shortDescription}
      />
      
      <ParallaxHero 
        title={service.title}
        subtitle={service.shortDescription}
        imageUrl={getServiceImage(service.slug)}
      />

      <div className="container mx-auto px-4 md:px-6 py-16">
        <div className="max-w-4xl mx-auto space-y-12">
          
          {/* Main Content */}
          <div className="space-y-12">
            
            {/* Overview */}
            <MotionDiv 
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

              {hasFeatures && (
                <>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Key Features</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {service.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <Check className="text-green-500 shrink-0" size={18} />
                        <span className="text-gray-700 dark:text-gray-300 font-medium">{feature}</span>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </MotionDiv>

            {/* Process Steps */}
            {hasProcess && (
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
            )}

            {/* Benefits & Deliverables */}
            {(hasBenefits || hasDeliverables) && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                     {hasBenefits && (
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
                     )}
                     {hasDeliverables && (
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
                     )}
                </div>
            )}

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

            {/* Case Studies */}
            {relevantCaseStudies.length > 0 && (
                <div className="space-y-6">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Success Stories</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {relevantCaseStudies.map(study => (
                            <Link to={`/case-studies/${study.slug}`} key={study.id} className="group block bg-white dark:bg-dark-card rounded-xl overflow-hidden shadow-sm border border-gray-100 dark:border-gray-800 hover:shadow-md transition">
                                <div className="h-48 overflow-hidden">
                                    <img src={study.imageUrl} alt={study.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                                </div>
                                <div className="p-6">
                                    <h3 className="font-bold text-lg mb-2 group-hover:text-primary transition">{study.title}</h3>
                                    <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2">{study.excerpt}</p>
                                    <div className="mt-4 flex items-center text-primary font-medium text-sm">
                                        Read Case Study <ArrowRight size={16} className="ml-1 group-hover:translate-x-1 transition" />
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};
