import React, { useEffect, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { findRouteSeoConfig, resolveCanonicalUrl } from '../utils/seo';

const DEFAULT_TITLE = 'Optimantix Global: Digital Marketing Agency in Noida';
const DEFAULT_DESCRIPTION = 'Optimantix Global is a premier digital marketing, web development, and performance scaling agency. Transform your digital presence today.';
const DEFAULT_IMAGE = 'https://optimantix.com/default-og-image.jpg';
const TITLE_SUFFIX = ' | Optimantix Global';

const formatTitle = (title: string): string => {
  const trimmedTitle = title.trim();

  if (!trimmedTitle) return DEFAULT_TITLE;
  if (trimmedTitle.includes('Optimantix Global')) return trimmedTitle;

  const maxLength = 60;
  let processedTitle = trimmedTitle;

  if (processedTitle.length + TITLE_SUFFIX.length > maxLength) {
    const availableLength = maxLength - TITLE_SUFFIX.length - 3;
    if (availableLength > 0) {
      processedTitle = `${processedTitle.substring(0, availableLength).trim()}...`;
    }
  }

  return `${processedTitle}${TITLE_SUFFIX}`;
};

const truncateDescription = (description: string): string => {
  const trimmedDescription = description.trim();
  return trimmedDescription.length > 155 ? `${trimmedDescription.substring(0, 152)}...` : trimmedDescription;
};

export const RouteSEO: React.FC = () => {
  const { seoPages } = useData();
  const location = useLocation();

  const resolvedSeo = useMemo(() => {
    const seoOverride = findRouteSeoConfig(seoPages, location.pathname);
    const canonicalUrl = resolveCanonicalUrl(seoPages, location.pathname);
    const title = seoOverride?.metaTitle?.trim() || DEFAULT_TITLE;
    const description = seoOverride?.metaDescription?.trim() || DEFAULT_DESCRIPTION;
    const finalDescription = truncateDescription(description);
    const ogTitle = seoOverride?.ogTitle?.trim() || seoOverride?.metaTitle?.trim() || title;
    const ogDescription = truncateDescription(seoOverride?.ogDescription?.trim() || description);
    const ogImage = seoOverride?.ogImage?.trim() || DEFAULT_IMAGE;

    return {
      canonicalUrl,
      title: formatTitle(title),
      description: finalDescription,
      keywords: seoOverride?.keywords?.trim() || '',
      ogTitle,
      ogDescription,
      ogImage,
    };
  }, [location.pathname, seoPages]);

  useEffect(() => {
    const canonicalLinks = Array.from(document.head.querySelectorAll<HTMLLinkElement>('link[rel="canonical"]'));
    const managedCanonical = canonicalLinks.find(link => link.dataset.managedBy === 'route-seo') || canonicalLinks[0] || document.createElement('link');

    canonicalLinks.forEach(link => {
      if (link !== managedCanonical) {
        link.remove();
      }
    });

    managedCanonical.rel = 'canonical';
    managedCanonical.href = resolvedSeo.canonicalUrl;
    managedCanonical.id = 'canonical-link';
    managedCanonical.dataset.managedBy = 'route-seo';

    if (!managedCanonical.parentElement) {
      document.head.appendChild(managedCanonical);
    }
  }, [resolvedSeo.canonicalUrl]);

  return (
    <Helmet>
      <title>{resolvedSeo.title}</title>
      <meta name="description" content={resolvedSeo.description} />
      {resolvedSeo.keywords && <meta name="keywords" content={resolvedSeo.keywords} />}
      <meta property="og:url" content={resolvedSeo.canonicalUrl} />
      <meta property="og:title" content={resolvedSeo.ogTitle} />
      <meta property="og:description" content={resolvedSeo.ogDescription} />
      <meta property="og:image" content={resolvedSeo.ogImage} />
      <meta name="twitter:url" content={resolvedSeo.canonicalUrl} />
      <meta name="twitter:title" content={resolvedSeo.ogTitle} />
      <meta name="twitter:description" content={resolvedSeo.ogDescription} />
      <meta name="twitter:image" content={resolvedSeo.ogImage} />
    </Helmet>
  );
};
