import React, { useMemo, useState, useEffect, useCallback, useRef } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import {
  ArrowRight, CheckCircle, XCircle, AlertTriangle, Copy, Download,
  Check, Plus, Trash, Loader2, ChevronDown, ChevronUp, Globe,
  FileText, FileJson, BarChart3, Search, Layers, Cpu, RefreshCw,
  Shield, Link2, Map, Calculator, Zap
} from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { FREE_TOOLS, getToolBySlug } from '../data/freeTools';
import type { FreeTool } from '../data/freeTools';
import { SITE_URL, truncateDescription } from '../data/seoData';

// ─── Types ────────────────────────────────────────────────────────────────────

interface CheckItem {
  label: string;
  status: 'pass' | 'warning' | 'fail' | 'info';
  detail: string;
  value?: string;
  explanation?: string;
}

interface ToolResult {
  score?: number;
  title: string;
  summary: string;
  output?: string;
  outputLanguage?: 'json' | 'xml' | 'txt' | 'html';
  checks: CheckItem[];
  recommendations: string[];
  rawContent?: string;
}

interface CrawlResponse {
  html?: string;
  status?: number;
  finalUrl?: string;
  content?: string;
  url?: string;
  found?: boolean;
  error?: string;
}

// ─── Server API Calls ─────────────────────────────────────────────────────────

async function serverCrawl(url: string): Promise<CrawlResponse> {
  try {
    const res = await fetch('/api/crawl', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url }),
    });
    return await res.json() as CrawlResponse;
  } catch {
    return { error: 'Server unreachable. Make sure the Express server is running.' };
  }
}

async function serverRobots(url: string): Promise<CrawlResponse> {
  try {
    const res = await fetch('/api/check-robots', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url }),
    });
    return await res.json() as CrawlResponse;
  } catch {
    return { error: 'Server unreachable.' };
  }
}

async function serverSitemap(url: string): Promise<CrawlResponse> {
  try {
    const res = await fetch('/api/check-sitemap', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url }),
    });
    return await res.json() as CrawlResponse;
  } catch {
    return { error: 'Server unreachable.' };
  }
}

// ─── Score Ring ───────────────────────────────────────────────────────────────

const ScoreRing: React.FC<{ score: number }> = ({ score }) => {
  const r = 42;
  const circ = 2 * Math.PI * r;
  const pct = Math.max(0, Math.min(100, score));
  const dash = (pct / 100) * circ;
  const color = pct >= 75 ? '#10b981' : pct >= 50 ? '#f59e0b' : '#ef4444';
  const label = pct >= 75 ? 'Good' : pct >= 50 ? 'Needs Work' : 'Poor';

  return (
    <div className="flex flex-col items-center gap-1">
      <svg width="100" height="100" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r={r} fill="none" stroke="#1e293b" strokeWidth="8" />
        <circle
          cx="50" cy="50" r={r} fill="none"
          stroke={color} strokeWidth="8"
          strokeDasharray={`${dash} ${circ}`}
          strokeLinecap="round"
          transform="rotate(-90 50 50)"
          style={{ transition: 'stroke-dasharray 1s ease' }}
        />
        <text x="50" y="46" textAnchor="middle" fill={color} fontSize="20" fontWeight="800" fontFamily="monospace">{pct}</text>
        <text x="50" y="60" textAnchor="middle" fill="#64748b" fontSize="9" fontWeight="600">/100</text>
      </svg>
      <span className="text-xs font-bold" style={{ color }}>{label}</span>
    </div>
  );
};

// ─── Check Row ────────────────────────────────────────────────────────────────

const CheckRow: React.FC<{ check: CheckItem }> = ({ check }) => {
  const [open, setOpen] = useState(false);
  const icon = check.status === 'pass'
    ? <CheckCircle size={15} className="text-emerald-400 mt-0.5 shrink-0" />
    : check.status === 'warning'
      ? <AlertTriangle size={15} className="text-amber-400 mt-0.5 shrink-0" />
      : check.status === 'info'
        ? <Zap size={15} className="text-blue-400 mt-0.5 shrink-0" />
        : <XCircle size={15} className="text-rose-400 mt-0.5 shrink-0" />;

  return (
    <div className="rounded-xl bg-slate-900/60 border border-slate-800/80 overflow-hidden">
      <div className="flex gap-3 items-start p-3">
        {icon}
        <div className="flex-1 min-w-0">
          <div className="font-bold text-xs text-slate-200">{check.label}</div>
          <div className="text-[11px] text-slate-400 mt-0.5 font-medium leading-normal">{check.detail}</div>
          {check.value && (
            <div className="mt-1 text-[10px] font-mono text-slate-500 bg-black/30 px-2 py-0.5 rounded truncate">{check.value}</div>
          )}
        </div>
        {check.explanation && (
          <button onClick={() => setOpen(o => !o)} className="shrink-0 text-slate-600 hover:text-slate-400 transition-colors">
            {open ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          </button>
        )}
      </div>
      {open && check.explanation && (
        <div className="px-4 pb-3 text-[11px] text-slate-400 leading-relaxed border-t border-slate-800/60 pt-2">
          {check.explanation}
        </div>
      )}
    </div>
  );
};

// ─── Tool Engines ─────────────────────────────────────────────────────────────

// 1. AEO Audit Tool
async function runAeoAudit(url: string): Promise<ToolResult> {
  const data = await serverCrawl(url);
  if (data.error || !data.html) {
    return {
      title: 'Crawl Failed',
      summary: data.error ?? 'Could not fetch the page. Check the URL and try again.',
      checks: [{ label: 'Connection', status: 'fail', detail: data.error ?? 'No HTML returned.' }],
      recommendations: ['Ensure the URL is correct and publicly accessible.'],
    };
  }

  const doc = new DOMParser().parseFromString(data.html, 'text/html');

  const schemaNodes = Array.from(doc.querySelectorAll('script[type="application/ld+json"]'));
  const schemaTypes = schemaNodes.map(n => {
    try { return (JSON.parse(n.textContent ?? '') as Record<string, unknown>)['@type'] ?? 'Unknown'; } catch { return 'Invalid JSON'; }
  });

  const title = doc.querySelector('title')?.textContent?.trim() ?? '';
  const metaDesc = doc.querySelector('meta[name="description"]')?.getAttribute('content')?.trim() ?? '';
  const canonical = doc.querySelector('link[rel="canonical"]')?.getAttribute('href')?.trim() ?? '';
  const metaRobots = doc.querySelector('meta[name="robots"]')?.getAttribute('content')?.toLowerCase() ?? '';
  const h1s = doc.querySelectorAll('h1');
  const h2s = doc.querySelectorAll('h2');
  const ogTitle = doc.querySelector('meta[property="og:title"]')?.getAttribute('content') ?? '';
  const ogDesc = doc.querySelector('meta[property="og:description"]')?.getAttribute('content') ?? '';
  const ogImage = doc.querySelector('meta[property="og:image"]')?.getAttribute('content') ?? '';
  const twitterCard = doc.querySelector('meta[name="twitter:card"]')?.getAttribute('content') ?? '';
  const viewport = doc.querySelector('meta[name="viewport"]')?.getAttribute('content') ?? '';
  const favicon = doc.querySelector('link[rel~="icon"]')?.getAttribute('href') ?? '';

  const noindex = metaRobots.includes('noindex');

  // Scoring
  let score = 0;
  if (schemaNodes.length > 0) score += 20;
  else if (schemaNodes.length === 0) score += 0;
  if (title.length >= 30 && title.length <= 65) score += 10;
  else if (title.length > 0) score += 5;
  if (metaDesc.length >= 100 && metaDesc.length <= 160) score += 10;
  else if (metaDesc.length > 0) score += 5;
  if (h1s.length === 1) score += 10;
  if (canonical) score += 15;
  if (ogTitle && ogDesc && ogImage) score += 10;
  else if (ogTitle || ogDesc) score += 5;
  if (!noindex) score += 10;
  if (h2s.length >= 2) score += 10;
  if (viewport) score += 5;

  const checks: CheckItem[] = [
    {
      label: 'JSON-LD Schema',
      status: schemaNodes.length > 0 ? 'pass' : 'fail',
      detail: schemaNodes.length > 0
        ? `${schemaNodes.length} schema block${schemaNodes.length > 1 ? 's' : ''} found: ${schemaTypes.join(', ')}`
        : 'No structured data found.',
      value: schemaTypes.length ? schemaTypes.join(', ') : undefined,
      explanation: 'Schema markup helps search engines and AI answer engines understand your page content. Missing schema = lower chance of rich results.',
    },
    {
      label: 'Title Tag',
      status: title.length >= 30 && title.length <= 65 ? 'pass' : title.length > 0 ? 'warning' : 'fail',
      detail: title.length > 0
        ? `${title.length} characters. ${title.length < 30 ? 'Too short (aim 50–65).' : title.length > 65 ? 'Too long (may be truncated).' : 'Optimal length.'}`
        : 'Missing title tag.',
      value: title || undefined,
      explanation: 'Title tags are the primary signal for both search ranking and click-through rate. Optimal range is 50–65 characters.',
    },
    {
      label: 'Meta Description',
      status: metaDesc.length >= 100 && metaDesc.length <= 160 ? 'pass' : metaDesc.length > 0 ? 'warning' : 'fail',
      detail: metaDesc.length > 0
        ? `${metaDesc.length} characters. ${metaDesc.length < 100 ? 'Too short.' : metaDesc.length > 160 ? 'Too long (may be truncated in SERPs).' : 'Optimal.'}`
        : 'No meta description.',
      value: metaDesc ? metaDesc.slice(0, 80) + (metaDesc.length > 80 ? '…' : '') : undefined,
      explanation: 'Meta descriptions appear in search results and directly affect click-through rates. Target 120–155 characters.',
    },
    {
      label: 'H1 Tag',
      status: h1s.length === 1 ? 'pass' : h1s.length === 0 ? 'fail' : 'warning',
      detail: h1s.length === 1
        ? `One H1 found: "${h1s[0].textContent?.trim().slice(0, 60)}"`
        : h1s.length === 0 ? 'No H1 tag found.' : `${h1s.length} H1 tags found — use exactly one.`,
      value: h1s.length ? h1s[0].textContent?.trim() : undefined,
      explanation: 'A single, descriptive H1 tag signals the primary topic to search engines and AEO systems.',
    },
    {
      label: 'H2 Structure',
      status: h2s.length >= 2 ? 'pass' : h2s.length === 1 ? 'warning' : 'fail',
      detail: `${h2s.length} H2 tags found. ${h2s.length < 2 ? 'Add more subheadings for content structure.' : 'Good content hierarchy.'}`,
      explanation: 'Multiple H2 tags signal well-structured content, which AEO systems prefer for extracting direct answers.',
    },
    {
      label: 'Canonical Tag',
      status: canonical ? 'pass' : 'fail',
      detail: canonical ? `Canonical set correctly.` : 'No canonical tag — risk of duplicate content penalties.',
      value: canonical || undefined,
      explanation: 'Canonical tags prevent duplicate content issues and consolidate link equity to the preferred URL.',
    },
    {
      label: 'Open Graph Tags',
      status: ogTitle && ogDesc && ogImage ? 'pass' : ogTitle ? 'warning' : 'fail',
      detail: [
        ogTitle ? '✓ og:title' : '✗ og:title missing',
        ogDesc ? '✓ og:description' : '✗ og:description missing',
        ogImage ? '✓ og:image' : '✗ og:image missing',
      ].join(' · '),
      explanation: 'Open Graph tags control how your page appears when shared on social media and are increasingly used by AI crawlers.',
    },
    {
      label: 'Twitter / X Card',
      status: twitterCard ? 'pass' : 'warning',
      detail: twitterCard ? `twitter:card = "${twitterCard}"` : 'No Twitter card meta tag.',
      explanation: 'Twitter card tags improve appearance in X (Twitter) shares and are also read by some AI answer engines.',
    },
    {
      label: 'Robots Meta',
      status: noindex ? 'fail' : 'pass',
      detail: noindex ? 'Page is set to noindex — will NOT appear in search results.' : metaRobots ? `Robots: ${metaRobots}` : 'No robots meta (default: indexable).',
      value: metaRobots || 'index, follow (default)',
      explanation: 'The meta robots tag controls whether search engines index and follow this page.',
    },
    {
      label: 'Mobile Viewport',
      status: viewport ? 'pass' : 'fail',
      detail: viewport ? 'Viewport meta tag present.' : 'Missing viewport meta — page may not render correctly on mobile.',
      value: viewport || undefined,
    },
  ];

  const recs: string[] = [];
  if (schemaNodes.length === 0) recs.push('Add JSON-LD structured data (at minimum: Organization or WebPage schema).');
  if (title.length === 0) recs.push('Add a descriptive title tag (50–65 characters).');
  if (metaDesc.length === 0) recs.push('Add a meta description (120–155 characters).');
  if (h1s.length !== 1) recs.push('Ensure exactly one H1 tag on the page matching the primary keyword.');
  if (!canonical) recs.push('Add a canonical tag to prevent duplicate content issues.');
  if (!ogImage) recs.push('Add og:image for better social sharing appearance.');
  if (h2s.length < 2) recs.push('Add more H2 subheadings to improve content structure.');

  return {
    score,
    title: 'AEO Audit Complete',
    summary: `Analysed ${url}. Found ${schemaNodes.length} schema block(s), ${h1s.length} H1 tag(s), ${h2s.length} H2 tag(s).`,
    checks,
    recommendations: recs.slice(0, 5),
  };
}

// 2. AEO Content Checker
function runAeoChecker(text: string): ToolResult {
  const words = text.trim().split(/\s+/).filter(Boolean);
  const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 3);
  const questions = text.split(/\n/).filter(l => l.trim().endsWith('?'));
  const listLines = text.split(/\n/).filter(l => /^[\-\*\d+\.]/.test(l.trim()));
  const headingLines = text.split(/\n/).filter(l => /^#+\s/.test(l.trim()) || (l === l.toUpperCase() && l.trim().length > 5));
  const avgWordsPerSentence = sentences.length > 0 ? Math.round(words.length / sentences.length) : 0;
  const ctaWords = ['contact', 'call', 'get', 'book', 'free', 'start', 'try', 'buy', 'order', 'schedule'];
  const hasCta = ctaWords.some(w => text.toLowerCase().includes(w));
  const hasStats = /\d+%|\d+x|\$\d+|₹\d+|\d+ (clients|brands|years|months)/.test(text);

  const wc = words.length;
  const score =
    (wc >= 800 ? 20 : wc >= 400 ? 12 : 5) +
    (questions.length >= 2 ? 20 : questions.length === 1 ? 10 : 0) +
    (listLines.length >= 3 ? 15 : listLines.length >= 1 ? 8 : 0) +
    (headingLines.length >= 2 ? 15 : headingLines.length >= 1 ? 8 : 0) +
    (avgWordsPerSentence >= 10 && avgWordsPerSentence <= 22 ? 15 : 8) +
    (hasCta ? 10 : 0) +
    (hasStats ? 5 : 0);

  const checks: CheckItem[] = [
    {
      label: 'Word Count',
      status: wc >= 800 ? 'pass' : wc >= 400 ? 'warning' : 'fail',
      detail: `${wc} words. ${wc < 400 ? 'Too thin — AEO content should be 800+ words.' : wc < 800 ? 'Acceptable but aim for 800–2000.' : 'Good depth.'}`,
      value: `${wc} words`,
      explanation: 'Longer, well-structured content has higher citation potential in AI answer engines.',
    },
    {
      label: 'Question Structure',
      status: questions.length >= 2 ? 'pass' : questions.length === 1 ? 'warning' : 'fail',
      detail: `${questions.length} question${questions.length !== 1 ? 's' : ''} found. ${questions.length < 2 ? 'Add Q&A sections — AEO thrives on direct answers.' : 'Good Q&A structure.'}`,
      value: questions.length ? questions[0].trim().slice(0, 80) : undefined,
      explanation: 'AI answer engines extract Q&A pairs directly. Pages structured as questions + answers get cited more often.',
    },
    {
      label: 'List / Bullet Usage',
      status: listLines.length >= 3 ? 'pass' : listLines.length >= 1 ? 'warning' : 'fail',
      detail: `${listLines.length} list item${listLines.length !== 1 ? 's' : ''} detected. Lists improve scannability and AEO extraction.`,
      explanation: 'Structured lists are easily extracted by answer engines. Use them for steps, features, and comparisons.',
    },
    {
      label: 'Heading Structure',
      status: headingLines.length >= 2 ? 'pass' : headingLines.length >= 1 ? 'warning' : 'fail',
      detail: `${headingLines.length} heading${headingLines.length !== 1 ? 's' : ''} detected. ${headingLines.length < 2 ? 'Add clear H2/H3 subheadings.' : 'Good structure.'}`,
      explanation: 'Headings are the primary navigation signal for both users and crawlers. Each major point should have its own heading.',
    },
    {
      label: 'Reading Level',
      status: avgWordsPerSentence >= 10 && avgWordsPerSentence <= 22 ? 'pass' : 'warning',
      detail: `Avg ${avgWordsPerSentence} words/sentence. ${avgWordsPerSentence > 22 ? 'Sentences too long — split them.' : avgWordsPerSentence < 10 ? 'Sentences very short.' : 'Good readability.'}`,
      value: `${avgWordsPerSentence} words/sentence avg`,
      explanation: 'Optimal reading level for web content is 15–20 words per sentence. Too complex = lower engagement and citation rate.',
    },
    {
      label: 'Call to Action',
      status: hasCta ? 'pass' : 'warning',
      detail: hasCta ? 'CTA language detected.' : 'No clear CTA found. Add action-oriented language.',
      explanation: 'Content without a CTA misses conversion opportunities. Always tell the reader what to do next.',
    },
    {
      label: 'Data & Statistics',
      status: hasStats ? 'pass' : 'warning',
      detail: hasStats ? 'Specific data points or statistics found.' : 'No statistics detected. Add numbers to boost credibility.',
      explanation: 'Pages with specific statistics are cited more often by AI engines as they provide verifiable facts.',
    },
  ];

  const recs: string[] = [];
  if (wc < 800) recs.push(`Expand content to at least 800 words (currently ${wc}).`);
  if (questions.length < 2) recs.push('Add at least 2–3 FAQ-style questions with direct answers.');
  if (listLines.length < 3) recs.push('Add bullet/numbered lists to improve AEO extraction.');
  if (!hasCta) recs.push('Add a clear call to action (e.g. "Get a free consultation").');
  if (!hasStats) recs.push('Include specific statistics or data points to boost authority.');

  return {
    score: Math.min(score, 100),
    title: 'Content AEO Analysis',
    summary: `Analysed ${wc} words across ${sentences.length} sentences. Found ${questions.length} questions and ${listLines.length} list items.`,
    checks,
    recommendations: recs,
  };
}

// 3. Robots.txt Checker
async function runRobotsChecker(url: string): Promise<ToolResult> {
  const data = await serverRobots(url);
  if (data.error || !data.content) {
    return {
      title: 'Robots.txt Fetch Failed',
      summary: data.error ?? 'Could not retrieve robots.txt.',
      checks: [{ label: 'Fetch', status: 'fail', detail: data.error ?? 'No content returned.' }],
      recommendations: ['Check the URL is correct and the site has a robots.txt file.'],
    };
  }

  const content = data.content;
  const lines = content.split('\n').map(l => l.trim());

  const hasSitemap = lines.some(l => l.toLowerCase().startsWith('sitemap:'));
  const hasUserAgentAll = lines.some(l => l.toLowerCase() === 'user-agent: *');
  const hasBlockAll = lines.some(l => l.toLowerCase() === 'disallow: /');
  const hasGptBot = lines.some(l => l.toLowerCase().includes('gptbot'));
  const hasGooglebot = lines.some(l => l.toLowerCase().includes('googlebot'));
  const hasCrawlDelay = lines.some(l => l.toLowerCase().startsWith('crawl-delay:'));
  const hasAdminDisallow = lines.some(l => l.toLowerCase().includes('/admin') || l.toLowerCase().includes('/wp-admin'));
  const sitemapUrl = lines.find(l => l.toLowerCase().startsWith('sitemap:'))?.split(':').slice(1).join(':').trim();
  const crawlDelay = lines.find(l => l.toLowerCase().startsWith('crawl-delay:'))?.split(':')[1]?.trim();

  const checks: CheckItem[] = [
    {
      label: 'Sitemap Declaration',
      status: hasSitemap ? 'pass' : 'warning',
      detail: hasSitemap ? `Sitemap declared: ${sitemapUrl}` : 'No Sitemap: directive. Add it for faster indexing.',
      value: sitemapUrl,
      explanation: 'A Sitemap declaration in robots.txt helps crawlers find your sitemap immediately.',
    },
    {
      label: 'User-agent: * Rule',
      status: hasUserAgentAll ? 'pass' : 'warning',
      detail: hasUserAgentAll ? 'Global user-agent rule present.' : 'No User-agent: * rule. All bots will follow default behaviour.',
      explanation: 'The User-agent: * rule applies to all crawlers and provides a baseline crawling policy.',
    },
    {
      label: 'Block All (Disallow: /)',
      status: hasBlockAll ? 'fail' : 'pass',
      detail: hasBlockAll ? 'CRITICAL: Disallow: / blocks ALL crawlers from the entire site.' : 'Site is not fully blocked.',
      explanation: 'Disallow: / under User-agent: * prevents all search engines from crawling your site.',
    },
    {
      label: 'Googlebot Rules',
      status: hasGooglebot ? 'info' : 'info',
      detail: hasGooglebot ? 'Explicit Googlebot rules found.' : 'No explicit Googlebot rules (falls back to * rules).',
      explanation: 'Explicit Googlebot rules take precedence over User-agent: * for Google\'s crawlers.',
    },
    {
      label: 'GPTBot (AI Crawler)',
      status: hasGptBot ? 'info' : 'warning',
      detail: hasGptBot ? 'GPTBot rules explicitly defined.' : 'No GPTBot rule. OpenAI will crawl freely (or check their default).',
      explanation: 'GPTBot is OpenAI\'s crawler. If you want to control AI training on your content, add explicit rules.',
    },
    {
      label: 'Admin Paths Protected',
      status: hasAdminDisallow ? 'pass' : 'warning',
      detail: hasAdminDisallow ? 'Admin paths are disallowed from crawling.' : 'No admin path restrictions found.',
      explanation: 'Disallowing /admin and /wp-admin protects sensitive paths from being indexed.',
    },
    {
      label: 'Crawl Delay',
      status: hasCrawlDelay ? 'info' : 'info',
      detail: hasCrawlDelay ? `Crawl-delay: ${crawlDelay} seconds set.` : 'No crawl-delay (default crawl rate applies).',
      explanation: 'Crawl-delay slows down bot requests, useful for high-traffic sites to prevent server overload.',
    },
  ];

  const recs: string[] = [];
  if (!hasSitemap) recs.push('Add "Sitemap: https://yourdomain.com/sitemap.xml" to robots.txt.');
  if (hasBlockAll) recs.push('URGENT: Remove "Disallow: /" from User-agent: * — this blocks all crawlers.');
  if (!hasGptBot) recs.push('Consider adding explicit GPTBot rules to control AI training on your content.');
  if (!hasAdminDisallow) recs.push('Add "Disallow: /admin" to prevent admin paths from being indexed.');

  return {
    score: hasBlockAll ? 10 : hasSitemap && hasUserAgentAll && hasAdminDisallow ? 90 : 60,
    title: 'Robots.txt Analysis',
    summary: `Analysed robots.txt from ${data.url}. ${lines.filter(l => l && !l.startsWith('#')).length} active directives found.`,
    checks,
    recommendations: recs,
    rawContent: content,
  };
}

// 4. Structured Data Validator
function runSchemaValidator(input: string): ToolResult {
  const KNOWN_TYPES = [
    'Article', 'BlogPosting', 'BreadcrumbList', 'ContactPage', 'Event',
    'FAQPage', 'HowTo', 'ItemList', 'LocalBusiness', 'NewsArticle',
    'Organization', 'Person', 'Product', 'Service', 'VideoObject', 'WebPage', 'WebSite',
  ];

  const REQUIRED_FIELDS: Record<string, string[]> = {
    Article: ['headline', 'author', 'datePublished'],
    BlogPosting: ['headline', 'author', 'datePublished'],
    FAQPage: ['mainEntity'],
    Organization: ['name', 'url'],
    LocalBusiness: ['name', 'address', 'telephone'],
    Product: ['name', 'offers'],
    Service: ['name', 'provider'],
    WebSite: ['name', 'url'],
    Event: ['name', 'startDate', 'location'],
  };

  let parsed: Record<string, unknown>;
  try {
    parsed = JSON.parse(input) as Record<string, unknown>;
  } catch (e) {
    return {
      score: 0,
      title: 'Invalid JSON',
      summary: 'JSON parsing failed. Fix syntax errors before validating schema.',
      checks: [{ label: 'JSON Syntax', status: 'fail', detail: (e as Error).message }],
      recommendations: ['Use a JSON validator to fix syntax errors first.'],
    };
  }

  const context = parsed['@context'] as string | undefined;
  const type = parsed['@type'] as string | undefined;
  const isKnownType = type ? KNOWN_TYPES.includes(type) : false;
  const requiredFields = type ? (REQUIRED_FIELDS[type] ?? []) : [];
  const missingFields = requiredFields.filter(f => !parsed[f]);
  const emptyFields = requiredFields.filter(f => parsed[f] !== undefined && (parsed[f] === '' || (Array.isArray(parsed[f]) && (parsed[f] as unknown[]).length === 0)));

  const score = !context ? 20
    : !type ? 30
      : !isKnownType ? 50
        : missingFields.length > 0 ? 60
          : emptyFields.length > 0 ? 80
            : 100;

  const checks: CheckItem[] = [
    {
      label: 'JSON Syntax',
      status: 'pass',
      detail: 'Valid JSON structure.',
    },
    {
      label: '@context',
      status: context === 'https://schema.org' ? 'pass' : context ? 'warning' : 'fail',
      detail: context ? `@context: "${context}"${context !== 'https://schema.org' ? ' — should be "https://schema.org"' : ''}` : '@context missing.',
      value: context,
    },
    {
      label: '@type',
      status: !type ? 'fail' : isKnownType ? 'pass' : 'warning',
      detail: type ? `@type: "${type}"${!isKnownType ? ' — not a recognised schema.org type.' : ''}` : '@type missing.',
      value: type,
      explanation: 'The @type field tells search engines what kind of content this is. Use a recognised schema.org type.',
    },
    ...(requiredFields.length > 0 ? [{
      label: `Required Fields for ${type}`,
      status: (missingFields.length === 0 ? 'pass' : 'fail') as 'pass' | 'fail',
      detail: missingFields.length === 0
        ? `All required fields present: ${requiredFields.join(', ')}`
        : `Missing: ${missingFields.join(', ')}`,
      value: requiredFields.join(', '),
    }] : []),
    ...(emptyFields.length > 0 ? [{
      label: 'Empty Required Fields',
      status: 'warning' as const,
      detail: `These fields are present but empty: ${emptyFields.join(', ')}`,
    }] : []),
  ];

  const recs: string[] = [];
  if (!context) recs.push('Add "@context": "https://schema.org"');
  if (!type) recs.push('Add "@type" with a valid schema.org type.');
  missingFields.forEach(f => recs.push(`Add required field: "${f}"`));

  return {
    score,
    title: score === 100 ? 'Schema Valid' : 'Schema Issues Found',
    summary: score === 100 ? `Valid ${type} schema with all required fields.` : `${missingFields.length} required field(s) missing.`,
    output: JSON.stringify(parsed, null, 2),
    outputLanguage: 'json',
    checks,
    recommendations: recs,
  };
}

// 5. Sitemap Validator / Generator
async function runSitemapTool(input: string, mode: 'validate' | 'generate'): Promise<ToolResult> {
  if (mode === 'generate') {
    const urls = input.split('\n').map(l => l.trim()).filter(l => l.startsWith('http'));
    if (urls.length === 0) {
      return {
        title: 'No URLs Found',
        summary: 'Paste one URL per line starting with http:// or https://',
        checks: [{ label: 'Input', status: 'fail', detail: 'No valid URLs detected.' }],
        recommendations: ['Paste one absolute URL per line.'],
      };
    }
    const today = new Date().toISOString().split('T')[0];
    const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map(u => `  <url>\n    <loc>${u}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.8</priority>\n  </url>`).join('\n')}\n</urlset>`;
    return {
      score: 100,
      title: 'Sitemap Generated',
      summary: `Generated XML sitemap with ${urls.length} URLs.`,
      output: xml,
      outputLanguage: 'xml',
      checks: [{ label: 'Generation', status: 'pass', detail: `${urls.length} URLs included.` }],
      recommendations: ['Upload to your site root as sitemap.xml and submit to Google Search Console.'],
    };
  }

  const data = await serverSitemap(input);
  if (data.error || !data.content) {
    return {
      title: 'Sitemap Fetch Failed',
      summary: data.error ?? 'Could not fetch sitemap.',
      checks: [{ label: 'Fetch', status: 'fail', detail: data.error ?? 'No content.' }],
      recommendations: ['Ensure sitemap.xml exists at your site root.'],
    };
  }

  const content = data.content;
  const urlMatches = content.match(/<loc>(.*?)<\/loc>/g) ?? [];
  const urls = urlMatches.map(m => m.replace(/<\/?loc>/g, '').trim());
  const lastmods = content.match(/<lastmod>(.*?)<\/lastmod>/g) ?? [];
  const priorities = content.match(/<priority>(.*?)<\/priority>/g) ?? [];

  const nonAbsolute = urls.filter(u => !u.startsWith('http'));
  const duplicates = urls.filter((u, i) => urls.indexOf(u) !== i);
  const badPriorities = priorities.filter(p => {
    const v = parseFloat(p.replace(/<\/?priority>/g, ''));
    return isNaN(v) || v < 0 || v > 1;
  });

  const score = urls.length === 0 ? 10
    : nonAbsolute.length > 0 ? 50
      : duplicates.length > 0 ? 70
        : lastmods.length < urls.length ? 80
          : 95;

  const checks: CheckItem[] = [
    {
      label: 'URLs Found',
      status: urls.length > 0 ? 'pass' : 'fail',
      detail: `${urls.length} <loc> entries found.`,
      value: `${urls.length} URLs`,
    },
    {
      label: 'Absolute URLs',
      status: nonAbsolute.length === 0 ? 'pass' : 'fail',
      detail: nonAbsolute.length === 0 ? 'All URLs are absolute.' : `${nonAbsolute.length} relative URLs found — must be absolute.`,
    },
    {
      label: 'Duplicate URLs',
      status: duplicates.length === 0 ? 'pass' : 'warning',
      detail: duplicates.length === 0 ? 'No duplicate URLs.' : `${duplicates.length} duplicate URL(s) found.`,
      value: duplicates.length ? duplicates[0] : undefined,
    },
    {
      label: 'Last Modified Dates',
      status: lastmods.length === urls.length ? 'pass' : 'warning',
      detail: `${lastmods.length} of ${urls.length} URLs have <lastmod> dates.`,
    },
    {
      label: 'Priority Values',
      status: badPriorities.length === 0 ? 'pass' : 'warning',
      detail: badPriorities.length === 0 ? 'All priority values are valid (0.0–1.0).' : `${badPriorities.length} invalid priority value(s).`,
    },
  ];

  const recs: string[] = [];
  if (urls.length === 0) recs.push('No URLs found — check sitemap format.');
  if (nonAbsolute.length > 0) recs.push('Fix relative URLs to absolute (include https://).');
  if (duplicates.length > 0) recs.push('Remove duplicate URLs from sitemap.');
  if (lastmods.length < urls.length) recs.push('Add <lastmod> dates to all URLs.');

  return {
    score,
    title: 'Sitemap Analysis',
    summary: `Analysed sitemap from ${data.url}. ${urls.length} URLs found.`,
    rawContent: content.slice(0, 2000),
    checks,
    recommendations: recs,
  };
}

// 6. Canonical Checker
async function runCanonicalChecker(url: string): Promise<ToolResult> {
  const data = await serverCrawl(url);
  if (data.error || !data.html) {
    return {
      title: 'Crawl Failed',
      summary: data.error ?? 'Could not fetch the page.',
      checks: [{ label: 'Connection', status: 'fail', detail: data.error ?? 'No HTML returned.' }],
      recommendations: [],
    };
  }

  const doc = new DOMParser().parseFromString(data.html, 'text/html');
  const canonicals = Array.from(doc.querySelectorAll('link[rel="canonical"]'));
  const canonical = canonicals[0]?.getAttribute('href')?.trim() ?? '';
  const ogUrl = doc.querySelector('meta[property="og:url"]')?.getAttribute('content')?.trim() ?? '';
  const hreflangs = doc.querySelectorAll('link[rel="alternate"][hreflang]');

  let inputOrigin = '';
  try { inputOrigin = new URL(url).origin; } catch { /* ignore */ }
  let canonicalOrigin = '';
  try { canonicalOrigin = canonical ? new URL(canonical).origin : ''; } catch { /* ignore */ }

  const isAbsolute = canonical.startsWith('http');
  const isHttps = canonical.startsWith('https');
  const isSelfRef = canonical === url || (canonical && url.replace(/\/$/, '') === canonical.replace(/\/$/, ''));
  const ogMatchesCanonical = ogUrl && canonical && (ogUrl === canonical || ogUrl.replace(/\/$/, '') === canonical.replace(/\/$/, ''));

  const score = canonicals.length === 0 ? 20
    : canonicals.length > 1 ? 40
      : !isAbsolute ? 50
        : !isHttps ? 60
          : 95;

  const checks: CheckItem[] = [
    {
      label: 'Canonical Tag Present',
      status: canonicals.length > 0 ? 'pass' : 'fail',
      detail: canonicals.length > 0 ? `Found ${canonicals.length} canonical tag(s).` : 'No canonical tag found.',
      value: canonical || undefined,
      explanation: 'Missing canonical tags risk duplicate content issues, especially for URLs with query parameters.',
    },
    {
      label: 'Single Canonical Tag',
      status: canonicals.length === 1 ? 'pass' : canonicals.length === 0 ? 'fail' : 'fail',
      detail: canonicals.length === 1 ? 'Exactly one canonical tag (correct).' : canonicals.length === 0 ? 'None found.' : `${canonicals.length} canonical tags found — use exactly ONE.`,
      explanation: 'Multiple canonical tags confuse crawlers and nullify the canonical signal entirely.',
    },
    {
      label: 'Absolute URL',
      status: canonical ? (isAbsolute ? 'pass' : 'fail') : 'fail',
      detail: canonical ? (isAbsolute ? 'Canonical is an absolute URL.' : 'Canonical is a relative URL — must be absolute.') : 'N/A',
      value: canonical || undefined,
      explanation: 'Canonical URLs must be absolute (include https://) to be valid.',
    },
    {
      label: 'HTTPS',
      status: canonical ? (isHttps ? 'pass' : 'fail') : 'fail',
      detail: canonical ? (isHttps ? 'Canonical uses HTTPS.' : 'Canonical uses HTTP — should be HTTPS.') : 'N/A',
    },
    {
      label: 'Self-Referencing',
      status: isSelfRef ? 'pass' : 'warning',
      detail: isSelfRef ? 'Canonical matches the current page URL.' : `Canonical points to a different URL: ${canonical}`,
      value: canonical || undefined,
      explanation: 'A self-referencing canonical tells Google "this URL is the preferred version of itself".',
    },
    {
      label: 'og:url Match',
      status: ogUrl ? (ogMatchesCanonical ? 'pass' : 'warning') : 'info',
      detail: ogUrl
        ? (ogMatchesCanonical ? 'og:url matches canonical.' : `og:url (${ogUrl}) does not match canonical.`)
        : 'No og:url tag found.',
      value: ogUrl || undefined,
    },
    {
      label: 'Hreflang Tags',
      status: hreflangs.length > 0 ? 'info' : 'info',
      detail: hreflangs.length > 0 ? `${hreflangs.length} hreflang tag(s) found.` : 'No hreflang tags (only needed for multilingual sites).',
    },
  ];

  const recs: string[] = [];
  if (canonicals.length === 0) recs.push('Add a canonical tag: <link rel="canonical" href="https://yourdomain.com/page" />');
  if (canonicals.length > 1) recs.push('Remove duplicate canonical tags — keep exactly one per page.');
  if (canonical && !isAbsolute) recs.push('Change canonical to an absolute URL.');
  if (canonical && !isHttps) recs.push('Ensure canonical URL uses HTTPS.');
  if (ogUrl && !ogMatchesCanonical) recs.push('Update og:url to match your canonical tag.');

  return {
    score,
    title: 'Canonical Tag Analysis',
    summary: `Analysed ${url}. ${canonicals.length} canonical tag(s) found.`,
    checks,
    recommendations: recs,
    rawContent: canonical ? `<link rel="canonical" href="${canonical}" />` : 'No canonical tag found.',
  };
}

// 7. ROI Calculator (handled inline in component)

// 8. Schema Generator (handled inline in component)

// ─── Schema Generator Form ────────────────────────────────────────────────────

type SchemaType = 'Article' | 'FAQPage' | 'LocalBusiness' | 'Organization' | 'Product' | 'Service' | 'BreadcrumbList' | 'Event';

interface SchemaFormData {
  Article: { headline: string; author: string; publisher: string; datePublished: string; image: string; url: string };
  FAQPage: { faqs: { q: string; a: string }[] };
  LocalBusiness: { name: string; url: string; telephone: string; street: string; city: string; zip: string; country: string; description: string };
  Organization: { name: string; url: string; logo: string; telephone: string; email: string };
  Product: { name: string; description: string; brand: string; price: string; currency: string; availability: string };
  Service: { name: string; description: string; provider: string; areaServed: string; url: string };
  BreadcrumbList: { items: { name: string; url: string }[] };
  Event: { name: string; startDate: string; endDate: string; location: string; description: string; url: string };
}

const SchemaGeneratorForm: React.FC<{ onUpdate: (json: string) => void }> = ({ onUpdate }) => {
  const [schemaType, setSchemaType] = useState<SchemaType>('Organization');
  const [data, setData] = useState<SchemaFormData>({
    Article: { headline: '', author: '', publisher: '', datePublished: '', image: '', url: '' },
    FAQPage: { faqs: [{ q: '', a: '' }] },
    LocalBusiness: { name: '', url: '', telephone: '', street: '', city: '', zip: '', country: 'IN', description: '' },
    Organization: { name: '', url: '', logo: '', telephone: '', email: '' },
    Product: { name: '', description: '', brand: '', price: '', currency: 'INR', availability: 'InStock' },
    Service: { name: '', description: '', provider: '', areaServed: '', url: '' },
    BreadcrumbList: { items: [{ name: 'Home', url: 'https://' }] },
    Event: { name: '', startDate: '', endDate: '', location: '', description: '', url: '' },
  });

  const updateField = useCallback((field: string, value: unknown) => {
    setData(prev => ({ ...prev, [schemaType]: { ...prev[schemaType], [field]: value } }));
  }, [schemaType]);

  useEffect(() => {
    const d = data[schemaType];
    let schema: Record<string, unknown> = { '@context': 'https://schema.org', '@type': schemaType };
    if (schemaType === 'Article') {
      const a = d as SchemaFormData['Article'];
      schema = { ...schema, headline: a.headline, url: a.url, image: a.image ? [a.image] : undefined, datePublished: a.datePublished, author: { '@type': 'Person', name: a.author }, publisher: { '@type': 'Organization', name: a.publisher } };
    } else if (schemaType === 'FAQPage') {
      const f = d as SchemaFormData['FAQPage'];
      schema.mainEntity = f.faqs.filter(fq => fq.q && fq.a).map(fq => ({ '@type': 'Question', name: fq.q, acceptedAnswer: { '@type': 'Answer', text: fq.a } }));
    } else if (schemaType === 'LocalBusiness') {
      const lb = d as SchemaFormData['LocalBusiness'];
      schema = { ...schema, name: lb.name, url: lb.url, telephone: lb.telephone, description: lb.description, address: { '@type': 'PostalAddress', streetAddress: lb.street, addressLocality: lb.city, postalCode: lb.zip, addressCountry: lb.country } };
    } else if (schemaType === 'Organization') {
      const o = d as SchemaFormData['Organization'];
      schema = { ...schema, name: o.name, url: o.url, logo: o.logo, telephone: o.telephone, email: o.email };
    } else if (schemaType === 'Product') {
      const p = d as SchemaFormData['Product'];
      schema = { ...schema, name: p.name, description: p.description, brand: { '@type': 'Brand', name: p.brand }, offers: { '@type': 'Offer', priceCurrency: p.currency, price: p.price, availability: `https://schema.org/${p.availability}` } };
    } else if (schemaType === 'Service') {
      const s = d as SchemaFormData['Service'];
      schema = { ...schema, name: s.name, description: s.description, provider: { '@type': 'Organization', name: s.provider }, areaServed: s.areaServed, url: s.url };
    } else if (schemaType === 'BreadcrumbList') {
      const bl = d as SchemaFormData['BreadcrumbList'];
      schema.itemListElement = bl.items.map((item, i) => ({ '@type': 'ListItem', position: i + 1, name: item.name, item: item.url }));
    } else if (schemaType === 'Event') {
      const ev = d as SchemaFormData['Event'];
      schema = { ...schema, name: ev.name, startDate: ev.startDate, endDate: ev.endDate, location: { '@type': 'Place', name: ev.location }, description: ev.description, url: ev.url };
    }
    onUpdate(JSON.stringify(schema, null, 2));
  }, [data, schemaType, onUpdate]);

  const inp = 'w-full p-3 text-sm rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 outline-none focus:border-indigo-500 transition-all';
  const d = data[schemaType];

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap gap-1.5">
        {(['Article', 'FAQPage', 'LocalBusiness', 'Organization', 'Product', 'Service', 'BreadcrumbList', 'Event'] as SchemaType[]).map(t => (
          <button key={t} onClick={() => setSchemaType(t)}
            className={`px-3 py-1.5 rounded-lg text-[11px] font-bold border transition-all ${schemaType === t ? 'bg-indigo-600 border-indigo-600 text-white' : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-500'}`}>
            {t}
          </button>
        ))}
      </div>
      <div className="space-y-2.5">
        {schemaType === 'Organization' && (() => {
          const o = d as SchemaFormData['Organization']; return (<>
            <input className={inp} placeholder="Organization name *" value={o.name} onChange={e => updateField('name', e.target.value)} />
            <input className={inp} placeholder="Website URL *" value={o.url} onChange={e => updateField('url', e.target.value)} />
            <input className={inp} placeholder="Logo URL" value={o.logo} onChange={e => updateField('logo', e.target.value)} />
            <input className={inp} placeholder="Telephone" value={o.telephone} onChange={e => updateField('telephone', e.target.value)} />
            <input className={inp} placeholder="Email" value={o.email} onChange={e => updateField('email', e.target.value)} />
          </>);
        })()}
        {schemaType === 'LocalBusiness' && (() => {
          const lb = d as SchemaFormData['LocalBusiness']; return (<>
            <input className={inp} placeholder="Business name *" value={lb.name} onChange={e => updateField('name', e.target.value)} />
            <input className={inp} placeholder="Website URL" value={lb.url} onChange={e => updateField('url', e.target.value)} />
            <input className={inp} placeholder="Telephone *" value={lb.telephone} onChange={e => updateField('telephone', e.target.value)} />
            <input className={inp} placeholder="Street address" value={lb.street} onChange={e => updateField('street', e.target.value)} />
            <div className="grid grid-cols-2 gap-2">
              <input className={inp} placeholder="City" value={lb.city} onChange={e => updateField('city', e.target.value)} />
              <input className={inp} placeholder="Postal code" value={lb.zip} onChange={e => updateField('zip', e.target.value)} />
            </div>
            <textarea className={`${inp} h-16 resize-none`} placeholder="Description" value={lb.description} onChange={e => updateField('description', e.target.value)} />
          </>);
        })()}
        {schemaType === 'Article' && (() => {
          const a = d as SchemaFormData['Article']; return (<>
            <input className={inp} placeholder="Headline *" value={a.headline} onChange={e => updateField('headline', e.target.value)} />
            <input className={inp} placeholder="Author name *" value={a.author} onChange={e => updateField('author', e.target.value)} />
            <input className={inp} placeholder="Publisher name" value={a.publisher} onChange={e => updateField('publisher', e.target.value)} />
            <input className={inp} placeholder="Published date (YYYY-MM-DD) *" value={a.datePublished} onChange={e => updateField('datePublished', e.target.value)} />
            <input className={inp} placeholder="Article URL" value={a.url} onChange={e => updateField('url', e.target.value)} />
            <input className={inp} placeholder="Featured image URL" value={a.image} onChange={e => updateField('image', e.target.value)} />
          </>);
        })()}
        {schemaType === 'Service' && (() => {
          const s = d as SchemaFormData['Service']; return (<>
            <input className={inp} placeholder="Service name *" value={s.name} onChange={e => updateField('name', e.target.value)} />
            <textarea className={`${inp} h-20 resize-none`} placeholder="Description *" value={s.description} onChange={e => updateField('description', e.target.value)} />
            <input className={inp} placeholder="Provider (your company name)" value={s.provider} onChange={e => updateField('provider', e.target.value)} />
            <input className={inp} placeholder="Area served (e.g. India, Noida)" value={s.areaServed} onChange={e => updateField('areaServed', e.target.value)} />
            <input className={inp} placeholder="Service page URL" value={s.url} onChange={e => updateField('url', e.target.value)} />
          </>);
        })()}
        {schemaType === 'Product' && (() => {
          const p = d as SchemaFormData['Product']; return (<>
            <input className={inp} placeholder="Product name *" value={p.name} onChange={e => updateField('name', e.target.value)} />
            <input className={inp} placeholder="Brand *" value={p.brand} onChange={e => updateField('brand', e.target.value)} />
            <div className="grid grid-cols-2 gap-2">
              <input className={inp} placeholder="Price *" value={p.price} onChange={e => updateField('price', e.target.value)} />
              <input className={inp} placeholder="Currency (INR)" value={p.currency} onChange={e => updateField('currency', e.target.value)} />
            </div>
            <textarea className={`${inp} h-16 resize-none`} placeholder="Description" value={p.description} onChange={e => updateField('description', e.target.value)} />
          </>);
        })()}
        {schemaType === 'FAQPage' && (() => {
          const f = d as SchemaFormData['FAQPage']; return (
            <div className="space-y-2">
              {f.faqs.map((faq, i) => (
                <div key={i} className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/40 relative group">
                  <input className="w-full p-2 bg-transparent border-b border-slate-200 dark:border-slate-800 text-sm font-medium outline-none focus:border-indigo-500 mb-1" placeholder="Question *" value={faq.q}
                    onChange={e => { const nf = [...f.faqs]; nf[i] = { ...nf[i], q: e.target.value }; updateField('faqs', nf); }} />
                  <textarea className="w-full p-2 bg-transparent text-xs outline-none h-14 resize-none" placeholder="Answer *" value={faq.a}
                    onChange={e => { const nf = [...f.faqs]; nf[i] = { ...nf[i], a: e.target.value }; updateField('faqs', nf); }} />
                  {f.faqs.length > 1 && (
                    <button onClick={() => updateField('faqs', f.faqs.filter((_, idx) => idx !== i))} className="absolute top-2 right-2 text-slate-400 hover:text-rose-400 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Trash size={13} />
                    </button>
                  )}
                </div>
              ))}
              <button onClick={() => updateField('faqs', [...f.faqs, { q: '', a: '' }])} className="text-xs font-bold text-indigo-500 flex items-center gap-1 hover:text-indigo-400">
                <Plus size={13} /> Add Question
              </button>
            </div>
          );
        })()}
        {schemaType === 'BreadcrumbList' && (() => {
          const bl = d as SchemaFormData['BreadcrumbList']; return (
            <div className="space-y-2">
              {bl.items.map((item, i) => (
                <div key={i} className="grid grid-cols-2 gap-2 relative group">
                  <input className={inp} placeholder={`Label (e.g. ${i === 0 ? 'Home' : 'Services'})`} value={item.name}
                    onChange={e => { const ni = [...bl.items]; ni[i] = { ...ni[i], name: e.target.value }; updateField('items', ni); }} />
                  <input className={inp} placeholder="URL" value={item.url}
                    onChange={e => { const ni = [...bl.items]; ni[i] = { ...ni[i], url: e.target.value }; updateField('items', ni); }} />
                  {bl.items.length > 1 && (
                    <button onClick={() => updateField('items', bl.items.filter((_, idx) => idx !== i))} className="absolute -right-6 top-3 text-slate-400 hover:text-rose-400 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Trash size={13} />
                    </button>
                  )}
                </div>
              ))}
              <button onClick={() => updateField('items', [...bl.items, { name: '', url: 'https://' }])} className="text-xs font-bold text-indigo-500 flex items-center gap-1 hover:text-indigo-400">
                <Plus size={13} /> Add Item
              </button>
            </div>
          );
        })()}
        {schemaType === 'Event' && (() => {
          const ev = d as SchemaFormData['Event']; return (<>
            <input className={inp} placeholder="Event name *" value={ev.name} onChange={e => updateField('name', e.target.value)} />
            <div className="grid grid-cols-2 gap-2">
              <input className={inp} type="date" placeholder="Start date *" value={ev.startDate} onChange={e => updateField('startDate', e.target.value)} />
              <input className={inp} type="date" placeholder="End date" value={ev.endDate} onChange={e => updateField('endDate', e.target.value)} />
            </div>
            <input className={inp} placeholder="Location / Venue name *" value={ev.location} onChange={e => updateField('location', e.target.value)} />
            <input className={inp} placeholder="Event URL" value={ev.url} onChange={e => updateField('url', e.target.value)} />
            <textarea className={`${inp} h-16 resize-none`} placeholder="Description" value={ev.description} onChange={e => updateField('description', e.target.value)} />
          </>);
        })()}
      </div>
    </div>
  );
};

// ─── ROI Calculator ───────────────────────────────────────────────────────────

const RoiCalculator: React.FC = () => {
  const [traffic, setTraffic] = useState(10000);
  const [conv, setConv] = useState(2.5);
  const [aov, setAov] = useState(2000);
  const [lift, setLift] = useState(15);
  const [aeoScore, setAeoScore] = useState(45);

  const current = Math.round(traffic * (conv / 100) * aov);
  const projected = Math.round(traffic * (1 + lift / 100) * (conv / 100) * aov);
  const monthly = projected - current;
  const annual = monthly * 12;

  const fmt = (n: number) => '₹' + n.toLocaleString('en-IN');

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 gap-3">
        {[
          { label: 'Monthly Organic Traffic', value: traffic, set: setTraffic, min: 100, max: 1000000, step: 100 },
          { label: 'Conversion Rate (%)', value: conv, set: setConv, min: 0.1, max: 20, step: 0.1 },
          { label: 'Avg Order Value (₹)', value: aov, set: setAov, min: 100, max: 100000, step: 100 },
          { label: 'Expected AEO Lift (%)', value: lift, set: setLift, min: 1, max: 100, step: 1 },
        ].map(f => (
          <div key={f.label}>
            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1 block">{f.label}</label>
            <input type="number" value={f.value} min={f.min} max={f.max} step={f.step}
              onChange={e => f.set(parseFloat(e.target.value) || 0)}
              className="w-full p-2.5 text-sm rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 outline-none focus:border-indigo-500 font-mono" />
          </div>
        ))}
      </div>
      <div>
        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1 block">
          Current AEO Score: <span className={aeoScore < 60 ? 'text-rose-500' : aeoScore < 75 ? 'text-amber-500' : 'text-emerald-500'}>{aeoScore}</span>/100
        </label>
        <input type="range" min={0} max={100} value={aeoScore} onChange={e => setAeoScore(parseInt(e.target.value))}
          className="w-full accent-indigo-600" />
        <div className="flex justify-between text-[9px] text-slate-500 mt-0.5">
          <span>Poor</span><span>Needs Work</span><span>Good</span>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3 pt-2">
        {[
          { label: 'Current Monthly Revenue', value: fmt(current), color: 'text-slate-300' },
          { label: 'Projected Monthly Revenue', value: fmt(projected), color: 'text-emerald-400' },
          { label: 'Monthly Uplift', value: fmt(monthly), color: 'text-indigo-400' },
          { label: 'Annual Revenue Uplift', value: fmt(annual), color: 'text-indigo-300' },
        ].map(s => (
          <div key={s.label} className="bg-slate-900/60 border border-slate-800 rounded-xl p-3">
            <div className="text-[10px] text-slate-500 font-semibold uppercase tracking-wide mb-1">{s.label}</div>
            <div className={`text-xl font-black font-mono ${s.color}`}>{s.value}</div>
          </div>
        ))}
      </div>
      {aeoScore < 60 && (
        <div className="flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/20 rounded-xl px-4 py-3">
          <Zap size={16} className="text-indigo-400 shrink-0" />
          <span className="text-xs text-indigo-300 font-medium">High AEO opportunity — your score has significant room to improve, which means bigger revenue gains than the model shows.</span>
        </div>
      )}
    </div>
  );
};

// ─── Tool Icon Map ─────────────────────────────────────────────────────────────

const TOOL_ICONS: Record<string, React.ReactNode> = {
  'aeo-audit-tool': <Globe size={18} />,
  'aeo-checker': <FileText size={18} />,
  'schema-generator': <FileJson size={18} />,
  'robots-txt-checker': <Shield size={18} />,
  'structured-data-validator': <Layers size={18} />,
  'sitemap-validator': <Map size={18} />,
  'canonical-tag-checker': <Link2 size={18} />,
  'aeo-roi-calculator': <Calculator size={18} />,
};

// ─── Main Component ───────────────────────────────────────────────────────────

export const ToolPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const tool = slug ? getToolBySlug(slug) : undefined;

  const [input, setInput] = useState('');
  const [sitemapMode, setSitemapMode] = useState<'validate' | 'generate'>('validate');
  const [isExecuting, setIsExecuting] = useState(false);
  const [result, setResult] = useState<ToolResult | null>(null);
  const [copied, setCopied] = useState(false);
  const [urlError, setUrlError] = useState('');

  useEffect(() => {
    setInput('');
    setResult(null);
    setIsExecuting(false);
    setUrlError('');
  }, [slug]);

  if (!tool) return <Navigate to="/404" replace />;

  const isSchemaGen = tool.slug === 'schema-generator';
  const isRoi = tool.slug === 'aeo-roi-calculator';
  const isUrlTool = ['aeo-audit-tool', 'robots-txt-checker', 'canonical-tag-checker'].includes(tool.slug);
  const isSitemap = tool.slug === 'sitemap-validator';

  const validateUrl = (url: string) => {
    try { new URL(url); setUrlError(''); return true; }
    catch { setUrlError('Enter a valid URL (e.g. https://example.com)'); return false; }
  };

  const handleExecute = async () => {
    if (isUrlTool && !validateUrl(input)) return;
    setIsExecuting(true);
    setResult(null);
    try {
      let r: ToolResult;
      if (tool.slug === 'aeo-audit-tool') r = await runAeoAudit(input);
      else if (tool.slug === 'aeo-checker') r = runAeoChecker(input);
      else if (tool.slug === 'robots-txt-checker') r = await runRobotsChecker(input);
      else if (tool.slug === 'structured-data-validator') r = runSchemaValidator(input);
      else if (tool.slug === 'sitemap-validator') r = await runSitemapTool(input, sitemapMode);
      else if (tool.slug === 'canonical-tag-checker') r = await runCanonicalChecker(input);
      else r = { title: 'Done', summary: '', checks: [], recommendations: [] };
      setResult(r);
    } finally { setIsExecuting(false); }
  };

  const copyOutput = async () => {
    const text = result?.output ?? result?.rawContent ?? '';
    if (!text) return;
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadOutput = () => {
    const text = result?.output ?? result?.rawContent ?? '';
    if (!text) return;
    const ext = result?.outputLanguage ?? 'txt';
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = `${tool.slug}.${ext}`;
    document.body.appendChild(a); a.click();
    document.body.removeChild(a); URL.revokeObjectURL(url);
  };

  const canonical = `${SITE_URL}/free-tools/${tool.slug}`;
  const seoTitle = `${tool.name} — Free SEO Tool | Optimantix Global`;
  const seoDescription = truncateDescription(tool.description, 155);

  const scoreColor = !result?.score ? '' : result.score >= 75 ? 'text-emerald-400' : result.score >= 50 ? 'text-amber-400' : 'text-rose-400';

  const placeholder: Record<string, string> = {
    'aeo-audit-tool': 'https://yourwebsite.com',
    'aeo-checker': 'Paste your page content or copy here...\n\nInclude headings, paragraphs, FAQs, and CTAs.',
    'robots-txt-checker': 'https://yourwebsite.com',
    'structured-data-validator': '{\n  "@context": "https://schema.org",\n  "@type": "Organization",\n  "name": "Your Business"\n}',
    'sitemap-validator': sitemapMode === 'validate' ? 'https://yourwebsite.com/sitemap.xml' : 'https://yourwebsite.com/\nhttps://yourwebsite.com/about\nhttps://yourwebsite.com/services',
    'canonical-tag-checker': 'https://yourwebsite.com/page',
  };

  return (
    <div className="bg-slate-50 dark:bg-slate-950 min-h-screen text-slate-900 dark:text-slate-100 font-sans antialiased">
      <Helmet>
        <title>{seoTitle}</title>
        <meta name="description" content={seoDescription} />
        <link rel="canonical" href={canonical} />
        <meta property="og:title" content={seoTitle} />
        <meta property="og:description" content={seoDescription} />
        <meta property="og:url" content={canonical} />
      </Helmet>

      {/* Hero */}
      <section className="pt-28 pb-16 bg-[#070A13] text-white border-b border-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-950/30 via-transparent to-transparent pointer-events-none" />
        <div className="container mx-auto px-4 max-w-4xl text-center relative z-10">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 mb-6">
            {TOOL_ICONS[tool.slug] ?? <Search size={22} />}
          </div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4 text-white">{tool.name}</h1>
          <p className="text-base text-slate-400 max-w-xl mx-auto leading-relaxed">{tool.description}</p>
        </div>
      </section>

      {/* Tool Body */}
      <section className="py-10 -mt-8 relative z-20">
        <div className="container mx-auto px-4 max-w-6xl">

          {/* ROI Calculator — full width special layout */}
          {isRoi ? (
            <div className="grid lg:grid-cols-2 gap-8">
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 md:p-8 shadow-xl shadow-slate-200/40 dark:shadow-none">
                <h2 className="text-lg font-bold mb-6 flex items-center gap-2.5">
                  <span className="bg-slate-100 dark:bg-slate-800 p-2 rounded-xl"><Calculator size={18} /></span>
                  AEO Revenue Calculator
                </h2>
                <RoiCalculator />
              </div>
              <div className="bg-[#090C15] text-white rounded-3xl p-6 md:p-8 border border-slate-800/80 flex flex-col justify-center">
                <h3 className="text-base font-bold mb-3">How AEO Improves Revenue</h3>
                <p className="text-sm text-slate-400 leading-relaxed mb-6">Answer Engine Optimisation increases your visibility in AI-generated responses (Google SGE, ChatGPT, Perplexity). Higher visibility = more qualified clicks = more conversions on the same budget.</p>
                <div className="space-y-3">
                  {[
                    { label: 'SGE appearances drive 23% higher CTR vs standard results', icon: '📈' },
                    { label: 'AEO-optimised pages see 40–60% more featured snippet wins', icon: '🎯' },
                    { label: 'Schema-rich pages get 20–30% more organic traffic on average', icon: '🔍' },
                    { label: 'FAQPage schema alone increases click rate by 8–15%', icon: '❓' },
                  ].map((s, i) => (
                    <div key={i} className="flex items-start gap-3 text-sm text-slate-300">
                      <span className="text-lg shrink-0">{s.icon}</span>
                      <span>{s.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="grid lg:grid-cols-12 gap-6 items-start">

              {/* Input Panel */}
              <div className="lg:col-span-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 md:p-7 shadow-xl shadow-slate-200/40 dark:shadow-none flex flex-col min-h-[500px]">
                <div className="mb-5">
                  <h2 className="text-base font-bold flex items-center gap-2.5">
                    <span className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 p-2 rounded-xl">
                      {TOOL_ICONS[tool.slug] ?? <Search size={18} />}
                    </span>
                    {isSchemaGen ? 'Configure Schema' : 'Input'}
                  </h2>
                  <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                    {isSchemaGen ? 'Fill in the fields — JSON-LD updates live as you type.'
                      : isUrlTool ? 'Enter a full URL including https://'
                        : isSitemap ? 'Validate an existing sitemap or generate a new one.'
                          : 'Paste your content below.'}
                  </p>
                </div>

                {isSitemap && (
                  <div className="flex gap-2 mb-4">
                    {(['validate', 'generate'] as const).map(m => (
                      <button key={m} onClick={() => { setSitemapMode(m); setInput(''); setResult(null); }}
                        className={`flex-1 py-2 rounded-xl text-xs font-bold border transition-all ${sitemapMode === m ? 'bg-indigo-600 border-indigo-600 text-white' : 'border-slate-200 dark:border-slate-800 text-slate-500'}`}>
                        {m === 'validate' ? 'Validate Sitemap' : 'Generate Sitemap'}
                      </button>
                    ))}
                  </div>
                )}

                <div className="flex-grow flex flex-col">
                  {isSchemaGen ? (
                    <SchemaGeneratorForm onUpdate={setInput} />
                  ) : isUrlTool ? (
                    <div className="flex flex-col gap-1.5">
                      <input type="url" value={input} onChange={e => { setInput(e.target.value); if (urlError) validateUrl(e.target.value); }}
                        placeholder={placeholder[tool.slug] ?? 'https://'}
                        className={`w-full px-4 py-3 text-sm rounded-xl bg-slate-50 dark:bg-slate-950 border outline-none font-mono transition-all ${urlError ? 'border-rose-400 focus:border-rose-400' : 'border-slate-200 dark:border-slate-800 focus:border-indigo-500'}`} />
                      {urlError && <p className="text-xs text-rose-400">{urlError}</p>}
                    </div>
                  ) : (
                    <textarea value={input} onChange={e => setInput(e.target.value)}
                      className="w-full flex-grow min-h-56 p-4 text-xs rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 outline-none focus:border-indigo-500 font-mono resize-y transition-all"
                      placeholder={placeholder[tool.slug] ?? 'Paste content here...'} />
                  )}
                </div>

                {!isSchemaGen && (
                  <button onClick={handleExecute}
                    disabled={(!input.trim() && !isSchemaGen) || isExecuting}
                    className="mt-5 w-full bg-indigo-600 disabled:bg-slate-200 dark:disabled:bg-slate-800 disabled:text-slate-400 text-white py-3.5 rounded-xl text-sm font-bold hover:bg-indigo-700 active:scale-[0.98] transition-all flex justify-center items-center gap-2 shadow-lg shadow-indigo-600/20">
                    {isExecuting
                      ? <><Loader2 size={16} className="animate-spin" /> Analysing...</>
                      : <><ArrowRight size={16} /> Run Analysis</>}
                  </button>
                )}
              </div>

              {/* Output Panel */}
              <div className="lg:col-span-7 bg-[#090C15] text-white rounded-3xl p-6 md:p-7 border border-slate-800/80 shadow-2xl flex flex-col min-h-[500px]">
                <div className="flex justify-between items-start border-b border-slate-800 pb-4 mb-5">
                  <div>
                    <h2 className="text-base font-bold">Results</h2>
                    <p className="text-xs text-slate-400 mt-0.5 max-w-xs leading-relaxed">
                      {result ? result.summary : 'Results will appear here after analysis.'}
                    </p>
                  </div>
                  {result && typeof result.score === 'number' && (
                    <ScoreRing score={result.score} />
                  )}
                </div>

                {isExecuting ? (
                  <div className="flex-grow flex flex-col items-center justify-center gap-4 text-slate-500">
                    <div className="space-y-2 w-full max-w-xs">
                      {[60, 80, 50, 70].map((w, i) => (
                        <div key={i} className="h-3 rounded-full bg-slate-800 animate-pulse" style={{ width: `${w}%` }} />
                      ))}
                    </div>
                    <p className="text-xs font-mono text-slate-500">Fetching and analysing...</p>
                  </div>
                ) : result ? (
                  <div className="space-y-5 flex-grow overflow-auto">

                    {/* Raw content block */}
                    {result.rawContent && (
                      <div>
                        <div className="flex items-center justify-between mb-1.5 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-xl">
                          <span className="text-[10px] font-mono text-slate-500 font-bold uppercase tracking-wider">Raw Output</span>
                          <button onClick={copyOutput} className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-[11px] font-bold transition-all">
                            {copied ? <Check size={11} className="text-emerald-400" /> : <Copy size={11} />} {copied ? 'Copied' : 'Copy'}
                          </button>
                        </div>
                        <pre className="text-[10px] bg-black/40 border border-slate-900 rounded-xl p-3 text-slate-300 font-mono overflow-x-auto max-h-36 whitespace-pre-wrap">{result.rawContent}</pre>
                      </div>
                    )}

                    {/* JSON/XML output block */}
                    {result.output && (
                      <div>
                        <div className="flex items-center justify-between mb-1.5 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-xl">
                          <span className="text-[10px] font-mono text-slate-500 font-bold uppercase tracking-wider">
                            {result.outputLanguage === 'json' ? 'JSON-LD Output' : result.outputLanguage === 'xml' ? 'XML Output' : 'Output'}
                          </span>
                          <div className="flex gap-1.5">
                            <button onClick={copyOutput} className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-[11px] font-bold transition-all">
                              {copied ? <Check size={11} className="text-emerald-400" /> : <Copy size={11} />} {copied ? 'Copied' : 'Copy'}
                            </button>
                            <button onClick={downloadOutput} className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-indigo-600/20 text-indigo-400 border border-indigo-500/20 hover:bg-indigo-600/30 text-[11px] font-bold transition-all">
                              <Download size={11} /> Export
                            </button>
                          </div>
                        </div>
                        <pre className="text-[10px] bg-black/40 border border-slate-900 rounded-xl p-3 text-slate-300 font-mono overflow-x-auto max-h-56 whitespace-pre-wrap">{result.output}</pre>
                      </div>
                    )}

                    {/* Check items */}
                    {result.checks.length > 0 && (
                      <div className="space-y-2">
                        <h3 className="text-[10px] font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                          <Layers size={12} className="text-indigo-400" /> Check Results
                        </h3>
                        {result.checks.map((c, i) => <CheckRow key={i} check={c} />)}
                      </div>
                    )}

                    {/* Recommendations */}
                    {result.recommendations.length > 0 && (
                      <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800/60">
                        <h4 className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
                          <Cpu size={12} className="text-indigo-400" /> Recommendations
                        </h4>
                        <ol className="space-y-2">
                          {result.recommendations.map((r, i) => (
                            <li key={i} className="flex gap-2.5 text-xs text-slate-400 leading-relaxed">
                              <span className="w-4 h-4 rounded-full bg-indigo-500/20 text-indigo-400 text-[9px] font-black flex items-center justify-center shrink-0 mt-0.5">{i + 1}</span>
                              {r}
                            </li>
                          ))}
                        </ol>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="flex-grow flex flex-col items-center justify-center text-center p-8 border border-dashed border-slate-800 bg-slate-900/10 rounded-2xl">
                    <div className="w-12 h-12 rounded-2xl bg-slate-800/60 flex items-center justify-center mb-3 text-slate-600">
                      {TOOL_ICONS[tool.slug] ?? <Search size={20} />}
                    </div>
                    <p className="text-slate-500 text-xs max-w-xs leading-relaxed">
                      {isSchemaGen ? 'Fill in the fields on the left — your JSON-LD will appear here.' : 'Enter your input and click Run Analysis.'}
                    </p>
                  </div>
                )}
              </div>

            </div>
          )}
        </div>
      </section>
    </div>
  );
};