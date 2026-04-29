import express from "express";
import { createServer as createViteServer } from "vite";
import path from 'path';
import { fileURLToPath } from 'url';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, query, Firestore } from 'firebase/firestore';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Very basic configuration since we just need to read public data strictly for sitemap
// Note: Normally we'd use Firebase Admin for server-side, but the client credentials will work for public reads
const configPath = path.resolve(__dirname, 'firebase-applet-config.json');

let db: Firestore | null = null;

try {
  if (fs.existsSync(configPath)) {
    const firebaseConfig = JSON.parse(fs.readFileSync(configPath, 'utf8'));
    const appFirebase = initializeApp(firebaseConfig);
    db = getFirestore(appFirebase, firebaseConfig.firestoreDatabaseId);
    console.log('Firebase initialized successfully for sitemap generation.');
  } else {
    console.warn('firebase-applet-config.json not found. Dynamic sitemap generation will be limited.');
  }
} catch (error) {
  console.warn('Failed to load firebase config:', error);
}

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

  // Redirect /sitemap to /sitemap.xml
  app.get('/sitemap', (req, res) => {
    res.redirect(301, '/sitemap.xml');
  });

  // Dynamic Sitemap Generator
  app.get('/sitemap.xml', async (req, res) => {
    try {
      res.header('Content-Type', 'application/xml');
      
      const baseUrl = 'https://optimantix.com';
      let urls = `
        <url>
          <loc>${baseUrl}</loc>
          <changefreq>daily</changefreq>
          <priority>1.0</priority>
        </url>
        <url>
          <loc>${baseUrl}/services</loc>
          <changefreq>weekly</changefreq>
          <priority>0.9</priority>
        </url>
        <url>
          <loc>${baseUrl}/portfolio</loc>
          <changefreq>weekly</changefreq>
          <priority>0.8</priority>
        </url>
        <url>
          <loc>${baseUrl}/about</loc>
          <changefreq>monthly</changefreq>
          <priority>0.7</priority>
        </url>
        <url>
          <loc>${baseUrl}/contact</loc>
          <changefreq>monthly</changefreq>
          <priority>0.7</priority>
        </url>
        <url>
          <loc>${baseUrl}/blog</loc>
          <changefreq>daily</changefreq>
          <priority>0.9</priority>
        </url>
        <url>
          <loc>${baseUrl}/case-studies</loc>
          <changefreq>weekly</changefreq>
          <priority>0.9</priority>
        </url>
      `;

      // Fetch dynamic blogs directly from Firestore
      if (db) {
        try {
          const blogsSnap = await getDocs(query(collection(db, 'blogs')));
          blogsSnap.forEach(doc => {
            const data = doc.data();
            if (data.slug) {
              urls += `
                <url>
                  <loc>${baseUrl}/blog/${data.slug}</loc>
                  <changefreq>weekly</changefreq>
                  <priority>0.8</priority>
                </url>
              `;
            }
          });

          // Fetch dynamic services 
          const servicesSnap = await getDocs(query(collection(db, 'services')));
          servicesSnap.forEach(doc => {
            const data = doc.data();
            if (data.slug) {
               urls += `
                <url>
                  <loc>${baseUrl}/services/${data.slug}</loc>
                  <changefreq>monthly</changefreq>
                  <priority>0.8</priority>
                </url>
              `;
            }
          });

          // Fetch dynamic case studies
          const caseStudiesSnap = await getDocs(query(collection(db, 'case_studies')));
          caseStudiesSnap.forEach(doc => {
            const data = doc.data();
            if (data.slug) {
              urls += `
                <url>
                  <loc>${baseUrl}/case-studies/${data.slug}</loc>
                  <changefreq>monthly</changefreq>
                  <priority>0.8</priority>
                </url>
              `;
            }
          });
        } catch (dbError) {
          console.warn('Error fetching dynamic routes for sitemap:', dbError);
        }
      }

      const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
        <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
          ${urls}
        </urlset>`;
      
      res.send(sitemap);
    } catch (e) {
      console.error('Failed to generate sitemap', e);
      res.status(500).end();
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
    app.use(express.static(path.join(__dirname, 'dist')));
    app.use((req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
