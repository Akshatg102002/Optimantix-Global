import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2, Star, ChevronDown, ChevronUp, Users, Trophy, Globe, Zap, Target, Lightbulb, TrendingUp } from 'lucide-react';
import { useData } from '../context/DataContext';
import { Icon } from '../components/Icon';
import { ContactForm } from '../components/ContactForm';
import { LeadModal } from '../components/LeadModal';
import { TESTIMONIALS, STATS, WORK_PROCESS, INDUSTRIES } from '../constants';

export const Home: React.FC = () => {
  const { services } = useData();
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  return (
    <div id="top" className="overflow-x-hidden bg-light dark:bg-dark text-slate-900 dark:text-gray-100 transition-colors duration-300">
      <LeadModal />
      
      {/* Hero Section */}
      <section className="relative pt-24 pb-16 lg:pt-32 lg:pb-20 overflow-hidden">
        {/* Abstract Background Shapes */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/10 to-transparent dark:from-primary/5 -z-10 rounded-l-[100px] transform skew-x-12"></div>
        
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div 
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="max-w-2xl"
            >
              <motion.div variants={fadeInUp} className="inline-block bg-white dark:bg-white/10 text-secondary dark:text-primary px-4 py-1.5 rounded-full text-sm font-semibold mb-6 border border-indigo-100 dark:border-white/10 shadow-sm">
                🚀 Elevate Your Digital Presence
              </motion.div>
              <motion.h1 variants={fadeInUp} className="text-4xl lg:text-7xl font-extrabold leading-[1.1] mb-6">
                Driving Growth Through <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Innovation</span>
              </motion.h1>
              <motion.p variants={fadeInUp} className="text-lg text-slate-600 dark:text-gray-400 mb-8 leading-relaxed">
                Optimantix Global empowers businesses with result-driven strategies in SEO, Marketplace Management, and Web Development. We don't just deliver services; we deliver measurable success.
              </motion.p>
              <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4">
                <Link 
                  to="/services" 
                  className="bg-primary hover:bg-red-500 text-white font-bold py-4 px-8 rounded-full transition shadow-lg shadow-red-200 dark:shadow-none text-center flex items-center justify-center gap-2 group"
                >
                  Our Services <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link 
                  to="/contact" 
                  className="bg-transparent text-slate-700 dark:text-white hover:text-primary dark:hover:text-primary border-2 border-slate-200 dark:border-gray-700 hover:border-primary dark:hover:border-primary font-bold py-4 px-8 rounded-full transition text-center"
                >
                  Get a Free Audit
                </Link>
              </motion.div>
              
              <motion.div variants={fadeInUp} className="mt-10 flex items-center gap-4 text-sm text-slate-500 dark:text-gray-400">
                <div className="flex -space-x-3">
                   {[1,2,3,4].map(i => (
                     <div key={i} className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-700 border-2 border-white dark:border-dark flex items-center justify-center overflow-hidden">
                       <img src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="User" />
                     </div>
                   ))}
                </div>
                <div>
                  <div className="flex text-yellow-400"><Star size={12} fill="currentColor"/><Star size={12} fill="currentColor"/><Star size={12} fill="currentColor"/><Star size={12} fill="currentColor"/><Star size={12} fill="currentColor"/></div>
                  <p>Trusted by <span className="font-bold text-slate-900 dark:text-white">500+</span> Brands</p>
                </div>
              </motion.div>
            </motion.div>

            {/* Right Image */}
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
               <div className="relative rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white dark:border-gray-800">
                  <img 
                    src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=800"
                    alt="Team Brainstorming" 
                    className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-6 left-6 text-white">
                     <p className="font-bold text-xl">Client-First Philosophy</p>
                     <p className="text-sm opacity-90">Your goals are our blueprint.</p>
                  </div>
               </div>
               
               {/* Floating Stats Card */}
               <motion.div 
                 initial={{ y: 20, opacity: 0 }}
                 animate={{ y: 0, opacity: 1 }}
                 transition={{ delay: 0.6, duration: 0.6 }}
                 className="absolute -bottom-10 -right-6 md:right-10 bg-white dark:bg-dark-card p-6 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 max-w-xs"
               >
                  <div className="flex items-center gap-4">
                     <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-full text-green-600 dark:text-green-400">
                       <TrendingUp size={28} />
                     </div>
                     <div>
                       <div className="font-bold text-3xl text-slate-900 dark:text-white">90%</div>
                       <div className="text-xs text-slate-500 dark:text-gray-400 uppercase tracking-wide">Avg Lead Growth</div>
                     </div>
                  </div>
               </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="py-12 bg-white dark:bg-dark-card border-y border-gray-100 dark:border-gray-800">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {STATS.map((stat, idx) => (
              <div key={idx} className="text-center group">
                <div className="inline-flex p-3 rounded-full bg-slate-50 dark:bg-slate-800 text-primary mb-3 group-hover:scale-110 transition-transform">
                  <stat.icon size={24} />
                </div>
                <div className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white mb-1">{stat.value}</div>
                <div className="text-sm text-gray-500 dark:text-gray-400 uppercase tracking-wider font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section - Brief */}
      <section className="py-20 bg-light dark:bg-dark">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
             <span className="text-primary font-bold uppercase tracking-wider text-sm">About Us</span>
             <h2 className="text-3xl md:text-4xl font-extrabold mt-2 mb-4">Empowering Digital Transformation</h2>
             <p className="text-gray-600 dark:text-gray-400 mb-8">Optimantix Global envisions becoming a global leader by helping brands adapt, compete, and thrive in the ever-changing digital landscape.</p>
             <Link to="/about" className="text-primary font-bold hover:underline flex items-center justify-center gap-2">Read More About Us <ArrowRight size={16}/></Link>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-white dark:bg-dark-card">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div className="max-w-2xl">
              <span className="text-primary font-bold uppercase tracking-wider text-sm">Our Expertise</span>
              <h2 className="text-3xl md:text-4xl font-extrabold mt-2">Comprehensive Digital Solutions</h2>
            </div>
            <Link to="/services" className="hidden md:flex items-center gap-2 text-secondary dark:text-primary font-bold hover:underline">
              View All Services <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.slice(0, 3).map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-8 hover:bg-white dark:hover:bg-slate-800 hover:shadow-xl dark:hover:shadow-2xl hover:shadow-indigo-100/50 dark:hover:shadow-none transition-all duration-300 border border-transparent hover:border-gray-100 dark:hover:border-gray-700 relative overflow-hidden"
              >
                <div className="w-14 h-14 bg-white dark:bg-slate-700 text-primary rounded-xl flex items-center justify-center mb-6 shadow-sm group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                  <Icon name={service.iconName} size={28} />
                </div>
                
                <h3 className="text-xl font-bold mb-3 group-hover:text-secondary dark:group-hover:text-primary transition-colors">{service.title}</h3>
                <p className="text-slate-600 dark:text-gray-400 mb-6 line-clamp-3 leading-relaxed">{service.shortDescription}</p>
                
                <Link 
                  to={`/services/${service.slug}`} 
                  className="inline-flex items-center text-slate-800 dark:text-white font-bold hover:text-primary transition"
                >
                  Learn More <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            ))}
          </div>
          <div className="mt-8 text-center md:hidden">
             <Link to="/services" className="bg-white border border-gray-300 dark:bg-transparent dark:border-gray-600 px-6 py-3 rounded-full inline-block">View All Services</Link>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-light dark:bg-dark relative overflow-hidden">
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="text-center mb-16">
            <span className="text-secondary dark:text-primary font-bold uppercase tracking-wider text-sm">How We Work</span>
            <h2 className="text-3xl md:text-4xl font-extrabold mt-2">Our Proven Process</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
             {/* Connector Line (Desktop) */}
             <div className="hidden lg:block absolute top-8 left-0 w-full h-1 bg-gray-200 dark:bg-gray-800 -z-10"></div>

             {WORK_PROCESS.map((step, idx) => (
               <div key={idx} className="relative pt-8">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 lg:left-8 lg:translate-x-0 w-16 h-16 bg-white dark:bg-dark-card border-4 border-light dark:border-dark rounded-full flex items-center justify-center font-bold text-xl text-primary shadow-sm z-10">
                    0{idx + 1}
                  </div>
                  <div className="bg-white dark:bg-dark-card p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 h-full mt-4 hover:-translate-y-2 transition-transform duration-300">
                    <h3 className="font-bold text-lg mb-2 mt-4 text-center lg:text-left">{step.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 text-center lg:text-left leading-relaxed">
                      {step.description}
                    </p>
                  </div>
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* Industries Served */}
      <section className="py-16 bg-white dark:bg-dark-card">
         <div className="container mx-auto px-4">
            <p className="text-center text-sm font-semibold text-gray-400 uppercase tracking-widest mb-8">Industries We Serve</p>
            <div className="flex flex-wrap justify-center gap-4">
              {INDUSTRIES.map((industry, idx) => (
                <span key={idx} className="px-6 py-3 bg-gray-50 dark:bg-gray-800 rounded-full text-gray-700 dark:text-gray-300 font-medium text-sm border border-gray-100 dark:border-gray-700 hover:border-primary hover:text-primary transition-colors cursor-default">
                  {industry}
                </span>
              ))}
            </div>
         </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-light dark:bg-dark">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <span className="text-primary font-bold uppercase tracking-wider text-sm">Testimonials</span>
            <h2 className="text-3xl md:text-4xl font-extrabold mt-2">What Our Clients Say</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((t, idx) => (
              <div key={idx} className="bg-white dark:bg-dark-card p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 hover:shadow-lg transition-shadow relative">
                <div className="text-6xl text-indigo-100 dark:text-gray-800 absolute top-4 right-6 font-serif">"</div>
                <p className="text-gray-600 dark:text-gray-300 italic leading-relaxed mb-6 relative z-10">{t.content}</p>
                <div className="flex items-center gap-4">
                  <img src={t.image} alt={t.name} className="w-12 h-12 rounded-full object-cover ring-2 ring-primary/20" />
                  <div>
                    <div className="font-bold text-slate-900 dark:text-white">{t.name}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white dark:bg-dark-card">
        <div className="container mx-auto px-4 md:px-6">
          <div className="bg-gradient-to-r from-secondary to-indigo-900 rounded-3xl p-8 md:p-16 text-center text-white relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
            <div className="relative z-10 max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-5xl font-bold mb-6">Ready to scale your business?</h2>
              <p className="text-indigo-200 text-lg mb-10">
                Join hundreds of successful companies that trust Optimantix for their digital needs. Let's discuss your next big project.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                 <Link 
                   to="/contact"
                   className="bg-primary hover:bg-red-500 text-white font-bold py-4 px-10 rounded-full transition shadow-lg shadow-primary/30 inline-block"
                 >
                   Get Your Free Quote
                 </Link>
                 <a href="tel:+919910343016" className="bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/30 text-white font-bold py-4 px-10 rounded-full transition inline-block">
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