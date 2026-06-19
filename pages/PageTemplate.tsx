import React from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { ArrowLeft, ChevronRight } from 'lucide-react';
import { ParallaxHero } from '../components/ParallaxHero';
import { ShareButtons } from '../components/ShareButtons';
import { RichContent } from '../components/RichContent';
import { Helmet } from 'react-helmet-async';
import { SITE_URL, truncateDescription } from '../data/seoData';

export const PageTemplate: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { pages, pagesLoaded } = useData();
  const page = pages.find(p => p.slug === slug && p.isPublished);

  if (!pagesLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-light dark:bg-dark">
        <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!page) {
    return <Navigate to="/404" replace />;
  }

  const currentUrl = `${SITE_URL}/pages/${page.slug}`;
  const seoTitle = page.metaTitle || page.title;
  const seoDescription = truncateDescription(page.metaDescription || page.excerpt, 155);

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
    "description": seoDescription,
    "image": page.imageUrl,
    "author": {
      "@type": "Organization",
      "name": "Optimantix Global"
    },
    "datePublished": page.createdAt,
    "dateModified": page.updatedAt,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": currentUrl
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
        <meta property="og:image" content={page.imageUrl} />
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
          <RichContent content={page.content} variant="page" imageAlt={page.imageAltText || page.title} />
          <ShareButtons title={page.title} url={currentUrl} />

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
