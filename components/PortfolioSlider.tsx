
import React from 'react';
import { motion } from 'framer-motion';

const PORTFOLIO_IMAGES = [
  "https://socialfoundationindia.org/wp-content/uploads/2026/02/Vita.png",
  "https://socialfoundationindia.org/wp-content/uploads/2026/02/Nutrevvo.png",
  "https://socialfoundationindia.org/wp-content/uploads/2026/02/iExplain.png",
  "https://socialfoundationindia.org/wp-content/uploads/2026/02/plushy.jpg",
  "https://socialfoundationindia.org/wp-content/uploads/2026/02/Kyptec.jpg",
  "https://socialfoundationindia.org/wp-content/uploads/2026/02/Jaimcord.jpg"
];

export const PortfolioSlider: React.FC = () => {
  const MotionDiv = motion.div as any;

  return (
    <section className="py-20 bg-white dark:bg-dark-card border-t border-gray-100 dark:border-gray-800">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <span className="text-primary font-bold uppercase tracking-wider text-sm">Our Portfolio</span>
          <h2 className="text-3xl md:text-4xl font-extrabold mt-2 text-gray-900 dark:text-white">Recent Work Showcase</h2>
          <p className="text-gray-600 dark:text-gray-400 mt-4 max-w-2xl mx-auto">
             A glimpse into the brands we have helped grow.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PORTFOLIO_IMAGES.map((imageUrl, index) => (
            <MotionDiv
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative rounded-xl overflow-hidden shadow-md hover:shadow-xl border border-gray-100 dark:border-gray-800 aspect-[4/3] bg-gray-50 dark:bg-[#111]"
            >
              <img 
                src={imageUrl} 
                alt={`Portfolio Item ${index + 1}`} 
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
              />
            </MotionDiv>
          ))}
        </div>
      </div>
    </section>
  );
};
