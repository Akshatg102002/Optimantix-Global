export interface SubService {
  id: string;
  slug: string;

  // ─── Legacy fields (kept optional for backward compatibility) ───────────────
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

  // ─── Shared top-level fields ────────────────────────────────────────────────
  page_title?: string;

  banners?: {
    desktop: string;
    mobile: string;
  };

  seo?: {
    meta_title: string;
    meta_description: string;
    focus_keyphrase: string;
    secondary_keyphrases?: string[];
  };

  // ─── Hero ───────────────────────────────────────────────────────────────────
  hero_section?: {
    badge?: string;
    headline: string;
    lead_text: string;
    /** Trust strip pill items (e.g. Nykaa, Ecommerce pages) */
    trust_items?: string[];
    call_to_action_buttons?: {
      text: string;
      /** Chat sendPrompt trigger — marketplace pages */
      prompt?: string;
      /** Hard URL navigation — dev/non-chat pages */
      url?: string;
      type?: 'primary' | 'outline' | string;
    }[];
  };

  // ─── Intro Section (WordPress dev page) ─────────────────────────────────────
  intro_section?: {
    section_label: string;
    title: string;
    description: string;
    call_to_action_button?: {
      text: string;
      prompt?: string;
      url?: string;
      type?: 'primary' | 'outline' | string;
    };
  };

  // ─── Statistics ─────────────────────────────────────────────────────────────
  statistics_section?: {
    stats: { value: string; label: string }[];
  };

  // ─── Services grid ──────────────────────────────────────────────────────────
  services_section?: {
    section_label: string;
    title: string;
    description: string;
    services_grid: {
      title: string;
      description: string;
      /** Lucide icon slug (e.g. "search-optimization", "advertising") */
      icon?: string;
      /** Display number badge (e.g. "01") — ecommerce dev page */
      number?: string;
      /** Per-card sendPrompt trigger (e.g. Nykaa service cards) */
      prompt?: string;
      /** Category badge label (e.g. "Foundation", "Creative") — SMM page */
      badge?: string;
    }[];
  };

  // ─── Problem section (SMM page) ─────────────────────────────────────────────
  problem_section?: {
    section_label: string;
    title: string;
    description: string;
    problems_grid: {
      title: string;
      description: string;
    }[];
  };

  // ─── Who we serve (SMM page) ─────────────────────────────────────────────────
  who_we_serve_section?: {
    section_label: string;
    title: string;
    description: string;
    segments: {
      title: string;
      description: string;
      keyword?: string;
    }[];
  };

  // ─── Use cases (WhatsApp API page) ───────────────────────────────────────────
  use_cases_section?: {
    section_label: string;
    title: string;
    description: string;
    use_cases: {
      title: string;
      description: string;
      keyword?: string;
    }[];
  };

  // ─── ROI Calculator (Nykaa page) ─────────────────────────────────────────────
  roi_calculator_section?: {
    section_label: string;
    title: string;
    description: string;
    inputs: {
      id: string;
      label: string;
      min: number;
      max: number;
      step: number;
      default: number;
      unit?: string;
      display_id?: string;
    }[];
    outputs: {
      id: string;
      label: string;
      /** "primary" | "positive" | "default" */
      type?: string;
    }[];
    disclaimer?: string;
  };

  // ─── Timeline (Nykaa week-by-week results) ──────────────────────────────────
  timeline_section?: {
    section_label: string;
    title: string;
    description: string;
    items: {
      period: string;
      title: string;
      description: string;
    }[];
  };

  // ─── Comparison table (Nykaa DIY vs Generic vs Optimantix) ─────────────────
  comparison_section?: {
    section_label: string;
    title: string;
    description: string;
    columns: string[];
    rows: {
      feature: string;
      diy: { value: boolean; note: string };
      generic: { value: boolean; note: string };
      optimantix: { value: boolean; note: string };
    }[];
  };

  // ─── Platforms (SMM / ecommerce dev page) ───────────────────────────────────
  platforms_section?: {
    section_label: string;
    title: string;
    description: string;
    platforms: {
      /** Lucide icon slug or emoji */
      icon?: string;
      title: string;
      description: string;
    }[];
  };

  // ─── Process / How it works ──────────────────────────────────────────────────
  process_section?: {
    section_label: string;
    title: string;
    description: string;
    steps: {
      step_number: string;
      title: string;
      description: string;
      /** Timeline badge shown on dev page steps (e.g. "Week 1–2") */
      tag?: string;
    }[];
  };

  // ─── Why us ─────────────────────────────────────────────────────────────────
  why_us_section?: {
    section_label: string;
    title: string;
    description: string;
    /** Large hero metric (e.g. "98% on-time delivery") — ecommerce dev page */
    headline_metric?: {
      value: string;
      label: string;
      note?: string;
    };
    /** Small 2×2 metric grid — ecommerce dev page */
    mini_metrics?: {
      value: string;
      label: string;
    }[];
    features_grid: {
      title: string;
      description: string;
    }[];
  };

  // ─── Tech stack (ecommerce dev page) ────────────────────────────────────────
  tech_stack_section?: {
    section_label: string;
    title: string;
    description: string;
    technologies: {
      icon: string;
      name: string;
      description?: string;
    }[];
    capabilities?: string[];
  };

  // ─── Results / Case results (ecommerce dev page) ────────────────────────────
  results_section?: {
    section_label: string;
    title: string;
    description: string;
    case_results: {
      metric: string;
      title: string;
      description: string;
    }[];
    performance_benchmarks?: {
      label: string;
      target: string;
      /** Width percentage for the animated bar (0–100) */
      bar_percent: number;
    }[];
  };

  // ─── Statistics results (SMM proven results section) ────────────────────────
  statistics_results_section?: {
    section_label: string;
    title: string;
    description: string;
    stats: {
      value: string;
      label: string;
      description?: string;
    }[];
  };

  // ─── Testimonials ────────────────────────────────────────────────────────────
  testimonials_section?: {
    section_label: string;
    title: string;
    description?: string;
    testimonials: {
      quote: string;
      author: string;
      /** Avatar initials (e.g. "AV") — ecommerce dev page */
      initials?: string;
      /** Job title / company string (e.g. "Founder, GlowBotanica Skincare") */
      role?: string;
      location?: string;
      category?: string;
    }[];
  };

  // ─── FAQ ─────────────────────────────────────────────────────────────────────
  faq_section?: {
    section_label: string;
    title: string;
    description?: string;
    questions: {
      question: string;
      answer: string;
      links?: { text: string; url: string }[];
    }[];
  };

  // ─── Bottom CTA ──────────────────────────────────────────────────────────────
  bottom_cta_section?: {
    title: string;
    description: string;
    /** Small disclaimer line below buttons (ecommerce dev page) */
    sub_note?: string;
    call_to_action_button: {
      text: string;
      prompt?: string;
      url?: string;
      type?: 'primary' | 'outline' | string;
    };
    /** Second button (ecommerce dev page — "All Dev Services") */
    secondary_button?: {
      text: string;
      prompt?: string;
      url?: string;
      type?: 'primary' | 'outline' | string;
    };
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
