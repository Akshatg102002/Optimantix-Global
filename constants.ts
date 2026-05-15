import { Service, BlogPost, Project } from './types';
import { Users, Globe, Zap, BarChart } from 'lucide-react';

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
        "id": "mm-1",
        "slug": "amazon",
        "title": "Amazon Management",
        "shortDescription": "Full-service Amazon account management to scale your seller business.",
        "fullDescription": "Expert amazon account management services covering listing optimization, PPC advertising, inventory management, review management, Brand Registry, and ongoing account support to grow your Amazon business.",
        "features": [
          "Listing Optimisation & SEO",
          "PPC Advertising Management",
          "Inventory & Restock Planning",
          "Review & Reputation Management",
          "Brand Registry & IP Protection",
          "Amazon Support & Case Management"
        ],
        "page_title": "Amazon Account Management Services",
        "seo": {
          "meta_title": "Amazon Account Management Services | Expert Seller Central Management | Optimantix",
          "meta_description": "Professional amazon account management services covering listing optimization, PPC ads, inventory planning, Brand Registry, and seller support. Grow your Amazon business with dedicated experts.",
          "focus_keyphrase": "amazon account management services",
          "secondary_keyphrases": [
            "amazon seller central management",
            "amazon management services",
            "amazon account management",
            "seller central management"
          ]
        },
        "banners": {
          "desktop": "https://res.cloudinary.com/dusvykklu/image/upload/v1777619013/Amazon_Marketplace_r6ygso.webp",
          "mobile": "https://res.cloudinary.com/dusvykklu/image/upload/v1777619013/Amazon_Marketplace_MB_zf5omf.webp"
        },
        "hero_section": {
          "badge": "Amazon Management Services",
          "headline": "Your Amazon store, managed like it's our own.",
          "lead_text": "Most sellers leave serious revenue on the table — not because the product is wrong, but because managing Amazon at scale is a full-time job. Our dedicated amazon account management services team handles every layer of your Seller Central, so you can focus on what you do best.",
          "call_to_action_buttons": [
            {
              "text": "Connect With Us ↗",
              "prompt": "I want to get a free Amazon account audit from Optimantix",
              "type": "primary"
            },
            {
              "text": "See How It Works",
              "prompt": "Tell me more about Optimantix Amazon management pricing and packages",
              "type": "outline"
            }
          ]
        },
        "statistics_section": {
          "stats": [
            {
              "value": "3.2×",
              "label": "Average revenue growth in 6 months"
            },
            {
              "value": "98%",
              "label": "Client account health score maintained"
            },
            {
              "value": "40%",
              "label": "Avg. reduction in ACoS within 90 days"
            }
          ]
        },
        "services_section": {
          "section_label": "What We Do",
          "title": "Full-service Amazon management — not just ads, not just listings",
          "description": "Running a successful Amazon store means juggling product listings, advertising, inventory, reviews, brand protection, and daily firefighting. Our amazon account management services handle every piece, so nothing falls through the cracks.",
          "services_grid": [
            {
              "icon": "search-optimization",
              "title": "Listing Optimisation & SEO",
              "description": "We build listings that rank and convert — keyword research, A+ content, Enhanced Brand Content, and backend optimisation that Amazon's algorithm actually rewards."
            },
            {
              "icon": "advertising",
              "title": "PPC Advertising Management",
              "description": "Your ad budget managed like it's our own. We run Sponsored Products, Brands, and Display campaigns with the goal of lowering ACoS while scaling profitable sales."
            },
            {
              "icon": "inventory",
              "title": "Inventory & Restock Planning",
              "description": "Out-of-stock kills momentum. We monitor inventory levels, project demand, and coordinate restocks so you never lose the buy box to timing issues."
            },
            {
              "icon": "reviews",
              "title": "Review & Reputation Management",
              "description": "We track review velocity, respond to customer feedback through Amazon's tools, and proactively manage your seller rating to keep you competitive."
            },
            {
              "icon": "brand-protection",
              "title": "Brand Registry & IP Protection",
              "description": "Counterfeit complaints, unauthorised resellers, trademark issues — we manage your Brand Registry and file cases when needed to protect your products."
            },
            {
              "icon": "support",
              "title": "Amazon Support & Case Management",
              "description": "When something breaks (and it will), we handle the back-and-forth with Seller Support, so you're not stuck in ticket limbo trying to get a real answer."
            }
          ]
        },
        "process_section": {
          "section_label": "How It Works",
          "title": "From handoff to ongoing growth — here's the process",
          "description": "Our amazon seller central management approach is built to deliver results quickly, then keep compounding them over time. Here's what it looks like from week one onward.",
          "steps": [
            {
              "step_number": "01",
              "title": "Account Audit & Strategy Session",
              "description": "We start with a full diagnostic — reviewing your listings, ad performance, account health, and competitor landscape. From there, we build a 90-day action plan tailored to your category."
            },
            {
              "step_number": "02",
              "title": "Onboarding & Access Setup",
              "description": "You grant us managed user access to your Seller Central. We document your current setup, integrate our reporting tools, and assign your dedicated account manager."
            },
            {
              "step_number": "03",
              "title": "Rapid Optimisation Phase (Days 1–30)",
              "description": "The first month is about quick wins — fixing broken listings, cutting wasted ad spend, tightening inventory alerts, and setting up proper tracking. You'll see movement here fast."
            },
            {
              "step_number": "04",
              "title": "Growth & Scale (Month 2–3)",
              "description": "Once the foundation is solid, we shift focus to growth — testing new keywords, launching complementary campaigns, improving conversion rates, and scaling what's already working."
            },
            {
              "step_number": "05",
              "title": "Ongoing Management & Reporting",
              "description": "Amazon rewards consistency. We run weekly performance reviews, adapt to algorithm changes, and continuously test new angles — so your account keeps compounding instead of plateauing."
            }
          ]
        },
        "why_us_section": {
          "section_label": "Why Optimantix",
          "title": "We don't just manage accounts — we grow them",
          "description": "There's no shortage of agencies claiming to be Amazon experts. Here's what actually sets our amazon account management services apart from the rest.",
          "features_grid": [
            {
              "title": "Category specialists, not generalists",
              "description": "Each account is assigned a manager who knows your specific Amazon category — its seasonality, its competitors, its ranking quirks."
            },
            {
              "title": "No lock-in contracts",
              "description": "We earn your business every month. If the results aren't there, you're free to walk. That keeps us sharper and you safer."
            },
            {
              "title": "Proactive, not reactive",
              "description": "We flag issues before they become problems — suppressions, buy box losses, policy warnings, competitor moves. You hear about it from us first."
            },
            {
              "title": "Transparent fee structure",
              "description": "No inflated ad budgets to hide margins. Our management fee is separate from your ad spend, and you approve every major decision."
            },
            {
              "title": "Full-funnel thinking",
              "description": "We connect your Amazon performance to your broader brand strategy — not just Seller Central metrics, but actual business growth."
            },
            {
              "title": "Real-time communication",
              "description": "Dedicated Slack channel, weekly calls, and a manager who picks up the phone. No ticket queues, no 3-day response windows."
            }
          ]
        },
        "testimonials_section": {
          "section_label": "Client Voice",
          "title": "What our clients actually say",
          "testimonials": [
            {
              "quote": "We'd been running Amazon ads ourselves for two years, spending more and more with diminishing returns. Within 60 days of handing it over to Optimantix, our ACoS dropped from 38% to 21% and monthly revenue grew by 60%. What I appreciate most is they explain every decision — you always feel in control, even though they're doing all the work.",
              "author": "James R., Founder, Home & Kitchen Brand (UK)",
              "location": "UK",
              "category": "Home & Kitchen"
            },
            {
              "quote": "Our listings were technically fine but they just weren't converting. The Optimantix team rewrote everything with proper keyword research and A+ content. Our conversion rate went from 8% to nearly 14% in about six weeks. That's not a tweak — that's a transformation.",
              "author": "Priya M., E-commerce Director, Beauty & Wellness Brand (India)",
              "location": "India",
              "category": "Beauty & Wellness"
            }
          ]
        },
        "faq_section": {
          "section_label": "FAQ",
          "title": "Questions we get asked a lot",
          "questions": [
            {
              "question": "What exactly do your amazon account management services cover?",
              "answer": "Our service covers everything inside your Seller Central account — listing creation and optimisation, PPC advertising, inventory management, review management, case handling with Amazon support, Brand Registry, and detailed performance reporting. You get a complete managed service, not just one piece of the puzzle."
            },
            {
              "question": "Do I need to give you access to my Seller Central account?",
              "answer": "Yes — we work directly inside your account using Amazon's user permissions system. This means we're added as a secondary user under your account, so you always retain full ownership and visibility. You can revoke access at any time, though in practice our clients never feel the need to."
            },
            {
              "question": "How quickly can I expect to see results from amazon seller central management?",
              "answer": "Some improvements show up fast — listing click-through rates, ad waste reduction, and buy box rate often shift within the first 30 days. Revenue and ranking improvements compound over 60–90 days as Amazon's algorithm picks up the stronger signals. We set honest expectations upfront: meaningful growth takes at least 90 days to play out properly."
            },
            {
              "question": "What makes you different from other Amazon management agencies?",
              "answer": "A few things: we assign category-specific managers (not generalist account managers), we separate our management fee cleanly from your ad spend so there's no conflict of interest in how we spend your budget, and we work month-to-month with no long lock-in contracts. We've also built internal tooling that catches listing suppressions, review patterns, and competitor moves faster than most agencies do manually."
            },
            {
              "question": "Do you manage accounts outside of Amazon too?",
              "answer": "Yes. While this page focuses on Amazon, we manage seller accounts across multiple e-commerce marketplaces. If you're looking to expand or consolidate your marketplace presence, our full marketplace management services cover platforms including Walmart, Flipkart, and more — all under the same dedicated account management model.",
              "links": [
                {
                  "text": "full marketplace management services",
                  "url": "https://optimantix.com/services/marketplace-management"
                }
              ]
            },
            {
              "question": "Is there a minimum contract length or commitment?",
              "answer": "We work on a rolling monthly basis. There's no long-term contract required. That said, we do ask for at least 90 days to show meaningful results — Amazon's algorithm needs that runway to respond to optimisations. Most clients stay with us well beyond that simply because the results keep improving."
            },
            {
              "question": "How do you handle communication and reporting?",
              "answer": "You get a dedicated account manager, a shared reporting dashboard updated weekly, and a standing monthly strategy call. For urgent issues — a listing suppression, a policy notice, a competitor undercutting — we reach out proactively rather than waiting for you to notice. Most clients find they hear from us more than they expected, in a good way."
            }
          ]
        },
        "bottom_cta_section": {
          "title": "Ready to stop managing Amazon and start growing it?",
          "description": "Book a free audit and we'll walk through your account, identify the gaps, and show you exactly what we'd do — before you commit to anything.",
          "call_to_action_button": {
            "text": "Book Your Free Audit ↗",
            "prompt": "I want to book a free Amazon account audit with Optimantix",
            "type": "primary"
          }
        }
      },
      {
        "id": "mm-2",
        "slug": "flipkart",
        "title": "Flipkart Management",
        "shortDescription": "Full-service Flipkart account management to grow your seller business on India's biggest marketplace.",
        "fullDescription": "Expert flipkart account management service covering listing optimisation, Flipkart Ads, pricing strategy, inventory & fulfilment, returns management, and ongoing account health to grow your Flipkart business.",
        "features": [
          "Listing Creation & Optimisation",
          "Flipkart Ads Management",
          "Pricing & Competitive Intelligence",
          "Inventory & Fulfilment Management",
          "Returns & Customer Feedback",
          "Performance & Health Reporting"
        ],
        "page_title": "Flipkart Account Management Service",
        "seo": {
          "meta_title": "Flipkart Account Management Service | Expert Seller Panel Management | Optimantix",
          "meta_description": "Professional flipkart account management service covering listing optimisation, Flipkart Ads, pricing strategy, inventory management, returns reduction, and seller support. Grow your Flipkart business with dedicated experts.",
          "focus_keyphrase": "flipkart account management service",
          "secondary_keyphrases": [
            "flipkart seller account management",
            "flipkart management services",
            "flipkart account management",
            "flipkart seller panel management"
          ]
        },
        "banners": {
          "desktop": "https://res.cloudinary.com/dusvykklu/image/upload/v1777619014/FlipkartD_tyhooz.webp",
          "mobile": "https://res.cloudinary.com/dusvykklu/image/upload/v1777619012/FlipkartMB_xndjxg.webp"
        },
        "hero_section": {
          "badge": "Flipkart Account Management Service",
          "headline": "Flipkart is India's biggest marketplace. Are you getting your share?",
          "lead_text": "With over 450 million registered customers and category-specific algorithms that reward well-managed accounts, Flipkart gives serious sellers a serious opportunity. Our flipkart account management service puts a dedicated team in your corner — handling listings, ads, returns, and everything in between — so your brand grows consistently, not accidentally.",
          "call_to_action_buttons": [
            {
              "text": "Connect With Us ↗",
              "prompt": "I want a free Flipkart account audit from Optimantix",
              "type": "primary"
            },
            {
              "text": "Explore the Service",
              "prompt": "Tell me more about Optimantix Flipkart management packages and pricing",
              "type": "outline"
            }
          ]
        },
        "statistics_section": {
          "stats": [
            {
              "value": "2.8×",
              "label": "Average sales growth within 6 months"
            },
            {
              "value": "35%",
              "label": "Avg. drop in return rates after listing fixes"
            },
            {
              "value": "99%",
              "label": "Account health score maintained across clients"
            },
            {
              "value": "150+",
              "label": "Flipkart brands actively managed"
            }
          ]
        },
        "services_section": {
          "section_label": "What we handle",
          "title": "End-to-end flipkart account management service — every corner covered",
          "description": "Flipkart isn't just about uploading products and hoping for the best. The platform rewards sellers who stay on top of quality scores, pricing rules, SLA compliance, and category-specific optimisation. We do all of that — proactively, not reactively — so nothing slips through the cracks while you're focused on running your business.",
          "services_grid": [
            {
              "icon": "search-optimization",
              "title": "Listing creation & optimisation",
              "description": "Titles, descriptions, category attributes, and images — crafted around Flipkart's ranking signals and what actually converts shoppers in your category."
            },
            {
              "icon": "advertising",
              "title": "Flipkart Ads management",
              "description": "Product Listing Ads and Brand Store campaigns managed daily. We reduce wasted impressions and scale campaigns that are actually driving returns."
            },
            {
              "icon": "pricing",
              "title": "Pricing & competitive intelligence",
              "description": "We monitor your category's price movements and adjust your pricing strategy to protect margins while staying competitive — without triggering Flipkart's price parity flags."
            },
            {
              "icon": "inventory",
              "title": "Inventory & fulfilment management",
              "description": "Timely stock replenishment, Flipkart Fulfilment (F-Assured) coordination, and SLA monitoring — because late shipments and stockouts tank your quality score fast."
            },
            {
              "icon": "reviews",
              "title": "Returns & customer feedback",
              "description": "High return rates are a silent account killer on Flipkart. We analyse return reasons, fix root causes in listings, and manage customer feedback to protect your seller rating."
            },
            {
              "icon": "support",
              "title": "Performance & health reporting",
              "description": "Weekly dashboards with plain-language commentary — not data walls. You'll know your quality score, sell-through rate, and ad performance without needing to decode spreadsheets."
            }
          ]
        },
        "process_section": {
          "section_label": "Our approach",
          "title": "How we take your Flipkart account from where it is to where it should be",
          "description": "We've onboarded sellers across fashion, electronics, home, FMCG, and everything in between. The process is thorough — but the onboarding is fast and you'll have clarity from day one.",
          "steps": [
            {
              "step_number": "01",
              "title": "Full account audit",
              "description": "We go through your entire seller account — catalogue quality, backend attributes, return rate history, quality score status, ad account performance, and category competition. This isn't a surface-level scan. We look for structural issues that most sellers miss until they've already cost them rankings."
            },
            {
              "step_number": "02",
              "title": "Tailored 90-day growth plan",
              "description": "Based on the audit, we build a prioritised roadmap specific to your catalogue and category. Every action is ranked by impact and effort — quick wins first, long-term levers second. You see exactly what we'll do and in what order before anything goes live."
            },
            {
              "step_number": "03",
              "title": "Hands-on execution",
              "description": "Listing rewrites, ad restructuring, pricing adjustments, fulfilment troubleshooting — we do the actual work inside your seller panel, not just advise you on it. You get a real team working your account, not a strategy deck and a monthly call."
            },
            {
              "step_number": "04",
              "title": "Weekly review & ongoing optimisation",
              "description": "Flipkart's algorithm shifts regularly and category competition changes constantly. We hold weekly account reviews, adapt to platform changes as they happen, and keep testing new improvements — so the account never stagnates."
            }
          ]
        },
        "why_us_section": {
          "section_label": "Why choose us",
          "title": "What makes our flipkart account management service different",
          "description": "A lot of agencies claim Flipkart expertise. Few have genuinely specialised teams who live in seller panels every single day. Here's what we do differently — and why it matters for your bottom line.",
          "features_grid": [
            {
              "title": "Flipkart-first specialists",
              "description": "Our managers know Flipkart's quality score system, pricing rules, and category quirks inside out — not as an add-on to Amazon expertise, but as a dedicated focus."
            },
            {
              "title": "Month-to-month, no lock-in",
              "description": "We don't believe in locking clients into long contracts. Results keep you — not paperwork. Most clients stay because the account keeps growing, not because they have to."
            },
            {
              "title": "Proactive issue spotting",
              "description": "Quality score dips, listing removals, policy flags — we catch these before Flipkart penalises your account. You hear from us before problems become crises."
            },
            {
              "title": "No inflated ad spend",
              "description": "Our fee is separate from your ad budget. We have zero incentive to spend more than necessary. Every rupee goes where the data says it should."
            },
            {
              "title": "Category-specific knowledge",
              "description": "Fashion, electronics, FMCG, home decor — each category behaves differently on Flipkart. We assign managers who understand your specific vertical, not generalists guessing their way through."
            },
            {
              "title": "Direct, responsive communication",
              "description": "A dedicated point of contact, weekly calls, and a Slack channel. No support tickets, no queues. When something needs your attention, you'll know within the hour."
            }
          ]
        },
        "testimonials_section": {
          "section_label": "Client stories",
          "title": "Results from real sellers we work with",
          "testimonials": [
            {
              "quote": "Before Optimantix, our Flipkart account was technically live but barely visible. Our quality score was sitting at 65 and our return rate was hurting us in rankings. Within 45 days of working with them, the quality score was at 92, returns dropped significantly because they fixed the root issues in our listings, and our organic ranking on three hero SKUs went from page 4 to page 1. That kind of shift changes your whole business.",
              "author": "Rahul K., Operations Head, Apparel Brand (Delhi NCR)",
              "location": "Delhi NCR",
              "category": "Apparel"
            },
            {
              "quote": "I used to spend my evenings troubleshooting Flipkart — checking if listings were live, chasing support cases, trying to figure out why ads were eating budget with no results. Handing all of it to Optimantix was honestly a relief. Six months in and monthly revenue on Flipkart has nearly tripled. More importantly, I can focus on growing the product range instead of firefighting the platform.",
              "author": "Sneha M., Founder, Home Essentials Brand (Pune)",
              "location": "Pune",
              "category": "Home Essentials"
            }
          ]
        },
        "faq_section": {
          "section_label": "FAQ",
          "title": "Common questions about our flipkart account management service",
          "questions": [
            {
              "question": "What does your flipkart account management service actually include?",
              "answer": "It's a comprehensive managed service — listing creation and optimisation, Flipkart Ads campaign management, pricing strategy, inventory and fulfilment monitoring, return rate reduction, customer feedback management, quality score improvement, and weekly performance reporting. Essentially, if it lives inside your Flipkart seller panel, we handle it. You get one accountable team for everything, not fragmented advice from multiple sources."
            },
            {
              "question": "How do you access my Flipkart seller account?",
              "answer": "We use Flipkart's official sub-user or authorised access mechanism, which means you add us as a secondary user on your account. You retain complete ownership and can remove our access at any point. All activity we perform is visible in your account history — there's no black box. Transparency is something we take seriously, not just something we say."
            },
            {
              "question": "How long before I see results from Flipkart account management?",
              "answer": "Some changes show results quickly — quality score improvements, ad waste reduction, and listing click-through rate lifts often move within the first 30 days. Meaningful ranking and revenue growth typically compounds over 60–90 days as Flipkart's algorithm responds to consistent signals. We're upfront about this timeline from day one. Anyone promising dramatic results in two weeks is overselling."
            },
            {
              "question": "Do you work with sellers across all Flipkart categories?",
              "answer": "Yes — we've worked across fashion, electronics, home & kitchen, personal care, FMCG, sports, and more. That said, we don't stretch a single manager across every category. We match your account to a manager who has direct experience in your specific vertical. Category knowledge on Flipkart matters more than most sellers realise — the ranking signals, pricing sensitivity, and quality parameters differ significantly between, say, apparel and electronics."
            },
            {
              "question": "We also sell on other marketplaces — can you manage those too?",
              "answer": "Absolutely. While this page focuses on Flipkart, we manage seller accounts across multiple platforms. If you want a single team handling your entire marketplace presence, our end-to-end marketplace management services cover Amazon, Meesho, Myntra, and more — all under the same dedicated account management model.",
              "links": [
                {
                  "text": "end-to-end marketplace management services",
                  "url": "https://optimantix.com/services/marketplace-management"
                }
              ]
            },
            {
              "question": "Is there a minimum commitment period?",
              "answer": "We work month-to-month with no mandatory long-term contracts. We do recommend a minimum 90-day engagement to give optimisations time to play out — Flipkart's algorithm needs that runway to reflect changes in listings and ad performance. But there's no clause trapping you in. Clients stay because results keep building, and that's the only reason we want."
            },
            {
              "question": "What does communication and reporting look like?",
              "answer": "You get a dedicated account manager as your single point of contact — not a rotating support team. Weekly reports cover quality scores, ad performance, sell-through rates, return trends, and any issues flagged. Monthly strategy calls review what's working, what's changing on the platform, and what's next. For anything urgent — a listing removal, a policy notice, an unexpected traffic drop — we reach out to you immediately rather than waiting for a scheduled call."
            }
          ]
        },
        "bottom_cta_section": {
          "title": "Let's turn your Flipkart account into a consistent revenue engine",
          "description": "Start with a free audit — we'll review your account, highlight what's holding it back, and walk you through exactly what we'd do. No sales pitch, just an honest look at what's possible.",
          "call_to_action_button": {
            "text": "Book Your Free Audit ↗",
            "prompt": "I want to book a free Flipkart account audit with Optimantix",
            "type": "primary"
          }
        }
      },
      {
        "id": "mm-3",
        "slug": "nykaa",
        "title": "Nykaa Management",
        "shortDescription": "Full-service Nykaa seller account management to grow your beauty brand on India's most discerning beauty platform.",
        "fullDescription": "Expert Nykaa seller account management covering brand onboarding and compliance, A+ content and listing optimisation, Nykaa Ads, pricing and promotional strategy, inventory and fulfilment oversight, reviews and reputation management, and ongoing account health monitoring to grow your beauty brand on Nykaa.",
        "features": [
          "Brand Onboarding & Compliance",
          "A+ Content & Listing Optimisation",
          "Nykaa Ads & Sponsored Campaigns",
          "Pricing & Promotional Strategy",
          "Inventory & Fulfilment Oversight",
          "Reviews, Ratings & Reputation",
          "Weekly Performance Reporting",
          "Account Health Monitoring"
        ],
        "page_title": "Nykaa Seller Account Management",
        "seo": {
          "meta_title": "Nykaa Seller Account Management | Expert Beauty Brand Management | Optimantix",
          "meta_description": "Professional Nykaa seller account management covering brand onboarding, A+ content, Nykaa Ads, pricing strategy, inventory management, and review growth. Grow your beauty brand with dedicated Nykaa specialists.",
          "focus_keyphrase": "nykaa seller account management",
          "secondary_keyphrases": [
            "nykaa account management service",
            "nykaa brand management",
            "nykaa seller management",
            "nykaa beauty brand management"
          ]
        },
        "banners": {
          "desktop": "https://res.cloudinary.com/dusvykklu/image/upload/v1777619014/Nykaa_MB_wq6zn3.webp",
          "mobile": "https://res.cloudinary.com/dusvykklu/image/upload/v1777619013/Nykaa_D_slviwl.webp"
        },
        "hero_section": {
          "badge": "Nykaa Seller Account Management",
          "headline": "Your beauty brand deserves a presence as refined as your products.",
          "lead_text": "Nykaa's 35 million active shoppers are India's most discerning beauty buyers. They read ingredient lists, compare formulations, and trust brands that show up with authority. We make sure yours is one of them.",
          "call_to_action_buttons": [
            {
              "text": "Connect With Us ↗",
              "prompt": "I want a free Nykaa brand audit from Optimantix",
              "type": "primary"
            },
            {
              "text": "See how it works",
              "prompt": "What is included in Optimantix Nykaa account management pricing",
              "type": "outline"
            }
          ],
          "trust_items": [
            "No lock-in contracts",
            "Nykaa category specialists",
            "Month-to-month results",
            "90+ beauty brands managed"
          ]
        },
        "statistics_section": {
          "stats": [
            {
              "value": "35M+",
              "label": "Active Nykaa shoppers, beauty-intent"
            },
            {
              "value": "2.8×",
              "label": "Average revenue growth in 6 months"
            },
            {
              "value": "98%",
              "label": "Brand compliance score maintained"
            },
            {
              "value": "4.6★",
              "label": "Average rating achieved across managed brands"
            }
          ]
        },
        "services_section": {
          "section_label": "What we manage",
          "title": "Every layer of your Nykaa presence, handled with precision",
          "description": "From the compliance paperwork that blocks new brands to the A+ content that converts curious shoppers into loyal customers — our Nykaa seller account management covers everything, executed by specialists who understand the platform's standards as well as you know your products.",
          "services_grid": [
            {
              "icon": "brand-protection",
              "title": "Brand onboarding & compliance",
              "description": "GST, FSSAI, brand trademark verification, and category approvals — all handled properly so you're live without delays or rejections.",
              "prompt": "Tell me more about Nykaa brand onboarding and compliance management"
            },
            {
              "icon": "search-optimization",
              "title": "A+ content & listing optimisation",
              "description": "SEO-optimised titles, ingredient-led descriptions, rich A+ pages, and image guidance — built to Nykaa's exact quality bar.",
              "prompt": "How does Optimantix handle Nykaa product listings and A+ content"
            },
            {
              "icon": "advertising",
              "title": "Nykaa ads & sponsored campaigns",
              "description": "On-platform PPC and brand day campaigns managed daily — putting your products in front of buyers at the exact moment they're ready.",
              "prompt": "How does Optimantix manage Nykaa ads and sponsored campaigns"
            },
            {
              "icon": "pricing",
              "title": "Pricing & promotional strategy",
              "description": "MRP management, discount structuring, and Nykaa sale event participation — balancing brand positioning with commercial outcomes.",
              "prompt": "How does Optimantix manage Nykaa pricing and promotions"
            },
            {
              "icon": "inventory",
              "title": "Inventory & fulfilment oversight",
              "description": "Stock level monitoring, restocking planning, and SLA compliance — keeping your account healthy and products consistently available.",
              "prompt": "How does Optimantix manage Nykaa inventory and fulfilment"
            },
            {
              "icon": "reviews",
              "title": "Reviews, ratings & reputation",
              "description": "On Nykaa a 4.3-star average is the visibility floor. We monitor your review profile and systematically build the rating your brand deserves.",
              "prompt": "How does Optimantix manage Nykaa reviews and ratings"
            },
            {
              "icon": "support",
              "title": "Weekly performance reporting",
              "description": "Impressions, conversions, sales trends, return analysis, and ad ROI — in plain language you can act on, not data tables to decode.",
              "prompt": "What does Nykaa performance reporting look like with Optimantix"
            },
            {
              "icon": "layers",
              "title": "Account health monitoring",
              "description": "Suppressions, policy flags, and account warnings caught and resolved before they compound — you'll never be surprised by a platform issue.",
              "prompt": "How does Optimantix monitor Nykaa account health and policy compliance"
            }
          ]
        },
        "timeline_section": {
          "section_label": "Results timeline",
          "title": "What happens after you sign with us",
          "description": "Most agencies are vague about what happens when. We're not. Here's the exact sequence of what we do and when you see it working — week by week.",
          "items": [
            {
              "period": "Week 1",
              "title": "Deep brand & account audit",
              "description": "We read your account honestly — listing quality scores, compliance gaps, review profile, pricing versus category benchmarks, and ad performance. You receive a written audit report with every issue ranked by impact."
            },
            {
              "period": "Week 2",
              "title": "Strategy presentation & approval",
              "description": "We present your tailored 90-day roadmap — specific actions, expected outcomes, and timelines. You review and approve before we execute anything. Nothing goes live without your sign-off."
            },
            {
              "period": "Weeks 2–4",
              "title": "Compliance fixes & listing overhaul",
              "description": "Documentation resolved, suppressed listings reinstated, A+ content rewritten, titles and descriptions rebuilt to Nykaa's quality standard. Listing quality score improvement typically visible within 10–14 days."
            },
            {
              "period": "Month 2",
              "title": "Ad campaigns live & optimising",
              "description": "Sponsored campaigns restructured and running with a clear cost-per-order target. Return rate begins dropping as corrected listings accumulate new order data. Visibility improvements become measurable."
            },
            {
              "period": "Month 3+",
              "title": "Compounding revenue growth",
              "description": "Organic rankings improve as the algorithm responds to stronger content signals. Reviews build. Sales compound. Most clients see their most significant month-on-month growth between months 3 and 6."
            }
          ]
        },
        "comparison_section": {
          "section_label": "Why choose Optimantix",
          "title": "Us vs. doing it yourself vs. a generic agency",
          "description": "Most beauty brands try one of three paths. Here is exactly what each path delivers on the things that actually matter on Nykaa.",
          "columns": ["DIY seller", "Generic agency", "Optimantix"],
          "rows": [
            {
              "feature": "Nykaa-specific expertise",
              "diy": { "value": false, "note": "" },
              "generic": { "value": false, "note": "General platforms only" },
              "optimantix": { "value": true, "note": "Beauty category specialists" }
            },
            {
              "feature": "A+ content creation",
              "diy": { "value": false, "note": "Time-intensive" },
              "generic": { "value": true, "note": "Basic templates" },
              "optimantix": { "value": true, "note": "Brand-specific, ingredient-led" }
            },
            {
              "feature": "Compliance & docs management",
              "diy": { "value": false, "note": "High error risk" },
              "generic": { "value": true, "note": "Basic support" },
              "optimantix": { "value": true, "note": "FSSAI, GST, trademark handled" }
            },
            {
              "feature": "Return rate reduction",
              "diy": { "value": false, "note": "" },
              "generic": { "value": false, "note": "Not tracked" },
              "optimantix": { "value": true, "note": "Primary KPI we manage" }
            },
            {
              "feature": "Proactive policy monitoring",
              "diy": { "value": false, "note": "" },
              "generic": { "value": false, "note": "Reactive only" },
              "optimantix": { "value": true, "note": "We flag before you're penalised" }
            },
            {
              "feature": "Dedicated account manager",
              "diy": { "value": false, "note": "" },
              "generic": { "value": false, "note": "Rotating team" },
              "optimantix": { "value": true, "note": "One person, always" }
            },
            {
              "feature": "No lock-in contract",
              "diy": { "value": true, "note": "" },
              "generic": { "value": false, "note": "6–12 month lock-in" },
              "optimantix": { "value": true, "note": "Month-to-month always" }
            },
            {
              "feature": "Transparent ad spend",
              "diy": { "value": true, "note": "" },
              "generic": { "value": false, "note": "Fee tied to ad spend" },
              "optimantix": { "value": true, "note": "Separate fee, no conflict" }
            }
          ]
        },
        "process_section": {
          "section_label": "Our process",
          "title": "How we work, day to day",
          "description": "",
          "steps": [
            {
              "step_number": "01",
              "title": "Full account audit with written report",
              "description": "We review your entire Nykaa account and deliver a written report ranking every issue by impact — not a verbal summary you'll forget, an actual document you can act on independently if you choose to."
            },
            {
              "step_number": "02",
              "title": "Tailored 90-day growth roadmap",
              "description": "Built around your specific category, catalogue, and competitors. Every recommendation has a rationale, an expected outcome, and a timeline — not generic best practices copy-pasted from another brand's plan."
            },
            {
              "step_number": "03",
              "title": "Hands-on execution inside your seller panel",
              "description": "We work directly in your account — rewriting listings, managing ads, handling compliance cases, updating inventory signals. You get a team doing the work, not an advisor telling you what to do yourself."
            },
            {
              "step_number": "04",
              "title": "Weekly reviews, monthly strategy calls",
              "description": "Weekly performance reports in plain language. Monthly calls reviewing what's working, what's being tested, and what's changing on the platform. Urgent issues get a same-day response — no waiting for the scheduled update."
            }
          ]
        },
        "why_us_section": {
          "section_label": "Why Optimantix",
          "title": "What we don't do is as important as what we do",
          "description": "",
          "features_grid": [
            {
              "title": "We don't inflate ad spend",
              "description": "Our management fee is completely separate from your ad budget. We have zero incentive to spend more than the data justifies. Every rupee is allocated where it should be."
            },
            {
              "title": "We don't use lock-in contracts",
              "description": "Month-to-month, always. We stay because results keep building — not because a 12-month contract gives us no reason to perform after month one."
            },
            {
              "title": "We don't discount your brand",
              "description": "Growth through constant discounting damages brand equity on a premium platform like Nykaa. We build sustainable visibility through content quality and authority."
            },
            {
              "title": "We don't hide behind generic reports",
              "description": "Weekly dashboards in plain language. No vanity metrics, no data walls that look impressive but say nothing. Just honest numbers and what they mean for your brand."
            },
            {
              "title": "We don't rotate your account manager",
              "description": "One dedicated manager who knows your brand, products, and category. Directly reachable. Not a ticket system, not a rotating support team who starts fresh every time."
            },
            {
              "title": "We don't overpromise timelines",
              "description": "Content improvements show in 2–4 weeks. Revenue growth compounding over 60–90 days. We tell you this upfront, not after you've signed and are waiting for a miracle."
            }
          ]
        },
        "testimonials_section": {
          "section_label": "Client stories",
          "title": "What brands we manage actually say",
          "testimonials": [
            {
              "quote": "We'd been on Nykaa for 14 months with genuinely good products and completely flat sales. Turns out our listing content was nowhere near the quality standard and our A+ pages were basically empty. Optimantix rebuilt everything — ingredient-focused descriptions, proper brand story content, new image direction — and within 10 weeks we went from 40 orders a month to over 180. What struck me most was how much they understood beauty shoppers specifically. They weren't just filling in a template.",
              "author": "Priyanka V., Founder, Skincare Brand — Bangalore",
              "location": "Bangalore",
              "category": "Skincare"
            },
            {
              "quote": "Nykaa's compliance requirements nearly broke us early on — three products suppressed in the first month because of documentation gaps we didn't know existed. Optimantix resolved everything in a week and built a compliance system so it never happens again. Since then our account has been consistently clean, our rating went from 3.8 to 4.7, and monthly revenue has grown from ₹80,000 to ₹3.2 lakhs. The team genuinely feels like part of our business.",
              "author": "Vikram M., Co-founder, Wellness Brand — Mumbai",
              "location": "Mumbai",
              "category": "Wellness"
            }
          ]
        },
        "faq_section": {
          "section_label": "FAQ",
          "title": "Questions we hear before brands decide to work with us",
          "questions": [
            {
              "question": "What does your Nykaa account management service include?",
              "answer": "It covers everything inside your Nykaa seller account — brand onboarding and compliance, product listing creation and A+ content, ad campaign management, pricing and promotional strategy, inventory monitoring, review and rating management, account health tracking, and weekly performance reporting. It's a fully managed service, not an advisory retainer. We execute the work, not just recommend what you should do yourself."
            },
            {
              "question": "What documentation is needed to sell on Nykaa?",
              "answer": "At minimum: GST registration, brand trademark certificate or authorisation letter, bank account details, and product certifications relevant to your category — FSSAI for food-based wellness products, Ayush licensing for herbal formulations, and standard cosmetic safety compliance for beauty products. Exact requirements vary by category. We handle the full documentation audit and preparation so nothing delays your listing approval."
            },
            {
              "question": "How quickly will I see results?",
              "answer": "Content and compliance improvements typically show within 2–4 weeks — listing quality score improvements and increased impressions first. Meaningful revenue growth and rating improvements compound over 60–90 days. We set these expectations upfront, clearly, before you sign anything. Anyone promising dramatic sales inside two weeks on Nykaa is telling you what you want to hear, not what the platform's algorithm actually allows."
            },
            {
              "question": "We're already selling on Amazon and Flipkart — why manage Nykaa differently?",
              "answer": "Because Nykaa is a fundamentally different selling environment. Amazon rewards discoverability and price; Nykaa rewards brand trust, content quality, and ingredient credibility. The strategies that work well on general marketplaces rarely transfer cleanly to a premium beauty platform. We see this mistake regularly — brands bringing a general marketplace playbook to Nykaa and wondering why they're not converting. If you want a single team managing your full marketplace presence, our complete marketplace management services cover Amazon, Flipkart, Meesho, and more under one coordinated strategy.",
              "links": [
                {
                  "text": "complete marketplace management services",
                  "url": "https://optimantix.com/services/marketplace-management"
                }
              ]
            },
            {
              "question": "Is there a minimum contract period?",
              "answer": "We work month-to-month with no mandatory long-term contracts. We do ask for 90 days to show meaningful results — the Nykaa algorithm and review accumulation both need that runway. But nothing binds you beyond that. The reason clients stay well past three months is that the compounding results make it an obvious decision, not because a contract requires it."
            },
            {
              "question": "How do you handle access to my Nykaa account?",
              "answer": "We work through Nykaa's authorised sub-user access system. You retain full admin control at all times and can revoke access whenever you choose. Every action we take is logged and visible in your account history. We operate with complete transparency — you're always in the loop on what's being done and why, and nothing significant goes live without your awareness."
            }
          ]
        },
        "bottom_cta_section": {
          "title": "Your Nykaa brand story deserves to be told well.",
          "description": "A free brand audit. We review your account, identify every gap, and walk you through exactly what we'd do. No pressure, no sales script. Just an honest look at what's possible.",
          "call_to_action_button": {
            "text": "Book your free brand audit ↗",
            "prompt": "I want to book a free Nykaa brand audit with Optimantix",
            "type": "primary"
          }
        }
      },
      {
        id: 'mm-4',
        slug: 'nykaa-blinkit',
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
  },
  {
    id: '3',
    title: 'The Future of AI in E-commerce',
    slug: 'ai-in-ecommerce',
    excerpt: 'Artificial Intelligence is revolutionizing how we shop online. From personalized recommendations to automated customer support, learn how AI can boost your sales.',
    content: 'Artificial Intelligence is no longer just a buzzword; it is a fundamental driver of e-commerce growth. From predictive analytics that forecast inventory needs to chatbots that provide 24/7 customer service, AI is streamlining operations and enhancing the user experience. In this article, we dive into practical applications of AI for small to medium-sized e-commerce businesses.',
    author: 'David Ross',
    date: '2024-02-20',
    imageUrl: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=800'
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
    description: 'Deep research on goals and audience to build data-driven strategies.'
  },
  {
    title: 'Planning & Design',
    description: 'Detailed roadmaps and designs aligning with your brand identity.'
  },
  {
    title: 'Execution & Launch',
    description: 'Seamless development, QA testing, and deployment of your digital assets.'
  },
  {
    title: 'Optimization & Growth',
    description: 'Continuous tracking and optimization to maximize ROI.'
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
