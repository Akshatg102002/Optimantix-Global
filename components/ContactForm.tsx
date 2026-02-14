
import React, { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { useData } from '../context/DataContext';
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
  const { addLead } = useData();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const captchaRef = useRef<CaptchaRef>(null);

  const onSubmit = (data: FormData) => {
    if (captchaRef.current && !captchaRef.current.validate()) {
      return;
    }

    addLead(data);
    setIsSubmitted(true);
    reset();
    captchaRef.current?.reset();
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  return (
    <div className="bg-white dark:bg-dark-card p-8 rounded-xl shadow-lg border border-gray-100 dark:border-gray-800">
      <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Request a Quote</h3>
      
      {isSubmitted ? (
        <div className="p-4 bg-green-50 text-green-700 rounded-md border border-green-200">
          Thank you! We received your inquiry and will contact you shortly to discuss your project.
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Full Name</label>
            <input 
              {...register('name', { required: 'Name is required' })}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 dark:bg-dark dark:text-white rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
              placeholder="John Doe"
            />
            {errors.name && <span className="text-xs text-red-500">{errors.name.message}</span>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email Address</label>
            <input 
              {...register('email', { 
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address"
                }
              })}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 dark:bg-dark dark:text-white rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
              placeholder="john@example.com"
            />
            {errors.email && <span className="text-xs text-red-500">{errors.email.message}</span>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Phone Number</label>
                <input 
                {...register('phone', { required: 'Phone is required' })}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 dark:bg-dark dark:text-white rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
                placeholder="+91..."
                />
                {errors.phone && <span className="text-xs text-red-500">{errors.phone.message}</span>}
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Company</label>
                <input 
                {...register('company')}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 dark:bg-dark dark:text-white rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
                placeholder="Business Name"
                />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Service Interest</label>
            <select 
              {...register('serviceInterest')}
              defaultValue={defaultService}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 dark:bg-dark dark:text-white rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
            >
              <option value="Digital Marketing">Digital Marketing</option>
              <option value="Marketplace Management">Marketplace Management</option>
              <option value="Web & App Development">Web & App Development</option>
              <option value="Graphic Design">Graphic Design</option>
              <option value="Hosting Solutions">Hosting Solutions</option>
              <option value="Communications">Communications</option>
              <option value="General Inquiry">General Inquiry</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Project Details</label>
            <textarea 
              {...register('message', { required: 'Message is required' })}
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 dark:bg-dark dark:text-white rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
              placeholder="Tell us about your goals and requirements..."
            />
            {errors.message && <span className="text-xs text-red-500">{errors.message.message}</span>}
          </div>
          
          <SimpleCaptcha ref={captchaRef} />

          <button 
            type="submit"
            className="w-full bg-primary text-white font-semibold py-3 px-6 rounded-lg hover:bg-secondary transition-colors shadow-md"
          >
            Request Free Quote
          </button>
        </form>
      )}
    </div>
  );
};
