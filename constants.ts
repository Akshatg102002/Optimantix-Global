
import { Service, BlogPost, Project } from './types';
import { Users, Trophy, Globe, Zap, BarChart } from 'lucide-react';

export const INITIAL_SERVICES: Service[] = [
  {
    id: '1',
    slug: 'digital-marketing',
    title: 'Digital Marketing',
    shortDescription: 'Data-driven SEO, SMM, and PPC strategies to maximize ROI.',
    fullDescription: 'Our comprehensive digital marketing framework is designed to dominate search results and social feeds. We do not just run ads; we build funnels that convert cold traffic into loyal customers using advanced analytics and A/B testing.',
    iconName: 'Megaphone',
    features: ['Technical SEO & Audits', 'Social Media Strategy', 'PPC & Ads Management', 'Content Marketing', 'Local SEO'],
    processSteps: [
      { title: 'Audit & Analysis', description: 'We perform a deep-dive audit of your current digital presence, identifying gaps and opportunities.' },
      { title: 'Strategy Development', description: 'Creating a tailored roadmap focusing on KPIs that matter to your business growth.' },
      { title: 'Campaign Execution', description: 'Launching targeted campaigns across Google, Meta, and LinkedIn with continuous monitoring.' },
      { title: 'Optimization & Scaling', description: 'Using data to refine targeting and creative assets to lower CPA and increase ROAS.' }
    ],
    benefits: ['Increased Organic Traffic', 'Higher Conversion Rates', 'Improved Brand Visibility', 'Measurable ROI'],
    deliverables: ['Monthly Performance Reports', 'Competitor Analysis', 'Content Calendar', 'Optimized Ad Campaigns']
  },
  {
    id: '2',
    slug: 'marketplace-management',
    title: 'Marketplace Management',
    shortDescription: 'Scale your brand on Amazon, Flipkart, Nykaa & Meesho.',
    fullDescription: 'Navigating e-commerce marketplaces is complex. We handle everything from account health to advertising (AMS/PLA). Our team ensures your products rank high and win the Buy Box consistently.',
    iconName: 'ShoppingBag',
    features: ['Account Setup & Optimization', 'Inventory Sync', 'Pricing Strategies', 'Performance Reporting', 'A+ Content'],
    processSteps: [
      { title: 'Listing Optimization', description: 'Keyword research and copywriting to ensure your products appear in search results.' },
      { title: 'A+ Content Design', description: 'Designing premium visual content to enhance brand storytelling and conversion.' },
      { title: 'Ads Management', description: 'Managing PPC campaigns within the marketplace ecosystem to drive sales velocity.' },
      { title: 'Inventory Planning', description: 'Forecasting demand to prevent stockouts and minimize storage fees.' }
    ],
    benefits: ['Win the Buy Box', 'Lower ACOS', 'Protected Brand Identity', 'Streamlined Operations'],
    deliverables: ['Listing Quality Audit', 'Sales & Inventory Reports', 'PPC Campaign Strategy', 'Customer Feedback Analysis']
  },
  {
    id: '3',
    slug: 'development',
    title: 'Web & App Development',
    shortDescription: 'High-performance websites and scalable mobile applications.',
    fullDescription: 'We build digital products that are fast, secure, and scalable. Whether it is a corporate website, an e-commerce store, or a custom mobile app, our code is clean and our designs are user-centric.',
    iconName: 'Code',
    features: ['Custom Web Development', 'iOS & Android Apps', 'E-commerce Solutions', 'API Integration', 'Responsive Design'],
    processSteps: [
      { title: 'Discovery & UX', description: 'Wireframing and prototyping to ensure the user journey is intuitive.' },
      { title: 'Development', description: 'Agile development using modern stacks like React, Node.js, and Flutter.' },
      { title: 'Testing (QA)', description: 'Rigorous testing for bugs, security vulnerabilities, and performance bottlenecks.' },
      { title: 'Deployment & Support', description: 'Seamless launch and ongoing maintenance to ensure 99.9% uptime.' }
    ],
    benefits: ['Faster Load Times', 'Mobile-First Experience', 'Scalable Architecture', 'SEO-Friendly Structure'],
    deliverables: ['Source Code', 'Design Assets (Figma)', 'Documentation', '1 Month Free Support']
  },
  {
    id: '4',
    slug: 'graphic-design',
    title: 'Branding & Creative',
    shortDescription: 'Visual storytelling that defines your brand identity.',
    fullDescription: 'Your brand is more than a logo. We create cohesive visual identities that communicate your values and resonate with your audience across all touchpoints, from packaging to digital assets.',
    iconName: 'Palette',
    features: ['Logo Design', 'Brand Identity', 'Packaging Design', 'Product Mockups', 'Visual Communication'],
    processSteps: [
      { title: 'Brand Discovery', description: 'Understanding your ethos, target audience, and market positioning.' },
      { title: 'Concept Creation', description: 'Developing multiple design directions and mood boards.' },
      { title: 'Refinement', description: 'Iterating on the chosen direction based on your feedback.' },
      { title: 'Brand Guidelines', description: 'Creating a rulebook for usage to ensure consistency.' }
    ],
    benefits: ['Consistent Brand Image', 'Professional Appeal', 'Emotional Connection', 'Market Differentiation'],
    deliverables: ['Logo Pack (All Formats)', 'Brand Style Guide', 'Social Media Kit', 'Stationery Design']
  },
  {
    id: '5',
    slug: 'hosting',
    title: 'Hosting Solutions',
    shortDescription: 'Secure, high-speed hosting for mission-critical applications.',
    fullDescription: 'Downtime is lost revenue. Our hosting solutions are built on enterprise-grade infrastructure, offering speed, security, and automated backups so you never have to worry about your site going down.',
    iconName: 'Server',
    features: ['99.9% Uptime', 'SSL Certificates', 'Daily Backups', '24/7 Support', 'Dedicated & VPS'],
    processSteps: [
      { title: 'Needs Assessment', description: 'Evaluating your traffic and resource requirements.' },
      { title: 'Migration', description: 'Zero-downtime migration of your existing assets to our servers.' },
      { title: 'Security Hardening', description: 'Configuring firewalls and malware scanning.' },
      { title: 'Monitoring', description: '24/7 proactive monitoring to prevent issues before they happen.' }
    ],
    benefits: ['Lightning Fast Speed', 'Bank-Grade Security', 'Automated Backups', 'Scalable Resources'],
    deliverables: ['cPanel/Admin Access', 'SSL Certificate', 'Daily Backup Schedule', 'Quarterly Health Check']
  },
  {
    id: '6',
    slug: 'communications',
    title: 'Communications',
    shortDescription: 'Automated Email and WhatsApp marketing for higher retention.',
    fullDescription: 'Engage your customers where they are. We set up automated workflows for Email and WhatsApp API to nurture leads, recover abandoned carts, and drive repeat purchases.',
    iconName: 'MessageCircle',
    features: ['Email Automation', 'WhatsApp Business API', 'Campaign Analytics', 'Subscriber Management', 'Drip Campaigns'],
    processSteps: [
      { title: 'Audience Segmentation', description: 'Categorizing your list based on behavior and demographics.' },
      { title: 'Copywriting & Design', description: 'Crafting high-converting messages and templates.' },
      { title: 'Automation Setup', description: 'Building triggers and workflows for drip campaigns.' },
      { title: 'Analysis', description: 'Tracking open rates, click rates, and conversions to optimize.' }
    ],
    benefits: ['High Open Rates', 'Personalized Customer Journey', 'Increased LTV', 'Reduced Churn'],
    deliverables: ['Campaign Strategy Doc', 'Email/WhatsApp Templates', 'Automation Workflows', 'Performance Reports']
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

export const INITIAL_PROJECTS: Project[] = [
    {
        id: '1',
        title: 'E-Commerce Redesign',
        category: 'Development',
        imageUrl: 'https://images.unsplash.com/photo-1661956602116-aa6865609028?auto=format&fit=crop&q=80&w=800',
        projectUrl: '#'
    },
    {
        id: '2',
        title: 'TechBrand SEO Campaign',
        category: 'Marketing',
        imageUrl: 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?auto=format&fit=crop&q=80&w=800',
        projectUrl: '#'
    },
    {
        id: '3',
        title: 'Modern Brand Identity',
        category: 'Design',
        imageUrl: 'https://images.unsplash.com/photo-1600607686527-6fb886090705?auto=format&fit=crop&q=80&w=800',
        projectUrl: '#'
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
