
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
    { path: '/blog', label: 'Blog', icon: Briefcase },
    { path: '/contact', label: 'Contact', icon: Phone },
  ];

  const MotionDiv = motion.div as any;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[60] md:hidden">
      {/* Compact Container: No Shadow, reduced padding */}
      <div className="bg-white/95 dark:bg-[#111]/95 border-t border-gray-200 dark:border-gray-800 pb-safe pt-1">
        <div className="flex justify-around items-center">
          {navItems.map((item) => {
            const isActive = currentPath === item.path || (item.path !== '/' && currentPath.startsWith(item.path));
            const Icon = item.icon;

            return (
              <Link
                key={item.path}
                to={item.path}
                className={`relative flex flex-col items-center justify-center py-1.5 px-2 min-w-[50px] transition-colors duration-300 ${isActive ? 'text-primary' : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                  }`}
              >
                {isActive && (
                  <MotionDiv
                    layoutId="bottomNavIndicator"
                    className="absolute -top-1 w-6 h-0.5 bg-primary rounded-b-full"
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}

                <div className={`relative p-0.5 rounded-xl transition-all duration-300 ${isActive ? 'bg-primary/10 -translate-y-0.5' : ''}`}>
                  <Icon size={isActive ? 20 : 18} strokeWidth={isActive ? 2.5 : 2} />
                </div>
                <span className={`text-[10px] font-medium mt-0.5 transition-opacity duration-300 ${isActive ? 'opacity-100 font-bold' : 'opacity-80'}`}>
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
