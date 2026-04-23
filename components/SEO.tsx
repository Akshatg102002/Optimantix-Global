import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  type?: 'website' | 'article';
  image?: string;
  url?: string;
  schemaMarkup?: object;
  author?: string;
  publishedTime?: string;
}

export const SEO: React.FC<SEOProps> = ({ 
  title, 
  description, 
  canonical, 
  type = 'website', 
  image = 'https://optimantix.com/default-og-image.jpg', 
  url,
  schemaMarkup,
  author,
  publishedTime
}) => {
  // 5. Trim title to ≤60 chars logic (accounting for appending | Optimantix Global)
  // Base title max length to prevent truncation in SERP
  const maxLength = 60;
  const suffix = ' | Optimantix Global';
  let processedTitle = title;
  if (processedTitle.length + suffix.length > maxLength) {
     const availableLength = maxLength - suffix.length - 3; // 3 for '...'
     if (availableLength > 0) {
       processedTitle = `${processedTitle.substring(0, availableLength).trim()}...`;
     }
  }
  const fullTitle = `${processedTitle}${suffix}`;
  
  // 16. Ensure a CTA is roughly present or just ensure descriptions are reasonable length
  let finalDescription = description.trim();
  if (finalDescription.length > 155) {
     finalDescription = `${finalDescription.substring(0, 152)}...`;
  }

  // Determine current clean url without trailing slashes
  const rawCurrentUrl = url || (typeof window !== 'undefined' ? window.location.href : 'https://optimantix.com');
  const currentUrl = rawCurrentUrl.replace(/\/+$/, ''); // Remove trailing slashes for canonicalizing

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={finalDescription} />
      
      {/* Canonical Link */}
      {canonical && <link rel="canonical" href={canonical.replace(/\/+$/, '')} />}
      {!canonical && <link rel="canonical" href={currentUrl} />}

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonical || currentUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={finalDescription} />
      <meta property="og:image" content={image} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={canonical || currentUrl} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={finalDescription} />
      <meta name="twitter:image" content={image} />

      {/* Article Specific Meta Tags */}
      {type === 'article' && publishedTime && (
        <meta property="article:published_time" content={publishedTime} />
      )}
      {type === 'article' && author && (
        <meta property="article:author" content={author} />
      )}

      {/* Structured Data (JSON-LD) */}
      {schemaMarkup && (
        <script type="application/ld+json">
          {JSON.stringify(schemaMarkup)}
        </script>
      )}
    </Helmet>
  );
};