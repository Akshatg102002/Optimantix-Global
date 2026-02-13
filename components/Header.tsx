import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, ChevronDown, ArrowRight } from 'lucide-react';
import { useData } from '../context/DataContext';
import { Icon } from './Icon';

export const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const { services } = useData();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setIsServicesOpen(false);
  }, [location]);

  // Handle navigation to sections like #contact
  const handleSectionClick = (sectionId: string) => {
    setIsOpen(false);
    if (location.pathname !== '/') {
      // If not on home, navigate to home and pass the section ID in state
      navigate('/', { state: { scrollTo: sectionId } });
    } else {
      // If already on home, just scroll
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <header 
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-white shadow-md py-2' : 'bg-white/90 backdrop-blur-md py-4 border-b border-gray-100'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 flex justify-between items-center relative">
        <Link to="/" className="flex items-center gap-2 z-50">
           <img 
            src="https://optimantix.com/wp-content/uploads/2022/08/Untitled-200-x-100-px-1.png" 
            alt="Optimantix Global" 
            className="h-10 w-auto object-contain"
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center space-x-8">
          <Link to="/" className="font-medium text-gray-700 hover:text-primary transition">Home</Link>
          
          {/* Mega Menu Trigger */}
          <div className="group static">
            <button className="flex items-center gap-1 font-medium text-gray-700 group-hover:text-primary transition py-4">
              Services <ChevronDown size={16} className="group-hover:rotate-180 transition-transform duration-300" />
            </button>
            
            {/* Mega Menu Content */}
            <div className="absolute top-full left-0 w-full bg-white shadow-2xl border-t border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top translate-y-2 group-hover:translate-y-0">
              <div className="container mx-auto px-4 md:px-6 py-8">
                <div className="grid grid-cols-12 gap-8">
                  {/* Menu Sidebar */}
                  <div className="col-span-3 bg-slate-50 p-6 rounded-xl border border-slate-100 flex flex-col justify-between">
                    <div>
                      <h3 className="font-bold text-lg text-secondary mb-2">Our Solutions</h3>
                      <p className="text-sm text-gray-500 mb-6 leading-relaxed">
                        Explore our comprehensive suite of digital services designed to scale your business.
                      </p>
                      <button 
                        onClick={() => handleSectionClick('contact')} 
                        className="inline-flex items-center text-primary font-bold text-sm hover:underline"
                      >
                        Book a Consultation <ArrowRight size={14} className="ml-1" />
                      </button>
                    </div>
                    <div className="mt-8">
                      <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Featured</div>
                      <Link to="/services/digital-marketing" className="block text-gray-800 font-medium hover:text-primary transition">
                        Growth Strategies &rarr;
                      </Link>
                    </div>
                  </div>

                  {/* Services Grid */}
                  <div className="col-span-9 grid grid-cols-2 lg:grid-cols-3 gap-6">
                    {services.map(service => (
                      <Link 
                        key={service.id} 
                        to={`/services/${service.slug}`}
                        className="group/item flex items-start gap-4 p-4 rounded-xl hover:bg-slate-50 transition duration-200 border border-transparent hover:border-slate-100"
                      >
                        <div className="bg-white p-2.5 rounded-lg shadow-sm text-secondary group-hover/item:text-primary group-hover/item:scale-110 transition-all duration-300 border border-slate-100">
                          <Icon name={service.iconName} size={20} />
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-800 text-sm mb-1 group-hover/item:text-primary transition-colors">
                            {service.title}
                          </h4>
                          <p className="text-xs text-gray-500 leading-relaxed line-clamp-2">
                            {service.shortDescription}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Link to="/blog" className="font-medium text-gray-700 hover:text-primary transition">Blog</Link>
          <Link to="/admin" className="font-medium text-gray-700 hover:text-primary transition">Admin</Link>
        </nav>

        <div className="hidden lg:block">
          <button 
            onClick={() => handleSectionClick('contact')}
            className="bg-primary hover:bg-red-500 text-white px-6 py-2.5 rounded-full font-medium transition shadow-lg shadow-red-200 flex items-center gap-2"
          >
            Get Started <ArrowRight size={16} />
          </button>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="lg:hidden text-gray-700"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-white shadow-xl border-t border-gray-100 h-[calc(100vh-80px)] overflow-y-auto">
          <div className="flex flex-col p-4 gap-4">
            <Link to="/" className="text-lg font-medium text-gray-800 p-2 hover:bg-gray-50 rounded">Home</Link>
            
            {/* Mobile Accordion */}
            <div>
              <button 
                onClick={() => setIsServicesOpen(!isServicesOpen)}
                className="flex items-center justify-between w-full text-lg font-medium text-gray-800 p-2 hover:bg-gray-50 rounded"
              >
                Services <ChevronDown size={20} className={`transition-transform ${isServicesOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {isServicesOpen && (
                <div className="pl-4 mt-2 space-y-2 border-l-2 border-gray-100 ml-4">
                  {services.map(service => (
                    <Link 
                      key={service.id} 
                      to={`/services/${service.slug}`}
                      className="flex items-center gap-3 p-2 text-gray-600 hover:text-primary"
                    >
                       <Icon name={service.iconName} size={16} />
                       <span className="text-sm font-medium">{service.title}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link to="/blog" className="text-lg font-medium text-gray-800 p-2 hover:bg-gray-50 rounded">Blog</Link>
            <Link to="/admin" className="text-lg font-medium text-gray-800 p-2 hover:bg-gray-50 rounded">Admin Panel</Link>
            
            <button 
              onClick={() => handleSectionClick('contact')} 
              className="bg-primary text-white text-center py-4 rounded-xl font-bold mt-4 shadow-lg shadow-red-100 w-full"
            >
              Get Started Now
            </button>
          </div>
        </div>
      )}
    </header>
  );
};