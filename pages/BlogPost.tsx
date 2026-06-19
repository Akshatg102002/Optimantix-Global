
import React from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { ArrowLeft, ChevronRight } from 'lucide-react';
import { ParallaxHero } from '../components/ParallaxHero';
import { ShareButtons } from '../components/ShareButtons';
import { RichContent } from '../components/RichContent';
import { Helmet } from 'react-helmet-async';
import { SITE_URL, truncateDescription } from '../data/seoData';

export const BlogPost: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { blogs } = useData();
  const blog = blogs.find(b => b.slug === slug);

  if (!blog) {
    return <Navigate to="/blog" replace />;
  }

  // Get max 4 recent blogs excluding the current one
  const recentBlogs = blogs.filter(b => b.slug !== slug).slice(0, 4);

  const currentUrl = `${SITE_URL}/blog/${blog.slug}`;
  const seoTitle = blog.metaTitle || blog.title;
  const seoDescription = truncateDescription(blog.metaDescription || blog.excerpt, 155);

  // JSON-LD for Breadcrumbs
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": `${SITE_URL}/`
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Blog",
        "item": `${SITE_URL}/blog`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": blog.title,
        "item": currentUrl
      }
    ]
  };

  // JSON-LD for Article
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": blog.title,
    "description": seoDescription,
    "image": blog.imageUrl,
    "author": {
      "@type": "Organization",
      "name": "Optimantix Global"
    },
    "datePublished": blog.date,
    "dateModified": blog.date,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": currentUrl
    }
  };

  // Person Schema (Author Bio representation)
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": blog.author,
    "url": `${SITE_URL}/about`,
    "jobTitle": "Digital Marketing & Technology Expert",
    "worksFor": {
      "@type": "Organization",
      "name": "Optimantix Global"
    }
  };

  return (
    <div className="bg-light dark:bg-dark min-h-screen">
      <Helmet>
        <title>{seoTitle}</title>
        <meta name="description" content={seoDescription} />
        <link rel="canonical" href={currentUrl} />
        <meta property="og:title" content={seoTitle} />
        <meta property="og:description" content={seoDescription} />
        <meta property="og:url" content={currentUrl} />
        <meta property="og:type" content="article" />
        <meta property="og:image" content={blog.imageUrl} />
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(personSchema)}</script>
      </Helmet>

      <ParallaxHero
         title={blog.title}
         subtitle={`By ${blog.author}`}
         imageUrl={blog.imageUrl}
         imageAltText={blog.imageAltText}
         height="60vh"
         overlayOpacity={0.7}
      />

      <div className="container mx-auto px-4 md:px-6 py-6">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center text-sm text-gray-500 font-medium mb-6">
          <Link to="/" className="hover:text-primary transition-colors">Home</Link>
          <ChevronRight size={14} className="mx-2" />
          <Link to="/blog" className="hover:text-primary transition-colors">Blog</Link>
          <ChevronRight size={14} className="mx-2" />
          <span className="text-gray-900 dark:text-white line-clamp-1 truncate">{blog.title}</span>
        </nav>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Main Content */}
          <article className="flex-1 bg-white dark:bg-dark-card rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden p-8 md:p-12">
            
            <RichContent content={blog.content} variant="blog" imageAlt={blog.imageAltText || blog.title} />
            <ShareButtons title={blog.title} url={currentUrl} />

            <div className="mt-12 pt-8 border-t border-gray-100 dark:border-gray-800 flex flex-col sm:flex-row justify-between items-center text-sm text-gray-500 gap-4">
              <Link to="/blog" className="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-primary transition font-medium">
                <ArrowLeft size={16} className="mr-2" /> Back to Blog
              </Link>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-primary font-bold overflow-hidden">
                  {blog.author.charAt(0)}
                </div>
                <div className="flex flex-col">
                  <span className="font-semibold text-gray-900 dark:text-white">By {blog.author}</span>
                  <Link to="/about" className="text-xs hover:text-primary transition-colors">
                    Digital Strategy Expert
                  </Link>
                </div>
              </div>
            </div>
          </article>

          {/* Sidebar */}
          {recentBlogs.length > 0 && (
            <aside className="lg:w-[350px] flex-shrink-0">
              <div className="sticky top-24">
                <h3 className="text-xl font-bold mb-6 text-gray-900 dark:text-white border-b border-gray-100 dark:border-gray-800 pb-4">
                  Related Posts
                </h3>
                <div className="space-y-6">
                  {recentBlogs.map(rb => (
                    <Link key={rb.id} to={`/blog/${rb.slug}`} className="group flex gap-4 items-start bg-white dark:bg-dark-card p-4 rounded-xl border border-gray-50 dark:border-gray-800 hover:shadow-md transition-all duration-300">
                      <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                        <img 
                          loading="lazy"
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
