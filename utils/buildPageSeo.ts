// Tier 2/3 SEO resolver — pure function, no hooks, no Firebase calls.
// Tier 1 (Firebase admin overrides) is resolved separately by the caller
// via `findSeoOverride` and takes priority over everything here.
import { INITIAL_SERVICES } from '../constants';
import type { Service, SubService, PageSEO } from '../types';
import { seoData, truncateDescription } from '../data/seoData';

export const DEFAULT_TITLE = 'Optimantix Global – Digital Marketing Agency';
export const DEFAULT_DESCRIPTION =
  'Optimantix Global is a Noida-based digital marketing agency delivering SEO, Google Ads, Meta Ads, and marketplace growth for over 10 years.';

export interface ServiceRouteMatch {
  service: Service;
  subService?: SubService;
}

// Normalize a pathname for consistent lookups (lowercase, no trailing slash).
export function normalizePath(pathname: string): string {
  const lower = pathname.toLowerCase();
  if (lower === '/') return '/';
  return lower.replace(/\/+$/, '');
}

// Matches /services/:slug and /services/:slug/:subSlug against INITIAL_SERVICES.
export function matchServiceRoute(pathname: string): ServiceRouteMatch | null {
  const segments = normalizePath(pathname).split('/').filter(Boolean);
  if (segments[0] !== 'services' || segments.length < 2) return null;

  const service = INITIAL_SERVICES.find((s) => s.slug === segments[1]);
  if (!service) return null;

  if (segments.length === 2) return { service };

  const subService = service.subServices?.find((sub) => sub.slug === segments[2]);
  if (!subService) return null;

  return { service, subService };
}

// Tier 1 — find a Firebase admin override for the given path.
export function findSeoOverride(seoPages: PageSEO[], pathname: string): PageSEO | undefined {
  const normalized = normalizePath(pathname);
  return seoPages.find((page) => {
    const definedPath = normalizePath(page.path);
    const definedId = page.id ? normalizePath(page.id) : '';
    return definedPath === normalized || definedId === normalized;
  });
}

export function buildPageSeo(pathname: string): { title: string; description: string } {
  const path = normalizePath(pathname);
  const match = matchServiceRoute(path);

  if (match?.subService) {
    const { service, subService } = match;
    const name = subService.hero_section?.headline || subService.page_title || subService.title || service.title;
    const title = subService.seo?.meta_title || subService.metaTitle || `${name} | Optimantix Global`;
    const description = truncateDescription(
      subService.seo?.meta_description ||
        subService.metaDescription ||
        subService.fullDescription ||
        subService.shortDescription ||
        service.shortDescription,
      155
    );
    return { title, description };
  }

  if (match?.service) {
    const { service } = match;
    const title = service.metaTitle || `${service.title} | Optimantix Global`;
    const description = truncateDescription(service.metaDescription || service.shortDescription, 155);
    return { title, description };
  }

  const entry = seoData[path];
  if (entry) return { title: entry.title, description: entry.description };

  return { title: DEFAULT_TITLE, description: DEFAULT_DESCRIPTION };
}
