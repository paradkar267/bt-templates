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
    const orderDate = new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
    const orderTime = new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true });
    const customerEmail = to;

    // Build items rows
    let itemsHtml = '';
    items.forEach((item, index) => {
      const isLast = index === items.length - 1;
      itemsHtml += `
                <tr>
                  <td style="padding: 16px 20px; border-bottom: ${isLast ? 'none' : '1px solid #f0f0f5'};">
                    <table cellpadding="0" cellspacing="0" border="0" style="width: 100%;">
                      <tr>
                        <td style="width: 48px; vertical-align: top;">
                          <div style="width: 48px; height: 48px; background: linear-gradient(135deg, #667eea, #764ba2); border-radius: 10px; text-align: center; line-height: 48px; color: #fff; font-size: 18px; font-weight: 700;">
                            ${(item.title || 'T').charAt(0).toUpperCase()}
                          </div>
                        </td>
                        <td style="padding-left: 14px; vertical-align: top;">
                          <p style="margin: 0; color: #1a1a2e; font-size: 14px; font-weight: 700; line-height: 1.3;">${item.title || 'Template'}</p>
                          <p style="margin: 4px 0 0; color: #8b8fa3; font-size: 12px;">Digital Template &bull; Instant Access</p>
                        </td>
                        <td style="vertical-align: middle; text-align: right; white-space: nowrap;">
                          <span style="color: #1a1a2e; font-size: 15px; font-weight: 800;">₹${item.price || '0'}</span>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>`;
    });

    const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta name="color-scheme" content="light">
      <title>Your Bizleap Invoice</title>
      <!--[if mso]>
      <noscript>
        <xml>
          <o:OfficeDocumentSettings>
            <o:PixelsPerInch>96</o:PixelsPerInch>
          </o:OfficeDocumentSettings>
        </xml>
      </noscript>
      <![endif]-->
    </head>
    <body style="margin: 0; padding: 0; background-color: #f0f0f5; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; -webkit-font-smoothing: antialiased;">
      
      <!-- Preheader (hidden preview text) -->
      <div style="display: none; max-height: 0; overflow: hidden; mso-hide: all;">
        Payment of ₹${total} confirmed! Your templates are ready to download. Order #${orderId}
      </div>

      <!-- Outer Wrapper -->
      <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color: #f0f0f5; padding: 32px 16px;">
        <tr>
          <td align="center">
            <!-- Main Container -->
            <table cellpadding="0" cellspacing="0" border="0" width="560" style="max-width: 560px; width: 100%;">
              
              <!-- Logo Bar -->
              <tr>
                <td style="padding: 0 0 24px; text-align: center;">
                  <table cellpadding="0" cellspacing="0" border="0" style="margin: 0 auto;">
                    <tr>
                      <td style="width: 36px; height: 36px; background: linear-gradient(135deg, #0a0a0a, #1a1a2e); border-radius: 10px; text-align: center; vertical-align: middle;">
                        <span style="color: #fff; font-size: 16px; font-weight: 800; line-height: 36px;">B</span>
                      </td>
                      <td style="padding-left: 10px; vertical-align: middle;">
                        <span style="font-size: 20px; font-weight: 800; color: #1a1a2e; letter-spacing: 1.5px;">BIZLEAP</span>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>

              <!-- Main Card -->
              <tr>
                <td>
                  <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color: #ffffff; border-radius: 20px; overflow: hidden; box-shadow: 0 2px 40px rgba(0,0,0,0.06);">
                    
                    <!-- Success Header -->
                    <tr>
                      <td style="background: linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 60%, #16213e 100%); padding: 44px 40px 40px; text-align: center;">
                        <!-- Checkmark Circle -->
                        <table cellpadding="0" cellspacing="0" border="0" style="margin: 0 auto 20px;">
                          <tr>
                            <td style="width: 64px; height: 64px; border-radius: 50%; background: rgba(16, 185, 129, 0.15); text-align: center; vertical-align: middle; border: 2px solid rgba(16, 185, 129, 0.3);">
                              <span style="font-size: 30px; line-height: 64px;">✓</span>
                            </td>
                          </tr>
                        </table>
                        <h1 style="margin: 0 0 8px; color: #ffffff; font-size: 26px; font-weight: 800; letter-spacing: -0.5px;">Payment Successful!</h1>
                        <p style="margin: 0; color: rgba(255,255,255,0.6); font-size: 14px; line-height: 1.5;">Your order has been confirmed and templates are ready.</p>
                      </td>
                    </tr>

                    <!-- Amount Badge -->
                    <tr>
                      <td style="padding: 0; text-align: center;">
                        <table cellpadding="0" cellspacing="0" border="0" style="margin: -22px auto 0;">
                          <tr>
                            <td style="background: linear-gradient(135deg, #10b981, #059669); color: #ffffff; padding: 12px 32px; border-radius: 50px; font-size: 22px; font-weight: 800; letter-spacing: -0.5px; box-shadow: 0 4px 16px rgba(16, 185, 129, 0.3);">
                              ₹${total}
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>

                    <!-- Order Info Grid -->
                    <tr>
                      <td style="padding: 28px 32px 0;">
                        <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background: #f8f9fc; border-radius: 14px; overflow: hidden;">
                          <tr>
                            <td style="padding: 16px 20px; width: 33%; border-right: 1px solid #eeeff4;">
                              <p style="margin: 0 0 4px; font-size: 10px; color: #8b8fa3; text-transform: uppercase; letter-spacing: 1px; font-weight: 700;">Order ID</p>
                              <p style="margin: 0; font-size: 13px; color: #1a1a2e; font-weight: 700; font-family: 'SF Mono', Monaco, 'Cascadia Code', monospace;">#${orderId.substring(0, 12)}</p>
                            </td>
                            <td style="padding: 16px 20px; width: 34%; border-right: 1px solid #eeeff4; text-align: center;">
                              <p style="margin: 0 0 4px; font-size: 10px; color: #8b8fa3; text-transform: uppercase; letter-spacing: 1px; font-weight: 700;">Date</p>
                              <p style="margin: 0; font-size: 13px; color: #1a1a2e; font-weight: 600;">${orderDate}</p>
                            </td>
                            <td style="padding: 16px 20px; width: 33%; text-align: right;">
                              <p style="margin: 0 0 4px; font-size: 10px; color: #8b8fa3; text-transform: uppercase; letter-spacing: 1px; font-weight: 700;">Time</p>
                              <p style="margin: 0; font-size: 13px; color: #1a1a2e; font-weight: 600;">${orderTime}</p>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>

                    <!-- Divider -->
                    <tr>
                      <td style="padding: 24px 32px 0;">
                        <hr style="border: none; border-top: 1px solid #f0f0f5; margin: 0;" />
                      </td>
                    </tr>

                    <!-- Items Section -->
                    <tr>
                      <td style="padding: 24px 32px 0;">
                        <p style="margin: 0 0 16px; font-size: 13px; color: #8b8fa3; text-transform: uppercase; letter-spacing: 1.5px; font-weight: 700;">🛒 Items Purchased</p>
                        <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background: #f8f9fc; border-radius: 14px; overflow: hidden;">
                          ${itemsHtml}
                        </table>
                      </td>
                    </tr>

                    <!-- Totals -->
                    <tr>
                      <td style="padding: 24px 32px 0;">
                        <table cellpadding="0" cellspacing="0" border="0" width="100%">
                          <tr>
                            <td style="padding: 8px 0; color: #8b8fa3; font-size: 14px;">Subtotal</td>
                            <td style="padding: 8px 0; text-align: right; color: #1a1a2e; font-size: 14px; font-weight: 600;">₹${total}</td>
                          </tr>
                          <tr>
                            <td style="padding: 8px 0; color: #8b8fa3; font-size: 14px;">Discount</td>
                            <td style="padding: 8px 0; text-align: right; color: #10b981; font-size: 14px; font-weight: 600;">-₹0.00</td>
                          </tr>
                          <tr>
                            <td colspan="2" style="padding: 12px 0;">
                              <hr style="border: none; border-top: 2px dashed #e5e7ee; margin: 0;" />
                            </td>
                          </tr>
                          <tr>
                            <td style="padding: 4px 0 0; color: #1a1a2e; font-size: 18px; font-weight: 800;">Total Paid</td>
                            <td style="padding: 4px 0 0; text-align: right; color: #1a1a2e; font-size: 24px; font-weight: 800;">₹${total}</td>
                          </tr>
                        </table>
                      </td>
                    </tr>

                    <!-- CTA Button -->
                    <tr>
                      <td style="padding: 32px 32px 8px; text-align: center;">
                        <table cellpadding="0" cellspacing="0" border="0" style="margin: 0 auto;">
                          <tr>
                            <td style="background: linear-gradient(135deg, #0a0a0a, #1a1a2e); border-radius: 14px; text-align: center; box-shadow: 0 4px 16px rgba(0,0,0,0.15);">
                              <a href="${baseUrl}/my-templates" target="_blank" style="display: inline-block; color: #ffffff; padding: 16px 40px; text-decoration: none; font-weight: 700; font-size: 14px; letter-spacing: 0.3px;">
                                ↓ &nbsp; Download Your Templates
                              </a>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>

                    <!-- Tip Box -->
                    <tr>
                      <td style="padding: 24px 32px 28px;">
                        <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background: linear-gradient(135deg, #eff6ff, #f0f7ff); border-radius: 14px; border-left: 4px solid #3b82f6;">
                          <tr>
                            <td style="padding: 16px 20px;">
                              <p style="margin: 0; font-size: 13px; color: #1e40af; line-height: 1.6;">
                                <strong>💡 Quick Tip:</strong> You can download your purchased templates anytime from the "My Templates" section. Your downloads are secure and always available.
                              </p>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>

                    <!-- Footer -->
                    <tr>
                      <td style="background-color: #f8f9fc; padding: 28px 32px; border-top: 1px solid #f0f0f5;">
                        <table cellpadding="0" cellspacing="0" border="0" width="100%">
                          <tr>
                            <td style="text-align: center;">
                              <!-- Mini Logo -->
                              <table cellpadding="0" cellspacing="0" border="0" style="margin: 0 auto 16px;">
                                <tr>
                                  <td style="width: 28px; height: 28px; background: #1a1a2e; border-radius: 8px; text-align: center; vertical-align: middle;">
                                    <span style="color: #fff; font-size: 12px; font-weight: 800; line-height: 28px;">B</span>
                                  </td>
                                </tr>
                              </table>
                              <p style="margin: 0 0 6px; font-size: 12px; color: #8b8fa3;">Need help? We're here for you.</p>
                              <a href="mailto:bizleap1@gmail.com" style="color: #3b82f6; text-decoration: none; font-size: 12px; font-weight: 700;">bizleap1@gmail.com</a>
                              <p style="margin: 20px 0 0; font-size: 11px; color: #c0c4d0; line-height: 1.6;">
                                © ${new Date().getFullYear()} Bizleap. All rights reserved.<br>
                                This is an automated receipt. Please do not reply.
                              </p>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>

                  </table>
                </td>
              </tr>

              <!-- Bottom Tagline -->
              <tr>
                <td style="padding: 24px 0 0; text-align: center;">
                  <p style="margin: 0; font-size: 11px; color: #b0b4c0; letter-spacing: 0.3px;">
                    Sent with ♥ from Bizleap Digital Marketplace
                  </p>
                </td>
              </tr>

            </table>
          </td>
        </tr>
      </table>
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
