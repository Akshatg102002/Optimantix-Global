/**
 * SEO Metadata Sync Component
 * Ensures that dynamically loaded SEO metadata from admin panel is properly synchronized
 * to the document head, even after initial page load.
 *
 * This component works in conjunction with React Helmet to handle edge cases
 * where metadata changes after the page has already rendered.
 */

import { useEffect } from 'react';
import { useData } from '../context/DataContext';
import { useLocation } from 'react-router-dom';

export const SEOMetadataSync: React.FC = () => {
  const { seoPages } = useData();
  const location = useLocation();

  useEffect(() => {
    if (!seoPages || seoPages.length === 0) return;

    const rawPath = location.pathname || '/';
    const currentPath = rawPath.endsWith('/') && rawPath.length > 1 ? rawPath.slice(0, -1) : rawPath;

    const seoOverride = seoPages.find(page => {
      const definedPath = page.path?.endsWith('/') && page.path.length > 1 ? page.path.slice(0, -1) : page.path;
      return definedPath === currentPath || page.id === currentPath;
    });

    if (!seoOverride) return;

    // Sync metadata to DOM directly as a fallback/supplement to React Helmet
    // This ensures search engine crawlers see the correct metadata

    // Update meta description
    if (seoOverride.metaDescription) {
      let metaDescription = document.querySelector('meta[name="description"]');
      if (!metaDescription) {
        metaDescription = document.createElement('meta');
        metaDescription.setAttribute('name', 'description');
        document.head.appendChild(metaDescription);
      }
      metaDescription.setAttribute('content', seoOverride.metaDescription);
    }

    // Update meta keywords
    if (seoOverride.keywords) {
      let metaKeywords = document.querySelector('meta[name="keywords"]');
      if (!metaKeywords) {
        metaKeywords = document.createElement('meta');
        metaKeywords.setAttribute('name', 'keywords');
        document.head.appendChild(metaKeywords);
      }
      metaKeywords.setAttribute('content', seoOverride.keywords);
    }

    // Update canonical URL
    if (seoOverride.canonicalUrl) {
      let canonical = document.querySelector('link[rel="canonical"]');
      if (!canonical) {
        canonical = document.createElement('link');
        canonical.setAttribute('rel', 'canonical');
        document.head.appendChild(canonical);
      }
      canonical.setAttribute('href', seoOverride.canonicalUrl);
    }

    // Update OG tags
    if (seoOverride.ogTitle) {
      let ogTitle = document.querySelector('meta[property="og:title"]');
      if (!ogTitle) {
        ogTitle = document.createElement('meta');
        ogTitle.setAttribute('property', 'og:title');
        document.head.appendChild(ogTitle);
      }
      ogTitle.setAttribute('content', seoOverride.ogTitle);
    }

    if (seoOverride.ogDescription) {
      let ogDescription = document.querySelector('meta[property="og:description"]');
      if (!ogDescription) {
        ogDescription = document.createElement('meta');
        ogDescription.setAttribute('property', 'og:description');
        document.head.appendChild(ogDescription);
      }
      ogDescription.setAttribute('content', seoOverride.ogDescription);
    }

    if (seoOverride.ogImage) {
      let ogImage = document.querySelector('meta[property="og:image"]');
      if (!ogImage) {
        ogImage = document.createElement('meta');
        ogImage.setAttribute('property', 'og:image');
        document.head.appendChild(ogImage);
      }
      ogImage.setAttribute('content', seoOverride.ogImage);
    }

    // Log for debugging
    console.log('SEO Metadata Synced for path:', currentPath, seoOverride);
  }, [seoPages, location.pathname]);

  return null; // This component doesn't render anything visible
};

export default SEOMetadataSync;
