
import React, { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { SimpleCaptcha, CaptchaRef } from './SimpleCaptcha';

interface FormData {
  fullName: string;
  companyName: string;
  workEmail: string;
  workPhone: string;
  services: string[];
  timeline: string;
  budget: string;
  goals: string[];
  message: string;
  referenceLinks?: string;
}

export const ContactForm: React.FC = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState<{ success: boolean; message: string } | null>(null);
  const captchaRef = useRef<CaptchaRef>(null);

  const onSubmit = async (data: FormData) => {
    setSubmitResult(null);

    if (captchaRef.current && !captchaRef.current.validate()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (result.success) {
        setSubmitResult({ success: true, message: "Thank you! Your message has been sent successfully." });
        reset();
        captchaRef.current?.reset();
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
      
      {submitResult && (
        <div className={`p-4 mb-6 rounded-lg border ${submitResult.success ? 'bg-green-50 text-green-700 border-green-200' : 'bg-red-50 text-red-700 border-red-200'}`}>
          {submitResult.message}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Contact Information */}
        <fieldset className="space-y-4">
          <legend className="text-lg font-bold text-gray-800 dark:text-white">👤 Contact Information</legend>
          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Full Name*</label>
            <input {...register('fullName', { required: 'Full Name is required' })} className="w-full mt-1 px-4 py-3 border border-gray-300 dark:border-gray-700 dark:bg-dark dark:text-white rounded-lg focus:ring-2 focus:ring-primary" placeholder="Enter your first and last name" />
            {errors.fullName && <span className="text-xs text-red-500">{errors.fullName.message}</span>}
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Company / Brand Name*</label>
            <input {...register('companyName', { required: 'Company Name is required' })} className="w-full mt-1 px-4 py-3 border border-gray-300 dark:border-gray-700 dark:bg-dark dark:text-white rounded-lg focus:ring-2 focus:ring-primary" placeholder="Registered company or brand name" />
            {errors.companyName && <span className="text-xs text-red-500">{errors.companyName.message}</span>}
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Work Email Address*</label>
            <input {...register('workEmail', { required: 'Work Email is required', pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: "Invalid email" }})} className="w-full mt-1 px-4 py-3 border border-gray-300 dark:border-gray-700 dark:bg-dark dark:text-white rounded-lg focus:ring-2 focus:ring-primary" placeholder="e.g., name@company.com" />
            {errors.workEmail && <span className="text-xs text-red-500">{errors.workEmail.message}</span>}
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Work Phone Number*</label>
            <input {...register('workPhone', { required: 'Work Phone is required' })} className="w-full mt-1 px-4 py-3 border border-gray-300 dark:border-gray-700 dark:bg-dark dark:text-white rounded-lg focus:ring-2 focus:ring-primary" placeholder="Include country code (e.g., +91, +1)" />
            {errors.workPhone && <span className="text-xs text-red-500">{errors.workPhone.message}</span>}
          </div>
        </fieldset>

        {/* Services Required */}
        <fieldset>
          <legend className="text-lg font-bold text-gray-800 dark:text-white">🧩 Services Required*</legend>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
            {/* Service categories can be generated from a constant if dynamic */}
            <div>
              <h4 className="font-semibold">📈 Digital Marketing</h4>
              {['Search Engine Optimization (SEO)', 'Pay-Per-Click Advertising (Google Ads / Meta Ads)', 'Social Media Marketing', 'Performance Marketing', 'Content Marketing'].map(service => (
                <div key={service}><label className="flex items-center"><input type="checkbox" {...register('services')} value={service} className="mr-2" />{service}</label></div>
              ))}
            </div>
            <div>
              <h4 className="font-semibold">🛒 Marketplace Management</h4>
              {['Amazon Account Management', 'Flipkart Account Management', 'Product Listing & Optimization', 'Marketplace Advertising', 'Inventory & Catalog Management'].map(service => (
                <div key={service}><label className="flex items-center"><input type="checkbox" {...register('services')} value={service} className="mr-2" />{service}</label></div>
              ))}
            </div>
            {/* Add other service categories here */}
          </div>
        </fieldset>

        {/* Project Timeline & Budget */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <fieldset>
            <legend className="text-lg font-bold text-gray-800 dark:text-white">⏳ Project Timeline*</legend>
            <select {...register('timeline', { required: 'Timeline is required' })} className="w-full mt-2 px-4 py-3 border border-gray-300 dark:border-gray-700 dark:bg-dark dark:text-white rounded-lg focus:ring-2 focus:ring-primary">
              <option value="">When would you like to get started?</option>
              <option>Immediate Start (High Priority)</option>
              <option>Within 15 Days</option>
              <option>Within 30 Days</option>
              <option>1–2 Months</option>
              <option>Just Exploring Options</option>
            </select>
            {errors.timeline && <span className="text-xs text-red-500">{errors.timeline.message}</span>}
          </fieldset>
          <fieldset>
            <legend className="text-lg font-bold text-gray-800 dark:text-white">💰 Estimated Budget Range*</legend>
            <select {...register('budget', { required: 'Budget is required' })} className="w-full mt-2 px-4 py-3 border border-gray-300 dark:border-gray-700 dark:bg-dark dark:text-white rounded-lg focus:ring-2 focus:ring-primary">
              <option value="">Select Budget</option>
              <option>₹0 – ₹50,000</option>
              <option>₹50,000 – ₹1,00,000</option>
              <option>₹1,00,000 – ₹5,00,000</option>
              <option>₹5,00,000 and Above</option>
              <option>Prefer to Discuss</option>
            </select>
            {errors.budget && <span className="text-xs text-red-500">{errors.budget.message}</span>}
          </fieldset>
        </div>

        {/* Project Goals */}
        <fieldset>
          <legend className="text-lg font-bold text-gray-800 dark:text-white">🎯 Project Goals</legend>
           <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-2">
             {['Generate More Leads', 'Increase Sales', 'Improve Brand Awareness', 'Launch a New Product/Business', 'Improve Online Presence', 'Other'].map(goal => (
                <div key={goal}><label className="flex items-center"><input type="checkbox" {...register('goals')} value={goal} className="mr-2" />{goal}</label></div>
              ))}
           </div>
        </fieldset>

        {/* Project Details */}
        <fieldset>
            <legend className="text-lg font-bold text-gray-800 dark:text-white">📝 Project Details / Message*</legend>
            <textarea {...register('message', { required: 'Message is required' })} rows={5} className="w-full mt-2 px-4 py-3 border border-gray-300 dark:border-gray-700 dark:bg-dark dark:text-white rounded-lg focus:ring-2 focus:ring-primary" placeholder="Briefly describe your requirements..."></textarea>
            {errors.message && <span className="text-xs text-red-500">{errors.message.message}</span>}
        </fieldset>
        
        <fieldset>
            <legend className="text-lg font-bold text-gray-800 dark:text-white">🔗 Reference Links (Optional)</legend>
            <input {...register('referenceLinks')} className="w-full mt-2 px-4 py-3 border border-gray-300 dark:border-gray-700 dark:bg-dark dark:text-white rounded-lg focus:ring-2 focus:ring-primary" placeholder="Share any website, social media page, or competitor links" />
        </fieldset>

        <SimpleCaptcha ref={captchaRef} />

        <button type="submit" disabled={isSubmitting} className="w-full bg-primary text-white font-semibold py-4 px-6 rounded-lg hover:bg-secondary transition-colors shadow-lg disabled:opacity-70 flex justify-center items-center text-lg">
          {isSubmitting ? 'Sending...' : '✅ Submit'}
        </button>
      </form>
    </div>
  );
};
