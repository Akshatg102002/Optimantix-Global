
import React from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { BottomNav } from './BottomNav';
import { FloatingContact } from './FloatingContact';
import { Chatbot } from './Chatbot';
import { useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { SITE_URL } from '../data/seoData';

import { ContactSection } from './ContactSection';
import { LeadModal } from './LeadModal';

interface LayoutProps {
  children: React.ReactNode;
}

const ORGANIZATION_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Optimantix Global',
  url: `${SITE_URL}/`,
  description: 'End-to-end marketplace management agency across Amazon, Flipkart, Meesho, Myntra, Nykaa, Ajio and more.',
  sameAs: [],
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer support',
    availableLanguage: 'English',
  },
};

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <div className="flex flex-col min-h-screen bg-light font-sans">
      <Helmet><script type="application/ld+json">{JSON.stringify(ORGANIZATION_SCHEMA)}</script></Helmet>
      <Header />
      <main className="flex-grow pt-20 pb-20 md:pb-0">
        {children}
      </main>
      <ContactSection />
      <Footer />
      <BottomNav />
      <FloatingContact />
      <Chatbot />
      <LeadModal />
    </div>
  );
};
