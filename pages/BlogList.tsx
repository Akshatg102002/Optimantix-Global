import React from 'react';
import { Link } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { Calendar, User } from 'lucide-react';
import { SEO } from '../components/SEO';

export const BlogList: React.FC = () => {
  const { blogs } = useData();

  return (
    <div className="min-h-screen bg-light dark:bg-dark">
      <SEO 
        title="Blog" 
        description="Latest insights, trends, and strategies in digital marketing and technology from the Optimantix Global team."
      />
      <div className="bg-white dark:bg-dark-card border-b border-gray-200 dark:border-gray-800 py-16">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Our Blog</h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Insights, updates, and expert advice on digital marketing, development, and business growth.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map(blog => (
            <Link key={blog.id} to={`/blog/${blog.id}`} className="group bg-white dark:bg-dark-card rounded-xl overflow-hidden shadow-sm hover:shadow-xl dark:hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-gray-800">
              <div className="h-48 overflow-hidden">
                <img 
                  src={blog.imageUrl} 
                  alt={blog.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400 mb-3">
                  <div className="flex items-center gap-1">
                    <Calendar size={14} />
                    <span>{new Date(blog.date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <User size={14} />
                    <span>{blog.author}</span>
                  </div>
                </div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-primary transition-colors">
                  {blog.title}
                </h2>
                <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-3 mb-4">
                  {blog.excerpt}
                </p>
                <span className="text-secondary dark:text-primary font-medium text-sm">Read Article &rarr;</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};