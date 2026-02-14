
import React from 'react';
import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';
import { SEO } from '../components/SEO';

export const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen bg-light dark:bg-dark flex items-center justify-center px-4">
      <SEO title="Page Not Found" description="The page you are looking for does not exist." />
      <div className="text-center">
        <h1 className="text-9xl font-extrabold text-gray-200 dark:text-gray-800">404</h1>
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mt-4 mb-6">Page Not Found</h2>
        <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto mb-8">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 bg-primary text-white font-bold py-3 px-8 rounded-full hover:bg-red-500 transition shadow-lg shadow-red-200 dark:shadow-none"
        >
          <Home size={18} /> Back to Home
        </Link>
      </div>
    </div>
  );
};
