import React from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { Calendar, User, ArrowLeft } from 'lucide-react';
import { SEO } from '../components/SEO';

export const BlogPost: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { blogs } = useData();
  const blog = blogs.find(b => b.id === id);

  if (!blog) {
    return <Navigate to="/blog" replace />;
  }

  return (
    <div className="bg-light dark:bg-dark min-h-screen py-16">
      <SEO 
        title={blog.title} 
        description={blog.excerpt}
      />
      <div className="container mx-auto px-4 md:px-6">
        <Link to="/blog" className="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-primary mb-8 transition">
          <ArrowLeft size={16} className="mr-2" /> Back to Blog
        </Link>
        
        <article className="bg-white dark:bg-dark-card rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden max-w-4xl mx-auto">
          <img 
            src={blog.imageUrl} 
            alt={blog.title} 
            className="w-full h-64 md:h-96 object-cover"
          />
          
          <div className="p-8 md:p-12">
            <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500 dark:text-gray-400 mb-6">
              <div className="flex items-center gap-2">
                <Calendar size={16} />
                <span>{new Date(blog.date).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-2">
                <User size={16} />
                <span>By {blog.author}</span>
              </div>
            </div>

            <h1 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-8 leading-tight">
              {blog.title}
            </h1>

            <div className="prose prose-lg prose-indigo dark:prose-invert max-w-none text-gray-600 dark:text-gray-300">
              {blog.content.split('\n').map((paragraph, idx) => (
                <p key={idx} className="mb-4">{paragraph}</p>
              ))}
            </div>
          </div>
        </article>
      </div>
    </div>
  );
};