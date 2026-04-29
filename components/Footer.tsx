import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Facebook, Linkedin, Instagram, Mail, Phone, MapPin, Lock } from 'lucide-react';

export const Footer: React.FC = () => {
  const navigate = useNavigate();

  const handleNavigation = (e: React.MouseEvent, path: string) => {
    e.preventDefault();
    navigate(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-dark text-white pt-16 pb-8 border-t border-gray-800">
      <div className="container mx-auto px-4 md:px-6">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">

          {/* Brand */}
          <div className="space-y-6">
            <img
              src="https://i.ibb.co/ZphZDpdz/OS.png"
              alt="Optimantix Global"
              className="h-12 bg-white rounded-lg p-2"
            />

            <p className="text-gray-400 text-sm leading-relaxed">
              We empower businesses with innovative digital marketing and technology-driven solutions.
            </p>

            <div className="flex space-x-4 text-gray-400">
              <a href="https://www.facebook.com/optimantix" target="_blank" rel="noreferrer" className="hover:text-white transition">
                <Facebook size={18} />
              </a>
              <a href="https://in.linkedin.com/company/optimantix" target="_blank" rel="noreferrer" className="hover:text-white transition">
                <Linkedin size={18} />
              </a>
              <a href="https://www.instagram.com/optimantix/" target="_blank" rel="noreferrer" className="hover:text-white transition">
                <Instagram size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-6 border-b border-gray-700 pb-2 inline-block">
              Quick Links
            </h4>

            <ul className="space-y-3">
              <li>
                <button onClick={(e) => handleNavigation(e, '/')} className="footer-link">
                  Home
                </button>
              </li>

              <li>
                <button onClick={(e) => handleNavigation(e, '/blog')} className="footer-link">
                  Blog
                </button>
              </li>

              <li>
                <button onClick={(e) => handleNavigation(e, '/about')} className="footer-link">
                  About Us
                </button>
              </li>

              <li>
                <button onClick={(e) => handleNavigation(e, '/contact')} className="footer-link">
                  Contact Us
                </button>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-bold mb-6 border-b border-gray-700 pb-2 inline-block">
              Services
            </h4>

            <ul className="space-y-3">
              <li>
                <Link to="/services/digital-marketing" className="footer-link">
                  Digital Marketing
                </Link>
              </li>

              <li>
                <Link to="/services/marketplace-management" className="footer-link">
                  Marketplace Management
                </Link>
              </li>

              <li>
                <Link to="/services/development" className="footer-link">
                  Web Development
                </Link>
              </li>

              <li>
                <Link to="/services/graphic-design" className="footer-link">
                  Branding
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-bold mb-6 border-b border-gray-700 pb-2 inline-block">
              Contact Us
            </h4>

            <ul className="space-y-4 text-gray-400 text-sm">
              <li className="flex items-center gap-2"><MapPin size={16} /> Noida, India</li>
              <li className="flex items-center gap-2"><Phone size={16} /> +91 9910343016</li>
              <li className="flex items-center gap-2"><Mail size={16} /> info@optimantix.com</li>
            </ul>
          </div>

        </div>

        {/* Bottom */}
        <div className="border-t border-gray-800 pt-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500 gap-4">
          <p>© {new Date().getFullYear()} Optimantix Global. All rights reserved.</p>

          <Link to="/admin/login" className="flex items-center gap-1 hover:text-white transition">
            <Lock size={12} /> Employee Login
          </Link>
        </div>
      </div>
    </footer>
  );
};
