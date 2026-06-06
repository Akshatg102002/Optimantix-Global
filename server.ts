import express from "express";
import { createServer as createViteServer } from "vite";
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SITE_URL = 'https://optimantix.com';
const FIREBASE_PROJECT_ID = 'optimantix-bff51';
const FIREBASE_API_KEY = 'AIzaSyAAkkYGflaBbPyR6teV9fXEsf-JuoUibYE';
const SEO_CACHE_TTL_MS = 5 * 60 * 1000;

interface SeoPageRecord {
  id: string;
  path: string;
  canonicalUrl: string;
}

interface FirestoreStringField {
  stringValue?: string;
}

interface FirestoreSeoDocument {
  name: string;
  fields?: Record<string, FirestoreStringField>;
}

let seoCache: { expiresAt: number; pages: SeoPageRecord[]; pending?: Promise<SeoPageRecord[]> } = {
  expiresAt: 0,
  pages: [],
};

const normalizePath = (pathname: string): string => {
  const [pathOnly] = pathname.split(/[?#]/);
  const withLeadingSlash = pathOnly.startsWith('/') ? pathOnly : `/${pathOnly}`;
  const cleanPath = withLeadingSlash.endsWith('/') && withLeadingSlash.length > 1 ? withLeadingSlash.slice(0, -1) : withLeadingSlash;
  return cleanPath || '/';
};

const buildCanonicalUrl = (pathname: string): string => {
  const cleanPath = normalizePath(pathname);
  return `${SITE_URL}${cleanPath === '/' ? '/' : cleanPath}`;
};

const getFirestoreString = (doc: FirestoreSeoDocument, fieldName: string): string => {
  return doc.fields?.[fieldName]?.stringValue?.trim() || '';
};

const getFirestoreDocId = (docName: string): string => {
  const encodedId = docName.split('/').pop() || '';

  try {
    return decodeURIComponent(encodedId);
  } catch {
    return encodedId;
  }
};

const fetchSeoPages = async (): Promise<SeoPageRecord[]> => {
  if (seoCache.expiresAt > Date.now()) return seoCache.pages;
  if (seoCache.pending) return seoCache.pending;

  const requestUrl = `https://firestore.googleapis.com/v1/projects/${FIREBASE_PROJECT_ID}/databases/(default)/documents/seo_pages?key=${FIREBASE_API_KEY}`;

  seoCache.pending = fetch(requestUrl)
    .then(async response => {
      if (!response.ok) {
        throw new Error(`Firestore SEO fetch failed with ${response.status}`);
      }

      const payload = await response.json() as { documents?: FirestoreSeoDocument[] };
      const pages = (payload.documents || []).map(doc => {
        const docId = getFirestoreDocId(doc.name);
        return {
          id: getFirestoreString(doc, 'id') || getFirestoreString(doc, 'path') || docId,
          path: getFirestoreString(doc, 'path') || docId,
          canonicalUrl: getFirestoreString(doc, 'canonicalUrl'),
        };
      });

      seoCache = {
        expiresAt: Date.now() + SEO_CACHE_TTL_MS,
        pages,
      };

      return pages;
    })
    .catch(error => {
      console.warn('Unable to load server-side SEO settings; using fallback canonical:', error);
      seoCache.pending = undefined;
      return seoCache.pages;
    });

  return seoCache.pending;
};

const resolveCanonicalUrl = async (pathname: string): Promise<string> => {
  const currentPath = normalizePath(pathname);
  const pages = await fetchSeoPages();
  const seoOverride = pages.find(page => normalizePath(page.path) === currentPath || normalizePath(page.id) === currentPath);

  return seoOverride?.canonicalUrl || buildCanonicalUrl(currentPath);
};

const injectCanonical = (html: string, canonicalUrl: string): string => {
  const canonicalTag = `<link rel="canonical" href="${canonicalUrl}" data-seo-managed="true" />`;

  if (html.includes('rel="canonical"')) {
    return html.replace(/<link\s+[^>]*rel=["']canonical["'][^>]*>/i, canonicalTag);
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
    app.use(async (req, res) => {
      const html = fs.readFileSync(indexPath, 'utf-8');
      const canonicalUrl = await resolveCanonicalUrl(req.path);
      res.type('html').send(injectCanonical(html, canonicalUrl));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
