import { PageSEO } from '../types';

export const SITE_ORIGIN = 'https://optimantix.com';

export const normalizeSeoPath = (path = '/'): string => {
  const pathOnly = path.split(/[?#]/)[0] || '/';
  const withLeadingSlash = pathOnly.startsWith('/') ? pathOnly : `/${pathOnly}`;
  return withLeadingSlash.length > 1 ? withLeadingSlash.replace(/\/+$/, '') : '/';
};

export const normalizeAbsoluteUrl = (url: string): string => {
  if (!url) return url;
  return url.length > SITE_ORIGIN.length ? url.replace(/\/+$/, '') : url;
};

export const canonicalFromPath = (pathname: string): string => {
  const normalizedPath = normalizeSeoPath(pathname);
  return normalizedPath === '/' ? SITE_ORIGIN : `${SITE_ORIGIN}${normalizedPath}`;
};

export const findRouteSeoConfig = (seoPages: PageSEO[] | undefined, pathname: string): PageSEO | undefined => {
  const currentPath = normalizeSeoPath(pathname);

  return seoPages?.find(page => {
    const definedPath = normalizeSeoPath(page.path || page.id || '/');
    const definedId = normalizeSeoPath(page.id || page.path || '/');
    return definedPath === currentPath || definedId === currentPath;
  });
};

export const resolveCanonicalUrl = (seoPages: PageSEO[] | undefined, pathname: string, canonical?: string): string => {
  const seoOverride = findRouteSeoConfig(seoPages, pathname);
  const configuredCanonical = seoOverride?.canonicalUrl?.trim() || canonical?.trim();

  return normalizeAbsoluteUrl(configuredCanonical || canonicalFromPath(pathname));
};
