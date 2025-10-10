import express from 'express';
import nodemailer from 'nodemailer';
import rateLimit from 'express-rate-limit';

const router = express.Router();

// Rate limiting specifically for email endpoint
const emailLimiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 5, // Limit each IP to 5 email requests per windowMs
  message: {
    error: 'Too many email requests from this IP, please try again later.',
  },
});

// Validation helper
const validateEmailData = (data) => {
  const { name, email, phone, message } = data;

  if (!name || !email || !phone || !message) {
    return { isValid: false, error: 'Missing required fields: name, email, phone, and message are required' };
  }

  // Basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { isValid: false, error: 'Invalid email format' };
  }

  // Basic phone validation (allows various formats)
  const phoneRegex = /^[\+]?[0-9\s\-\(\)]{8,}$/;
  if (!phoneRegex.test(phone.replace(/\s/g, ''))) {
    return { isValid: false, error: 'Invalid phone number format' };
  }

  return { isValid: true };
};

// Create email transporter
const createTransporter = () => {
  console.log('🔧 Creating email transporter...');

  // Debug: Check if environment variables are set
  console.log('📋 Checking SMTP environment variables...');
  console.log('   - SMTP_HOST:', process.env.SECRET_SMTP_HOST ? '✅ Set' : '❌ Missing');
  console.log('   - SMTP_USER:', process.env.SECRET_SMTP_USER ? '✅ Set' : '❌ Missing');
  console.log('   - SMTP_PASSWORD:', process.env.SECRET_SMTP_PASSWORD ? '✅ Set' : '❌ Missing');
  console.log('   - SMTP_PORT:', process.env.SECRET_SMTP_PORT || '587 (default)');

  if (!process.env.SECRET_SMTP_HOST || !process.env.SECRET_SMTP_USER || !process.env.SECRET_SMTP_PASSWORD) {
    console.error('❌ Missing SMTP environment variables');
    throw new Error('SMTP configuration missing');
  }

  const transporterConfig = {
    host: process.env.SECRET_SMTP_HOST,
    port: parseInt(process.env.SECRET_SMTP_PORT) || 587,
    secure: false, // For port 587, use STARTTLS instead of direct SSL
    // AWS SES specific configuration
    requireTLS: true, // Require encrypted connection
    auth: {
      user: process.env.SECRET_SMTP_USER,
      pass: process.env.SECRET_SMTP_PASSWORD,
    },
    // Additional options for better reliability
    pool: true,
    maxConnections: 5,
    maxMessages: 10,
    // Add debug logging
    debug: process.env.NODE_ENV === 'development',
    logger: process.env.NODE_ENV === 'development',
    // AWS SES specific settings
    connectionTimeout: 60000, // 60 seconds
    greetingTimeout: 30000, // 30 seconds
    socketTimeout: 60000, // 60 seconds
  };

  console.log('⚙️ Transporter configuration:', {
    host: transporterConfig.host,
    port: transporterConfig.port,
    secure: transporterConfig.secure,
    requireTLS: transporterConfig.requireTLS,
    user: transporterConfig.auth.user,
    debug: transporterConfig.debug
  });

  const transporter = nodemailer.createTransport(transporterConfig);
  console.log('✅ Email transporter created successfully');
  return transporter;
};

// Email sending route
router.post('/send-email', emailLimiter, async (req, res) => {
  console.log('\n📧 ================== EMAIL SEND REQUEST ==================');
  console.log('🕐 Timestamp:', new Date().toISOString());
  console.log('🌐 IP Address:', req.ip || req.connection.remoteAddress);
  console.log('📝 Request Headers:', JSON.stringify(req.headers, null, 2));

  try {
    const { name, email, phone, subject, message } = req.body;
    console.log('📋 Request Body Data:');
    console.log('   - Name:', name || '❌ Missing');
    console.log('   - Email:', email || '❌ Missing');
    console.log('   - Phone:', phone || '❌ Missing');
    console.log('   - Subject:', subject || '(No subject)');
    console.log('   - Message length:', message ? message.length + ' characters' : '❌ Missing');

    // Validate required fields
    console.log('🔍 Validating email data...');
    const validation = validateEmailData({ name, email, phone, message });
    if (!validation.isValid) {
      console.log('❌ Validation failed:', validation.error);
      return res.status(400).json({ error: validation.error });
    }
    console.log('✅ Validation passed');

    // Create transporter
    let transporter;
    try {
      console.log('🔧 Creating email transporter...');
      transporter = createTransporter();
    } catch (error) {
      console.error('❌ Failed to create email transporter:', error.message);
      console.error('❌ Full error:', error);
      return res.status(500).json({ error: 'Email service configuration error' });
    }

    // Test connection (optional, but good for debugging)
    console.log('🔍 Testing SMTP connection...');
    try {
      await transporter.verify();
      console.log('✅ SMTP connection verified successfully');
    } catch (error) {
      console.error('❌ SMTP connection verification failed:', error);
      console.error('❌ Error code:', error.code);
      console.error('❌ Error response:', error.response);
      console.error('❌ Full error object:', JSON.stringify(error, null, 2));
      return res.status(500).json({
        error: 'Email service connection failed',
        details: process.env.NODE_ENV === 'development' ? {
          message: error.message,
          code: error.code,
          response: error.response
        } : undefined
      });
    }

    // Email content
    console.log('📝 Constructing email content...');

    // For AWS SES, the "from" address must be verified
    // Using the SMTP user as the from address since it should be verified
    const fromEmail = process.env.EMAIL_FROM || process.env.SECRET_SMTP_USER || 'info@autegry.com';
    const toEmail = process.env.EMAIL_TO || 'info@autegry.com';

    console.log('📬 Email addresses:');
    console.log('   - From Email:', fromEmail);
    console.log('   - To Email:', toEmail);
    console.log('   - Reply To:', email);

    const mailOptions = {
      from: `"Autegry Contact Form" <${fromEmail}>`, // Must be a verified email in AWS SES
      to: toEmail, // Your company email
      subject: subject || 'New Contact Form Submission',
      replyTo: email, // Allow direct reply to the sender
      // Add headers for better deliverability
      headers: {
        'X-Entity-ID': 'autegry-contact-form',
        'X-Priority': '3', // Normal priority
        'Importance': 'Normal'
      },
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #007bff; padding-bottom: 10px;">
            New Contact Form Submission
          </h2>
          <div style="margin: 20px 0;">
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
            <p><strong>Phone:</strong> <a href="tel:${phone}">${phone}</a></p>
            <p><strong>Subject:</strong> ${subject || 'No subject'}</p>
          </div>
          <div style="margin-top: 20px;">
            <h3 style="color: #333;">Message:</h3>
            <div style="background-color: #f8f9fa; padding: 15px; border-left: 4px solid #007bff; border-radius: 4px;">
              ${message.replace(/\n/g, '<br>')}
            </div>
          </div>
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; color: #666; font-size: 12px;">
            <p>This email was sent from the Autegry website contact form.</p>
            <p>Timestamp: ${new Date().toLocaleString()}</p>
          </div>
        </div>
      `,
      text: `
New Contact Form Submission

Name: ${name}
Email: ${email}
Phone: ${phone}
Subject: ${subject || 'No subject'}

Message:
${message}

---
This email was sent from the Autegry website contact form.
Timestamp: ${new Date().toLocaleString()}
      `,
    };

    console.log('📧 Mail Options:');
    console.log('   - From:', mailOptions.from);
    console.log('   - To:', mailOptions.to);
    console.log('   - Subject:', mailOptions.subject);
    console.log('   - ReplyTo:', mailOptions.replyTo);
    console.log('   - HTML length:', mailOptions.html.length, 'characters');
    console.log('   - Text length:', mailOptions.text.length, 'characters');

    // Send email
    console.log('📤 Attempting to send email...');
    const sendStartTime = Date.now();
    const info = await transporter.sendMail(mailOptions);
    const sendDuration = Date.now() - sendStartTime;

    console.log('✅ Email sent successfully!');
    console.log('   - Message ID:', info.messageId);
    console.log('   - Response:', info.response);
    console.log('   - Accepted:', info.accepted);
    console.log('   - Rejected:', info.rejected);
    console.log('   - Send duration:', sendDuration + 'ms');
    console.log('🎉 ================== EMAIL SEND SUCCESS ==================\n');

    res.json({
      message: 'Email sent successfully',
      messageId: info.messageId,
    });
  } catch (error) {
    console.log('💥 ================== EMAIL SEND ERROR ==================');
    console.error('❌ Error sending email:', error.message);
    console.error('❌ Error code:', error.code);
    console.error('❌ Error command:', error.command);
    console.error('❌ Error response:', error.response);
    console.error('❌ Error stack:', error.stack);
    console.error('❌ Full error object:', JSON.stringify(error, null, 2));

    // Provide more specific error messages based on error type
    let errorMessage = 'Failed to send email';
    let debugInfo = {};

    if (error.code === 'EAUTH') {
      errorMessage = 'Email authentication failed';
      debugInfo.hint = 'Check SMTP username and password in environment variables';
    } else if (error.code === 'ECONNREFUSED') {
      errorMessage = 'Email service connection refused';
      debugInfo.hint = 'Check SMTP host and port configuration';
    } else if (error.code === 'ETIMEDOUT') {
      errorMessage = 'Email service timeout';
      debugInfo.hint = 'SMTP server is not responding - check network connectivity';
    } else if (error.code === 'ENOTFOUND') {
      errorMessage = 'SMTP server not found';
      debugInfo.hint = 'Check SMTP host address';
    } else if (error.responseCode) {
      errorMessage = `SMTP Error: ${error.responseCode}`;
      debugInfo.smtpResponse = error.response;
    }

    debugInfo.errorCode = error.code;
    debugInfo.errorCommand = error.command;

    console.log('📋 Error Analysis:');
    console.log('   - Error Message:', errorMessage);
    console.log('   - Debug Info:', JSON.stringify(debugInfo, null, 2));
    console.log('💥 ================== EMAIL SEND ERROR END ==================\n');

    res.status(500).json({
      error: errorMessage,
      details: process.env.NODE_ENV === 'development' ? {
        message: error.message,
        code: error.code,
        hint: debugInfo.hint,
        response: error.response
      } : undefined
    });
  }
});

// Test endpoint for checking email configuration
router.get('/test-email', async (req, res) => {
  console.log('\n🧪 ================== EMAIL TEST REQUEST ==================');
  console.log('🕐 Timestamp:', new Date().toISOString());

  if (process.env.NODE_ENV !== 'development') {
    console.log('⚠️ Test endpoint not available in production mode');
    return res.status(404).json({ error: 'Endpoint not available in production' });
  }

  try {
    console.log('🧪 Testing email configuration...');
    const transporter = createTransporter();
    console.log('🔍 Verifying SMTP connection...');
    await transporter.verify();
    console.log('✅ Email configuration test passed');
    console.log('🧪 ================== EMAIL TEST SUCCESS ==================\n');
    res.json({
      message: 'Email configuration is valid',
      config: {
        host: process.env.SECRET_SMTP_HOST,
        port: process.env.SECRET_SMTP_PORT || '587',
        fromEmail: process.env.EMAIL_FROM || process.env.SECRET_SMTP_USER || 'info@autegry.com',
        toEmail: process.env.EMAIL_TO || 'info@autegry.com'
      }
    });
  } catch (error) {
    console.log('💥 ================== EMAIL TEST ERROR ==================');
    console.error('❌ Email configuration test failed:', error.message);
    console.error('❌ Error details:', JSON.stringify(error, null, 2));
    console.log('💥 ================== EMAIL TEST ERROR END ==================\n');
    res.status(500).json({
      error: 'Email configuration is invalid',
      details: error.message
    });
  }
});

// Simple test email endpoint
router.post('/send-test-email', async (req, res) => {
  console.log('\n🧪 ================== SEND TEST EMAIL ==================');

  if (process.env.NODE_ENV !== 'development') {
    return res.status(404).json({ error: 'Endpoint not available in production' });
  }

  try {
    const transporter = createTransporter();
    const fromEmail = process.env.EMAIL_FROM || process.env.SECRET_SMTP_USER || 'info@autegry.com';
    const toEmail = process.env.EMAIL_TO || 'info@autegry.com';

    const testMailOptions = {
      from: `"Autegry Test" <${fromEmail}>`,
      to: toEmail,
      subject: 'Test Email from Autegry Server',
      replyTo: fromEmail,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">Test Email</h2>
          <p>This is a test email sent from the Autegry server.</p>
          <p><strong>Timestamp:</strong> ${new Date().toISOString()}</p>
          <p><strong>From:</strong> ${fromEmail}</p>
          <p><strong>To:</strong> ${toEmail}</p>
          <p>If you received this email, the email configuration is working correctly!</p>
        </div>
      `,
      text: `
Test Email

This is a test email sent from the Autegry server.
Timestamp: ${new Date().toISOString()}
From: ${fromEmail}
To: ${toEmail}

If you received this email, the email configuration is working correctly!
      `
    };

    console.log('📤 Sending test email...');
    const info = await transporter.sendMail(testMailOptions);
    console.log('✅ Test email sent successfully:', info.messageId);
    console.log('🧪 ================== TEST EMAIL SUCCESS ==================\n');

    res.json({
      message: 'Test email sent successfully',
      messageId: info.messageId,
      from: fromEmail,
      to: toEmail
    });
  } catch (error) {
    console.log('💥 ================== TEST EMAIL ERROR ==================');
    console.error('❌ Test email failed:', error.message);
    console.error('❌ Error details:', JSON.stringify(error, null, 2));
    console.log('💥 ================== TEST EMAIL ERROR END ==================\n');

    res.status(500).json({
      error: 'Test email failed',
      details: error.message
    });
  }
});

export default router;
