import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { getAuth, signInAnonymously } from 'firebase/auth';
import { INITIAL_SERVICES, INITIAL_BLOGS } from '../constants';
import { AUTHENTIC_CASE_STUDIES } from '../data/caseStudies';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE_URL = 'https://optimantix.com';

// Firebase client config (same project as the web app), sourced from env vars.
const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_API_KEY,
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VITE_FIREBASE_APP_ID,
  measurementId: process.env.VITE_FIREBASE_MEASUREMENT_ID,
};

interface SitemapEntry {
  loc: string;
  lastmod?: string;
  changefreq: 'weekly' | 'monthly' | 'yearly';
  priority: string;
}

const toIsoDate = (value: unknown): string => {
  if (!value) return new Date().toISOString().split('T')[0];
  const d = new Date(value as string);
  if (isNaN(d.getTime())) return new Date().toISOString().split('T')[0];
  return d.toISOString().split('T')[0];
};

const xmlEscape = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/**
 * Fetch published documents from Firestore at build time so newly published
 * blogs, case studies and pages are automatically included on every build.
 * Falls back gracefully to bundled static data if the network/DB is
 * unavailable (e.g. offline CI), so the build never fails.
 */
async function fetchFirestoreContent() {
  const result: {
    blogs: any[];
    caseStudies: any[];
    pages: any[];
    source: 'firestore' | 'static-fallback';
  } = { blogs: [], caseStudies: [], pages: [], source: 'firestore' };

  try {
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);

    // The web app reads these collections via anonymous auth; mirror that here.
    try {
      await signInAnonymously(getAuth(app));
    } catch {
      // Non-fatal — proceed in case the collections allow public reads.
    }

    const withTimeout = <T>(p: Promise<T>, ms = 20000): Promise<T> =>
      Promise.race([
        p,
        new Promise<T>((_, reject) => setTimeout(() => reject(new Error('Firestore timeout')), ms)),
      ]);

    const [blogsSnap, csSnap, pagesSnap] = await withTimeout(
      Promise.all([
        getDocs(collection(db, 'blogs')),
        getDocs(collection(db, 'case_studies')),
        getDocs(collection(db, 'pages')),
      ])
    );

    result.blogs = blogsSnap.docs.map((d) => ({ id: d.id, ...d.data() }));
    result.caseStudies = csSnap.docs.map((d) => ({ id: d.id, ...d.data() }));
    result.pages = pagesSnap.docs.map((d) => ({ id: d.id, ...d.data() }));
  } catch (err) {
    console.warn('Sitemap: Firestore fetch failed, using static fallback.', (err as Error)?.message);
    result.source = 'static-fallback';
  }

  // Always merge static bundled data as a baseline so nothing is ever missed.
  if (result.blogs.length === 0) result.blogs = INITIAL_BLOGS as any[];
  if (result.caseStudies.length === 0) result.caseStudies = AUTHENTIC_CASE_STUDIES as any[];

  return result;
}

async function generateSitemap() {
  const today = new Date().toISOString().split('T')[0];
  const entries: SitemapEntry[] = [];

  // ── Static / core routes ─────────────────────────────────────────────────
  entries.push({ loc: `${BASE_URL}/`, lastmod: today, changefreq: 'weekly', priority: '1.0' });
  entries.push({ loc: `${BASE_URL}/services`, lastmod: today, changefreq: 'monthly', priority: '0.8' });
  entries.push({ loc: `${BASE_URL}/services/digital-marketing/seo`, lastmod: today, changefreq: 'monthly', priority: '0.8' });
  entries.push({ loc: `${BASE_URL}/blog`, lastmod: today, changefreq: 'weekly', priority: '0.7' });
  entries.push({ loc: `${BASE_URL}/case-studies`, lastmod: today, changefreq: 'weekly', priority: '0.7' });
  entries.push({ loc: `${BASE_URL}/about`, lastmod: today, changefreq: 'monthly', priority: '0.5' });
  entries.push({ loc: `${BASE_URL}/contact`, lastmod: today, changefreq: 'monthly', priority: '0.5' });
  entries.push({ loc: `${BASE_URL}/free-seo-audit`, lastmod: today, changefreq: 'monthly', priority: '0.5' });
  entries.push({ loc: `${BASE_URL}/google-workspace`, lastmod: today, changefreq: 'monthly', priority: '0.5' });
  entries.push({ loc: `${BASE_URL}/hosting`, lastmod: today, changefreq: 'monthly', priority: '0.5' });

  // ── Service pages (+ sub-services) ───────────────────────────────────────
  for (const service of INITIAL_SERVICES) {
    if (!service.slug) continue;
    entries.push({
      loc: `${BASE_URL}/services/${service.slug}`,
      lastmod: today,
      changefreq: 'monthly',
      priority: '0.8',
    });
    if (Array.isArray(service.subServices)) {
      for (const sub of service.subServices) {
        if (!sub.slug) continue;
        entries.push({
          loc: `${BASE_URL}/services/${service.slug}/${sub.slug}`,
          lastmod: today,
          changefreq: 'monthly',
          priority: '0.7',
        });
      }
    }
  }

  const { blogs, caseStudies, pages, source } = await fetchFirestoreContent();

  // ── Blog posts (published) ───────────────────────────────────────────────
  for (const blog of blogs) {
    if (!blog.slug) continue;
    if (blog.isPublished === false) continue;
    entries.push({
      loc: `${BASE_URL}/blog/${blog.slug}`,
      lastmod: toIsoDate(blog.updatedAt || blog.date),
      changefreq: 'weekly',
      priority: '0.7',
    });
  }

  // ── Case studies ─────────────────────────────────────────────────────────
  // Static authentic case studies live at /case/:slug
  for (const study of AUTHENTIC_CASE_STUDIES) {
    if (!study.slug) continue;
    entries.push({
      loc: `${BASE_URL}/case/${study.slug}`,
      lastmod: toIsoDate(study.date),
      changefreq: 'weekly',
      priority: '0.7',
    });
  }
  // Firestore-managed case studies live at /case-studies/:slug
  if (source === 'firestore') {
    for (const study of caseStudies) {
      if (!study.slug) continue;
      entries.push({
        loc: `${BASE_URL}/case-studies/${study.slug}`,
        lastmod: toIsoDate(study.updatedAt || study.date),
        changefreq: 'weekly',
        priority: '0.7',
      });
    }
  }

  // ── De-duplicate by loc ──────────────────────────────────────────────────
  const seen = new Set<string>();
  const unique = entries.filter((e) => {
    if (seen.has(e.loc)) return false;
    seen.add(e.loc);
    return true;
  });

  const renderUrlBlock = (e: SitemapEntry) => `  <url>
    <loc>${xmlEscape(e.loc)}</loc>
    <lastmod>${e.lastmod}</lastmod>
    <changefreq>${e.changefreq}</changefreq>
    <priority>${e.priority}</priority>
  </url>`;

  // ── Pages module (published) at /services/{slug}, grouped by parentService
  // so related pages appear together under a category comment ────────────
  interface SitemapPage {
    slug?: string;
    isPublished?: boolean;
    parentService?: string | null;
    updatedAt?: string;
    createdAt?: string;
  }
  const publishedPages = (pages as SitemapPage[]).filter((p) => p.slug && p.isPublished !== false);
  const pagesByCategory = new Map<string, SitemapPage[]>();
  for (const page of publishedPages) {
    const key = typeof page.parentService === 'string' && page.parentService ? page.parentService : '';
    if (!pagesByCategory.has(key)) pagesByCategory.set(key, []);
    pagesByCategory.get(key)!.push(page);
  }

  // Group order: INITIAL_SERVICES order first, then standalone pages last.
  const groupOrder = [...INITIAL_SERVICES.map((s) => s.slug), ''];
  for (const key of pagesByCategory.keys()) {
    if (!groupOrder.includes(key)) groupOrder.push(key);
  }

  const pageBlocks: string[] = [];
  let pageUrlCount = 0;
  for (const key of groupOrder) {
    const group = pagesByCategory.get(key);
    if (!group || group.length === 0) continue;

    const categoryLabel = key ? INITIAL_SERVICES.find((s) => s.slug === key)?.title || key : 'Uncategorized';
    pageBlocks.push(`  <!-- Category: ${xmlEscape(categoryLabel)} -->`);

    for (const page of group) {
      const loc = `${BASE_URL}/services/${page.slug}`;
      if (seen.has(loc)) continue;
      seen.add(loc);
      pageBlocks.push(
        renderUrlBlock({
          loc,
          lastmod: toIsoDate(page.updatedAt || page.createdAt),
          changefreq: 'weekly',
          priority: '0.7',
        })
      );
      pageUrlCount += 1;
    }
  }

  const urlsXml = [...unique.map(renderUrlBlock), ...pageBlocks].join('\n');

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlsXml}
</urlset>
`;

  const publicPath = path.resolve(__dirname, '../public');
  if (!fs.existsSync(publicPath)) {
    fs.mkdirSync(publicPath, { recursive: true });
  }

  fs.writeFileSync(path.join(publicPath, 'sitemap.xml'), sitemap);
  console.log(`Sitemap generated (${unique.length + pageUrlCount} URLs, data source: ${source}) at public/sitemap.xml`);

  // Force-exit: the Firebase client keeps the event loop alive otherwise.
  process.exit(0);
}

generateSitemap().catch((err) => {
  console.error('Sitemap generation error:', err);
  process.exit(0); // Never fail the build because of the sitemap.
});
