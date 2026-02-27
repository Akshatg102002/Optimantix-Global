
import React, { ReactNode } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { BottomNav } from './BottomNav';
import { FloatingContact } from './FloatingContact';
import { Chatbot } from './Chatbot';
import { LoadingSpinner } from './LoadingSpinner';
import { useLocation } from 'react-router-dom';

import { ContactSection } from './ContactSection';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <div className="flex flex-col min-h-screen bg-light font-sans">
      <LoadingSpinner isGlobal={true} />
      <Header />
      <main className="flex-grow pt-20 pb-20 md:pb-0">
        {children}
      </main>
      <ContactSection />
      <Footer />
      <BottomNav />
      <FloatingContact />
      <Chatbot />
    </div>
  );
};
