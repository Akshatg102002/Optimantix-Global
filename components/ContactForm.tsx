import React, { useState, useRef, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { SimpleCaptcha, CaptchaRef } from './SimpleCaptcha';

const SERVICES_DATA: Record<string, string[]> = {
  "Digital Marketing": [
    "Search Engine Optimization (SEO)",
    "Pay-Per-Click Advertising (Google Ads / Meta Ads)",
    "Social Media Marketing",
    "Performance Marketing",
    "Content Marketing"
  ],
  "Marketplace Management": [
    "Amazon Account Management",
    "Flipkart Account Management",
    "Product Listing & Optimization",
    "Marketplace Advertising",
    "Inventory & Catalog Management"
  ],
  "Web Development": [
    "Website Design",
    "E-commerce Development",
    "Custom Web Applications",
    "Maintenance & Support"
  ],
  "Graphic Design": [
    "Logo Design",
    "Brand Identity",
    "Social Media Creatives",
    "Marketing Collateral"
  ],
  "Other": [
    "Hosting Solutions",
    "Communications",
    "General Inquiry"
  ]
};

interface FormData {
  fullName: string;
  companyName: string;
  workEmail: string;
  workPhone: string;
  serviceSubCategory: string;
  timeline: string;
  budget: string;
  message: string;
}

interface ContactFormProps {
  defaultService?: string;
}

export const ContactForm: React.FC<ContactFormProps> = ({ defaultService }) => {
  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm<FormData>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState<{ success: boolean; message: string } | null>(null);
  const captchaRef = useRef<CaptchaRef>(null);

  const [subServices] = useState<string[]>(Object.values(SERVICES_DATA).flat());

  useEffect(() => {
    if (defaultService) {
      const allServices = Object.values(SERVICES_DATA).flat();
      if (allServices.includes(defaultService)) {
        setValue('serviceSubCategory', defaultService);
      }
    }
  }, [defaultService, setValue]);

  const onSubmit = async (data: FormData) => {
    setSubmitResult(null);

    if (captchaRef.current && !captchaRef.current.validate()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // NOTE: To change the email address where submissions are sent, 
      // replace 'optimantixglobal@gmail.com' below with your desired email.
      // First time you submit to a new email, you will receive an activation request to that email.
      const response = await fetch("https://formsubmit.co/ajax/optimantixglobal@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify({
          _subject: `New Lead from ${data.fullName} for ${data.serviceSubCategory}`,
          _template: "table",
          Name: data.fullName,
          Company: data.companyName,
          Email: data.workEmail,
          Phone: data.workPhone,
          Service: data.serviceSubCategory,
          Timeline: data.timeline,
          Budget: data.budget,
          Message: data.message
        }),
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
    } catch {
      setSubmitResult({ success: false, message: "Network error. Please try again later." });
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClasses = "w-full px-4 py-2.5 bg-gray-50 border border-gray-200 text-gray-900 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition placeholder-gray-400 text-sm";
  const selectClasses = "w-full px-4 py-2.5 bg-gray-50 border border-gray-200 text-gray-900 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition appearance-none text-sm";

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 md:p-8">
      <h3 className="text-2xl font-bold text-gray-900 mb-6">Request a Quote</h3>
      
      {submitResult && (
        <div className={`p-3 mb-4 rounded-lg border text-sm ${submitResult.success ? 'bg-green-50 text-green-700 border-green-200' : 'bg-red-50 text-red-700 border-red-200'}`}>
          {submitResult.message}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Contact Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
                <input {...register('fullName', { required: 'Full Name is required' })} className={inputClasses} placeholder="Full Name*" />
                {errors.fullName && <span className="text-xs text-red-500 mt-1 block">{errors.fullName.message}</span>}
            </div>
            <div>
                <input {...register('companyName', { required: 'Company Name is required' })} className={inputClasses} placeholder="Company Name*" />
                {errors.companyName && <span className="text-xs text-red-500 mt-1 block">{errors.companyName.message}</span>}
            </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
                <input {...register('workEmail', { required: 'Work Email is required', pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: "Invalid email" }})} className={inputClasses} placeholder="Work Email*" />
                {errors.workEmail && <span className="text-xs text-red-500 mt-1 block">{errors.workEmail.message}</span>}
            </div>
            <div>
                <input {...register('workPhone', { required: 'Work Phone is required' })} className={inputClasses} placeholder="Phone Number*" />
                {errors.workPhone && <span className="text-xs text-red-500 mt-1 block">{errors.workPhone.message}</span>}
            </div>
        </div>

        {/* Services Required */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="md:col-span-2">
                <div className="relative">
                    <select {...register('serviceSubCategory', { required: 'Service is required' })} className={selectClasses}>
                        <option value="">Select Service*</option>
                        {subServices.map(service => (
                            <option key={service} value={service}>{service}</option>
                        ))}
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none text-gray-500">
                        <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" fillRule="evenodd"></path></svg>
                    </div>
                </div>
                {errors.serviceSubCategory && <span className="text-xs text-red-500 mt-1 block">{errors.serviceSubCategory.message}</span>}
            </div>
        </div>

        {/* Project Timeline & Budget */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="relative">
                <select {...register('timeline', { required: 'Timeline is required' })} className={selectClasses}>
                <option value="">Select Timeline*</option>
                <option value="Immediate Start">Immediate Start (High Priority)</option>
                <option value="Within 15 Days">Within 15 Days</option>
                <option value="Within 30 Days">Within 30 Days</option>
                <option value="1–2 Months">1–2 Months</option>
                <option value="Just Exploring">Just Exploring Options</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none text-gray-500">
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" fillRule="evenodd"></path></svg>
                </div>
                {errors.timeline && <span className="text-xs text-red-500 mt-1 block">{errors.timeline.message}</span>}
            </div>
            <div>
                <input {...register('budget', { required: 'Budget is required' })} className={inputClasses} placeholder="Estimated Budget*" />
                {errors.budget && <span className="text-xs text-red-500 mt-1 block">{errors.budget.message}</span>}
            </div>
        </div>

        {/* Project Details */}
        <div>
            <textarea {...register('message', { required: 'Message is required' })} rows={3} className={inputClasses} placeholder="Tell us about your project requirements...*"></textarea>
            {errors.message && <span className="text-xs text-red-500 mt-1 block">{errors.message.message}</span>}
        </div>
        
        <SimpleCaptcha ref={captchaRef} isDarkTheme={false} />

        <button type="submit" disabled={isSubmitting} className="w-full bg-primary text-white font-bold py-3 px-6 rounded-lg hover:bg-secondary transition-all shadow-md hover:shadow-lg disabled:opacity-70 flex justify-center items-center text-base transform hover:-translate-y-0.5">
          {isSubmitting ? 'Sending...' : 'Submit Request'}
        </button>
      </form>
    </div>
  );
};
