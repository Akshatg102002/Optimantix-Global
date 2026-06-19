// Central static SEO configuration, keyed by normalized route path.
// Consumed by components/RouteSEO.tsx for all statically routed pages.
// Dynamic detail pages (e.g. /services/:slug, /blog/:slug) manage their own SEO inline.

export const SITE_URL = 'https://optimantix.com';

const ORGANIZATION_ADDRESS = {
  '@type': 'PostalAddress',
  streetAddress: 'Noida, Uttar Pradesh',
  addressLocality: 'Noida',
  addressRegion: 'Uttar Pradesh',
  postalCode: '201301',
  addressCountry: 'IN',
};

const ORGANIZATION_SAME_AS = [
  'https://www.facebook.com/optimantix',
  'https://in.linkedin.com/company/optimantix',
];

export interface PageSEOEntry {
  title: string;
  description: string;
  schema: Record<string, unknown> | Record<string, unknown>[];
  image?: string;
}

const HOME_ORGANIZATION_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Optimantix Global',
  description: 'Optimantix Global is a premier digital marketing, web development, and performance scaling agency. Transform your digital presence with expert SEO, Google Ads, Meta Ads, E-commerce, and Web Development services. Trusted by 100s of brands with 10+ years of proven results.',
  url: SITE_URL,
  logo: {
    '@type': 'ImageObject',
    url: 'https://res.cloudinary.com/dusvykklu/image/upload/v1779950090/opti_cvkbla.png',
    width: 200,
    height: 200,
    name: 'Optimantix Global Logo',
  },
  image: 'https://res.cloudinary.com/dusvykklu/image/upload/v1779950090/opti_cvkbla.png',
  email: 'contact@optimantix.com',
  telephone: '+91-9910343016',
  contactPoint: [
    {
      '@type': 'ContactPoint',
      contactType: 'Customer Service',
      telephone: '+91-9910343016',
      email: 'contact@optimantix.com',
      areaServed: ['IN', 'Global'],
      availableLanguage: ['en', 'hi'],
    },
    {
      '@type': 'ContactPoint',
      contactType: 'Sales',
      telephone: '+91-9910343016',
      email: 'sales@optimantix.com',
      areaServed: ['IN'],
      availableLanguage: ['en', 'hi'],
    },
    {
      '@type': 'ContactPoint',
      contactType: 'Support',
      telephone: '+91-9910343016',
      email: 'support@optimantix.com',
      areaServed: ['IN'],
      availableLanguage: ['en', 'hi'],
    },
  ],
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
  knowsAbout: [
    'Search Engine Optimization',
    'Google Ads Management',
    'Meta Ads Management',
    'E-commerce Management',
    'Web Development',
    'Web Design',
    'Performance Scaling',
    'Marketplace Management',
  ],
};

const HOME_WEBSITE_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Optimantix Global',
  url: SITE_URL,
  description: 'Digital marketing, web development & performance scaling agency',
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: `${SITE_URL}/search?q={search_term_string}`,
    },
    'query-input': 'required name=search_term_string',
  },
};

const organizationSchema = (description: string): Record<string, unknown> => ({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Optimantix Global',
  url: SITE_URL,
  description,
  address: ORGANIZATION_ADDRESS,
  sameAs: ORGANIZATION_SAME_AS,
});

const serviceSchema = (name: string, description: string, path: string): Record<string, unknown> => ({
  '@context': 'https://schema.org',
  '@type': 'Service',
  name,
  description,
  provider: {
    '@type': 'Organization',
    name: 'Optimantix Global',
    url: SITE_URL,
  },
  url: `${SITE_URL}${path}`,
  areaServed: 'IN',
});

export const seoData: Record<string, PageSEOEntry> = {
  '/': {
    title: 'Home | Optimantix Global – Digital Marketing Agency',
    description: 'Optimantix Global is a Noida-based digital marketing agency delivering SEO, Google Ads, Meta Ads, and marketplace growth for over 10 years.',
    schema: [HOME_ORGANIZATION_SCHEMA, HOME_WEBSITE_SCHEMA],
  },
  '/about': {
    title: 'About Us | Optimantix Global – Digital Marketing Agency',
    description: 'Learn about Optimantix Global, a Noida-based digital marketing agency with 10+ years of experience in SEO, SEM, SMM, and marketplace management.',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'AboutPage',
      name: 'About Optimantix Global',
      description: 'Learn about Optimantix Global, a Noida-based digital marketing agency with 10+ years of experience in SEO, SEM, SMM, and marketplace management.',
      url: `${SITE_URL}/about`,
      mainEntity: organizationSchema(
        'Optimantix Global is a premier digital marketing, web development, and performance scaling agency based in Noida, India.'
      ),
    },
  },
  '/services': {
    title: 'Services | Optimantix Global – Digital Marketing Agency',
    description: 'Explore Optimantix Global’s digital growth solutions: SEO, web development, marketplace management, Google Ads, Meta Ads, and branding.',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: 'Optimantix Global Services',
      description: 'Explore Optimantix Global’s digital growth solutions: SEO, web development, marketplace management, Google Ads, Meta Ads, and branding.',
      url: `${SITE_URL}/services`,
    },
  },
  '/services/digital-marketing/seo': {
    title: 'SEO Services | Optimantix Global – Digital Marketing Agency',
    description: 'Rank higher and drive organic traffic with Optimantix Global’s data-driven SEO services, covering technical, on-page, and off-page strategy.',
    schema: serviceSchema(
      'SEO Services',
      'Rank higher and drive organic traffic with Optimantix Global’s data-driven SEO services, covering technical, on-page, and off-page strategy.',
      '/services/digital-marketing/seo'
    ),
  },
  '/contact': {
    title: 'Contact Us | Optimantix Global – Digital Marketing Agency',
    description: 'Get in touch with Optimantix Global for a free consultation. Reach our Noida-based digital marketing team for SEO, ads, and growth support.',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'ContactPage',
      name: 'Contact Optimantix Global',
      description: 'Get in touch with Optimantix Global for a free consultation. Reach our Noida-based digital marketing team for SEO, ads, and growth support.',
      url: `${SITE_URL}/contact`,
      mainEntity: organizationSchema(
        'Optimantix Global is a premier digital marketing, web development, and performance scaling agency based in Noida, India.'
      ),
    },
  },
  '/blog': {
    title: 'Blog | Optimantix Global – Digital Marketing Agency',
    description: 'Read the latest insights, trends, and strategies in digital marketing, SEO, and technology from the Optimantix Global team.',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'Blog',
      name: 'Optimantix Global Blog',
      description: 'Read the latest insights, trends, and strategies in digital marketing, SEO, and technology from the Optimantix Global team.',
      url: `${SITE_URL}/blog`,
    },
  },
  '/case-studies': {
    title: 'Case Studies | Optimantix Global – Digital Marketing Agency',
    description: 'Explore real client results from Optimantix Global, showing measurable ROI across SEO, Google Ads, Meta Ads, and marketplace management.',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: 'Optimantix Global Case Studies',
      description: 'Explore real client results from Optimantix Global, showing measurable ROI across SEO, Google Ads, Meta Ads, and marketplace management.',
      url: `${SITE_URL}/case-studies`,
    },
  },
  '/google-workspace': {
    title: 'Google Workspace Reseller | Optimantix Global',
    description: 'Optimantix Global is an authorised Google Workspace reseller in India, offering INR billing, GST invoices, free migration, and local support.',
    schema: serviceSchema(
      'Google Workspace Reseller',
      'Optimantix Global is an authorised Google Workspace reseller in India, offering INR billing, GST invoices, free migration, and local support.',
      '/google-workspace'
    ),
  },
  '/hosting': {
    title: 'Hosting Solutions | Optimantix Global – Digital Marketing Agency',
    description: 'Fast, secure VPS and cloud hosting billed in INR, with a 99.99% uptime SLA, free SSL, and 24/7 India-based support from Optimantix Global.',
    schema: serviceSchema(
      'Hosting Solutions',
      'Fast, secure VPS and cloud hosting billed in INR, with a 99.99% uptime SLA, free SSL, and 24/7 India-based support from Optimantix Global.',
      '/hosting'
    ),
  },
  '/free-seo-audit': {
    title: 'Free SEO Audit | Optimantix Global – Digital Marketing Agency',
    description: 'Get a free, manual SEO audit from Optimantix Global’s specialists and discover exactly why your website isn’t ranking on Google.',
    schema: serviceSchema(
      'Free SEO Audit',
      'Get a free, manual SEO audit from Optimantix Global’s specialists and discover exactly why your website isn’t ranking on Google.',
      '/free-seo-audit'
    ),
  },
  '/free-tools': {
    title: 'Free AEO Tools | Optimantix Global – Digital Marketing Agency',
    description: 'Free tools for AEO auditing, AI visibility checking, schema generation, and robots.txt validation — no signup required, from Optimantix Global.',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: 'Free AEO & AI Visibility Tools',
      description: 'Free tools for AEO auditing, AI visibility checking, schema generation, and robots.txt validation — no signup required, from Optimantix Global.',
      url: `${SITE_URL}/free-tools`,
    },
  },
  '/case': {
    title: 'Case Studies | Real Results & Success Stories | Optimantix Global',
    description: 'Explore authentic case studies showing how Optimantix Global delivers ROI through Google Ads, influencer marketing, SEO, and more.',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: 'Optimantix Global Case Studies',
      description: 'Explore authentic case studies showing how Optimantix Global delivers ROI through Google Ads, influencer marketing, SEO, and more.',
      url: `${SITE_URL}/case`,
    },
  },
  '/404': {
    title: 'Page Not Found | Optimantix Global',
    description: 'The page you are looking for does not exist. Return to Optimantix Global to explore our digital marketing services.',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: 'Page Not Found',
      description: 'The page you are looking for does not exist. Return to Optimantix Global to explore our digital marketing services.',
      url: `${SITE_URL}/404`,
    },
  },
};

// Truncate text to a maximum length without cutting mid-word where possible.
export function truncateDescription(text: string, maxLength = 155): string {
  const trimmed = text.trim();
  if (trimmed.length <= maxLength) return trimmed;
  return `${trimmed.slice(0, maxLength - 1).trimEnd()}…`;
}
