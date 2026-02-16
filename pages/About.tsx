
import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { MessageSquare, User, CheckCircle, Sparkles, Linkedin } from 'lucide-react';
import { SEO } from '../components/SEO';
import { Link } from 'react-router-dom';

const TEAM = [
  {
    name: "Alex Jordan",
    role: "Chief Technology Officer",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400",
    linkedin: "#"
  },
  {
    name: "Taylor Brooks",
    role: "Head of Operations",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400",
    linkedin: "#"
  },
  {
    name: "Morgan Patel",
    role: "Lead Solutions Architect",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400",
    linkedin: "#"
  },
  {
    name: "Sarah Chen",
    role: "Product Director",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=400",
    linkedin: "#"
  },
  {
    name: "David Ross",
    role: "Head of Marketing",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=400",
    linkedin: "#"
  },
  {
    name: "Elena Rodriguez",
    role: "Client Success Lead",
    image: "https://images.unsplash.com/photo-1598550874175-4d7112ee7f1e?auto=format&fit=crop&q=80&w=400",
    linkedin: "#"
  }
];

export const About: React.FC = () => {
  const { scrollY } = useScroll();
  const yHero = useTransform(scrollY, [0, 500], [0, 200]);

  const MotionDiv = motion.div as any;
  const MotionH1 = motion.h1 as any;
  const MotionP = motion.p as any;

  return (
    <div className="bg-light dark:bg-dark min-h-screen text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <SEO 
        title="About Us" 
        description="Optimantix Global - Expert minds delivering enterprise solutions engineered for growth."
      />

      {/* Parallax Hero Section */}
      <div className="relative h-[70vh] min-h-[500px] flex items-center justify-center overflow-hidden">
        {/* Parallax Background */}
        <MotionDiv 
          style={{ y: yHero }}
          className="absolute inset-0 z-0"
        >
           <img 
             src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=2000" 
             alt="Office workspace" 
             className="w-full h-full object-cover"
           />
           <div className="absolute inset-0 bg-black/60"></div>
        </MotionDiv>

        <div className="container relative z-10 px-4 text-center text-white">
          <MotionH1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.1] mb-8"
          >
            Content that drives <br />
            business growth
          </MotionH1>
          <MotionP 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-gray-200 max-w-2xl mx-auto font-light leading-relaxed"
          >
            Explore our expertise in delivering intelligent digital solutions for modern enterprises. We help you scale with confidence.
          </MotionP>
        </div>
      </div>

      {/* Mission & Values Grid */}
      <section className="py-24 bg-white dark:bg-dark-card border-b border-gray-100 dark:border-gray-800">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">Enterprise solutions, <br/> engineered for growth</h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg">We deliver robust IT platforms, tailored for scalability, security, and long-term business impact.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Mission */}
            <div className="bg-gray-50 dark:bg-[#111] p-10 rounded-2xl border border-gray-200 dark:border-gray-800 hover:shadow-xl transition-all duration-300 group">
              <div className="w-14 h-14 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
                <MessageSquare size={28} />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Mission</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-lg">Delivering scalable digital systems for enterprise efficiency and growth.</p>
            </div>

            {/* Values */}
            <div className="bg-gray-50 dark:bg-[#111] p-10 rounded-2xl border border-gray-200 dark:border-gray-800 hover:shadow-xl transition-all duration-300 group">
              <div className="w-14 h-14 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
                <User size={28} />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Values</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-lg">Integrity, innovation, and reliability drive every solution.</p>
            </div>

            {/* How we work */}
            <div className="bg-gray-50 dark:bg-[#111] p-10 rounded-2xl border border-gray-200 dark:border-gray-800 hover:shadow-xl transition-all duration-300 group">
              <div className="w-14 h-14 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
                <CheckCircle size={28} />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">How we work</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-lg">Expert-led, consultative delivery with transparent, precise execution.</p>
            </div>

            {/* Partnership */}
            <div className="bg-gray-50 dark:bg-[#111] p-10 rounded-2xl border border-gray-200 dark:border-gray-800 hover:shadow-xl transition-all duration-300 group">
              <div className="w-14 h-14 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
                <Sparkles size={28} />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Partnership</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-lg">Collaboration and ongoing support for sustained business success.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="py-24 bg-light dark:bg-dark">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <span className="text-primary font-bold text-sm tracking-widest uppercase mb-4 block">Our Leadership Team</span>
            <h2 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">Expert minds. <br/> Proven results.</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-3xl mx-auto text-lg leading-relaxed mb-8">
              Meet the professionals driving our technology, strategy, and client success. Our leadership brings deep expertise and a commitment to delivering enterprise-grade solutions.
            </p>
            <a href="https://linkedin.com/company/optimantix" target="_blank" rel="noreferrer" className="inline-block bg-primary hover:bg-secondary text-white font-bold px-8 py-3 rounded-full transition-colors shadow-lg shadow-blue-500/20">
              Connect
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {TEAM.map((member, idx) => (
              <MotionDiv 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white dark:bg-dark-card border border-gray-100 dark:border-gray-800 rounded-2xl p-8 text-center hover:shadow-xl transition-all duration-300 group"
              >
                <div className="w-32 h-32 mx-auto mb-6 relative">
                  <div className="absolute inset-0 bg-primary/10 rounded-full blur-xl group-hover:bg-primary/30 transition-colors"></div>
                  <img src={member.image} alt={member.name} className="w-full h-full object-cover rounded-full relative z-10 border-4 border-white dark:border-gray-700 shadow-md" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">{member.name}</h3>
                <p className="text-primary font-medium mb-4">{member.role}</p>
                <a href={member.linkedin} className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-500 hover:bg-primary hover:text-white transition-colors">
                  <Linkedin size={18} />
                </a>
              </MotionDiv>
            ))}
          </div>
        </div>
      </section>

      {/* New CTA Section */}
      <section className="py-20 bg-white dark:bg-dark-card">
        <div className="container mx-auto px-4 md:px-6">
          <div className="bg-dark dark:bg-black rounded-3xl overflow-hidden flex flex-col lg:flex-row shadow-2xl">
            <div className="lg:w-1/2 p-12 md:p-16 flex flex-col justify-center">
              <span className="text-gray-400 font-bold text-xs tracking-widest uppercase mb-4">Take the next step</span>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">Ready to <br/> build your <br/> future?</h2>
              <p className="text-gray-400 text-lg mb-10 max-w-md">
                Connect with our experts to discuss tailored IT solutions for your business. Let's drive your digital transformation.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/contact" className="bg-primary hover:bg-secondary text-white font-bold px-8 py-4 rounded-lg transition-colors">
                  Schedule call
                </Link>
                <Link to="/contact" className="bg-transparent border border-gray-600 hover:border-white text-white font-bold px-8 py-4 rounded-lg transition-colors">
                  Request proposal
                </Link>
              </div>
            </div>
            <div className="lg:w-1/2 relative min-h-[400px]">
               <img 
                 src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1200" 
                 alt="High tech environment" 
                 className="absolute inset-0 w-full h-full object-cover"
               />
               <div className="absolute inset-0 bg-gradient-to-l from-transparent to-[#121212] pointer-events-none"></div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
