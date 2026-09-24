import nodemailer from 'nodemailer';
import { EnquiryItem } from '../../types';

export async function sendEnquiryEmail(enquiry: EnquiryItem): Promise<boolean> {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT) || 587;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASSWORD;
  const toEmail = process.env.ADMIN_EMAIL || 'anoopkp10@gmail.com';

  if (!host || !user || !pass) {
    console.log('[EMAIL SERVICE NOTIFICATION] SMTP credentials not set. New Enquiry Captured:', {
      name: enquiry.name,
      business: enquiry.business,
      phone: enquiry.phone,
      email: enquiry.email,
      requirement: enquiry.requirement,
      time: enquiry.createdAt
    });
    return true;
  }

  try {
    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: { user, pass }
    });

    const mailOptions = {
      from: `"DIGEGAIN Web Notifications" <${user}>`,
      to: toEmail,
      subject: `New DIGEGAIN Website Enquiry: ${enquiry.business || enquiry.name}`,
      text: `
New DIGEGAIN Website Enquiry Received

Name: ${enquiry.name}
Business Name: ${enquiry.business || 'N/A'}
Phone: ${enquiry.phone}
Email: ${enquiry.email}
Business Type: ${enquiry.businessType}
Website Requirement: ${enquiry.requirement}
Message: ${enquiry.message}
Received At: ${new Date(enquiry.createdAt).toLocaleString()}
      `.trim(),
      html: `
<div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #E2E8F0; border-radius: 8px;">
  <h2 style="color: #1E89C1; margin-top: 0;">New DIGEGAIN Website Enquiry</h2>
  <table style="width: 100%; border-collapse: collapse;">
    <tr><td style="padding: 8px 0; font-weight: bold; width: 140px;">Name:</td><td>${enquiry.name}</td></tr>
    <tr><td style="padding: 8px 0; font-weight: bold;">Business:</td><td>${enquiry.business || 'N/A'}</td></tr>
    <tr><td style="padding: 8px 0; font-weight: bold;">Phone:</td><td><a href="tel:${enquiry.phone}">${enquiry.phone}</a></td></tr>
    <tr><td style="padding: 8px 0; font-weight: bold;">Email:</td><td><a href="mailto:${enquiry.email}">${enquiry.email}</a></td></tr>
    <tr><td style="padding: 8px 0; font-weight: bold;">Business Type:</td><td>${enquiry.businessType}</td></tr>
    <tr><td style="padding: 8px 0; font-weight: bold;">Requirement:</td><td><strong style="color: #F37B20;">${enquiry.requirement}</strong></td></tr>
    <tr><td style="padding: 8px 0; font-weight: bold; vertical-align: top;">Message:</td><td style="white-space: pre-wrap;">${enquiry.message}</td></tr>
    <tr><td style="padding: 8px 0; font-weight: bold;">Date:</td><td>${new Date(enquiry.createdAt).toLocaleString()}</td></tr>
  </table>
  <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid #E2E8F0;">
    <a href="https://wa.me/${enquiry.phone.replace(/[^0-9]/g, '')}" style="background-color: #42A83D; color: white; padding: 10px 18px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">Reply on WhatsApp</a>
  </div>
</div>
      `.trim()
    };

    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.error('Failed to send enquiry email:', error);
    return false;
  }
}
