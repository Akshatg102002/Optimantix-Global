export type ToolCategory = 'Analysis & Audit' | 'Generators' | 'Checkers & Validators' | 'Planning & Templates';

export interface FreeTool {
  name: string;
  slug: string;
  category: ToolCategory;
  icon: string;
  action: string;
  description: string;
}

export const FREE_TOOL_CATEGORIES: { title: ToolCategory; anchor: string }[] = [
  { title: 'Analysis & Audit', anchor: 'analysis-audit' },
  { title: 'Generators', anchor: 'generators' },
  { title: 'Checkers & Validators', anchor: 'checkers-validators' },
  { title: 'Planning & Templates', anchor: 'planning-templates' },
];

export const FREE_TOOLS: FreeTool[] = [
  { name: 'AEO Checker', slug: 'aeo-checker', category: 'Analysis & Audit', icon: '🔎', action: 'analyse answer-engine readiness', description: 'Check whether a page is structured to be discovered, understood, and cited by AI answer engines.' },
  { name: 'AEO Audit Tool', slug: 'aeo-audit-tool', category: 'Analysis & Audit', icon: '📋', action: 'audit your answer-engine optimisation', description: 'Run a practical AEO audit covering content clarity, entity coverage, schema, and citation signals.' },
  { name: 'AI Visibility Checker', slug: 'ai-visibility-checker', category: 'Analysis & Audit', icon: '👁️', action: 'check your AI search visibility', description: 'Evaluate how visible your brand and pages are for AI-led discovery journeys.' },
  { name: 'AI Citation Readiness', slug: 'ai-citation-readiness', category: 'Analysis & Audit', icon: '✅', action: 'measure citation readiness', description: 'Review whether your content has the trust signals AI systems need before citing it.' },
  { name: 'AI Overview Checker', slug: 'ai-overview-checker', category: 'Analysis & Audit', icon: '🧠', action: 'review AI Overview opportunities', description: 'Assess a topic or URL for AI Overview eligibility, coverage gaps, and answer quality.' },
  { name: 'AI Citation Source Radar', slug: 'ai-citation-source-radar', category: 'Analysis & Audit', icon: '📡', action: 'find citation source opportunities', description: 'Identify the third-party sources and formats most likely to influence AI citations.' },
  { name: 'GEO Audit', slug: 'geo-audit', category: 'Analysis & Audit', icon: '🌐', action: 'audit generative engine optimisation', description: 'Audit content for generative engine visibility across topics, entities, intent, and evidence.' },
  { name: 'Schema Generator', slug: 'schema-generator', category: 'Generators', icon: '🧩', action: 'generate structured data schema', description: 'Generate clean JSON-LD schema snippets for common SEO and AEO use cases.' },
  { name: 'llms.txt Generator', slug: 'llms-txt-generator', category: 'Generators', icon: '🤖', action: 'create an llms.txt file', description: 'Create a draft llms.txt file to guide AI systems toward your most useful public content.' },
  { name: 'Robots.txt Generator', slug: 'robots-txt-generator', category: 'Generators', icon: '🛠️', action: 'generate robots.txt rules', description: 'Build crawl directives that keep important pages accessible while protecting sensitive paths.' },
  { name: 'Meta Description Generator', slug: 'meta-description-generator', category: 'Generators', icon: '✍️', action: 'write meta descriptions', description: 'Generate concise, click-focused meta descriptions for SEO and AI search snippets.' },
  { name: 'AEO Query Generator', slug: 'aeo-query-generator', category: 'Generators', icon: '💬', action: 'generate answer-engine queries', description: 'Turn a topic into natural-language questions and prompts used by AI-first searchers.' },
  { name: 'Robots.txt Checker', slug: 'robots-txt-checker', category: 'Checkers & Validators', icon: '🕷️', action: 'check robots.txt accessibility', description: 'Validate whether a robots.txt file allows the crawlers and AI agents you care about.' },
  { name: 'Canonical Tag Checker', slug: 'canonical-tag-checker', category: 'Checkers & Validators', icon: '🔗', action: 'check canonical tags', description: 'Check canonical tag setup and spot duplicate-content risks before they affect rankings.' },
  { name: 'Structured Data Validator', slug: 'structured-data-validator', category: 'Checkers & Validators', icon: '🧪', action: 'validate structured data', description: 'Review JSON-LD markup for common structured data errors and missing fields.' },
  { name: 'Sitemap Validator', slug: 'sitemap-validator', category: 'Checkers & Validators', icon: '🗺️', action: 'validate sitemap URLs', description: 'Check sitemap formatting, indexability signals, and URL hygiene for discoverability.' },
  { name: 'Google Business Profile Audit', slug: 'google-business-profile-audit', category: 'Checkers & Validators', icon: '📍', action: 'audit your Google Business Profile', description: 'Review local visibility, profile completeness, categories, reviews, and conversion signals.' },
  { name: 'AEO Tools', slug: 'aeo-tools', category: 'Planning & Templates', icon: '🧰', action: 'plan your AEO workflow', description: 'Use a guided toolkit to plan answer-engine optimisation actions and priorities.' },
  { name: 'AI Citation Planner', slug: 'ai-citation-planner', category: 'Planning & Templates', icon: '🗓️', action: 'plan AI citation campaigns', description: 'Map topics, sources, and evidence assets needed to earn more AI citations.' },
  { name: 'AEO ROI Calculator', slug: 'aeo-roi-calculator', category: 'Planning & Templates', icon: '🧮', action: 'calculate AEO ROI', description: 'Estimate potential value from AI visibility, citations, and answer-led discovery.' },
  { name: 'AEO Report Template', slug: 'aeo-report-template', category: 'Planning & Templates', icon: '📄', action: 'build an AEO report', description: 'Create a practical AEO reporting outline for stakeholders and growth teams.' },
  { name: 'AI Answer Checker', slug: 'ai-answer-checker', category: 'Planning & Templates', icon: '💡', action: 'check AI answer quality', description: 'Review AI-style answers for accuracy, completeness, source quality, and brand positioning.' },
];

export const getToolBySlug = (slug?: string) => FREE_TOOLS.find(tool => tool.slug === slug);
export const getCategoryAnchor = (category: ToolCategory) => FREE_TOOL_CATEGORIES.find(item => item.title === category)?.anchor || 'free-tools';
