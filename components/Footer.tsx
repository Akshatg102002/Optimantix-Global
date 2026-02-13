import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Facebook, Twitter, Linkedin, Instagram, Mail, Phone, MapPin, ChevronRight } from 'lucide-react';

export const Footer: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (e: React.MouseEvent, path: string, sectionId?: string) => {
    e.preventDefault();
    if (sectionId) {
      if (location.pathname !== '/') {
        navigate('/', { state: { scrollTo: sectionId } });
      } else {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    } else {
      navigate(path);
      window.scrollTo(0, 0);
    }
  };

  return (
    <footer className="bg-dark text-white pt-16 pb-8 border-t border-gray-800">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="space-y-6">
             <img 
              src="https://optimantix.com/wp-content/uploads/2022/08/Untitled-200-x-100-px-1.png" 
              alt="Optimantix Global" 
              className="h-12 w-auto object-contain bg-white rounded-lg p-2"
            />
            <p className="text-gray-400 leading-relaxed text-sm">
              We empower businesses with cutting-edge digital solutions, from marketing to development. Your growth is our mission.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-primary hover:text-white transition-all duration-300"><Facebook size={18} /></a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-primary hover:text-white transition-all duration-300"><Twitter size={18} /></a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-primary hover:text-white transition-all duration-300"><Linkedin size={18} /></a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-primary hover:text-white transition-all duration-300"><Instagram size={18} /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-6 text-white border-b border-gray-700 pb-2 inline-block">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <button onClick={(e) => handleNavigation(e, '/')} className="text-gray-400 hover:text-primary transition flex items-center gap-2 group">
                  <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" /> Home
                </button>
              </li>
              <li>
                <button onClick={(e) => handleNavigation(e, '/blog')} className="text-gray-400 hover:text-primary transition flex items-center gap-2 group">
                  <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" /> Blog
                </button>
              </li>
              <li>
                <button onClick={(e) => handleNavigation(e, '/', 'about')} className="text-gray-400 hover:text-primary transition flex items-center gap-2 group">
                  <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" /> About Us
                </button>
              </li>
              <li>
                <button onClick={(e) => handleNavigation(e, '/admin')} className="text-gray-400 hover:text-primary transition flex items-center gap-2 group">
                  <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" /> Employee Login
                </button>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-bold mb-6 text-white border-b border-gray-700 pb-2 inline-block">Services</h4>
            <ul className="space-y-3">
              <li><Link to="/services/digital-marketing" className="text-gray-400 hover:text-primary transition flex items-center gap-2 group"><ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" /> Digital Marketing</Link></li>
              <li><Link to="/services/marketplace-management" className="text-gray-400 hover:text-primary transition flex items-center gap-2 group"><ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" /> Marketplace Management</Link></li>
              <li><Link to="/services/development" className="text-gray-400 hover:text-primary transition flex items-center gap-2 group"><ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" /> Web Development</Link></li>
              <li><Link to="/services/graphic-design" className="text-gray-400 hover:text-primary transition flex items-center gap-2 group"><ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" /> Graphic Design</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-bold mb-6 text-white border-b border-gray-700 pb-2 inline-block">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-gray-400">
                <MapPin className="text-primary shrink-0 mt-1" size={18} />
                <span className="text-sm">123 Business Park, Tech City, Innovation State, 12345</span>
              </li>
              <li className="flex items-center gap-3 text-gray-400">
                <Phone className="text-primary shrink-0" size={18} />
                <span className="text-sm">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-3 text-gray-400">
                <Mail className="text-primary shrink-0" size={18} />
                <span className="text-sm">hello@optimantix.com</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} Optimantix Global. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
             <a href="#" className="hover:text-white transition">Privacy Policy</a>
             <a href="#" className="hover:text-white transition">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};