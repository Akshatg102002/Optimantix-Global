import { useMemo } from 'react';
import { useData } from '../context/DataContext';
import { useLocation } from 'react-router-dom';
import { validateMetaDescription, validatePageTitle, generateCanonicalUrl, SEO_CONFIG } from '../utils/seoConfig';

const normalizePath = (path?: string): string => {
  if (!path) return '/';

  const [pathname] = path.split(/[?#]/);
  const withLeadingSlash = pathname.startsWith('/') ? pathname : `/${pathname}`;
  return withLeadingSlash.length > 1 ? withLeadingSlash.replace(/\/+$/, '') : '/';
};

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
    const currentPath = normalizePath(location.pathname);

    // Find matching SEO override
    const seoOverride = seoPages?.find(page => {
      const definedPath = normalizePath(page.path);
      const definedId = page.id ? normalizePath(page.id) : '';
      return definedPath === currentPath || definedId === currentPath;
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

    const rawCurrentUrl = url || generateCanonicalUrl(currentPath);
    const currentUrl = rawCurrentUrl.split(/[?#]/)[0].replace(/\/+$/, '') || SEO_CONFIG.siteUrl;

    const canonicalUrl = finalCanonical?.trim() || (canonicalAuto ? generateCanonicalUrl(currentPath) : currentUrl);

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
