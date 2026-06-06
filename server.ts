import express from "express";
import { createServer as createViteServer } from "vite";
import path from 'path';
import { readFile } from 'fs/promises';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SITE_ORIGIN = 'https://optimantix.com';

const normalizePath = (requestPath: string) => {
  const normalized = requestPath.split(/[?#]/)[0] || '/';
  return normalized.length > 1 ? normalized.replace(/\/+$/, '') : '/';
};

const canonicalFromRequestPath = (requestPath: string) => {
  const normalizedPath = normalizePath(requestPath);
  return normalizedPath === '/' ? SITE_ORIGIN : `${SITE_ORIGIN}${normalizedPath}`;
};

const escapeHtmlAttribute = (value: string) =>
  value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const injectFallbackCanonical = (html: string, requestPath: string) => {
  const canonicalUrl = escapeHtmlAttribute(canonicalFromRequestPath(requestPath));
  const canonicalTag = `<link id="canonical-link" rel="canonical" href="${canonicalUrl}" data-managed-by="route-seo" />`;

  if (html.includes('<!--SEO_CANONICAL-->')) {
    return html.replace('<!--SEO_CANONICAL-->', canonicalTag);
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
    // Serve static files in production. HTML requests get a route-aware fallback
    // canonical tag immediately; the React SEO layer replaces it with any
    // Admin-configured canonical URL after hydration.
    const distPath = path.join(__dirname, 'dist');
    const indexHtmlPath = path.join(distPath, 'index.html');

    app.use(express.static(distPath));
    app.use(async (req, res, next) => {
      try {
        const html = await readFile(indexHtmlPath, 'utf8');
        res.type('html').send(injectFallbackCanonical(html, req.path));
      } catch (error) {
        next(error);
      }
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
