
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, ArrowRight, Sun, Moon, ChevronRight as ChevronRightIcon, Home, Briefcase, FileText, Info, Phone, Globe, Server } from 'lucide-react';
import { useData } from '../context/DataContext';
import { Icon } from './Icon';
import { motion, AnimatePresence } from 'framer-motion';

export const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [activeServiceId, setActiveServiceId] = useState<string | null>(null);
  const { services, isDark, toggleTheme, setGlobalLoading } = useData();
  const location = useLocation();

  const MotionDiv = motion.div as any;

  useEffect(() => {
    // Force close on any location change
    setIsOpen(false);
    setIsServicesOpen(false);
  }, [location]);

  // Set initial active service for Mega Menu
  useEffect(() => {
    if (services.length > 0 && !activeServiceId) {
      setActiveServiceId(services[0].id);
    }
  }, [services, activeServiceId]);

  const handleNavClick = () => {
      // 1. Close Menu Immediately
      setIsServicesOpen(false);
      setIsOpen(false);
      
      // 2. Trigger Global Loading Animation to simulate page transition
      setGlobalLoading(true);
      setTimeout(() => {
          setGlobalLoading(false);
      }, 800); // 0.8s fake load time
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 lg:px-8 pt-4 pb-4 bg-[#020514]">
        <nav className="max-w-7xl mx-auto bg-white/95 dark:bg-gray-900/95 backdrop-blur-md rounded-xl shadow-lg relative">
          <div className="flex justify-between items-center h-20 px-6">
            {/* Logo - Left */}
            <Link to="/" onClick={handleNavClick} className="flex items-center space-x-2 z-10">
              <img
                src="https://i.ibb.co/FkFfTxxC/opti.png"
                alt="Optimantix Logo"
                className="h-10 w-auto"
              />
            </Link>

            {/* Desktop Nav - Centered */}
            <div className="hidden lg:flex flex-1 justify-center items-center space-x-2">
              <Link to="/" onClick={handleNavClick} className="flex items-center gap-2 px-4 py-2 rounded-full font-medium text-gray-700 dark:text-gray-200 hover:text-primary hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200">
                <Home className="w-4 h-4" />
                <span>Home</span>
              </Link>

              {/* Wrapper without relative so absolute children align to nav */}
              <div
                className="group h-full flex items-center"
                onMouseEnter={() => setIsServicesOpen(true)}
                onMouseLeave={() => setIsServicesOpen(false)}
              >
                <button 
                  className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium transition-all duration-200 ${isServicesOpen ? 'text-primary bg-gray-100 dark:bg-gray-800' : 'text-gray-700 dark:text-gray-200 hover:text-primary hover:bg-gray-100 dark:hover:bg-gray-800'}`}
                >
                  <Briefcase className="w-4 h-4" />
                  <span>Solutions</span>
                  <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${isServicesOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Mega Menu Container - Absolute to nav */}
                <AnimatePresence>
                  {isServicesOpen && (
                    <MotionDiv
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute left-0 top-full w-full z-50 pt-4 px-4"
                    >
                      {/* Inner Centered Container */}
                      <div className="max-w-6xl mx-auto">
                        {/* Inner Card - Enable pointer events here */}
                        <div className="bg-white dark:bg-gray-900 rounded-xl overflow-hidden shadow-2xl border border-gray-100 dark:border-gray-800 flex h-[450px]">
                            {/* Left Sidebar: Service Categories */}
                            <div className="w-64 bg-gray-50 dark:bg-gray-800 p-3 overflow-y-auto border-r border-gray-200 dark:border-gray-700 custom-scrollbar">
                            <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2 px-3 pt-2">
                                All Solutions
                            </h3>
                            {services.map(service => (
                                <button
                                key={service.id}
                                onMouseEnter={() => setActiveServiceId(service.id)}
                                onClick={() => {
                                    setActiveServiceId(service.id);
                                }}
                                className={`w-full text-left text-sm px-3 py-3 mb-1 rounded-lg flex items-center justify-between transition-all duration-200 ${activeServiceId === service.id
                                    ? 'bg-primary text-white font-medium shadow-md'
                                    : 'text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700'
                                    }`}
                                >
                                <span className="truncate">{service.title}</span>
                                {activeServiceId === service.id && <ChevronRightIcon className="h-4 w-4 flex-shrink-0" />}
                                </button>
                            ))}
                            </div>

                            {/* Right Content: Sub Services */}
                            <div className="flex-1 p-8 overflow-y-auto bg-white dark:bg-gray-900 custom-scrollbar">
                            {services.map(service => (
                                <div
                                key={service.id}
                                className={activeServiceId === service.id ? 'block animate-fadeIn h-full flex flex-col' : 'hidden'}
                                >
                                <div className="flex items-start justify-between mb-6">
                                    <div>
                                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-3">
                                            <div className="p-2 bg-primary/10 rounded-lg text-primary">
                                                <Icon name={service.iconName} size={24} />
                                            </div>
                                            {service.title}
                                        </h3>
                                        <p className="text-sm text-gray-600 dark:text-gray-400 max-w-md">
                                            {service.shortDescription}
                                        </p>
                                    </div>
                                    <Link
                                        to={`/services/${service.slug}`}
                                        onClick={handleNavClick}
                                        className="text-sm font-bold text-primary hover:text-secondary flex items-center gap-1 bg-primary/5 px-4 py-2 rounded-lg transition-colors hover:bg-primary/10"
                                    >
                                        Main Page <ArrowRight size={16} />
                                    </Link>
                                </div>

                                <div className="h-px bg-gray-100 dark:bg-gray-800 w-full mb-6"></div>

                                {service.subServices && service.subServices.length > 0 ? (
                                    <div className="grid grid-cols-2 gap-4 overflow-y-auto pr-2">
                                    {service.subServices.map(sub => (
                                        <Link
                                        key={sub.id}
                                        to={`/services/${service.slug}/${sub.slug}`}
                                        onClick={handleNavClick}
                                        className="group block p-4 rounded-xl border border-gray-100 dark:border-gray-800 hover:border-primary/30 dark:hover:border-primary/30 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-all shadow-sm hover:shadow-md"
                                        >
                                        <h4 className="text-sm font-bold text-gray-900 dark:text-white mb-1 group-hover:text-primary transition-colors flex items-center justify-between">
                                            {sub.title}
                                            <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300" />
                                        </h4>
                                        <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2 leading-relaxed">
                                            {sub.shortDescription}
                                        </p>
                                        </Link>
                                    ))}
                                    </div>
                                ) : (
                                    <div className="flex flex-col items-center justify-center flex-grow text-center bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-dashed border-gray-200 dark:border-gray-700 p-8">
                                        <p className="text-gray-500 dark:text-gray-400 italic mb-4">
                                            Explore our comprehensive services on the main page.
                                        </p>
                                        <Link
                                            to={`/services/${service.slug}`}
                                            onClick={handleNavClick}
                                            className="bg-primary text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-secondary transition-colors shadow-lg shadow-primary/20"
                                        >
                                            Visit {service.title}
                                        </Link>
                                    </div>
                                )}
                                </div>
                            ))}
                            </div>
                        </div>
                      </div>
                    </MotionDiv>
                  )}
                </AnimatePresence>
              </div>

              <Link to="/google-workspace" onClick={handleNavClick} className="flex items-center gap-2 px-4 py-2 rounded-full font-medium text-gray-700 dark:text-gray-200 hover:text-primary hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200">
                <Globe className="w-4 h-4" />
                <span>Workspace</span>
              </Link>
              <Link to="/hosting" onClick={handleNavClick} className="flex items-center gap-2 px-4 py-2 rounded-full font-medium text-gray-700 dark:text-gray-200 hover:text-primary hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200">
                <Server className="w-4 h-4" />
                <span>Hosting</span>
              </Link>
              <Link to="/blog" onClick={handleNavClick} className="flex items-center gap-2 px-4 py-2 rounded-full font-medium text-gray-700 dark:text-gray-200 hover:text-primary hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200">
                <FileText className="w-4 h-4" />
                <span>Blog</span>
              </Link>
              <Link to="/about" onClick={handleNavClick} className="flex items-center gap-2 px-4 py-2 rounded-full font-medium text-gray-700 dark:text-gray-200 hover:text-primary hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200">
                <Info className="w-4 h-4" />
                <span>About</span>
              </Link>
              <Link to="/contact" onClick={handleNavClick} className="flex items-center gap-2 px-4 py-2 rounded-full font-medium text-gray-700 dark:text-gray-200 hover:text-primary hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200">
                <Phone className="w-4 h-4" />
                <span>Contact</span>
              </Link>
            </div>

            {/* Actions - Right */}
            <div className="hidden lg:flex items-center space-x-4">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </button>
              <Link
                to="/contact"
                onClick={handleNavClick}
                className="bg-primary text-white px-6 py-2.5 rounded-full font-medium hover:bg-primary-dark transition-colors flex items-center space-x-2 shadow-lg shadow-primary/20 hover:scale-105 duration-200"
              >
                <span>Get Started</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            {/* Mobile Toggle */}
            <div className="lg:hidden flex items-center space-x-2">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </button>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </nav>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden mt-2 bg-white dark:bg-gray-900 rounded-3xl shadow-lg overflow-hidden border border-gray-100 dark:border-gray-800 max-h-[calc(100vh-100px)] overflow-y-auto">
            <div className="px-4 py-4 space-y-3">
              <Link to="/" onClick={handleNavClick} className="flex items-center gap-3 text-lg font-medium text-gray-800 dark:text-gray-200 p-3 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-xl transition-colors">
                <Home className="w-5 h-5 text-primary" />
                <span>Home</span>
              </Link>

              <div>
                <button
                  onClick={() => setIsServicesOpen(!isServicesOpen)}
                  className="flex items-center justify-between w-full text-lg font-medium text-gray-800 dark:text-gray-200 p-3 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-xl transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <Briefcase className="w-5 h-5 text-primary" />
                    <span>Solutions</span>
                  </div>
                  <ChevronDown className={`h-5 w-5 transition-transform ${isServicesOpen ? 'rotate-180' : ''}`} />
                </button>

                {isServicesOpen && (
                  <div className="mt-2 ml-4 space-y-2 border-l-2 border-gray-200 dark:border-gray-700 pl-4">
                    <Link
                      to="/services"
                      onClick={handleNavClick}
                      className="block text-sm font-medium text-primary hover:text-primary-dark p-2"
                    >
                      View All Solutions
                    </Link>

                    {services.map(service => (
                      <div key={service.id} className="space-y-1">
                        <Link
                          to={`/services/${service.slug}`}
                          onClick={handleNavClick}
                          className="block text-base font-medium text-gray-700 dark:text-gray-300 hover:text-primary p-2"
                        >
                          {service.title}
                        </Link>

                        {/* Sub Services in Mobile */}
                        {service.subServices && (
                          <div className="ml-3 space-y-1">
                            {service.subServices.map(sub => (
                              <Link
                                key={sub.id}
                                to={`/services/${service.slug}/${sub.slug}`}
                                onClick={handleNavClick}
                                className="block text-sm text-gray-600 dark:text-gray-400 hover:text-primary p-2"
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

              <Link to="/google-workspace" onClick={handleNavClick} className="flex items-center gap-3 text-lg font-medium text-gray-800 dark:text-gray-200 p-3 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-xl transition-colors">
                <Globe className="w-5 h-5 text-primary" />
                <span>Google Workspace</span>
              </Link>

              <Link to="/hosting" onClick={handleNavClick} className="flex items-center gap-3 text-lg font-medium text-gray-800 dark:text-gray-200 p-3 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-xl transition-colors">
                <Server className="w-5 h-5 text-primary" />
                <span>Hosting Solutions</span>
              </Link>

              <Link to="/blog" onClick={handleNavClick} className="flex items-center gap-3 text-lg font-medium text-gray-800 dark:text-gray-200 p-3 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-xl transition-colors">
                <FileText className="w-5 h-5 text-primary" />
                <span>Blog</span>
              </Link>
              <Link to="/about" onClick={handleNavClick} className="flex items-center gap-3 text-lg font-medium text-gray-800 dark:text-gray-200 p-3 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-xl transition-colors">
                <Info className="w-5 h-5 text-primary" />
                <span>About</span>
              </Link>
              <Link
                to="/contact"
                onClick={handleNavClick}
                className="block bg-primary text-white px-4 py-3 rounded-xl font-medium text-center hover:bg-primary-dark transition-colors shadow-lg shadow-primary/20 mt-4"
              >
                Get Started Now
              </Link>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
