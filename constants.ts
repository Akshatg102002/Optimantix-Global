import { Service, BlogPost } from './types';

export const INITIAL_SERVICES: Service[] = [
  {
    id: '1',
    slug: 'digital-marketing',
    title: 'Digital Marketing',
    shortDescription: 'Boost your brand visibility with expert social media and ad strategies.',
    fullDescription: 'Our comprehensive digital marketing services are designed to skyrocket your online presence. We specialize in Social Media Management, targeted Lead Generation, and high-ROI Ads Management across platforms like Facebook, Instagram, and LinkedIn.',
    iconName: 'Megaphone',
    features: ['Social Media Strategy', 'PPC & Ads Management', 'SEO Optimization', 'Content Marketing'],
    pricing: 'Starting at $500/mo'
  },
  {
    id: '2',
    slug: 'marketplace-management',
    title: 'Marketplace Management',
    shortDescription: 'Dominate platforms like Nykaa and Meesho with optimized listings.',
    fullDescription: 'We take the hassle out of selling on major marketplaces. Our dedicated team manages your presence on platforms like Nykaa and Meesho, ensuring your products are listed correctly, optimized for search, and inventory is synchronized.',
    iconName: 'ShoppingBag',
    features: ['Account Setup', 'Listing Optimization', 'Inventory Sync', 'Performance Reporting'],
    pricing: 'Starting at $300/mo'
  },
  {
    id: '3',
    slug: 'development',
    title: 'Web & App Development',
    shortDescription: 'Custom software solutions tailored to your business needs.',
    fullDescription: 'From robust web applications to sleek mobile apps, our development team builds scalable solutions. We use modern tech stacks to ensure performance, security, and a seamless user experience.',
    iconName: 'Code',
    features: ['Custom Web Development', 'Mobile Apps', 'E-commerce Solutions', 'API Integration'],
    pricing: 'Custom Quote'
  },
  {
    id: '4',
    slug: 'graphic-design',
    title: 'Graphic Design',
    shortDescription: 'Captivating visuals including logos, packaging, and mockups.',
    fullDescription: 'Visual identity is everything. Our creative designers craft stunning Logos, Packaging Designs, and Product Mockups that tell your brand story and captivate your audience instantly.',
    iconName: 'Palette',
    features: ['Logo Design', 'Brand Identity', 'Packaging Design', 'Marketing Collateral'],
    pricing: 'Per Project Basis'
  },
  {
    id: '5',
    slug: 'hosting',
    title: 'Hosting Solutions',
    shortDescription: 'Reliable Dedicated, VPS, and Managed hosting services.',
    fullDescription: 'Keep your digital assets online 24/7 with our robust hosting solutions. Whether you need a simple Shared plan, a powerful VPS, or a Dedicated Server, we provide secure and high-performance environments.',
    iconName: 'Server',
    features: ['99.9% Uptime', 'SSL Certificates', 'Daily Backups', '24/7 Support'],
    pricing: 'Starting at $10/mo'
  },
  {
    id: '6',
    slug: 'communications',
    title: 'Communications',
    shortDescription: 'Effective Email and WhatsApp marketing campaigns.',
    fullDescription: 'Connect directly with your customers where they are. Our communication services cover strategic Email Marketing campaigns and personalized WhatsApp Marketing automation to drive engagement and sales.',
    iconName: 'MessageCircle',
    features: ['Email Automation', 'WhatsApp Business API', 'Campaign Analytics', 'Subscriber Management'],
    pricing: 'Starting at $200/mo'
  }
];

export const INITIAL_BLOGS: BlogPost[] = [
  {
    id: '1',
    title: 'Top 5 Digital Marketing Trends in 2024',
    slug: 'digital-marketing-trends-2024',
    excerpt: 'Discover the latest strategies that are shaping the future of online marketing.',
    content: 'Digital marketing is evolving rapidly. From AI-driven content creation to the rise of voice search optimization, staying ahead of the curve is crucial. In this post, we explore the top 5 trends...',
    author: 'Alex Morgan',
    date: '2023-10-15',
    imageUrl: 'https://picsum.photos/800/400'
  },
  {
    id: '2',
    title: 'Why Your Business Needs a Custom Website',
    slug: 'why-custom-website',
    excerpt: 'A template might be cheap, but a custom website is an investment in your brand.',
    content: 'In a crowded digital landscape, standing out is non-negotiable. Custom websites offer better performance, unique branding, and scalability that templates simply cannot match...',
    author: 'Sarah Jenkins',
    date: '2023-11-02',
    imageUrl: 'https://picsum.photos/800/401'
  }
];