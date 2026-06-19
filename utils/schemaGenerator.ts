import {
  Organization,
  WebSite,
  BreadcrumbList,
  BreadcrumbItem,
  FAQPage,
  BlogPosting,
  LocalBusiness,
  ContactPage,
  AboutPage,
  WebPage,
  ImageObject,
  PostalAddress,
  ContactPoint,
} from '../types/schema';

// Normalize URL (remove trailing slashes for consistency)
export function normalizeUrl(url: string): string {
  return url.replace(/\/+$/, '').toLowerCase();
}

// Validate JSON-LD structure
export function validateSchema(schema: any): boolean {
  if (!schema || typeof schema !== 'object') return false;
  if (!schema['@context']) return false;
  if (!schema['@type']) return false;
  return true;
}

// Create ImageObject with proper sizing
export function createImageObject(
  url: string,
  width?: number,
  height?: number,
  caption?: string,
  description?: string
): ImageObject {
  return {
    '@type': 'ImageObject',
    url: normalizeUrl(url),
    ...(width && { width }),
    ...(height && { height }),
    ...(caption && { caption }),
    ...(description && { description }),
  };
}

// Create PostalAddress
export function createPostalAddress(
  streetAddress: string,
  city: string,
  region: string,
  postalCode: string,
  country: string = 'IN'
): PostalAddress {
  return {
    '@type': 'PostalAddress',
    streetAddress,
    addressLocality: city,
    addressRegion: region,
    postalCode,
    addressCountry: country,
  };
}

// Create ContactPoint
export function createContactPoint(
  contactType: string,
  telephone: string,
  areaServed?: string[],
  email?: string
): ContactPoint {
  return {
    '@type': 'ContactPoint',
    contactType,
    telephone,
    ...(areaServed && { areaServed }),
    availableLanguage: ['en', 'hi'],
    ...(email && { email }),
  };
}

// Create comprehensive Organization schema
export function createOrganization(config: {
  name: string;
  url: string;
  logo?: string | ImageObject;
  description?: string;
  email?: string;
  telephone?: string;
  faxNumber?: string;
  address?: PostalAddress | PostalAddress[];
  sameAs?: string[];
  contactPoints?: ContactPoint[];
  foundingDate?: string;
  areaServed?: string[];
  employees?: number;
}): Organization {
  const logoObject = typeof config.logo === 'string'
    ? createImageObject(config.logo, 200, 200)
    : config.logo;

  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: config.name,
    url: normalizeUrl(config.url),
    ...(logoObject && { logo: logoObject }),
    ...(config.description && { description: config.description }),
    ...(config.email && { email: config.email }),
    ...(config.telephone && { telephone: config.telephone }),
    ...(config.faxNumber && { faxNumber: config.faxNumber }),
    ...(config.address && { address: config.address }),
    ...(config.sameAs && config.sameAs.length > 0 && { sameAs: config.sameAs }),
    ...(config.contactPoints && config.contactPoints.length > 0 && {
      contactPoint: config.contactPoints,
    }),
    ...(config.foundingDate && { foundingDate: config.foundingDate }),
    ...(config.areaServed && config.areaServed.length > 0 && {
      areaServed: config.areaServed,
    }),
  };
}

// Create WebSite schema
export function createWebSite(config: {
  name: string;
  url: string;
  description?: string;
  image?: string;
  searchUrl?: string;
}): WebSite {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: config.name,
    url: normalizeUrl(config.url),
    ...(config.description && { description: config.description }),
    ...(config.image && { image: createImageObject(config.image) }),
    ...(config.searchUrl && {
      potentialAction: {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: config.searchUrl,
        },
        'query-input': 'required name=search_term_string',
      },
    }),
  };
}

// Create BreadcrumbList schema
export function createBreadcrumbList(breadcrumbs: {
  name: string;
  url?: string;
}[]): BreadcrumbList {
  const itemListElement: BreadcrumbItem[] = breadcrumbs.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    ...(item.url && { item: normalizeUrl(item.url) }),
  }));

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement,
  };
}

// Create FAQPage schema
export function createFAQPage(faqs: {
  question: string;
  answer: string;
}[]): FAQPage {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

// Create BlogPosting schema
export function createBlogPosting(config: {
  headline: string;
  description: string;
  image: string;
  datePublished: string;
  dateModified: string;
  author: {
    name: string;
    url?: string;
  };
  publisher: {
    name: string;
    url: string;
    logo?: string;
  };
  url: string;
  inLanguage?: string;
}): BlogPosting {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: config.headline,
    description: config.description,
    image: createImageObject(config.image),
    datePublished: config.datePublished,
    dateModified: config.dateModified,
    author: {
      '@type': 'Person',
      name: config.author.name,
      ...(config.author.url && { url: normalizeUrl(config.author.url) }),
    },
    publisher: {
      '@type': 'Organization',
      name: config.publisher.name,
      url: normalizeUrl(config.publisher.url),
      ...(config.publisher.logo && {
        logo: createImageObject(config.publisher.logo),
      }),
    },
    isPartOf: {
      '@type': 'WebSite',
      name: config.publisher.name,
      url: normalizeUrl(config.publisher.url),
    },
    inLanguage: config.inLanguage || 'en-IN',
  };
}

// Create LocalBusiness schema
export function createLocalBusiness(config: {
  name: string;
  url: string;
  address: PostalAddress;
  telephone: string;
  email?: string;
  description?: string;
  image?: string;
  priceRange?: string;
  areaServed?: string[];
  sameAs?: string[];
  ratingValue?: number;
  reviewCount?: number;
  latitude?: number;
  longitude?: number;
}): LocalBusiness {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: config.name,
    url: normalizeUrl(config.url),
    address: config.address,
    telephone: config.telephone,
    ...(config.email && { email: config.email }),
    ...(config.description && { description: config.description }),
    ...(config.image && { image: createImageObject(config.image) }),
    ...(config.priceRange && { priceRange: config.priceRange }),
    ...(config.areaServed && { areaServed: config.areaServed }),
    ...(config.sameAs && config.sameAs.length > 0 && { sameAs: config.sameAs }),
    ...(config.latitude &&
      config.longitude && {
        geo: {
          '@type': 'GeoCoordinates',
          latitude: config.latitude,
          longitude: config.longitude,
        },
      }),
    ...(config.ratingValue &&
      config.reviewCount && {
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: config.ratingValue,
          reviewCount: config.reviewCount,
          bestRating: 5,
          worstRating: 1,
        },
      }),
  };
}

// Create ContactPage schema
export function createContactPageSchema(config: {
  name: string;
  description: string;
  url: string;
  organization: Organization;
}): ContactPage {
  return {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: config.name,
    description: config.description,
    url: normalizeUrl(config.url),
    mainEntity: config.organization,
  };
}

// Create AboutPage schema
export function createAboutPageSchema(config: {
  name: string;
  description: string;
  url: string;
  organization: Organization;
}): AboutPage {
  return {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: config.name,
    description: config.description,
    url: normalizeUrl(config.url),
    mainEntity: config.organization,
  };
}

// Create WebPage schema
export function createWebPageSchema(config: {
  url: string;
  name: string;
  headline?: string;
  description: string;
  image?: string;
  datePublished?: string;
  dateModified?: string;
  author?: {
    name: string;
    url?: string;
  };
  inLanguage?: string;
}): WebPage {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    url: normalizeUrl(config.url),
    name: config.name,
    ...(config.headline && { headline: config.headline }),
    description: config.description,
    ...(config.image && { image: createImageObject(config.image) }),
    ...(config.datePublished && { datePublished: config.datePublished }),
    ...(config.dateModified && { dateModified: config.dateModified }),
    ...(config.author && {
      author: {
        '@type': 'Person',
        name: config.author.name,
        ...(config.author.url && { url: normalizeUrl(config.author.url) }),
      },
    }),
    inLanguage: config.inLanguage || 'en-IN',
  };
}

// Merge multiple schemas into an array
export function mergeSchemas(...schemas: any[]): any[] {
  return schemas.filter(schema => schema && validateSchema(schema));
}

// Create a Schema wrapper with @graph for multiple related schemas
export function createSchemaGraph(...schemas: any[]): any {
  return {
    '@context': 'https://schema.org',
    '@graph': schemas.filter(schema => validateSchema(schema)),
  };
}
