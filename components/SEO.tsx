import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useData } from '../context/DataContext';
import { useLocation } from 'react-router-dom';

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
  const { seoPages } = useData();
  const location = useLocation();

  // Find dynamic SEO override for the current page
  const rawPath = location.pathname || '/';
  const currentPath = rawPath.endsWith('/') && rawPath.length > 1 ? rawPath.slice(0, -1) : rawPath;
  
  const seoOverride = seoPages?.find(page => {
    const definedPath = page.path?.endsWith('/') && page.path.length > 1 ? page.path.slice(0, -1) : page.path;
    return definedPath === currentPath || page.id === currentPath;
  });

  // Apply overrides
  const finalTitle = (seoOverride?.metaTitle && seoOverride.metaTitle.trim() !== '') ? seoOverride.metaTitle : title;
  const rawDescription = (seoOverride?.metaDescription && seoOverride.metaDescription.trim() !== '') ? seoOverride.metaDescription : description;
  const ogTitle = (seoOverride?.ogTitle && seoOverride.ogTitle.trim() !== '') ? seoOverride.ogTitle : ((seoOverride?.metaTitle && seoOverride.metaTitle.trim() !== '') ? seoOverride.metaTitle : title);
  const ogDescription = (seoOverride?.ogDescription && seoOverride.ogDescription.trim() !== '') ? seoOverride.ogDescription : rawDescription;
  const ogImage = (seoOverride?.ogImage && seoOverride.ogImage.trim() !== '') ? seoOverride.ogImage : image;
  const keywords = seoOverride?.keywords || '';
  const finalCanonical = (seoOverride?.canonicalUrl && seoOverride.canonicalUrl.trim() !== '') ? seoOverride.canonicalUrl : canonical;

  // 5. Trim title to ≤60 chars logic (accounting for appending | Optimantix Global)
  // Base title max length to prevent truncation in SERP
  const maxLength = 60;
  const suffix = ' | Optimantix Global';
  let processedTitle = finalTitle;
  if (processedTitle.length + suffix.length > maxLength) {
     const availableLength = maxLength - suffix.length - 3; // 3 for '...'
     if (availableLength > 0) {
       processedTitle = `${processedTitle.substring(0, availableLength).trim()}...`;
     }
  }
  const fullTitle = `${processedTitle}${suffix}`;
  
  // 16. Ensure a CTA is roughly present or just ensure descriptions are reasonable length
  let finalDescription = rawDescription.trim();
  if (finalDescription.length > 155) {
     finalDescription = `${finalDescription.substring(0, 152)}...`;
  }

  let finalOgDescription = ogDescription.trim();
  if (finalOgDescription.length > 155) {
    finalOgDescription = `${finalOgDescription.substring(0, 152)}...`;
  }

  // Determine current clean url without trailing slashes
  const rawCurrentUrl = url || (typeof window !== 'undefined' ? window.location.href : 'https://optimantix.com');
  const currentUrl = rawCurrentUrl.replace(/\/+$/, ''); // Remove trailing slashes for canonicalizing

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={finalDescription} />
      {keywords && <meta name="keywords" content={keywords} />}
      
      {/* Canonical Link */}
      {finalCanonical && <link rel="canonical" href={finalCanonical.replace(/\/+$/, '')} />}
      {!finalCanonical && <link rel="canonical" href={currentUrl} />}

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={finalCanonical || currentUrl} />
      <meta property="og:title" content={ogTitle} />
      <meta property="og:description" content={finalOgDescription} />
      <meta property="og:image" content={ogImage} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={finalCanonical || currentUrl} />
      <meta name="twitter:title" content={ogTitle} />
      <meta name="twitter:description" content={finalOgDescription} />
      <meta name="twitter:image" content={ogImage} />

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