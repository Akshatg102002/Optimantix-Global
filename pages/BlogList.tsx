
import React from 'react';
import { Link } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { User } from 'lucide-react';
import { SEO } from '../components/SEO';
import { ParallaxHero } from '../components/ParallaxHero';

export const BlogList: React.FC = () => {
  const { blogs } = useData();

  return (
    <div className="min-h-screen bg-light dark:bg-dark pt-16">
      <SEO
        title="Blog"
        description="Latest insights, trends, and strategies in digital marketing and technology from the Optimantix Global team."
      />

      <ParallaxHero
        title="Our Blog"
        subtitle="Insights, updates, and expert advice on digital marketing, development, and business growth."
        imageUrl="https://plus.unsplash.com/premium_photo-1683211783920-8c66ab120c09"
        height="50vh"
      />

      <div className="container mx-auto px-4 md:px-6 py-16">
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
    {blogs.map(blog => (
      <Link
        key={blog.id}
        to={`/blog/${blog.slug}`}
        className="group bg-white dark:bg-dark-card rounded-xl overflow-hidden shadow-sm hover:shadow-xl dark:hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-gray-800 flex flex-col"
      >
        <div className="aspect-[16/9] overflow-hidden flex-shrink-0">
          <img
            src={blog.imageUrl}
            alt={blog.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
        <div className="p-6 flex flex-col flex-1">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-primary transition-colors">
            {blog.title}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-3 mb-4 flex-1">
            {blog.excerpt}
          </p>
          <span className="text-secondary dark:text-primary font-medium text-sm">
            Read Article &rarr;
          </span>
        </div>
      </Link>
    ))}
  </div>
</div>
    </div>
  );
};
