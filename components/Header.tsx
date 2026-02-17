
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, ArrowRight, Sun, Moon, ChevronRight as ChevronRightIcon } from 'lucide-react';
import { useData } from '../context/DataContext';
import { Icon } from './Icon';
import { motion, AnimatePresence } from 'framer-motion';

export const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [activeServiceId, setActiveServiceId] = useState<string | null>(null);
  const { services, isDark, toggleTheme } = useData();
  const location = useLocation();

  const MotionDiv = motion.div as any;

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
    <>
      <header className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 lg:px-8 pt-4 pb-4 bg-[#020514]">
        <nav className="max-w-7xl mx-auto bg-white/95 dark:bg-gray-900/95 backdrop-blur-md rounded-xl shadow-lg">
          <div className="flex justify-between items-center h-16 px-6">
            {/* Logo - Left */}
            <Link to="/" className="flex items-center space-x-2 z-10">
              <img
                src="https://optimantix.com/wp-content/uploads/2022/08/Untitled-200-x-100-px-1.png"
                alt="Optimantix Logo"
                className="h-12 w-auto"
              />
            </Link>

            {/* Desktop Nav - Centered */}
            <div className="hidden lg:flex items-center space-x-8 absolute left-1/2 transform -translate-x-1/2">
              <Link to="/" className="font-medium text-gray-700 dark:text-gray-200 hover:text-primary transition-colors">
                Home
              </Link>

              <div
                className="relative group"
                onMouseEnter={() => setIsServicesOpen(true)}
                onMouseLeave={() => setIsServicesOpen(false)}
              >
                <button className="font-medium text-gray-700 dark:text-gray-200 hover:text-primary transition-colors flex items-center space-x-1">
                  <span>Solutions</span>
                  <ChevronDown className="h-4 w-4" />
                </button>

                {/* Mega Menu Container */}
                <AnimatePresence>
                  {isServicesOpen && (
                    <MotionDiv
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute left-1/2 transform -translate-x-1/2 mt-2 w-[800px] bg-white dark:bg-gray-900 rounded-xl overflow-hidden shadow-xl border border-gray-100 dark:border-gray-800"
                    >
                      <div className="flex h-[400px]">
                        {/* Left Sidebar: Service Categories */}
                        <div className="w-56 bg-gray-50 dark:bg-gray-800 p-3 overflow-y-auto border-r border-gray-200 dark:border-gray-700">
                          <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2 px-3">
                            All Solutions
                          </h3>
                          {services.map(service => (
                            <button
                              key={service.id}
                              onMouseEnter={() => setActiveServiceId(service.id)}
                              onClick={() => setActiveServiceId(service.id)}
                              className={`w-full text-left text-sm px-3 py-2 rounded-lg flex items-center justify-between transition-all duration-200 ${activeServiceId === service.id
                                  ? 'bg-primary text-white'
                                  : 'text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700'
                                }`}
                            >
                              <span>{service.title}</span>
                              {activeServiceId === service.id && <ChevronRightIcon className="h-4 w-4" />}
                            </button>
                          ))}
                        </div>

                        {/* Right Content: Sub Services */}
                        <div className="flex-1 p-4 overflow-y-auto">
                          {services.map(service => (
                            <div
                              key={service.id}
                              className={activeServiceId === service.id ? 'block' : 'hidden'}
                            >
                              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
                                {service.title}
                              </h3>
                              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                                {service.shortDescription}
                              </p>

                              <Link
                                to={`/services/${service.slug}`}
                                className="inline-flex items-center space-x-2 text-sm font-medium text-primary hover:text-primary-dark mb-4"
                              >
                                <span>View Main Page</span>
                                <ArrowRight className="h-4 w-4" />
                              </Link>

                              {service.subServices && service.subServices.length > 0 ? (
                                <div className="grid grid-cols-2 gap-3">
                                  {service.subServices.map(sub => (
                                    <Link
                                      key={sub.id}
                                      to={`/services/${service.slug}/${sub.slug}`}
                                      className="block p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors group"
                                    >
                                      <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-1 group-hover:text-primary">
                                        {sub.title}
                                      </h4>
                                      <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2">
                                        {sub.shortDescription}
                                      </p>
                                    </Link>
                                  ))}
                                </div>
                              ) : (
                                <p className="text-sm text-gray-500 dark:text-gray-400 italic">
                                  No specific sub-solutions listed. Please view the main page for details.
                                </p>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    </MotionDiv>
                  )}
                </AnimatePresence>
              </div>

              <Link to="/blog" className="font-medium text-gray-700 dark:text-gray-200 hover:text-primary transition-colors">
                Blog
              </Link>
              <Link to="/about" className="font-medium text-gray-700 dark:text-gray-200 hover:text-primary transition-colors">
                About
              </Link>
              <Link to="/contact" className="font-medium text-gray-700 dark:text-gray-200 hover:text-primary transition-colors">
                Contact
              </Link>
            </div>

            {/* Actions - Right */}
            <div className="hidden lg:flex items-center space-x-4">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </button>
              <Link
                to="/contact"
                className="bg-primary text-white px-5 py-2.5 rounded-xl font-medium hover:bg-primary-dark transition-colors flex items-center space-x-2"
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
          <div className="lg:hidden mt-2 bg-white dark:bg-gray-900 rounded-3xl shadow-lg overflow-hidden">
            <div className="px-4 py-4 space-y-3">
              <Link to="/" className="block text-lg font-medium text-gray-800 dark:text-gray-200 p-2 hover:bg-gray-50 dark:hover:bg-gray-800 rounded">
                Home
              </Link>

              <div>
                <button
                  onClick={() => setIsServicesOpen(!isServicesOpen)}
                  className="flex items-center justify-between w-full text-lg font-medium text-gray-800 dark:text-gray-200 p-2 hover:bg-gray-50 dark:hover:bg-gray-800 rounded"
                >
                  <span>Solutions</span>
                  <ChevronDown className={`h-5 w-5 transition-transform ${isServicesOpen ? 'rotate-180' : ''}`} />
                </button>

                {isServicesOpen && (
                  <div className="mt-2 ml-4 space-y-2 border-l-2 border-gray-200 dark:border-gray-700 pl-4">
                    <Link
                      to="/services"
                      className="block text-sm font-medium text-primary hover:text-primary-dark p-2"
                    >
                      View All Solutions
                    </Link>

                    {services.map(service => (
                      <div key={service.id} className="space-y-1">
                        <Link
                          to={`/services/${service.slug}`}
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

              <Link to="/blog" className="block text-lg font-medium text-gray-800 dark:text-gray-200 p-2 hover:bg-gray-50 dark:hover:bg-gray-800 rounded">
                Blog
              </Link>
              <Link to="/about" className="block text-lg font-medium text-gray-800 dark:text-gray-200 p-2 hover:bg-gray-50 dark:hover:bg-gray-800 rounded">
                About
              </Link>
              <Link
                to="/contact"
                className="block bg-primary text-white px-4 py-3 rounded-lg font-medium text-center hover:bg-primary-dark transition-colors"
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
