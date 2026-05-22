import React, { useState } from 'react';

export const SeoAuditForm: React.FC = () => {
    // Just a placeholder contact form component mapped to user's fields
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        url: '',
        type: '',
        budget: '',
        challenge: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Set success state to show the success portion
        setStatus('submitting');
        setTimeout(() => {
            setStatus('success');
        }, 1000);
    };

    if (status === 'success') {
       return (
            <div className="success-screen p-8 text-center bg-gray-50 rounded-2xl" id="success-screen">
                <div className="success-icon w-16 h-16 rounded-full bg-green-100 border-2 border-green-700 flex items-center justify-center mx-auto mb-6 text-2xl text-green-700">✓</div>
                <h3 className="font-syne text-2xl font-bold text-gray-900 mb-3">Audit Request Received!</h3>
                <p className="text-sm text-gray-600 max-w-md mx-auto leading-relaxed">Thanks! Our SEO team has received your request and will deliver your personalised audit report within <strong>48 hours</strong>. Check your email inbox.</p>
                <div className="success-next flex flex-col gap-3 max-w-sm mx-auto mt-8">
                    <div className="sn-item bg-white border border-gray-200 rounded-lg p-4 flex gap-3 text-left">
                        <div className="sn-num font-syne text-lg font-bold text-orange-500 opacity-80 min-w-[24px]">1</div>
                        <div className="sn-text text-sm text-gray-800 leading-relaxed"><strong className="block font-medium text-gray-900 mb-1">Check your inbox</strong>We'll send a confirmation email shortly with next steps.</div>
                    </div>
                    <div className="sn-item bg-white border border-gray-200 rounded-lg p-4 flex gap-3 text-left">
                        <div className="sn-num font-syne text-lg font-bold text-orange-500 opacity-80 min-w-[24px]">2</div>
                        <div className="sn-text text-sm text-gray-800 leading-relaxed"><strong className="block font-medium text-gray-900 mb-1">Receive your audit report</strong>A detailed SEO health report lands in 24–48 hours.</div>
                    </div>
                    <div className="sn-item bg-white border border-gray-200 rounded-lg p-4 flex gap-3 text-left">
                        <div className="sn-num font-syne text-lg font-bold text-orange-500 opacity-80 min-w-[24px]">3</div>
                        <div className="sn-text text-sm text-gray-800 leading-relaxed"><strong className="block font-medium text-gray-900 mb-1">Free strategy call</strong>Our expert will walk you through findings and recommend a growth plan.</div>
                    </div>
                </div>
            </div>
       );
    }

    return (
        <form onSubmit={handleSubmit} className="form-wrap bg-white rounded-t-2xl p-8 relative top-0 text-gray-900" id="audit-form">
            <div className="form-header mb-6">
                <div className="form-tag inline-block text-xs font-bold tracking-widest uppercase bg-green-100 text-green-800 px-3 py-1 rounded mb-3">Start your free audit</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2 font-syne">Request Your Free SEO Audit</h3>
                <p className="text-sm text-gray-600 leading-relaxed">Fill in your details and our team will get back to you within 24 hours.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                <div className="form-group">
                    <label className="form-label text-xs font-medium text-gray-900 mb-1.5 block">Full Name <span className="text-orange-500">*</span></label>
                    <input required className="form-input w-full p-3 border border-gray-300 rounded-lg text-sm bg-white outline-none focus:border-orange-500 transition-colors" type="text" placeholder="Rahul Sharma" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                </div>
                <div className="form-group">
                    <label className="form-label text-xs font-medium text-gray-900 mb-1.5 block">Phone Number <span className="text-orange-500">*</span></label>
                    <input required className="form-input w-full p-3 border border-gray-300 rounded-lg text-sm bg-white outline-none focus:border-orange-500 transition-colors" type="tel" placeholder="+91 98765 43210" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
                </div>
            </div>

            <div className="form-group mb-4">
                <label className="form-label text-xs font-medium text-gray-900 mb-1.5 block">Business Email <span className="text-orange-500">*</span></label>
                <input required className="form-input w-full p-3 border border-gray-300 rounded-lg text-sm bg-white outline-none focus:border-orange-500 transition-colors" type="email" placeholder="you@yourcompany.com" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
            </div>

            <div className="form-group mb-4">
                <label className="form-label text-xs font-medium text-gray-900 mb-1.5 block">Website URL <span className="text-orange-500">*</span></label>
                <input required className="form-input w-full p-3 border border-gray-300 rounded-lg text-sm bg-white outline-none focus:border-orange-500 transition-colors" type="url" placeholder="https://www.yourwebsite.com" value={formData.url} onChange={e => setFormData({...formData, url: e.target.value})} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                <div className="form-group">
                    <label className="form-label text-xs font-medium text-gray-900 mb-1.5 block">Business Type</label>
                    <select className="form-input w-full p-3 border border-gray-300 rounded-lg text-sm bg-white outline-none focus:border-orange-500 transition-colors" value={formData.type} onChange={e => setFormData({...formData, type: e.target.value})}>
                        <option value="" disabled>Select type</option>
                        <option>Ecommerce / D2C</option>
                        <option>Shopify Store</option>
                        <option>B2B / SaaS</option>
                        <option>Local Business</option>
                        <option>Enterprise / Brand</option>
                        <option>Startup</option>
                        <option>Other</option>
                    </select>
                </div>
                <div className="form-group">
                    <label className="form-label text-xs font-medium text-gray-900 mb-1.5 block">Monthly SEO Budget</label>
                    <select className="form-input w-full p-3 border border-gray-300 rounded-lg text-sm bg-white outline-none focus:border-orange-500 transition-colors" value={formData.budget} onChange={e => setFormData({...formData, budget: e.target.value})}>
                        <option value="" disabled>Select range</option>
                        <option>Under ₹15,000</option>
                        <option>₹15,000 – ₹30,000</option>
                        <option>₹30,000 – ₹60,000</option>
                        <option>₹60,000 – ₹1,00,000</option>
                        <option>Above ₹1,00,000</option>
                    </select>
                </div>
            </div>

            <div className="form-group mb-6">
                <label className="form-label text-xs font-medium text-gray-900 mb-1.5 block">What's your biggest SEO challenge?</label>
                <textarea className="form-input w-full p-3 border border-gray-300 rounded-lg text-sm bg-white outline-none focus:border-orange-500 transition-colors resize-none h-20" placeholder="e.g. No organic traffic, low rankings, recently penalised..." value={formData.challenge} onChange={e => setFormData({...formData, challenge: e.target.value})}></textarea>
            </div>

            <button type="submit" disabled={status === 'submitting'} className="form-submit w-full p-4 bg-orange-500 text-white rounded-lg font-syne text-sm font-bold cursor-pointer hover:opacity-90 transition-opacity mt-1 disabled:opacity-50">
                {status === 'submitting' ? 'Submitting...' : 'Get My Free SEO Audit →'}
            </button>

            <div className="form-divider flex items-center gap-2.5 my-5">
                <div className="flex-1 h-[1px] bg-gray-200"></div>
                <span className="text-xs text-gray-500">or reach us directly</span>
                <div className="flex-1 h-[1px] bg-gray-200"></div>
            </div>

            <a className="wa-btn w-full p-3 bg-[#25d366] text-white rounded-lg font-syne text-sm font-bold flex items-center justify-center gap-2 text-decoration-none hover:opacity-90 transition-opacity" href="https://wa.me/919910343016?text=Hi%20Optimantix%2C%20I%27d%20like%20a%20free%20SEO%20audit%20for%20my%20website." target="_blank" rel="noreferrer">
                <div className="wa-icon w-5 h-5 bg-white rounded-full flex items-center justify-center text-[#25d366] text-xs">W</div>
                Chat on WhatsApp — Get Instant Reply
            </a>

            <p className="form-note text-center text-xs text-gray-500 mt-4 leading-relaxed">
                We respect your privacy. Your details are never shared with third parties.<br/>No spam. No sales pressure. Just your audit report.
            </p>
        </form>
    );
};
