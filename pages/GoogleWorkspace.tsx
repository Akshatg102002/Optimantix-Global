
import React from 'react';
import { Check, Zap, Users, Globe, Layout, Database, HelpCircle, ArrowRight, Mail } from 'lucide-react';
import { motion } from 'framer-motion';
import { SEO } from '../components/SEO';

export const GoogleWorkspace: React.FC = () => {
  const benefits = [
    {
      title: "INR Billing & GST-Compliant Invoices",
      description: "No USD conversion required. We raise proper GST invoices so your finance team can seamlessly claim Input Tax Credit (ITC).",
      icon: <Database className="w-6 h-6" />
    },
    {
      title: "Better Pricing Than Google Direct",
      description: "As an authorized reseller partner, we offer rates that are often lower than those available on google.com/workspace, plus introductory discounts for new customers.",
      icon: <Zap className="w-6 h-6" />
    },
    {
      title: "Free Email Migration Support",
      description: "Migrating from cPanel, Zoho Mail, Outlook, or GoDaddy? Our team handles the full migration — emails, contacts, and calendars — with minimal to zero downtime.",
      icon: <Mail className="w-6 h-6" />
    },
    {
      title: "End-to-End Onboarding & Setup",
      description: "From domain verification and DNS configuration to user account creation, we manage the complete setup so your team is productive from Day 1.",
      icon: <Layout className="w-6 h-6" />
    },
    {
      title: "Dedicated Local Support",
      description: "Get direct support from our India-based team in your timezone. No international ticket queues, no waiting days for a response.",
      icon: <Users className="w-6 h-6" />
    },
    {
      title: "Flexible Scaling",
      description: "Add or remove users anytime. Whether you're a 5-person startup or a 500-seat enterprise, we grow with you.",
      icon: <Globe className="w-6 h-6" />
    }
  ];

  const plans = [
    {
      name: "BUSINESS STARTER",
      price: "₹161",
      intro: "Intro offer from ₹125/user/month",
      bestFor: "Small teams, startups, and freelancers",
      features: [
        "Custom business email (you@yourcompany.com)",
        "30 GB pooled Google Drive storage per user",
        "Google Meet video calls (100 participants)",
        "Gmail, Docs, Sheets, Slides, Forms, etc.",
        "Standard security and admin controls",
        "Supports up to 300 users"
      ]
    },
    {
      name: "BUSINESS STANDARD",
      price: "₹864",
      popular: true,
      bestFor: "Growing teams that need more storage",
      features: [
        "Everything in Business Starter, plus:",
        "2 TB pooled Google Drive storage per user",
        "Google Meet (150 participants) + recording",
        "Shared drives for teams",
        "Advanced admin controls",
        "Noise cancellation in Meet",
        "Supports up to 300 users"
      ]
    },
    {
      name: "BUSINESS PLUS",
      price: "₹1,700",
      bestFor: "Businesses needing enhanced security",
      features: [
        "Everything in Business Standard, plus:",
        "5 TB pooled Google Drive storage per user",
        "Google Meet (500 participants)",
        "eDiscovery and audit reporting",
        "Advanced endpoint management",
        "Enhanced security and compliance",
        "Supports up to 300 users"
      ]
    },
    {
      name: "ENTERPRISE",
      price: "Custom",
      bestFor: "Large organizations (300+ users)",
      features: [
        "Everything in Business Plus, plus:",
        "Unlimited storage",
        "Google Meet (1,000 participants)",
        "Data Loss Prevention (DLP)",
        "S/MIME email encryption",
        "Enterprise-grade compliance",
        "Unlimited users"
      ]
    }
  ];

  const comparison = [
    { feature: "Custom Business Email", starter: "Yes", standard: "Yes", plus: "Yes", enterprise: "Yes" },
    { feature: "Storage per User", starter: "30 GB", standard: "2 TB", plus: "5 TB", enterprise: "Unlimited" },
    { feature: "Max Users", starter: "300", standard: "300", plus: "300", enterprise: "Unlimited" },
    { feature: "Meet Participants", starter: "100", standard: "150", plus: "500", enterprise: "1,000" },
    { feature: "Meeting Recording", starter: "No", standard: "Yes", plus: "Yes", enterprise: "Yes" },
    { feature: "Shared Drives", starter: "No", standard: "Yes", plus: "Yes", enterprise: "Yes" },
    { feature: "Noise Cancellation", starter: "No", standard: "Yes", plus: "Yes", enterprise: "Yes" },
    { feature: "eDiscovery & Audit", starter: "No", standard: "No", plus: "Yes", enterprise: "Yes" },
    { feature: "Advanced Endpoint Mgmt", starter: "No", standard: "No", plus: "Yes", enterprise: "Yes" },
    { feature: "DLP", starter: "No", standard: "No", standard2: "No", enterprise: "Yes" },
    { feature: "S/MIME Encryption", starter: "No", standard: "No", plus: "No", enterprise: "Yes" },
    { feature: "INR Billing via Optimantix", starter: "Yes", standard: "Yes", plus: "Yes", enterprise: "Yes" },
    { feature: "GST-Compliant Invoices", starter: "Yes", standard: "Yes", plus: "Yes", enterprise: "Yes" },
  ];

  const apps = [
    { name: "Gmail", icon: "https://upload.wikimedia.org/wikipedia/commons/7/7e/Gmail_icon_%282020%29.svg" },
    { name: "Drive", icon: "https://upload.wikimedia.org/wikipedia/commons/1/12/Google_Drive_icon_%282020%29.svg" },
    { name: "Docs", icon: "https://upload.wikimedia.org/wikipedia/commons/4/4f/Google_Docs_icon_%282020%29.svg" },
    { name: "Sheets", icon: "https://upload.wikimedia.org/wikipedia/commons/3/30/Google_Sheets_icon_%282020%29.svg" },
    { name: "Slides", icon: "https://upload.wikimedia.org/wikipedia/commons/1/1e/Google_Slides_icon_%282020%29.svg" },
    { name: "Meet", icon: "https://upload.wikimedia.org/wikipedia/commons/9/9b/Google_Meet_icon_%282020%29.svg" },
    { name: "Calendar", icon: "https://upload.wikimedia.org/wikipedia/commons/a/a5/Google_Calendar_icon_%282020%29.svg" },
    { name: "Chat", icon: "https://upload.wikimedia.org/wikipedia/commons/d/de/Google_Chat_icon_%282020%29.svg" },
    { name: "Forms", icon: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_Forms_icon_%282020%29.svg" },
    { name: "Sites", icon: "https://upload.wikimedia.org/wikipedia/commons/d/d7/Google_Sites_icon_%282020%29.svg" },
    { name: "Keep", icon: "https://upload.wikimedia.org/wikipedia/commons/b/b5/Google_Keep_icon_%282020%29.svg" },
    { name: "Gemini AI", icon: "https://upload.wikimedia.org/wikipedia/commons/8/8a/Google_Gemini_logo.svg" },
  ];

  const steps = [
    { step: "Step 1", title: "Choose Your Plan", desc: "Pick the plan that suits your team size and requirements. Not sure which one to pick? Our experts offer a free consultation to guide your decision." },
    { step: "Step 2", title: "Share Your Domain", desc: "Provide your business domain name. We will verify it and configure your Google Workspace admin account on your behalf." },
    { step: "Step 3", title: "We Handle Setup & Migration", desc: "Our team creates user accounts, migrates your existing emails, contacts, and calendar data, and configures DNS records — completely handled for you." },
    { step: "Step 4", title: "Go Live & Start Collaborating", desc: "Your team gets instant access to all Google Workspace apps. We stay on hand for support during the transition and beyond." },
  ];

  const faqs = [
    { q: "Why buy Google Workspace from Optimantix instead of Google directly?", a: "As an authorized reseller, Optimantix offers INR billing (no USD conversion), GST-compliant invoices for ITC claims, local support, free migration assistance, and often better pricing than Google's direct channel — especially for new customers. You receive the exact same Google Workspace product with additional services on top." },
    { q: "What is the introductory offer for new customers?", a: "Google provides special introductory pricing for new Workspace customers, typically for the first 20 users added during the first 12 months. Standard pricing applies after the promotional period ends. Contact us to know the current active offer details." },
    { q: "Is GST charged on top of these prices?", a: "Yes. All prices listed are exclusive of GST. An 18% GST is applicable and reflected on your invoice. Since we provide proper GST invoices, Indian businesses can claim Input Tax Credit (ITC) on this amount." },
    { q: "Can I migrate from my existing email provider?", a: "Absolutely. We provide free migration support for all customers who purchase through us. Our team handles email, contact, and calendar migration with minimal to zero downtime. We have successfully migrated clients from cPanel, Zoho Mail, Yahoo Mail, GoDaddy, Rackspace, and Microsoft 365." },
    { q: "Can I add or remove users after purchasing?", a: "Yes. You can scale users up or down at any time. Adding users is prorated to your current billing cycle. Removing users on annual plans takes effect at the next renewal date. We will guide you through any changes." },
    { q: "What happens if I need Enterprise pricing for more than 300 users?", a: "Enterprise plans are custom and quote-based, designed for organizations with 300+ users. They include unlimited storage, DLP, S/MIME encryption, and premium compliance controls. Please reach out to our sales team." },
    { q: "Which plan should I choose for my team?", a: "For teams under 10 users who need business email and basic tools, Business Starter is a great starting point. For growing teams that collaborate heavily, Business Standard offers the best value. Business Plus is ideal for companies that need enterprise-grade security. Contact us for a free recommendation." },
  ];

  return (
    <div className="bg-white dark:bg-dark min-h-screen">
      <SEO 
        title="Google Workspace Reseller India | INR Billing & GST Invoices" 
        description="Optimantix is an authorized Google Workspace reseller in India. Get INR billing, GST invoices, free migration, and local support at best prices."
      />

      {/* Section 1: Hero */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-dark">
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6 tracking-tight"
            >
              Power Your Business with Google Workspace — at the <span className="text-primary">Best Prices in India</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-10 leading-relaxed"
            >
              Optimantix is an authorized Google Workspace reseller in India. We offer INR billing, GST-compliant invoices, free migration support, and dedicated local assistance — so your team can collaborate from anywhere.
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex flex-col sm:flex-row justify-center gap-4 mb-16"
            >
              <a href="#pricing" className="bg-primary text-white px-8 py-4 rounded-xl font-bold hover:bg-secondary transition shadow-lg shadow-primary/20">
                View Pricing
              </a>
              <a href="/contact" className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 px-8 py-4 rounded-xl font-bold hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                Talk to an Expert
              </a>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto"
            >
              <div className="flex flex-col items-center">
                <div className="text-2xl font-bold text-primary mb-1">300+</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">Businesses Onboarded</div>
              </div>
              <div className="flex flex-col items-center">
                <div className="text-2xl font-bold text-primary mb-1">INR Billing</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">No Forex Hassle</div>
              </div>
              <div className="flex flex-col items-center">
                <div className="text-2xl font-bold text-primary mb-1">24/7</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">Local Support</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section 2: Why Optimantix */}
      <section className="py-24 bg-white dark:bg-dark">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">The Optimantix Advantage</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Buying Google Workspace through Optimantix isn't just cheaper — it's smarter. Here's what sets us apart from buying directly from Google.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, idx) => (
              <div key={idx} className="p-8 rounded-2xl border border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-dark-card hover:border-primary/30 transition-all group">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{benefit.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 3: Pricing Plans */}
      <section id="pricing" className="py-24 bg-gray-50 dark:bg-[#0a0a0a]">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Google Workspace Plans & Pricing in India</h2>
            <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">
              Note: All prices are per user per month on an annual commitment plan, exclusive of 18% GST.
            </p>
            <div className="inline-block bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
              New customers: Special intro pricing available!
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {plans.map((plan, idx) => (
              <div key={idx} className={`relative p-8 rounded-2xl border ${plan.popular ? 'border-primary bg-white dark:bg-dark-card shadow-xl scale-105 z-10' : 'border-gray-200 dark:border-gray-800 bg-white dark:bg-dark-card'}`}>
                {plan.popular && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    Most Popular
                  </div>
                )}
                <h3 className="text-lg font-bold mb-1">{plan.name}</h3>
                <p className="text-xs text-gray-500 mb-6">{plan.bestFor}</p>
                <div className="mb-2">
                  <span className="text-3xl font-bold">{plan.price}</span>
                  {plan.price !== 'Custom' && <span className="text-gray-500 text-sm font-normal"> /user/mo</span>}
                </div>
                {plan.intro && <p className="text-xs text-green-600 dark:text-green-400 font-medium mb-6">{plan.intro}</p>}
                
                <div className="space-y-3 mb-8">
                  {plan.features.map((feature, fidx) => (
                    <div key={fidx} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                      <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>

                <a href="/contact" className={`block w-full text-center py-3 rounded-xl font-bold transition ${plan.popular ? 'bg-primary text-white hover:bg-secondary' : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700'}`}>
                  {plan.price === 'Custom' ? 'Contact Us' : 'Get Started'}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 4: Comparison Table */}
      <section className="py-24 bg-white dark:bg-dark overflow-x-auto">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl font-bold mb-12 text-center">Detailed Comparison</h2>
          <div className="min-w-[800px]">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <th className="py-4 px-6 text-left text-sm font-bold text-gray-500 uppercase tracking-wider">Feature</th>
                  <th className="py-4 px-6 text-center text-sm font-bold text-gray-500 uppercase tracking-wider">Starter</th>
                  <th className="py-4 px-6 text-center text-sm font-bold text-gray-500 uppercase tracking-wider">Standard</th>
                  <th className="py-4 px-6 text-center text-sm font-bold text-gray-500 uppercase tracking-wider">Plus</th>
                  <th className="py-4 px-6 text-center text-sm font-bold text-gray-500 uppercase tracking-wider">Enterprise</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                {comparison.map((row, idx) => (
                  <tr key={idx} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                    <td className="py-4 px-6 text-sm font-medium text-gray-700 dark:text-gray-300">{row.feature}</td>
                    <td className="py-4 px-6 text-center text-sm text-gray-600 dark:text-gray-400">{row.starter}</td>
                    <td className="py-4 px-6 text-center text-sm text-gray-600 dark:text-gray-400">{row.standard}</td>
                    <td className="py-4 px-6 text-center text-sm text-gray-600 dark:text-gray-400">{row.plus}</td>
                    <td className="py-4 px-6 text-center text-sm text-gray-600 dark:text-gray-400">{row.enterprise}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Section 5: Apps Included */}
      <section className="py-24 bg-gray-50 dark:bg-[#0a0a0a]">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Every Plan Includes These Google Apps</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              All plans include Google's full productivity and collaboration suite, integrated and ready to use.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {apps.map((app, idx) => (
              <div key={idx} className="bg-white dark:bg-dark-card p-6 rounded-2xl border border-gray-100 dark:border-gray-800 flex flex-col items-center text-center hover:shadow-md transition-shadow">
                <div className="mb-4">
                  <img 
                    src={app.icon} 
                    alt={app.name} 
                    className="w-12 h-12 object-contain" 
                    referrerPolicy="no-referrer"
                  />
                </div>
                <span className="text-sm font-bold">{app.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 6: How It Works */}
      <section className="py-24 bg-white dark:bg-dark">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl font-bold mb-16 text-center">Get Started in 4 Simple Steps</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, idx) => (
              <div key={idx} className="relative">
                <div className="text-5xl font-black text-gray-100 dark:text-gray-800 absolute -top-6 -left-2 z-0">
                  {idx + 1}
                </div>
                <div className="relative z-10">
                  <h3 className="text-xl font-bold mb-3 text-primary">{step.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 7: FAQ */}
      <section className="py-24 bg-gray-50 dark:bg-[#0a0a0a]">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <h2 className="text-3xl font-bold mb-12 text-center">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {faqs.map((faq, idx) => (
              <div key={idx} className="bg-white dark:bg-dark-card p-6 rounded-2xl border border-gray-100 dark:border-gray-800">
                <h3 className="text-lg font-bold mb-3 flex items-start gap-3">
                  <HelpCircle className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                  {faq.q}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed pl-8">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-primary">
        <div className="container mx-auto px-4 md:px-6 text-center text-white">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Ready to transform your workflow?</h2>
          <p className="text-white/80 text-lg mb-10 max-w-2xl mx-auto">
            Get in touch with our Google Workspace experts today for a free consultation and custom quote.
          </p>
          <a href="/contact" className="bg-white text-primary px-10 py-4 rounded-xl font-bold hover:bg-gray-100 transition inline-flex items-center gap-2 shadow-xl">
            Contact Us Now <ArrowRight size={20} />
          </a>
        </div>
      </section>
    </div>
  );
};

export default GoogleWorkspace;
