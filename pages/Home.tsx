
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, TrendingUp, Users, ShieldCheck, Clock, ChevronDown, BarChart, Zap, Globe, Building, ShoppingBag, Heart, GraduationCap, Cpu, Shirt } from 'lucide-react';
import { useData } from '../context/DataContext';
import { LeadModal } from '../components/LeadModal';
import { SEO } from '../components/SEO';
import { PortfolioSlider } from '../components/PortfolioSlider';
import { WORK_PROCESS, INDUSTRIES } from '../constants';
import { motion, AnimatePresence } from 'framer-motion';

const PARTNERS = [
  { name: "Google", logo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" },
  { name: "Amazon", logo: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" },
  { name: "Shopify", logo: "https://upload.wikimedia.org/wikipedia/commons/0/0e/Shopify_logo_2018.svg" },
  { name: "Meta", logo: "https://upload.wikimedia.org/wikipedia/commons/7/7b/Meta_Platforms_Inc._logo.svg" },
  { name: "Microsoft", logo: "https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg" },
  { name: "HubSpot", logo: "https://upload.wikimedia.org/wikipedia/commons/1/15/HubSpot_Logo.svg" },
  { name: "Salesforce", logo: "https://upload.wikimedia.org/wikipedia/commons/f/f9/Salesforce.com_logo.svg" },
  { name: "Adobe", logo: "https://upload.wikimedia.org/wikipedia/commons/b/b2/Adobe_Corporate_Logo.svg" },
];

const CLIENTS = [
  {
    name: "iExplain Education",
    url: "https://www.iexplaineducation.com",
    logo: "https://www.iexplaineducation.com/wp-content/uploads/2023/04/Logo-2-scaled-e1684926432756-1024x410.jpg"
  },
  {
    name: "MyProtein",
    url: "https://www.myprotein.com",
    logo: "https://consumersiteimages.trustpilot.net/business-units/5797619e0000ff000592c200-198x149-1x.jpg"
  },
  {
    name: "Jaimcord Healthcare",
    url: "https://jaimcordhealthcare.com/",
    logo: "https://jaimcordhealthcare.com/cdn/shop/files/JCL-removebg-preview.png"
  },
  {
    name: "Vitabiotics",
    url: "https://www.vitabiotics.com",
    logo: "https://upload.wikimedia.org/wikipedia/en/9/97/Vitabiotics_Logo.png"
  },
  {
    name: "Moon Aesthetic",
    url: "https://moonaesthetic.in/",
    logo: "https://moonaesthetic.in/wp-content/uploads/2025/10/44-removebg-preview-1.png"
  },
  {
    name: "Blackmores",
    url: "https://www.blackmores.com.au",
    logo: "https://www.blackmores.com.au/-/media/project/blackmores-group/au/logo/blackmroes-logo.svg"
  },
  {
    name: "Nutrevvo",
    url: "https://nutrevvo.com/",
    logo: "https://nutrevvo.com/cdn/shop/files/Nutrevvo_WLog.png?height=36&v=1768802777"
  },
  {
    name: "Nature's Way",
    url: "https://www.naturesway.com",
    logo: "https://tukuz.com/wp-content/uploads/2021/05/natures-way-logo-vector.png"
  },
  {
    name: "Divit Nutraceuticals Pvt. Ltd.",
    url: "https://divitnutrition.com/",
    logo: "https://medhospafrica.com/wp-content/uploads/2025/09/Divit-Abdas.jpg"
  },
  {
    name: "Huda Beauty",
    url: "https://hudabeauty.com",
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgOk7t8Q0LHWFcQBBy9tqzV91mLfVEm7s_Gw&s"
  },
  {
    name: "Dipak Studios",
    url: "https://www.dipakstudios.com",
    logo: "https://www.dipakstudios.com/gallery/logo-dipakstudio.png"
  },
  {
    name: "Plushy",
    url: "https://plushy.in",
    logo: "https://plushy.in/cdn/shop/files/Plushy_Log.png"
  },
  {
    name: "Kyptec LifeStyle®",
    url: "https://kyptec-lifestyle.com",
    logo: "https://kyptec-lifestyle.com/cdn/shop/files/kyptec-lifestyle-logo.png"
  },
  {
    name: "Loni Mobility",
    url: "https://lonimobillity.com",
    logo: "https://i.ibb.co/GfNjH1Dd/LONI.jpg"
  },
  {
    name: "Onestop",
    url: "https://onestopretail.in",
    logo: "https://onestopretail.in/cdn/shop/files/Onestop-logo_142x74.png"
  },
  {
    name: "Able Landscape",
    url: "https://www.indiamart.com/able-landscape/profile.html",
    logo: "https://5.imimg.com/data5/SELLER/Logo/2025/12/569746941/BD/NK/BH/131787160/be06081f-9c9f-4f9f-a967-6fcadce9d571-120x120.jpeg"
  },
  {
    name: "Gift by Category",
    url: "https://giftsomatic.in",
    logo: "https://giftsomatic.in/wp-content/uploads/2023/02/cropped-Giftsomatic.jpg"
  },
  {
    name: "KRS Textiles",
    url: "https://www.krstextiles.in",
    logo: "https://www.krstextiles.in/images/logo.png"
  },
  {
    name: "Enhanced Essentials",
    url: "https://www.indiamart.com/shreesundram-agencies-indore",
    logo: "https://images.aasaan.shop/stores/enhancedessentials/social_post/images/social_post_1767049242444.png"
  },
  {
    name: "Formost UAE",
    url: "https://www.amazon.ae/s?k=FORMOST&ref=bl_dp_s_web_0",
    logo: "https://formost.ae/cdn/shop/files/formost-logo.png?v=1728651545&width=105"
  },
  {
    name: "Eskag Pharma",
    url: "https://www.eskag.in/",
    logo: "https://www.eskag.in/wp-content/uploads/2024/01/eskag-pharma-private-limited-logo-3.webp"
  }
];

const FAQS = [
  {
    question: "How long does it take to see results from SEO?",
    answer: "SEO is a long-term strategy. Typically, noticeable improvements in ranking and traffic can be seen within 3 to 6 months, depending on the competitiveness of your industry and the current state of your website."
  },
  {
    question: "Do you offer custom development solutions?",
    answer: "Yes, absolutely. We specialize in custom web development tailored to your specific business requirements, rather than relying solely on templates."
  },
  {
    question: "What platforms do you support for Marketplace Management?",
    answer: "We provide end-to-end management for major platforms including Amazon (Global), Flipkart, Meesho, Nykaa, Blinkit, and Zepto."
  },
  {
    question: "How do you handle project communication?",
    answer: "We believe in transparency. You will be assigned a dedicated project manager and will receive weekly updates via email or Slack. We also schedule bi-weekly review calls."
  }
];

// Helper Component for Logos with Error Handling
const ClientLogo: React.FC<{ client: { name: string; logo: string | null } }> = ({ client }) => {
    const [error, setError] = useState(false);

    if (client.logo && !error) {
        return (
            <img
                src={client.logo}
                alt={client.name}
                onError={() => setError(true)}
                // Removed filter grayscale and opacity-70 to show original colors
                className="max-w-full max-h-full object-contain transition-all duration-300 hover:scale-110"
            />
        );
    }

    return (
        <div className="flex flex-col items-center justify-center text-gray-400 group-hover:text-primary transition-colors">
            <Building size={32} strokeWidth={1.5} className="mb-2" />
            <span className="text-[10px] font-semibold text-center uppercase tracking-wider leading-tight px-1 line-clamp-2">
                {client.name}
            </span>
        </div>
    );
};

export const Home: React.FC = () => {
  const { services, blogs } = useData();
  const MotionDiv = motion.div as any;
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  }

  return (
    <div className="bg-light dark:bg-dark text-slate-900 dark:text-gray-100 transition-colors duration-300">
      <SEO
        title="Home"
        description="Optimantix Global - Driving Growth Through Innovation. Empowering businesses with result-driven strategies in SEO, Marketplace Management, and Web Development."
      />
      <LeadModal />

      {/* Hero Section */}
      <section className="relative pt-12 pb-20 md:pt-20 md:pb-24 overflow-hidden bg-[#020617] text-white rounded-b-[3rem] md:rounded-b-[5rem] shadow-2xl z-10">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=2000"
            alt="Digital Universe"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#020617]/50 via-transparent to-[#020617]"></div>
        </div>

        <div className="container relative z-10 px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <MotionDiv
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-block mb-6 px-4 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 backdrop-blur-md text-blue-300 text-xs md:text-sm font-semibold tracking-wider uppercase">
                🚀 #1 Digital Transformation Agency
              </div>
              <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-8 tracking-tight">
                Driving Growth Through <br />
                <span className="text-primary bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600">Innovation</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 mb-10 font-light leading-relaxed max-w-3xl mx-auto">
                Optimantix Global empowers businesses with result-driven strategies in SEO, Marketplace Management, and Web Development.
              </p>

              <div className="flex flex-col sm:flex-row justify-center gap-4 mb-20">
                <Link
                  to="/contact"
                  className="bg-primary hover:bg-secondary text-white font-bold py-4 px-10 rounded-full transition shadow-[0_0_20px_rgba(0,86,179,0.4)] flex items-center justify-center gap-2 hover:scale-105 active:scale-95 duration-200"
                >
                  Get Started <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  to="/services"
                  className="bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 text-white font-medium py-4 px-10 rounded-full transition hover:scale-105 active:scale-95 duration-200"
                >
                  View Solutions
                </Link>
              </div>

              {/* Stats Grid inside Hero */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
                <div className="bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-2xl hover:bg-white/10 transition duration-300">
                  <BarChart className="w-8 h-8 text-blue-400 mb-3 mx-auto" />
                  <h3 className="text-3xl font-bold text-white mb-1">90%</h3>
                  <p className="text-xs text-gray-400 uppercase tracking-widest font-semibold">Lead Growth</p>
                </div>
                <div className="bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-2xl hover:bg-white/10 transition duration-300">
                  <Zap className="w-8 h-8 text-yellow-400 mb-3 mx-auto" />
                  <h3 className="text-3xl font-bold text-white mb-1">167%</h3>
                  <p className="text-xs text-gray-400 uppercase tracking-widest font-semibold">Traffic Boost</p>
                </div>
                <div className="bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-2xl hover:bg-white/10 transition duration-300">
                  <Users className="w-8 h-8 text-green-400 mb-3 mx-auto" />
                  <h3 className="text-3xl font-bold text-white mb-1">500+</h3>
                  <p className="text-xs text-gray-400 uppercase tracking-widest font-semibold">Happy Clients</p>
                </div>
                <div className="bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-2xl hover:bg-white/10 transition duration-300">
                  <Globe className="w-8 h-8 text-purple-400 mb-3 mx-auto" />
                  <h3 className="text-3xl font-bold text-white mb-1">10+</h3>
                  <p className="text-xs text-gray-400 uppercase tracking-widest font-semibold">Countries Served</p>
                </div>
              </div>
            </MotionDiv>
          </div>
        </div>
      </section>

      {/* Partner Marquee Section - Logos */}
      <section className="py-12 bg-transparent overflow-hidden">
        <div className="container mx-auto px-4 mb-8 text-center">
          <p className="text-sm font-semibold text-gray-400 uppercase tracking-widest">Our Technology Partners</p>
        </div>
        <div className="relative flex overflow-x-hidden">
          <MotionDiv
            className="flex gap-16 min-w-max items-center"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ repeat: Infinity, ease: "linear", duration: 30 }}
          >
            {[...PARTNERS, ...PARTNERS, ...PARTNERS].map((partner, idx) => (
              <div key={idx} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 flex items-center justify-center min-w-[140px] h-[70px]">
                <img 
                    src={partner.logo} 
                    alt={partner.name} 
                    className="h-8 md:h-10 w-auto object-contain hover:scale-105 transition-transform duration-300"
                />
              </div>
            ))}
          </MotionDiv>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-12 bg-white dark:bg-dark-card border-t border-b border-gray-100 dark:border-gray-800">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <span className="text-primary font-bold tracking-widest uppercase text-sm mb-2 block">Our Expertise</span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">Enterprise solutions for growth</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.slice(0, 6).map((service, index) => (
              <MotionDiv
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group bg-gray-50 dark:bg-[#151515] hover:bg-white dark:hover:bg-[#1a1a1a] rounded-3xl p-8 transition-all duration-300 border border-gray-200 dark:border-gray-800 hover:shadow-2xl hover:border-primary/30 flex flex-col h-full"
              >
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{service.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6 flex-grow">{service.shortDescription}</p>
                <Link
                  to={`/services/${service.slug}`}
                  className="mt-auto inline-flex items-center justify-center px-6 py-3 font-bold rounded-full bg-white dark:bg-gray-800 text-primary border border-gray-200 dark:border-gray-700 hover:bg-primary hover:text-white transition-all duration-300 shadow-sm hover:shadow-md w-fit"
                >
                  Learn more <ArrowRight size={18} className="ml-2" />
                </Link>
              </MotionDiv>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/services" className="inline-flex items-center justify-center px-8 py-4 font-bold rounded-full bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white hover:bg-primary hover:text-white transition-all duration-300">
              View All Solutions <ArrowRight size={18} className="ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section - Modern Grid */}
      <section className="py-24 bg-gray-50 dark:bg-[#0a0a0a]">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row gap-16 items-center mb-16">
            <div className="md:w-1/2">
              <span className="text-secondary dark:text-primary font-bold uppercase tracking-wider text-sm mb-2 block">Why Choose Us</span>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">We don't just deliver.<br /> We outperform.</h2>
              <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
                In a sea of agencies, Optimantix stands out by blending creative innovation with hard data. We build systems that scale as you grow.
              </p>
            </div>
            <div className="md:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-white dark:bg-dark-card p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 hover:border-primary/50 transition-colors">
                <TrendingUp className="text-primary mb-4" size={32} />
                <h3 className="font-bold text-lg mb-2 dark:text-white">Data-Driven</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Every decision is backed by analytics and A/B testing.</p>
              </div>
              <div className="bg-white dark:bg-dark-card p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 hover:border-primary/50 transition-colors">
                <Users className="text-primary mb-4" size={32} />
                <h3 className="font-bold text-lg mb-2 dark:text-white">Dedicated Team</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Direct access to project managers and developers.</p>
              </div>
              <div className="bg-white dark:bg-dark-card p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 hover:border-primary/50 transition-colors">
                <ShieldCheck className="text-primary mb-4" size={32} />
                <h3 className="font-bold text-lg mb-2 dark:text-white">Enterprise Security</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Bank-grade security protocols for all web assets.</p>
              </div>
              <div className="bg-white dark:bg-dark-card p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 hover:border-primary/50 transition-colors">
                <Clock className="text-primary mb-4" size={32} />
                <h3 className="font-bold text-lg mb-2 dark:text-white">Fast Turnaround</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Agile sprints ensure we launch faster than the competition.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <PortfolioSlider />

      {/* Process Section */}
      <section className="py-24 bg-white dark:bg-dark-card">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-stretch">
            <div className="order-2 lg:order-1 relative h-full min-h-[400px]">
              <div className="absolute inset-0 bg-primary/10 rounded-3xl transform -rotate-3 scale-105 h-full"></div>
              <img
                src="https://images.unsplash.com/photo-1762341114530-a0c54d8cc18b?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Team working"
                className="relative rounded-3xl shadow-2xl w-full h-full object-cover border border-gray-200 dark:border-gray-700"
              />
            </div>
            <div className="order-1 lg:order-2 flex flex-col justify-center">
              <span className="text-secondary dark:text-primary font-bold uppercase tracking-wider text-sm mb-2 block">How We Work</span>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">Our Proven Process</h2>
              <p className="text-gray-600 dark:text-gray-400 text-lg mb-8 leading-relaxed">
                We follow a structured approach to ensure every project delivers measurable results and exceeds expectations.
              </p>

              <div className="space-y-6">
                {WORK_PROCESS.map((step, idx) => (
                  <div key={idx} className="flex gap-4 group">
                    <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-gray-100 dark:bg-gray-800 group-hover:bg-primary text-gray-500 group-hover:text-white flex items-center justify-center font-bold text-lg shadow-sm transition-colors duration-300">
                      {idx + 1}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1 group-hover:text-primary transition-colors">{step.title}</h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed max-w-sm">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="py-24 bg-light dark:bg-dark border-t border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div className="max-w-2xl">
              <span className="text-primary font-bold uppercase tracking-wider text-sm mb-2 block">Latest Insights</span>
              <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white">Trends & Strategies</h2>
            </div>
            <Link to="/blog" className="hidden md:inline-flex items-center font-bold text-gray-900 dark:text-white hover:text-primary transition-colors group">
              View All Articles <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.slice(0, 3).map(blog => (
              <Link key={blog.id} to={`/blog/${blog.slug}`} className="group bg-white dark:bg-dark-card rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-800 flex flex-col h-full">
                <div className="h-56 overflow-hidden relative">
                  <img 
                    src={blog.imageUrl} 
                    alt={blog.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 bg-white/90 dark:bg-black/80 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-gray-800 dark:text-gray-200">
                     Blog
                  </div>
                </div>
                <div className="p-8 flex flex-col flex-grow">
                  <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-3 flex items-center gap-2">
                     <span>{new Date(blog.date).toLocaleDateString()}</span>
                     <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                     <span>{blog.author}</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-primary transition-colors line-clamp-2">
                    {blog.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-3 mb-6 flex-grow leading-relaxed">
                    {blog.excerpt}
                  </p>
                  <div className="flex items-center text-primary font-bold text-sm mt-auto">
                    Read More <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-10 text-center md:hidden">
              <Link to="/blog" className="inline-flex items-center font-bold text-gray-900 dark:text-white hover:text-primary transition-colors">
                  View All Articles <ArrowRight className="ml-2" />
              </Link>
          </div>
        </div>
      </section>

      {/* Industries */}
      <section className="py-20 bg-gray-50 dark:bg-[#0a0a0a]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-2">Trusted Across Industries</p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">Specialized Industry Expertise</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {INDUSTRIES.map((industry, idx) => {
              const icons = [ShoppingBag, Heart, GraduationCap, Building, Cpu, Shirt];
              const Icon = icons[idx % icons.length];
              return (
                <div key={idx} className="flex flex-col items-center justify-center p-6 bg-white dark:bg-dark-card rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 hover:border-primary hover:shadow-md transition-all duration-300 group text-center h-full">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-white transition-colors text-primary">
                    <Icon size={24} />
                  </div>
                  <span className="text-sm font-bold text-gray-700 dark:text-gray-300 group-hover:text-primary transition-colors">
                    {industry}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-gray-50 dark:bg-[#0a0a0a]">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <div className="text-center mb-16">
            <span className="text-primary font-bold uppercase tracking-wider text-sm mb-2 block">FAQ</span>
            <h2 className="text-3xl md:text-5xl font-bold mt-2 text-gray-900 dark:text-white">Common Questions</h2>
          </div>

          <div className="space-y-4">
            {FAQS.map((faq, idx) => (
              <div key={idx} className="bg-white dark:bg-dark-card rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden">
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full flex items-center justify-between p-6 text-left font-bold text-lg text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                >
                  {faq.question}
                  <span className={`p-2 rounded-full bg-gray-100 dark:bg-gray-800 transition-transform duration-300 ${openFaqIndex === idx ? 'rotate-180' : ''}`}>
                    <ChevronDown size={20} className="text-primary" />
                  </span>
                </button>
                <AnimatePresence>
                  {openFaqIndex === idx && (
                    <MotionDiv
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="p-6 pt-0 text-gray-600 dark:text-gray-400 leading-relaxed border-t border-gray-100 dark:border-gray-800">
                        {faq.answer}
                      </div>
                    </MotionDiv>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Client Section */}
      <section className="py-12 md:py-16 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-10 md:mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Trusted by Leading Brands
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Join hundreds of companies that trust us to drive their digital transformation
              </p>
            </motion.div>
          </div>

          {/* Client Logos Grid */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-wrap justify-center gap-8 md:gap-12"
          >
            {CLIENTS.map((client, index) => (
              <motion.a
                key={index}
                href={client.url}
                target="_blank"
                rel="noreferrer"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                whileHover={{ scale: 1.05 }}
                className="flex items-center justify-center p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 w-40 h-28 group relative"
              >
                 <ClientLogo client={client} />
              </motion.a>
            ))}
          </motion.div>
        </div>
      </section>

      


    </div>
  );
};
