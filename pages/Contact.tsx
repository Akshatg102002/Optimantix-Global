import React from 'react';
import { SEO } from '../components/SEO';
import { MapPin, Phone, MessageSquare, Clock, Globe2, Building2, ArrowDown, Users } from 'lucide-react';
import { motion } from 'framer-motion';

export const Contact = () => {
  return (
    <div className="bg-white dark:bg-dark min-h-screen">
      <SEO 
        title="Contact Us" 
        description="Get in touch with Optimantix Global. We're here to help you with your next project. Explore our global offices." 
      />

      {/* Hero Section */}
      <section className="pt-24 pb-12 md:pt-32 md:pb-20 bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-dark relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10 text-center max-w-4xl">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6 tracking-tight"
          >
            Let's Start a <span className="text-primary">Conversation</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-8 leading-relaxed"
          >
            Whether you have a question about our services, pricing, need a consultation, or just want to explore how we can help your business grow, our team is ready to answer all your questions.
          </motion.p>
        </div>
      </section>

      {/* Support Channels */}
      <section className="py-12 bg-white dark:bg-dark">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-gray-50 dark:bg-dark-card p-8 rounded-2xl border border-gray-100 dark:border-gray-800 text-center hover:shadow-xl transition-all shadow-sm"
            >
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <MessageSquare size={32} />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">Chat with Sales</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm">
                Discuss your project requirements, get customized quotes, and learn how we can add value.
              </p>
              <p className="font-semibold text-primary">sales@optimantix.com</p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-gray-50 dark:bg-dark-card p-8 rounded-2xl border border-gray-100 dark:border-gray-800 text-center hover:shadow-xl transition-all shadow-sm"
            >
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Users size={32} />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">Technical Support</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm">
                Already a client? Our dedicated support team is available 24/7 to resolve technical issues.
              </p>
              <p className="font-semibold text-primary">support@optimantix.com</p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-gray-50 dark:bg-dark-card p-8 rounded-2xl border border-gray-100 dark:border-gray-800 text-center hover:shadow-xl transition-all shadow-sm"
            >
              <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Building2 size={32} />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">Partnerships</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm">
                Interested in partnering with us? Let's explore synergies and grow together globally.
              </p>
              <p className="font-semibold text-primary">partners@optimantix.com</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Global Offices */}
      <section className="py-16 bg-gray-50 dark:bg-[#0a0a0a]">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <span className="text-primary font-semibold tracking-wider uppercase text-sm mb-2 block">Our Locations</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Global Presence, Local Expertise</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* India Office */}
            <div className="bg-white dark:bg-dark-card rounded-3xl overflow-hidden shadow-lg border border-gray-100 dark:border-gray-800 flex flex-col sm:flex-row group">
              <div className="sm:w-2/5 h-48 sm:h-auto bg-gray-200 relative overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=800&auto=format&fit=crop" 
                  alt="India Office" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur text-gray-900 text-xs font-bold px-3 py-1 rounded-full flex items-center shadow-md">
                  <Globe2 size={12} className="mr-1 text-primary" /> India HQ
                </div>
              </div>
              <div className="p-8 sm:w-3/5 flex flex-col justify-center">
                <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">New Delhi, India</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3 text-gray-600 dark:text-gray-400 text-sm">
                    <MapPin className="text-primary shrink-0 mt-0.5" size={18} />
                    <p>Optimantix Global Solutions<br/>Cyber Hub, Phase 2, Gurugram<br/>Haryana, India</p>
                  </div>
                  <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400 text-sm">
                    <Phone className="text-primary shrink-0" size={18} />
                    <p>+91 9910343016</p>
                  </div>
                  <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400 text-sm">
                    <Clock className="text-primary shrink-0" size={18} />
                    <p>Mon - Fri: 9:00 AM - 6:00 PM IST</p>
                  </div>
                </div>
              </div>
            </div>

            {/* US Office */}
            <div className="bg-white dark:bg-dark-card rounded-3xl overflow-hidden shadow-lg border border-gray-100 dark:border-gray-800 flex flex-col sm:flex-row group">
              <div className="sm:w-2/5 h-48 sm:h-auto bg-gray-200 relative overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?q=80&w=800&auto=format&fit=crop" 
                  alt="US Office" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur text-gray-900 text-xs font-bold px-3 py-1 rounded-full flex items-center shadow-md">
                  <Globe2 size={12} className="mr-1 text-primary" /> US Office
                </div>
              </div>
              <div className="p-8 sm:w-3/5 flex flex-col justify-center">
                <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">New York, USA</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3 text-gray-600 dark:text-gray-400 text-sm">
                    <MapPin className="text-primary shrink-0 mt-0.5" size={18} />
                    <p>Optimantix LLC<br/>One World Trade Center<br/>Suite 8500, New York, NY 10007</p>
                  </div>
                  <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400 text-sm">
                    <Phone className="text-primary shrink-0" size={18} />
                    <p>+1 802 995 2844</p>
                  </div>
                  <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400 text-sm">
                    <Clock className="text-primary shrink-0" size={18} />
                    <p>Mon - Fri: 9:00 AM - 5:00 PM EST</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Transition to the global Contact Section */}
      <section className="py-12 bg-white dark:bg-dark text-center">
        <div className="container mx-auto">
           <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Ready to discuss your project?</h2>
           <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">Fill out the detailed form below and one of our dedicated account managers will get back to you within 24 hours.</p>
           <motion.div 
             animate={{ y: [0, 10, 0] }} 
             transition={{ repeat: Infinity, duration: 2 }}
             className="flex justify-center"
           >
             <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center">
               <ArrowDown size={24} />
             </div>
           </motion.div>
        </div>
      </section>
    </div>
  );
};

