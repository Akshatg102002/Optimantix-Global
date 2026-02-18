
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

  const MotionDiv = motion.div as any;

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
          <MotionDiv 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />
          
          <MotionDiv 
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="bg-white dark:bg-dark-card w-full max-w-md rounded-2xl shadow-2xl relative overflow-hidden flex flex-col max-h-[90vh] overflow-y-auto mx-4"
          >
            <button 
                onClick={closeModal}
                className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 z-10 p-1 bg-gray-100 dark:bg-gray-800 rounded-full"
            >
                <X size={18} />
            </button>

            {/* Content */}
            <div className="p-6 w-full">
              {!submitted ? (
                <>
                  <div className="mb-4 text-center">
                    <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 text-primary">
                        <Calendar size={24} />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">Book Free Consultation</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-xs">
                      Speak with experts to grow your business.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <input 
                          {...register('name', { required: true })}
                          placeholder="Name"
                          className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg outline-none focus:ring-2 focus:ring-primary dark:text-white text-sm"
                        />
                         {errors.name && <span className="text-[10px] text-red-500 block mt-1">Required</span>}
                      </div>
                      <div>
                        <input 
                          {...register('company')}
                          placeholder="Company"
                          className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg outline-none focus:ring-2 focus:ring-primary dark:text-white text-sm"
                        />
                      </div>
                    </div>
                    
                    <input 
                      {...register('email', { required: true })}
                      placeholder="Email"
                      type="email"
                      className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg outline-none focus:ring-2 focus:ring-primary dark:text-white text-sm"
                    />
                     {errors.email && <span className="text-[10px] text-red-500 block mt-1">Required</span>}

                    <input 
                      {...register('phone', { required: true })}
                      placeholder="Phone"
                      className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg outline-none focus:ring-2 focus:ring-primary dark:text-white text-sm"
                    />
                     {errors.phone && <span className="text-[10px] text-red-500 block mt-1">Required</span>}

                    <textarea 
                        {...register('message')}
                        placeholder="Your goals..."
                        rows={2}
                        className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg outline-none focus:ring-2 focus:ring-primary dark:text-white text-sm resize-none"
                    />

                    <div className="scale-90 origin-left">
                        <SimpleCaptcha ref={captchaRef} />
                    </div>

                    <button 
                      type="submit"
                      className="w-full bg-primary text-white font-bold py-2.5 rounded-lg hover:bg-secondary transition shadow-md text-sm"
                    >
                      Request Call
                    </button>
                  </form>
                </>
              ) : (
                <div className="text-center py-6">
                  <div className="text-green-500 mb-4 flex justify-center">
                      <svg className="w-14 h-14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Request Received!</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">We'll be in touch shortly.</p>
                </div>
              )}
            </div>
          </MotionDiv>
        </div>
      )}
    </AnimatePresence>
  );
};
