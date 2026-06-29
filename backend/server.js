import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';

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
  origin: ['http://localhost:5173', 'http://localhost:5174'],
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization']
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
  const { to, orderDetails } = req.body;

  if (!to || !orderDetails) {
    return res.status(400).json({ error: 'Missing recipient email or order details' });
  }

  const { items, total, orderId } = orderDetails;

  const itemsHtml = items.map(item => `
    <tr>
      <td style="padding: 10px; border-bottom: 1px solid #eee;">
        <strong>${item.title}</strong><br/>
        <span style="color: #666; font-size: 12px;">Category: ${item.category}</span>
      </td>
      <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: right;">
        ₹${item.price}
      </td>
    </tr>
  `).join('');

  const htmlContent = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #eaeaea; border-radius: 10px; overflow: hidden;">
      <div style="background-color: #000; color: #fff; padding: 20px; text-align: center;">
        <h1 style="margin: 0; font-size: 24px; letter-spacing: 2px;">BIZLEAP</h1>
      </div>
      <div style="padding: 30px;">
        <h2 style="margin-top: 0; color: #333;">Thank you for your purchase!</h2>
        <p style="color: #666; line-height: 1.5;">
          Hi there,<br/>
          Your order <strong>#${orderId}</strong> was successful. You can now access your templates from your dashboard.
        </p>
        
        <table style="width: 100%; border-collapse: collapse; margin: 30px 0;">
          <thead>
            <tr>
              <th style="text-align: left; padding: 10px; border-bottom: 2px solid #ddd; color: #333;">Item</th>
              <th style="text-align: right; padding: 10px; border-bottom: 2px solid #ddd; color: #333;">Price</th>
            </tr>
          </thead>
          <tbody>
            ${itemsHtml}
          </tbody>
          <tfoot>
            <tr>
              <td style="padding: 15px 10px; font-weight: bold; text-align: right;">Total Paid:</td>
              <td style="padding: 15px 10px; font-weight: bold; text-align: right; font-size: 18px; color: #000;">₹${total}</td>
            </tr>
          </tfoot>
        </table>

        <div style="text-align: center; margin-top: 40px;">
          <a href="http://localhost:5174/my-templates" style="background-color: #000; color: #fff; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block;">Go to My Templates</a>
        </div>
      </div>
      <div style="background-color: #f9f9f9; padding: 20px; text-align: center; color: #999; font-size: 12px;">
        © ${new Date().getFullYear()} Bizleap. All rights reserved.
      </div>
    </div>
  `;

  try {
    const info = await transporter.sendMail({
      from: `"Bizleap Marketplace" <${process.env.SMTP_FROM || process.env.SMTP_USER}>`,
      to: to,
      subject: `Your Receipt from Bizleap - Order #${orderId}`,
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
      from: `"Bizleap Contact Form" <${process.env.SMTP_FROM || process.env.SMTP_USER}>`,
      to: process.env.CONTACT_EMAIL || process.env.SMTP_USER, // Send to site admin
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
