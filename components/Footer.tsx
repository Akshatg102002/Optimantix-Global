import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Linkedin, Instagram, Mail, Phone, MapPin } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-dark text-white pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div>
             <img 
              src="https://optimantix.com/wp-content/uploads/2022/08/Untitled-200-x-100-px-1.png" 
              alt="Optimantix Global" 
              className="h-12 w-auto object-contain mb-6 bg-white rounded p-1"
            />
            <p className="text-gray-400 mb-6 leading-relaxed">
              We empower businesses with cutting-edge digital solutions, from marketing to development. Your growth is our mission.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-primary transition"><Facebook size={20} /></a>
              <a href="#" className="text-gray-400 hover:text-primary transition"><Twitter size={20} /></a>
              <a href="#" className="text-gray-400 hover:text-primary transition"><Linkedin size={20} /></a>
              <a href="#" className="text-gray-400 hover:text-primary transition"><Instagram size={20} /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-6 text-white">Quick Links</h4>
            <ul className="space-y-3">
              <li><Link to="/" className="text-gray-400 hover:text-primary transition">Home</Link></li>
              <li><Link to="/blog" className="text-gray-400 hover:text-primary transition">Blog</Link></li>
              <li><Link to="/#about" className="text-gray-400 hover:text-primary transition">About Us</Link></li>
              <li><Link to="/admin" className="text-gray-400 hover:text-primary transition">Employee Login</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-bold mb-6 text-white">Services</h4>
            <ul className="space-y-3">
              <li><Link to="/services/digital-marketing" className="text-gray-400 hover:text-primary transition">Digital Marketing</Link></li>
              <li><Link to="/services/marketplace-management" className="text-gray-400 hover:text-primary transition">Marketplace Management</Link></li>
              <li><Link to="/services/development" className="text-gray-400 hover:text-primary transition">Web Development</Link></li>
              <li><Link to="/services/graphic-design" className="text-gray-400 hover:text-primary transition">Graphic Design</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-bold mb-6 text-white">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-gray-400">
                <MapPin className="text-primary shrink-0" size={20} />
                <span>123 Business Park, Tech City, Innovation State, 12345</span>
              </li>
              <li className="flex items-center gap-3 text-gray-400">
                <Phone className="text-primary shrink-0" size={20} />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-3 text-gray-400">
                <Mail className="text-primary shrink-0" size={20} />
                <span>hello@optimantix.com</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8 text-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} Optimantix Global. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};