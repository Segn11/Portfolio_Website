import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
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
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { name, email, subject, message } = req.body || {};

  if (!name || !message) {
    return res.status(400).json({ success: false, message: 'Name and message are required' });
  }

  const smtpUser = process.env.SMTP_USER || 'segninadew63@gmail.com';
  // Allow STMP or SMTP_PASS, strip spaces
  const rawPass = process.env.SMTP_PASS || process.env.STMP || '';
  const smtpPass = rawPass.replace(/\s+/g, '');

  if (!smtpPass) {
    return res.status(500).json({ 
      success: false, 
      message: 'SMTP Password not found in environment' 
    });
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: smtpUser,
      pass: smtpPass,
    },
  });

  try {
    const info = await transporter.sendMail({
      from: `"${name} (Portfolio)" <${smtpUser}>`,
      to: 'segninadew1@gmail.com, segninadew63@gmail.com',
      replyTo: email || 'segninadew1@gmail.com',
      subject: subject || `Portfolio Inquiry from ${name}`,
      text: `${message}\n\nSender: ${name}\nEmail: ${email || 'Not provided'}`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #0c0d14; color: #f4f4f5; padding: 24px; border-radius: 12px; border: 1px solid #10b981; max-width: 600px;">
          <h2 style="color: #34d399; margin-top: 0;">New Portfolio Message</h2>
          <div style="margin-bottom: 16px; font-size: 14px; color: #a1a1aa;">
            <p style="margin: 4px 0;"><strong>Sender Name:</strong> <span style="color: #ffffff;">${name}</span></p>
            <p style="margin: 4px 0;"><strong>Sender Email:</strong> <span style="color: #ffffff;">${email || 'Not provided'}</span></p>
            <p style="margin: 4px 0;"><strong>Subject:</strong> <span style="color: #ffffff;">${subject || 'General Inquiry'}</span></p>
          </div>
          <div style="background-color: #18181b; padding: 16px; border-radius: 8px; border-left: 4px solid #34d399; margin: 16px 0;">
            <p style="margin: 0; color: #ffffff; white-space: pre-wrap; font-size: 15px; line-height: 1.5;">${message}</p>
          </div>
          <p style="font-size: 12px; color: #71717a; margin-top: 20px; border-top: 1px solid #27272a; padding-top: 12px;">
            Sent from Segni Nadew Portfolio Website
          </p>
        </div>
      `,
    });

    return res.status(200).json({ success: true, messageId: info.messageId });
  } catch (error) {
    console.error('SMTP Send Error:', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Google SMTP rejected the credentials. Verify your App Password on Google.'
    });
  }
}
