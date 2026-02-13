import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useData } from '../context/DataContext';

interface ContactFormProps {
  defaultService?: string;
}

interface FormData {
  name: string;
  email: string;
  phone: string;
  serviceInterest: string;
  message: string;
}

export const ContactForm: React.FC<ContactFormProps> = ({ defaultService = 'General Inquiry' }) => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>();
  const { addLead } = useData();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const onSubmit = (data: FormData) => {
    addLead(data);
    setIsSubmitted(true);
    reset();
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  return (
    <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
      <h3 className="text-2xl font-bold text-gray-800 mb-6">Get in Touch</h3>
      
      {isSubmitted ? (
        <div className="p-4 bg-green-50 text-green-700 rounded-md border border-green-200">
          Thank you! We received your inquiry and will contact you shortly.
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input 
              {...register('name', { required: 'Name is required' })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
              placeholder="John Doe"
            />
            {errors.name && <span className="text-xs text-red-500">{errors.name.message}</span>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <input 
              {...register('email', { 
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address"
                }
              })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
              placeholder="john@example.com"
            />
            {errors.email && <span className="text-xs text-red-500">{errors.email.message}</span>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
            <input 
              {...register('phone', { required: 'Phone is required' })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
              placeholder="+1 (555) 000-0000"
            />
            {errors.phone && <span className="text-xs text-red-500">{errors.phone.message}</span>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Service Interest</label>
            <select 
              {...register('serviceInterest')}
              defaultValue={defaultService}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition bg-white"
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
            <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
            <textarea 
              {...register('message', { required: 'Message is required' })}
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
              placeholder="Tell us about your project..."
            />
            {errors.message && <span className="text-xs text-red-500">{errors.message.message}</span>}
          </div>

          <button 
            type="submit"
            className="w-full bg-gradient-to-r from-primary to-secondary text-white font-semibold py-3 px-6 rounded-lg hover:opacity-90 transition-opacity shadow-md"
          >
            Send Message
          </button>
        </form>
      )}
    </div>
  );
};