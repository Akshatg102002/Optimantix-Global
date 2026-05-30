import React, { useMemo, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useData } from '../context/DataContext';
import { useLocation } from 'react-router-dom';
import { validateMetaDescription, validatePageTitle, generateCanonicalUrl, SEO_CONFIG } from '../utils/seoConfig';

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
  const { seoPages } = useData();
  const location = useLocation();

  // Find dynamic SEO override for the current page
  const rawPath = location.pathname || '/';
  const currentPath = useMemo(() => {
    return rawPath.endsWith('/') && rawPath.length > 1 ? rawPath.slice(0, -1) : rawPath;
  }, [rawPath]);

  const seoOverride = useMemo(() => {
    if (!seoPages || seoPages.length === 0) return undefined;

    return seoPages.find(page => {
      const definedPath = page.path?.endsWith('/') && page.path.length > 1 ? page.path.slice(0, -1) : page.path;
      return definedPath === currentPath || page.id === currentPath;
    });
  }, [seoPages, currentPath]);

  // Apply overrides with memoization
  const finalTitle = useMemo(() => {
    return (seoOverride?.metaTitle && seoOverride.metaTitle.trim() !== '') ? seoOverride.metaTitle : title;
  }, [seoOverride?.metaTitle, title]);

  const rawDescription = useMemo(() => {
    return (seoOverride?.metaDescription && seoOverride.metaDescription.trim() !== '') ? seoOverride.metaDescription : description;
  }, [seoOverride?.metaDescription, description]);

  const ogTitle = useMemo(() => {
    return (seoOverride?.ogTitle && seoOverride.ogTitle.trim() !== '')
      ? seoOverride.ogTitle
      : ((seoOverride?.metaTitle && seoOverride.metaTitle.trim() !== '') ? seoOverride.metaTitle : title);
  }, [seoOverride?.ogTitle, seoOverride?.metaTitle, title]);

  const ogDescription = useMemo(() => {
    return (seoOverride?.ogDescription && seoOverride.ogDescription.trim() !== '') ? seoOverride.ogDescription : rawDescription;
  }, [seoOverride?.ogDescription, rawDescription]);

  const ogImage = useMemo(() => {
    return (seoOverride?.ogImage && seoOverride.ogImage.trim() !== '') ? seoOverride.ogImage : image;
  }, [seoOverride?.ogImage, image]);

  const finalKeywords = useMemo(() => {
    return seoOverride?.keywords || keywords;
  }, [seoOverride?.keywords, keywords]);

  const finalCanonical = useMemo(() => {
    return (seoOverride?.canonicalUrl && seoOverride.canonicalUrl.trim() !== '') ? seoOverride.canonicalUrl : canonical;
  }, [seoOverride?.canonicalUrl, canonical]);

  // Validate and trim title (max 60 chars with suffix)
  const processedTitle = useMemo(() => validatePageTitle(finalTitle), [finalTitle]);

  // Validate and trim description (max 160 chars)
  const finalDescription = useMemo(() => validateMetaDescription(rawDescription), [rawDescription]);
  const finalOgDescription = useMemo(() => validateMetaDescription(ogDescription), [ogDescription]);

  // Determine current clean url without trailing slashes
  const rawCurrentUrl = url || (typeof window !== 'undefined' ? window.location.href : SEO_CONFIG.siteUrl);
  const currentUrl = useMemo(() => rawCurrentUrl.replace(/\/+$/, ''), [rawCurrentUrl]);

  // Auto-generate canonical URL if not provided and canonicalAuto is true
  const canonicalUrl = useMemo(() => {
    return finalCanonical || (canonicalAuto ? generateCanonicalUrl(currentPath) : currentUrl);
  }, [finalCanonical, canonicalAuto, currentPath, currentUrl]);

  // Normalize schemas (handle both single object and array)
  const schemas = useMemo(() => {
    return Array.isArray(schemaMarkup) ? schemaMarkup : schemaMarkup ? [schemaMarkup] : [];
  }, [schemaMarkup]);

  // Debug logging
  useEffect(() => {
    if (debug) {
      console.log('SEO Component Updated:', {
        path: currentPath,
        hasOverride: !!seoOverride,
        title: processedTitle,
        description: finalDescription,
        canonical: canonicalUrl,
        ogImage: ogImage,
      });
    }
  }, [debug, currentPath, seoOverride, processedTitle, finalDescription, canonicalUrl, ogImage]);

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <html lang={language} />
      <title>{processedTitle}</title>
      <meta name="description" content={finalDescription} />
      {finalKeywords && <meta name="keywords" content={finalKeywords} />}
      <meta name="robots" content={robots || SEO_CONFIG.robotsOptions.googleBot} />
      <meta name="language" content={language} />
      <meta name="revisit-after" content="7 days" />

      {/* Canonical Link - Should be first after title */}
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={ogTitle} />
      <meta property="og:description" content={finalOgDescription} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content={SEO_CONFIG.siteName} />
      <meta property="og:locale" content={SEO_CONFIG.languageRegion} />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={canonicalUrl} />
      <meta name="twitter:title" content={ogTitle} />
      <meta name="twitter:description" content={finalOgDescription} />
      <meta name="twitter:image" content={ogImage} />
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