
import React from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { ArrowLeft } from 'lucide-react';
import { SEO } from '../components/SEO';
import { ParallaxHero } from '../components/ParallaxHero';
import { ShareButtons } from '../components/ShareButtons';
import ReactMarkdown from 'react-markdown';

export const BlogPost: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { blogs } = useData();
  const blog = blogs.find(b => b.slug === slug);

  if (!blog) {
    return <Navigate to="/blog" replace />;
  }

  // Get max 4 recent blogs excluding the current one
  const recentBlogs = blogs.filter(b => b.slug !== slug).slice(0, 4);

  return (
    <div className="bg-light dark:bg-dark min-h-screen">
      <SEO 
        title={blog.metaTitle || blog.title} 
        description={blog.metaDescription || blog.excerpt}
      />

      <ParallaxHero 
         title={blog.title}
         subtitle={`By ${blog.author}`}
         imageUrl={blog.imageUrl}
         height="60vh"
         overlayOpacity={0.7}
      />

      <div className="container mx-auto px-4 md:px-6 py-12">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Main Content */}
          <article className="flex-1 bg-white dark:bg-dark-card rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden p-8 md:p-12">
            
            <div className="prose prose-lg prose-indigo dark:prose-invert max-w-none text-gray-600 dark:text-gray-300">
              <ReactMarkdown
                components={{
                  // eslint-disable-next-line @typescript-eslint/no-unused-vars
                  h2: ({node, ...props}) => <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mt-12 mb-6" {...props} />,
                  // eslint-disable-next-line @typescript-eslint/no-unused-vars
                  h3: ({node, ...props}) => <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-10 mb-4" {...props} />,
                  // eslint-disable-next-line @typescript-eslint/no-unused-vars
                  h4: ({node, ...props}) => <h4 className="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-3" {...props} />,
                  // eslint-disable-next-line @typescript-eslint/no-unused-vars
                  h5: ({node, ...props}) => <h5 className="text-lg font-bold text-gray-900 dark:text-white mt-6 mb-2" {...props} />,
                  // eslint-disable-next-line @typescript-eslint/no-unused-vars
                  h6: ({node, ...props}) => <h6 className="text-base font-bold text-gray-900 dark:text-white mt-6 mb-2" {...props} />,
                  // eslint-disable-next-line @typescript-eslint/no-unused-vars
                  p: ({node, ...props}) => <p className="mb-5 whitespace-pre-line leading-relaxed" {...props} />,
                  // eslint-disable-next-line @typescript-eslint/no-unused-vars
                  ul: ({node, ...props}) => <ul className="list-disc pl-5 mb-5 space-y-2" {...props} />,
                  // eslint-disable-next-line @typescript-eslint/no-unused-vars
                  ol: ({node, ...props}) => <ol className="list-decimal pl-5 mb-5 space-y-2" {...props} />,
                  // eslint-disable-next-line @typescript-eslint/no-unused-vars
                  li: ({node, ...props}) => <li className="leading-relaxed" {...props} />,
                  // eslint-disable-next-line @typescript-eslint/no-unused-vars
                  blockquote: ({node, ...props}) => <blockquote className="border-l-4 border-primary pl-4 italic my-6 text-gray-700 dark:text-gray-300" {...props} />,
                }}
              >
                {blog.content}
              </ReactMarkdown>
              
              <ShareButtons title={blog.title} url={window.location.href} />
            </div>

            <div className="mt-12 pt-8 border-t border-gray-100 dark:border-gray-800 flex flex-col sm:flex-row justify-between items-center text-sm text-gray-500 gap-4">
              <Link to="/blog" className="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-primary transition font-medium">
                <ArrowLeft size={16} className="mr-2" /> Back to Blog
              </Link>
              <span>Author: {blog.author}</span>
            </div>
          </article>

          {/* Sidebar */}
          {recentBlogs.length > 0 && (
            <aside className="lg:w-[350px] flex-shrink-0">
              <div className="sticky top-24">
                <h3 className="text-xl font-bold mb-6 text-gray-900 dark:text-white border-b border-gray-100 dark:border-gray-800 pb-4">
                  Recent Posts
                </h3>
                <div className="space-y-6">
                  {recentBlogs.map(rb => (
                    <Link key={rb.id} to={`/blog/${rb.slug}`} className="group flex gap-4 items-start bg-white dark:bg-dark-card p-4 rounded-xl border border-gray-50 dark:border-gray-800 hover:shadow-md transition-all duration-300">
                      <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                        <img 
                          src={rb.imageUrl} 
                          alt={rb.title} 
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                        />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-gray-900 dark:text-white text-sm group-hover:text-primary transition-colors line-clamp-3 leading-snug">
                          {rb.title}
                        </h4>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </aside>
          )}

        </div>
      </div>
    </div>
  );
};
