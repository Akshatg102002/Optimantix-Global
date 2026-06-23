import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ContactForm } from './ContactForm';

export const LeadModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const MotionDiv = motion.div as React.ElementType;

  useEffect(() => {
    const timer = setTimeout(() => {
      const alreadyShown = sessionStorage.getItem('leadModalShown');
      if (!alreadyShown) {
        setIsOpen(true);
        sessionStorage.setItem('leadModalShown', 'true');
      }
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  const closeModal = () => setIsOpen(false);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <MotionDiv 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />
          
          <MotionDiv 
            initial={{ scale: 0.95, opacity: 0, y: 10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 10 }}
            className="bg-white dark:bg-dark-card w-full max-w-2xl rounded-2xl shadow-2xl relative overflow-hidden flex flex-col mx-auto max-h-[90vh] overflow-y-auto custom-scrollbar"
          >
            <button 
              onClick={closeModal} 
              className="absolute top-4 right-4 text-gray-400 z-50 p-2 bg-gray-100 dark:bg-gray-800 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors shadow-sm"
            >
                <X size={20} />
            </button>

            <div className="p-2 sm:p-4">
               <ContactForm />
            </div>
          </MotionDiv>
        </div>
      )}
    </AnimatePresence>
  );
};
