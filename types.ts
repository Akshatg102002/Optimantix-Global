
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
}

export interface Project {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
  projectUrl?: string;
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
