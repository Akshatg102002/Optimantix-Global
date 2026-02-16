
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, Star } from 'lucide-react';
import { useData } from '../context/DataContext';
import { LeadModal } from '../components/LeadModal';
import { SEO } from '../components/SEO';
import { PortfolioSlider } from '../components/PortfolioSlider';
import { TESTIMONIALS, WORK_PROCESS, INDUSTRIES } from '../constants';
import { motion } from 'framer-motion';

export const Home: React.FC = () => {
  const { services } = useData();
  const MotionDiv = motion.div as any;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-light dark:bg-dark text-slate-900 dark:text-gray-100 transition-colors duration-300">
      <SEO 
        title="Home" 
        description="Optimantix Global - Driving Growth Through Innovation. Empowering businesses with result-driven strategies in SEO, Marketplace Management, and Web Development."
      />
      <LeadModal />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden bg-[#020617] text-white">
        <div className="absolute inset-0 z-0">
           <img 
             src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=2000" 
             alt="Digital Universe"
             className="w-full h-full object-cover opacity-20"
           />
           <div className="absolute inset-0 bg-gradient-to-b from-[#020617]/50 via-transparent to-[#020617]"></div>
        </div>
        
        <div className="container relative z-10 px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <MotionDiv
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-8 tracking-tight">
                Driving Growth Through <br />
                <span className="text-primary bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600">Innovation</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 mb-10 font-light leading-relaxed max-w-3xl mx-auto">
                Optimantix Global empowers businesses with result-driven strategies in SEO, Marketplace Management, and Web Development.
              </p>
              
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link 
                  to="/contact" 
                  className="bg-primary hover:bg-secondary text-white font-bold py-4 px-10 rounded-full transition shadow-lg shadow-blue-500/30 flex items-center justify-center gap-2"
                >
                  Get Started <ArrowRight className="w-5 h-5" />
                </Link>
                <Link 
                  to="/services"
                  className="bg-transparent border border-gray-600 hover:border-white text-white font-medium py-4 px-10 rounded-full transition"
                >
                  View Services
                </Link>
              </div>
            </MotionDiv>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 bg-white dark:bg-dark-card border-b border-gray-100 dark:border-gray-800">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <span className="text-primary font-bold tracking-widest uppercase text-sm mb-2 block">Our Expertise</span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">Enterprise solutions for growth</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.slice(0, 6).map((service, index) => (
              <MotionDiv
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group bg-gray-50 dark:bg-[#111] hover:bg-white dark:hover:bg-gray-800 rounded-2xl p-8 transition-all duration-300 border border-gray-200 dark:border-gray-800 hover:shadow-xl hover:border-primary/30"
              >
                 <div className="text-xs font-bold text-primary uppercase mb-4 tracking-wider flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-primary"></span> Service 0{index + 1}
                 </div>
                 <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{service.title}</h3>
                 <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">{service.shortDescription}</p>
                 <Link 
                   to={`/services/${service.slug}`}
                   className="inline-flex items-center text-gray-900 dark:text-white font-semibold hover:text-primary transition-colors group-hover:translate-x-1 duration-200"
                 >
                   Learn more <ArrowRight size={18} className="ml-2" />
                 </Link>
              </MotionDiv>
            ))}
          </div>
          
          <div className="text-center mt-12">
             <Link to="/services" className="inline-flex items-center justify-center px-8 py-3 font-medium text-primary hover:text-secondary hover:underline transition">
               View All Services <ArrowRight size={18} className="ml-2" />
             </Link>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <PortfolioSlider />

      {/* Process Section */}
      <section className="py-24 bg-gray-50 dark:bg-[#0a0a0a]">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-secondary dark:text-primary font-bold uppercase tracking-wider text-sm mb-2 block">How We Work</span>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">Our Proven Process</h2>
              <p className="text-gray-600 dark:text-gray-400 text-lg mb-8 leading-relaxed">
                We follow a structured approach to ensure every project delivers measurable results and exceeds expectations.
              </p>
              
              <div className="space-y-6">
                {WORK_PROCESS.map((step, idx) => (
                  <div key={idx} className="flex gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold shadow-lg">
                      {idx + 1}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">{step.title}</h3>
                      <p className="text-gray-600 dark:text-gray-400">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
               <div className="absolute inset-0 bg-primary/10 rounded-3xl transform rotate-3 scale-105"></div>
               <img 
                 src="https://images.unsplash.com/photo-1553877615-30c7309dc584?auto=format&fit=crop&q=80&w=1000" 
                 alt="Team working" 
                 className="relative rounded-3xl shadow-2xl w-full h-auto object-cover"
               />
            </div>
          </div>
        </div>
      </section>
      
      {/* Industries */}
      <section className="py-20 bg-white dark:bg-dark-card">
        <div className="container mx-auto px-4 text-center">
            <p className="text-center text-sm font-semibold text-gray-400 uppercase tracking-widest mb-10">Trusted Across Industries</p>
            <div className="flex flex-wrap justify-center gap-4">
            {INDUSTRIES.map((industry, idx) => (
                <span key={idx} className="px-6 py-3 bg-gray-50 dark:bg-[#111] rounded-full text-gray-700 dark:text-gray-300 text-sm border border-gray-100 dark:border-gray-800 hover:border-primary hover:text-primary transition-colors cursor-default">
                {industry}
                </span>
            ))}
            </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-gray-50 dark:bg-[#0a0a0a]">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
             <span className="text-primary font-bold uppercase tracking-wider text-sm mb-2 block">Testimonials</span>
            <h2 className="text-3xl md:text-5xl font-bold mt-2 text-gray-900 dark:text-white">What Our Clients Say</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((t, idx) => (
              <div key={idx} className="bg-white dark:bg-dark-card p-10 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-900 relative">
                <div className="text-primary mb-6"><Star className="fill-current" size={24} /></div>
                <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed italic mb-8">"{t.content}"</p>
                <div className="flex items-center gap-4">
                  <img src={t.image} alt={t.name} className="w-12 h-12 rounded-full object-cover" />
                  <div>
                    <div className="font-bold text-slate-900 dark:text-white">{t.name}</div>
                    <div className="text-sm text-gray-500">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-white dark:bg-dark-card">
        <div className="container mx-auto px-4 md:px-6">
            <div className="bg-primary rounded-[3rem] p-12 md:p-24 text-center text-white relative overflow-hidden shadow-2xl shadow-primary/20 mx-auto max-w-6xl">
                <div className="relative z-10 max-w-3xl mx-auto">
                <h2 className="text-4xl md:text-6xl font-bold mb-8 tracking-tight">Ready to scale your business?</h2>
                <p className="text-white/90 text-xl mb-12 font-light">
                    Join hundreds of successful companies that trust Optimantix for their digital needs.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-6">
                    <Link 
                    to="/contact"
                    className="bg-white text-primary hover:bg-gray-50 font-bold py-4 px-10 rounded-full transition inline-block shadow-xl text-lg"
                    >
                    Request Free Quote
                    </Link>
                    <a href="tel:+919910343016" className="border-2 border-white hover:bg-white/10 text-white font-bold py-4 px-10 rounded-full transition inline-block text-lg">
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
