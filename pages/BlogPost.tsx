
import React from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { ArrowLeft } from 'lucide-react';
import { SEO } from '../components/SEO';
import { ParallaxHero } from '../components/ParallaxHero';
import { ShareButtons } from '../components/ShareButtons';

export const BlogPost: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { blogs } = useData();
  const blog = blogs.find(b => b.slug === slug);

  if (!blog) {
    return <Navigate to="/blog" replace />;
  }

  return (
    <div className="bg-light dark:bg-dark min-h-screen">
      <SEO 
        title={blog.metaTitle || blog.title} 
        description={blog.metaDescription || blog.excerpt}
      />

      <ParallaxHero 
         title={blog.title}
         subtitle={`By ${blog.author} • ${blog.date.includes('-') ? new Date(blog.date).toLocaleDateString() : blog.date}`}
         imageUrl={blog.imageUrl}
         height="60vh"
         overlayOpacity={0.7}
      />

      <div className="container mx-auto px-4 md:px-6 py-12">
        <Link to="/blog" className="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-primary mb-8 transition">
          <ArrowLeft size={16} className="mr-2" /> Back to Blog
        </Link>
        
        <article className="bg-white dark:bg-dark-card rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden max-w-4xl mx-auto p-8 md:p-12">
          
          <div className="prose prose-lg prose-indigo dark:prose-invert max-w-none text-gray-600 dark:text-gray-300">
            {blog.content.split('\n').map((paragraph, idx) => (
              <p key={idx} className="mb-4 whitespace-pre-line">{paragraph}</p>
            ))}
            
            <ShareButtons title={blog.title} url={window.location.href} />
          </div>

          <div className="mt-12 pt-8 border-t border-gray-100 dark:border-gray-800 flex justify-between items-center text-sm text-gray-500">
             <span>Published on {blog.date.includes('-') ? new Date(blog.date).toLocaleDateString() : blog.date}</span>
             <span>Author: {blog.author}</span>
          </div>
        </article>
      </div>
    </div>
  );
};
