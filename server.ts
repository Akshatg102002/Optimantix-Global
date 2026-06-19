import express from "express";
import { createServer as createViteServer } from "vite";
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SITE_URL = 'https://optimantix.com';

const normalizePath = (pathname: string): string => {
  const cleanPath = pathname.endsWith('/') && pathname.length > 1 ? pathname.slice(0, -1) : pathname;
  return cleanPath || '/';
};

const buildCanonicalUrl = (pathname: string): string => {
  const cleanPath = normalizePath(pathname);
  return `${SITE_URL}${cleanPath === '/' ? '/' : cleanPath}`;
};

const injectCanonical = (html: string, pathname: string): string => {
  const canonicalTag = `<link rel="canonical" href="${buildCanonicalUrl(pathname)}" />`;

  if (html.includes('rel="canonical"')) {
    return html.replace(/<link\s+rel=["']canonical["'][^>]*>/i, canonicalTag);
  }

  return html.replace('</head>', `  ${canonicalTag}\n</head>`);
};

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Enforce Trailing Slash Canonicalization via 301 Redirect for SEO consistency
  app.use((req, res, next) => {
    if (req.path.endsWith('/') && req.path.length > 1) {
      const query = req.url.slice(req.path.length);
      const safePath = req.path.slice(0, -1).replace(/\/+/g, '/');
      res.redirect(301, safePath + query);
    } else {
      next();
    }
  });

  // ── API Routes ──────────────────────────────────────────────────────────────

  app.post('/api/crawl', async (req, res) => {
    const { url } = req.body as { url: string };
    try { new URL(url); } catch { return res.status(400).json({ error: 'Invalid URL' }); }
    try {
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), 10000);
      const response = await fetch(url, {
        signal: controller.signal,
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
          'Accept-Language': 'en-US,en;q=0.5',
        },
      });
      clearTimeout(timer);
      const html = await response.text();
      res.json({ html, status: response.status, finalUrl: response.url });
    } catch (e) {
      res.json({ error: (e as Error).message });
    }
  });

  app.post('/api/check-robots', async (req, res) => {
    const { url } = req.body as { url: string };
    try {
      const origin = new URL(url).origin;
      const robotsUrl = `${origin}/robots.txt`;
      const response = await fetch(robotsUrl, {
        headers: { 'User-Agent': 'Googlebot/2.1 (+http://www.google.com/bot.html)' },
      });
      const content = await response.text();
      res.json({ content, url: robotsUrl, status: response.status });
    } catch (e) {
      res.json({ error: (e as Error).message });
    }
  });

  app.post('/api/check-sitemap', async (req, res) => {
    const { url } = req.body as { url: string };
    try {
      const origin = new URL(url).origin;
      const candidates = url.endsWith('.xml') ? [url] : [
        `${origin}/sitemap.xml`,
        `${origin}/sitemap_index.xml`,
      ];
      for (const u of candidates) {
        try {
          const r = await fetch(u);
          if (r.ok) {
            const content = await r.text();
            return res.json({ content, url: u, status: r.status, found: true });
          }
        } catch { continue; }
      }
      res.json({ error: 'No sitemap found at common paths.', found: false });
    } catch (e) {
      res.json({ error: (e as Error).message });
    }
  });

  // ── Vite / Static ───────────────────────────────────────────────────────────

  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(__dirname, 'dist');
    const indexPath = path.join(distPath, 'index.html');

    app.use(express.static(distPath));
    app.use((req, res) => {
      const html = fs.readFileSync(indexPath, 'utf-8');
      res.type('html').send(injectCanonical(html, req.path));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();