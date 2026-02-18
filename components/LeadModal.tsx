
import React, { useState, useEffect, useRef } from 'react';
import { X, Calendar, Send, CheckCircle } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useData } from '../context/DataContext';
import { motion, AnimatePresence } from 'framer-motion';
import { SimpleCaptcha, CaptchaRef } from './SimpleCaptcha';

export const LeadModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { addLead } = useData();
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [submitted, setSubmitted] = useState(false);
  const captchaRef = useRef<CaptchaRef>(null);

  const MotionDiv = motion.div as any;

  useEffect(() => {
    const timer = setTimeout(() => {
      const alreadyShown = sessionStorage.getItem('leadModalShown');
      if (!alreadyShown) {
        setIsOpen(true);
        sessionStorage.setItem('leadModalShown', 'true');
      }
    }, 15000);
    return () => clearTimeout(timer);
  }, []);

  const closeModal = () => setIsOpen(false);

  const onSubmit = (data: any) => {
    if (captchaRef.current && !captchaRef.current.validate()) return;

    addLead({
      ...data,
      serviceInterest: 'Popup Request',
      message: data.message || 'Consultation request'
    });
    setSubmitted(true);
    setTimeout(() => { closeModal(); setSubmitted(false); reset(); }, 3000);
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
            initial={{ scale: 0.95, opacity: 0, y: 10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 10 }}
            className="bg-white dark:bg-dark-card w-full max-w-xs sm:max-w-sm rounded-xl shadow-2xl relative overflow-hidden flex flex-col mx-auto"
          >
            <button onClick={closeModal} className="absolute top-2 right-2 text-gray-400 z-10 p-1 bg-gray-100 dark:bg-gray-800 rounded-full">
                <X size={16} />
            </button>

            <div className="p-5">
              {!submitted ? (
                <>
                  <div className="text-center mb-3">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center justify-center gap-2">
                         <span className="bg-primary/10 text-primary p-1 rounded-md"><Calendar size={18} /></span>
                         Free Consultation
                    </h3>
                    <p className="text-gray-500 text-xs mt-1">Get expert advice for your business.</p>
                  </div>

                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-2.5">
                    <input 
                      {...register('name', { required: true })}
                      placeholder="Name"
                      className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:border-primary outline-none"
                    />
                    
                    <input 
                      {...register('phone', { required: true })}
                      placeholder="Phone Number"
                      className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:border-primary outline-none"
                    />

                    <input 
                      {...register('email', { required: true })}
                      placeholder="Email Address"
                      type="email"
                      className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:border-primary outline-none"
                    />

                    <textarea 
                        {...register('message')}
                        placeholder="What do you need help with?"
                        rows={2}
                        className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:border-primary outline-none resize-none"
                    />

                    <div className="scale-[0.85] origin-left -my-1">
                        <SimpleCaptcha ref={captchaRef} />
                    </div>

                    <button type="submit" className="w-full bg-primary text-white font-bold py-2 rounded-lg hover:bg-secondary text-sm flex items-center justify-center gap-2 shadow-md">
                      <Send size={14} /> Request Call
                    </button>
                  </form>
                </>
              ) : (
                <div className="text-center py-8">
                  <div className="text-green-500 mb-2 flex justify-center"><CheckCircle size={48} /></div>
                  <h3 className="text-lg font-bold">Received!</h3>
                  <p className="text-gray-500 text-xs">We'll contact you shortly.</p>
                </div>
              )}
            </div>
          </MotionDiv>
        </div>
      )}
    </AnimatePresence>
  );
};
