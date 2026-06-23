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

  const marketplaces = [
    { label: 'Amazon', href: '/services/marketplace-management/amazon' },
    { label: 'Flipkart', href: '/services/marketplace-management/flipkart' },
    { label: 'Meesho', href: '/services/marketplace-management/meesho' },
    { label: 'Myntra', href: '/services/marketplace-management/myntra' },
    { label: 'Nykaa', href: '/services/marketplace-management/nykaa' },
    { label: 'Ajio', href: '/services/marketplace-management' },
    { label: 'Walmart', href: '/services/marketplace-management' },
    { label: 'eBay', href: '/services/marketplace-management' },
  ];

  const freeTools = [
    { label: 'AEO Checker', href: '/free-tools/aeo-checker/' },
    { label: 'Schema Generator', href: '/free-tools/schema-generator/' },
    { label: 'Robots.txt Checker', href: '/free-tools/robots-txt-checker/' },
    { label: 'AI Answer Checker', href: '/free-tools/ai-answer-checker/' },
  ];

  return (
    <footer className="bg-dark text-white pt-16 pb-8 border-t border-gray-800">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 mb-12">
          <div className="md:col-span-1 space-y-6">
            <img src="https://i.ibb.co/ZphZDpdz/OS.png" alt="Optimantix Global" className="h-12 bg-white rounded-lg p-2" />
            <p className="text-gray-400 text-sm leading-relaxed">End-to-end marketplace management agency helping brands scale across leading marketplaces.</p>
            <div className="flex space-x-4 text-gray-400"><a href="https://www.facebook.com/optimantix" target="_blank" rel="noreferrer" className="hover:text-white transition"><Facebook size={18} /></a><a href="https://in.linkedin.com/company/optimantix" target="_blank" rel="noreferrer" className="hover:text-white transition"><Linkedin size={18} /></a><a href="https://www.instagram.com/optimantix/" target="_blank" rel="noreferrer" className="hover:text-white transition"><Instagram size={18} /></a></div>
          </div>
          <div><h4 className="text-sm font-bold mb-4 text-primary uppercase tracking-wider">Services</h4><ul className="space-y-2">{services.slice(0,4).map(s => <li key={s.href}><Link to={s.href} className="footer-link text-sm">{s.label}</Link></li>)}</ul></div>
          <div><h4 className="text-sm font-bold mb-4 text-primary uppercase tracking-wider">Marketplaces</h4><ul className="space-y-2">{marketplaces.map(m => <li key={m.label}><Link to={m.href} className="footer-link text-sm">{m.label}</Link></li>)}</ul></div>
          <div><h4 className="text-sm font-bold mb-4 text-primary uppercase tracking-wider">Company</h4><ul className="space-y-2"><li><button onClick={(e) => handleNavigation(e, '/about')} className="footer-link text-sm">About Us</button></li><li><button onClick={(e) => handleNavigation(e, '/case')} className="footer-link text-sm">Case Studies</button></li><li><button onClick={(e) => handleNavigation(e, '/blog')} className="footer-link text-sm">Blog</button></li><li><button onClick={(e) => handleNavigation(e, '/contact')} className="footer-link text-sm">Contact</button></li></ul></div>
          <div><h4 className="text-sm font-bold mb-4 text-primary uppercase tracking-wider">Free Tools</h4><ul className="space-y-2"><li><Link to="/free-tools/" className="footer-link text-sm">All Free Tools</Link></li>{freeTools.map(t => <li key={t.href}><Link to={t.href} className="footer-link text-sm">{t.label}</Link></li>)}</ul></div>
        </div>
        <div className="border-t border-gray-800 pt-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500 gap-4">
          <p>© {new Date().getFullYear()} Optimantix Global. All rights reserved.</p>
          <div className="flex gap-4"><Link to="/privacy-policy" className="hover:text-white transition">Privacy Policy</Link><Link to="/terms-of-service" className="hover:text-white transition">Terms of Service</Link><Link to="/admin/login" className="flex items-center gap-1 hover:text-white transition"><Lock size={12} /> Employee Login</Link></div>
        </div>
      </div>
    </footer>
  );
};