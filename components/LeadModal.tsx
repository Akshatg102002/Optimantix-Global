import React, { useState, useEffect } from 'react';
import { X, Gift } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useData } from '../context/DataContext';
import { motion, AnimatePresence } from 'framer-motion';

export const LeadModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasOpened, setHasOpened] = useState(false);
  const { addLead } = useData();
  const { register, handleSubmit, reset } = useForm();
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    // Open modal after 8 seconds if not already opened in this session
    const timer = setTimeout(() => {
      const alreadyShown = sessionStorage.getItem('leadModalShown');
      if (!alreadyShown) {
        setIsOpen(true);
        setHasOpened(true);
        sessionStorage.setItem('leadModalShown', 'true');
      }
    }, 8000);

    return () => clearTimeout(timer);
  }, []);

  const closeModal = () => setIsOpen(false);

  const onSubmit = (data: any) => {
    addLead({
      ...data,
      serviceInterest: 'Popup Lead',
      message: 'Lead from popup modal'
    });
    setSubmitted(true);
    setTimeout(() => {
        closeModal();
        setSubmitted(false);
        reset();
    }, 3000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />
          
          <motion.div 
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="bg-white dark:bg-dark-card w-full max-w-md rounded-2xl shadow-2xl relative overflow-hidden flex flex-col md:flex-row"
          >
            <button 
                onClick={closeModal}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 z-10"
            >
                <X size={24} />
            </button>

            {/* Content */}
            <div className="p-8 w-full">
              {!submitted ? (
                <>
                  <div className="mb-6 text-center">
                    <div className="bg-red-100 dark:bg-red-900/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-primary">
                        <Gift size={32} />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Get a Free Audit!</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      Enter your details below to receive a complimentary digital presence audit for your business.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <input 
                      {...register('name', { required: true })}
                      placeholder="Your Name"
                      className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl outline-none focus:ring-2 focus:ring-primary dark:text-white"
                    />
                    <input 
                      {...register('email', { required: true })}
                      placeholder="Email Address"
                      type="email"
                      className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl outline-none focus:ring-2 focus:ring-primary dark:text-white"
                    />
                    <input 
                      {...register('phone', { required: true })}
                      placeholder="Phone Number"
                      className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl outline-none focus:ring-2 focus:ring-primary dark:text-white"
                    />
                    <button 
                      type="submit"
                      className="w-full bg-primary text-white font-bold py-3 rounded-xl hover:bg-red-500 transition shadow-lg shadow-red-200 dark:shadow-none"
                    >
                      Claim Free Audit
                    </button>
                  </form>
                </>
              ) : (
                <div className="text-center py-8">
                  <div className="text-green-500 mb-4 flex justify-center">
                      <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Thank You!</h3>
                  <p className="text-gray-600 dark:text-gray-400">We'll be in touch with your audit shortly.</p>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};