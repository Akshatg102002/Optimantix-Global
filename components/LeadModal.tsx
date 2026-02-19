import React, { useState, useEffect, useRef } from 'react';
import { X, Calendar, Send, CheckCircle } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';
import { SimpleCaptcha, CaptchaRef } from './SimpleCaptcha';

export const LeadModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
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

  const onSubmit = async (data: any) => {
    if (captchaRef.current && !captchaRef.current.validate()) return;

    setIsSubmitting(true);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: "96c96747-780b-479e-b0d6-4aba911bc9a4",
          subject: "New Lead: Popup Request",
          from_name: "Optimantix Global Website",
          serviceInterest: 'Popup Request',
          ...data,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setSubmitted(true);
        reset();
        captchaRef.current?.reset();
        setTimeout(() => { 
          closeModal(); 
          setSubmitted(false); 
        }, 3000);
      } else {
        console.error("Form submission failed", result);
      }
    } catch (error) {
      console.error("Network error", error);
    } finally {
      setIsSubmitting(false);
    }
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
            <button onClick={closeModal} className="absolute top-2 right-2 text-gray-400 z-10 p-1 bg-gray-100 dark:bg-gray-800 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
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
                      className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:border-primary outline-none transition-colors"
                    />
                    
                    <input 
                      {...register('phone', { required: true })}
                      placeholder="Phone Number"
                      className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:border-primary outline-none transition-colors"
                    />

                    <input 
                      {...register('email', { required: true })}
                      placeholder="Email Address"
                      type="email"
                      className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:border-primary outline-none transition-colors"
                    />

                    <textarea 
                        {...register('message')}
                        placeholder="What do you need help with?"
                        rows={2}
                        className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:border-primary outline-none resize-none transition-colors"
                    />

                    <div className="scale-[0.85] origin-left -my-1">
                        <SimpleCaptcha ref={captchaRef} />
                    </div>

                    <button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="w-full bg-primary text-white font-bold py-2 rounded-lg hover:bg-secondary text-sm flex items-center justify-center gap-2 shadow-md disabled:opacity-70 transition-colors"
                    >
                      {isSubmitting ? (
                        <>
                           <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Sending...
                        </>
                      ) : (
                        <>
                          <Send size={14} /> Request Call
                        </>
                      )}
                    </button>
                  </form>
                </>
              ) : (
                <div className="text-center py-8">
                  <div className="text-green-500 mb-2 flex justify-center"><CheckCircle size={48} /></div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">Received!</h3>
                  <p className="text-gray-500 text-xs mt-1">We'll contact you shortly.</p>
                </div>
              )}
            </div>
          </MotionDiv>
        </div>
      )}
    </AnimatePresence>
  );
};
