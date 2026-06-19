// SEO Configuration & Constants
import { organizationConfig } from '../data/organizationData';

export const SEO_CONFIG = {
  // Site metadata
  siteName: 'Optimantix Global',
  siteUrl: 'https://optimantix.com',
  siteDescription: organizationConfig.description,

  // Default image for OG tags (fallback)
  defaultOgImage: 'https://res.cloudinary.com/dusvykklu/image/upload/v1779950090/opti_cvkbla.png',

  // Social metadata
  twitterHandle: '@optimantix',
  facebookPageUrl: 'https://www.facebook.com/optimantix',

  // Meta tag constraints
  titleMaxLength: 60,
  descriptionMaxLength: 160,
  metaRobots: 'index, follow',

  // Language
  defaultLanguage: 'en',
  languageRegion: 'en-IN',

  // Organization info
  organization: organizationConfig,

  // Robots meta options
  robotsOptions: {
    index: 'index',
    follow: 'follow',
    googleBot: 'index, follow',
    bingBot: 'index, follow',
  },

  // Image optimization defaults
  imageDefaults: {
    quality: 'high',
    lazyLoad: true,
    responsive: true,
  },

  // Breadcrumb settings
  breadcrumbs: {
    showHome: true,
    maxItems: 5,
  },

  // Article/Blog settings
  article: {
    defaultAuthor: 'Optimantix Global',
    defaultPublisher: organizationConfig.name,
  },
};

// Utility function to validate and trim meta descriptions
export function validateMetaDescription(description: string, maxLength = 160): string {
  const trimmed = description.trim();
  if (trimmed.length > maxLength) {
    return trimmed.substring(0, maxLength - 3).trim() + '...';
  }
  return trimmed;
}

// Utility function to validate and trim page titles
export function validatePageTitle(title: string, maxLength = 60, suffix = ' | Optimantix Global'): string {
  let trimmed = title.trim();
  const totalLength = trimmed.length + suffix.length;

  if (totalLength > maxLength) {
    const availableLength = maxLength - suffix.length - 3;
    if (availableLength > 0) {
      trimmed = trimmed.substring(0, availableLength).trim() + '...';
    }
  }

  return `${trimmed}${suffix}`;
}

// Generate canonical URL
export function generateCanonicalUrl(pathname: string): string {
  const cleanPath = pathname.replace(/\/+$/, '').toLowerCase();
  return `${SEO_CONFIG.siteUrl}${cleanPath || '/'}`;
}

// Validate social media URLs
export function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

// Create robots meta tag value
export function createRobotsMeta(options: {
  index?: boolean;
  follow?: boolean;
  snippet?: boolean;
  imageIndex?: boolean;
  archive?: boolean;
} = {}): string {
  const directives: string[] = [];

  directives.push(options.index !== false ? 'index' : 'noindex');
  directives.push(options.follow !== false ? 'follow' : 'nofollow');

  if (options.snippet === false) directives.push('nosnippet');
  if (options.imageIndex === false) directives.push('noimageindex');
  if (options.archive === false) directives.push('noarchive');

  return directives.join(', ');
}
