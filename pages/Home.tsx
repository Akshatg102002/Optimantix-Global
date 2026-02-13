import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2, Star, ChevronDown, ChevronUp, Users, Trophy, Globe, Zap } from 'lucide-react';
import { useData } from '../context/DataContext';
import { Icon } from '../components/Icon';
import { ContactForm } from '../components/ContactForm';

// Mock Data for Landing Page
const PARTNERS = [
  "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/2560px-Google_2015_logo.svg.png",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/2560px-Amazon_logo.svg.png",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/IBM_logo.svg/2560px-IBM_logo.svg.png",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/2048px-Microsoft_logo.svg.png",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Microsoft_logo_%282012%29.svg/1200px-Microsoft_logo_%282012%29.svg.png"
];

const STATS = [
  { label: 'Happy Clients', value: '500+', icon: Users },
  { label: 'Projects Completed', value: '1,200+', icon: Trophy },
  { label: 'Countries Served', value: '25+', icon: Globe },
  { label: 'Growth Generated', value: '300%', icon: Zap },
];

const TESTIMONIALS = [
  {
    name: "Sarah Johnson",
    role: "CEO, TechFlow",
    content: "Optimantix transformed our digital presence. Their development team built a scalable platform that increased our user retention by 40%. Highly professional and result-oriented.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150"
  },
  {
    name: "Michael Chen",
    role: "Marketing Director, RetailPlus",
    content: "The marketplace management service is a game-changer. They handled our Nykaa and Meesho listings flawlessly, leading to a 200% spike in sales within 3 months.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150"
  },
  {
    name: "Emily Davis",
    role: "Founder, Artistry",
    content: "I love the branding they created for us. The logo and packaging design perfectly capture our brand's essence. The team really listens to what you need.",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=150"
  }
];

const FAQS = [
  {
    question: "How do I get started with your services?",
    answer: "Getting started is easy! Simply fill out the contact form below or book a free consultation call. We'll discuss your specific needs and propose a tailored strategy."
  },
  {
    question: "Do you work with small businesses?",
    answer: "Absolutely. We work with businesses of all sizes, from startups to large enterprises. We have scalable packages designed to fit different budgets and goals."
  },
  {
    question: "What is your typical turnaround time for a website?",
    answer: "Turnaround time depends on the complexity of the project. A standard business website usually takes 2-4 weeks, while complex custom applications may take 8-12 weeks."
  },
  {
    question: "Do you offer ongoing support?",
    answer: "Yes, we offer various maintenance and support packages to ensure your digital assets remain secure, up-to-date, and performing optimally after launch."
  }
];

export const Home: React.FC = () => {
  const { services } = useData();
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const location = useLocation();

  // Handle incoming navigation requesting scroll
  useEffect(() => {
    if (location.state && (location.state as any).scrollTo) {
      const sectionId = (location.state as any).scrollTo;
      const element = document.getElementById(sectionId);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    } else {
      // Scroll to top if no specific section is requested (standard navigation)
      window.scrollTo(0, 0);
    }
  }, [location]);

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div id="top" className="overflow-x-hidden">
      {/* Hero Section */}
      <section id="about" className="relative bg-white pt-24 pb-16 lg:pt-32 lg:pb-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="max-w-2xl">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-block bg-indigo-50 text-secondary px-4 py-1.5 rounded-full text-sm font-semibold mb-6 border border-indigo-100"
              >
                🚀 #1 Digital Transformation Agency
              </motion.div>
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-4xl lg:text-6xl font-extrabold text-slate-900 leading-[1.15] mb-6"
              >
                We Build <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Digital Empires</span> That Last.
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-lg text-slate-600 mb-8 leading-relaxed"
              >
                From cutting-edge web development to data-driven marketing strategies, Optimantix provides the comprehensive toolkit your business needs to dominate the global market.
              </motion.p>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <button 
                  onClick={() => scrollTo('services')} 
                  className="bg-primary hover:bg-red-500 text-white font-bold py-4 px-8 rounded-full transition shadow-lg shadow-red-200 text-center flex items-center justify-center gap-2"
                >
                  Explore Services <ArrowRight size={18} />
                </button>
                <button 
                  onClick={() => scrollTo('contact')} 
                  className="bg-white text-slate-700 hover:text-primary border-2 border-slate-200 hover:border-primary font-bold py-4 px-8 rounded-full transition text-center"
                >
                  Talk to an Expert
                </button>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-10 flex items-center gap-4 text-sm text-slate-500"
              >
                <div className="flex -space-x-2">
                   {[1,2,3].map(i => (
                     <div key={i} className="w-8 h-8 rounded-full bg-slate-200 border-2 border-white flex items-center justify-center text-xs font-bold text-slate-600">
                        {i === 3 ? '+' : ''}
                     </div>
                   ))}
                </div>
                <p>Trusted by <span className="font-bold text-slate-900">500+</span> businesses worldwide.</p>
              </motion.div>
            </div>

            {/* Right Image */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="relative lg:h-[600px] w-full"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-secondary to-primary rounded-[40px] opacity-10 rotate-3 transform scale-95"></div>
              <img 
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800"
                alt="Optimantix Team" 
                className="relative w-full h-full object-cover rounded-[40px] shadow-2xl z-10"
              />
              
              {/* Floating Badge */}
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl z-20 max-w-xs border border-gray-100 hidden md:block">
                 <div className="flex items-center gap-4">
                    <div className="bg-green-100 p-3 rounded-full text-green-600">
                      <Trophy size={24} />
                    </div>
                    <div>
                      <div className="font-bold text-slate-900 text-lg">Award Winning</div>
                      <div className="text-sm text-slate-500">Service Excellence 2024</div>
                    </div>
                 </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Partners Strip */}
      <section className="py-10 bg-slate-50 border-y border-slate-100">
        <div className="container mx-auto px-4">
          <p className="text-center text-sm font-semibold text-slate-400 uppercase tracking-widest mb-8">Trusted by industry leaders</p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
             {PARTNERS.map((logo, idx) => (
               <img key={idx} src={logo} alt="Partner" className="h-8 md:h-10 object-contain hover:scale-110 transition-transform" />
             ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-dark text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {STATS.map((stat, idx) => (
              <div key={idx} className="p-6">
                <div className="inline-flex p-3 rounded-xl bg-white/10 text-primary mb-4">
                  <stat.icon size={32} />
                </div>
                <div className="text-4xl md:text-5xl font-bold mb-2">{stat.value}</div>
                <div className="text-gray-400 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section id="services" className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <span className="text-primary font-bold uppercase tracking-wider text-sm">Our Expertise</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mt-2 mb-4">Comprehensive Digital Solutions</h2>
            <p className="text-slate-600 text-lg">
              We combine creativity, technology, and strategy to create digital experiences that drive real business results.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group bg-white rounded-2xl p-8 hover:shadow-2xl transition-all duration-300 border border-slate-100 hover:border-primary/20 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 bg-slate-50 w-32 h-32 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110"></div>
                
                <div className="w-14 h-14 bg-gradient-to-br from-indigo-50 to-white text-primary border border-indigo-100 rounded-xl flex items-center justify-center mb-6 relative z-10 shadow-sm group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                  <Icon name={service.iconName} size={28} />
                </div>
                
                <h3 className="text-xl font-bold text-slate-900 mb-3 relative z-10">{service.title}</h3>
                <p className="text-slate-600 mb-6 line-clamp-2 relative z-10">{service.shortDescription}</p>
                
                <Link 
                  to={`/services/${service.slug}`} 
                  className="inline-flex items-center text-secondary font-bold hover:text-primary transition relative z-10"
                >
                  Learn More <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div className="max-w-2xl">
              <span className="text-secondary font-bold uppercase tracking-wider text-sm">Testimonials</span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mt-2">What Our Clients Say</h2>
            </div>
            <div className="flex gap-2">
              <div className="flex text-yellow-400"><Star fill="currentColor" size={20}/><Star fill="currentColor" size={20}/><Star fill="currentColor" size={20}/><Star fill="currentColor" size={20}/><Star fill="currentColor" size={20}/></div>
              <span className="font-bold text-slate-900">5.0</span>
              <span className="text-slate-500">Based on 150+ Reviews</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((t, idx) => (
              <div key={idx} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-lg transition-shadow">
                <div className="flex items-center gap-4 mb-6">
                  <img src={t.image} alt={t.name} className="w-12 h-12 rounded-full object-cover ring-2 ring-primary/20" />
                  <div>
                    <div className="font-bold text-slate-900">{t.name}</div>
                    <div className="text-xs text-slate-500">{t.role}</div>
                  </div>
                </div>
                <p className="text-slate-600 italic leading-relaxed">"{t.content}"</p>
                <div className="mt-6 flex text-yellow-400 gap-1">
                   {[1,2,3,4,5].map(i => <Star key={i} size={14} fill="currentColor" />)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-slate-600">Everything you need to know about our services and process.</p>
          </div>

          <div className="space-y-4">
            {FAQS.map((faq, idx) => (
              <div key={idx} className="border border-slate-200 rounded-xl overflow-hidden">
                <button 
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full flex justify-between items-center p-6 text-left bg-white hover:bg-slate-50 transition"
                >
                  <span className="font-bold text-slate-800 text-lg">{faq.question}</span>
                  {openFaq === idx ? <ChevronUp className="text-primary" /> : <ChevronDown className="text-slate-400" />}
                </button>
                <div 
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${openFaq === idx ? 'max-h-48' : 'max-h-0'}`}
                >
                  <div className="p-6 pt-0 text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/50">
                    {faq.answer}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="bg-gradient-to-r from-secondary to-indigo-900 rounded-3xl p-8 md:p-16 text-center text-white relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
            <div className="relative z-10 max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-5xl font-bold mb-6">Ready to scale your business?</h2>
              <p className="text-indigo-200 text-lg mb-10">
                Join hundreds of successful companies that trust Optimantix for their digital needs. Let's discuss your next big project.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                 <button 
                   onClick={() => scrollTo('contact')}
                   className="bg-primary hover:bg-red-500 text-white font-bold py-4 px-10 rounded-full transition shadow-lg shadow-primary/30"
                 >
                   Get Your Free Quote
                 </button>
                 <a href="tel:+15551234567" className="bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/30 text-white font-bold py-4 px-10 rounded-full transition">
                   Call Us Now
                 </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <span className="text-primary font-bold uppercase tracking-wider text-sm">Contact Us</span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mt-2 mb-6">Let's Start a Conversation</h2>
              <p className="text-slate-600 mb-8 text-lg leading-relaxed">
                Whether you have a question about features, pricing, or anything else, our team is ready to answer all your questions.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-white p-3 rounded-lg shadow-sm text-primary">
                    <CheckCircle2 size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-lg">Expert Consultation</h4>
                    <p className="text-slate-500">Free initial strategy session to understand your goals.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-white p-3 rounded-lg shadow-sm text-primary">
                    <CheckCircle2 size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-lg">Tailored Solutions</h4>
                    <p className="text-slate-500">Custom packages designed for your specific business needs.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-white p-3 rounded-lg shadow-sm text-primary">
                    <CheckCircle2 size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-lg">24/7 Support</h4>
                    <p className="text-slate-500">Dedicated account managers and technical support.</p>
                  </div>
                </div>
              </div>

              <div className="mt-12 bg-white p-6 rounded-xl border border-slate-200 inline-block shadow-sm">
                <h4 className="font-bold text-secondary mb-1">Office Hours</h4>
                <div className="flex justify-between gap-8 text-sm text-slate-600">
                  <span>Mon - Fri</span>
                  <span className="font-medium">9:00 AM - 6:00 PM EST</span>
                </div>
              </div>
            </div>
            
            <ContactForm />
          </div>
        </div>
      </section>
    </div>
  );
};