import React, { useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { createBreadcrumbList } from '../../utils/schemaGenerator';
import type { BreadcrumbList } from '../../types/schema';

interface BreadcrumbConfig {
  path: string;
  label: string;
  url?: string;
}

interface SchemaBreadcrumbProps {
  breadcrumbs?: BreadcrumbConfig[];
  customSchema?: BreadcrumbList;
}

// Route to breadcrumb mapping
const BREADCRUMB_MAP: Record<string, BreadcrumbConfig[]> = {
  '/': [],
  '/services': [
    { path: '/', label: 'Home', url: 'https://optimantix.com' },
    { path: '/services', label: 'Services' },
  ],
  '/services/seo': [
    { path: '/', label: 'Home', url: 'https://optimantix.com' },
    { path: '/services', label: 'Services', url: 'https://optimantix.com/services' },
    { path: '/services/seo', label: 'SEO Services' },
  ],
  '/blog': [
    { path: '/', label: 'Home', url: 'https://optimantix.com' },
    { path: '/blog', label: 'Blog' },
  ],
  '/case-studies': [
    { path: '/', label: 'Home', url: 'https://optimantix.com' },
    { path: '/case-studies', label: 'Case Studies' },
  ],
  '/contact': [
    { path: '/', label: 'Home', url: 'https://optimantix.com' },
    { path: '/contact', label: 'Contact Us' },
  ],
  '/about': [
    { path: '/', label: 'Home', url: 'https://optimantix.com' },
    { path: '/about', label: 'About Us' },
  ],
  '/google-workspace': [
    { path: '/', label: 'Home', url: 'https://optimantix.com' },
    { path: '/google-workspace', label: 'Google Workspace' },
  ],
  '/hosting': [
    { path: '/', label: 'Home', url: 'https://optimantix.com' },
    { path: '/hosting', label: 'Hosting Solutions' },
  ],
  '/free-seo-audit': [
    { path: '/', label: 'Home', url: 'https://optimantix.com' },
    { path: '/free-seo-audit', label: 'Free SEO Audit' },
  ],
};

export const SchemaBreadcrumb: React.FC<SchemaBreadcrumbProps> = ({
  breadcrumbs,
  customSchema,
}) => {
  const location = useLocation();
  const pathname = location.pathname.replace(/\/$/, '') || '/';

  const schema = useMemo(() => {
    if (customSchema) return customSchema;

    const breadcrumbConfig = breadcrumbs || BREADCRUMB_MAP[pathname];

    // Skip breadcrumb for homepage
    if (!breadcrumbConfig || breadcrumbConfig.length === 0) {
      return null;
    }

    // Build breadcrumb list for the page
    const crumbs = breadcrumbConfig.map(crumb => ({
      name: crumb.label,
      url: crumb.url || `https://optimantix.com${crumb.path}`,
    }));

    // Add current page if not already included
    const lastCrumb = crumbs[crumbs.length - 1];
    const currentUrl = `https://optimantix.com${pathname}`;

    if (!lastCrumb || lastCrumb.url !== currentUrl) {
      const currentLabel = pathname
        .split('/')
        .filter(Boolean)
        .pop()
        ?.replace(/-/g, ' ')
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ') || 'Page';

      crumbs.push({
        name: currentLabel,
        url: currentUrl,
      });
    }

    return createBreadcrumbList(crumbs);
  }, [pathname, breadcrumbs, customSchema]);

  if (!schema) {
    return null;
  }

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
};
