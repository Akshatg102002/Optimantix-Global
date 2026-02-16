
import React, { useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useData } from '../context/DataContext';
import { LeadModal } from '../components/LeadModal';
import { SEO } from '../components/SEO';
import { PortfolioSlider } from '../components/PortfolioSlider';
import { TESTIMONIALS, WORK_PROCESS, INDUSTRIES } from '../constants';

// GSAP Imports
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

export const Home: React.FC = () => {
  const { services } = useData();
  const location = useLocation();
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  useGSAP(() => {
    // Hero Text Stagger Animation
    const tl = gsap.timeline();
    
    tl.from(".hero-title-line", {
      y: 100,
      opacity: 0,
      duration: 1,
      stagger: 0.15,
      ease: "power4.out",
      delay: 0.2
    })
    .from(".hero-desc", {
      y: 20,
      opacity: 0,
      duration: 0.8,
      ease: "power2.out"
    }, "-=0.5")
    .from(".hero-btn", {
      y: 20,
      opacity: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: "power2.out"
    }, "-=0.6");

    // Background Parallax for Hero
    gsap.to(".hero-bg-img", {
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true
      },
      yPercent: 30,
      scale: 1.1,
      ease: "none"
    });

  }, { scope: containerRef });

  return (
    <div ref={containerRef} id="top" className="bg-light dark:bg-dark text-slate-900 dark:text-gray-100 transition-colors duration-300">
      <SEO 
        title="Home" 
        description="Optimantix Global - Driving Growth Through Innovation. Empowering businesses with result-driven strategies in SEO, Marketplace Management, and Web Development."
      />
      <LeadModal />
      
      {/* 
        STACKING PANELS ARCHITECTURE 
        Each section is sticky top-0 and at least 100vh.
        The z-index and solid backgrounds create the "card stacking" effect.
      */}

      {/* PANEL 1: HERO SECTION */}
      <section ref={heroRef} className="sticky top-0 z-0 h-screen min-h-[700px] w-full flex items-center justify-center overflow-hidden bg-[#020617] text-white">
        
        {/* Animated Background */}
        <div className="absolute inset-0 w-full h-full pointer-events-none">
           <img 
             src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=2000" 
             alt="Digital Universe"
             className="hero-bg-img w-full h-full object-cover opacity-30"
           />
           {/* Gradient Overlays for Depth */}
           <div className="absolute inset-0 bg-gradient-to-b from-[#020617]/50 via-transparent to-[#020617]"></div>
           <div className="absolute inset-0 bg-gradient-to-r from-[#020617] via-transparent to-transparent"></div>
           
           {/* Glowing Orb Effect */}
           <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[100px] animate-pulse"></div>
        </div>

        <div className="container relative z-10 px-4 md:px-6">
          <div className="max-w-5xl">
            <h1 className="text-6xl md:text-8xl font-bold leading-[1.05] mb-8 tracking-tight text-white mix-blend-overlay">
              <div className="overflow-hidden"><span className="hero-title-line block">Driving</span></div>
              <div className="overflow-hidden"><span className="hero-title-line block">Growth</span></div>
              <div className="overflow-hidden"><span className="hero-title-line block">Through</span></div>
              <div className="overflow-hidden"><span className="hero-title-line block text-primary">Innovation</span></div>
            </h1>
            
            <p className="hero-desc text-lg md:text-2xl text-gray-300 mb-12 max-w-2xl font-light leading-relaxed border-l-4 border-primary pl-6">
              Optimantix Global empowers businesses with result-driven strategies in SEO, Marketplace Management, and Web Development. We don't just deliver services; we deliver measurable success.
            </p>
            
            <div className="flex flex-wrap gap-4 mb-20">
              <Link 
                to="/contact" 
                className="hero-btn bg-white text-dark hover:bg-gray-100 font-bold py-4 px-10 rounded-full transition shadow-xl shadow-white/10 text-center flex items-center gap-2 group"
              >
                Get consultation <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <button 
                onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
                className="hero-btn bg-transparent border border-gray-600 hover:border-white text-white font-medium py-4 px-10 rounded-full transition text-center"
              >
                Explore Services
              </button>
            </div>

            {/* Stats Row */}
            <div className="hero-btn grid grid-cols-2 md:grid-cols-4 gap-8 pt-8 border-t border-white/10">
               <div>
                  <div className="text-3xl md:text-4xl font-bold mb-1 text-white">120+</div>
                  <div className="text-gray-400 text-sm font-medium">Projects delivered</div>
               </div>
               <div>
                  <div className="text-3xl md:text-4xl font-bold mb-1 text-white">50+</div>
                  <div className="text-gray-400 text-sm font-medium">Active clients</div>
               </div>
               <div>
                  <div className="text-3xl md:text-4xl font-bold mb-1 text-white">5+</div>
                  <div className="text-gray-400 text-sm font-medium">Years experience</div>
               </div>
               <div>
                  <div className="text-3xl md:text-4xl font-bold mb-1 text-white">Global</div>
                  <div className="text-gray-400 text-sm font-medium">Client Base</div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* PANEL 2: SERVICES SECTION */}
      <section className="sticky top-0 z-10 min-h-screen w-full flex items-center bg-[#0f172a] shadow-[0_-10px_40px_rgba(0,0,0,0.5)] py-20 overflow-y-auto">
        <div className="container">
          <div className="mb-12 text-center md:text-left">
            <span className="text-primary font-bold tracking-widest uppercase text-sm mb-2 block">Our Expertise</span>
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-4 tracking-tight">Enterprise solutions <br/> for modern growth</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 pb-20">
            {/* Map services to large cards */}
            {services.slice(0, 4).map((service, index) => (
              <div
                key={service.id}
                className="group relative bg-[#1e293b] hover:bg-[#253248] rounded-3xl p-8 md:p-12 transition-all duration-300 min-h-[350px] flex flex-col justify-between overflow-hidden border border-gray-700/50 hover:border-primary/50 shadow-2xl"
              >
                 {/* Card Content */}
                 <div className="relative z-10">
                    <div className="text-primary text-xs font-bold uppercase tracking-wider mb-4 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-primary"></span> Core Service
                    </div>
                    <h3 className="text-2xl md:text-4xl font-bold text-white mb-4">{service.title}</h3>
                    <p className="text-gray-400 leading-relaxed mb-6 text-lg">{service.shortDescription}</p>
                 </div>

                 <div className="relative z-10 pt-8 flex justify-between items-end">
                    <Link 
                      to={`/services/${service.slug}`}
                      className="inline-flex items-center text-white font-semibold hover:text-primary transition-colors group-hover:translate-x-1 duration-300"
                    >
                      Learn more <ArrowRight size={20} className="ml-2" />
                    </Link>
                    <div className="text-8xl font-bold text-white/5 absolute -bottom-4 -right-4 group-hover:scale-110 transition-transform duration-500">
                        0{index + 1}
                    </div>
                 </div>
              </div>
            ))}
          </div>
          
          <div className="text-center pb-8">
             <Link to="/services" className="inline-flex items-center justify-center px-10 py-5 text-lg font-bold text-white bg-primary rounded-full hover:bg-secondary transition shadow-lg shadow-blue-500/20">
               View All Solutions <ArrowRight size={20} className="ml-2" />
             </Link>
          </div>
        </div>
      </section>

      {/* PANEL 3: PROCESS & INDUSTRIES */}
      <section className="sticky top-0 z-20 min-h-screen w-full flex flex-col justify-center bg-[#f8fafc] dark:bg-[#121212] shadow-[0_-10px_40px_rgba(0,0,0,0.2)] py-20 overflow-y-auto">
         {/* Portfolio Slider (Included here naturally) */}
        <div id="portfolio" className="mb-20">
            <PortfolioSlider />
        </div>

        <div className="container relative z-10">
          <div className="text-center mb-16">
            <span className="text-secondary dark:text-primary font-bold uppercase tracking-wider text-sm">How We Work</span>
            <h2 className="text-4xl md:text-5xl font-bold mt-2 text-gray-900 dark:text-white">Our Proven Process</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative mb-24">
             {WORK_PROCESS.map((step, idx) => (
               <div key={idx} className="relative group p-6 bg-white dark:bg-dark-card rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-xl transition-all duration-300">
                  <div className="text-5xl font-black text-gray-100 dark:text-gray-800 mb-4 absolute top-4 right-4">0{idx + 1}</div>
                  <h3 className="font-bold text-xl mb-3 text-gray-900 dark:text-white relative z-10">{step.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed relative z-10">
                    {step.description}
                  </p>
               </div>
             ))}
          </div>
          
          {/* Industries */}
           <div className="bg-white dark:bg-dark-card rounded-3xl p-10 border border-gray-200 dark:border-gray-800">
                <p className="text-center text-sm font-semibold text-gray-400 uppercase tracking-widest mb-10">Industries We Serve</p>
                <div className="flex flex-wrap justify-center gap-3">
                {INDUSTRIES.map((industry, idx) => (
                    <span key={idx} className="px-6 py-3 bg-gray-50 dark:bg-[#111] rounded-full text-gray-700 dark:text-gray-300 text-sm border border-gray-100 dark:border-gray-800 hover:border-primary hover:text-primary transition-colors cursor-default">
                    {industry}
                    </span>
                ))}
                </div>
            </div>
        </div>
      </section>

      {/* PANEL 4: TESTIMONIALS & CTA */}
      <section className="sticky top-0 z-30 min-h-screen w-full flex flex-col justify-center bg-white dark:bg-[#000000] shadow-[0_-10px_40px_rgba(0,0,0,0.2)] py-20 overflow-y-auto">
        <div className="container">
          <div className="text-center mb-16">
             <span className="text-primary font-bold uppercase tracking-wider text-sm mb-2 block">Testimonials</span>
            <h2 className="text-3xl md:text-5xl font-bold mt-2 text-gray-900 dark:text-white">What Our Clients Say</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
            {TESTIMONIALS.map((t, idx) => (
              <div key={idx} className="bg-gray-50 dark:bg-[#0a0a0a] p-10 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-900 relative group hover:border-primary/50 transition-colors">
                <div className="flex items-center gap-4 mb-6">
                  <img src={t.image} alt={t.name} className="w-14 h-14 rounded-full object-cover grayscale group-hover:grayscale-0 transition-all opacity-80 group-hover:opacity-100" />
                  <div>
                    <div className="font-bold text-slate-900 dark:text-white text-lg">{t.name}</div>
                    <div className="text-sm text-gray-500">{t.role}</div>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed italic">"{t.content}"</p>
              </div>
            ))}
          </div>

          {/* Final CTA */}
          <div className="bg-primary rounded-[3rem] p-12 md:p-24 text-center text-white relative overflow-hidden shadow-2xl shadow-primary/20 mx-auto max-w-6xl">
             {/* Decorative Circles */}
             <div className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-[80px] -translate-x-1/2 -translate-y-1/2"></div>
             <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-[80px] translate-x-1/2 translate-y-1/2"></div>
            
            <div className="relative z-10 max-w-3xl mx-auto">
              <h2 className="text-4xl md:text-6xl font-bold mb-8 tracking-tight">Ready to scale your business?</h2>
              <p className="text-white/90 text-xl mb-12 font-light">
                Join hundreds of successful companies that trust Optimantix for their digital needs.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-6">
                 <Link 
                   to="/contact"
                   className="bg-white text-primary hover:bg-gray-50 font-bold py-5 px-12 rounded-full transition inline-block shadow-xl text-lg"
                 >
                   Request Free Quote
                 </Link>
                 <a href="tel:+919910343016" className="border-2 border-white hover:bg-white/10 text-white font-bold py-5 px-12 rounded-full transition inline-block text-lg">
                   Call Us Now
                 </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer is below this because it's not sticky, so it will scroll into view naturally at the end */}
    </div>
  );
};
