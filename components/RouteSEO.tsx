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
import { seoData, SITE_URL, truncateDescription } from '../data/seoData';
import { buildPageSeo, findSeoOverride, matchServiceRoute, normalizePath } from '../utils/buildPageSeo';
import { buildPageSchema } from '../utils/buildPageSchema';

// Prefixes for routes that render their own inline SEO via Helmet.
// /services/ is handled separately below — it's shared by built-in
// ServiceTemplate/SubServiceTemplate routes (self-managed) and custom admin
// pages (Firestore `pages`, resolved here instead — see isServicesSelfManaged).
const SELF_MANAGED_PREFIXES = [
  '/blog/',
  '/free-tools/',
  '/case/',
  '/case-studies/',
];

const DEFAULT_IMAGE = 'https://res.cloudinary.com/dusvykklu/image/upload/v1779950090/opti_cvkbla.png';

// /services/:slug is self-managed only when the slug matches a built-in
// service (ServiceTemplate); /services/:slug/:subSlug always maps to
// SubServiceTemplate. A slug that matches neither is a custom admin page
// rendered by PageTemplate, which has no inline SEO of its own — it's
// resolved via the three-tier system below instead.
function isServicesSelfManaged(path: string): boolean {
  if (!path.startsWith('/services/')) return false;
  const segments = path.split('/').filter(Boolean);
  if (segments.length > 2) return true;
  return !!matchServiceRoute(path);
}

const RouteSEO: React.FC = () => {
  const location = useLocation();
  const { seoPages, seoPageLoading, pages } = useData();
  const path = normalizePath(location.pathname);

  // Wait for the Firebase admin overrides to resolve before injecting any SEO
  // tags, so the fallback title never flashes ahead of a Tier 1 override.
  if (seoPageLoading) return null;

  // Explicit static entries always win, even if they share a prefix with a
  // self-managed dynamic route (e.g. /services/digital-marketing/seo vs /services/:slug).
  const isSelfManaged =
    !seoData[path] &&
    (isServicesSelfManaged(path) || SELF_MANAGED_PREFIXES.some((prefix) => path.startsWith(prefix)));
  if (isSelfManaged) return null;

  // Custom admin page at /services/{slug} that isn't a built-in service.
  const segments = path.split('/').filter(Boolean);
  const customPage =
    segments[0] === 'services' && segments.length === 2
      ? pages.find((p) => p.slug === segments[1] && p.isPublished)
      : undefined;

  const override = findSeoOverride(seoPages, path);
  const { title: fallbackTitle, description: fallbackDescription } = customPage
    ? {
        title: customPage.metaTitle || customPage.title,
        description: truncateDescription(customPage.metaDescription || customPage.excerpt || '', 155),
      }
    : buildPageSeo(path);

  const title = override?.metaTitle || fallbackTitle;
  const description = override?.metaDescription || fallbackDescription;
  const canonical = override?.canonicalUrl || (path === '/' ? `${SITE_URL}/` : `${SITE_URL}${path}`);
  const ogTitle = override?.ogTitle || title;
  const ogDescription = override?.ogDescription || description;
  const ogImage = override?.ogImage || customPage?.imageUrl || DEFAULT_IMAGE;
  const schema = buildPageSchema(
    path,
    title,
    description,
    customPage
      ? {
          schemaType: customPage.schemaType,
          imageUrl: customPage.imageUrl,
          createdAt: customPage.createdAt,
          updatedAt: customPage.updatedAt,
        }
      : undefined
  );
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
