import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  // CORS setup for Vercel
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { to, orderDetails, frontendUrl } = req.body;
    
    if (!to || !orderDetails) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Connect to Gmail via SMTP
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: process.env.SMTP_PORT === '465',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD
      }
    });

    const items = orderDetails.items || [];
    const total = orderDetails.total || '0.00';
    const orderId = orderDetails.orderId || Math.random().toString(36).substring(7).toUpperCase();
    const baseUrl = frontendUrl || 'https://bt-templates.vercel.app';

    // Same HTML as backend
    let htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body style="margin: 0; padding: 0; background-color: #f4f7f6; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
      <div style="max-w-width: 600px; margin: 40px auto; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 24px rgba(0,0,0,0.06);">
        <!-- Header -->
        <div style="background: linear-gradient(135deg, #4f46e5, #3b82f6); padding: 40px 32px; text-align: center;">
          <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 800; letter-spacing: -0.5px;">Payment Successful! 🎉</h1>
          <p style="color: rgba(255,255,255,0.9); margin: 12px 0 0; font-size: 16px; line-height: 1.5;">Thank you for your purchase. Your templates are ready to download.</p>
        </div>

        <div style="padding: 32px;">
          <!-- Order Info -->
          <div style="display: flex; justify-content: space-between; margin-bottom: 32px; padding-bottom: 24px; border-bottom: 2px dashed #eee;">
            <div>
              <p style="margin: 0 0 4px; color: #888; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">Order ID</p>
              <p style="margin: 0; color: #1a1a1a; font-size: 16px; font-weight: 700; font-family: monospace;">#${orderId}</p>
            </div>
            <div style="text-align: right;">
              <p style="margin: 0 0 4px; color: #888; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">Date</p>
              <p style="margin: 0; color: #1a1a1a; font-size: 15px; font-weight: 600;">${new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
            </div>
          </div>

          <h2 style="color: #1a1a1a; font-size: 18px; font-weight: 700; margin: 0 0 20px;">Order Summary</h2>
          <div style="background-color: #fafafa; border-radius: 12px; padding: 24px; margin-bottom: 32px;">
            <table style="width: 100%; border-collapse: collapse;">
    `;

    items.forEach(item => {
      htmlContent += `
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #eee;">
                  <div style="display: flex; align-items: center;">
                    ${item.image ? `<img src="${item.image}" alt="${item.title}" style="width: 48px; height: 48px; border-radius: 8px; object-fit: cover; margin-right: 16px;" />` : ''}
                    <div>
                      <p style="margin: 0; color: #1a1a1a; font-size: 15px; font-weight: 700;">${item.title}</p>
                      <p style="margin: 4px 0 0; color: #888; font-size: 13px;">Template License</p>
                    </div>
                  </div>
                </td>
                <td style="padding: 12px 0; border-bottom: 1px solid #eee; text-align: right; color: #1a1a1a; font-size: 15px; font-weight: 700;">
                  ₹${item.price}
                </td>
              </tr>
      `;
    });

    htmlContent += `
              <tr>
                <td style="padding: 16px 0 6px; color: #888; font-size: 14px;">Subtotal</td>
                <td style="padding: 16px 0 6px; text-align: right; color: #1a1a1a; font-size: 14px;">₹${total}</td>
              </tr>
              <tr>
                <td colspan="2" style="padding: 12px 0 0;"><hr style="border: none; border-top: 2px solid #eee; margin: 0;"/></td>
              </tr>
              <tr>
                <td style="padding: 12px 0 0; color: #1a1a1a; font-size: 18px; font-weight: 800;">Total Paid</td>
                <td style="padding: 12px 0 0; text-align: right; color: #1a1a1a; font-size: 22px; font-weight: 800;">₹${total}</td>
              </tr>
            </table>
          </div>

          <!-- CTA Button -->
          <div style="text-align: center; padding: 0 32px 32px;">
            <a href="${baseUrl}/my-templates" style="display: inline-block; background: linear-gradient(135deg, #0a0a0a, #1a1a2e); color: #ffffff; padding: 14px 36px; text-decoration: none; border-radius: 12px; font-weight: 700; font-size: 14px; box-shadow: 0 4px 14px rgba(0,0,0,0.2);">
              Download Your Templates →
            </a>
          </div>

          <!-- Footer -->
          <div style="background-color: #fafafa; padding: 24px 32px; border-top: 1px solid #f0f0f0; text-align: center;">
             <p style="margin: 0 0 8px; font-size: 13px; color: #999;">Need help? Contact us at</p>
             <a href="mailto:bizleap1@gmail.com" style="color: #3b82f6; text-decoration: none; font-size: 13px; font-weight: 600;">bizleap1@gmail.com</a>
             <p style="margin: 16px 0 0; font-size: 11px; color: #ccc;">
               © ${new Date().getFullYear()} Bizleap. All rights reserved.
             </p>
          </div>
        </div>
      </div>
    </body>
    </html>
    `;

    const info = await transporter.sendMail({
      from: `"Bizleap" <${process.env.SMTP_FROM || process.env.SMTP_USER}>`,
      to: to,
      subject: `🧾 Your Bizleap Invoice — Order #${orderId}`,
      html: htmlContent,
    });

    res.status(200).json({ success: true, messageId: info.messageId });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: error.message || 'Failed to send email' });
  }
}
