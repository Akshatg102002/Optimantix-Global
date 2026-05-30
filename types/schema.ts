// JSON-LD Schema Type Definitions
// Reference: https://schema.org/

export interface ImageObject {
  '@type': 'ImageObject';
  url: string;
  width?: number | string;
  height?: number | string;
  caption?: string;
  description?: string;
}

export interface PostalAddress {
  '@type': 'PostalAddress';
  streetAddress: string;
  addressLocality: string;
  addressRegion: string;
  postalCode: string;
  addressCountry: string;
}

export interface ContactPoint {
  '@type': 'ContactPoint';
  contactType: string;
  telephone: string;
  areaServed?: string[];
  availableLanguage?: string[];
  email?: string;
}

export interface Person {
  '@type': 'Person';
  name: string;
  url?: string;
  sameAs?: string[];
  image?: string;
  jobTitle?: string;
  description?: string;
}

export interface Organization {
  '@context': 'https://schema.org';
  '@type': 'Organization';
  name: string;
  url: string;
  logo?: ImageObject | string;
  description?: string;
  email?: string;
  telephone?: string;
  faxNumber?: string;
  address?: PostalAddress | PostalAddress[];
  sameAs?: string[];
  contactPoint?: ContactPoint | ContactPoint[];
  foundingDate?: string;
  areaServed?: string | string[];
  knowsAbout?: string[];
  makesOffer?: Service[];
  employee?: Person[];
}

export interface Service {
  '@type': 'Service';
  name: string;
  description: string;
  url?: string;
  image?: ImageObject | string;
  provider?: Organization;
  areaServed?: string | string[];
  hasOfferCatalog?: {
    '@type': 'OfferCatalog';
    name: string;
    itemListElement?: Service[];
  };
}

export interface WebSite {
  '@context': 'https://schema.org';
  '@type': 'WebSite';
  name: string;
  url: string;
  description?: string;
  image?: ImageObject | string;
  potentialAction?: {
    '@type': 'SearchAction';
    target: {
      '@type': 'EntryPoint';
      urlTemplate: string;
    };
    query?: string;
  };
}

export interface WebPage {
  '@context': 'https://schema.org';
  '@type': 'WebPage' | 'Article' | 'NewsArticle' | 'BlogPosting';
  url: string;
  name: string;
  headline?: string;
  description: string;
  image?: ImageObject | string;
  datePublished?: string;
  dateModified?: string;
  author?: Person | Organization;
  publisher?: Organization;
  inLanguage?: string;
  isPartOf?: WebSite;
  mainEntity?: any;
}

export interface BreadcrumbItem {
  '@type': 'ListItem';
  position: number;
  name: string;
  item?: string;
}

export interface BreadcrumbList {
  '@context': 'https://schema.org';
  '@type': 'BreadcrumbList';
  itemListElement: BreadcrumbItem[];
}

export interface Question {
  '@type': 'Question';
  name: string;
  acceptedAnswer: {
    '@type': 'Answer';
    text: string;
  };
}

export interface FAQPage {
  '@context': 'https://schema.org';
  '@type': 'FAQPage';
  mainEntity: Question[];
}

export interface BlogPosting {
  '@context': 'https://schema.org';
  '@type': 'BlogPosting';
  headline: string;
  description: string;
  image: ImageObject | string;
  datePublished: string;
  dateModified: string;
  author: Person | Person[];
  publisher: Organization;
  inLanguage: string;
  isPartOf?: WebSite;
  mainEntity?: any;
}

export interface AggregateOffer {
  '@type': 'AggregateOffer';
  priceCurrency: string;
  lowPrice?: string;
  highPrice?: string;
  offerCount?: number;
  ratingValue?: number;
  reviewCount?: number;
  availability?: string;
}

export interface AggregateRating {
  '@type': 'AggregateRating';
  ratingValue: number;
  reviewCount: number;
  bestRating?: number;
  worstRating?: number;
}

export interface LocalBusiness {
  '@context': 'https://schema.org';
  '@type': 'LocalBusiness' | 'ProfessionalService';
  name: string;
  url: string;
  address: PostalAddress;
  telephone: string;
  email?: string;
  image?: ImageObject | string;
  description?: string;
  geo?: {
    '@type': 'GeoCoordinates';
    latitude: number;
    longitude: number;
  };
  priceRange?: string;
  areaServed?: string[];
  sameAs?: string[];
  aggregateRating?: AggregateRating;
}

export interface ContactPage {
  '@context': 'https://schema.org';
  '@type': 'ContactPage';
  url: string;
  name: string;
  description: string;
  mainEntity: Organization;
}

export interface AboutPage {
  '@context': 'https://schema.org';
  '@type': 'AboutPage';
  url: string;
  name: string;
  description: string;
  mainEntity: Organization;
}
