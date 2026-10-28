import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig, loadEnv} from 'vite';

function smtpApiPlugin(env: Record<string, string>) {
  return {
    name: 'smtp-api-plugin',
    configureServer(server: any) {
      server.middlewares.use('/api/send-email', async (req: any, res: any) => {
        if (req.method !== 'POST') {
          res.statusCode = 405;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ message: 'Method Not Allowed' }));
          return;
        }

        let body = '';
        req.on('data', (chunk: any) => { body += chunk; });
        req.on('end', async () => {
          try {
            const data = JSON.parse(body || '{}');
            const { name, email, subject, message } = data;
            const nodemailer = await import('nodemailer');
            const smtpUser = env.SMTP_USER || 'segninadew63@gmail.com';
            const rawPass = env.SMTP_PASS || env.STMP || '';
            const smtpPass = rawPass.replace(/\s+/g, '');

            const transporter = nodemailer.createTransport({
              service: 'gmail',
              auth: { user: smtpUser, pass: smtpPass },
            });

            const info = await transporter.sendMail({
              from: `"${name} (Portfolio)" <${smtpUser}>`,
              to: 'segninadew1@gmail.com, segninadew63@gmail.com',
              replyTo: email || 'segninadew1@gmail.com',
              subject: subject || `Portfolio Inquiry from ${name}`,
              text: `${message}\n\nSender: ${name}\nEmail: ${email || 'Not provided'}`,
            });

            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ success: true, messageId: info.messageId }));
          } catch (err: any) {
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ success: false, message: err.message || 'SMTP Error' }));
          }
        });
      });
    }
  };
}

export default defineConfig(({mode}) => {
  const env = loadEnv(mode, '.', '');
  return {
    plugins: [react(), tailwindcss(), smtpApiPlugin(env)],
    define: {
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
      'process.env.WEB3FORMS_ACCESS_KEY': JSON.stringify(env.WEB3FORMS_ACCESS_KEY || env.VITE_WEB3FORMS_ACCESS_KEY),
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
    },
  };
});
