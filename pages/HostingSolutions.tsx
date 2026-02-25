
import React from 'react';
import { Check, Shield, Zap, Users, Globe, Server, Cloud, Database, Lock, ArrowRight, HelpCircle, HardDrive, Cpu, Activity, RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';
import { SEO } from '../components/SEO';

export const HostingSolutions: React.FC = () => {
  const benefits = [
    {
      title: "99.9% Uptime SLA",
      description: "Your website stays live. We back it with a service level agreement so you're never left guessing about reliability.",
      icon: <Activity className="w-6 h-6" />
    },
    {
      title: "INR Billing & GST Invoices",
      description: "All plans are billed in Indian Rupees with proper GST-compliant invoices — making accounting effortless.",
      icon: <Database className="w-6 h-6" />
    },
    {
      title: "Free SSL Certificate",
      description: "All hosting plans include a free SSL certificate (HTTPS), keeping your website secure and trusted.",
      icon: <Lock className="w-6 h-6" />
    },
    {
      title: "One-Click App Installer",
      description: "Install WordPress, Joomla, Magento, and 100+ other applications in a single click — no technical knowledge required.",
      icon: <Zap className="w-6 h-6" />
    },
    {
      title: "Daily Backups",
      description: "We automatically back up your website data every day so you can restore to a clean state anytime.",
      icon: <RefreshCw className="w-6 h-6" />
    },
    {
      title: "24/7 India-Based Support",
      description: "Reach a real person who understands your needs. Our support team is available round the clock.",
      icon: <Users className="w-6 h-6" />
    },
    {
      title: "Free Website Migration",
      description: "Already hosted elsewhere? We migrate your website to Optimantix for free — with zero downtime.",
      icon: <Globe className="w-6 h-6" />
    },
    {
      title: "Scalable Infrastructure",
      description: "Start small and grow. Upgrade your plan anytime as your traffic and business demands increase.",
      icon: <Server className="w-6 h-6" />
    }
  ];

  const wpPlans = [
    { name: "WP STARTER", price: "₹99", bestFor: "Bloggers and personal websites", features: ["1 WordPress Website", "10 GB SSD Storage", "Free SSL Certificate", "Free Domain for 1st Year", "Unlimited Bandwidth", "One-Click WordPress Install", "Automatic WordPress Updates", "Daily Backups", "24/7 Support"] },
    { name: "WP BUSINESS", price: "₹249", popular: true, bestFor: "Small business websites", features: ["Up to 3 WordPress Websites", "30 GB SSD Storage", "Free SSL Certificate", "Free Domain for 1st Year", "Unlimited Bandwidth", "LiteSpeed Cache", "One-Click Staging", "Automatic Updates", "Daily Backups", "Free Malware Scan", "Priority 24/7 Support"] },
    { name: "WP PRO", price: "₹499", bestFor: "High-traffic sites and agencies", features: ["Unlimited WordPress Websites", "100 GB SSD Storage", "Free SSL Certificate", "Free Domain for 1st Year", "Unlimited Bandwidth", "LiteSpeed Cache + CDN", "Advanced Staging", "Automatic Updates", "Daily Backups", "Advanced Malware Protection", "Dedicated WP Support"] }
  ];

  const sharedPlans = [
    { name: "SHARED BASIC", price: "₹59", bestFor: "Personal websites and blogs", features: ["1 Website", "5 GB SSD Storage", "Free SSL Certificate", "5 Email Accounts", "Unlimited Bandwidth", "cPanel Control Panel", "One-Click App Installer", "99.9% Uptime Guarantee", "24/7 Support"] },
    { name: "SHARED STANDARD", price: "₹129", popular: true, bestFor: "Small business websites", features: ["Up to 5 Websites", "20 GB SSD Storage", "Free SSL Certificate", "Unlimited Email Accounts", "Unlimited Bandwidth", "cPanel Control Panel", "One-Click App Installer", "Free Domain for 1st Year", "Daily Backups", "99.9% Uptime Guarantee", "24/7 Support"] },
    { name: "SHARED PREMIUM", price: "₹229", bestFor: "Growing businesses", features: ["Unlimited Websites", "50 GB SSD Storage", "Free SSL Certificate", "Unlimited Email Accounts", "Unlimited Bandwidth", "cPanel Control Panel", "One-Click App Installer", "Free Domain for 1st Year", "Daily Backups", "Free Malware Protection", "Priority 24/7 Support"] }
  ];

  const cloudPlans = [
    { name: "CLOUD STARTER", price: "₹599", bestFor: "Growing websites", features: ["2 vCPU Cores", "2 GB RAM", "50 GB SSD Storage", "Free SSL Certificate", "Unlimited Bandwidth", "Free CDN Integration", "Daily Automated Backups", "Root Access Available", "99.99% Uptime SLA", "24/7 Priority Support"] },
    { name: "CLOUD BUSINESS", price: "₹1,199", popular: true, bestFor: "E-commerce websites", features: ["4 vCPU Cores", "4 GB RAM", "100 GB SSD Storage", "Free SSL Certificate", "Unlimited Bandwidth", "Free CDN + DDoS Protection", "Daily + On-Demand Backups", "Root Access Available", "Auto-Scaling", "99.99% Uptime SLA", "24/7 Priority Support"] },
    { name: "CLOUD PRO", price: "₹2,499", bestFor: "High-traffic applications", features: ["8 vCPU Cores", "8 GB RAM", "200 GB SSD Storage", "Free SSL Certificate", "Unlimited Bandwidth", "Advanced CDN + DDoS + WAF", "Daily + Hourly Backups", "Full Root Access", "Auto-Scaling + Load Balancing", "Dedicated IP Address", "99.99% Uptime SLA", "Dedicated Priority Support"] }
  ];

  const vpsPlans = [
    { name: "VPS BASIC", price: "₹799", bestFor: "Developers", features: ["2 vCPU Cores", "2 GB RAM", "40 GB NVMe SSD", "2 TB Bandwidth", "Full Root Access", "Choice of OS", "Free SSL Certificate", "1 Dedicated IP", "Weekly Backups", "99.9% Uptime SLA", "24/7 Support"] },
    { name: "VPS STANDARD", price: "₹1,499", popular: true, bestFor: "Growing applications", features: ["4 vCPU Cores", "4 GB RAM", "80 GB NVMe SSD", "4 TB Bandwidth", "Full Root Access", "Choice of OS", "Free SSL Certificate", "2 Dedicated IPs", "Daily Backups", "DDoS Protection", "99.9% Uptime SLA", "24/7 Priority Support"] },
    { name: "VPS PRO", price: "₹2,999", bestFor: "High-traffic apps", features: ["8 vCPU Cores", "8 GB RAM", "160 GB NVMe SSD", "8 TB Bandwidth", "Full Root Access", "Choice of OS", "Free SSL Certificate", "4 Dedicated IPs", "Daily Backups + Snapshots", "Advanced DDoS + Firewall", "cPanel Available", "99.9% Uptime SLA", "Dedicated Priority Support"] }
  ];

  const comparison = [
    { feature: "Starting Price", shared: "₹59/mo", wp: "₹99/mo", cloud: "₹599/mo", vps: "₹799/mo" },
    { feature: "Best For", shared: "Beginners", wp: "WordPress sites", cloud: "Scalable apps", vps: "Developers" },
    { feature: "SSD Storage", shared: "5–50 GB", wp: "10–100 GB", cloud: "50–200 GB", vps: "40–160 GB" },
    { feature: "Bandwidth", shared: "Unlimited", wp: "Unlimited", cloud: "Unlimited", vps: "2–8 TB" },
    { feature: "Free SSL", shared: "Yes", wp: "Yes", cloud: "Yes", vps: "Yes" },
    { feature: "Free Domain", shared: "Select plans", wp: "Yes", cloud: "No", vps: "No" },
    { feature: "Root Access", shared: "No", wp: "No", cloud: "Yes", vps: "Yes" },
    { feature: "Daily Backups", shared: "Select plans", wp: "Yes", cloud: "Yes", vps: "Yes" },
    { feature: "Uptime SLA", shared: "99.9%", wp: "99.9%", cloud: "99.99%", vps: "99.9%" },
  ];

  const faqs = [
    { q: "What is the difference between Shared, WordPress, Cloud, and VPS Hosting?", a: "Shared Hosting is the most affordable option where multiple websites share the same server. WordPress Hosting is optimized specifically for WordPress sites. Cloud Hosting uses multiple servers for better performance and scalability. VPS Hosting provides dedicated virtual resources and full root access for custom applications." },
    { q: "Which hosting plan should I choose for my WordPress website?", a: "If you are running a WordPress site, WordPress Hosting is the recommended choice as it is pre-configured for WordPress performance and security." },
    { q: "Do all plans include a free SSL certificate?", a: "Yes. Every hosting plan from Optimantix includes a free SSL certificate, which enables HTTPS on your website." },
    { q: "Can I migrate my existing website to Optimantix for free?", a: "Yes. We provide free website migration for all new customers. Our team handles the full transfer of your website files, databases, and emails." },
    { q: "Is GST charged on hosting plans?", a: "Yes. All prices listed are exclusive of 18% GST. We issue GST-compliant invoices for ITC claims." },
    { q: "Can I upgrade my hosting plan later?", a: "Absolutely. You can upgrade your plan at any time as your website grows. Upgrades are applied instantly." },
  ];

  return (
    <div className="bg-white dark:bg-dark min-h-screen">
      <SEO 
        title="Reliable Web Hosting India | WordPress, Shared, Cloud & VPS Hosting" 
        description="Optimantix delivers fast, secure, and affordable hosting with INR billing, GST invoices, and 24/7 local support. Explore our hosting plans today."
      />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-gradient-to-b from-indigo-50 to-white dark:from-gray-900 dark:to-dark">
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6 tracking-tight"
            >
              Reliable Web Hosting Solutions Built for <span className="text-primary">Indian Businesses</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-10 leading-relaxed"
            >
              From personal blogs to enterprise-grade applications, Optimantix delivers fast, secure, and affordable hosting — with INR billing, GST invoices, and a team that actually picks up the phone.
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex flex-col sm:flex-row justify-center gap-4 mb-16"
            >
              <a href="#plans" className="bg-primary text-white px-8 py-4 rounded-xl font-bold hover:bg-secondary transition shadow-lg shadow-primary/20">
                Explore Hosting Plans
              </a>
              <a href="/contact" className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 px-8 py-4 rounded-xl font-bold hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                Talk to an Expert
              </a>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto"
            >
              <div className="flex flex-col items-center">
                <div className="text-xl font-bold text-primary mb-1">99.9%</div>
                <div className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider">Uptime Guarantee</div>
              </div>
              <div className="flex flex-col items-center">
                <div className="text-xl font-bold text-primary mb-1">INR Billing</div>
                <div className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider">No Forex Hassle</div>
              </div>
              <div className="flex flex-col items-center">
                <div className="text-xl font-bold text-primary mb-1">24/7</div>
                <div className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider">Local Support</div>
              </div>
              <div className="flex flex-col items-center">
                <div className="text-xl font-bold text-primary mb-1">Free SSL</div>
                <div className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider">On All Plans</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Advantage Section */}
      <section className="py-24 bg-white dark:bg-dark">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">The Optimantix Hosting Advantage</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
              We're not just another hosting provider. Optimantix combines enterprise-grade infrastructure with the personal touch of a local Indian team.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, idx) => (
              <div key={idx} className="p-6 rounded-2xl border border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-dark-card hover:border-primary/30 transition-all group">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
                  {benefit.icon}
                </div>
                <h3 className="text-lg font-bold mb-3">{benefit.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Plans Overview */}
      <section id="plans" className="py-24 bg-gray-50 dark:bg-[#0a0a0a]">
        <div className="container mx-auto px-4 md:px-6 text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Find the Right Hosting Plan for You</h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Whether you're launching your first website or managing high-traffic applications, we have a plan designed for your needs and budget.
          </p>
        </div>

        {/* WordPress Hosting */}
        <div className="container mx-auto px-4 md:px-6 mb-24">
          <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-4">
            <div>
              <div className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-3">WordPress Hosting</div>
              <h3 className="text-2xl md:text-3xl font-bold">Fast, Secure & Optimized for WordPress</h3>
            </div>
            <p className="text-gray-500 dark:text-gray-400 text-sm max-w-md">
              Purpose-built to deliver the best performance with pre-configured environments and LiteSpeed caching.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {wpPlans.map((plan, idx) => (
              <PlanCard key={idx} plan={plan} />
            ))}
          </div>
        </div>

        {/* Shared Hosting */}
        <div className="container mx-auto px-4 md:px-6 mb-24">
          <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-4">
            <div>
              <div className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-3">Shared Hosting</div>
              <h3 className="text-2xl md:text-3xl font-bold">Affordable Entry-Level Hosting</h3>
            </div>
            <p className="text-gray-500 dark:text-gray-400 text-sm max-w-md">
              The most cost-effective way to get your website online. Ideal for individuals and small businesses.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {sharedPlans.map((plan, idx) => (
              <PlanCard key={idx} plan={plan} />
            ))}
          </div>
        </div>

        {/* Cloud Hosting */}
        <div className="container mx-auto px-4 md:px-6 mb-24">
          <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-4">
            <div>
              <div className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-3">Cloud Hosting</div>
              <h3 className="text-2xl md:text-3xl font-bold">High-Performance & Scalable</h3>
            </div>
            <p className="text-gray-500 dark:text-gray-400 text-sm max-w-md">
              High availability and automatic failover. Perfect for businesses that can't afford downtime.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {cloudPlans.map((plan, idx) => (
              <PlanCard key={idx} plan={plan} />
            ))}
          </div>
        </div>

        {/* VPS Hosting */}
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-4">
            <div>
              <div className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-3">VPS Hosting</div>
              <h3 className="text-2xl md:text-3xl font-bold">Dedicated Resources & Full Control</h3>
            </div>
            <p className="text-gray-500 dark:text-gray-400 text-sm max-w-md">
              Dedicated CPU, RAM, and storage. Ideal for developers and businesses needing maximum performance.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {vpsPlans.map((plan, idx) => (
              <PlanCard key={idx} plan={plan} />
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-24 bg-white dark:bg-dark overflow-x-auto">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl font-bold mb-12 text-center">Which Hosting Plan Is Right for You?</h2>
          <div className="min-w-[800px]">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <th className="py-4 px-6 text-left text-sm font-bold text-gray-500 uppercase tracking-wider">Feature</th>
                  <th className="py-4 px-6 text-center text-sm font-bold text-gray-500 uppercase tracking-wider">Shared</th>
                  <th className="py-4 px-6 text-center text-sm font-bold text-gray-500 uppercase tracking-wider">WordPress</th>
                  <th className="py-4 px-6 text-center text-sm font-bold text-gray-500 uppercase tracking-wider">Cloud</th>
                  <th className="py-4 px-6 text-center text-sm font-bold text-gray-500 uppercase tracking-wider">VPS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                {comparison.map((row, idx) => (
                  <tr key={idx} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                    <td className="py-4 px-6 text-sm font-medium text-gray-700 dark:text-gray-300">{row.feature}</td>
                    <td className="py-4 px-6 text-center text-sm text-gray-600 dark:text-gray-400">{row.shared}</td>
                    <td className="py-4 px-6 text-center text-sm text-gray-600 dark:text-gray-400">{row.wp}</td>
                    <td className="py-4 px-6 text-center text-sm text-gray-600 dark:text-gray-400">{row.cloud}</td>
                    <td className="py-4 px-6 text-center text-sm text-gray-600 dark:text-gray-400">{row.vps}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 bg-gray-50 dark:bg-[#0a0a0a]">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl font-bold mb-16 text-center">Get Your Website Online in 4 Simple Steps</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: "Choose Your Plan", desc: "Pick the plan that matches your website type and expected traffic." },
              { title: "Register Domain", desc: "Choose a new domain name or transfer your existing domain to Optimantix." },
              { title: "We Set Up Hosting", desc: "Your hosting environment is provisioned instantly. We configure everything for you." },
              { title: "Launch Website", desc: "Upload your files, install WordPress, and go live. We're here to help." }
            ].map((step, idx) => (
              <div key={idx} className="relative p-6 bg-white dark:bg-dark-card rounded-2xl shadow-sm">
                <div className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center font-bold mb-4">
                  {idx + 1}
                </div>
                <h3 className="text-lg font-bold mb-2">{step.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 bg-white dark:bg-dark">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <h2 className="text-3xl font-bold mb-12 text-center">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {faqs.map((faq, idx) => (
              <div key={idx} className="bg-gray-50 dark:bg-dark-card p-6 rounded-2xl border border-gray-100 dark:border-gray-800">
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

      {/* CTA */}
      <section className="py-24 bg-primary">
        <div className="container mx-auto px-4 md:px-6 text-center text-white">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Ready to launch your website?</h2>
          <p className="text-white/80 text-lg mb-10 max-w-2xl mx-auto">
            Get in touch with our hosting experts today for a free consultation and find the perfect plan for your business.
          </p>
          <a href="/contact" className="bg-white text-primary px-10 py-4 rounded-xl font-bold hover:bg-gray-100 transition inline-flex items-center gap-2 shadow-xl">
            Get Started Now <ArrowRight size={20} />
          </a>
        </div>
      </section>
    </div>
  );
};

const PlanCard: React.FC<{ plan: any }> = ({ plan }) => (
  <div className={`relative p-8 rounded-2xl border ${plan.popular ? 'border-primary bg-white dark:bg-dark-card shadow-xl scale-105 z-10' : 'border-gray-200 dark:border-gray-800 bg-white dark:bg-dark-card'}`}>
    {plan.popular && (
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
        Most Popular
      </div>
    )}
    <h3 className="text-lg font-bold mb-1">{plan.name}</h3>
    <p className="text-xs text-gray-500 mb-6">{plan.bestFor}</p>
    <div className="mb-6">
      <span className="text-3xl font-bold">{plan.price}</span>
      <span className="text-gray-500 text-sm font-normal"> /month</span>
    </div>
    
    <div className="space-y-3 mb-8">
      {plan.features.map((feature: string, fidx: number) => (
        <div key={fidx} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
          <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
          <span>{feature}</span>
        </div>
      ))}
    </div>

    <a href="/contact" className={`block w-full text-center py-3 rounded-xl font-bold transition ${plan.popular ? 'bg-primary text-white hover:bg-secondary' : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700'}`}>
      Get Started
    </a>
  </div>
);
