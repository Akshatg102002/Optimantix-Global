
import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Star, TrendingUp } from 'lucide-react';
import { useData } from '../context/DataContext';
import { Icon } from '../components/Icon';
import { LeadModal } from '../components/LeadModal';
import { SEO } from '../components/SEO';
import { PortfolioSlider } from '../components/PortfolioSlider';
import { TESTIMONIALS, WORK_PROCESS, INDUSTRIES } from '../constants';

export const Home: React.FC = () => {
  const { services } = useData();
  const location = useLocation();

  const MotionH1 = motion.h1 as any;
  const MotionP = motion.p as any;
  const MotionDiv = motion.div as any;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <div id="top" className="overflow-x-hidden bg-light dark:bg-dark text-slate-900 dark:text-gray-100 transition-colors duration-300">
      <SEO 
        title="Home" 
        description="Optimantix Global - Driving Growth Through Innovation. Empowering businesses with result-driven strategies in SEO, Marketplace Management, and Web Development."
      />
      <LeadModal />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 lg:pt-40 lg:pb-24 bg-[#020617] text-white overflow-hidden">
        {/* Background Overlay Image - Darkened for better text contrast */}
        <div className="absolute top-0 right-0 w-full lg:w-2/3 h-full opacity-10 pointer-events-none">
           <img 
             src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=2000" 
             alt="Digital Growth"
             className="w-full h-full object-cover [mask-image:linear-gradient(to_bottom,transparent,black)] lg:[mask-image:linear-gradient(to_right,transparent,black)]"
           />
        </div>

        <div className="container relative z-10">
          <div className="max-w-4xl">
            <MotionH1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-5xl lg:text-7xl font-bold leading-[1.1] mb-6 tracking-tight text-white"
            >
              Driving <br />
              Growth <br />
              Through <br />
              <span className="text-primary">Innovation</span>
            </MotionH1>
            
            <MotionP 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg lg:text-xl text-gray-300 mb-10 max-w-2xl font-light leading-relaxed"
            >
              Optimantix Global empowers businesses with result-driven strategies in SEO, Marketplace Management, and Web Development. We don't just deliver services; we deliver measurable success.
            </MotionP>
            
            <MotionDiv 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap gap-4 mb-20"
            >
              <Link 
                to="/contact" 
                className="bg-primary hover:bg-secondary text-white font-bold py-4 px-10 rounded-lg transition shadow-lg shadow-primary/30 text-center"
              >
                Get consultation
              </Link>
              <button 
                onClick={() => document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-transparent border border-gray-600 hover:border-white text-white font-medium py-4 px-10 rounded-lg transition text-center"
              >
                View work
              </button>
            </MotionDiv>

            {/* Stats Row */}
            <MotionDiv 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-8 border-t border-gray-800"
            >
               <div>
                  <div className="text-4xl font-bold mb-1 text-white">120+</div>
                  <div className="text-gray-300 font-medium mb-1">Projects delivered</div>
                  <div className="text-xs text-gray-500">Enterprise solutions</div>
               </div>
               <div>
                  <div className="text-4xl font-bold mb-1 text-white">50+</div>
                  <div className="text-gray-300 font-medium mb-1">Active clients</div>
                  <div className="text-xs text-gray-500">Long-term partnerships</div>
               </div>
               <div>
                  <div className="text-4xl font-bold mb-1 text-white">5+</div>
                  <div className="text-gray-300 font-medium mb-1">Years experience</div>
                  <div className="text-xs text-gray-500">Proven expertise</div>
               </div>
               <div>
                  <div className="text-4xl font-bold mb-1 text-white">3</div>
                  <div className="text-gray-300 font-medium mb-1">Countries served</div>
                  <div className="text-xs text-gray-500">Global reach</div>
               </div>
            </MotionDiv>
          </div>
        </div>
      </section>

      {/* Services Section (Dark Cards) */}
      <section className="py-20 bg-white dark:bg-[#050505]">
        <div className="container">
          <div className="mb-16 text-center md:text-left">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 tracking-tight">Enterprise solutions <br/> for modern growth</h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl font-light">
              Discover scalable IT solutions engineered for efficiency and digital transformation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Map services to large cards */}
            {services.slice(0, 4).map((service, index) => (
              <MotionDiv
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative bg-[#0f172a] hover:bg-[#1e293b] rounded-2xl p-8 md:p-12 transition-all duration-300 min-h-[400px] flex flex-col justify-between overflow-hidden border border-gray-800 hover:border-primary/30 shadow-2xl"
              >
                 {/* Card Content */}
                 <div className="relative z-10">
                    <div className="text-primary text-xs font-bold uppercase tracking-wider mb-4 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-primary"></span> Core Service
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">{service.title}</h3>
                    <p className="text-gray-400 leading-relaxed mb-6 text-lg">{service.shortDescription}</p>
                    
                    {/* Visual Element inside card - Abstract UI representation */}
                    {index % 2 !== 0 && (
                        <div className="absolute right-0 bottom-20 w-64 h-40 bg-gray-800/20 rounded-l-xl border-l border-t border-b border-gray-700/30 backdrop-blur-sm transform translate-x-8 group-hover:translate-x-4 transition-transform duration-500 pointer-events-none">
                            <div className="p-4 space-y-3">
                                <div className="w-1/2 h-2 bg-gray-600/30 rounded"></div>
                                <div className="w-3/4 h-2 bg-gray-600/30 rounded"></div>
                                <div className="grid grid-cols-3 gap-3 mt-6">
                                    <div className="h-10 bg-gray-700/30 rounded"></div>
                                    <div className="h-10 bg-gray-700/30 rounded"></div>
                                    <div className="h-10 bg-gray-700/30 rounded"></div>
                                </div>
                            </div>
                        </div>
                    )}
                 </div>

                 <div className="relative z-10 pt-8">
                    <Link 
                      to={`/services/${service.slug}`}
                      className="inline-flex items-center text-white font-semibold hover:text-primary transition-colors group-hover:translate-x-1 duration-300"
                    >
                      Learn more <ArrowRight size={20} className="ml-2" />
                    </Link>
                 </div>
              </MotionDiv>
            ))}
          </div>
          
          <div className="mt-16 text-center">
             <Link to="/services" className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-white bg-primary rounded-full hover:bg-secondary transition shadow-lg shadow-blue-500/20">
               View all solutions <ArrowRight size={18} className="ml-2" />
             </Link>
          </div>
        </div>
      </section>

      {/* Portfolio Slider */}
      <div id="portfolio">
        <PortfolioSlider />
      </div>

      {/* Process Section */}
      <section className="py-20 bg-light dark:bg-[#0a0a0a] relative overflow-hidden border-t border-gray-200 dark:border-gray-900">
        <div className="container relative z-10">
          <div className="text-center mb-16">
            <span className="text-secondary dark:text-primary font-bold uppercase tracking-wider text-sm">How We Work</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2 text-gray-900 dark:text-white">Our Proven Process</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
             {WORK_PROCESS.map((step, idx) => (
               <div key={idx} className="relative group">
                  <div className="text-6xl font-black text-gray-200 dark:text-gray-800/50 mb-4 group-hover:text-primary/20 transition-colors">0{idx + 1}</div>
                  <h3 className="font-bold text-xl mb-3 text-gray-900 dark:text-white relative top-[-20px]">{step.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed relative top-[-10px]">
                    {step.description}
                  </p>
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* Industries Served */}
      <section className="py-16 bg-white dark:bg-black">
         <div className="container">
            <p className="text-center text-sm font-semibold text-gray-400 uppercase tracking-widest mb-10">Industries We Serve</p>
            <div className="flex flex-wrap justify-center gap-3">
              {INDUSTRIES.map((industry, idx) => (
                <span key={idx} className="px-6 py-3 bg-gray-50 dark:bg-[#111] rounded-full text-gray-700 dark:text-gray-300 text-sm border border-gray-100 dark:border-gray-800 hover:border-primary hover:text-primary transition-colors cursor-default">
                  {industry}
                </span>
              ))}
            </div>
         </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-light dark:bg-[#050505] border-t border-gray-200 dark:border-gray-900">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mt-2 text-gray-900 dark:text-white">What Our Clients Say</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((t, idx) => (
              <div key={idx} className="bg-white dark:bg-[#111] p-8 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 relative group hover:border-primary/50 transition-colors">
                <div className="flex items-center gap-4 mb-6">
                  <img src={t.image} alt={t.name} className="w-12 h-12 rounded-full object-cover grayscale group-hover:grayscale-0 transition-all opacity-80 group-hover:opacity-100" />
                  <div>
                    <div className="font-bold text-slate-900 dark:text-white text-sm">{t.name}</div>
                    <div className="text-xs text-gray-500">{t.role}</div>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">"{t.content}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-white dark:bg-black">
        <div className="container">
          <div className="bg-primary rounded-3xl p-12 md:p-20 text-center text-white relative overflow-hidden shadow-2xl shadow-primary/20">
             {/* Decorative Circles */}
             <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
             <div className="absolute bottom-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
            
            <div className="relative z-10 max-w-2xl mx-auto">
              <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">Ready to scale your business?</h2>
              <p className="text-white/90 text-lg mb-10 font-light">
                Join hundreds of successful companies that trust Optimantix for their digital needs.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                 <Link 
                   to="/contact"
                   className="bg-white text-primary hover:bg-gray-50 font-bold py-4 px-10 rounded-lg transition inline-block shadow-lg"
                 >
                   Request Free Quote
                 </Link>
                 <a href="tel:+919910343016" className="border-2 border-white hover:bg-white/10 text-white font-bold py-4 px-10 rounded-lg transition inline-block">
                   Call Us Now
                 </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
