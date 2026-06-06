import React, { useEffect, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { SEO_CONFIG } from '../utils/seoConfig';
import { useSeoMetadata } from '../hooks/useSeoMetadata';

interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  type?: 'website' | 'article';
  image?: string;
  url?: string;
  schemaMarkup?: object | object[];
  author?: string;
  publishedTime?: string;
  keywords?: string;
  robots?: string;
  language?: string;
  twitterHandle?: string;
  canonicalAuto?: boolean;
  debug?: boolean;
}

export const SEO: React.FC<SEOProps> = ({
  title,
  description,
  canonical,
  type = 'website',
  image = SEO_CONFIG.defaultOgImage,
  url,
  schemaMarkup,
  author,
  publishedTime,
  keywords = '',
  robots,
  language = SEO_CONFIG.defaultLanguage,
  twitterHandle = SEO_CONFIG.twitterHandle,
  canonicalAuto = true,
  debug = false,
}) => {
  const metadata = useSeoMetadata({
    title,
    description,
    keywords,
    canonical,
    image,
    robots,
    url,
    canonicalAuto,
  });

  // Normalize schemas (handle both single object and array)
  const schemas = useMemo(() => {
    return Array.isArray(schemaMarkup) ? schemaMarkup : schemaMarkup ? [schemaMarkup] : [];
  }, [schemaMarkup]);

  // Debug logging
  useEffect(() => {
    if (debug) {
      console.log('SEO Component Updated:', metadata);
    }
  }, [debug, metadata]);

  return (
    <Helmet prioritizeSeoTags>
      {/* Primary Meta Tags */}
      <html lang={language} />
      <title>{metadata.title}</title>
      <meta name="description" content={metadata.description} />
      {metadata.keywords && <meta name="keywords" content={metadata.keywords} />}
      <meta name="robots" content={metadata.robots} />
      <meta name="language" content={language} />
      <meta name="revisit-after" content="7 days" />

      {/* Canonical Link */}
      <link rel="canonical" href={metadata.canonical} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={metadata.canonical} />
      <meta property="og:title" content={metadata.ogTitle} />
      <meta property="og:description" content={metadata.ogDescription} />
      <meta property="og:image" content={metadata.ogImage} />
      <meta property="og:site_name" content={SEO_CONFIG.siteName} />
      <meta property="og:locale" content={SEO_CONFIG.languageRegion} />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={metadata.canonical} />
      <meta name="twitter:title" content={metadata.ogTitle} />
      <meta name="twitter:description" content={metadata.ogDescription} />
      <meta name="twitter:image" content={metadata.ogImage} />
      {twitterHandle && <meta name="twitter:creator" content={twitterHandle} />}

      {/* Article Specific Meta Tags */}
      {type === 'article' && publishedTime && (
        <meta property="article:published_time" content={publishedTime} />
      )}
      {type === 'article' && author && (
        <meta property="article:author" content={author} />
      )}

      {/* Structured Data (JSON-LD) - Support multiple schemas */}
      {schemas.map((schema, index) => (
        <script key={`schema-${index}`} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}
    </Helmet>
  );
};
