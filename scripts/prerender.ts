// Prerenders key routes after the production build.
//
// vite-plugin-prerender (and the @prerenderer/renderer-puppeteer it wraps)
// pins puppeteer ^1.7.0, whose bundled Chromium (~Chrome 71, 2018) predates
// optional chaining support (Chrome 80+). The app's modern production bundle
// uses `?.` throughout, so that ancient browser throws a SyntaxError before
// React mounts, and every "prerendered" route just captures the static
// index.html fallback instead of its own hydrated content.
//
// This script serves dist/ with a plain static server and drives a current
// puppeteer install instead, so the real per-route DOM (after
// react-helmet-async sets per-page title/meta) gets captured correctly.
import express from 'express';
import fs from 'fs';
import path from 'path';
import puppeteer from 'puppeteer';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DIST_DIR = path.join(__dirname, '..', 'dist');
const PORT = 4173;

const PRERENDER_ROUTES = [
  '/',
  '/about',
  '/services',
  '/contact',
  '/blog',
  '/case-studies',
  '/free-seo-audit',
  '/google-workspace',
  '/hosting',
];

function routeToHtmlPath(route: string): string {
  if (route === '/') return path.join(DIST_DIR, 'index.html');
  return path.join(DIST_DIR, route.replace(/^\//, ''), 'index.html');
}

async function startStaticServer(): Promise<import('http').Server> {
  const app = express();
  app.use(express.static(DIST_DIR));
  app.use((_req, res) => {
    res.type('html').send(fs.readFileSync(path.join(DIST_DIR, 'index.html'), 'utf-8'));
  });
  return new Promise((resolve) => {
    const server = app.listen(PORT, () => resolve(server));
  });
}

async function main(): Promise<void> {
  const server = await startStaticServer();
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  try {
    for (const route of PRERENDER_ROUTES) {
      const page = await browser.newPage();
      await page.goto(`http://localhost:${PORT}${route}`, { waitUntil: 'networkidle0' });
      // Allow Firebase auth + data fetches (services/seoPages) to resolve
      // before react-helmet-async sets the final per-route meta tags.
      await new Promise((resolve) => setTimeout(resolve, 4000));
      const html = await page.content();
      await page.close();

      const outPath = routeToHtmlPath(route);
      fs.mkdirSync(path.dirname(outPath), { recursive: true });
      fs.writeFileSync(outPath, html);
      console.log(`Prerendered ${route} -> ${outPath}`);
    }
  } finally {
    await browser.close();
    server.close();
  }
}

main();
