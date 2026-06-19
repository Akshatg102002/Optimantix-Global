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

  // API routes FIRST
  
  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Serve static files in production
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
