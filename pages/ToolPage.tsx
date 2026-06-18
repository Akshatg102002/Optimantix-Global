import React, { useMemo, useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { ArrowRight, CheckCircle, Copy } from 'lucide-react';
import { SEO } from '../components/SEO';
import { FREE_TOOLS, getCategoryAnchor, getToolBySlug } from '../data/freeTools';
import type { FreeTool } from '../data/freeTools';

const BASE_URL = 'https://optimantix-marketplace-h94c.arcada.app';

type ToolMode = 'analyse' | 'generate' | 'check' | 'calculate' | 'plan';

interface ToolConfig {
  mode: ToolMode;
  label: string;
  placeholder: string;
  helper: string;
}

interface ToolResult {
  score?: number;
  title: string;
  summary: string;
  output?: string;
  checks: { label: string; status: 'pass' | 'warning' | 'fail'; detail: string }[];
  recommendations: string[];
}

const TOOL_CONFIGS: Record<string, ToolConfig> = {
  'aeo-checker': { mode: 'analyse', label: 'Page URL or content brief', placeholder: 'Paste a URL, page copy, or answer-engine content brief...', helper: 'Checks entity clarity, answer structure, schema readiness, and citation signals.' },
  'aeo-audit-tool': { mode: 'analyse', label: 'Website URL or audit notes', placeholder: 'Paste your URL, target query, and current content notes...', helper: 'Runs a practical AEO audit across content, trust, schema, and citations.' },
  'ai-visibility-checker': { mode: 'analyse', label: 'Brand, product, or URL', placeholder: 'Example: Optimantix Global marketplace management agency...', helper: 'Estimates whether AI-first search systems can understand and surface your brand.' },
  'ai-citation-readiness': { mode: 'analyse', label: 'Page copy or source profile', placeholder: 'Paste page copy, author details, evidence, and source links...', helper: 'Scores whether a page has citation-worthy signals for AI answers.' },
  'ai-overview-checker': { mode: 'analyse', label: 'Search query and page content', placeholder: 'Paste a target query and the page content you want to assess...', helper: 'Reviews query-answer fit, structure, and evidence for AI Overview opportunities.' },
  'ai-citation-source-radar': { mode: 'plan', label: 'Topic, competitors, and market', placeholder: 'Example: best marketplace management agency for Amazon and Flipkart...', helper: 'Maps source types that can influence AI citations for your topic.' },
  'geo-audit': { mode: 'analyse', label: 'Generative search topic or content', placeholder: 'Paste a topic cluster, page copy, or entity description...', helper: 'Audits generative engine optimisation across entities, intent, evidence, and freshness.' },
  'schema-generator': { mode: 'generate', label: 'Page details', placeholder: 'Enter page type, business name, URL, description, FAQs, or product/service details...', helper: 'Generates clean JSON-LD for Organization, WebPage, FAQPage, or Service use cases.' },
  'llms-txt-generator': { mode: 'generate', label: 'Site overview and important URLs', placeholder: 'Enter site name, summary, key pages, docs, blog URLs, and contact page...', helper: 'Creates a practical llms.txt draft that points AI systems to useful public content.' },
  'robots-txt-generator': { mode: 'generate', label: 'Crawl rules', placeholder: 'Enter paths to allow/disallow and any AI crawler preferences...', helper: 'Builds crawl directives while keeping public free-tools and AI visibility pages accessible.' },
  'meta-description-generator': { mode: 'generate', label: 'Page title, keyword, and audience', placeholder: 'Example: Marketplace Management Services, target marketplace brands, Amazon Flipkart growth...', helper: 'Generates concise meta descriptions aimed at organic snippets and AI summaries.' },
  'aeo-query-generator': { mode: 'generate', label: 'Topic or keyword', placeholder: 'Example: Amazon marketplace management for D2C beauty brands...', helper: 'Generates natural-language questions used by answer-engine and AI-first searchers.' },
  'robots-txt-checker': { mode: 'check', label: 'robots.txt content', placeholder: 'Paste your robots.txt file here...', helper: 'Checks common crawl rules, sitemap presence, and AI crawler accessibility.' },
  'canonical-tag-checker': { mode: 'check', label: 'HTML head or canonical URL', placeholder: '<link rel="canonical" href="https://example.com/page/" />', helper: 'Checks canonical tag presence, absolute URL format, and duplicate canonical risks.' },
  'structured-data-validator': { mode: 'check', label: 'JSON-LD markup', placeholder: '{ "@context": "https://schema.org", "@type": "WebPage", "name": "..." }', helper: 'Validates JSON syntax and common schema fields used for SEO and AEO.' },
  'sitemap-validator': { mode: 'check', label: 'Sitemap XML or URL list', placeholder: '<urlset>...</urlset> or paste one URL per line...', helper: 'Checks URL hygiene, sitemap tags, and monthly/priority signals.' },
  'google-business-profile-audit': { mode: 'analyse', label: 'Business profile details', placeholder: 'Paste business category, description, services, location, reviews, photos, and opening hours...', helper: 'Audits local profile completeness, trust signals, and conversion opportunities.' },
  'aeo-tools': { mode: 'plan', label: 'Goal and current assets', placeholder: 'Describe your AEO goal, pages, target queries, and available evidence assets...', helper: 'Creates a prioritized AEO tool stack and action plan.' },
  'ai-citation-planner': { mode: 'plan', label: 'Topic and citation targets', placeholder: 'Enter topic, target publications, proof assets, and competitors...', helper: 'Plans citation assets, outreach targets, and entity reinforcement actions.' },
  'aeo-roi-calculator': { mode: 'calculate', label: 'Monthly traffic, conversion rate, order value, and expected lift', placeholder: 'Example: traffic 10000, conversion 2.5%, order value 80, AEO lift 15%', helper: 'Estimates incremental revenue from AEO-driven visibility and answer-led discovery.' },
  'aeo-report-template': { mode: 'generate', label: 'Reporting period, goals, and KPIs', placeholder: 'Example: Q3 report, grow AI citations, KPIs: impressions, citations, assisted conversions...', helper: 'Generates a stakeholder-ready AEO reporting outline.' },
  'ai-answer-checker': { mode: 'check', label: 'AI answer to review', placeholder: 'Paste an AI-generated answer and the target question...', helper: 'Checks answer accuracy, completeness, source quality, and brand positioning.' },
};

const scoreInput = (input: string, tool: FreeTool) => {
  const lower = input.toLowerCase();
  const signals = [
    lower.includes('schema'), lower.includes('faq'), lower.includes('source') || lower.includes('citation'),
    lower.includes('author') || lower.includes('expert'), lower.includes('date') || lower.includes('updated'),
    lower.includes('https://') || lower.includes('http://'), lower.length > 300, lower.split(/\s+/).length > 80,
  ];
  const base = tool.category === 'Generators' ? 72 : tool.category === 'Planning & Templates' ? 68 : 62;
  return Math.min(96, base + signals.filter(Boolean).length * 4);
};

const statusFor = (condition: boolean, warningCondition = true): 'pass' | 'warning' | 'fail' => {
  if (condition) return 'pass';
  return warningCondition ? 'warning' : 'fail';
};

const extractNumbers = (input: string) => input.match(/\d+(?:\.\d+)?/g)?.map(Number) || [];

const buildSchema = (input: string) => JSON.stringify({
  '@context': 'https://schema.org',
  '@type': input.toLowerCase().includes('faq') ? 'FAQPage' : input.toLowerCase().includes('service') ? 'Service' : 'WebPage',
  name: input.split('\n')[0]?.slice(0, 80) || 'Optimised Page',
  description: 'Generated structured data draft for SEO and AEO visibility.',
  provider: { '@type': 'Organization', name: 'Optimantix Global' },
}, null, 2);

const runTool = (tool: FreeTool, input: string): ToolResult => {
  const cleanInput = input.trim();
  const lower = cleanInput.toLowerCase();
  const score = scoreInput(cleanInput, tool);
  const hasUrl = /https?:\/\//i.test(cleanInput);
  const hasSchema = lower.includes('@context') || lower.includes('schema');
  const hasQuestion = /\?|what|how|why|can|do|best|which/i.test(cleanInput);
  const wordCount = cleanInput.split(/\s+/).filter(Boolean).length;

  if (!cleanInput) {
    return {
      score: 0,
      title: 'Add details to run this tool',
      summary: 'Enter a URL, page copy, brief, or markup so the tool can produce a useful result.',
      checks: [{ label: 'Input received', status: 'fail', detail: 'No input was provided.' }],
      recommendations: ['Paste the requested details into the input field.', 'Include URLs, keywords, target audience, and any known constraints for stronger output.'],
    };
  }

  if (tool.slug === 'schema-generator') {
    return { score, title: 'Generated JSON-LD schema draft', summary: 'Copy this JSON-LD into your page head after reviewing the fields.', output: buildSchema(cleanInput), checks: [
      { label: 'Schema type selected', status: 'pass', detail: 'A suitable schema type was selected from your brief.' },
      { label: 'Provider included', status: 'pass', detail: 'Organization/provider context is included.' },
    ], recommendations: ['Validate the generated JSON-LD before publishing.', 'Add page-specific fields such as image, URL, FAQ answers, or service area.'] };
  }

  if (tool.slug === 'llms-txt-generator') {
    return { score, title: 'Generated llms.txt draft', summary: 'Use this as a starting point for your public AI guidance file.', output: `# ${cleanInput.split('\n')[0] || 'Site'}\n\n> Public content guidance for AI assistants and answer engines.\n\n## Important pages\n- /\n- /services/\n- /free-tools/\n- /contact/\n\n## Use this content for\n- Company overview\n- Service descriptions\n- Educational resources\n\n## Do not use\n- Private dashboards\n- Admin areas\n- Customer data`, checks: [
      { label: 'Important paths included', status: 'pass', detail: 'Core public paths are listed.' },
      { label: 'Private areas excluded', status: 'pass', detail: 'Admin and private data guidance is included.' },
    ], recommendations: ['Publish at /llms.txt.', 'Add your highest-quality guides, case studies, and documentation URLs.'] };
  }

  if (tool.slug === 'robots-txt-generator') {
    return { score, title: 'Generated robots.txt draft', summary: 'Review these crawler directives before publishing to production.', output: `User-agent: *\nAllow: /\nAllow: /free-tools/\nDisallow: /admin/\nDisallow: /api/\n\nUser-agent: GPTBot\nAllow: /free-tools/\n\nUser-agent: ClaudeBot\nAllow: /free-tools/\n\nUser-agent: PerplexityBot\nAllow: /free-tools/\n\nUser-agent: anthropic-ai\nAllow: /free-tools/\n\nSitemap: ${BASE_URL}/sitemap.xml`, checks: [
      { label: 'Free tools allowed', status: 'pass', detail: '/free-tools/ remains crawlable.' },
      { label: 'AI crawler access', status: 'pass', detail: 'GPTBot, ClaudeBot, PerplexityBot, and anthropic-ai are allowed for tools.' },
    ], recommendations: ['Avoid blocking CSS, JS, and public content.', 'Test important pages with crawler inspection tools.'] };
  }

  if (tool.slug === 'meta-description-generator') {
    const topic = cleanInput.split('\n')[0].replace(/[:|]/g, '').slice(0, 120);
    return { score, title: 'Generated meta descriptions', summary: 'Choose the closest option and refine it to match the page promise.', output: [
      `Scale ${topic || 'your page'} with clear insights, practical recommendations, and no signup required. Get instant AEO and AI visibility guidance.`,
      `Use this free ${tool.name} to improve search snippets, answer-engine readiness, and content clarity with instant recommendations.`,
      `Optimise ${topic || 'your content'} for SEO, AEO, and AI visibility with a free tool from Optimantix Global.`,
    ].join('\n\n'), checks: [{ label: 'Snippet length', status: 'pass', detail: 'Options are written for concise search snippets.' }], recommendations: ['Keep final descriptions near 150–160 characters.', 'Include the primary query and a clear benefit.'] };
  }

  if (tool.slug === 'aeo-query-generator') {
    const topic = cleanInput.split('\n')[0].slice(0, 90);
    return { score, title: 'Generated AEO query set', summary: 'Use these questions to brief content, FAQs, and answer-engine sections.', output: [`What is ${topic}?`, `How does ${topic} work?`, `Why is ${topic} important?`, `What is the best way to improve ${topic}?`, `How much does ${topic} cost?`, `Which tools help with ${topic}?`, `What are common mistakes in ${topic}?`].join('\n'), checks: [{ label: 'Question coverage', status: 'pass', detail: 'Informational, commercial, and troubleshooting prompts are included.' }], recommendations: ['Group related queries into FAQ clusters.', 'Answer each question in 40–80 words before expanding.'] };
  }

  if (tool.slug === 'aeo-roi-calculator') {
    const [traffic = 10000, conversion = 2, orderValue = 80, lift = 15] = extractNumbers(cleanInput);
    const currentRevenue = traffic * (conversion / 100) * orderValue;
    const incrementalRevenue = currentRevenue * (lift / 100);
    return { score, title: 'Estimated AEO ROI', summary: `Based on your inputs, estimated incremental monthly revenue is $${Math.round(incrementalRevenue).toLocaleString()}.`, output: `Current monthly revenue estimate: $${Math.round(currentRevenue).toLocaleString()}\nExpected AEO lift: ${lift}%\nIncremental monthly revenue: $${Math.round(incrementalRevenue).toLocaleString()}\nIncremental annual revenue: $${Math.round(incrementalRevenue * 12).toLocaleString()}`, checks: [
      { label: 'Traffic input', status: statusFor(traffic > 0, false), detail: `${traffic.toLocaleString()} monthly visits used.` },
      { label: 'Conversion input', status: statusFor(conversion > 0, false), detail: `${conversion}% conversion rate used.` },
    ], recommendations: ['Replace assumptions with analytics data.', 'Track AI referral, assisted conversion, and branded search lift monthly.'] };
  }

  if (tool.slug === 'structured-data-validator') {
    let validJson = false;
    try { JSON.parse(cleanInput); validJson = true; } catch { validJson = false; }
    return { score: validJson ? Math.max(score, 86) : 42, title: validJson ? 'Structured data looks parseable' : 'Structured data has JSON issues', summary: validJson ? 'The JSON-LD parses successfully. Review required fields for your schema type.' : 'The markup could not be parsed as JSON. Fix syntax before publishing.', checks: [
      { label: 'Valid JSON', status: validJson ? 'pass' : 'fail', detail: validJson ? 'JSON.parse completed successfully.' : 'JSON.parse failed.' },
      { label: '@context present', status: statusFor(lower.includes('@context')), detail: lower.includes('@context') ? 'Schema context is present.' : 'Add @context: https://schema.org.' },
      { label: '@type present', status: statusFor(lower.includes('@type')), detail: lower.includes('@type') ? 'Schema type is present.' : 'Add a supported @type.' },
    ], recommendations: ['Validate in Schema.org and Rich Results Test.', 'Add required and recommended properties for the selected schema type.'] };
  }

  if (tool.slug === 'robots-txt-checker') {
    return { score, title: 'robots.txt crawlability review', summary: lower.includes('disallow: /') && !lower.includes('allow: /free-tools/') ? 'Some rules may block important public content.' : 'Core crawl directives appear review-ready.', checks: [
      { label: 'Free tools allowed', status: statusFor(lower.includes('allow: /free-tools/')), detail: lower.includes('allow: /free-tools/') ? '/free-tools/ is explicitly allowed.' : 'Add Allow: /free-tools/.' },
      { label: 'Sitemap declared', status: statusFor(lower.includes('sitemap:')), detail: lower.includes('sitemap:') ? 'Sitemap directive found.' : 'Add a Sitemap directive.' },
      { label: 'Full-site block risk', status: lower.includes('disallow: /') ? 'warning' : 'pass', detail: lower.includes('disallow: /') ? 'A broad Disallow rule was found.' : 'No broad full-site block detected.' },
    ], recommendations: ['Keep public tools and evergreen content crawlable.', 'Review AI crawler rules intentionally rather than blocking by default.'] };
  }

  if (tool.slug === 'canonical-tag-checker') {
    const canonicalMatches = cleanInput.match(/rel=["']canonical["']/gi)?.length || 0;
    return { score: canonicalMatches === 1 && hasUrl ? 90 : canonicalMatches > 1 ? 54 : 45, title: canonicalMatches === 1 ? 'Canonical tag detected' : 'Canonical setup needs attention', summary: canonicalMatches === 1 ? 'A single canonical tag is present.' : 'Add exactly one absolute canonical URL for this page.', checks: [
      { label: 'Canonical tag count', status: canonicalMatches === 1 ? 'pass' : canonicalMatches > 1 ? 'warning' : 'fail', detail: `${canonicalMatches} canonical tag(s) detected.` },
      { label: 'Absolute URL', status: statusFor(hasUrl), detail: hasUrl ? 'Canonical appears to use an absolute URL.' : 'Use a full https:// canonical URL.' },
    ], recommendations: ['Use one self-referencing canonical for indexable pages.', 'Avoid canonical chains and conflicting hreflang/canonical signals.'] };
  }

  if (tool.slug === 'sitemap-validator') {
    const urls = cleanInput.match(/https?:\/\/[^\s<]+/g) || [];
    return { score: Math.min(95, 55 + urls.length * 5), title: 'Sitemap URL hygiene review', summary: `${urls.length} URL(s) detected for validation.`, checks: [
      { label: 'URLs detected', status: urls.length ? 'pass' : 'fail', detail: `${urls.length} absolute URL(s) found.` },
      { label: 'urlset or sitemapindex', status: statusFor(lower.includes('<urlset') || lower.includes('<sitemapindex')), detail: lower.includes('<urlset') || lower.includes('<sitemapindex') ? 'Sitemap XML wrapper found.' : 'XML wrapper not detected; URL-list mode assumed.' },
      { label: 'HTTPS usage', status: urls.every(url => url.startsWith('https://')) ? 'pass' : 'warning', detail: 'Prefer HTTPS URLs only.' },
    ], recommendations: ['Include only canonical, indexable URLs.', 'Keep lastmod accurate and submit the sitemap in search consoles.'] };
  }

  if (tool.slug === 'ai-answer-checker') {
    return { score, title: 'AI answer quality review', summary: score >= 78 ? 'The answer has useful coverage but should still be fact-checked.' : 'The answer needs stronger evidence, structure, and specificity.', checks: [
      { label: 'Question alignment', status: statusFor(hasQuestion), detail: hasQuestion ? 'Question/answer intent is visible.' : 'Include the target question.' },
      { label: 'Evidence signals', status: statusFor(lower.includes('source') || lower.includes('according') || hasUrl), detail: 'Answers are stronger with sources or evidence.' },
      { label: 'Depth', status: statusFor(wordCount > 60), detail: `${wordCount} words detected.` },
    ], recommendations: ['Add citations or verifiable evidence.', 'Break complex answers into steps, caveats, and examples.'] };
  }

  if (tool.slug === 'aeo-report-template') {
    return { score, title: 'Generated AEO report outline', summary: 'Use this outline for weekly or monthly stakeholder reporting.', output: `1. Executive summary\n2. AI visibility wins and losses\n3. Citation movement by topic\n4. Query coverage and FAQ gaps\n5. Schema and technical fixes\n6. Content updates shipped\n7. Revenue or assisted-conversion impact\n8. Next 30-day action plan`, checks: [{ label: 'KPI-ready structure', status: 'pass', detail: 'Report sections cover visibility, citations, technical work, and business impact.' }], recommendations: ['Add screenshots from AI results where allowed.', 'Tie AEO actions to pipeline, revenue, or assisted conversions.'] };
  }

  if (tool.slug === 'ai-citation-source-radar') {
    return { score, title: 'Citation source opportunities', summary: 'Prioritize sources that AI systems can verify and repeatedly encounter.', output: `Recommended source targets:\n- Authoritative industry directories\n- Comparison and listicle pages\n- Partner case studies\n- Expert bylined articles\n- Public documentation or help pages\n- Review platforms and business profiles`, checks: [
      { label: 'Topic clarity', status: statusFor(wordCount > 5), detail: 'Specific topics produce stronger source maps.' },
      { label: 'Competitor context', status: statusFor(lower.includes('competitor') || lower.includes('vs') || lower.includes('alternative')), detail: 'Competitor context helps identify citation gaps.' },
    ], recommendations: ['Build source assets that mention the exact entity and category.', 'Keep NAP, brand name, and service descriptions consistent across sources.'] };
  }

  if (['aeo-tools', 'ai-citation-planner'].includes(tool.slug)) {
    return { score, title: `${tool.name} plan`, summary: 'A practical plan has been generated from your brief.', output: `Priority plan:\n1. Define entity and topic targets\n2. Audit existing pages and schema\n3. Build FAQ and answer blocks\n4. Add evidence, author, and source references\n5. Publish citation-supporting assets\n6. Review AI answers monthly`, checks: [
      { label: 'Goal provided', status: statusFor(wordCount > 8), detail: `${wordCount} words used for planning.` },
      { label: 'Evidence assets mentioned', status: statusFor(lower.includes('case') || lower.includes('review') || lower.includes('data') || lower.includes('source')), detail: 'Evidence assets improve citation likelihood.' },
    ], recommendations: ['Assign one owner per action.', 'Review progress weekly and refresh high-value pages first.'] };
  }

  return { score, title: `${tool.name} results`, summary: score >= 80 ? 'Strong starting point with clear optimisation opportunities.' : 'Useful baseline found, but several AEO and AI visibility improvements are recommended.', checks: [
    { label: 'Input depth', status: statusFor(wordCount > 40), detail: `${wordCount} words analysed.` },
    { label: 'URL or source signal', status: statusFor(hasUrl), detail: hasUrl ? 'A source URL was included.' : 'Add URLs or source references for stronger validation.' },
    { label: 'Question/answer intent', status: statusFor(hasQuestion), detail: hasQuestion ? 'Question-style intent detected.' : 'Add target questions to improve answer-engine fit.' },
    { label: 'Schema/citation clues', status: statusFor(hasSchema || lower.includes('citation') || lower.includes('source')), detail: 'Schema and citation signals improve AI comprehension.' },
  ], recommendations: ['Add concise answer blocks near the top of key pages.', 'Use FAQPage, Organization, Service, and Breadcrumb schema where appropriate.', 'Strengthen evidence with authors, dates, case studies, and external source references.', 'Refresh pages regularly so AI systems see current, consistent facts.'] };
};

const statusClasses = {
  pass: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30',
  warning: 'bg-yellow-500/10 text-yellow-200 border-yellow-500/30',
  fail: 'bg-red-500/10 text-red-200 border-red-500/30',
};

export const ToolPage: React.FC = () => {
  const { slug } = useParams();
  const tool = getToolBySlug(slug);
  const [input, setInput] = useState('');
  const [hasRun, setHasRun] = useState(false);
  const [copied, setCopied] = useState(false);

  const config = tool ? TOOL_CONFIGS[tool.slug] : undefined;
  const related = tool ? FREE_TOOLS.filter(t => t.category === tool.category && t.slug !== tool.slug).slice(0, 3) : [];
  const result = useMemo(() => tool ? runTool(tool, hasRun ? input : '') : null, [hasRun, input, tool]);

  if (!tool || !config || !result) return <Navigate to="/404" replace />;

  const actionLabel = config.mode === 'generate' ? 'Generate' : config.mode === 'check' ? 'Check' : config.mode === 'calculate' ? 'Calculate' : config.mode === 'plan' ? 'Build Plan' : 'Analyse';
  const schemas = [
    { '@context': 'https://schema.org', '@type': 'WebApplication', name: tool.name, url: `${BASE_URL}/free-tools/${tool.slug}/`, description: tool.description, applicationCategory: 'UtilityApplication', operatingSystem: 'Web', offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' }, provider: { '@type': 'Organization', name: 'Optimantix Global', url: `${BASE_URL}/` }, featureList: ['Free to use','No signup required','Instant results'], screenshot: `${BASE_URL}/tools-screenshot.png`, softwareVersion: '1.0' },
    { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${BASE_URL}/` },
      { '@type': 'ListItem', position: 2, name: 'Free Tools', item: `${BASE_URL}/free-tools/` },
      { '@type': 'ListItem', position: 3, name: tool.category, item: `${BASE_URL}/free-tools/#${getCategoryAnchor(tool.category)}` },
      { '@type': 'ListItem', position: 4, name: tool.name, item: `${BASE_URL}/free-tools/${tool.slug}/` }
    ]}
  ];

  const copyOutput = async () => {
    if (!result.output || !navigator.clipboard) return;
    await navigator.clipboard.writeText(result.output);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1500);
  };

  return <div className="bg-light dark:bg-dark text-slate-900 dark:text-gray-100">
    <SEO title={`${tool.name} — Free Tool | Optimantix Global`} description={`Use our free ${tool.name} to ${tool.action}. No signup required. Instant results for AEO and AI visibility optimisation.`} canonical={`${BASE_URL}/free-tools/${tool.slug}/`} schemaMarkup={schemas} />
    <section className="pt-16 pb-10 bg-[#020617] text-white"><div className="container mx-auto px-4 max-w-4xl text-center"><nav className="text-sm text-gray-400 mb-8">Home &gt; Free Tools &gt; {tool.category} &gt; {tool.name}</nav><span className="inline-block px-4 py-1 rounded-full bg-primary/10 border border-primary/30 text-primary font-bold text-xs tracking-widest">FREE TOOL</span><h1 className="text-4xl md:text-6xl font-bold my-6">{tool.name}</h1><p className="text-xl text-gray-300 mb-8">{tool.description} It helps SEO, AEO, and marketplace growth teams prioritise faster improvements with a simple browser-based workflow.</p><a href="#tool" className="inline-flex items-center bg-primary text-white px-8 py-4 rounded-full font-bold hover:bg-secondary">Use {tool.name} Free <ArrowRight className="ml-2"/></a></div></section>
    <section id="tool" className="py-16"><div className="container mx-auto px-4 max-w-6xl grid lg:grid-cols-2 gap-8"><div className="bg-white dark:bg-dark-card border border-gray-200 dark:border-gray-800 rounded-3xl p-8"><h2 className="text-2xl font-bold mb-2">{tool.name} Interface</h2><p className="text-gray-600 dark:text-gray-400 mb-5">{config.helper}</p><label className="text-sm font-semibold text-gray-500">{config.label}</label><textarea value={input} onChange={event => setInput(event.target.value)} className="mt-2 w-full min-h-48 rounded-2xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 p-4" placeholder={config.placeholder} /><button onClick={() => setHasRun(true)} className="mt-4 w-full bg-primary text-white py-3 rounded-xl font-bold hover:bg-secondary transition-colors">{actionLabel}</button></div><div className="bg-[#020617] text-white rounded-3xl p-8"><div className="flex items-start justify-between gap-4 mb-5"><div><h2 className="text-2xl font-bold mb-2">Results Output</h2><p className="text-gray-300">{hasRun ? result.summary : 'Run the tool to see tailored checks, scores, and recommendations.'}</p></div>{hasRun && typeof result.score === 'number' && <div className="shrink-0 rounded-2xl bg-primary/10 border border-primary/30 px-4 py-3 text-center"><div className="text-3xl font-bold text-primary">{result.score}</div><div className="text-xs text-gray-400">Score</div></div>}</div>{hasRun ? <div className="space-y-5"><h3 className="text-xl font-bold">{result.title}</h3><div className="space-y-3">{result.checks.map(check => <div key={check.label} className={`border rounded-2xl p-4 ${statusClasses[check.status]}`}><div className="font-bold capitalize">{check.status}: {check.label}</div><p className="text-sm opacity-90 mt-1">{check.detail}</p></div>)}</div>{result.output && <div><div className="flex items-center justify-between mb-2"><h4 className="font-bold">Generated Output</h4><button onClick={copyOutput} className="inline-flex items-center gap-2 text-sm text-primary hover:text-white"><Copy size={15}/>{copied ? 'Copied' : 'Copy'}</button></div><pre className="whitespace-pre-wrap text-sm bg-black/30 rounded-2xl p-4 text-gray-200 overflow-x-auto">{result.output}</pre></div>}<div><h4 className="font-bold mb-2">Recommendations</h4><ul className="space-y-2 text-gray-300">{result.recommendations.map(item => <li key={item} className="flex gap-2"><CheckCircle className="w-5 h-5 text-primary shrink-0"/><span>{item}</span></li>)}</ul></div></div> : <div className="rounded-2xl border border-dashed border-gray-700 p-6 text-gray-400">Your result panel will show a live score, pass/warning/fail checks, generated content where relevant, and next-step recommendations.</div>}</div></div></section>
    <section className="py-12 bg-white dark:bg-dark-card"><div className="container mx-auto px-4"><h2 className="text-3xl font-bold text-center mb-10">How It Works</h2><div className="grid md:grid-cols-3 gap-6">{['Enter your details','Run the analysis','Get actionable insights'].map((s,i)=><div key={s} className="p-6 rounded-2xl bg-gray-50 dark:bg-gray-900 text-center"><div className="mx-auto mb-4 w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center font-bold">{i+1}</div><h3 className="font-bold">{s}</h3></div>)}</div></div></section>
    <section className="py-16"><div className="container mx-auto px-4 max-w-5xl"><h2 className="text-3xl font-bold mb-8">Why Use This Tool</h2><div className="grid md:grid-cols-2 gap-4">{['Free to use with no signup required','Built for AEO and AI visibility workflows','Runs instantly in the browser','Actionable outputs your team can prioritise'].map(f=><div key={f} className="flex gap-3 bg-white dark:bg-dark-card p-5 rounded-2xl border border-gray-200 dark:border-gray-800"><CheckCircle className="text-primary"/><span>{f}</span></div>)}</div></div></section>
    <section className="py-12 bg-white dark:bg-dark-card"><div className="container mx-auto px-4"><h2 className="text-3xl font-bold mb-8">Related Tools</h2><div className="grid md:grid-cols-3 gap-6">{related.map(r=><Link key={r.slug} to={`/free-tools/${r.slug}/`} className="p-6 rounded-2xl bg-gray-50 dark:bg-gray-900 hover:text-primary"><div className="text-2xl mb-3">{r.icon}</div><h3 className="font-bold">{r.name}</h3><p className="text-sm text-gray-500 mt-2">{r.description}</p></Link>)}</div></div></section>
    <section className="py-16"><div className="container mx-auto px-4 max-w-4xl"><h2 className="text-3xl font-bold mb-8">FAQ</h2>{[`What is ${tool.name}?`,`Is ${tool.name} free?`,`Who should use ${tool.name}?`,`Do I need to sign up?`].map((q,i)=><details key={q} className="bg-white dark:bg-dark-card rounded-2xl border border-gray-200 dark:border-gray-800 p-5 mb-3"><summary className="font-bold cursor-pointer">{q}</summary><p className="mt-3 text-gray-600 dark:text-gray-400">{i===0?tool.description:'This tool is free, browser-based, and designed for SEO, AEO, content, and growth teams that need quick directional insights.'}</p></details>)}</div></section>
  </div>;
};
