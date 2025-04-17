import cron from 'node-cron';
import { sendBulkEmailsToClients } from '../services/emailService';

// Schedule email job to run at 9:00 AM every Monday
export const setupCronJobs = () => {
  cron.schedule('0 9 * * 1', async () => {
    console.log('Running scheduled email job...');
    await sendBulkEmailsToClients();
    console.log('Email job completed');
  });
};