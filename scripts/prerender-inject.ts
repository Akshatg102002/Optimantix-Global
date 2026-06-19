// Post-build verification for vite-plugin-prerender output.
// Confirms each prerendered route's HTML shell has a non-empty <title> tag
// (i.e. react-helmet-async successfully ran before the renderer captured
// the page), and logs any route that still shipped with an empty title.
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DIST_DIR = path.join(__dirname, '..', 'dist');

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

function extractTitle(html: string): string {
  const match = html.match(/<title>([^<]*)<\/title>/i);
  return match ? match[1].trim() : '';
}

function main(): void {
  const emptyTitles: string[] = [];
  const missingFiles: string[] = [];
  const titlesByRoute: Record<string, string> = {};

  for (const route of PRERENDER_ROUTES) {
    const filePath = routeToHtmlPath(route);
    if (!fs.existsSync(filePath)) {
      missingFiles.push(route);
      continue;
    }

    const html = fs.readFileSync(filePath, 'utf-8');
    const title = extractTitle(html);

    if (!title) {
      emptyTitles.push(route);
    } else {
      titlesByRoute[route] = title;
      console.log(`OK   ${route} -> "${title}"`);
    }
  }

  if (missingFiles.length > 0) {
    console.warn(`\nMissing prerendered HTML for: ${missingFiles.join(', ')}`);
  }

  if (emptyTitles.length > 0) {
    console.warn(`\nEmpty <title> after prerender for: ${emptyTitles.join(', ')}`);
  } else if (missingFiles.length === 0) {
    console.log('\nAll prerendered routes have a non-empty <title>.');
  }

  // Routes sharing an identical title (other than legitimately matching
  // duplicates) usually means the renderer crashed and every route fell
  // back to the same static shell content instead of its own page.
  const routesByTitle: Record<string, string[]> = {};
  for (const [route, title] of Object.entries(titlesByRoute)) {
    (routesByTitle[title] ??= []).push(route);
  }
  const suspiciousDuplicates = Object.entries(routesByTitle).filter(([, routes]) => routes.length > 1);
  if (suspiciousDuplicates.length > 0) {
    console.warn('\nMultiple routes share the same <title> (possible prerender failure):');
    for (const [title, routes] of suspiciousDuplicates) {
      console.warn(`  "${title}" -> ${routes.join(', ')}`);
    }
  }
}

main();
