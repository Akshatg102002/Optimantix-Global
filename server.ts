import express from "express";
import { createServer as createViteServer } from "vite";
import { Resend } from 'resend';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Initialize Resend
  const resend = new Resend(process.env.RESEND_API_KEY || 're_VDxHSd9Q_KDURrtak3UEbnE6n1bvB5Eep');

  app.use(express.json());

  // API routes FIRST
  app.post("/api/contact", async (req, res) => {
    try {
      const { name, email, phone, company, serviceInterest, message } = req.body;

      const { data, error } = await resend.emails.send({
        from: 'Optimantix Global <onboarding@resend.dev>',
        to: ['optimantixglobal@gmail.com'], // Defaulting to a sensible email or the user's if known. I'll use a placeholder or the user's email if provided.
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
    } catch (err: any) {
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
