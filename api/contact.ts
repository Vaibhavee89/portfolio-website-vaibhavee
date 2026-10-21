import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Resend } from 'resend';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const { name, email, subject, message } = (req.body ?? {}) as {
    name?: string;
    email?: string;
    subject?: string;
    message?: string;
  };

  if (!name || !email || !subject || !message) {
    res.status(400).json({ error: 'name, email, subject and message are required' });
    return;
  }

  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.CONTACT_TO_EMAIL || process.env.ADMIN_EMAIL;

  if (!apiKey || !toEmail) {
    console.error('RESEND_API_KEY or CONTACT_TO_EMAIL/ADMIN_EMAIL is not configured');
    res.status(500).json({ error: 'Contact form is not configured' });
    return;
  }

  try {
    const resend = new Resend(apiKey);

    const { error } = await resend.emails.send({
      // Resend's shared testing domain — works with no DNS setup. Once a
      // custom domain is verified in the Resend dashboard, switch this to
      // an address on that domain (e.g. "Portfolio <contact@yourdomain.com>").
      from: 'Portfolio Contact <onboarding@resend.dev>',
      to: toEmail,
      replyTo: email,
      subject: `[Portfolio] ${subject}`,
      text: `From: ${name} <${email}>\n\n${message}`,
    });

    if (error) {
      console.error('Resend send failed:', error);
      res.status(502).json({ error: 'Failed to send message' });
      return;
    }

    res.status(200).json({ ok: true });
  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({ error: 'Failed to send message' });
  }
}
