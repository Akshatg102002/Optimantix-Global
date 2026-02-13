import React from 'react';
import { Target, Lightbulb, Users, Trophy } from 'lucide-react';
import { STATS } from '../constants';
import { SEO } from '../components/SEO';

export const About: React.FC = () => {
  return (
    <div className="bg-light dark:bg-dark min-h-screen">
      <SEO 
        title="About Us" 
        description="Learn about Optimantix Global's mission, vision, and our team of digital experts dedicated to growing your business online."
      />
      {/* Header */}
      <div className="bg-secondary text-white py-20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
        <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">About Optimantix Global</h1>
          <p className="text-xl text-indigo-100 max-w-2xl mx-auto leading-relaxed">
             We are a comprehensive digital marketing agency specializing in helping businesses achieve measurable online growth.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 py-16">
        {/* Company Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <span className="text-primary font-bold uppercase tracking-wider text-sm">Who We Are</span>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mt-2 mb-6">Digital Excellence from Noida to the World</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
              Based in Noida, India, Optimantix Global delivers results-driven strategies across multiple digital channels including SEO, social media marketing, paid advertising, marketplace management, and web development.
            </p>
            <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
              Our proven track record demonstrates exceptional performance with an average of 90% growth in leads and 167% growth in website traffic. We pride ourselves on sustainable ROI and high client retention rates.
            </p>
          </div>
          <div className="relative">
             <div className="rounded-2xl overflow-hidden shadow-2xl border-4 border-white dark:border-gray-800">
                <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800" alt="Team meeting" className="w-full h-auto" />
             </div>
             <div className="absolute -bottom-6 -left-6 bg-white dark:bg-dark-card p-6 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700">
               <div className="flex items-center gap-3">
                 <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-full text-green-600">
                   <Trophy size={24} />
                 </div>
                 <div>
                   <div className="font-bold text-gray-900 dark:text-white">High Retention</div>
                   <div className="text-xs text-gray-500">Client Satisfaction</div>
                 </div>
               </div>
             </div>
          </div>
        </div>

        {/* Mission / Vision Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
             <div className="bg-white dark:bg-dark-card p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 hover:shadow-md transition">
                <Target className="text-secondary mb-4" size={40} />
                <h3 className="text-xl font-bold mb-3 dark:text-white">Our Mission</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  To empower businesses with innovative digital marketing and technology-driven solutions that deliver measurable growth and long-term success.
                </p>
             </div>
             <div className="bg-white dark:bg-dark-card p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 hover:shadow-md transition">
                <Lightbulb className="text-primary mb-4" size={40} />
                <h3 className="text-xl font-bold mb-3 dark:text-white">Our Vision</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  Becoming a global leader in digital transformation by helping brands adapt, compete, and thrive in the ever-changing digital landscape.
                </p>
             </div>
             <div className="bg-white dark:bg-dark-card p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 hover:shadow-md transition">
                <Users className="text-secondary mb-4" size={40} />
                <h3 className="text-xl font-bold mb-3 dark:text-white">Core Philosophy</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  We believe in results-driven strategies, client-first collaboration, and continuous innovation to create impactful digital experiences that inspire growth.
                </p>
             </div>
        </div>

        {/* Stats */}
        <div className="bg-gray-900 text-white rounded-3xl p-12 text-center">
            <h2 className="text-3xl font-bold mb-12">Our Impact in Numbers</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {STATS.map((stat, idx) => (
              <div key={idx} className="text-center group">
                <div className="inline-flex p-3 rounded-full bg-white/10 text-primary mb-3 group-hover:scale-110 transition-transform">
                  <stat.icon size={24} />
                </div>
                <div className="text-3xl md:text-4xl font-extrabold mb-1">{stat.value}</div>
                <div className="text-sm text-gray-400 uppercase tracking-wider font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};