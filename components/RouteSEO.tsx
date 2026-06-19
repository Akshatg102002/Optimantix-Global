// Global SEO injector for statically routed pages.
// Dynamic detail routes manage their own <Helmet> inline and are excluded below.
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { seoData, SITE_URL } from '../data/seoData';

// Prefixes for routes that render their own inline SEO via Helmet.
const SELF_MANAGED_PREFIXES = [
  '/services/', // /services/:slug and /services/:slug/:subSlug
  '/blog/',
  '/free-tools/',
  '/case/',
  '/pages/',
  '/case-studies/',
];

function normalizePath(pathname: string): string {
  const lower = pathname.toLowerCase();
  if (lower === '/') return '/';
  return lower.replace(/\/+$/, '');
}

const DEFAULT_TITLE = 'Optimantix Global – Digital Marketing Agency';
const DEFAULT_DESCRIPTION =
  'Optimantix Global is a Noida-based digital marketing agency delivering SEO, Google Ads, Meta Ads, and marketplace growth for over 10 years.';

const RouteSEO: React.FC = () => {
  const location = useLocation();
  const path = normalizePath(location.pathname);

  const entry = seoData[path];

  // Explicit static entries always win, even if they share a prefix with a
  // self-managed dynamic route (e.g. /services/digital-marketing/seo vs /services/:slug).
  const isSelfManaged = !entry && SELF_MANAGED_PREFIXES.some((prefix) => path.startsWith(prefix));
  if (isSelfManaged) return null;
  const title = entry?.title ?? DEFAULT_TITLE;
  const description = entry?.description ?? DEFAULT_DESCRIPTION;
  const canonical = path === '/' ? `${SITE_URL}/` : `${SITE_URL}${path}`;
  const schema = entry?.schema;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:type" content="website" />
      <meta property="og:image" content={entry?.image ?? 'https://res.cloudinary.com/dusvykklu/image/upload/v1779950090/opti_cvkbla.png'} />
      <meta name="twitter:image" content={entry?.image ?? 'https://res.cloudinary.com/dusvykklu/image/upload/v1779950090/opti_cvkbla.png'} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {schema && (
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
      )}
    </Helmet>
  );
};

export default RouteSEO;
