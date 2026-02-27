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
  serviceCategory: string;
  serviceSubCategory: string;
  timeline: string;
  budget: string;
  goals: string[];
  message: string;
  referenceLinks?: string;
}

interface ContactFormProps {
  defaultService?: string;
}

export const ContactForm: React.FC<ContactFormProps> = ({ defaultService }) => {
  const { register, handleSubmit, reset, watch, setValue, formState: { errors } } = useForm<FormData>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState<{ success: boolean; message: string } | null>(null);
  const captchaRef = useRef<CaptchaRef>(null);

  const selectedCategory = watch('serviceCategory');
  const [subServices, setSubServices] = useState<string[]>([]);

  useEffect(() => {
    if (defaultService) {
      for (const [category, services] of Object.entries(SERVICES_DATA)) {
        if (services.includes(defaultService)) {
          setValue('serviceCategory', category);
          setSubServices(services);
          setValue('serviceSubCategory', defaultService);
          return;
        }
        if (category === defaultService) {
             setValue('serviceCategory', category);
             setSubServices(SERVICES_DATA[category]);
             return;
        }
      }
    }
  }, [defaultService, setValue]);

  const onCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const category = e.target.value;
    if (category && SERVICES_DATA[category]) {
      setSubServices(SERVICES_DATA[category]);
      setValue('serviceSubCategory', '');
    } else {
      setSubServices([]);
      setValue('serviceSubCategory', '');
    }
  };

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
    } catch {
      setSubmitResult({ success: false, message: "Network error. Please try again later." });
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClasses = "w-full mt-1 px-4 py-3 bg-white/10 border border-white/20 text-white rounded-lg focus:ring-2 focus:ring-white/50 focus:border-transparent outline-none transition placeholder-white/50";
  const labelClasses = "text-sm font-medium text-white/90";
  const selectClasses = "w-full mt-1 px-4 py-3 bg-white/10 border border-white/20 text-white rounded-lg focus:ring-2 focus:ring-white/50 focus:border-transparent outline-none transition appearance-none";

  return (
    <div className="bg-primary rounded-[2rem] overflow-hidden shadow-2xl shadow-primary/20 relative p-8 md:p-10">
      {/* Background effects */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-black/10 rounded-full blur-3xl -translate-x-1/3 translate-y-1/3 pointer-events-none"></div>

      <h3 className="text-3xl font-bold text-white mb-8 relative z-10">Request a Quote</h3>
      
      {submitResult && (
        <div className={`p-4 mb-6 rounded-lg border relative z-10 ${submitResult.success ? 'bg-green-500/20 text-green-100 border-green-500/30' : 'bg-red-500/20 text-red-100 border-red-500/30'}`}>
          {submitResult.message}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 relative z-10">
        {/* Contact Information */}
        <fieldset className="space-y-4">
          <legend className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <span>👤</span> Contact Information
          </legend>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
                <label className={labelClasses}>Full Name*</label>
                <input {...register('fullName', { required: 'Full Name is required' })} className={inputClasses} placeholder="John Doe" />
                {errors.fullName && <span className="text-xs text-red-200 mt-1 block">{errors.fullName.message}</span>}
            </div>
            <div>
                <label className={labelClasses}>Company Name*</label>
                <input {...register('companyName', { required: 'Company Name is required' })} className={inputClasses} placeholder="Your Company" />
                {errors.companyName && <span className="text-xs text-red-200 mt-1 block">{errors.companyName.message}</span>}
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
                <label className={labelClasses}>Work Email*</label>
                <input {...register('workEmail', { required: 'Work Email is required', pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: "Invalid email" }})} className={inputClasses} placeholder="name@company.com" />
                {errors.workEmail && <span className="text-xs text-red-200 mt-1 block">{errors.workEmail.message}</span>}
            </div>
            <div>
                <label className={labelClasses}>Phone Number*</label>
                <input {...register('workPhone', { required: 'Work Phone is required' })} className={inputClasses} placeholder="+1 (555) 000-0000" />
                {errors.workPhone && <span className="text-xs text-red-200 mt-1 block">{errors.workPhone.message}</span>}
            </div>
          </div>
        </fieldset>

        {/* Services Required */}
        <fieldset className="space-y-4">
          <legend className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <span>🧩</span> Services Required*
          </legend>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
                <label className={labelClasses}>Service Category</label>
                <div className="relative">
                    <select 
                      {...register('serviceCategory', { 
                        required: 'Category is required',
                        onChange: onCategoryChange 
                      })} 
                      className={selectClasses}
                    >
                        <option value="" className="text-gray-800">Select Category</option>
                        {Object.keys(SERVICES_DATA).map(category => (
                            <option key={category} value={category} className="text-gray-800">{category}</option>
                        ))}
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none text-white">
                        <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" fillRule="evenodd"></path></svg>
                    </div>
                </div>
                {errors.serviceCategory && <span className="text-xs text-red-200 mt-1 block">{errors.serviceCategory.message}</span>}
            </div>
            <div>
                <label className={labelClasses}>Specific Service</label>
                <div className="relative">
                    <select {...register('serviceSubCategory', { required: 'Service is required' })} className={selectClasses} disabled={!selectedCategory}>
                        <option value="" className="text-gray-800">Select Service</option>
                        {subServices.map(service => (
                            <option key={service} value={service} className="text-gray-800">{service}</option>
                        ))}
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none text-white">
                        <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" fillRule="evenodd"></path></svg>
                    </div>
                </div>
                {errors.serviceSubCategory && <span className="text-xs text-red-200 mt-1 block">{errors.serviceSubCategory.message}</span>}
            </div>
          </div>
        </fieldset>

        {/* Project Timeline & Budget */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <fieldset>
            <legend className="text-lg font-bold text-white mb-2 flex items-center gap-2"><span>⏳</span> Timeline*</legend>
            <div className="relative">
                <select {...register('timeline', { required: 'Timeline is required' })} className={selectClasses}>
                <option value="" className="text-gray-800">Select Timeline</option>
                <option value="Immediate Start" className="text-gray-800">Immediate Start (High Priority)</option>
                <option value="Within 15 Days" className="text-gray-800">Within 15 Days</option>
                <option value="Within 30 Days" className="text-gray-800">Within 30 Days</option>
                <option value="1–2 Months" className="text-gray-800">1–2 Months</option>
                <option value="Just Exploring" className="text-gray-800">Just Exploring Options</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none text-white">
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" fillRule="evenodd"></path></svg>
                </div>
            </div>
            {errors.timeline && <span className="text-xs text-red-200 mt-1 block">{errors.timeline.message}</span>}
          </fieldset>
          <fieldset>
            <legend className="text-lg font-bold text-white mb-2 flex items-center gap-2"><span>💰</span> Budget*</legend>
            <div className="relative">
                <select {...register('budget', { required: 'Budget is required' })} className={selectClasses}>
                <option value="" className="text-gray-800">Select Budget</option>
                <option value="0-50k" className="text-gray-800">₹0 – ₹50,000</option>
                <option value="50k-1L" className="text-gray-800">₹50,000 – ₹1,00,000</option>
                <option value="1L-5L" className="text-gray-800">₹1,00,000 – ₹5,00,000</option>
                <option value="5L+" className="text-gray-800">₹5,00,000 and Above</option>
                <option value="TBD" className="text-gray-800">Prefer to Discuss</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none text-white">
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" fillRule="evenodd"></path></svg>
                </div>
            </div>
            {errors.budget && <span className="text-xs text-red-200 mt-1 block">{errors.budget.message}</span>}
          </fieldset>
        </div>

        {/* Project Goals */}
        <fieldset>
          <legend className="text-lg font-bold text-white mb-2 flex items-center gap-2"><span>🎯</span> Goals</legend>
           <div className="grid grid-cols-2 gap-2 mt-2">
             {['Generate Leads', 'Increase Sales', 'Brand Awareness', 'New Product Launch', 'Online Presence', 'Other'].map(goal => (
                <div key={goal}><label className="flex items-center text-white/90 cursor-pointer hover:text-white"><input type="checkbox" {...register('goals')} value={goal} className="mr-2 rounded border-white/30 bg-white/10 text-primary focus:ring-offset-0 focus:ring-white/50" />{goal}</label></div>
              ))}
           </div>
        </fieldset>

        {/* Project Details */}
        <fieldset>
            <legend className="text-lg font-bold text-white mb-2 flex items-center gap-2"><span>📝</span> Message*</legend>
            <textarea {...register('message', { required: 'Message is required' })} rows={4} className={inputClasses} placeholder="Tell us about your project requirements..."></textarea>
            {errors.message && <span className="text-xs text-red-200 mt-1 block">{errors.message.message}</span>}
        </fieldset>
        
        <fieldset>
            <legend className="text-lg font-bold text-white mb-2 flex items-center gap-2"><span>🔗</span> Links</legend>
            <input {...register('referenceLinks')} className={inputClasses} placeholder="Website, social media, or competitor links (Optional)" />
        </fieldset>

        <SimpleCaptcha ref={captchaRef} isDarkTheme={true} />

        <button type="submit" disabled={isSubmitting} className="w-full bg-white text-primary font-bold py-4 px-6 rounded-xl hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl disabled:opacity-70 flex justify-center items-center text-lg transform hover:-translate-y-1">
          {isSubmitting ? 'Sending...' : 'Submit Request'}
        </button>
      </form>
    </div>
  );
};
