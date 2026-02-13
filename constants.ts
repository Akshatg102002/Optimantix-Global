import { Service, BlogPost } from './types';
import { Users, Trophy, Globe, Zap, BarChart, Smartphone, PenTool, ShoppingBag } from 'lucide-react';

export const INITIAL_SERVICES: Service[] = [
  {
    id: '1',
    slug: 'digital-marketing',
    title: 'Digital Marketing',
    shortDescription: 'SEO, SMM, and PPC strategies to increase visibility and traffic.',
    fullDescription: 'Our comprehensive digital marketing strategies are designed to increase online visibility, drive qualified traffic, and convert visitors into customers through data-driven campaigns. We specialize in Technical SEO audits, Social Media Strategy across major platforms, and high-ROI PPC campaigns on Google and Meta Ads.',
    iconName: 'Megaphone',
    features: ['Technical SEO & Audits', 'Social Media Strategy', 'PPC & Ads Management', 'Content Marketing', 'Local SEO'],
    pricing: 'Starting at ₹40,000/mo'
  },
  {
    id: '2',
    slug: 'marketplace-management',
    title: 'Marketplace Management',
    shortDescription: 'Expert management for Amazon, Flipkart, Nykaa & Meesho.',
    fullDescription: 'Expert management of e-commerce marketplaces including Amazon, Flipkart, Nykaa, and Meesho. Services include listing optimization, inventory management, pricing strategies, and performance analytics to maximize sales and brand visibility.',
    iconName: 'ShoppingBag',
    features: ['Account Setup & Optimization', 'Inventory Sync', 'Pricing Strategies', 'Performance Reporting', 'A+ Content'],
    pricing: 'Starting at ₹25,000/mo'
  },
  {
    id: '3',
    slug: 'development',
    title: 'Web & App Development',
    shortDescription: 'Custom websites and mobile apps tailored to your business.',
    fullDescription: 'Custom website design and development services that create responsive, user-friendly, and conversion-optimized websites. We also offer native and cross-platform mobile application development for iOS and Android devices, delivering seamless user experiences.',
    iconName: 'Code',
    features: ['Custom Web Development', 'iOS & Android Apps', 'E-commerce Solutions', 'API Integration', 'Responsive Design'],
    pricing: 'Custom Quote'
  },
  {
    id: '4',
    slug: 'graphic-design',
    title: 'Branding & Creative',
    shortDescription: 'Logo design, packaging, and visual identity solutions.',
    fullDescription: 'Complete branding solutions including logo design, brand identity development, creative content creation, and visual communication strategies that resonate with target audiences. From packaging to product mockups, we make your brand stand out.',
    iconName: 'Palette',
    features: ['Logo Design', 'Brand Identity', 'Packaging Design', 'Product Mockups', 'Visual Communication'],
    pricing: 'Per Project Basis'
  },
  {
    id: '5',
    slug: 'hosting',
    title: 'Hosting Solutions',
    shortDescription: 'Reliable Dedicated, VPS, and Managed hosting services.',
    fullDescription: 'Keep your digital assets online 24/7 with our robust hosting solutions. Whether you need a simple Shared plan, a powerful VPS, or a Dedicated Server, we provide secure and high-performance environments tailored to your traffic needs.',
    iconName: 'Server',
    features: ['99.9% Uptime', 'SSL Certificates', 'Daily Backups', '24/7 Support', 'Dedicated & VPS'],
    pricing: 'Starting at ₹999/mo'
  },
  {
    id: '6',
    slug: 'communications',
    title: 'Communications',
    shortDescription: 'Effective Email and WhatsApp marketing campaigns.',
    fullDescription: 'Connect directly with your customers where they are. Our communication services cover strategic Email Marketing campaigns and personalized WhatsApp Marketing automation to drive engagement, retention, and sales.',
    iconName: 'MessageCircle',
    features: ['Email Automation', 'WhatsApp Business API', 'Campaign Analytics', 'Subscriber Management', 'Drip Campaigns'],
    pricing: 'Starting at ₹15,000/mo'
  }
];

export const INITIAL_BLOGS: BlogPost[] = [
  {
    id: '1',
    title: 'Top 5 Digital Marketing Trends in 2024',
    slug: 'digital-marketing-trends-2024',
    excerpt: 'Discover the latest strategies that are shaping the future of online marketing.',
    content: 'Digital marketing is evolving rapidly. From AI-driven content creation to the rise of voice search optimization, staying ahead of the curve is crucial. In this post, we explore the top 5 trends including hyper-personalization, video dominance, and privacy-first marketing...',
    author: 'Alex Morgan',
    date: '2024-01-15',
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '2',
    title: 'Why Your Business Needs a Custom Website',
    slug: 'why-custom-website',
    excerpt: 'A template might be cheap, but a custom website is an investment in your brand.',
    content: 'In a crowded digital landscape, standing out is non-negotiable. Custom websites offer better performance, unique branding, and scalability that templates simply cannot match. Learn how a custom solution can improve your SEO and conversion rates...',
    author: 'Sarah Jenkins',
    date: '2024-02-02',
    imageUrl: 'https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&q=80&w=800'
  }
];

export const TESTIMONIALS = [
  {
    name: "Rohit Mehra",
    role: "Founder, Trendify Clothing",
    content: "Optimantix Global has completely transformed our online presence. Their SEO and performance marketing strategies boosted our website traffic by 3x within months. We now generate consistent leads and sales from digital campaigns that actually deliver.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150"
  },
  {
    name: "Ankita Sharma",
    role: "Marketing Head, HealthPlus Naturals",
    content: "The team at Optimantix is highly professional and results-driven. From social media marketing to marketplace management, they handled everything seamlessly. Our brand visibility has improved massively across Amazon and Flipkart.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=150"
  },
  {
    name: "Karan Patel",
    role: "Director, RealEdge Properties",
    content: "We partnered with Optimantix for digital marketing, and the results were outstanding. Their performance marketing campaigns gave us qualified real estate leads at the lowest cost compared to other agencies we tried. Highly recommend their expertise!",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150"
  }
];

export const STATS = [
  { label: 'Lead Growth', value: '90%', icon: BarChart },
  { label: 'Traffic Growth', value: '167%', icon: Zap },
  { label: 'Client Retention', value: 'High', icon: Users },
  { label: 'Industries Served', value: '10+', icon: Globe },
];

export const WORK_PROCESS = [
  {
    title: 'Research & Strategy',
    description: 'We conduct comprehensive research on client goals, target audience, and industry landscape to develop data-driven strategies.'
  },
  {
    title: 'Planning & Design',
    description: 'Creation of detailed roadmaps, design mockups, and content strategies that align with brand identity and business goals.'
  },
  {
    title: 'Execution & Launch',
    description: 'Development and deployment of campaigns, websites, or digital platforms with seamless implementation and QA.'
  },
  {
    title: 'Optimization & Growth',
    description: 'Continuous performance tracking, data analysis, and strategic optimization to improve results and maximize ROI.'
  }
];

export const INDUSTRIES = [
  "E-commerce & Retail",
  "Healthcare & Wellness",
  "Education & EdTech",
  "Real Estate",
  "Technology & SaaS",
  "Fashion & Lifestyle"
];