import express from "express";
import { createServer as createViteServer } from "vite";
import { Resend } from 'resend';
import path from 'path';
import { fileURLToPath } from 'url';
import { promises as fs } from 'fs';
import type { BlogPost } from './types';
import { normalizeBlogPayload, generateSlug } from './utils/blog';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const BLOG_DB_PATH = path.join(__dirname, 'data', 'blogs.json');

const ensureBlogDb = async () => {
  await fs.mkdir(path.dirname(BLOG_DB_PATH), { recursive: true });
  try {
    await fs.access(BLOG_DB_PATH);
  } catch {
    await fs.writeFile(BLOG_DB_PATH, '[]', 'utf8');
  }
};

const readBlogs = async (): Promise<BlogPost[]> => {
  await ensureBlogDb();
  const raw = await fs.readFile(BLOG_DB_PATH, 'utf8');
  return JSON.parse(raw) as BlogPost[];
};

const writeBlogs = async (blogs: BlogPost[]) => {
  await ensureBlogDb();
  await fs.writeFile(BLOG_DB_PATH, JSON.stringify(blogs, null, 2), 'utf8');
};

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Initialize Resend
  const resend = new Resend(process.env.RESEND_API_KEY || 're_VDxHSd9Q_KDURrtak3UEbnE6n1bvB5Eep');

  app.use(express.json());

  app.get('/api/blogs', async (_req, res) => {
    const blogs = await readBlogs();
    res.json({ success: true, data: blogs.sort((a, b) => +new Date(b.date) - +new Date(a.date)) });
  });

  app.get('/api/blogs/:idOrSlug', async (req, res) => {
    const blogs = await readBlogs();
    const blog = blogs.find(
      (item) => item.id === req.params.idOrSlug || item.slug === req.params.idOrSlug
    );

    if (!blog) return res.status(404).json({ success: false, message: 'Blog not found' });
    return res.json({ success: true, data: blog });
  });

  app.post('/api/blogs', async (req, res) => {
    try {
      const blogs = await readBlogs();
      const normalized = normalizeBlogPayload(req.body);
      const finalSlug = blogs.some((b) => b.slug === normalized.slug)
        ? `${normalized.slug}-${Date.now()}`
        : normalized.slug;

      const created: BlogPost = {
        id: `blog-${Date.now()}`,
        ...normalized,
        slug: generateSlug(finalSlug)
      };

      await writeBlogs([created, ...blogs]);
      return res.status(201).json({ success: true, data: created });
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Failed to create blog';
      return res.status(400).json({ success: false, message });
    }
  });

  app.put('/api/blogs/:id', async (req, res) => {
    try {
      const blogs = await readBlogs();
      const index = blogs.findIndex((item) => item.id === req.params.id);
      if (index < 0) return res.status(404).json({ success: false, message: 'Blog not found' });

      const normalized = normalizeBlogPayload(req.body);
      const updated: BlogPost = { ...blogs[index], ...normalized, id: blogs[index].id };
      blogs[index] = updated;
      await writeBlogs(blogs);

      return res.json({ success: true, data: updated });
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Failed to update blog';
      return res.status(400).json({ success: false, message });
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
