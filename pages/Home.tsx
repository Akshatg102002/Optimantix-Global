
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, Star, TrendingUp, Users, ShieldCheck, Clock, Plus, Minus, ChevronDown, BarChart, Zap, Globe } from 'lucide-react';
import { useData } from '../context/DataContext';
import { LeadModal } from '../components/LeadModal';
import { SEO } from '../components/SEO';
import { PortfolioSlider } from '../components/PortfolioSlider';
import { TESTIMONIALS, WORK_PROCESS, INDUSTRIES } from '../constants';
import { motion, AnimatePresence } from 'framer-motion';

const PARTNERS = [
  { name: "Google", color: "#4285F4" },
  { name: "Amazon", color: "#FF9900" },
  { name: "Shopify", color: "#96BF48" },
  { name: "Meta", color: "#0668E1" },
  { name: "Microsoft", color: "#F25022" },
  { name: "HubSpot", color: "#FF7A59" },
  { name: "Salesforce", color: "#00A1E0" },
  { name: "Adobe", color: "#FF0000" },
];

const FAQS = [
  {
    question: "How long does it take to see results from SEO?",
    answer: "SEO is a long-term strategy. Typically, noticeable improvements in ranking and traffic can be seen within 3 to 6 months, depending on the competitiveness of your industry and the current state of your website."
  },
  {
    question: "Do you offer custom development solutions?",
    answer: "Yes, absolutely. We specialize in custom web and mobile app development tailored to your specific business requirements, rather than relying solely on templates."
  },
  {
    question: "What platforms do you support for Marketplace Management?",
    answer: "We provide end-to-end management for major platforms including Amazon (Global), Flipkart, Meesho, Nykaa, Blinkit, and Zepto."
  },
  {
    question: "How do you handle project communication?",
    answer: "We believe in transparency. You will be assigned a dedicated project manager and will receive weekly updates via email or Slack. We also schedule bi-weekly review calls."
  }
];

export const Home: React.FC = () => {
  const { services } = useData();
  const MotionDiv = motion.div as any;
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  }

  return (
    <div className="bg-light dark:bg-dark text-slate-900 dark:text-gray-100 transition-colors duration-300">
      <SEO
        title="Home"
        description="Optimantix Global - Driving Growth Through Innovation. Empowering businesses with result-driven strategies in SEO, Marketplace Management, and Web Development."
      />
      <LeadModal />

      {/* Hero Section */}
      <section className="relative pt-12 pb-20 md:pt-20 md:pb-24 overflow-hidden bg-[#020617] text-white rounded-b-[3rem] md:rounded-b-[5rem] shadow-2xl z-10">
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
              <div className="inline-block mb-6 px-4 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 backdrop-blur-md text-blue-300 text-xs md:text-sm font-semibold tracking-wider uppercase">
                🚀 #1 Digital Transformation Agency
              </div>
              <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-8 tracking-tight">
                Driving Growth Through <br />
                <span className="text-primary bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600">Innovation</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 mb-10 font-light leading-relaxed max-w-3xl mx-auto">
                Optimantix Global empowers businesses with result-driven strategies in SEO, Marketplace Management, and Web Development.
              </p>

              <div className="flex flex-col sm:flex-row justify-center gap-4 mb-20">
                <Link
                  to="/contact"
                  className="bg-primary hover:bg-secondary text-white font-bold py-4 px-10 rounded-full transition shadow-[0_0_20px_rgba(0,86,179,0.4)] flex items-center justify-center gap-2 hover:scale-105 active:scale-95 duration-200"
                >
                  Get Started <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  to="/services"
                  className="bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 text-white font-medium py-4 px-10 rounded-full transition hover:scale-105 active:scale-95 duration-200"
                >
                  View Solutions
                </Link>
              </div>

              {/* Stats Grid inside Hero */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
                <div className="bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-2xl hover:bg-white/10 transition duration-300">
                  <BarChart className="w-8 h-8 text-blue-400 mb-3 mx-auto" />
                  <h3 className="text-3xl font-bold text-white mb-1">90%</h3>
                  <p className="text-xs text-gray-400 uppercase tracking-widest font-semibold">Lead Growth</p>
                </div>
                <div className="bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-2xl hover:bg-white/10 transition duration-300">
                  <Zap className="w-8 h-8 text-yellow-400 mb-3 mx-auto" />
                  <h3 className="text-3xl font-bold text-white mb-1">167%</h3>
                  <p className="text-xs text-gray-400 uppercase tracking-widest font-semibold">Traffic Boost</p>
                </div>
                <div className="bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-2xl hover:bg-white/10 transition duration-300">
                  <Users className="w-8 h-8 text-green-400 mb-3 mx-auto" />
                  <h3 className="text-3xl font-bold text-white mb-1">500+</h3>
                  <p className="text-xs text-gray-400 uppercase tracking-widest font-semibold">Happy Clients</p>
                </div>
                <div className="bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-2xl hover:bg-white/10 transition duration-300">
                  <Globe className="w-8 h-8 text-purple-400 mb-3 mx-auto" />
                  <h3 className="text-3xl font-bold text-white mb-1">10+</h3>
                  <p className="text-xs text-gray-400 uppercase tracking-widest font-semibold">Countries Served</p>
                </div>
              </div>
            </MotionDiv>
          </div>
        </div>
      </section>

      {/* Partner Marquee Section - Moved up slightly */}
      <section className="py-12 bg-transparent overflow-hidden">
        <div className="container mx-auto px-4 mb-8 text-center">
          <p className="text-sm font-semibold text-gray-400 uppercase tracking-widest">Our Technology Partners</p>
        </div>
        <div className="relative flex overflow-x-hidden">
          <MotionDiv
            className="flex gap-16 min-w-max items-center"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ repeat: Infinity, ease: "linear", duration: 30 }}
          >
            {[...PARTNERS, ...PARTNERS, ...PARTNERS].map((partner, idx) => (
              <div key={idx} className="flex items-center gap-2 text-2xl font-bold text-gray-400 dark:text-gray-600 grayscale hover:grayscale-0 transition-all duration-300 cursor-default opacity-60 hover:opacity-100">
                <span style={{ fontFamily: 'sans-serif' }}>{partner.name}</span>
              </div>
            ))}
          </MotionDiv>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-12 bg-white dark:bg-dark-card border-t border-b border-gray-100 dark:border-gray-800">
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
                className="group bg-gray-50 dark:bg-[#151515] hover:bg-white dark:hover:bg-[#1a1a1a] rounded-3xl p-8 transition-all duration-300 border border-gray-200 dark:border-gray-800 hover:shadow-2xl hover:border-primary/30 flex flex-col h-full"
              >
                <div className="text-xs font-bold text-primary uppercase mb-4 tracking-wider flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-primary"></span> Solution 0{index + 1}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{service.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6 flex-grow">{service.shortDescription}</p>
                <Link
                  to={`/services/${service.slug}`}
                  className="mt-auto inline-flex items-center text-gray-900 dark:text-white font-bold hover:text-primary transition-colors group-hover:translate-x-1 duration-200"
                >
                  Learn more <ArrowRight size={18} className="ml-2" />
                </Link>
              </MotionDiv>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/services" className="inline-flex items-center justify-center px-8 py-4 font-bold rounded-full bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white hover:bg-primary hover:text-white transition-all duration-300">
              View All Solutions <ArrowRight size={18} className="ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section - Modern Grid */}
      <section className="py-24 bg-gray-50 dark:bg-[#0a0a0a]">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row gap-16 items-center mb-16">
            <div className="md:w-1/2">
              <span className="text-secondary dark:text-primary font-bold uppercase tracking-wider text-sm mb-2 block">Why Choose Us</span>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">We don't just deliver.<br /> We outperform.</h2>
              <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
                In a sea of agencies, Optimantix stands out by blending creative innovation with hard data. We build systems that scale as you grow.
              </p>
            </div>
            <div className="md:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-white dark:bg-dark-card p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 hover:border-primary/50 transition-colors">
                <TrendingUp className="text-primary mb-4" size={32} />
                <h3 className="font-bold text-lg mb-2 dark:text-white">Data-Driven</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Every decision is backed by analytics and A/B testing.</p>
              </div>
              <div className="bg-white dark:bg-dark-card p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 hover:border-primary/50 transition-colors">
                <Users className="text-primary mb-4" size={32} />
                <h3 className="font-bold text-lg mb-2 dark:text-white">Dedicated Team</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Direct access to project managers and developers.</p>
              </div>
              <div className="bg-white dark:bg-dark-card p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 hover:border-primary/50 transition-colors">
                <ShieldCheck className="text-primary mb-4" size={32} />
                <h3 className="font-bold text-lg mb-2 dark:text-white">Enterprise Security</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Bank-grade security protocols for all web assets.</p>
              </div>
              <div className="bg-white dark:bg-dark-card p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 hover:border-primary/50 transition-colors">
                <Clock className="text-primary mb-4" size={32} />
                <h3 className="font-bold text-lg mb-2 dark:text-white">Fast Turnaround</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Agile sprints ensure we launch faster than the competition.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <PortfolioSlider />

      {/* Process Section */}
      <section className="py-24 bg-white dark:bg-dark-card">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1 relative">
              <div className="absolute inset-0 bg-primary/10 rounded-3xl transform -rotate-3 scale-105"></div>
              <img
                src="https://images.unsplash.com/photo-1762341114530-a0c54d8cc18b?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Team working"
                className="relative rounded-3xl shadow-2xl w-full h-auto object-cover border border-gray-200 dark:border-gray-700"
              />
            </div>
            <div className="order-1 lg:order-2">
              <span className="text-secondary dark:text-primary font-bold uppercase tracking-wider text-sm mb-2 block">How We Work</span>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">Our Proven Process</h2>
              <p className="text-gray-600 dark:text-gray-400 text-lg mb-8 leading-relaxed">
                We follow a structured approach to ensure every project delivers measurable results and exceeds expectations.
              </p>

              <div className="space-y-6">
                {WORK_PROCESS.map((step, idx) => (
                  <div key={idx} className="flex gap-4 group">
                    <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-gray-100 dark:bg-gray-800 group-hover:bg-primary text-gray-500 group-hover:text-white flex items-center justify-center font-bold text-lg shadow-sm transition-colors duration-300">
                      {idx + 1}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1 group-hover:text-primary transition-colors">{step.title}</h3>
                      <p className="text-gray-600 dark:text-gray-400">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Industries */}
      <section className="py-20 bg-gray-50 dark:bg-[#0a0a0a]">
        <div className="container mx-auto px-4 text-center">
          <p className="text-center text-sm font-semibold text-gray-400 uppercase tracking-widest mb-10">Trusted Across Industries</p>
          <div className="flex flex-wrap justify-center gap-4">
            {INDUSTRIES.map((industry, idx) => (
              <span key={idx} className="px-6 py-3 bg-white dark:bg-dark-card rounded-full text-gray-700 dark:text-gray-300 text-sm border border-gray-200 dark:border-gray-800 hover:border-primary hover:text-primary transition-colors cursor-default shadow-sm">
                {industry}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      {/* <section className="py-24 bg-white dark:bg-dark-card">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
             <span className="text-primary font-bold uppercase tracking-wider text-sm mb-2 block">Testimonials</span>
            <h2 className="text-3xl md:text-5xl font-bold mt-2 text-gray-900 dark:text-white">What Our Clients Say</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((t, idx) => (
              <div key={idx} className="bg-gray-50 dark:bg-[#111] p-10 rounded-3xl border border-gray-100 dark:border-gray-800 relative hover:shadow-xl transition-shadow">
                <div className="text-primary mb-6"><Star className="fill-current" size={24} /></div>
                <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed italic mb-8">"{t.content}"</p>
                <div className="flex items-center gap-4 border-t border-gray-200 dark:border-gray-700 pt-6">
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
      </section> */}

      {/* FAQ Section */}
      <section className="py-24 bg-gray-50 dark:bg-[#0a0a0a]">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <div className="text-center mb-16">
            <span className="text-primary font-bold uppercase tracking-wider text-sm mb-2 block">FAQ</span>
            <h2 className="text-3xl md:text-5xl font-bold mt-2 text-gray-900 dark:text-white">Common Questions</h2>
          </div>

          <div className="space-y-4">
            {FAQS.map((faq, idx) => (
              <div key={idx} className="bg-white dark:bg-dark-card rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden">
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full flex items-center justify-between p-6 text-left font-bold text-lg text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                >
                  {faq.question}
                  <span className={`p-2 rounded-full bg-gray-100 dark:bg-gray-800 transition-transform duration-300 ${openFaqIndex === idx ? 'rotate-180' : ''}`}>
                    <ChevronDown size={20} className="text-primary" />
                  </span>
                </button>
                <AnimatePresence>
                  {openFaqIndex === idx && (
                    <MotionDiv
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="p-6 pt-0 text-gray-600 dark:text-gray-400 leading-relaxed border-t border-gray-100 dark:border-gray-800">
                        {faq.answer}
                      </div>
                    </MotionDiv>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Client Section */}
      <section className="py-12 md:py-16 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-8 md:mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Trusted by Leading Brands
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Join hundreds of companies that trust us to drive their digital transformation
              </p>
            </motion.div>
          </div>

          {/* Client Logos Grid */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 items-center"
          >
            {[
              { id: '1', name: 'Client 1' },
              { id: '2', name: 'Client 2' },
              { id: '3', name: 'Client 3' },
              { id: '4', name: 'Client 4' },
              { id: '5', name: 'Client 5' },
              { id: '6', name: 'Client 6' },
              { id: '7', name: 'Client 7' },
              { id: '8', name: 'Client 8' },
            ].map((client, index) => (
              <motion.div
                key={client.id}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="flex items-center justify-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 group"
              >
                <div className="w-full h-16 flex items-center justify-center">
                  {/* Placeholder - Replace with actual logo images */}
                  <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 rounded-lg flex items-center justify-center group-hover:from-primary/20 group-hover:to-primary/10 transition-all duration-300">
                    <span className="text-xs font-semibold text-gray-600 dark:text-gray-300 group-hover:text-primary transition-colors">
                      {client.name}
                    </span>
                  </div>
                  {/* Uncomment when you have logos:
            <img 
              src={`/clients/${client.id}.png`}
              alt={client.name}
              className="w-full h-full object-contain filter grayscale hover:grayscale-0 opacity-60 hover:opacity-100 transition-all duration-300"
            />
            */}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      

      {/* Final CTA */}
      <section className="py-12 bg-white dark:bg-dark-card">
        <div className="container mx-auto px-4 md:px-6">
          <div className="bg-primary rounded-[3rem] p-12 md:p-24 text-center text-white relative overflow-hidden shadow-2xl shadow-primary/20 mx-auto max-w-6xl">
            {/* Abstract Shapes */}
            <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-black/20 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>

            <div className="relative z-10 max-w-3xl mx-auto">
              <h2 className="text-4xl md:text-6xl font-bold mb-8 tracking-tight">Ready to scale your business?</h2>
              <p className="text-white/90 text-xl mb-12 font-light">
                Join hundreds of successful companies that trust Optimantix for their digital needs.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-6">
                <Link
                  to="/contact"
                  className="bg-white text-primary hover:bg-gray-50 font-bold py-4 px-10 rounded-full transition inline-block shadow-xl text-lg hover:scale-105 duration-200"
                >
                  Request Free Quote
                </Link>
                <a href="tel:+919910343016" className="border-2 border-white hover:bg-white/10 text-white font-bold py-4 px-10 rounded-full transition inline-block text-lg hover:scale-105 duration-200">
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
