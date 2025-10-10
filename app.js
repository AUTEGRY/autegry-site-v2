import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import dotenv from 'dotenv';
import fs from 'fs';
import emailRoutes from './routes/email.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Meta tag translations
const metaTranslations = {
  en: {
    lang: 'en',
    title: 'Autegry - analytical solutions and process automation',
    description: 'We help businesses through automation and data analysis to develop relationships with their clients, expand their activities and effectively manage risks, so they can make better decisions.',
    ogTitle: 'Autegry - analytical solutions and process automation',
    ogDescription: 'We help businesses through automation and data analysis to develop relationships with their clients, expand their activities and effectively manage risks, so they can make better decisions.',
    appTitle: 'Autegry'
  },
  bg: {
    lang: 'bg',
    title: 'Аутегри - аналитични решения и автоматизация на процеси',
    description: 'Помагаме на бизнеса чрез автоматизация и анализ на данни да развива отношения с клиентите си, да разширява дейността си и ефективно да управлява рисковете, за да може да взема по-добри решения.',
    ogTitle: 'Аутегри - аналитични решения и автоматизация на процеси',
    ogDescription: 'Помагаме на бизнеса чрез автоматизация и анализ на данни да развива отношения с клиентите си, да разширява дейността си и ефективно да управлява рисковете, за да може да взема по-добри решения.',
    appTitle: 'Autegry'
  }
};

// Function to inject meta tags based on language
function injectMetaTags(html, language) {
  const meta = metaTranslations[language];

  return html
    .replace(/<html lang="[^"]*"/, `<html lang="${meta.lang}"`)
    .replace(/<title>.*?<\/title>/, `<title>${meta.title}</title>`)
    .replace(/<meta name="description" content="[^"]*"/, `<meta name="description" content="${meta.description}"`)
    .replace(/<meta property="og:title" content="[^"]*"/, `<meta property="og:title" content="${meta.ogTitle}"`)
    .replace(/<meta property="og:description" content="[^"]*"/, `<meta property="og:description" content="${meta.ogDescription}"`)
    .replace(/<meta name="apple-mobile-web-app-title" content="[^"]*"/, `<meta name="apple-mobile-web-app-title" content="${meta.appTitle}"`);
}

// Function to determine language from URL
function getLanguageFromPath(pathname) {
  const pathSegments = pathname.split('/').filter(Boolean);
  return pathSegments[0] === 'en' ? 'en' : 'bg';
}

// Security middleware
app.use(helmet({
  contentSecurityPolicy: false, // Disable CSP for development
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.',
});

const emailLimiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 5, // Limit each IP to 5 email requests per windowMs
  message: 'Too many email requests from this IP, please try again later.',
});

app.use(limiter);

// CORS configuration
const corsOptions = {
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

// Logging
app.use(morgan('combined'));

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Serve static files from React build
app.use(express.static(path.join(__dirname, './dist')));


// API routes
app.use('/api', emailRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

// Cache the HTML template
let htmlTemplate = null;
const getHtmlTemplate = () => {
  if (!htmlTemplate) {
    htmlTemplate = fs.readFileSync(path.join(__dirname, './dist/index.html'), 'utf-8');
  }
  return htmlTemplate;
};

// Serve React app for all other routes with dynamic meta tags
app.get('*', (req, res) => {
  try {
    const language = getLanguageFromPath(req.path);
    const html = getHtmlTemplate();
    const modifiedHtml = injectMetaTags(html, language);

    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.send(modifiedHtml);
  } catch (error) {
    console.error('Error serving HTML:', error);
    res.sendFile(path.join(__dirname, './dist/index.html'));
  }
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong',
  });
});

// Handle 404
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log('\n🚀 ================== SERVER STARTUP ==================');
  console.log(`✅ Server running on port ${PORT}`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🖥️  Frontend URL: ${process.env.FRONTEND_URL || 'http://localhost:5173'}`);
  console.log('📧 Email Configuration:');
  console.log(`   - SMTP Host: ${process.env.SECRET_SMTP_HOST ? '✅ Configured' : '❌ Missing'}`);
  console.log(`   - SMTP User: ${process.env.SECRET_SMTP_USER ? '✅ Configured' : '❌ Missing'}`);
  console.log(`   - SMTP Password: ${process.env.SECRET_SMTP_PASSWORD ? '✅ Configured' : '❌ Missing'}`);
  console.log(`   - SMTP Port: ${process.env.SECRET_SMTP_PORT || '587 (default)'}`);
  console.log('🔗 Available endpoints:');
  console.log('   - POST /api/send-email (Email sending)');
  console.log('   - GET /api/test-email (Email config test - dev only)');
  console.log('   - POST /api/send-test-email (Send test email - dev only)');
  console.log('   - GET /api/health (Health check)');
  console.log('🚀 ================== SERVER READY ==================\n');
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('SIGINT received, shutting down gracefully');
  process.exit(0);
});

export default app;