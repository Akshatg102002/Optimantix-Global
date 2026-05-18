import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { INITIAL_SERVICES, INITIAL_BLOGS } from '../constants';
import { AUTHENTIC_CASE_STUDIES } from '../data/caseStudies';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function generateSitemap() {
  const baseUrl = 'https://optimantix.com';
  let urls = `
    <url><loc>${baseUrl}/</loc><changefreq>weekly</changefreq><priority>1.0</priority></url>
    <url><loc>${baseUrl}/services</loc><changefreq>weekly</changefreq><priority>0.9</priority></url>
    <url><loc>${baseUrl}/blog</loc><changefreq>weekly</changefreq><priority>0.8</priority></url>
    <url><loc>${baseUrl}/case-studies</loc><changefreq>weekly</changefreq><priority>0.8</priority></url>
    <url><loc>${baseUrl}/google-workspace</loc><changefreq>monthly</changefreq><priority>0.7</priority></url>
    <url><loc>${baseUrl}/hosting</loc><changefreq>monthly</changefreq><priority>0.7</priority></url>
    <url><loc>${baseUrl}/contact</loc><changefreq>monthly</changefreq><priority>0.8</priority></url>
  `;

  // Add Services
  for (const service of INITIAL_SERVICES) {
    if (!service.slug) continue;
    urls += `
      <url>
        <loc>${baseUrl}/services/${service.slug}</loc>
        <changefreq>monthly</changefreq>
        <priority>0.8</priority>
      </url>
    `;
    
    // Add Sub-services if any exist in the process steps or feature list logic
    // We can skip deep sub-services if not easily mapable here
  }

  // Add Blogs
  for (const blog of INITIAL_BLOGS) {
    if (!blog.slug) continue;
    urls += `
      <url>
        <loc>${baseUrl}/blog/${blog.slug}</loc>
        <changefreq>monthly</changefreq>
        <priority>0.7</priority>
      </url>
    `;
  }

  // Add Case Studies
  for (const study of AUTHENTIC_CASE_STUDIES) {
    if (!study.slug) continue;
    urls += `
      <url>
        <loc>${baseUrl}/case/${study.slug}</loc>
        <changefreq>monthly</changefreq>
        <priority>0.7</priority>
      </url>
    `;
  }

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;

  const publicPath = path.resolve(__dirname, '../public');
  if (!fs.existsSync(publicPath)) {
    fs.mkdirSync(publicPath, { recursive: true });
  }

  fs.writeFileSync(path.join(publicPath, 'sitemap.xml'), sitemap);
  console.log('Sitemap generated successfully at public/sitemap.xml');
}

generateSitemap().catch(console.error);
