import express from "express";
import { createServer as createViteServer } from "vite";
import { Resend } from 'resend';
import path from 'path';
import { fileURLToPath } from 'url';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, query } from 'firebase/firestore';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Very basic configuration since we just need to read public data strictly for sitemap
// Note: Normally we'd use Firebase Admin for server-side, but the client credentials will work for public reads
const configPath = path.resolve(__dirname, 'firebase-applet-config.json');
let db: any = null;

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

  const resend = new Resend(process.env.RESEND_API_KEY || 're_VDxHSd9Q_KDURrtak3UEbnE6n1bvB5Eep');

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
      
      const baseUrl = 'https://optimantix-global.com';
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
  app.post("/api/contact", async (req, res) => {
    try {
      const { name, email, phone, company, serviceInterest, message } = req.body;

      const { data, error } = await resend.emails.send({
        from: 'Optimantix Global <onboarding@resend.dev>',
        to: ['akshatg193@gmail.com'], // Updated to owner's email for testing as per Resend restrictions
        subject: `New Lead: ${serviceInterest}`,
        html: `
          <div style="font-family: sans-serif; padding: 20px; color: #333;">
            <h2 style="color: #4F46E5;">New Contact Form Submission</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>Company:</strong> ${company || 'N/A'}</p>
            <p><strong>Service Interest:</strong> ${serviceInterest}</p>
            <div style="margin-top: 20px; padding: 15px; background-color: #f3f4f6; rounded: 8px;">
              <p><strong>Message:</strong></p>
              <p>${message}</p>
            </div>
          </div>
        `,
      });

      if (error) {
        console.error('Resend Error:', error);
        return res.status(400).json({ success: false, message: error.message });
      }

      res.json({ success: true, data });
    } catch (err: unknown) {
      console.error('Server Error:', err);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  });

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
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
