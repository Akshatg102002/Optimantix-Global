
import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { MessageSquare, User, CheckCircle, Sparkles, Linkedin, ArrowRight, ExternalLink } from 'lucide-react';
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
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -250]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -50]);

  const MotionDiv = motion.div as any;
  const MotionH1 = motion.h1 as any;
  const MotionP = motion.p as any;

  return (
    <div className="bg-[#050505] min-h-screen text-white overflow-x-hidden">
      <SEO 
        title="About Us" 
        description="Optimantix Global - Expert minds delivering enterprise solutions engineered for growth."
      />

      {/* Parallax Hero Section */}
      <div ref={containerRef} className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-4 md:px-6 overflow-hidden">
        <div className="container mx-auto relative z-10">
          <div className="max-w-4xl">
            <MotionH1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-5xl md:text-7xl font-semibold tracking-tight leading-[1.1] mb-8"
            >
              Content that drives <br />
              business growth
            </MotionH1>
            <MotionP 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl md:text-2xl text-gray-400 max-w-2xl font-light leading-relaxed mb-20"
            >
              Explore our expertise in delivering intelligent digital solutions for modern enterprises. We help you scale with confidence.
            </MotionP>
          </div>

          {/* Scrolling Images Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <MotionDiv style={{ y: y1 }} className="relative h-[400px] md:h-[500px] rounded-2xl overflow-hidden group">
               <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-all duration-500 z-10"></div>
               <img 
                 src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=800" 
                 alt="Office workspace" 
                 className="w-full h-full object-cover transform scale-105 group-hover:scale-110 transition-transform duration-700"
               />
            </MotionDiv>
            <MotionDiv style={{ y: y2 }} className="relative h-[400px] md:h-[500px] rounded-2xl overflow-hidden mt-0 md:-mt-20 group">
               <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-all duration-500 z-10"></div>
               <img 
                 src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800" 
                 alt="Data analytics" 
                 className="w-full h-full object-cover transform scale-105 group-hover:scale-110 transition-transform duration-700"
               />
            </MotionDiv>
            <MotionDiv style={{ y: y3 }} className="relative h-[400px] md:h-[500px] rounded-2xl overflow-hidden mt-0 md:mt-12 group">
               <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-all duration-500 z-10"></div>
               <img 
                 src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=800" 
                 alt="Team collaboration" 
                 className="w-full h-full object-cover transform scale-105 group-hover:scale-110 transition-transform duration-700"
               />
            </MotionDiv>
          </div>
        </div>
        
        {/* Background Gradients */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-900/10 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>
      </div>

      {/* Mission & Values Grid */}
      <section className="py-24 bg-[#0a0a0a] border-t border-gray-900">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-semibold mb-6">Enterprise solutions, <br/> engineered for growth</h2>
            <p className="text-gray-400 text-lg">We deliver robust IT platforms, tailored for scalability, security, and long-term business impact.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Mission */}
            <div className="bg-[#111] p-8 md:p-10 rounded-2xl border border-gray-800 hover:border-gray-700 transition-colors group">
              <div className="w-12 h-12 rounded-lg bg-blue-900/20 text-blue-400 flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
                <MessageSquare size={24} />
              </div>
              <h3 className="text-2xl font-bold mb-3">Mission</h3>
              <p className="text-gray-400 leading-relaxed">Delivering scalable digital systems for enterprise efficiency and growth.</p>
            </div>

            {/* Values */}
            <div className="bg-[#111] p-8 md:p-10 rounded-2xl border border-gray-800 hover:border-gray-700 transition-colors group">
              <div className="w-12 h-12 rounded-lg bg-blue-900/20 text-blue-400 flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
                <User size={24} />
              </div>
              <h3 className="text-2xl font-bold mb-3">Values</h3>
              <p className="text-gray-400 leading-relaxed">Integrity, innovation, and reliability drive every solution.</p>
            </div>

            {/* How we work */}
            <div className="bg-[#111] p-8 md:p-10 rounded-2xl border border-gray-800 hover:border-gray-700 transition-colors group">
              <div className="w-12 h-12 rounded-lg bg-blue-900/20 text-blue-400 flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
                <CheckCircle size={24} />
              </div>
              <h3 className="text-2xl font-bold mb-3">How we work</h3>
              <p className="text-gray-400 leading-relaxed">Expert-led, consultative delivery with transparent, precise execution.</p>
            </div>

            {/* Partnership */}
            <div className="bg-[#111] p-8 md:p-10 rounded-2xl border border-gray-800 hover:border-gray-700 transition-colors group">
              <div className="w-12 h-12 rounded-lg bg-blue-900/20 text-blue-400 flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
                <Sparkles size={24} />
              </div>
              <h3 className="text-2xl font-bold mb-3">Partnership</h3>
              <p className="text-gray-400 leading-relaxed">Collaboration and ongoing support for sustained business success.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="py-24 bg-[#050505]">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <span className="text-gray-500 font-bold text-sm tracking-widest uppercase mb-4 block">Our Leadership Team</span>
            <h2 className="text-5xl md:text-6xl font-semibold mb-6">Expert minds. <br/> Proven results.</h2>
            <p className="text-gray-400 max-w-3xl mx-auto text-lg leading-relaxed mb-8">
              Meet the professionals driving our technology, strategy, and client success. Our leadership brings deep expertise and a commitment to delivering enterprise-grade solutions.
            </p>
            <a href="https://linkedin.com/company/optimantix" target="_blank" rel="noreferrer" className="inline-block bg-primary hover:bg-secondary text-white font-medium px-8 py-3 rounded-md transition-colors">
              Connect
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {TEAM.map((member, idx) => (
              <MotionDiv 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-[#0f0f0f] border border-gray-800 rounded-xl p-8 text-center hover:border-gray-700 transition-all group"
              >
                <div className="w-24 h-24 mx-auto mb-6 relative">
                  <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl group-hover:bg-primary/40 transition-colors"></div>
                  <img src={member.image} alt={member.name} className="w-full h-full object-cover rounded-full relative z-10 border-2 border-gray-800" />
                </div>
                <h3 className="text-xl font-bold text-white mb-1">{member.name}</h3>
                <p className="text-yellow-500 text-sm font-medium mb-4">{member.role}</p>
                <a href={member.linkedin} className="inline-flex items-center justify-center w-8 h-8 rounded bg-[#1a1a1a] text-blue-400 hover:bg-primary hover:text-white transition-colors">
                  <Linkedin size={14} />
                </a>
              </MotionDiv>
            ))}
          </div>
        </div>
      </section>

      {/* New CTA Section */}
      <section className="py-12 bg-[#050505]">
        <div className="container mx-auto px-4 md:px-6">
          <div className="bg-[#0a0a0a] rounded-3xl border border-gray-900 overflow-hidden flex flex-col lg:flex-row">
            <div className="lg:w-1/2 p-10 md:p-16 flex flex-col justify-center">
              <span className="text-gray-500 font-bold text-xs tracking-widest uppercase mb-4">Take the next step</span>
              <h2 className="text-4xl md:text-5xl font-semibold mb-6 leading-tight">Ready to <br/> build your <br/> future?</h2>
              <p className="text-gray-400 text-lg mb-10 max-w-md">
                Connect with our experts to discuss tailored IT solutions for your business. Let's drive your digital transformation.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/contact" className="bg-primary hover:bg-secondary text-white font-medium px-8 py-3.5 rounded-md transition-colors">
                  Schedule call
                </Link>
                <Link to="/contact" className="bg-transparent border border-gray-600 hover:border-white text-white font-medium px-8 py-3.5 rounded-md transition-colors">
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
               <div className="absolute inset-0 bg-gradient-to-l from-transparent to-[#0a0a0a] pointer-events-none"></div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
