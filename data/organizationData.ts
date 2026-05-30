import {
  createOrganization,
  createPostalAddress,
  createContactPoint,
  createImageObject,
} from '../utils/schemaGenerator';
import type { Organization, LocalBusiness } from '../types/schema';

// Comprehensive Organization Data for Optimantix Global
// All fields aligned with Schema.org and Google guidelines

export const ORGANIZATION_NAME = 'Optimantix Global';
export const ORGANIZATION_URL = 'https://optimantix.com';
export const ORGANIZATION_EMAIL = 'contact@optimantix.com';
export const ORGANIZATION_PHONE = '+91-9910343016';
export const ORGANIZATION_TIMEZONE = 'IST';

// Logo configuration with proper dimensions
export const ORGANIZATION_LOGO = {
  url: 'https://res.cloudinary.com/dusvykklu/image/upload/v1779950090/opti_cvkbla.png',
  width: 200,
  height: 200,
};

// Logo alternate format
export const ORGANIZATION_LOGO_ALT = 'https://i.ibb.co/FkFfTxxC/opti.png';

// Office locations with proper postal addresses
export const OFFICE_LOCATIONS = {
  headquarters: {
    name: 'Optimantix Global Headquarters',
    address: createPostalAddress(
      'Noida, Uttar Pradesh',
      'Noida',
      'Uttar Pradesh',
      '201301',
      'IN'
    ),
    phoneLocal: '+91-9910343016',
    email: 'contact@optimantix.com',
    latitude: 28.5355,
    longitude: 77.3910,
  },
};

// Contact points for different purposes
export const CONTACT_POINTS = [
  createContactPoint(
    'Customer Service',
    '+91-9910343016',
    ['IN', 'Global'],
    'contact@optimantix.com'
  ),
  createContactPoint(
    'Sales',
    '+91-9910343016',
    ['IN'],
    'sales@optimantix.com'
  ),
  createContactPoint(
    'Support',
    '+91-9910343016',
    ['IN'],
    'support@optimantix.com'
  ),
];

// Social media profiles (in order of importance for SEO)
export const SOCIAL_PROFILES = [
  'https://www.facebook.com/optimantix',
  'https://www.instagram.com/optimantix',
  'https://in.linkedin.com/company/optimantix',
  'https://in.pinterest.com/OptimantiXglobal1',
  'https://www.twitter.com/optimantix', // Add if exists
];

// Service areas
export const SERVICE_AREAS = [
  'India',
  'United States',
  'United Kingdom',
  'Canada',
  'Australia',
  'Dubai',
  'Global',
];

// Organization description for schema
export const ORGANIZATION_DESCRIPTION =
  'Optimantix Global is a premier digital marketing, web development, and performance scaling agency. ' +
  'Transform your digital presence with expert SEO, Google Ads, Meta Ads, E-commerce, and Web Development services. ' +
  'Trusted by 100s of brands with 10+ years of proven results.';

// Alternative descriptions for different contexts
export const ORGANIZATION_DESCRIPTIONS = {
  short:
    'Digital marketing, web development & performance scaling agency in Noida.',
  long: ORGANIZATION_DESCRIPTION,
  services:
    'Expert in SEO, Google Ads, Meta Ads, Marketplace Management, Web Development, Hosting Solutions, and Performance Scaling.',
  about:
    'We empower businesses through data-driven digital strategies and cutting-edge technology.',
};

// Key expertise areas
export const EXPERTISE_AREAS = [
  'Search Engine Optimization',
  'Google Ads Management',
  'Meta Ads Management',
  'E-commerce Management',
  'Web Development',
  'Web Design',
  'Performance Scaling',
  'Marketplace Management',
  'Email Marketing',
  'Content Marketing',
  'Social Media Marketing',
  'Hosting Solutions',
];

// Team/Employee size (for organization schema)
export const ORGANIZATION_EMPLOYEE_COUNT = 50; // Approximate

// Founding information
export const ORGANIZATION_FOUNDING_DATE = '2010-01-01'; // Adjust to actual founding date

// Services offered (main services for schema)
export const MAIN_SERVICES = [
  {
    name: 'Digital Marketing Services',
    description: 'Comprehensive digital marketing including SEO, PPC, SMM, and Content Marketing',
  },
  {
    name: 'Web Development',
    description: 'Custom web development, e-commerce solutions, and performance optimization',
  },
  {
    name: 'Web Design',
    description: 'Modern, responsive web design with conversion optimization',
  },
  {
    name: 'E-commerce Solutions',
    description: 'End-to-end e-commerce setup, optimization, and management',
  },
  {
    name: 'Hosting Solutions',
    description: 'Reliable hosting, server management, and infrastructure setup',
  },
];

// Generate complete Organization schema
export const ORGANIZATION_SCHEMA: Organization = createOrganization({
  name: ORGANIZATION_NAME,
  url: ORGANIZATION_URL,
  logo: createImageObject(
    ORGANIZATION_LOGO.url,
    ORGANIZATION_LOGO.width,
    ORGANIZATION_LOGO.height,
    'Optimantix Global Logo'
  ),
  description: ORGANIZATION_DESCRIPTION,
  email: ORGANIZATION_EMAIL,
  telephone: ORGANIZATION_PHONE,
  address: OFFICE_LOCATIONS.headquarters.address,
  sameAs: SOCIAL_PROFILES,
  contactPoints: CONTACT_POINTS,
  foundingDate: ORGANIZATION_FOUNDING_DATE,
  areaServed: SERVICE_AREAS,
});

// Extended schema with @graph for multiple entities
export const ORGANIZATION_EXTENDED_SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    ORGANIZATION_SCHEMA,
    {
      '@type': 'LocalBusiness',
      name: ORGANIZATION_NAME,
      url: ORGANIZATION_URL,
      address: OFFICE_LOCATIONS.headquarters.address,
      telephone: ORGANIZATION_PHONE,
      email: ORGANIZATION_EMAIL,
      image: ORGANIZATION_LOGO.url,
      description: ORGANIZATION_DESCRIPTION,
      areaServed: SERVICE_AREAS,
      sameAs: SOCIAL_PROFILES,
      geo: {
        '@type': 'GeoCoordinates',
        latitude: OFFICE_LOCATIONS.headquarters.latitude,
        longitude: OFFICE_LOCATIONS.headquarters.longitude,
      },
    },
  ],
};

// Export for use in components
export const organizationConfig = {
  name: ORGANIZATION_NAME,
  url: ORGANIZATION_URL,
  email: ORGANIZATION_EMAIL,
  phone: ORGANIZATION_PHONE,
  logo: ORGANIZATION_LOGO,
  logoAlt: ORGANIZATION_LOGO_ALT,
  description: ORGANIZATION_DESCRIPTION,
  descriptionShort: ORGANIZATION_DESCRIPTIONS.short,
  serviceAreas: SERVICE_AREAS,
  socialProfiles: SOCIAL_PROFILES,
  contactPoints: CONTACT_POINTS,
  locations: OFFICE_LOCATIONS,
  expertise: EXPERTISE_AREAS,
  schema: ORGANIZATION_SCHEMA,
  extendedSchema: ORGANIZATION_EXTENDED_SCHEMA,
};
