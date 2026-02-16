
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Layers, Briefcase, Phone, User } from 'lucide-react';
import { motion } from 'framer-motion';

export const BottomNav: React.FC = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const navItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/services', label: 'Solutions', icon: Layers },
    { path: '/blog', label: 'Blog', icon: Briefcase }, // Using Blog/Portfolio as a main tab
    { path: '/contact', label: 'Contact', icon: Phone },
  ];

  const MotionDiv = motion.div as any;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[60] md:hidden">
      {/* Gradient Fade above nav */}
      <div className="absolute bottom-full left-0 right-0 h-8 bg-gradient-to-t from-white/90 dark:from-[#111]/90 to-transparent pointer-events-none"></div>
      
      <div className="bg-white/90 dark:bg-[#111]/90 backdrop-blur-lg border-t border-gray-200 dark:border-gray-800 pb-safe pt-2 px-2 shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
        <div className="flex justify-around items-center">
          {navItems.map((item) => {
            const isActive = currentPath === item.path || (item.path !== '/' && currentPath.startsWith(item.path));
            const Icon = item.icon;

            return (
              <Link
                key={item.path}
                to={item.path}
                className={`relative flex flex-col items-center justify-center py-2 px-4 min-w-[64px] transition-colors duration-300 ${
                  isActive ? 'text-primary' : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                }`}
              >
                {isActive && (
                  <MotionDiv
                    layoutId="bottomNavIndicator"
                    className="absolute -top-2 w-8 h-1 bg-primary rounded-b-full shadow-[0_2px_8px_rgba(0,86,179,0.5)]"
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
                
                <div className={`relative p-1 rounded-xl transition-all duration-300 ${isActive ? 'bg-primary/10 -translate-y-1' : ''}`}>
                    <Icon size={isActive ? 24 : 22} strokeWidth={isActive ? 2.5 : 2} />
                </div>
                <span className={`text-[10px] font-medium mt-1 transition-opacity duration-300 ${isActive ? 'opacity-100 font-bold' : 'opacity-80'}`}>
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};
