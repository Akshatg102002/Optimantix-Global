
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
    deliverables: ['Monthly Performance Reports', 'Competitor Analysis', 'Content Calendar', 'Optimized Ad Campaigns'],
    subServices: [
        {
            id: 'dm-1',
            slug: 'seo',
            title: 'Search Engine Optimization (SEO)',
            shortDescription: 'Rank higher on Google with white-hat SEO strategies.',
            fullDescription: 'Our SEO services are designed to increase visibility within the algorithmic ("natural", "organic", or "free") search results to deliver high quality, targeted traffic to your website. We focus on On-page, Off-page, and Technical SEO to build long-term authority.',
            features: ['Keyword Research', 'On-Page Optimization', 'Backlink Building', 'Technical Audit'],
            benefits: ['Long-term traffic growth', 'Lower cost per acquisition', 'Increased brand credibility'],
            phases: [
                { title: 'Technical Audit', description: 'We fix crawling errors, broken links, and speed issues to build a solid foundation.' },
                { title: 'Keyword Strategy', description: 'Identifying high-intent keywords that your competitors are missing.' },
                { title: 'Content Optimization', description: 'Enhancing existing pages and creating new, value-rich content.' },
                { title: 'Authority Building', description: 'Acquiring high-quality backlinks to boost domain authority and rankings.' }
            ],
            stats: [
                { label: 'Traffic Increase', value: '150%', desc: 'Average growth in 6 months' },
                { label: 'Page 1 Rankings', value: '35+', desc: 'Keywords ranked on top' }
            ]
        },
        {
            id: 'dm-2',
            slug: 'ppc',
            title: 'Pay-Per-Click (PPC)',
            shortDescription: 'Instant traffic and leads via Google & Meta Ads.',
            fullDescription: 'We manage your PPC campaigns to ensure you get the most out of your budget. Our certified experts create targeted ad campaigns on Google Ads, Facebook, and LinkedIn that drive immediate results.',
            features: ['Campaign Setup', 'Ad Copywriting', 'Bid Management', 'A/B Testing'],
            benefits: ['Immediate visibility', 'Precise targeting', 'Measurable ROI'],
            phases: [
                { title: 'Account Setup', description: 'Structuring campaigns, ad groups, and keywords for maximum quality score.' },
                { title: 'Creative Design', description: 'Designing high-converting ad creatives and compelling copy.' },
                { title: 'Bid Management', description: 'Daily monitoring and adjustment of bids to optimize CPA.' },
                { title: 'Scaling', description: 'Increasing budget on winning campaigns to maximize volume.' }
            ],
            stats: [
                { label: 'ROAS', value: '4.5x', desc: 'Return on Ad Spend' },
                { label: 'Lead Cost', value: '-30%', desc: 'Reduction in CPL' }
            ]
        },
        {
            id: 'dm-3',
            slug: 'smm',
            title: 'Social Media Marketing',
            shortDescription: 'Engage your audience on Instagram, LinkedIn & Twitter.',
            fullDescription: 'Build a community around your brand. We create engaging content and manage your social media profiles to increase brand awareness and customer loyalty.',
            features: ['Content Creation', 'Community Management', 'Influencer Marketing', 'Analytics Reporting'],
            benefits: ['Direct customer engagement', 'Brand loyalty', 'Viral potential'],
            phases: [
                { title: 'Brand Persona', description: 'Defining your brand voice and visual style.' },
                { title: 'Content Calendar', description: 'Planning a mix of educational, entertaining, and promotional content.' },
                { title: 'Engagement', description: 'Actively responding to comments and messages to build community.' },
                { title: 'Analytics', description: 'Monthly reporting on reach, engagement, and follower growth.' }
            ],
            stats: [
                { label: 'Engagement', value: '3x', desc: 'Higher interaction rate' },
                { label: 'Reach', value: '1M+', desc: 'Monthly impressions managed' }
            ]
        }
    ]
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
    deliverables: ['Listing Quality Audit', 'Sales & Inventory Reports', 'PPC Campaign Strategy', 'Customer Feedback Analysis'],
    subServices: [
        {
            id: 'mm-1',
            slug: 'amazon',
            title: 'Amazon Management',
            shortDescription: 'End-to-end Seller Central & AMS management.',
            fullDescription: 'Dominate the world’s largest marketplace. We handle Amazon SEO, A+ Content (EBC), Storefront design, and PPC (Sponsored Products, Brands, Display) to maximize your sales on Amazon.',
            features: ['Seller Central Management', 'Amazon Advertising (AMS)', 'FBA Consultation', 'Brand Registry'],
            benefits: ['Global Reach', 'Prime eligibility consulting', 'Optimized ad spend'],
            phases: [
                { title: 'Audit & Compliance', description: 'Ensuring your listings meet Amazon guidelines and fixing suppression issues.' },
                { title: 'SEO & Content', description: 'Optimizing titles, bullets, and A+ content for high search ranking.' },
                { title: 'PPC Launch', description: 'Running aggressive Sponsored Product campaigns to boost ranking.' },
                { title: 'Brand Defense', description: 'Protecting your brand keywords and winning the Buy Box.' }
            ],
            stats: [
                { label: 'Sales Growth', value: '200%', desc: 'Year-over-Year growth' },
                { label: 'ACOS', value: '15%', desc: 'Targeted Advertising Cost' }
            ]
        },
        {
            id: 'mm-2',
            slug: 'flipkart',
            title: 'Flipkart Management',
            shortDescription: 'Grow your sales on India’s homegrown marketplace.',
            fullDescription: 'Expert management for Flipkart Sellers. From cataloging to Flipkart Ads (PLA/PCA), we help you capture the Indian market effectively.',
            features: ['Cataloging', 'Flipkart Ads', 'Smart Fulfillment', 'Promotions Participation'],
            benefits: ['Access to Indian tier-2/3 cities', 'Big Billion Days strategy', 'Account Health Management'],
            phases: [
                { title: 'Cataloging', description: 'Creating high-quality listings with detailed specifications.' },
                { title: 'Stock Management', description: 'Advising on Flipkart Smart Fulfillment for faster delivery badges.' },
                { title: 'PLA Campaigns', description: 'Managing Product Listing Ads to gain top visibility.' },
                { title: 'Event Planning', description: 'Strategizing for Big Billion Days and other mega sales.' }
            ],
            stats: [
                { label: 'Visibility', value: 'Top 3', desc: 'Rankings for primary keywords' },
                { label: 'Returns', value: '-10%', desc: 'Reduction in returns' }
            ]
        },
        {
            id: 'mm-3',
            slug: 'meesho',
            title: 'Meesho Management',
            shortDescription: 'Tap into the reseller network and social commerce.',
            fullDescription: 'Leverage the power of social commerce with Meesho. We optimize your listings for the reseller model and manage pricing strategies for high volume sales.',
            features: ['Reseller Strategy', 'Pricing Optimization', 'Catalog Upload', 'Order Management'],
            benefits: ['High volume low cost', 'Social reach', 'Zero commission strategy'],
            phases: [
                { title: 'Pricing Strategy', description: 'Setting competitive pricing for the reseller market.' },
                { title: 'Bulk Upload', description: 'Efficiently managing large catalogs.' },
                { title: 'Order Processing', description: 'Streamlining dispatch to avoid penalties.' },
                { title: 'Performance Review', description: 'Analyzing returns and supplier rating.' }
            ],
            stats: [
                { label: 'Volume', value: '500+', desc: 'Daily orders managed' },
                { label: 'Rating', value: '4.2+', desc: 'Maintained Supplier Rating' }
            ]
        },
        {
            id: 'mm-4',
            slug: 'nykaa',
            title: 'Nykaa & Blinkit',
            shortDescription: 'Specialized management for Beauty & Quick Commerce.',
            fullDescription: 'Tailored strategies for niche marketplaces like Nykaa (Beauty/Fashion) and Quick Commerce platforms like Blinkit/Zepto.',
            features: ['Category Approval', 'Banner Ads', 'Inventory Stocking', 'Flash Sales'],
            benefits: ['Niche targeting', 'Premium brand positioning', 'Instant delivery logistics'],
            phases: [
                { title: 'Onboarding', description: 'Navigating complex category approval processes.' },
                { title: 'Brand Store', description: 'Designing a premium brand store experience.' },
                { title: 'Banner Ads', description: 'Booking high-visibility slots during sale events.' },
                { title: 'Inventory Sync', description: 'Real-time stock updates for quick commerce.' }
            ],
            stats: [
                { label: 'Conversion', value: '5%', desc: 'Above industry average' },
                { label: 'Speed', value: '10min', desc: 'Delivery Optimization' }
            ]
        }
    ]
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
    deliverables: ['Source Code', 'Design Assets (Figma)', 'Documentation', '1 Month Free Support'],
    subServices: [
        {
            id: 'dev-1',
            slug: 'frontend',
            title: 'Frontend Development',
            shortDescription: 'React, Vue, and Angular development.',
            fullDescription: 'We create stunning, responsive, and interactive user interfaces using modern JavaScript frameworks like React.js, Vue.js, and Next.js. We prioritize performance (Core Web Vitals) and accessibility (WCAG).',
            features: ['SPA Development', 'PWA', 'Responsive Design', 'Animation Integration'],
            benefits: ['Better User Experience', 'Faster Interactions', 'Modern UI'],
            phases: [
                { title: 'Component Design', description: 'Building a reusable design system/UI kit.' },
                { title: 'Logic Integration', description: 'Connecting UI with APIs and state management (Redux/Zustand).' },
                { title: 'Optimization', description: 'Code splitting, lazy loading, and image optimization.' },
                { title: 'Cross-Browser QA', description: 'Ensuring consistency across Chrome, Safari, and Firefox.' }
            ],
            stats: [
                { label: 'Load Time', value: '<1s', desc: 'First Contentful Paint' },
                { label: 'SEO Score', value: '100', desc: 'Lighthouse Performance' }
            ]
        },
        {
            id: 'dev-2',
            slug: 'backend',
            title: 'Backend Development',
            shortDescription: 'Node.js, Python, and Database architecture.',
            fullDescription: 'Secure and scalable server-side solutions. We build robust APIs and handle database management using Node.js, Python (Django/FastAPI), and SQL/NoSQL databases.',
            features: ['API Development', 'Database Design', 'Cloud Integration', 'Security Implementation'],
            benefits: ['Data Security', 'Scalability', 'High Availability'],
            phases: [
                { title: 'Schema Design', description: 'Designing normalized database schemas.' },
                { title: 'API Architecture', description: 'Building RESTful or GraphQL endpoints.' },
                { title: 'Security', description: 'Implementing JWT auth, rate limiting, and data encryption.' },
                { title: 'Deployment', description: 'Setting up CI/CD pipelines and cloud infrastructure (AWS/Azure).' }
            ],
            stats: [
                { label: 'Uptime', value: '99.99%', desc: 'Service Availability' },
                { label: 'Response', value: '<50ms', desc: 'Average API latency' }
            ]
        },
        {
            id: 'dev-3',
            slug: 'mobile',
            title: 'Mobile App Development',
            shortDescription: 'iOS and Android apps using Flutter & React Native.',
            fullDescription: 'Reach customers on their phones with high-performance native and cross-platform mobile applications.',
            features: ['Cross-platform Dev', 'Native iOS/Android', 'App Store Submission', 'UI/UX Design'],
            benefits: ['Wider Reach', 'Push Notifications', 'Offline Capabilities'],
            phases: [
                { title: 'Wireframing', description: 'Mapping out user flows and screens.' },
                { title: 'Hybrid Dev', description: 'Coding in Flutter/React Native for dual-platform support.' },
                { title: 'Native Bridge', description: 'Integrating device features like Camera, GPS, and Biometrics.' },
                { title: 'Store Launch', description: 'Managing submission to Apple App Store and Google Play.' }
            ],
            stats: [
                { label: 'Retention', value: '40%', desc: 'Day-30 User Retention' },
                { label: 'Crash Rate', value: '<0.1%', desc: 'Stability metric' }
            ]
        }
    ]
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
    deliverables: ['Logo Pack (All Formats)', 'Brand Style Guide', 'Social Media Kit', 'Stationery Design'],
    subServices: [
        {
            id: 'gd-1',
            slug: 'logo-design',
            title: 'Logo & Identity',
            shortDescription: 'Memorable logos and comprehensive brand guidelines.',
            fullDescription: 'We craft unique logos that encapsulate your brand’s essence. Complete with color palettes, typography, and usage guidelines.',
            features: ['Logo Design', 'Brand Book', 'Stationery', 'Iconography'],
            benefits: ['Strong First Impression', 'Brand Recognition', 'Professionalism'],
            phases: [
                { title: 'Discovery', description: 'Researching industry trends and competitor visuals.' },
                { title: 'Sketching', description: 'Hand-drawn concepts and ideas.' },
                { title: 'Digitization', description: 'Vectorizing selected concepts in Illustrator.' },
                { title: 'Delivery', description: 'Providing source files (AI, EPS) and usage guide.' }
            ],
            stats: [
                { label: 'Concepts', value: '3-5', desc: 'Initial unique options' },
                { label: 'Satisfaction', value: '100%', desc: 'Unlimited revisions' }
            ]
        },
        {
            id: 'gd-2',
            slug: 'packaging',
            title: 'Packaging Design',
            shortDescription: 'Shelf-ready packaging that sells.',
            fullDescription: 'Stand out on the shelf (digital or physical) with creative packaging design that tells your product story and ensures unboxing delight.',
            features: ['Box Design', 'Label Design', '3D Mockups', 'Print-ready files'],
            benefits: ['Shelf Impact', 'Customer Experience', 'Information Hierarchy'],
            phases: [
                { title: 'Structural Design', description: 'Choosing the right box/label shape and material.' },
                { title: 'Visual Design', description: 'Applying brand graphics and regulatory info.' },
                { title: '3D Rendering', description: 'Visualizing the final look before printing.' },
                { title: 'Print Prep', description: 'Setting bleeds, cut lines, and color profiles.' }
            ],
            stats: [
                { label: 'Sales Lift', value: '30%', desc: 'After packaging redesign' },
                { label: 'Unboxing', value: '5★', desc: 'Customer experience rating' }
            ]
        }
    ]
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
