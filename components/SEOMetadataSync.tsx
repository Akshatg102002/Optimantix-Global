/**
 * SEO Metadata Sync Component
 *
 * Keeps route-level SEO data from the admin panel synchronized with the real
 * document <head>. React Helmet owns the declarative tags; this component is a
 * safety net for asynchronously loaded Firebase SEO settings and guarantees a
 * single canonical link exists after initial load and after client-side route
 * changes.
 */

import { useLayoutEffect, useMemo } from 'react';
import { useData } from '../context/DataContext';
import { useLocation } from 'react-router-dom';
import { generateCanonicalUrl } from '../utils/seoConfig';

const normalizePath = (path?: string): string => {
  if (!path) return '/';

  const [pathname] = path.split(/[?#]/);
  const withLeadingSlash = pathname.startsWith('/') ? pathname : `/${pathname}`;
  return withLeadingSlash.length > 1 ? withLeadingSlash.replace(/\/+$/, '') : '/';
};

const upsertMeta = (selector: string, createAttributes: Record<string, string>, content?: string) => {
  if (!content?.trim()) return;

  let element = document.querySelector<HTMLMetaElement>(selector);
  if (!element) {
    element = document.createElement('meta');
    Object.entries(createAttributes).forEach(([name, value]) => element?.setAttribute(name, value));
    document.head.appendChild(element);
  }
  element.setAttribute('content', content.trim());
};

const syncCanonical = (href: string) => {
  const canonicalHref = href.trim();
  if (!canonicalHref) return;

  const canonicalLinks = Array.from(document.querySelectorAll<HTMLLinkElement>('link[rel="canonical"]'));
  const canonical = canonicalLinks[0] ?? document.createElement('link');

  canonical.setAttribute('rel', 'canonical');
  canonical.setAttribute('data-seo-managed', 'true');
  canonical.setAttribute('href', canonicalHref);

  if (!canonical.parentElement) {
    const insertionPoint = document.querySelector('meta[name="google-site-verification"]')
      || document.querySelector('link[rel="sitemap"]')
      || document.head.firstElementChild;

    document.head.insertBefore(canonical, insertionPoint);
  }

  canonicalLinks.slice(1).forEach(link => link.remove());
};

export const SEOMetadataSync: React.FC = () => {
  const { seoPages } = useData();
  const location = useLocation();

  const currentPath = useMemo(() => normalizePath(location.pathname), [location.pathname]);

  const seoOverride = useMemo(() => {
    return seoPages?.find(page => {
      const definedPath = normalizePath(page.path);
      const definedId = page.id ? normalizePath(page.id) : '';
      return definedPath === currentPath || definedId === currentPath;
    });
  }, [currentPath, seoPages]);

  useLayoutEffect(() => {
    const canonicalUrl = seoOverride?.canonicalUrl?.trim() || generateCanonicalUrl(currentPath);

    const applyMetadata = () => {
      // Always keep exactly one canonical URL available, even while admin SEO
      // settings are still loading or when no explicit canonical has been saved.
      syncCanonical(canonicalUrl);

      // Admin-managed metadata overrides are applied when present. Page-level
      // Helmet tags remain responsible for static fallbacks such as route titles.
      if (seoOverride?.metaTitle?.trim()) {
        document.title = seoOverride.metaTitle.trim();
        upsertMeta('meta[property="og:title"]', { property: 'og:title' }, seoOverride.ogTitle || seoOverride.metaTitle);
        upsertMeta('meta[name="twitter:title"]', { name: 'twitter:title' }, seoOverride.ogTitle || seoOverride.metaTitle);
      }

      upsertMeta('meta[name="description"]', { name: 'description' }, seoOverride?.metaDescription);
      upsertMeta('meta[name="keywords"]', { name: 'keywords' }, seoOverride?.keywords);
      upsertMeta('meta[property="og:description"]', { property: 'og:description' }, seoOverride?.ogDescription || seoOverride?.metaDescription);
      upsertMeta('meta[property="og:image"]', { property: 'og:image' }, seoOverride?.ogImage);
      upsertMeta('meta[name="twitter:description"]', { name: 'twitter:description' }, seoOverride?.ogDescription || seoOverride?.metaDescription);
      upsertMeta('meta[name="twitter:image"]', { name: 'twitter:image' }, seoOverride?.ogImage);
      upsertMeta('meta[property="og:url"]', { property: 'og:url' }, canonicalUrl);
      upsertMeta('meta[name="twitter:url"]', { name: 'twitter:url' }, canonicalUrl);
    };

    applyMetadata();
    const timer = window.setTimeout(applyMetadata, 0);

    return () => window.clearTimeout(timer);
  }, [currentPath, seoOverride]);

  return null;
};

export default SEOMetadataSync;
