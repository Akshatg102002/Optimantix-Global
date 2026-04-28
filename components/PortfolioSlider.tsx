
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const PORTFOLIO_IMAGES = [
  "https://socialfoundationindia.org/wp-content/uploads/2026/02/Vita.png",
  "https://socialfoundationindia.org/wp-content/uploads/2026/02/Nutrevvo.png",
  "https://socialfoundationindia.org/wp-content/uploads/2026/02/iExplain.png",
  "https://socialfoundationindia.org/wp-content/uploads/2026/02/plushy.jpg",
  "https://socialfoundationindia.org/wp-content/uploads/2026/02/Kyptec.jpg",
  "https://socialfoundationindia.org/wp-content/uploads/2026/02/Jaimcord.jpg"
];

export const PortfolioSlider: React.FC = () => {
  const MotionDiv = motion.div as React.ElementType;
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

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
              className="group relative rounded-xl overflow-hidden shadow-md hover:shadow-xl border border-gray-100 dark:border-gray-800 aspect-[4/3] bg-gray-50 dark:bg-[#111] cursor-pointer"
              onClick={() => setSelectedImage(imageUrl)}
            >
              <img 
                src={imageUrl} 
                alt={`Portfolio Item ${index + 1}`} 
                className="w-full h-full object-cover object-top transform group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                <span className="opacity-0 group-hover:opacity-100 bg-white/90 text-gray-900 px-4 py-2 rounded-full font-bold text-sm transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                  View Project
                </span>
              </div>
            </MotionDiv>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-5xl w-full max-h-[90vh] bg-transparent rounded-lg overflow-hidden"
              onClick={(e: React.MouseEvent) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 z-10 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
              >
                <X size={24} />
              </button>
              <img
                src={selectedImage}
                alt="Portfolio Full View"
                className="w-full h-full object-contain max-h-[85vh] rounded-lg"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
