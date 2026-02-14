
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, ArrowRight, Sun, Moon, ChevronRight as ChevronRightIcon } from 'lucide-react';
import { useData } from '../context/DataContext';
import { Icon } from './Icon';
import { motion, AnimatePresence } from 'framer-motion';

export const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [activeServiceId, setActiveServiceId] = useState<string | null>(null);
  
  const { services, isDark, toggleTheme } = useData();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setIsServicesOpen(false);
  }, [location]);

  // Set initial active service for Mega Menu
  useEffect(() => {
    if (services.length > 0 && !activeServiceId) {
        setActiveServiceId(services[0].id);
    }
  }, [services, activeServiceId]);

  return (
    <header 
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-white/95 dark:bg-dark/95 backdrop-blur-md shadow-lg py-3' 
          : 'bg-white/90 dark:bg-dark/80 backdrop-blur-sm py-4 border-b border-gray-100 dark:border-gray-800'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between relative">
        {/* Logo - Left */}
        <Link to="/" className="flex items-center gap-2 z-50 shrink-0">
           <img 
            src="https://i.ibb.co/ZphZDpdz/OS.png" 
            alt="Optimantix Global" 
            className="h-9 w-auto object-contain bg-white rounded p-1"
          />
        </Link>

        {/* Desktop Nav - Centered */}
        <nav className="hidden lg:flex items-center space-x-8 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 h-full">
          <Link to="/" className="font-medium text-gray-700 dark:text-gray-200 hover:text-primary transition">Home</Link>
          
          <div className="group static h-full flex items-center">
            <Link to="/services" className="flex items-center gap-1 font-medium text-gray-700 dark:text-gray-200 group-hover:text-primary transition py-4">
              Services <ChevronDown size={16} className="group-hover:rotate-180 transition-transform duration-300" />
            </Link>
            
            {/* Mega Menu Container */}
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-[90vw] max-w-6xl bg-white dark:bg-dark-card shadow-2xl border-t border-gray-100 dark:border-gray-800 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 rounded-b-xl mt-0 overflow-hidden z-50">
              <div className="flex h-[450px]">
                
                {/* Left Sidebar: Service Categories */}
                <div className="w-1/3 bg-gray-50 dark:bg-black/30 p-6 overflow-y-auto border-r border-gray-100 dark:border-gray-800">
                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">All Services</h3>
                    <div className="space-y-1">
                        {services.map(service => (
                            <button
                                key={service.id}
                                onMouseEnter={() => setActiveServiceId(service.id)}
                                onClick={() => setActiveServiceId(service.id)}
                                className={`w-full text-left px-4 py-3 rounded-lg flex items-center justify-between transition-all duration-200 ${
                                    activeServiceId === service.id 
                                    ? 'bg-primary text-white shadow-md' 
                                    : 'text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-800'
                                }`}
                            >
                                <span className="font-medium text-sm">{service.title}</span>
                                {activeServiceId === service.id && <ChevronRightIcon size={14} />}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Right Content: Sub Services */}
                <div className="w-2/3 p-8 bg-white dark:bg-dark-card overflow-y-auto">
                    {services.map(service => (
                        <div key={service.id} className={activeServiceId === service.id ? 'block' : 'hidden'}>
                            <div className="flex justify-between items-end mb-6 border-b border-gray-100 dark:border-gray-800 pb-4">
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">{service.title}</h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">{service.shortDescription}</p>
                                </div>
                                <Link to={`/services/${service.slug}`} className="text-primary text-sm font-bold hover:underline flex items-center">
                                    Main Page <ArrowRight size={14} className="ml-1" />
                                </Link>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                {service.subServices && service.subServices.length > 0 ? (
                                    service.subServices.map(sub => (
                                        <Link 
                                            key={sub.id} 
                                            to={`/services/${service.slug}/${sub.slug}`}
                                            className="group/item p-4 rounded-xl border border-gray-100 dark:border-gray-700 hover:border-primary/30 hover:bg-primary/5 dark:hover:bg-primary/10 transition-all duration-200"
                                        >
                                            <div className="flex items-center gap-2 mb-2">
                                                <div className="w-1 h-4 bg-primary rounded-full"></div>
                                                <h4 className="font-bold text-gray-800 dark:text-gray-200 text-sm group-hover/item:text-primary transition-colors">
                                                    {sub.title}
                                                </h4>
                                            </div>
                                            <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2 pl-3">
                                                {sub.shortDescription}
                                            </p>
                                        </Link>
                                    ))
                                ) : (
                                    <div className="col-span-2 text-center py-10 text-gray-400 text-sm">
                                        No specific sub-services listed. Please view the main service page for details.
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
              </div>
            </div>
          </div>

          <Link to="/blog" className="font-medium text-gray-700 dark:text-gray-200 hover:text-primary transition">Blog</Link>
          <Link to="/about" className="font-medium text-gray-700 dark:text-gray-200 hover:text-primary transition">About</Link>
          <Link to="/contact" className="font-medium text-gray-700 dark:text-gray-200 hover:text-primary transition">Contact</Link>
        </nav>

        {/* Actions - Right */}
        <div className="hidden lg:flex items-center gap-4 shrink-0">
          <button 
            onClick={toggleTheme}
            className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
          >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <Link 
            to="/contact"
            className="bg-primary hover:bg-secondary text-white px-6 py-2.5 rounded-full font-medium transition shadow-lg shadow-blue-200 dark:shadow-none flex items-center gap-2 text-sm"
          >
            Get Started <ArrowRight size={16} />
          </Link>
        </div>

        {/* Mobile Toggle */}
        <div className="lg:hidden flex items-center gap-4 ml-auto">
          <button 
            onClick={toggleTheme}
            className="p-2 rounded-full text-gray-600 dark:text-gray-300"
          >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button 
            className="text-gray-700 dark:text-white"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden absolute top-full left-0 w-full bg-white dark:bg-dark-card shadow-xl border-t border-gray-100 dark:border-gray-800 overflow-hidden max-h-[80vh] overflow-y-auto"
          >
            <div className="flex flex-col p-4 gap-4">
              <Link to="/" className="text-lg font-medium text-gray-800 dark:text-gray-200 p-2 hover:bg-gray-50 dark:hover:bg-gray-800 rounded">Home</Link>
              
              <div>
                <button 
                  onClick={() => setIsServicesOpen(!isServicesOpen)}
                  className="flex items-center justify-between w-full text-lg font-medium text-gray-800 dark:text-gray-200 p-2 hover:bg-gray-50 dark:hover:bg-gray-800 rounded"
                >
                  Services <ChevronDown size={20} className={`transition-transform ${isServicesOpen ? 'rotate-180' : ''}`} />
                </button>
                
                {isServicesOpen && (
                  <div className="pl-4 mt-2 space-y-4 border-l-2 border-gray-100 dark:border-gray-700 ml-4">
                    <Link to="/services" className="flex items-center gap-3 p-2 text-primary font-bold border-b border-gray-100 dark:border-gray-800">
                       <span className="text-sm">View All Services Main Page</span>
                    </Link>
                    {services.map(service => (
                      <div key={service.id} className="mb-4">
                         <Link 
                            to={`/services/${service.slug}`}
                            className="flex items-center gap-2 p-2 text-gray-800 dark:text-white font-semibold hover:text-primary"
                          >
                             <Icon name={service.iconName} size={16} />
                             <span className="text-sm">{service.title}</span>
                          </Link>
                          {/* Sub Services in Mobile */}
                          {service.subServices && (
                              <div className="pl-8 mt-1 space-y-1">
                                  {service.subServices.map(sub => (
                                      <Link
                                        key={sub.id}
                                        to={`/services/${service.slug}/${sub.slug}`}
                                        className="block p-2 text-sm text-gray-500 dark:text-gray-400 hover:text-primary"
                                      >
                                          {sub.title}
                                      </Link>
                                  ))}
                              </div>
                          )}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <Link to="/blog" className="text-lg font-medium text-gray-800 dark:text-gray-200 p-2 hover:bg-gray-50 dark:hover:bg-gray-800 rounded">Blog</Link>
              <Link to="/about" className="text-left text-lg font-medium text-gray-800 dark:text-gray-200 p-2 hover:bg-gray-50 dark:hover:bg-gray-800 rounded">About</Link>
              
              <Link 
                to="/contact" 
                className="bg-primary text-white text-center py-4 rounded-xl font-bold mt-4 w-full"
              >
                Get Started Now
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};