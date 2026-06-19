// Reusable FAQ Data for different page types
// Use these with FAQSection and SchemaFAQ components

interface FAQItem {
  question: string;
  answer: string;
}

// General FAQs about Optimantix Global
export const GENERAL_FAQS: FAQItem[] = [
  {
    question: 'What services does Optimantix Global offer?',
    answer: 'We provide comprehensive digital marketing services including SEO, Google Ads, Meta Ads, E-commerce Management, Web Development, Web Design, and Hosting Solutions. Each service is customized to meet your business goals.',
  },
  {
    question: 'How long have you been in the industry?',
    answer: 'Optimantix Global has been delivering digital solutions for over 10 years. Our team has worked with hundreds of brands across various industries, helping them achieve their digital marketing objectives.',
  },
  {
    question: 'Do you work with businesses of all sizes?',
    answer: 'Yes! We work with startups, small businesses, mid-sized companies, and large enterprises. Our services are scalable and can be customized to fit any budget and business requirement.',
  },
  {
    question: 'What is your typical project timeline?',
    answer: 'Project timelines vary based on scope and complexity. SEO projects typically show results in 3-6 months, while web development projects range from 4-12 weeks. We provide detailed timelines during the project planning phase.',
  },
  {
    question: 'How do you measure success?',
    answer: 'We measure success through clear KPIs aligned with your business goals. These may include increased organic traffic, improved conversion rates, better ROAS on ads, or increased revenue. We provide regular reports and analytics.',
  },
];

// SEO Service FAQs
export const SEO_FAQS: FAQItem[] = [
  {
    question: 'How long does SEO take to show results?',
    answer: 'SEO is a long-term strategy. Most clients see noticeable improvements within 3-6 months. However, competition level, current website health, and industry factors affect the timeline. We focus on sustainable growth rather than quick fixes.',
  },
  {
    question: 'What is included in your SEO services?',
    answer: 'Our SEO services include: technical SEO audits, keyword research, on-page optimization, content strategy, link building, competitor analysis, and monthly performance reporting. We tailor the package based on your specific needs.',
  },
  {
    question: 'Do you guarantee ranking improvements?',
    answer: 'No legitimate SEO agency can guarantee specific rankings as search algorithms change frequently. We guarantee our best efforts and follow white-hat SEO practices. We focus on sustainable growth and organic traffic improvements.',
  },
  {
    question: 'How much does SEO cost?',
    answer: 'SEO pricing varies based on competition level, current website state, target keywords, and project scope. We offer flexible packages starting from small businesses to enterprise solutions. Get a custom quote for your specific needs.',
  },
  {
    question: 'Will you perform SEO on my existing website?',
    answer: 'Yes, we specialize in optimizing existing websites. We conduct thorough technical audits, fix issues, and implement optimization strategies to improve your rankings and organic traffic.',
  },
];

// Digital Marketing FAQs
export const DIGITAL_MARKETING_FAQS: FAQItem[] = [
  {
    question: 'What is the difference between SEO and PPC?',
    answer: 'SEO (organic search) builds long-term visibility and traffic without per-click costs. PPC (paid ads) provides immediate visibility but requires payment per click. Both are valuable and often used together for best results.',
  },
  {
    question: 'How do you manage PPC campaigns?',
    answer: 'We manage Google Ads, Meta Ads, and other platforms. Our process includes audience research, keyword bidding strategies, ad copywriting, A/B testing, and continuous optimization to maximize ROI.',
  },
  {
    question: 'What is a good ROI for digital marketing?',
    answer: 'ROI varies by industry and business model. A healthy ROI for most businesses is 3:1 (3 dollars back for every 1 dollar spent), but some industries achieve higher returns. We work to maximize your ROI through strategic optimization.',
  },
  {
    question: 'Can you help with social media marketing?',
    answer: 'Yes, we offer comprehensive social media management including content creation, community management, paid social advertising, and analytics. We help build your brand presence across all major platforms.',
  },
];

// Web Development FAQs
export const WEB_DEVELOPMENT_FAQS: FAQItem[] = [
  {
    question: 'Do you build mobile-friendly websites?',
    answer: 'Yes, all our websites are built with mobile-first design. We ensure your site looks great and functions perfectly on all devices—desktop, tablet, and mobile.',
  },
  {
    question: 'What technology do you use for web development?',
    answer: 'We use modern technologies including React, Node.js, TypeScript, and cloud platforms. We choose the best tech stack based on your project requirements, scalability needs, and budget.',
  },
  {
    question: 'Do you offer e-commerce solutions?',
    answer: 'Yes, we build custom e-commerce platforms with payment gateway integration, inventory management, and marketing tools. We also optimize existing e-commerce sites for better conversions.',
  },
  {
    question: 'How long does a website take to develop?',
    answer: 'Timeline depends on complexity. A basic website takes 4-6 weeks, while more complex projects can take 2-3 months. We provide a detailed timeline after understanding your requirements.',
  },
  {
    question: 'Will my website be SEO-friendly?',
    answer: 'Absolutely! All our websites are built with SEO best practices including fast loading speeds, mobile responsiveness, proper heading structure, and semantic HTML.',
  },
];

// Contact & Process FAQs
export const CONTACT_FAQS: FAQItem[] = [
  {
    question: 'How do I get started with Optimantix Global?',
    answer: 'Simply contact us through our website or call us. We\'ll discuss your goals, understand your needs, and provide a customized proposal. There\'s no obligation for initial consultation.',
  },
  {
    question: 'Do you offer free consultation?',
    answer: 'Yes, we offer free initial consultations. During this call, we understand your business, challenges, and goals. We then provide recommendations and a customized proposal.',
  },
  {
    question: 'What is your communication process?',
    answer: 'We maintain regular communication through scheduled calls, emails, and project dashboards. You\'ll get monthly performance reports and have a dedicated point of contact for your project.',
  },
  {
    question: 'Do you sign long-term contracts?',
    answer: 'We offer both short-term projects and long-term partnerships. Most clients find month-to-month engagements work best for ongoing services, while project-based work is billed per project.',
  },
  {
    question: 'What is your refund policy?',
    answer: 'We stand behind our work. If you\'re not satisfied with our services within the first 30 days, we\'ll work to improve the deliverables or discuss alternatives. Terms vary by service type.',
  },
];

// E-commerce FAQs
export const ECOMMERCE_FAQS: FAQItem[] = [
  {
    question: 'How can I improve my e-commerce sales?',
    answer: 'We help improve sales through: better product pages, optimized checkout process, strategic pricing, email marketing, paid ads, and SEO. We conduct a full audit to identify improvement opportunities.',
  },
  {
    question: 'Do you manage marketplace listings?',
    answer: 'Yes, we specialize in managing listings across multiple marketplaces including Amazon, Flipkart, Meesho, and others. We optimize product visibility, reviews, and sales performance.',
  },
  {
    question: 'How long to see e-commerce results?',
    answer: 'You can expect initial improvements within 30-45 days. Significant growth typically takes 2-3 months as we optimize listings, improve rankings, and refine your strategy based on data.',
  },
];

// Pricing & Investment FAQs
export const PRICING_FAQS: FAQItem[] = [
  {
    question: 'Are there any hidden fees?',
    answer: 'No, we\'re transparent about pricing. Our proposals clearly outline all costs, including setup fees, monthly retainers, and any additional charges. What you see is what you pay.',
  },
  {
    question: 'Do you offer flexible payment terms?',
    answer: 'Yes, we offer flexible payment options. We can work with monthly payments, quarterly invoicing, or custom payment schedules based on your cash flow needs.',
  },
  {
    question: 'Can I upgrade or downgrade my service?',
    answer: 'Yes, you can adjust your service level anytime. If you want to add services or reduce scope, we\'ll update your contract and billing accordingly.',
  },
  {
    question: 'What makes your pricing competitive?',
    answer: 'We provide premium quality services at reasonable rates. Our team expertise, proven track record, and results-driven approach justify our pricing. We offer great value for the investment.',
  },
];

// Export organized FAQ sets
export const faqDataByPage = {
  general: GENERAL_FAQS,
  seo: SEO_FAQS,
  digitalMarketing: DIGITAL_MARKETING_FAQS,
  webDevelopment: WEB_DEVELOPMENT_FAQS,
  ecommerce: ECOMMERCE_FAQS,
  contact: CONTACT_FAQS,
  pricing: PRICING_FAQS,
};

// Helper function to get FAQs by page type
export function getFAQsByPageType(pageType: keyof typeof faqDataByPage): FAQItem[] {
  return faqDataByPage[pageType] || GENERAL_FAQS;
}

// Combine multiple FAQ sets
export function combineFAQs(...faqSets: FAQItem[][]): FAQItem[] {
  const combined: FAQItem[] = [];
  const seen = new Set<string>();

  faqSets.forEach(set => {
    set.forEach(faq => {
      const key = faq.question.toLowerCase();
      if (!seen.has(key)) {
        combined.push(faq);
        seen.add(key);
      }
    });
  });

  return combined;
}
