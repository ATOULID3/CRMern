import nodemailer from 'nodemailer';
import { supabase } from '../utils/supabase';

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
}

// Configure your email provider
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || 'smtp.example.com',
  port: parseInt(process.env.EMAIL_PORT || '587'),
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export const sendEmail = async (options: EmailOptions) => {
  try {
    await transporter.sendMail({
      from: `"Your Company" <${process.env.EMAIL_FROM}>`,
      ...options,
    });
    console.log(`Email sent to ${options.to}`);
    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    return false;
  }
};

export const sendBulkEmailsToClients = async () => {
  // Fetch all active clients from Supabase
  const { data: clients, error } = await supabase
    .from('clients')
    .select('*')
    .eq('status', 'Active');

  if (error) {
    console.error('Error fetching clients:', error);
    return;
  }

  if (!clients || clients.length === 0) {
    console.log('No active clients found');
    return;
  }

  // Send email to each client
  for (const client of clients) {
    const emailContent = {
      to: client.email,
      subject: 'Monthly Newsletter',
      html: `
        <h1>Hello ${client.name},</h1>
        <p>Here's your monthly update from our company!</p>
        <p>Special offers just for you:</p>
        <ul>
          <li>Offer 1</li>
          <li>Offer 2</li>
          <li>Offer 3</li>
        </ul>
        <p>Best regards,<br/>Your Company</p>
      `,
    };

    await sendEmail(emailContent);
  }
};