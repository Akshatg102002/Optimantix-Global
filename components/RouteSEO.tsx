// Global SEO injector for statically routed pages.
// Dynamic detail routes manage their own <Helmet> inline and are excluded below.
//
// Three-tier resolution:
//   Tier 1 — Firebase admin overrides (seoPages, managed via the admin SEO panel)
//   Tier 2 — constants.ts service/sub-service fields (via buildPageSeo)
//   Tier 3 — data/seoData.ts static fallbacks (via buildPageSeo)
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { seoData, SITE_URL } from '../data/seoData';
import { buildPageSeo, findSeoOverride, normalizePath } from '../utils/buildPageSeo';
import { buildPageSchema } from '../utils/buildPageSchema';

// Prefixes for routes that render their own inline SEO via Helmet.
const SELF_MANAGED_PREFIXES = [
  '/services/', // /services/:slug and /services/:slug/:subSlug
  '/blog/',
  '/free-tools/',
  '/case/',
  '/pages/',
  '/case-studies/',
];

const DEFAULT_IMAGE = 'https://res.cloudinary.com/dusvykklu/image/upload/v1779950090/opti_cvkbla.png';

const RouteSEO: React.FC = () => {
  const location = useLocation();
  const { seoPages } = useData();
  const path = normalizePath(location.pathname);

  // Explicit static entries always win, even if they share a prefix with a
  // self-managed dynamic route (e.g. /services/digital-marketing/seo vs /services/:slug).
  const isSelfManaged = !seoData[path] && SELF_MANAGED_PREFIXES.some((prefix) => path.startsWith(prefix));
  if (isSelfManaged) return null;

  const override = findSeoOverride(seoPages, path);
  const { title: fallbackTitle, description: fallbackDescription } = buildPageSeo(path);

  const title = override?.metaTitle || fallbackTitle;
  const description = override?.metaDescription || fallbackDescription;
  const canonical = override?.canonicalUrl || (path === '/' ? `${SITE_URL}/` : `${SITE_URL}${path}`);
  const ogTitle = override?.ogTitle || title;
  const ogDescription = override?.ogDescription || description;
  const ogImage = override?.ogImage || DEFAULT_IMAGE;
  const schema = buildPageSchema(path, title, description);
  const schemas = Array.isArray(schema) ? schema : [schema];

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      {override?.keywords && <meta name="keywords" content={override.keywords} />}
      <link rel="canonical" href={canonical} />
      <meta property="og:title" content={ogTitle} />
      <meta property="og:description" content={ogDescription} />
      <meta property="og:url" content={canonical} />
      <meta property="og:type" content="website" />
      <meta property="og:image" content={ogImage} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={ogTitle} />
      <meta name="twitter:description" content={ogDescription} />
      {schemas.map((entry, idx) => (
        <script key={idx} type="application/ld+json">{JSON.stringify(entry)}</script>
      ))}
    </Helmet>
  );
};

export default RouteSEO;
