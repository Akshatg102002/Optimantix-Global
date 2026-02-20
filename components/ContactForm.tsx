
import React, { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { SimpleCaptcha, CaptchaRef } from './SimpleCaptcha';

interface ContactFormProps {
  defaultService?: string;
}

interface FormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  serviceInterest: string;
  message: string;
}

export const ContactForm: React.FC<ContactFormProps> = ({ defaultService = 'General Inquiry' }) => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState<{ success: boolean; message: string } | null>(null);
  const captchaRef = useRef<CaptchaRef>(null);

  const onSubmit = async (data: FormData) => {
    setSubmitResult(null);

    // 1. Check Captcha
    if (captchaRef.current && !captchaRef.current.validate()) {
      return;
    }

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
          subject: `New Lead: ${data.serviceInterest}`,
          from_name: "Optimantix Global Website",
          ...data,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setSubmitResult({ success: true, message: "Thank you! Your message has been sent successfully." });
        reset();
        captchaRef.current?.reset();
        // Clear success message after 5 seconds
        setTimeout(() => setSubmitResult(null), 5000);
      } else {
        setSubmitResult({ success: false, message: result.message || "Something went wrong. Please try again." });
      }
    } catch (error) {
      setSubmitResult({ success: false, message: "Network error. Please try again later." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white dark:bg-dark-card p-8 rounded-xl shadow-lg border border-gray-100 dark:border-gray-800">
      <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Request a Quote</h3>
      
      {submitResult && submitResult.success && (
        <div className="p-4 mb-6 bg-green-50 text-green-700 rounded-lg border border-green-200">
          {submitResult.message}
        </div>
      )}

      {submitResult && !submitResult.success && (
        <div className="p-4 mb-6 bg-red-50 text-red-700 rounded-lg border border-red-200">
          {submitResult.message}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <input 
            {...register('name', { required: 'Name is required' })}
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 dark:bg-dark dark:text-white rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
            placeholder="Full Name"
          />
          {errors.name && <span className="text-xs text-red-500 ml-1">{errors.name.message}</span>}
        </div>

        <div>
          <input 
            {...register('email', { 
              required: 'Email is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address"
              }
            })}
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 dark:bg-dark dark:text-white rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
            placeholder="Email Address"
          />
          {errors.email && <span className="text-xs text-red-500 ml-1">{errors.email.message}</span>}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
              <input 
              {...register('phone', { required: 'Phone is required' })}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 dark:bg-dark dark:text-white rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
              placeholder="Phone Number"
              />
              {errors.phone && <span className="text-xs text-red-500 ml-1">{errors.phone.message}</span>}
          </div>
          <div>
              <input 
              {...register('company')}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 dark:bg-dark dark:text-white rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
              placeholder="Company Name (Optional)"
              />
          </div>
        </div>

        <div>
          <select 
            {...register('serviceInterest')}
            defaultValue={defaultService}
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 dark:bg-dark dark:text-white rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
          >
            <option value="Digital Marketing">Digital Marketing</option>
            <option value="Marketplace Management">Marketplace Management</option>
            <option value="Web Development">Web Development</option>
            <option value="Graphic Design">Graphic Design</option>
            <option value="Hosting Solutions">Hosting Solutions</option>
            <option value="Communications">Communications</option>
            <option value="General Inquiry">General Inquiry</option>
          </select>
        </div>

        <div>
          <textarea 
            {...register('message', { required: 'Details are required' })}
            rows={4}
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 dark:bg-dark dark:text-white rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
            placeholder="Tell us about your goals and requirements..."
          />
          {errors.message && <span className="text-xs text-red-500 ml-1">{errors.message.message}</span>}
        </div>
        
        <SimpleCaptcha ref={captchaRef} />

        <button 
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-primary text-white font-semibold py-3 px-6 rounded-lg hover:bg-secondary transition-colors shadow-md disabled:opacity-70 flex justify-center items-center"
        >
          {isSubmitting ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Sending...
            </>
          ) : 'Request Free Quote'}
        </button>
      </form>
    </div>
  );
};
