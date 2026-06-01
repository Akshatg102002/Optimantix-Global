import React from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { ArrowLeft, ChevronRight } from 'lucide-react';
import { SEO } from '../components/SEO';
import { ParallaxHero } from '../components/ParallaxHero';
import { ShareButtons } from '../components/ShareButtons';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import { Helmet } from 'react-helmet-async';

export const PageTemplate: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { pages } = useData();
  const page = pages.find(p => p.slug === slug && p.isPublished);

  if (!page) {
    return <Navigate to="/404" replace />;
  }

  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';

  // JSON-LD for Breadcrumbs
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": typeof window !== 'undefined' ? window.location.origin : ''
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": page.title,
        "item": currentUrl
      }
    ]
  };

  // JSON-LD for Article/WebPage
  const contentSchema = {
    "@context": "https://schema.org",
    "@type": page.schemaType || "Article",
    "headline": page.title,
    "description": page.excerpt,
    "image": page.imageUrl,
    "datePublished": page.createdAt,
    "dateModified": page.updatedAt,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": currentUrl
    }
  };

  return (
    <div className="bg-light dark:bg-dark min-h-screen">
      <SEO
        title={page.metaTitle || page.title}
        description={page.metaDescription || page.excerpt}
        image={page.imageUrl}
      />
      <Helmet>
        <link rel="canonical" href={currentUrl} />
        <meta property="og:title" content={page.title} />
        <meta property="og:description" content={page.excerpt} />
        <meta property="og:image" content={page.imageUrl} />
        <meta property="og:url" content={currentUrl} />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(contentSchema)}</script>
      </Helmet>

      <ParallaxHero
        title={page.title}
        imageUrl={page.imageUrl}
        imageAltText={page.imageAltText}
        height="50vh"
        overlayOpacity={0.7}
      />

      <div className="container mx-auto px-4 md:px-6 py-6">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center text-sm text-gray-500 font-medium mb-6">
          <Link to="/" className="hover:text-primary transition-colors">Home</Link>
          <ChevronRight size={14} className="mx-2" />
          <span className="text-gray-900 dark:text-white line-clamp-1 truncate">{page.title}</span>
        </nav>

        <article className="flex-1 bg-white dark:bg-dark-card rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden p-8 md:p-12 max-w-4xl mx-auto">
          <div className="prose prose-lg prose-indigo dark:prose-invert max-w-none text-gray-600 dark:text-gray-300">
            <ReactMarkdown
              rehypePlugins={[rehypeRaw]}
              components={{
                h2: ({node, ...props}) => <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mt-12 mb-6" {...props} />,
                h3: ({node, ...props}) => <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-10 mb-4" {...props} />,
                h4: ({node, ...props}) => <h4 className="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-3" {...props} />,
                h5: ({node, ...props}) => <h5 className="text-lg font-bold text-gray-900 dark:text-white mt-6 mb-2" {...props} />,
                h6: ({node, ...props}) => <h6 className="text-base font-bold text-gray-900 dark:text-white mt-6 mb-2" {...props} />,
                p: ({node, ...props}) => <p className="mb-5 whitespace-pre-line leading-relaxed" {...props} />,
                ul: ({node, ...props}) => <ul className="list-disc pl-5 mb-5 space-y-2" {...props} />,
                ol: ({node, ...props}) => <ol className="list-decimal pl-5 mb-5 space-y-2" {...props} />,
                li: ({node, ...props}) => <li className="leading-relaxed" {...props} />,
                blockquote: ({node, ...props}) => <blockquote className="border-l-4 border-primary pl-4 italic my-6 text-gray-700 dark:text-gray-300" {...props} />,
                img: ({node, ...props}) => <img loading="lazy" className="rounded-lg shadow-sm mx-auto my-8 max-w-full h-auto" alt={props.alt || page.title} {...props} />
              }}
            >
              {page.content}
            </ReactMarkdown>

            <ShareButtons title={page.title} url={currentUrl} />
          </div>

          <div className="mt-12 pt-8 border-t border-gray-100 dark:border-gray-800 flex justify-between items-center text-sm text-gray-500">
            <Link to="/" className="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-primary transition font-medium">
              <ArrowLeft size={16} className="mr-2" /> Back to Home
            </Link>
            <span className="text-xs">Published {new Date(page.createdAt).toLocaleDateString()}</span>
          </div>
        </article>
      </div>
    </div>
  );
};

export default PageTemplate;
