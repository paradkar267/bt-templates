import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import path from 'path';
import crypto from 'crypto';
import AdmZip from 'adm-zip';
import { fileURLToPath } from 'url';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { createClient } from '@supabase/supabase-js';
import multer from 'multer';
import fs from 'fs';

const upload = multer({ storage: multer.memoryStorage() });

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load env vars from .env.local
dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

const app = express();
const PORT = process.env.PORT || 3000;

// Security Middlewares
app.use(helmet());

// Rate Limiter: max 100 requests per 15 minutes
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 100, 
  message: 'Too many requests from this IP, please try again after 15 minutes',
  standardHeaders: true,
  legacyHeaders: false,
});

app.use('/api/', apiLimiter);

// Strict CORS
app.use(cors({
  origin: process.env.FRONTEND_URL ? [process.env.FRONTEND_URL, 'http://localhost:5173', 'http://localhost:5174'] : ['http://localhost:5173', 'http://localhost:5174'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept']
}));

app.use(express.json());

// Configure Nodemailer Transport using SMTP details from .env.local
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT) || 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

app.post('/api/send-receipt', async (req, res) => {
  const { to, orderDetails, frontendUrl } = req.body;

  if (!to || !orderDetails) {
    return res.status(400).json({ error: 'Missing recipient email or order details' });
  }

  const baseUrl = frontendUrl || process.env.FRONTEND_URL || 'http://localhost:5173';

  const { items, total, orderId } = orderDetails;

  const itemsHtml = items.map((item, index) => `
    <tr class="${index % 2 === 0 ? 'bg-light' : ''}" style="${index % 2 === 0 ? 'background-color: #fafafa;' : ''}">
      <td class="border-light" style="padding: 14px 16px; border-bottom: 1px solid #f0f0f0;">
        <strong class="text-main" style="color: #1a1a1a; font-size: 14px;">${item.title}</strong><br/>
        <span class="text-muted" style="color: #888; font-size: 12px;">${item.category || 'Digital Template'}</span>
      </td>
      <td class="border-light text-muted" style="padding: 14px 16px; border-bottom: 1px solid #f0f0f0; text-align: center; color: #666; font-size: 13px;">1</td>
      <td class="border-light text-main" style="padding: 14px 16px; border-bottom: 1px solid #f0f0f0; text-align: right; color: #1a1a1a; font-weight: 600; font-size: 14px;">₹${item.price}</td>
    </tr>
  `).join('');

  const orderDate = new Date().toLocaleDateString('en-IN', { 
    year: 'numeric', month: 'long', day: 'numeric' 
  });
  const orderTime = new Date().toLocaleTimeString('en-IN', {
    hour: '2-digit', minute: '2-digit'
  });

  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta name="color-scheme" content="light dark">
      <meta name="supported-color-schemes" content="light dark">
      <style>
        :root { color-scheme: light dark; }
        @media (prefers-color-scheme: dark) {
          .body-bg { background-color: #000000 !important; }
          .card-bg { background-color: #111111 !important; }
          .text-main { color: #ffffff !important; }
          .text-muted { color: #a0a0a0 !important; }
          .bg-light { background-color: #1a1a1a !important; }
          .border-light { border-color: #222222 !important; }
          .info-box { background-color: #0f172a !important; border-left-color: #3b82f6 !important; }
          .info-text { color: #e2e8f0 !important; }
          .header-bg { background: #0a0a0a !important; }
        }
      </style>
    </head>
    <body class="body-bg" style="margin: 0; padding: 0; background-color: #f4f4f7; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
      <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
        
        <!-- Main Card -->
        <div class="card-bg" style="background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 24px rgba(0,0,0,0.08);">
          
          <!-- Header -->
          <div class="header-bg" style="background-color: #111827; padding: 36px 32px; text-align: center;">
            <h1 style="margin: 0 0 4px 0; font-size: 28px; font-weight: 800; letter-spacing: 3px; color: #ffffff;">BIZLEAP</h1>
            <p style="margin: 0; font-size: 12px; color: #a1a1aa; letter-spacing: 1px; text-transform: uppercase;">Digital Marketplace</p>
          </div>

          <!-- Success Badge -->
          <div style="text-align: center; padding: 28px 32px 0;">
            <div style="display: inline-block; background-color: #10b981; color: #ffffff; padding: 8px 20px; border-radius: 50px; font-size: 13px; font-weight: 700; letter-spacing: 0.5px;">
              ✓ PAYMENT SUCCESSFUL
            </div>
          </div>

          <!-- Greeting -->
          <div style="padding: 24px 32px 0;">
            <h2 class="text-main" style="margin: 0 0 8px; color: #1a1a1a; font-size: 22px; font-weight: 700;">Thank you for your purchase!</h2>
            <p class="text-muted" style="margin: 0; color: #666; font-size: 14px; line-height: 1.6;">
              Your order has been confirmed and your templates are ready to download from your dashboard.
            </p>
          </div>

          <!-- Order Info Grid -->
          <div style="padding: 24px 32px;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td class="bg-light" style="padding: 12px 16px; background: #f8f9fb; border-radius: 10px 0 0 10px;">
                  <span class="text-muted" style="display: block; font-size: 11px; color: #999; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 4px;">Order ID</span>
                  <span class="text-main" style="font-size: 14px; font-weight: 700; color: #1a1a1a;">#${orderId}</span>
                </td>
                <td class="bg-light" style="padding: 12px 16px; background: #f8f9fb;">
                  <span class="text-muted" style="display: block; font-size: 11px; color: #999; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 4px;">Date</span>
                  <span class="text-main" style="font-size: 14px; font-weight: 600; color: #1a1a1a;">${orderDate}</span>
                </td>
                <td class="bg-light" style="padding: 12px 16px; background: #f8f9fb; border-radius: 0 10px 10px 0;">
                  <span class="text-muted" style="display: block; font-size: 11px; color: #999; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 4px;">Time</span>
                  <span class="text-main" style="font-size: 14px; font-weight: 600; color: #1a1a1a;">${orderTime}</span>
                </td>
              </tr>
            </table>
          </div>

          <!-- Divider -->
          <div style="padding: 0 32px;">
            <hr class="border-light" style="border: none; border-top: 1px solid #eee; margin: 0;"/>
          </div>

          <!-- Items Table -->
          <div style="padding: 24px 32px;">
            <h3 class="text-main" style="margin: 0 0 16px; font-size: 16px; font-weight: 700; color: #1a1a1a;">Order Summary</h3>
            <table class="border-light" style="width: 100%; border-collapse: collapse; border-radius: 12px; overflow: hidden; border: 1px solid #f0f0f0;">
              <thead>
                <tr class="bg-light" style="background-color: #f8f9fb;">
                  <th class="text-muted" style="text-align: left; padding: 12px 16px; font-size: 12px; color: #888; text-transform: uppercase; letter-spacing: 0.5px; font-weight: 600;">Item</th>
                  <th class="text-muted" style="text-align: center; padding: 12px 16px; font-size: 12px; color: #888; text-transform: uppercase; letter-spacing: 0.5px; font-weight: 600;">Qty</th>
                  <th class="text-muted" style="text-align: right; padding: 12px 16px; font-size: 12px; color: #888; text-transform: uppercase; letter-spacing: 0.5px; font-weight: 600;">Price</th>
                </tr>
              </thead>
              <tbody>
                ${itemsHtml}
              </tbody>
            </table>
          </div>

          <!-- Total Section -->
          <div style="padding: 0 32px 28px;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td class="text-muted" style="padding: 6px 0; color: #888; font-size: 14px;">Subtotal</td>
                <td class="text-main" style="padding: 6px 0; text-align: right; color: #1a1a1a; font-size: 14px;">₹${total}</td>
              </tr>
              <tr>
                <td class="text-muted" style="padding: 6px 0; color: #888; font-size: 14px;">Discount</td>
                <td style="padding: 6px 0; text-align: right; color: #10b981; font-size: 14px;">-₹0.00</td>
              </tr>
              <tr>
                <td colspan="2" style="padding: 12px 0 0;"><hr class="border-light" style="border: none; border-top: 2px solid #eee; margin: 0;"/></td>
              </tr>
              <tr>
                <td class="text-main" style="padding: 12px 0 0; color: #1a1a1a; font-size: 18px; font-weight: 800;">Total Paid</td>
                <td class="text-main" style="padding: 12px 0 0; text-align: right; color: #1a1a1a; font-size: 22px; font-weight: 800;">₹${total}</td>
              </tr>
            </table>
          </div>

          <!-- CTA Button -->
          <div style="text-align: center; padding: 0 32px 32px;">
            <a href="${baseUrl}/my-templates" style="display: inline-block; background-color: #000000; color: #ffffff; padding: 14px 36px; text-decoration: none; border-radius: 12px; font-weight: 700; font-size: 14px; letter-spacing: 0.5px; box-shadow: 0 4px 14px rgba(0,0,0,0.2);">
              Download Your Templates →
            </a>
          </div>

          <!-- Info Box -->
          <div class="info-box" style="margin: 0 32px 28px; padding: 16px 20px; background: #f0f7ff; border-radius: 12px; border-left: 4px solid #3b82f6;">
            <p class="info-text" style="margin: 0; font-size: 13px; color: #1e40af; line-height: 1.5;">
              <strong class="info-text">💡 Quick Tip:</strong> You can download your purchased templates anytime from the "My Templates" section in your dashboard. Download links are secure and time-limited for your protection.
            </p>
          </div>

          <!-- Footer -->
          <div class="bg-light border-light" style="background-color: #fafafa; padding: 24px 32px; border-top: 1px solid #f0f0f0;">
            <table style="width: 100%;">
              <tr>
                <td style="text-align: center;">
                  <p class="text-muted" style="margin: 0 0 8px; font-size: 13px; color: #999;">Need help? Contact us at</p>
                  <a href="mailto:bizleap1@gmail.com" style="color: #3b82f6; text-decoration: none; font-size: 13px; font-weight: 600;">bizleap1@gmail.com</a>
                  <p class="text-muted" style="margin: 16px 0 0; font-size: 11px; color: #ccc;">
                    © ${new Date().getFullYear()} Bizleap. All rights reserved.<br/>
                    This is an automated receipt. Please do not reply to this email.
                  </p>
                </td>
              </tr>
            </table>
          </div>

        </div>
      </div>
    </body>
    </html>
  `;

  try {
    const info = await transporter.sendMail({
      from: `"Bizleap" <bizleap1@gmail.com>`,
      to: to,
      subject: `🧾 Your Bizleap Invoice — Order #${orderId}`,
      html: htmlContent,
    });

    console.log("Message sent: %s", info.messageId);
    res.status(200).json({ success: true, messageId: info.messageId });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ error: 'Failed to send email', details: error.message });
  }
});

// Contact Message Endpoint
app.post('/api/contact', async (req, res) => {
  const { firstName, lastName, email, subject, message } = req.body;

  if (!firstName || !lastName || !email || !message) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const htmlContent = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #eaeaea; border-radius: 10px; overflow: hidden;">
      <div style="background-color: #000; color: #fff; padding: 20px; text-align: center;">
        <h1 style="margin: 0; font-size: 24px; letter-spacing: 2px;">New Contact Message</h1>
      </div>
      <div style="padding: 30px;">
        <h2 style="margin-top: 0; color: #333;">${subject || 'General Inquiry'}</h2>
        <p><strong>From:</strong> ${firstName} ${lastName} (${email})</p>
        <div style="margin-top: 20px; padding: 15px; background-color: #f9f9f9; border-radius: 8px;">
          <p style="margin: 0; line-height: 1.6; color: #333;">${message.replace(/\n/g, '<br/>')}</p>
        </div>
      </div>
    </div>
  `;

  try {
    const info = await transporter.sendMail({
      from: `"Bizleap Contact Form" <bizleap1@gmail.com>`,
      to: process.env.ADMIN_EMAIL || 'bizleap1@gmail.com', // Send to site admin
      replyTo: email,
      subject: `New Message: ${subject || 'General Inquiry'} from ${firstName} ${lastName}`,
      html: htmlContent,
    });

    console.log("Contact message sent: %s", info.messageId);
    res.status(200).json({ success: true, messageId: info.messageId });
  } catch (error) {
    console.error("Error sending contact email:", error);
    res.status(500).json({ error: 'Failed to send message', details: error.message });
  }
});

// Initialize Supabase Admin client
const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY; 

const supabaseAdmin = (supabaseUrl && supabaseServiceKey) 
  ? createClient(supabaseUrl, supabaseServiceKey)
  : null;

app.post('/api/generate-download', async (req, res) => {
  const { templateId } = req.body;
  const authHeader = req.headers.authorization;

  if (!supabaseAdmin) {
    return res.status(500).json({ error: 'Server misconfiguration: Missing SUPABASE_SERVICE_ROLE_KEY in .env.local' });
  }

  if (!authHeader) {
    return res.status(401).json({ error: 'Missing authorization header' });
  }

  const token = authHeader.replace('Bearer ', '');

  try {
    // 1. Verify User Token
    const { data: { user }, error: userError } = await supabaseAdmin.auth.getUser(token);
    
    if (userError || !user) {
      return res.status(401).json({ error: 'Invalid or expired token' });
    }

    // 2. Verify Purchase
    const { data: purchase, error: purchaseError } = await supabaseAdmin
      .from('purchases')
      .select('*')
      .eq('user_id', user.id)
      .eq('template_id', templateId)
      .single();

    if (purchaseError || !purchase) {
      return res.status(403).json({ error: 'You have not purchased this template.' });
    }

    // 3. Get file path from mapping table
    let { data: mapping, error: mappingError } = await supabaseAdmin
      .from('template_files')
      .select('file_path')
      .eq('template_id', templateId)
      .single();

    if (mappingError || !mapping) {
       console.log(`No mapping found for template ${templateId}, falling back to demo file`);
       mapping = { file_path: 'demo-template.zip' };
    }

    // 4. Generate Signed URL (valid for 60 seconds)
    const { data: signedUrlData, error: signedUrlError } = await supabaseAdmin
      .storage
      .from('secure_templates')
      .createSignedUrl(mapping.file_path, 60);

    if (signedUrlError || !signedUrlData) {
      console.error('Failed to generate signed URL:', signedUrlError);
      return res.status(500).json({ error: 'Failed to generate download link. Please check if the file exists in the secure_templates bucket.' });
    }

    res.json({ downloadUrl: signedUrlData.signedUrl });

  } catch (error) {
    console.error('Error generating download:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Fetch templates for store
app.get('/api/templates', async (req, res) => {
  if (!supabaseAdmin) return res.status(500).json({ error: 'Misconfigured' });
  const { data, error } = await supabaseAdmin
    .from('templates')
    .select('*');
    
  if (error) {
    return res.status(500).json({ error: error.message });
  }
  res.json(data);
});

// Dynamic Sitemap Generation
app.get('/sitemap.xml', async (req, res) => {
  try {
    if (!supabaseAdmin) throw new Error('Misconfigured');
    const { data: templates, error } = await supabaseAdmin.from('templates').select('id');
    if (error) throw error;

    const baseUrl = 'https://btmarket.com'; // Replace with actual domain
    const staticPages = ['', '/templates', '/featured', '/ui-kits', '/contact'];
    
    let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
    xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

    // Static pages
    for (const page of staticPages) {
      xml += `  <url>\n`;
      xml += `    <loc>${baseUrl}${page}</loc>\n`;
      xml += `    <changefreq>weekly</changefreq>\n`;
      xml += `    <priority>${page === '' ? '1.0' : '0.8'}</priority>\n`;
      xml += `  </url>\n`;
    }

    // Dynamic product pages
    if (templates) {
      for (const t of templates) {
        xml += `  <url>\n`;
        xml += `    <loc>${baseUrl}/product/${t.id}</loc>\n`;
        xml += `    <changefreq>monthly</changefreq>\n`;
        xml += `    <priority>0.7</priority>\n`;
        xml += `  </url>\n`;
      }
    }

    xml += `</urlset>`;

    res.header('Content-Type', 'application/xml');
    res.send(xml);
  } catch (err) {
    console.error('Sitemap error:', err);
    res.status(500).send('Error generating sitemap');
  }
});

// Admin: Get Stats
app.get('/api/admin/stats', async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!supabaseAdmin) return res.status(500).json({ error: 'Misconfigured' });
  if (!authHeader) return res.status(401).json({ error: 'Missing auth' });
  const token = authHeader.replace('Bearer ', '');

  try {
    const { data: { user }, error: userError } = await supabaseAdmin.auth.getUser(token);
    if (userError || !user || user.email?.toLowerCase() !== (process.env.ADMIN_EMAIL?.toLowerCase() || 'bizleap1@gmail.com')) {
      return res.status(403).json({ error: 'Forbidden' });
    }

    const { data: purchases } = await supabaseAdmin.from('purchases').select('*');
    const { count: userCount } = await supabaseAdmin.auth.admin.listUsers();
    
    // Fallback if listUsers doesn't return count directly
    const actualUserCount = userCount || 0; 
    
    let totalRevenue = 0;
    if (purchases) {
      totalRevenue = purchases.reduce((acc, curr) => acc + (parseFloat(curr.price) || 0), 0);
    }

    res.json({
      totalSales: purchases ? purchases.length : 0,
      totalRevenue,
      totalUsers: actualUserCount
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Admin: Upload Template
app.post('/api/admin/upload-template', upload.single('file'), async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!supabaseAdmin) return res.status(500).json({ error: 'Misconfigured' });
  if (!authHeader) return res.status(401).json({ error: 'Missing auth' });
  const token = authHeader.replace('Bearer ', '');

  try {
    const { data: { user }, error: userError } = await supabaseAdmin.auth.getUser(token);
    if (userError || !user || user.email?.toLowerCase() !== (process.env.ADMIN_EMAIL?.toLowerCase() || 'bizleap1@gmail.com')) {
      return res.status(403).json({ error: 'Forbidden' });
    }

    const { title, description, price, category, tag, keywords, image } = req.body;
    const file = req.file;

    if (!file) {
      return res.status(400).json({ error: 'ZIP file is required' });
    }

    const fileName = `${Date.now()}_${file.originalname}`;
    const filePath = `templates/${fileName}`;

    // Upload ZIP to Supabase Storage
    const { error: uploadError } = await supabaseAdmin.storage
      .from('secure_templates')
      .upload(filePath, file.buffer, {
        contentType: file.mimetype,
        upsert: true
      });

    if (uploadError) throw uploadError;

    // Automatically unzip to frontend public directory for live preview
    try {
      const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
      const extractPath = path.resolve(__dirname, '../frontend/public/previews', slug);
      const zip = new AdmZip(file.buffer);
      zip.extractAllTo(extractPath, true);
    } catch (unzipErr) {
      console.error('Failed to extract zip for preview:', unzipErr);
      // We don't throw here to ensure the db insert still happens
    }

    // Parse keywords safely
    let parsedKeywords = [];
    try {
      parsedKeywords = JSON.parse(keywords);
    } catch(e) {
      if (typeof keywords === 'string') {
        parsedKeywords = keywords.split(',').map(k => k.trim());
      }
    }

    // Insert into templates
    const { data: templateData, error: dbError } = await supabaseAdmin
      .from('templates')
      .insert({
        id: Math.floor(Math.random() * 2000000000),
        title,
        description,
        price,
        category,
        tag,
        image,
        keywords: parsedKeywords,
        author: 'Nexus Themes',
        sales: 0,
        rating: 5.0
      }).select().single();

    if (dbError) throw dbError;

    // Insert into template_files
    const { error: mappingError } = await supabaseAdmin
      .from('template_files')
      .insert({
        template_id: templateData.id,
        file_path: filePath
      });

    if (mappingError) throw mappingError;

    res.status(200).json({ success: true, template: templateData });
  } catch (err) {
    console.error('Upload error:', err);
    res.status(500).json({ error: err.message });
  }
});

// Admin: Delete Template
app.delete('/api/admin/template/:id', async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!supabaseAdmin) return res.status(500).json({ error: 'Misconfigured' });
  if (!authHeader) return res.status(401).json({ error: 'Missing auth' });
  const token = authHeader.replace('Bearer ', '');

  try {
    const { data: { user }, error: userError } = await supabaseAdmin.auth.getUser(token);
    if (userError || !user) return res.status(401).json({ error: 'Unauthorized' });
    if (user.email.toLowerCase() !== (process.env.ADMIN_EMAIL?.toLowerCase() || 'bizleap1@gmail.com')) {
      return res.status(403).json({ error: 'Forbidden' });
    }

    const { id } = req.params;

    // 1. Fetch template
    const { data: template, error: fetchErr } = await supabaseAdmin
      .from('templates')
      .select('title')
      .eq('id', id)
      .single();

    if (fetchErr) {
      console.warn('Template fetch error (might be invalid ID):', fetchErr.message);
    }

    // 2. Fetch file mapping
    const { data: fileMapping } = await supabaseAdmin
      .from('template_files')
      .select('file_path')
      .eq('template_id', id)
      .single();

    // 3. Delete from DB (ignore out of range errors)
    await supabaseAdmin.from('template_files').delete().eq('template_id', id);
    await supabaseAdmin.from('templates').delete().eq('id', id);

    // 4. Delete from Storage
    if (fileMapping && fileMapping.file_path) {
      await supabaseAdmin.storage
        .from('secure_templates')
        .remove([fileMapping.file_path]);
    }
    
    if (template && template.title) {
      // Fallback: also try to delete templates/${template.title}.zip (legacy script uploads)
      await supabaseAdmin.storage.from('secure_templates').remove([`templates/${template.title}.zip`]);

      // 5. Delete Preview folder
      const slug = template.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
      const previewPath = path.resolve(__dirname, '../frontend/public/previews', slug);
      try {
        if (fs.existsSync(previewPath)) {
          fs.rmSync(previewPath, { recursive: true, force: true });
        }
      } catch (fsErr) {
        if (process.env.NODE_ENV !== 'production') console.warn('Could not delete preview folder:', fsErr.message);
      }

      // 6. Delete Original Source Folder (if exists)
      const sourcePath = path.resolve(__dirname, '../templates', template.title);
      try {
        if (fs.existsSync(sourcePath)) {
          fs.rmSync(sourcePath, { recursive: true, force: true });
        }
      } catch (fsErr) {
        if (process.env.NODE_ENV !== 'production') console.warn('Could not delete source folder:', fsErr.message);
      }
    }

    res.status(200).json({ success: true });
  } catch (err) {
    console.error('Delete error:', err);
    try {
      fs.writeFileSync(path.resolve(__dirname, 'delete_error.log'), err.stack || err.message);
    } catch (e) {}
    res.status(500).json({ error: err.message });
  }
});

// Admin: Update Price
app.post('/api/admin/update-price', async (req, res) => {
  const authHeader = req.headers.authorization;
  console.log("Update Price Endpoint hit! AuthHeader:", !!authHeader);
  
  if (!supabaseAdmin) return res.status(500).json({ error: 'Misconfigured' });
  if (!authHeader) return res.status(401).json({ error: 'Missing auth' });
  const token = authHeader.replace('Bearer ', '');

  try {
    const { data: { user }, error: userError } = await supabaseAdmin.auth.getUser(token);
    
    console.log("Auth Check:", { email: user?.email, error: userError?.message });
    
    if (userError || !user || user.email?.toLowerCase() !== (process.env.ADMIN_EMAIL?.toLowerCase() || 'bizleap1@gmail.com')) {
      return res.status(403).json({ error: 'Forbidden' });
    }

    const { templateId, newPrice } = req.body;
    if (!templateId || !newPrice) return res.status(400).json({ error: 'Missing data' });

    const { error: updateError } = await supabaseAdmin
      .from('templates')
      .update({ price: newPrice })
      .eq('id', templateId);

    if (updateError) throw updateError;
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// 404 Handler
app.use((req, res, next) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('Unhandled Backend Error:', err);
  res.status(500).json({ error: 'Internal Server Error', details: err.message });
});

app.listen(PORT, () => {
  console.log(`Backend Server running at http://localhost:${PORT}`);
});
