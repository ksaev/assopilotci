// Environment variables configuration
// All required variables should be defined in .env.local or set in deployment

export const ENV = {
  // Database
  DATABASE_URL: process.env.DATABASE_URL || 'postgresql://user:password@localhost:5432/gestionasso',

  // JWT Configuration
  JWT_SECRET: process.env.JWT_SECRET || 'your-secret-key-change-in-production',
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '30d',

  // API Configuration
  API_BASE_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000',
  NODE_ENV: process.env.NODE_ENV || 'development',

  // Email Configuration (for future implementation)
  SMTP_HOST: process.env.SMTP_HOST || '',
  SMTP_PORT: process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT) : 587,
  SMTP_USER: process.env.SMTP_USER || '',
  SMTP_PASS: process.env.SMTP_PASS || '',
  SMTP_FROM: process.env.SMTP_FROM || 'noreply@gestionasso.ci',

  // Mobile Money APIs (Placeholder for future implementation)
  ORANGE_MONEY_API_KEY: process.env.ORANGE_MONEY_API_KEY || '',
  ORANGE_MONEY_API_SECRET: process.env.ORANGE_MONEY_API_SECRET || '',
  ORANGE_MONEY_MERCHANT_CODE: process.env.ORANGE_MONEY_MERCHANT_CODE || '',

  MTN_MOMO_API_KEY: process.env.MTN_MOMO_API_KEY || '',
  MTN_MOMO_API_SECRET: process.env.MTN_MOMO_API_SECRET || '',
  MTN_MOMO_PRIMARY_KEY: process.env.MTN_MOMO_PRIMARY_KEY || '',

  WAVE_API_KEY: process.env.WAVE_API_KEY || '',
  WAVE_BUSINESS_ID: process.env.WAVE_BUSINESS_ID || '',

  // Twilio SMS Configuration (for future notifications)
  TWILIO_ACCOUNT_SID: process.env.TWILIO_ACCOUNT_SID || '',
  TWILIO_AUTH_TOKEN: process.env.TWILIO_AUTH_TOKEN || '',
  TWILIO_PHONE_NUMBER: process.env.TWILIO_PHONE_NUMBER || '',

  // Third-party Services
  SENTRY_DSN: process.env.SENTRY_DSN || '',
  ANALYTICS_ID: process.env.NEXT_PUBLIC_ANALYTICS_ID || '',

  // File Storage (Vercel Blob or similar)
  BLOB_READ_WRITE_TOKEN: process.env.BLOB_READ_WRITE_TOKEN || '',

  // Feature Flags
  ENABLE_ADVANCED_ANALYTICS: process.env.NEXT_PUBLIC_ENABLE_ANALYTICS === 'true',
  ENABLE_SMS_NOTIFICATIONS: process.env.ENABLE_SMS_NOTIFICATIONS === 'true',
  ENABLE_EMAIL_NOTIFICATIONS: process.env.ENABLE_EMAIL_NOTIFICATIONS === 'true',
  ENABLE_MOBILE_MONEY: process.env.ENABLE_MOBILE_MONEY === 'true',
};

/**
 * Validate required environment variables
 */
export function validateEnvironment() {
  const required = [
    'DATABASE_URL',
    'JWT_SECRET',
  ];

  const missing = required.filter(key => !process.env[key]);

  if (missing.length > 0) {
    console.warn(
      `[ENV] Missing environment variables: ${missing.join(', ')}`,
      '\nPlease configure these in .env.local or your deployment platform.'
    );
  }
}

/**
 * Check if we're in production
 */
export const isProd = ENV.NODE_ENV === 'production';

/**
 * Check if we're in development
 */
export const isDev = ENV.NODE_ENV === 'development';
