import { useMemo } from 'react';
import { useData } from '../context/DataContext';
import { useLocation } from 'react-router-dom';
import { validateMetaDescription, validatePageTitle, generateCanonicalUrl, SEO_CONFIG } from '../utils/seoConfig';

interface SeoMetadata {
  title: string;
  description: string;
  keywords: string;
  canonical: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  robots: string;
  hasOverride: boolean;
}

interface UseSeoMetadataProps {
  title: string;
  description: string;
  keywords?: string;
  canonical?: string;
  image?: string;
  robots?: string;
  url?: string;
  canonicalAuto?: boolean;
}

/**
 * Custom hook for managing SEO metadata with support for admin panel overrides
 * Automatically detects and applies custom SEO settings from the admin panel
 * Returns memoized metadata that only updates when dependencies change
 */
export const useSeoMetadata = ({
  title,
  description,
  keywords = '',
  canonical,
  image = SEO_CONFIG.defaultOgImage,
  robots = SEO_CONFIG.robotsOptions.googleBot,
  url,
  canonicalAuto = true,
}: UseSeoMetadataProps): SeoMetadata => {
  const { seoPages } = useData();
  const location = useLocation();

  const metadata = useMemo(() => {
    const rawPath = location.pathname || '/';
    const currentPath = rawPath.endsWith('/') && rawPath.length > 1 ? rawPath.slice(0, -1) : rawPath;

    // Find matching SEO override
    const seoOverride = seoPages?.find(page => {
      const definedPath = page.path?.endsWith('/') && page.path.length > 1 ? page.path.slice(0, -1) : page.path;
      return definedPath === currentPath || page.id === currentPath;
    });

    // Apply overrides or use defaults
    const finalTitle = (seoOverride?.metaTitle && seoOverride.metaTitle.trim() !== '')
      ? seoOverride.metaTitle
      : title;

    const finalDescription = (seoOverride?.metaDescription && seoOverride.metaDescription.trim() !== '')
      ? seoOverride.metaDescription
      : description;

    const finalKeywords = seoOverride?.keywords || keywords;

    const finalRobots = robots;

    const ogTitle = (seoOverride?.ogTitle && seoOverride.ogTitle.trim() !== '')
      ? seoOverride.ogTitle
      : ((seoOverride?.metaTitle && seoOverride.metaTitle.trim() !== '') ? seoOverride.metaTitle : title);

    const ogDescription = (seoOverride?.ogDescription && seoOverride.ogDescription.trim() !== '')
      ? seoOverride.ogDescription
      : finalDescription;

    const ogImage = (seoOverride?.ogImage && seoOverride.ogImage.trim() !== '')
      ? seoOverride.ogImage
      : image;

    const finalCanonical = (seoOverride?.canonicalUrl && seoOverride.canonicalUrl.trim() !== '')
      ? seoOverride.canonicalUrl
      : canonical;

    const rawCurrentUrl = url || (typeof window !== 'undefined' ? window.location.href : SEO_CONFIG.siteUrl);
    const currentUrl = rawCurrentUrl.replace(/\/+$/, '');

    const canonicalUrl = finalCanonical || (canonicalAuto ? generateCanonicalUrl(currentPath) : currentUrl);

    return {
      title: validatePageTitle(finalTitle),
      description: validateMetaDescription(finalDescription),
      keywords: finalKeywords,
      canonical: canonicalUrl,
      ogTitle: ogTitle,
      ogDescription: validateMetaDescription(ogDescription),
      ogImage: ogImage,
      robots: finalRobots,
      hasOverride: !!seoOverride,
    };
  }, [seoPages, location.pathname, title, description, keywords, canonical, image, robots, url, canonicalAuto]);

  return metadata;
};

export default useSeoMetadata;
