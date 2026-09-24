import express, { Request, Response, NextFunction } from 'express';
import cookieParser from 'cookie-parser';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { getRepository } from './src/lib/repositories';
import {
  verifyAdminCredentials,
  generateSessionToken,
  requireAdminAuth,
  verifySessionToken
} from './src/lib/auth';
import { AIService } from './src/lib/ai';
import { sendEnquiryEmail } from './src/lib/email';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser());

// Static folders for persistent uploads
const uploadsDir = path.resolve(process.cwd(), 'uploads');
const publicUploadsDir = path.resolve(process.cwd(), 'public/uploads');

if (!fs.existsSync(path.join(uploadsDir, 'images'))) {
  fs.mkdirSync(path.join(uploadsDir, 'images'), { recursive: true });
}
if (!fs.existsSync(path.join(uploadsDir, 'videos'))) {
  fs.mkdirSync(path.join(uploadsDir, 'videos'), { recursive: true });
}
if (!fs.existsSync(path.join(publicUploadsDir, 'images'))) {
  fs.mkdirSync(path.join(publicUploadsDir, 'images'), { recursive: true });
}
if (!fs.existsSync(path.join(publicUploadsDir, 'videos'))) {
  fs.mkdirSync(path.join(publicUploadsDir, 'videos'), { recursive: true });
}

// Serve /uploads directly
app.use('/uploads', express.static(uploadsDir));
app.use('/public/uploads', express.static(publicUploadsDir));

// Multer Storage Configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isVideo = file.mimetype.startsWith('video/');
    const subfolder = isVideo ? 'videos' : 'images';
    cb(null, path.join(uploadsDir, subfolder));
  },
  filename: (req, file, cb) => {
    const safeName = file.originalname.replace(/[^a-zA-Z0-9.-]/g, '_');
    cb(null, `${Date.now()}-${safeName}`);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 50 * 1024 * 1024 }, // 50MB limit
  fileFilter: (req, file, cb) => {
    const allowedMimes = [
      'image/jpeg',
      'image/jpg',
      'image/png',
      'image/webp',
      'image/svg+xml',
      'video/mp4',
      'video/webm'
    ];
    if (allowedMimes.includes(file.mimetype.toLowerCase())) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Allowed: JPG, PNG, WEBP, SVG, MP4, WEBM'));
    }
  }
});

const repo = getRepository();

// ==========================================
// AUTHENTICATION ROUTES
// ==========================================

app.post('/api/auth/login', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).json({ success: false, message: 'Email and password required' });
      return;
    }

    const isValid = await verifyAdminCredentials(email, password);
    if (!isValid) {
      res.status(401).json({ success: false, message: 'Invalid admin credentials' });
      return;
    }

    const token = generateSessionToken(email);

    res.cookie('dg_session', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    res.json({ success: true, message: 'Logged in successfully', user: { email, role: 'admin' }, token });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ success: false, message: 'Internal server error during login' });
  }
});

app.post('/api/auth/logout', (req: Request, res: Response) => {
  res.clearCookie('dg_session');
  res.json({ success: true, message: 'Logged out successfully' });
});

app.get('/api/auth/session', (req: Request, res: Response) => {
  const token = req.cookies?.['dg_session'] || 
    (req.headers.authorization?.startsWith('Bearer ') ? req.headers.authorization.slice(7) : null);

  if (!token) {
    res.json({ authenticated: false });
    return;
  }

  const session = verifySessionToken(token);
  if (!session) {
    res.json({ authenticated: false });
    return;
  }

  res.json({ authenticated: true, user: { email: session.email, role: 'admin' } });
});

// ==========================================
// DATA & SITE API ROUTES
// ==========================================

// Get entire app state
app.get('/api/appdata', async (req: Request, res: Response) => {
  try {
    const data = await repo.getData();
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to retrieve application data' });
  }
});

app.get('/api/site', async (req: Request, res: Response) => {
  try {
    const site = await repo.getSite();
    res.json({ success: true, data: site });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to load site info' });
  }
});

app.put('/api/site', requireAdminAuth, async (req: Request, res: Response) => {
  try {
    const updated = await repo.updateSite(req.body);
    res.json({ success: true, message: 'Site settings updated', data: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to update site settings' });
  }
});

app.get('/api/home', async (req: Request, res: Response) => {
  try {
    const home = await repo.getHome();
    res.json({ success: true, data: home });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to load home data' });
  }
});

app.put('/api/home', requireAdminAuth, async (req: Request, res: Response) => {
  try {
    const updated = await repo.updateHome(req.body);
    res.json({ success: true, message: 'Home content updated successfully', data: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to update home content' });
  }
});

app.get('/api/about', async (req: Request, res: Response) => {
  try {
    const about = await repo.getAbout();
    res.json({ success: true, data: about });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to load about data' });
  }
});

app.put('/api/about', requireAdminAuth, async (req: Request, res: Response) => {
  try {
    const updated = await repo.updateAbout(req.body);
    res.json({ success: true, message: 'About content updated', data: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to update about content' });
  }
});

// Services
app.get('/api/services', async (req: Request, res: Response) => {
  try {
    const services = await repo.getServices();
    res.json({ success: true, data: services });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to load services' });
  }
});

app.post('/api/services', requireAdminAuth, async (req: Request, res: Response) => {
  try {
    const newService = await repo.addService(req.body);
    res.json({ success: true, message: 'Service added successfully', data: newService });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to add service' });
  }
});

app.put('/api/services/:id', requireAdminAuth, async (req: Request, res: Response) => {
  try {
    const updated = await repo.updateService(req.params.id, req.body);
    res.json({ success: true, message: 'Service updated', data: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to update service' });
  }
});

app.delete('/api/services/:id', requireAdminAuth, async (req: Request, res: Response) => {
  try {
    const deleted = await repo.deleteService(req.params.id);
    res.json({ success: deleted, message: deleted ? 'Service deleted' : 'Service not found' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to delete service' });
  }
});

// Portfolio
app.get('/api/portfolio', async (req: Request, res: Response) => {
  try {
    const portfolio = await repo.getPortfolio();
    res.json({ success: true, data: portfolio });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to load portfolio' });
  }
});

app.get('/api/portfolio/slug/:slug', async (req: Request, res: Response) => {
  try {
    const project = await repo.getProjectBySlug(req.params.slug);
    if (!project) {
      res.status(404).json({ success: false, message: 'Project not found' });
      return;
    }
    res.json({ success: true, data: project });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to load project' });
  }
});

app.post('/api/portfolio', requireAdminAuth, async (req: Request, res: Response) => {
  try {
    const newProject = await repo.addProject(req.body);
    res.json({ success: true, message: 'Project added successfully', data: newProject });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to create project' });
  }
});

app.put('/api/portfolio/:id', requireAdminAuth, async (req: Request, res: Response) => {
  try {
    const updated = await repo.updateProject(req.params.id, req.body);
    res.json({ success: true, message: 'Project updated successfully', data: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to update project' });
  }
});

app.delete('/api/portfolio/:id', requireAdminAuth, async (req: Request, res: Response) => {
  try {
    const deleted = await repo.deleteProject(req.params.id);
    res.json({ success: deleted, message: deleted ? 'Project removed' : 'Project not found' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to delete project' });
  }
});

// Testimonials
app.get('/api/testimonials', async (req: Request, res: Response) => {
  try {
    const testimonials = await repo.getTestimonials();
    res.json({ success: true, data: testimonials });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to load testimonials' });
  }
});

app.post('/api/testimonials', requireAdminAuth, async (req: Request, res: Response) => {
  try {
    const newTestimonial = await repo.addTestimonial(req.body);
    res.json({ success: true, message: 'Testimonial added', data: newTestimonial });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to add testimonial' });
  }
});

app.put('/api/testimonials/:id', requireAdminAuth, async (req: Request, res: Response) => {
  try {
    const updated = await repo.updateTestimonial(req.params.id, req.body);
    res.json({ success: true, message: 'Testimonial updated', data: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to update testimonial' });
  }
});

app.delete('/api/testimonials/:id', requireAdminAuth, async (req: Request, res: Response) => {
  try {
    const deleted = await repo.deleteTestimonial(req.params.id);
    res.json({ success: deleted, message: deleted ? 'Testimonial deleted' : 'Not found' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to delete testimonial' });
  }
});

// FAQs
app.get('/api/faqs', async (req: Request, res: Response) => {
  try {
    const faqs = await repo.getFaqs();
    res.json({ success: true, data: faqs });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to load faqs' });
  }
});

app.post('/api/faqs', requireAdminAuth, async (req: Request, res: Response) => {
  try {
    const newFaq = await repo.addFaq(req.body);
    res.json({ success: true, message: 'FAQ created', data: newFaq });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to create FAQ' });
  }
});

app.put('/api/faqs/:id', requireAdminAuth, async (req: Request, res: Response) => {
  try {
    const updated = await repo.updateFaq(req.params.id, req.body);
    res.json({ success: true, message: 'FAQ updated', data: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to update FAQ' });
  }
});

app.delete('/api/faqs/:id', requireAdminAuth, async (req: Request, res: Response) => {
  try {
    const deleted = await repo.deleteFaq(req.params.id);
    res.json({ success: deleted, message: deleted ? 'FAQ deleted' : 'Not found' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to delete FAQ' });
  }
});

// Contact & Enquiries
app.get('/api/contact', async (req: Request, res: Response) => {
  try {
    const contact = await repo.getContact();
    res.json({ success: true, data: contact });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to load contact info' });
  }
});

app.put('/api/contact', requireAdminAuth, async (req: Request, res: Response) => {
  try {
    const updated = await repo.updateContact(req.body);
    res.json({ success: true, message: 'Contact info updated', data: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to update contact info' });
  }
});

// User contact form submission
app.post('/api/contact', async (req: Request, res: Response) => {
  try {
    const { name, business, phone, email, businessType, requirement, message, honeypot } = req.body;

    // Spam check via honeypot
    if (honeypot) {
      res.status(400).json({ success: false, message: 'Invalid submission' });
      return;
    }

    if (!name || !phone || !email) {
      res.status(400).json({ success: false, message: 'Please provide Name, Phone, and Email' });
      return;
    }

    // Save enquiry
    const savedEnquiry = await repo.addEnquiry({
      name: String(name).trim(),
      business: String(business || '').trim(),
      phone: String(phone).trim(),
      email: String(email).trim(),
      businessType: String(businessType || 'General Service').trim(),
      requirement: String(requirement || 'Business Website').trim(),
      message: String(message || '').trim()
    });

    // Send email notification in background
    sendEnquiryEmail(savedEnquiry).catch((err) => console.error('Enquiry email trigger notice:', err));

    res.json({
      success: true,
      message: 'Thank you! Your project inquiry has been received. Our team will contact you shortly.',
      enquiryId: savedEnquiry.id
    });
  } catch (error) {
    console.error('Contact submission error:', error);
    res.status(500).json({ success: false, message: 'Failed to process enquiry. Please try again or WhatsApp us directly.' });
  }
});

app.get('/api/enquiries', requireAdminAuth, async (req: Request, res: Response) => {
  try {
    const enquiries = await repo.getEnquiries();
    res.json({ success: true, data: enquiries });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to load enquiries' });
  }
});

app.put('/api/enquiries/:id', requireAdminAuth, async (req: Request, res: Response) => {
  try {
    const { status } = req.body;
    const updated = await repo.updateEnquiryStatus(req.params.id, status);
    res.json({ success: true, message: 'Enquiry status updated', data: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to update enquiry status' });
  }
});

app.delete('/api/enquiries/:id', requireAdminAuth, async (req: Request, res: Response) => {
  try {
    const deleted = await repo.deleteEnquiry(req.params.id);
    res.json({ success: deleted, message: deleted ? 'Enquiry deleted' : 'Not found' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to delete enquiry' });
  }
});

// SEO & Analytics
app.get('/api/seo', async (req: Request, res: Response) => {
  try {
    const seo = await repo.getSeo();
    res.json({ success: true, data: seo });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to load SEO' });
  }
});

app.put('/api/seo', requireAdminAuth, async (req: Request, res: Response) => {
  try {
    const updated = await repo.updateSeo(req.body);
    res.json({ success: true, message: 'SEO settings updated', data: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to update SEO' });
  }
});

// AI Settings & Chat
app.get('/api/ai', async (req: Request, res: Response) => {
  try {
    const ai = await repo.getAiSettings();
    res.json({ success: true, data: ai });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to load AI settings' });
  }
});

app.put('/api/ai', requireAdminAuth, async (req: Request, res: Response) => {
  try {
    const updated = await repo.updateAiSettings(req.body);
    res.json({ success: true, message: 'AI configuration updated', data: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to update AI configuration' });
  }
});

app.post('/api/ai/chat', async (req: Request, res: Response) => {
  try {
    const { messages } = req.body;
    if (!messages || !Array.isArray(messages)) {
      res.status(400).json({ success: false, message: 'Messages array required' });
      return;
    }
    const aiService = AIService.getInstance();
    const reply = await aiService.handleChat(messages);
    res.json({ success: true, reply });
  } catch (error: any) {
    console.error('AI chat endpoint error:', error);
    res.status(500).json({ success: false, message: 'Failed to process AI chat request' });
  }
});

// Media Library Management
app.get('/api/media', requireAdminAuth, async (req: Request, res: Response) => {
  try {
    const media = await repo.getMedia();
    res.json({ success: true, data: media });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to load media' });
  }
});

app.post('/api/media/upload', requireAdminAuth, upload.single('file'), async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      res.status(400).json({ success: false, message: 'No file uploaded' });
      return;
    }

    const isVideo = req.file.mimetype.startsWith('video/');
    const subfolder = isVideo ? 'videos' : 'images';
    const relativePath = `/uploads/${subfolder}/${req.file.filename}`;

    // Mirror to public directory for immediate static access
    const publicDestination = path.join(publicUploadsDir, subfolder, req.file.filename);
    try {
      fs.copyFileSync(req.file.path, publicDestination);
    } catch (err) {
      console.warn('Mirroring notice:', err);
    }

    const mediaItem = await repo.addMedia({
      id: `med-${Date.now()}`,
      name: req.file.originalname,
      path: relativePath,
      size: req.file.size,
      type: req.file.mimetype,
      uploadedAt: new Date().toISOString()
    });

    res.json({ success: true, message: 'File uploaded successfully', data: mediaItem });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message || 'File upload failed' });
  }
});

app.delete('/api/media/:id', requireAdminAuth, async (req: Request, res: Response) => {
  try {
    const mediaList = await repo.getMedia();
    const item = mediaList.find((m) => m.id === req.params.id);

    if (item) {
      // Safe path checking to prevent path traversal
      const safeRelative = item.path.replace(/^\/uploads\//, '');
      const fullPath = path.resolve(uploadsDir, safeRelative);
      const publicPath = path.resolve(publicUploadsDir, safeRelative);

      if (fullPath.startsWith(uploadsDir) && fs.existsSync(fullPath)) {
        fs.unlinkSync(fullPath);
      }
      if (publicPath.startsWith(publicUploadsDir) && fs.existsSync(publicPath)) {
        fs.unlinkSync(publicPath);
      }
      await repo.deleteMedia(req.params.id);
    }

    res.json({ success: true, message: 'Media item deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to delete media item' });
  }
});

// Backups
app.get('/api/backups', requireAdminAuth, async (req: Request, res: Response) => {
  try {
    const backups = await repo.listBackups();
    res.json({ success: true, data: backups });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to list backups' });
  }
});

app.post('/api/backups/create', requireAdminAuth, async (req: Request, res: Response) => {
  try {
    const filename = await repo.createBackup();
    res.json({ success: true, message: 'Backup created successfully', filename });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to create backup' });
  }
});

app.post('/api/backups/restore', requireAdminAuth, async (req: Request, res: Response) => {
  try {
    const { filename } = req.body;
    if (!filename) {
      res.status(400).json({ success: false, message: 'Filename required' });
      return;
    }
    const success = await repo.restoreBackup(filename);
    res.json({ success, message: success ? 'Backup restored successfully' : 'Failed to restore backup' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to restore backup' });
  }
});

// Robots.txt
app.get('/robots.txt', (req: Request, res: Response) => {
  const robots = `
User-agent: *
Allow: /
Allow: /portfolio
Allow: /contact
Disallow: /admin
Disallow: /api/

Sitemap: https://ais-dev-opo4ykvnv3yzw6yl652hnr-732777127049.asia-southeast1.run.app/sitemap.xml
  `.trim();
  res.type('text/plain').send(robots);
});

// Dynamic Sitemap.xml
app.get('/sitemap.xml', async (req: Request, res: Response) => {
  try {
    const portfolio = await repo.getPortfolio();
    const published = portfolio.filter((p) => p.status === 'published');
    const baseUrl = 'https://ais-dev-opo4ykvnv3yzw6yl652hnr-732777127049.asia-southeast1.run.app';

    const urls = [
      { loc: `${baseUrl}/`, priority: '1.0', changefreq: 'weekly' },
      { loc: `${baseUrl}/portfolio`, priority: '0.9', changefreq: 'weekly' },
      { loc: `${baseUrl}/contact`, priority: '0.8', changefreq: 'monthly' },
      ...published.map((p) => ({
        loc: `${baseUrl}/portfolio/${p.slug}`,
        priority: '0.8',
        changefreq: 'monthly'
      }))
    ];

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) => `  <url>
    <loc>${u.loc}</loc>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;

    res.type('application/xml').send(xml);
  } catch (error) {
    res.status(500).send('Error generating sitemap');
  }
});

// Machine readable AI context: llms.txt (Section 53)
app.get('/llms.txt', async (req: Request, res: Response) => {
  try {
    const site = await repo.getSite();
    const about = await repo.getAbout();
    const services = await repo.getServices();
    const contact = await repo.getContact();

    const content = `
# ${site.name} — AI & Generative Search Information
Tagline: ${site.tagline}
Description: ${site.description}

## About
Location: ${about.location}
Mission: ${about.mission}
Vision: ${about.vision}

## Services Offered
${services.map((s) => `- ${s.title}: ${s.shortDesc}`).join('\n')}

## Contact
Email: ${contact.email}
Phone / WhatsApp: ${contact.phone}
Address: ${contact.address}, ${contact.city}, ${contact.state}, ${contact.country}
Website: ${site.url}
    `.trim();

    res.type('text/plain').send(content);
  } catch (err) {
    res.status(500).send('Error generating llms.txt');
  }
});

// Mount Vite or serve static files in production
async function startServer() {
  const isProduction = process.env.NODE_ENV === 'production';

  if (!isProduction) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, () => {
    console.log(`DIGEGAIN Server running at http://localhost:${PORT}`);
  });
}

startServer();
