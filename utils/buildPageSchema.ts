// Tier-aware JSON-LD schema builder — pure function, no hooks, no Firebase calls.
// Reuses the typed builders in utils/schemaGenerator.ts rather than inlining
// schema object literals.
import {
  createOrganization,
  createWebSite,
  createBreadcrumbList,
  createFAQPage,
  createContactPageSchema,
  createAboutPageSchema,
  createWebPageSchema,
} from './schemaGenerator';
import type { Organization } from '../types/schema';
import { SITE_URL } from '../data/seoData';
import { matchServiceRoute, normalizePath } from './buildPageSeo';

const ORG_LOGO = 'https://res.cloudinary.com/dusvykklu/image/upload/v1779950090/opti_cvkbla.png';
const ORG_DESCRIPTION =
  'Optimantix Global is a premier digital marketing, web development, and performance scaling agency based in Noida, India, trusted by 100s of brands with 10+ years of proven results.';

function buildOrganizationTyped(): Organization {
  return createOrganization({
    name: 'Optimantix Global',
    url: SITE_URL,
    logo: ORG_LOGO,
    description: ORG_DESCRIPTION,
    email: 'contact@optimantix.com',
    telephone: '+91-9910343016',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Noida, Uttar Pradesh',
      addressLocality: 'Noida',
      addressRegion: 'Uttar Pradesh',
      postalCode: '201301',
      addressCountry: 'IN',
    },
    sameAs: [
      'https://www.facebook.com/optimantix',
      'https://www.instagram.com/optimantix',
      'https://in.linkedin.com/company/optimantix',
      'https://in.pinterest.com/OptimantiXglobal1',
    ],
    foundingDate: '2010-01-01',
    areaServed: ['India', 'United States', 'United Kingdom', 'Canada', 'Australia', 'Dubai', 'Global'],
  });
}

function buildOrganization(): Record<string, unknown> {
  return buildOrganizationTyped() as unknown as Record<string, unknown>;
}

// Humanize a URL segment for breadcrumb labels, e.g. "digital-marketing" -> "Digital Marketing".
function humanizeSegment(segment: string): string {
  return segment
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

function buildBreadcrumb(pathname: string): Record<string, unknown> | null {
  const path = normalizePath(pathname);
  if (path === '/') return null;

  const segments = path.split('/').filter(Boolean);
  const items: { name: string; url: string }[] = [{ name: 'Home', url: `${SITE_URL}/` }];

  let accumulated = '';
  segments.forEach((segment) => {
    accumulated += `/${segment}`;
    items.push({ name: humanizeSegment(segment), url: `${SITE_URL}${accumulated}` });
  });

  return createBreadcrumbList(items) as unknown as Record<string, unknown>;
}

// Data needed to build schema for a custom admin page (Firestore `pages`
// collection) at /services/{slug} that doesn't match an INITIAL_SERVICES slug.
export interface CustomPageSchemaInput {
  schemaType: 'Article' | 'WebPage' | 'Service';
  imageUrl?: string;
  createdAt?: string;
  updatedAt?: string;
}

function buildCustomPageSchema(
  page: CustomPageSchemaInput,
  canonical: string,
  title: string,
  description: string
): Record<string, unknown> {
  if (page.schemaType === 'Service') {
    return {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: title,
      description,
      provider: {
        '@type': 'Organization',
        name: 'Optimantix Global',
        url: SITE_URL,
      },
      url: canonical,
      areaServed: 'IN',
    };
  }

  if (page.schemaType === 'Article') {
    return {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: title,
      description,
      image: page.imageUrl,
      author: {
        '@type': 'Organization',
        name: 'Optimantix Global',
      },
      datePublished: page.createdAt,
      dateModified: page.updatedAt,
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': canonical,
      },
    };
  }

  return createWebPageSchema({ url: canonical, name: title, description }) as unknown as Record<string, unknown>;
}

export function buildPageSchema(
  pathname: string,
  title: string,
  description: string,
  customPage?: CustomPageSchemaInput
): Record<string, unknown> | Record<string, unknown>[] {
  const path = normalizePath(pathname);
  const canonical = `${SITE_URL}${path === '/' ? '/' : path}`;
  const breadcrumb = buildBreadcrumb(path);

  if (path === '/') {
    const website = createWebSite({
      name: 'Optimantix Global',
      url: SITE_URL,
      description,
      searchUrl: `${SITE_URL}/search?q={search_term_string}`,
    }) as unknown as Record<string, unknown>;
    return [buildOrganization(), website];
  }

  if (path === '/contact') {
    const contactPage = createContactPageSchema({
      name: 'Contact Optimantix Global',
      description,
      url: canonical,
      organization: buildOrganizationTyped(),
    }) as unknown as Record<string, unknown>;
    return breadcrumb ? [contactPage, breadcrumb] : contactPage;
  }

  if (path === '/about') {
    const aboutPage = createAboutPageSchema({
      name: 'About Optimantix Global',
      description,
      url: canonical,
      organization: buildOrganizationTyped(),
    }) as unknown as Record<string, unknown>;
    return breadcrumb ? [aboutPage, breadcrumb] : aboutPage;
  }

  if (path === '/blog') {
    const blogPage = createWebPageSchema({
      url: canonical,
      name: title,
      description,
    }) as unknown as Record<string, unknown>;
    const blogSchema: Record<string, unknown> = {
      ...blogPage,
      '@type': 'Blog',
    };
    return breadcrumb ? [blogSchema, breadcrumb] : blogSchema;
  }

  const match = matchServiceRoute(path);
  if (match) {
    const { service, subService } = match;
    const name = subService
      ? subService.hero_section?.headline || subService.page_title || subService.title || service.title
      : service.title;

    const serviceSchema: Record<string, unknown> = {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name,
      description,
      provider: {
        '@type': 'Organization',
        name: 'Optimantix Global',
        url: SITE_URL,
      },
      url: canonical,
      areaServed: 'IN',
    };

    const schemas: Record<string, unknown>[] = [serviceSchema];

    const faqQuestions = subService?.faq_section?.questions;
    if (faqQuestions && faqQuestions.length > 0) {
      const faqSchema = createFAQPage(
        faqQuestions.map((q) => ({ question: q.question, answer: q.answer }))
      ) as unknown as Record<string, unknown>;
      schemas.push(faqSchema);
    }

    if (breadcrumb) schemas.push(breadcrumb);

    return schemas.length === 1 ? schemas[0] : schemas;
  }

  if (customPage) {
    const pageSchema = buildCustomPageSchema(customPage, canonical, title, description);
    return breadcrumb ? [pageSchema, breadcrumb] : pageSchema;
  }

  const webPage = createWebPageSchema({
    url: canonical,
    name: title,
    description,
  }) as unknown as Record<string, unknown>;

  return breadcrumb ? [webPage, breadcrumb] : webPage;
}
