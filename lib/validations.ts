import { z } from 'zod';

// Authentication schemas
export const registerSchema = z.object({
  email: z.string().email('Email invalide').min(5),
  password: z.string().min(6, 'Le mot de passe doit contenir au moins 6 caractères'),
  firstName: z.string().min(1, 'Prénom requis'),
  lastName: z.string().min(1, 'Nom requis'),
  organizationName: z.string().optional(),
  country: z.string().optional(),
});

export const loginSchema = z.object({
  email: z.string().email('Email invalide'),
  password: z.string().min(1, 'Le mot de passe est requis'),
});

// Member schemas
export const memberSchema = z.object({
  firstName: z.string().min(1, 'Prénom requis'),
  lastName: z.string().min(1, 'Nom requis'),
  email: z.string().email('Email invalide'),
  phone: z.string().optional(),
  idNumber: z.string().optional(),
  dateOfBirth: z.string().datetime().optional(),
  status: z.enum(['ACTIVE', 'INACTIVE', 'SUSPENDED', 'RESIGNED']).optional(),
  tier: z.enum(['BRONZE', 'SILVER', 'GOLD', 'PLATINUM']).optional(),
});

// Payment schemas
export const paymentSchema = z.object({
  amount: z.number().positive('Le montant doit être positif'),
  memberId: z.string().min(1, 'ID du membre requis'),
  type: z.enum(['MEMBERSHIP_FEE', 'EVENT_REGISTRATION', 'DONATION', 'OTHER']),
  method: z.enum(['ORANGE_MONEY', 'MTN_MONEY', 'WAVE', 'BANK_TRANSFER', 'CASH']),
  mobileProvider: z.string().optional(),
  phoneNumber: z.string().optional(),
  reference: z.string().optional(),
});

// Event schemas
export const eventSchema = z.object({
  title: z.string().min(1, 'Titre requis').max(200),
  description: z.string().optional(),
  startDate: z.string().datetime('Format de date invalide'),
  endDate: z.string().datetime('Format de date invalide'),
  location: z.string().optional(),
  maxParticipants: z.number().positive().optional(),
  status: z.enum(['SCHEDULED', 'ONGOING', 'COMPLETED', 'CANCELLED']).optional(),
});

// Notification schemas
export const notificationSchema = z.object({
  title: z.string().min(1, 'Titre requis'),
  message: z.string().min(1, 'Message requis'),
  type: z.enum([
    'PAYMENT_REMINDER',
    'EVENT_REMINDER',
    'ANNOUNCEMENT',
    'DOCUMENT_SHARED',
    'MEMBERSHIP_EXPIRING',
    'PAYMENT_RECEIVED',
    'SYSTEM',
  ]),
  memberId: z.string().optional(),
});





export const settingsSchema = z.object({
  associationName: z.string().min(3),
  email: z.string().email(),
  phone: z.string().optional(),
  address: z.string().optional(),
  description: z.string().optional(),

  language: z.string(),
  currency: z.string(),

  emailNotifications: z.boolean(),
  smsNotifications: z.boolean(),
  paymentReminders: z.boolean(),
  eventReminders: z.boolean(),
  monthlyReports: z.boolean(),

  twoFactorAuth: z.boolean(),
  sessionTimeout: z.number(),
})

export type SettingsInput = z.infer<typeof settingsSchema>



// Type exports for TypeScript
export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type MemberInput = z.infer<typeof memberSchema>;
export type PaymentInput = z.infer<typeof paymentSchema>;
export type EventInput = z.infer<typeof eventSchema>;
export type NotificationInput = z.infer<typeof notificationSchema>;
