
import React, { useState } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { ServiceGrowthChart } from '../components/ServiceGrowthChart';
import { Check, ArrowLeft, Star, Zap, Map, ArrowRight, LayoutGrid, Quote, ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { SEO } from '../components/SEO';

export const SubServiceTemplate: React.FC = () => {
  const { slug, subSlug } = useParams<{ slug: string; subSlug: string }>();
  const { services, caseStudies } = useData();
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  
  const service = services.find(s => s.slug === slug);
  const subService = service?.subServices?.find(sub => sub.slug === subSlug);

  const MotionDiv = motion.div as React.ElementType;

  if (!service || !subService) {
    return <Navigate to="/404" replace />;
  }
  
  const relevantCaseStudies = caseStudies.filter(cs => cs.subServiceId === subService.id);
  
  // Helper to get image based on slug
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

  const isNewLayout = !!subService.page_title;

  const title = isNewLayout
      ? subService.hero_section?.headline || subService.page_title
      : subService.title;

  const subtitle = isNewLayout
      ? subService.hero_section?.lead_text || ''
      : subService.shortDescription;

  return (
    <div className="bg-light dark:bg-dark min-h-screen">
      <SEO 
        title={subService.seo?.meta_title || `${title} - ${service.title}`} 
        description={subService.seo?.meta_description || subtitle || ''}
      />
      
      {/* 🔹 TOP BANNER (IMAGE ONLY) */}
      <div className="hidden md:block w-full h-[320px] bg-cover bg-center" style={{ backgroundImage: `url(${subService.banners?.desktop || getServiceImage(service.slug)})` }} />
      <div className="md:hidden w-full h-[320px] bg-cover bg-center" style={{ backgroundImage: `url(${subService.banners?.mobile || getServiceImage(service.slug)})` }} />

      {/* 🔹 TITLE SECTION BELOW BANNER */}
      <div
          className="bg-white dark:bg-dark text-center py-10 px-4 flex flex-col items-center justify-center relative overflow-hidden"
      >
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gray-200 dark:via-gray-800 to-transparent" />
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 tracking-tight">
              {title}
          </h1>

          {subtitle && (
              <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-4xl mx-auto mb-8 leading-relaxed">
                  {subtitle}
              </p>
          )}
          
          <Link 
              to="/contact" 
              className="inline-flex items-center justify-center bg-primary hover:bg-secondary text-white font-bold py-3 px-8 rounded-full transition-all duration-300 shadow-lg shadow-primary/20 hover:scale-105"
          >
              Connect With Us <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
      </div>

      <div className="container mx-auto px-4 md:px-6 py-16">
        <Link to={`/services/${service.slug}`} className="inline-flex items-center text-primary font-medium hover:underline mb-8">
            <ArrowLeft size={16} className="mr-2" /> Back to {service.title}
        </Link>

        {isNewLayout ? (
          <div className="max-w-6xl mx-auto space-y-24">
            
            {/* Statistics Section */}
            {subService.statistics_section && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {subService.statistics_section.stats.map((stat, idx) => (
                  <div key={idx} className="text-center p-6 bg-white dark:bg-dark-card rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800">
                    <div className="text-4xl font-bold text-primary mb-2">{stat.value}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">{stat.label}</div>
                  </div>
                ))}
              </div>
            )}

            {/* Services Grid Section */}
            {subService.services_section && (
              <MotionDiv 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <div className="text-center mb-12">
                  <span className="text-primary font-bold tracking-wider uppercase text-sm mb-2 block">{subService.services_section.section_label}</span>
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">{subService.services_section.title}</h2>
                  <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto whitespace-pre-line">
                    {subService.services_section.description}
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {subService.services_section.services_grid.map((item, idx) => (
                    <div key={idx} className="bg-white dark:bg-dark-card p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 hover:border-primary/30 transition-colors">
                      <LayoutGrid className="text-primary mb-6" size={32} />
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">{item.title}</h3>
                      <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{item.description}</p>
                    </div>
                  ))}
                </div>
              </MotionDiv>
            )}

            {/* Process Section */}
            {subService.process_section && (
              <MotionDiv 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-gray-50 dark:bg-dark-card/50 rounded-3xl p-8 md:p-12 border border-gray-100 dark:border-gray-800"
              >
                <div className="text-center mb-12">
                  <span className="text-primary font-bold tracking-wider uppercase text-sm mb-2 block">{subService.process_section.section_label}</span>
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">{subService.process_section.title}</h2>
                  <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                    {subService.process_section.description}
                  </p>
                </div>
                <div className="space-y-8 max-w-4xl mx-auto">
                  {subService.process_section.steps.map((step, idx) => (
                    <div key={idx} className="flex flex-col md:flex-row gap-6 items-start bg-white dark:bg-dark p-6 rounded-2xl shadow-sm">
                      <div className="flex-shrink-0 w-16 h-16 bg-primary/10 text-primary rounded-xl flex items-center justify-center text-xl font-bold">
                        {step.step_number}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{step.title}</h3>
                        <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{step.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </MotionDiv>
            )}

            {/* Why Us Section */}
            {subService.why_us_section && (
              <MotionDiv 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <div className="text-center mb-12">
                  <span className="text-primary font-bold tracking-wider uppercase text-sm mb-2 block">{subService.why_us_section.section_label}</span>
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">{subService.why_us_section.title}</h2>
                  <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                    {subService.why_us_section.description}
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {subService.why_us_section.features_grid.map((feature, idx) => (
                    <div key={idx} className="flex gap-4">
                      <Check className="text-green-500 shrink-0 mt-1" size={24} />
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{feature.title}</h3>
                        <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{feature.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </MotionDiv>
            )}

            {/* Testimonials Section */}
            {subService.testimonials_section && (
              <MotionDiv 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-primary text-white rounded-3xl p-8 md:p-12 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
                <div className="text-center mb-12 relative z-10">
                  <span className="text-white/80 font-bold tracking-wider uppercase text-sm mb-2 block">{subService.testimonials_section.section_label}</span>
                  <h2 className="text-3xl md:text-4xl font-bold mb-4">{subService.testimonials_section.title}</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
                  {subService.testimonials_section.testimonials.map((testimonial, idx) => (
                    <div key={idx} className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/20">
                      <Quote className="text-white/40 mb-4" size={32} />
                      <p className="text-lg font-medium mb-6 leading-relaxed">"{testimonial.quote}"</p>
                      <p className="font-bold">— {testimonial.author}</p>
                    </div>
                  ))}
                </div>
              </MotionDiv>
            )}

            {/* FAQ Section */}
            {subService.faq_section && (
              <MotionDiv 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="max-w-4xl mx-auto"
              >
                <div className="text-center mb-12">
                  <span className="text-primary font-bold tracking-wider uppercase text-sm mb-2 block">{subService.faq_section.section_label}</span>
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">{subService.faq_section.title}</h2>
                </div>
                <div className="space-y-4">
                  {subService.faq_section.questions.map((faq, idx) => (
                    <div key={idx} className="bg-white dark:bg-dark-card rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden shadow-sm">
                      <button
                        onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                        className="w-full text-left px-6 py-5 flex justify-between items-center focus:outline-none"
                      >
                        <span className="font-bold text-gray-900 dark:text-white pr-4">{faq.question}</span>
                        {openFaq === idx ? (
                          <ChevronUp className="text-primary shrink-0" size={20} />
                        ) : (
                          <ChevronDown className="text-gray-400 shrink-0" size={20} />
                        )}
                      </button>
                      <AnimatePresence>
                        {openFaq === idx && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="px-6 pb-5 text-gray-600 dark:text-gray-400 whitespace-pre-line"
                          >
                            <div className="pt-2 border-t border-gray-100 dark:border-gray-800">
                              {faq.answer}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </div>
              </MotionDiv>
            )}

            {/* Bottom CTA Section */}
            {subService.bottom_cta_section && (
              <div className="bg-light dark:bg-dark-card border-t-4 border-primary rounded-2xl p-8 md:p-12 text-center shadow-lg">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">{subService.bottom_cta_section.title}</h2>
                <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
                  {subService.bottom_cta_section.description}
                </p>
                <Link to="/contact" className="inline-block bg-primary text-white px-8 py-4 rounded-xl font-bold hover:bg-secondary transition shadow-lg shadow-primary/20 text-lg">
                  {subService.bottom_cta_section.call_to_action_button.text}
                </Link>
              </div>
            )}
            
          </div>
        ) : (
          <div className="max-w-4xl mx-auto space-y-16">
            
            {/* Main Content */}
            <div className="space-y-16">
              
              {/* Overview */}
              <MotionDiv 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white dark:bg-dark-card rounded-2xl p-8 shadow-sm border border-gray-100 dark:border-gray-800"
              >
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">About this Service</h2>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-lg mb-8">
                  {subService.fullDescription}
                </p>

                {((subService.features && subService.features.length > 0) || (subService.benefits && subService.benefits.length > 0)) && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {subService.features && subService.features.length > 0 && (
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
                        )}
                        {subService.benefits && subService.benefits.length > 0 && (
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
                        )}
                    </div>
                )}
              </MotionDiv>

              {/* Growth Roadmap */}
              {subService.phases && subService.phases.length > 0 && (
                  <div>
                     <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 flex items-center gap-2">
                        <Map className="text-primary" /> Strategic Roadmap
                     </h2>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {subService.phases!.map((phase, idx) => (
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

              {/* Visuals & Stats */}
              {subService.stats && subService.stats.length > 0 && (
                  <ServiceGrowthChart stats={subService.stats} serviceName={subService.title!} />
              )}

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

          </div>
        )}
      </div>
    </div>
  );
};
