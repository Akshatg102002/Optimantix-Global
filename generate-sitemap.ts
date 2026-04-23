import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, query } from 'firebase/firestore';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function generateSitemap() {
  const configPath = path.resolve(__dirname, 'firebase-applet-config.json');
  let db: any = null;

  try {
    if (fs.existsSync(configPath)) {
      const firebaseConfig = JSON.parse(fs.readFileSync(configPath, 'utf8'));
      const appFirebase = initializeApp(firebaseConfig);
      db = getFirestore(appFirebase, firebaseConfig.firestoreDatabaseId);
    }
  } catch (error) {
    console.warn('Failed to load firebase config:', error);
  }

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
    <url>
      <loc>${baseUrl}/case-studies</loc>
      <changefreq>weekly</changefreq>
      <priority>0.9</priority>
    </url>
  `;

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
    </url>`;
        }
      });

      const servicesSnap = await getDocs(query(collection(db, 'services')));
      servicesSnap.forEach(doc => {
        const data = doc.data();
        if (data.slug) {
           urls += `
    <url>
      <loc>${baseUrl}/services/${data.slug}</loc>
      <changefreq>monthly</changefreq>
      <priority>0.8</priority>
    </url>`;
        }
      });
      
      const caseStudiesSnap = await getDocs(query(collection(db, 'case_studies')));
      caseStudiesSnap.forEach(doc => {
        const data = doc.data();
        if (data.slug) {
           urls += `
    <url>
      <loc>${baseUrl}/case-studies/${data.slug}</loc>
      <changefreq>monthly</changefreq>
      <priority>0.8</priority>
    </url>`;
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

  // Write to public folder (for dev) and dist folder (for prod)
  fs.writeFileSync(path.resolve(__dirname, 'public', 'sitemap.xml'), sitemap);
  
  if (fs.existsSync(path.resolve(__dirname, 'dist'))) {
      fs.writeFileSync(path.resolve(__dirname, 'dist', 'sitemap.xml'), sitemap);
  }
  
  console.log('Sitemap successfully generated!');
  process.exit(0);
}

generateSitemap();
