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

  const services = [
    {
      label: 'Digital Marketing',
      href: '/services/digital-marketing',
      sub: [
        { label: 'SEO', href: '/services/digital-marketing/seo' },
        { label: 'Pay-Per-Click (PPC)', href: '/services/digital-marketing/ppc' },
        { label: 'Social Media Marketing', href: '/services/digital-marketing/smm' },
      ],
    },
    {
      label: 'Marketplace Management',
      href: '/services/marketplace-management',
      sub: [
        { label: 'Amazon', href: '/services/marketplace-management/amazon' },
        { label: 'Flipkart', href: '/services/marketplace-management/flipkart' },
        { label: 'Nykaa', href: '/services/marketplace-management/nykaa' },
        { label: 'Blinkit & Zepto', href: '/services/marketplace-management/blinkit-zepto' },
        { label: 'Meesho', href: '/services/marketplace-management/meesho' },
        { label: 'Myntra', href: '/services/marketplace-management/myntra' },
      ],
    },
    {
      label: 'Web Development',
      href: '/services/development',
      sub: [
        { label: 'Ecommerce Development', href: '/services/development/ecommerce-development' },
        { label: 'WordPress Development', href: '/services/development/wordpress-development' },
      ],
    },
    {
      label: 'Graphic Design',
      href: '/services/graphic-design',
      sub: [
        { label: 'Logo & Identity', href: '/services/graphic-design/logo-design' },
        { label: 'Packaging Design', href: '/services/graphic-design/packaging' },
      ],
    },
    {
      label: 'Hosting Solutions',
      href: '/services/hosting',
      sub: [
        { label: 'VPS Hosting', href: '/services/hosting/vps' },
        { label: 'Cloud Solutions', href: '/services/hosting/cloud' },
      ],
    },
    {
      label: 'Communications',
      href: '/services/communications',
      sub: [
        { label: 'Email Marketing', href: '/services/communications/email-marketing' },
        { label: 'WhatsApp Business API', href: '/services/communications/whatsapp-api' },
      ],
    },
  ];

  return (
    <footer className="bg-dark text-white pt-16 pb-8 border-t border-gray-800">
      <div className="container mx-auto px-4 md:px-6">

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 mb-12">

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

            {/* Quick Links — sits under brand on desktop */}
            <div className="pt-2">
              <h4 className="text-sm font-bold mb-4 text-gray-300 uppercase tracking-wider">
                Quick Links
              </h4>
              <ul className="space-y-2">
                <li><button onClick={(e) => handleNavigation(e, '/')} className="footer-link text-sm">Home</button></li>
                <li><button onClick={(e) => handleNavigation(e, '/blog')} className="footer-link text-sm">Blog</button></li>
                <li><button onClick={(e) => handleNavigation(e, '/about')} className="footer-link text-sm">About Us</button></li>
                <li><button onClick={(e) => handleNavigation(e, '/contact')} className="footer-link text-sm">Contact Us</button></li>
              </ul>
            </div>
          </div>

          {/* Services — 3 columns × 2 rows inside the remaining 3 grid columns */}
          <div className="lg:col-span-3">
            <h4 className="text-lg font-bold mb-6 border-b border-gray-700 pb-2 inline-block">
              Our Services
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-8">
              {services.map((service) => (
                <div key={service.href}>
                  <Link
                    to={service.href}
                    className="text-white text-sm font-semibold hover:text-primary transition-colors block mb-3"
                  >
                    {service.label}
                  </Link>
                  <ul className="space-y-2">
                    {service.sub.map((sub) => (
                      <li key={sub.href}>
                        <Link to={sub.href} className="footer-link text-xs leading-snug">
                          {sub.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Contact — sits under services on desktop */}
            <div className="mt-10 pt-8 border-t border-gray-800">
              <h4 className="text-sm font-bold mb-4 text-gray-300 uppercase tracking-wider">
                Contact Us
              </h4>
              <ul className="flex flex-wrap gap-x-10 gap-y-3 text-gray-400 text-sm">
                <li className="flex items-center gap-2"><MapPin size={15} /> Noida, India</li>
                <li className="flex items-center gap-2"><Phone size={15} /> +91 9910343016</li>
                <li className="flex items-center gap-2"><Mail size={15} /> info@optimantix.com</li>
              </ul>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
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