import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import dotenv from 'dotenv';
import emailRoutes from './routes/email.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

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

// Serve React app for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './dist/index.html'));
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