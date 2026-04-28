
export interface SubService {
  id: string;
  slug: string;
  
  // Legacy fields (keeping them optional for backward compatibility until user updates all)
  title?: string;
  shortDescription?: string;
  fullDescription?: string;
  features?: string[];
  benefits?: string[];
  phases?: { title: string; description: string }[];
  stats?: { label: string; value: string; desc: string }[];
  metaTitle?: string;
  metaDescription?: string;
  tags?: string[];

  // New JSON Structure Fields
  page_title?: string;
  hero_section?: {
    badge: string;
    headline: string;
    lead_text: string;
    call_to_action_buttons: { text: string; prompt: string }[];
  };
  statistics_section?: {
    stats: { value: string; label: string }[];
  };
  services_section?: {
    section_label: string;
    title: string;
    description: string;
    services_grid: { title: string; description: string }[];
  };
  process_section?: {
    section_label: string;
    title: string;
    description: string;
    steps: { step_number: string; title: string; description: string }[];
  };
  why_us_section?: {
    section_label: string;
    title: string;
    description: string;
    features_grid: { title: string; description: string }[];
  };
  testimonials_section?: {
    section_label: string;
    title: string;
    testimonials: { quote: string; author: string }[];
  };
  faq_section?: {
    section_label: string;
    title: string;
    questions: { question: string; answer: string }[];
  };
  bottom_cta_section?: {
    title: string;
    description: string;
    call_to_action_button: { text: string; prompt: string };
  };
}

export interface Service {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  iconName: string; // Lucide icon name
  features: string[];
  // New detailed fields
  processSteps: { title: string; description: string }[];
  benefits: string[];
  deliverables: string[];
  subServices?: SubService[];
  // SEO
  metaTitle?: string;
  metaDescription?: string;
  tags?: string[];
}

export interface BlogCategory {
  id: string;
  name: string;
  slug: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  imageUrl: string;
  // New fields
  categoryId?: string;
  metaTitle?: string;
  metaDescription?: string;
  tags?: string[];
  isPublished?: boolean;
}

export interface Project {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
  projectUrl?: string;
  // SEO
  metaTitle?: string;
  metaDescription?: string;
  tags?: string[];
}

export interface CaseStudy {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  imageUrl: string;
  serviceId?: string;
  subServiceId?: string;
  metaTitle?: string;
  metaDescription?: string;
  tags?: string[];
  date: string;
}

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  company?: string;
  serviceInterest: string;
  message: string;
  status: 'New' | 'Contacted' | 'Closed';
  date: string;
}

export type IconName = 'Megaphone' | 'ShoppingBag' | 'Code' | 'Palette' | 'Server' | 'MessageCircle';
