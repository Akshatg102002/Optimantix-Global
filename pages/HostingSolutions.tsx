
import React from 'react';
import { Check, Shield, Users, Globe, Database, Lock, HelpCircle, HardDrive, Cpu, Activity, RefreshCw, Star, Quote } from 'lucide-react';
import { motion } from 'framer-motion';

interface HostingPlan {
  name: string;
  price: string;
  bestFor: string;
  features: string[];
  popular?: boolean;
}

export const HostingSolutions: React.FC = () => {
  const mainBenefits = [
    {
      title: "INR Billing & GST Invoices",
      description: "All plans are billed in Indian Rupees with proper GST-compliant invoices — making accounting and ITC claims effortless.",
      icon: <Database className="w-6 h-6" />
    },
    {
      title: "Free SSL on All Plans",
      description: "Keep your website secure and trusted by search engines and visitors alike with free SSL certificates (HTTPS).",
      icon: <Lock className="w-6 h-6" />
    },
    {
      title: "24/7 India-Based Support",
      description: "Reach a real person who understands your needs. Our support team is available round the clock via chat, email, and phone.",
      icon: <Users className="w-6 h-6" />
    },
    {
      title: "DDoS Protection",
      description: "Your server is shielded against volumetric and application-layer attacks at the network level.",
      icon: <Shield className="w-6 h-6" />
    },
    {
      title: "Daily Backups",
      description: "We automatically back up your website data every day so you can restore to a clean state anytime.",
      icon: <RefreshCw className="w-6 h-6" />
    },
    {
      title: "Free Website Migration",
      description: "Already hosted elsewhere? We migrate your website to Optimantix for free — with zero downtime and full data integrity.",
      icon: <Globe className="w-6 h-6" />
    }
  ];

  const vpsPlans = [
    {
      name: "VPS BASIC",
      price: "₹799",
      bestFor: "Developers & Personal Projects",
      features: [
        "2 vCPU Cores",
        "2 GB RAM",
        "40 GB NVMe SSD",
        "2 TB Bandwidth",
        "Full Root Access",
        "Choice of OS",
        "Free SSL Certificate",
        "1 Dedicated IP",
        "Weekly Backups",
        "99.9% Uptime SLA",
        "24/7 Support"
      ]
    },
    {
      name: "VPS STANDARD",
      price: "₹1,499",
      popular: true,
      bestFor: "Growing Applications & Small Businesses",
      features: [
        "4 vCPU Cores",
        "4 GB RAM",
        "80 GB NVMe SSD",
        "4 TB Bandwidth",
        "Full Root Access",
        "Choice of OS",
        "Free SSL Certificate",
        "2 Dedicated IPs",
        "Daily Backups",
        "DDoS Protection",
        "99.9% Uptime SLA",
        "24/7 Priority Support"
      ]
    },
    {
      name: "VPS PRO",
      price: "₹2,999",
      bestFor: "High-Traffic Apps & Agencies",
      features: [
        "8 vCPU Cores",
        "8 GB RAM",
        "160 GB NVMe SSD",
        "8 TB Bandwidth",
        "Full Root Access",
        "Choice of OS",
        "Free SSL Certificate",
        "4 Dedicated IPs",
        "Daily Backups + Snapshots",
        "Advanced DDoS + Firewall",
        "cPanel Available",
        "99.9% Uptime SLA",
        "Dedicated Priority Support"
      ]
    }
  ];

  const cloudPlans = [
    {
      name: "CLOUD STARTER",
      price: "₹599",
      bestFor: "Growing Websites",
      features: [
        "2 vCPU Cores",
        "2 GB RAM",
        "50 GB SSD Storage",
        "Unlimited Bandwidth",
        "Free SSL Certificate",
        "Free CDN Integration",
        "Daily Automated Backups",
        "Root Access Available",
        "99.99% Uptime SLA",
        "24/7 Priority Support"
      ]
    },
    {
      name: "CLOUD BUSINESS",
      price: "₹1,199",
      popular: true,
      bestFor: "eCommerce & Business Applications",
      features: [
        "4 vCPU Cores",
        "4 GB RAM",
        "100 GB SSD Storage",
        "Unlimited Bandwidth",
        "Free SSL Certificate",
        "Free CDN + DDoS Protection",
        "Daily + On-Demand Backups",
        "Root Access Available",
        "Auto-Scaling",
        "99.99% Uptime SLA",
        "24/7 Priority Support"
      ]
    },
    {
      name: "CLOUD PRO",
      price: "₹2,499",
      bestFor: "High-Traffic Applications",
      features: [
        "8 vCPU Cores",
        "8 GB RAM",
        "200 GB SSD Storage",
        "Unlimited Bandwidth",
        "Free SSL Certificate",
        "Advanced CDN + DDoS + WAF",
        "Daily + Hourly Backups",
        "Full Root Access",
        "Auto-Scaling + Load Balancing",
        "Dedicated IP Address",
        "99.99% Uptime SLA",
        "Dedicated Priority Support"
      ]
    }
  ];

  const comparison = [
    { feature: "Best For", vps: "Developers & power users", cloud: "Scalable apps & eCommerce" },
    { feature: "Starting Price", vps: "₹799/month", cloud: "₹599/month" },
    { feature: "Resources", vps: "Fixed & Dedicated", cloud: "Dynamic & Auto-Scalable" },
    { feature: "Uptime SLA", vps: "99.9%", cloud: "99.99%" },
    { feature: "Root Access", vps: "Yes", cloud: "Yes" },
    { feature: "Daily Backups", vps: "Select plans", cloud: "Yes" },
    { feature: "DDoS Protection", vps: "Standard+ plans", cloud: "Yes" },
    { feature: "Free SSL", vps: "Yes", cloud: "Yes" },
  ];

  const testimonials = [
    {
      quote: "We switched our eCommerce store to Optimantix Cloud Business during peak sale season. The auto-scaling handled a 10x traffic spike without a single second of downtime. Incredibly impressed.",
      author: "Rohit K.",
      role: "eCommerce Business Owner"
    },
    {
      quote: "The 99.99% uptime SLA is real — we've been on Optimantix Cloud Hosting for 8 months and haven't experienced a single outage. Our clients have noticed the difference.",
      author: "Priya D.",
      role: "Digital Agency Owner"
    },
    {
      quote: "INR billing and proper GST invoices were the main reason we switched. No more international payment headaches on the company credit card. Optimantix just makes it easy.",
      author: "Arjun S.",
      role: "Startup Founder"
    }
  ];

  const faqs = [
    { q: "What is VPS Hosting?", a: "A Virtual Private Server (VPS) gives you dedicated CPU, RAM, and storage within a shared physical machine. Unlike shared hosting, your allocated resources are guaranteed — your performance is consistent and unaffected by other users on the same server." },
    { q: "What is Cloud Hosting?", a: "Cloud hosting uses a network of distributed virtual and physical servers to host websites and applications. Unlike traditional hosting on a single server, cloud hosting distributes your workload across multiple nodes — delivering better reliability, scalability, and uptime." },
    { q: "How is Cloud Hosting different from VPS Hosting?", a: "VPS hosting gives you fixed, dedicated resources on a single virtual server — ideal for stable, predictable workloads. Cloud hosting provides dynamic, auto-scalable resources distributed across multiple servers, with a higher 99.99% uptime SLA — better suited for applications with unpredictable traffic." },
    { q: "Which operating systems can I install?", a: "You can choose from popular Linux distributions including Ubuntu, CentOS, and Debian, or opt for Windows Server. You have full root access to configure the OS exactly as your project requires." },
    { q: "Do all plans include a free SSL certificate?", a: "Yes. Every hosting plan from Optimantix includes a free SSL certificate, which enables HTTPS on your website. This is essential for security, SEO rankings, and visitor trust." },
    { q: "Can I migrate my existing website to Optimantix for free?", a: "Yes. We provide free website migration for all new customers. Our team handles the full transfer of your website files, databases, and emails — with minimal to zero downtime." },
    { q: "Is GST charged on hosting plans?", a: "Yes. All prices listed are exclusive of 18% GST. We issue GST-compliant invoices for ITC claims." },
    { q: "Can I upgrade my hosting plan later?", a: "Absolutely. You can upgrade your plan at any time as your website grows. Upgrades are applied instantly and prorated to your billing cycle." },
  ];

  return (
    <div className="bg-white dark:bg-dark min-h-screen">
{/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-gradient-to-b from-indigo-50 to-white dark:from-gray-900 dark:to-dark">
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6 tracking-tight"
            >
              Hosting Plans Built for <span className="text-primary">Indian Businesses</span>
            </motion.h1>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl md:text-2xl font-medium text-gray-600 dark:text-gray-400 mb-6"
            >
              Fast, Secure & Scalable — Billed in INR, Backed by a Local Team
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="text-lg text-gray-600 dark:text-gray-400 mb-10 leading-relaxed max-w-3xl mx-auto"
            >
              Whether you need dedicated resources for your application or elastic cloud infrastructure that scales with your business, Optimantix has a hosting plan designed for you.
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex flex-col sm:flex-row justify-center gap-4 mb-16"
            >
              <a href="#plans" className="bg-primary text-white px-8 py-4 rounded-xl font-bold hover:bg-secondary transition shadow-lg shadow-primary/20">
                Explore Plans
              </a>
              <a href="/contact" className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 px-8 py-4 rounded-xl font-bold hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                Talk to an Expert
              </a>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 max-w-5xl mx-auto"
            >
              {mainBenefits.map((benefit, idx) => (
                <div key={idx} className="flex flex-col items-center p-4 rounded-xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-100 dark:border-gray-700">
                  <div className="text-primary mb-2">{benefit.icon}</div>
                  <div className="text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider text-center">{benefit.title}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Comparison Table Section */}
      <section className="py-24 bg-white dark:bg-dark">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Choose the Right Hosting for Your Needs</h2>
          </div>
          <div className="max-w-4xl mx-auto overflow-x-auto">
            <table className="w-full border-collapse bg-gray-50 dark:bg-dark-card rounded-2xl overflow-hidden shadow-sm">
              <thead>
                <tr className="bg-gray-100 dark:bg-gray-800">
                  <th className="py-6 px-8 text-left text-sm font-bold text-gray-500 uppercase tracking-wider">Feature</th>
                  <th className="py-6 px-8 text-center text-sm font-bold text-gray-500 uppercase tracking-wider">VPS Hosting</th>
                  <th className="py-6 px-8 text-center text-sm font-bold text-gray-500 uppercase tracking-wider">Cloud Hosting</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {comparison.map((row, idx) => (
                  <tr key={idx} className="hover:bg-gray-100 dark:hover:bg-gray-800/50 transition-colors">
                    <td className="py-5 px-8 text-sm font-bold text-gray-700 dark:text-gray-300">{row.feature}</td>
                    <td className="py-5 px-8 text-center text-sm text-gray-600 dark:text-gray-400">{row.vps}</td>
                    <td className="py-5 px-8 text-center text-sm text-gray-600 dark:text-gray-400">{row.cloud}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* VPS Hosting Section */}
      <section id="vps" className="py-24 bg-gray-50 dark:bg-[#0a0a0a]">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <div className="inline-block bg-primary/10 text-primary px-4 py-1 rounded-full text-sm font-bold uppercase tracking-widest mb-4">VPS Hosting</div>
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Dedicated Resources. Full Control. Maximum Performance.</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
              Optimantix VPS Hosting gives you the power of a dedicated server at a fraction of the cost. Each VPS instance comes with isolated CPU, RAM, and NVMe SSD storage — so your performance is never impacted by other users.
            </p>
            <div className="flex flex-wrap justify-center gap-6 mb-10">
              {["Full Root Access", "Choice of OS", "NVMe SSD Storage", "Free SSL Certificate", "DDoS Protection", "24/7 India Support"].map((item, idx) => (
                <div key={idx} className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                  <Check className="w-4 h-4 text-primary" />
                  {item}
                </div>
              ))}
            </div>
            <div className="flex justify-center gap-4">
              <a href="#vps-plans" className="bg-primary text-white px-6 py-3 rounded-xl font-bold hover:bg-secondary transition">View VPS Plans</a>
              <a href="/contact" className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 px-6 py-3 rounded-xl font-bold hover:bg-gray-50 dark:hover:bg-gray-700 transition">Talk to an Expert</a>
            </div>
          </div>

          <div id="vps-plans" className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
            {vpsPlans.map((plan, idx) => (
              <PlanCard key={idx} plan={plan} />
            ))}
          </div>

          {/* Why Choose VPS */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
            <div className="p-8 bg-white dark:bg-dark-card rounded-2xl border border-gray-100 dark:border-gray-800">
              <h3 className="text-xl font-bold mb-4">NVMe SSD Storage</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                All VPS plans run on ultra-fast NVMe SSD drives — delivering significantly lower latency and faster data access compared to standard SSDs.
              </p>
            </div>
            <div className="p-8 bg-white dark:bg-dark-card rounded-2xl border border-gray-100 dark:border-gray-800">
              <h3 className="text-xl font-bold mb-4">Full Root Access & OS Freedom</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                Install any software, configure system settings, and choose your preferred OS — Ubuntu, CentOS, Debian, or Windows Server.
              </p>
            </div>
            <div className="p-8 bg-white dark:bg-dark-card rounded-2xl border border-gray-100 dark:border-gray-800">
              <h3 className="text-xl font-bold mb-4">Scalable Resources</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                Start with VPS Basic and upgrade to Standard or Pro at any time as your business grows. Resource upgrades are applied with zero downtime.
              </p>
            </div>
          </div>

          {/* VPS Use Cases */}
          <div className="bg-white dark:bg-dark-card p-12 rounded-3xl border border-gray-100 dark:border-gray-800">
            <h3 className="text-2xl font-bold mb-10 text-center">What Can You Use Optimantix VPS Hosting For?</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { title: "Web Applications", desc: "Host Node.js, Python, PHP, or any custom stack with full server control." },
                { title: "eCommerce Stores", desc: "Run WooCommerce, Magento, or OpenCart with dedicated resources." },
                { title: "Forex & Trading Bots", desc: "Run MT4/MT5 trading applications 24/7 with stable, uninterrupted uptime." },
                { title: "Game Servers", desc: "Deploy and manage game servers with low latency and high bandwidth." },
                { title: "SaaS Platforms", desc: "Build and scale multi-tenant applications on isolated infrastructure." },
                { title: "Database Servers", desc: "Host MySQL, PostgreSQL, or MongoDB with dedicated I/O for fast queries." },
                { title: "Development & Staging", desc: "Create isolated environments for testing and deploying your applications." },
                { title: "Agency Hosting", desc: "Manage multiple client websites from a single, powerful VPS instance." }
              ].map((useCase, idx) => (
                <div key={idx}>
                  <h4 className="font-bold mb-2 text-primary">{useCase.title}</h4>
                  <p className="text-gray-600 dark:text-gray-400 text-xs leading-relaxed">{useCase.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Cloud Hosting Section */}
      <section id="cloud" className="py-24 bg-white dark:bg-dark">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <div className="inline-block bg-primary/10 text-primary px-4 py-1 rounded-full text-sm font-bold uppercase tracking-widest mb-4">Cloud Hosting</div>
            <h2 className="text-3xl md:text-5xl font-bold mb-6">High Availability. Auto-Scaling. Zero Compromise on Uptime.</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
              Powered by a distributed, redundant infrastructure, our cloud hosting plans deliver 99.99% uptime, automatic failover, and on-demand resource scaling — so your website keeps running no matter what.
            </p>
            <div className="flex flex-wrap justify-center gap-6 mb-10">
              {["99.99% Uptime SLA", "Auto-Scaling Infrastructure", "Free CDN Integration", "DDoS Protection", "Daily + On-Demand Backups", "Root Access Available"].map((item, idx) => (
                <div key={idx} className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                  <Check className="w-4 h-4 text-primary" />
                  {item}
                </div>
              ))}
            </div>
            <div className="flex justify-center gap-4">
              <a href="#cloud-plans" className="bg-primary text-white px-6 py-3 rounded-xl font-bold hover:bg-secondary transition">View Cloud Plans</a>
              <a href="/contact" className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 px-6 py-3 rounded-xl font-bold hover:bg-gray-50 dark:hover:bg-gray-700 transition">Talk to an Expert</a>
            </div>
          </div>

          <div id="cloud-plans" className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
            {cloudPlans.map((plan, idx) => (
              <PlanCard key={idx} plan={plan} />
            ))}
          </div>

          {/* Why Choose Cloud */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
            <div className="p-8 bg-gray-50 dark:bg-dark-card rounded-2xl border border-gray-100 dark:border-gray-800">
              <h3 className="text-xl font-bold mb-4">99.99% Uptime Guarantee</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                Our cloud hosting is built on a redundant, distributed infrastructure that keeps your website live even if one server fails. We back this with a formal 99.99% uptime SLA.
              </p>
            </div>
            <div className="p-8 bg-gray-50 dark:bg-dark-card rounded-2xl border border-gray-100 dark:border-gray-800">
              <h3 className="text-xl font-bold mb-4">Auto-Scaling Resources</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                Traffic spikes shouldn't crash your website. Your resources automatically scale up during high-traffic periods and scale back down when things are quiet.
              </p>
            </div>
            <div className="p-8 bg-gray-50 dark:bg-dark-card rounded-2xl border border-gray-100 dark:border-gray-800">
              <h3 className="text-xl font-bold mb-4">Free CDN Integration</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                All cloud plans include free CDN integration, delivering your content from servers closest to your visitors for faster page loads across India and globally.
              </p>
            </div>
          </div>

          {/* Cloud Use Cases */}
          <div className="bg-gray-50 dark:bg-dark-card p-12 rounded-3xl border border-gray-100 dark:border-gray-800">
            <h3 className="text-2xl font-bold mb-10 text-center">What Can You Use Optimantix Cloud Hosting For?</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { title: "eCommerce Stores", desc: "Handle seasonal traffic spikes and flash sales without performance degradation." },
                { title: "Business Websites", desc: "Keep your corporate site fast and always online with a 99.99% uptime SLA." },
                { title: "Web Applications", desc: "Host scalable apps with auto-scaling infrastructure that grows on demand." },
                { title: "SaaS Platforms", desc: "Deliver reliable multi-tenant software with high availability and load balancing." },
                { title: "Media & Content Sites", desc: "Serve images, videos, and content globally with built-in CDN." },
                { title: "Startup MVPs", desc: "Launch fast on Cloud Starter and scale up as your user base grows." },
                { title: "Tally on Cloud", desc: "Access your Tally accounting software securely from anywhere in India." },
                { title: "Development Environments", desc: "Spin up and tear down cloud instances for testing and staging." }
              ].map((useCase, idx) => (
                <div key={idx}>
                  <h4 className="font-bold mb-2 text-primary">{useCase.title}</h4>
                  <p className="text-gray-600 dark:text-gray-400 text-xs leading-relaxed">{useCase.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Infrastructure Section */}
      <section className="py-24 bg-gray-50 dark:bg-[#0a0a0a]">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl font-bold mb-16 text-center">The Infrastructure Behind Your Hosting</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {[
              { title: "KVM Virtualization", desc: "We use KVM hypervisor technology to deliver true resource isolation. Your CPU, RAM, and storage are dedicated to your instance.", icon: <Cpu /> },
              { title: "NVMe-Powered Storage", desc: "Our storage layer uses NVMe SSDs which are multiple times faster than standard SSDs for better application responsiveness.", icon: <HardDrive /> },
              { title: "Redundant Network", desc: "Multi-layered network design with redundant connections ensuring low latency, high availability, and minimal packet loss.", icon: <Activity /> },
              { title: "Enterprise-Grade Security", desc: "Protected by enterprise firewalls and intrusion detection systems (IDS). Regular security audits keep your environment safe.", icon: <Shield /> },
              { title: "India-Located Data Centres", desc: "Your data stays in India. Local hosting means lower latency for your Indian audience and compliance with data residency.", icon: <Globe /> },
              { title: "Intelligent Load Balancing", desc: "Distribute incoming traffic evenly across your cloud instances, preventing any single server from becoming a bottleneck.", icon: <RefreshCw /> }
            ].map((infra, idx) => (
              <div key={idx} className="flex gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary flex-shrink-0">
                  {infra.icon}
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-2">{infra.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{infra.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-white dark:bg-dark">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl font-bold mb-16 text-center">What Our Customers Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t, idx) => (
              <div key={idx} className="p-8 bg-gray-50 dark:bg-dark-card rounded-2xl border border-gray-100 dark:border-gray-800 relative">
                <Quote className="absolute top-4 right-4 w-8 h-8 text-primary/10" />
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-primary text-primary" />)}
                </div>
                <p className="text-gray-700 dark:text-gray-300 italic mb-6 text-sm leading-relaxed">"{t.quote}"</p>
                <div>
                  <div className="font-bold text-gray-900 dark:text-white">{t.author}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">{t.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
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

      {/* Steps Section */}
      <section className="py-24 bg-white dark:bg-dark">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl font-bold mb-16 text-center">Get Online in 4 Simple Steps</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: "Choose Your Plan", desc: "Pick the VPS or Cloud plan that matches your website type and traffic." },
              { title: "Register Domain", desc: "Choose a new domain name or transfer your existing domain to Optimantix." },
              { title: "Instant Provisioning", desc: "Your hosting environment is provisioned within minutes. We configure everything." },
              { title: "Launch & Grow", desc: "Upload your files, deploy your application, and go live. We're here to help." }
            ].map((step, idx) => (
              <div key={idx} className="relative p-6 bg-gray-50 dark:bg-dark-card rounded-2xl border border-gray-100 dark:border-gray-800">
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

      {/* CTA */}
      <section className="py-24 bg-primary">
        <div className="container mx-auto px-4 md:px-6 text-center text-white">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Still Not Sure Which Plan Is Right for You?</h2>
          <p className="text-white/80 text-lg mb-10 max-w-2xl mx-auto">
            Get in touch with our hosting experts today for a free consultation.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a href="#vps" className="bg-white text-primary px-8 py-4 rounded-xl font-bold hover:bg-gray-100 transition shadow-xl">
              Start with VPS — from ₹799/mo
            </a>
            <a href="#cloud" className="bg-white text-primary px-8 py-4 rounded-xl font-bold hover:bg-gray-100 transition shadow-xl">
              Start with Cloud — from ₹599/mo
            </a>
            <a href="/contact" className="bg-primary border border-white text-white px-8 py-4 rounded-xl font-bold hover:bg-white/10 transition">
              Talk to an Expert
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

const PlanCard: React.FC<{ plan: HostingPlan }> = ({ plan }) => (
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
