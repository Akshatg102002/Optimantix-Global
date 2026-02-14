
import React, { useState, useEffect, useRef } from 'react';
import { X, Calendar } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useData } from '../context/DataContext';
import { motion, AnimatePresence } from 'framer-motion';
import { SimpleCaptcha, CaptchaRef } from './SimpleCaptcha';

export const LeadModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasOpened, setHasOpened] = useState(false);
  const { addLead } = useData();
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [submitted, setSubmitted] = useState(false);
  const captchaRef = useRef<CaptchaRef>(null);

  useEffect(() => {
    // Open modal after 15 seconds if not already opened in this session
    const timer = setTimeout(() => {
      const alreadyShown = sessionStorage.getItem('leadModalShown');
      if (!alreadyShown) {
        setIsOpen(true);
        setHasOpened(true);
        sessionStorage.setItem('leadModalShown', 'true');
      }
    }, 15000);

    return () => clearTimeout(timer);
  }, []);

  const closeModal = () => setIsOpen(false);

  const onSubmit = (data: any) => {
    if (captchaRef.current && !captchaRef.current.validate()) {
      return;
    }

    addLead({
      ...data,
      serviceInterest: 'Consultation Request',
      message: data.message || 'Consultation request from popup'
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
            className="bg-white dark:bg-dark-card w-full max-w-lg rounded-2xl shadow-2xl relative overflow-hidden flex flex-col max-h-[90vh] overflow-y-auto"
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
                    <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-primary">
                        <Calendar size={32} />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Book Your Free Consultation</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      Speak with our experts to discover how we can grow your business. No obligation.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <input 
                          {...register('name', { required: 'Name is required' })}
                          placeholder="Full Name"
                          className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl outline-none focus:ring-2 focus:ring-primary dark:text-white text-sm"
                        />
                         {errors.name && <span className="text-xs text-red-500 block mt-1">Required</span>}
                      </div>
                      <div>
                        <input 
                          {...register('company')}
                          placeholder="Company Name"
                          className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl outline-none focus:ring-2 focus:ring-primary dark:text-white text-sm"
                        />
                      </div>
                    </div>
                    
                    <input 
                      {...register('email', { required: 'Email is required' })}
                      placeholder="Work Email"
                      type="email"
                      className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl outline-none focus:ring-2 focus:ring-primary dark:text-white text-sm"
                    />
                     {errors.email && <span className="text-xs text-red-500 block mt-1">Required</span>}

                    <input 
                      {...register('phone', { required: 'Phone is required' })}
                      placeholder="Phone Number"
                      className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl outline-none focus:ring-2 focus:ring-primary dark:text-white text-sm"
                    />
                     {errors.phone && <span className="text-xs text-red-500 block mt-1">Required</span>}

                    <textarea 
                        {...register('message')}
                        placeholder="What are your goals?"
                        rows={3}
                        className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl outline-none focus:ring-2 focus:ring-primary dark:text-white text-sm resize-none"
                    />

                    <SimpleCaptcha ref={captchaRef} />

                    <button 
                      type="submit"
                      className="w-full bg-primary text-white font-bold py-3 rounded-xl hover:bg-secondary transition shadow-md"
                    >
                      Request Consultation
                    </button>
                  </form>
                </>
              ) : (
                <div className="text-center py-8">
                  <div className="text-green-500 mb-4 flex justify-center">
                      <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Request Received!</h3>
                  <p className="text-gray-600 dark:text-gray-400">Our team will review your details and contact you shortly.</p>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
