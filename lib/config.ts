/**
 * Application Configuration
 */

export const APP_CONFIG = {
  // App Info
  name: 'GestionAsso CI',
  version: '1.0.0',
  description: 'Plateforme universelle de gestion d\'association',

  // API Configuration
  api: {
    baseUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000',
    timeout: 30000, // 30 seconds
  },

  // Auth Configuration
  auth: {
    jwtSecret: process.env.JWT_SECRET || 'dev-secret-key',
    jwtExpiresIn: process.env.JWT_EXPIRES_IN || '30d',
    tokenKey: 'authToken',
    storageKey: 'auth',
  },

  // Currency Configuration (Côte d'Ivoire)
  currency: {
    code: 'XOF',
    symbol: 'FCFA',
    countries: ['CI', 'SN', 'BJ', 'BF', 'ML', 'NE', 'TG'],
  },

  // Payment Methods
  paymentMethods: [
    { id: 'ORANGE_MONEY', name: 'Orange Money', icon: '📱' },
    { id: 'MTN_MONEY', name: 'MTN Mobile Money', icon: '📱' },
    { id: 'WAVE', name: 'Wave', icon: '💳' },
    { id: 'BANK_TRANSFER', name: 'Virement bancaire', icon: '🏦' },
    { id: 'CASH', name: 'Espèces', icon: '💵' },
  ],

  // Member Tiers
  memberTiers: [
    {
      id: 'BRONZE',
      name: 'Bronze',
      minAmount: 0,
      maxAmount: 99999,
      benefits: ['Accès basique', 'Participation événements'],
    },
    {
      id: 'SILVER',
      name: 'Argent',
      minAmount: 100000,
      maxAmount: 299999,
      benefits: ['Accès complet', 'Participations prioritaires', 'Réductions'],
    },
    {
      id: 'GOLD',
      name: 'Or',
      minAmount: 300000,
      maxAmount: 499999,
      benefits: ['Accès VIP', 'Priorité événements', '10% réduction'],
    },
    {
      id: 'PLATINUM',
      name: 'Platine',
      minAmount: 500000,
      maxAmount: Infinity,
      benefits: ['Accès VIP illimité', 'Événements exclusifs', '20% réduction'],
    },
  ],

  // Member Status
  memberStatus: [
    { id: 'ACTIVE', name: 'Actif', color: 'green' },
    { id: 'INACTIVE', name: 'Inactif', color: 'gray' },
    { id: 'SUSPENDED', name: 'Suspendu', color: 'red' },
    { id: 'RESIGNED', name: 'Démissionné', color: 'yellow' },
  ],

  // Event Status
  eventStatus: [
    { id: 'SCHEDULED', name: 'Programmé', color: 'blue' },
    { id: 'ONGOING', name: 'En cours', color: 'green' },
    { id: 'COMPLETED', name: 'Terminé', color: 'gray' },
    { id: 'CANCELLED', name: 'Annulé', color: 'red' },
  ],

  // Notification Types
  notificationTypes: [
    'PAYMENT_REMINDER',
    'EVENT_REMINDER',
    'ANNOUNCEMENT',
    'DOCUMENT_SHARED',
    'MEMBERSHIP_EXPIRING',
    'PAYMENT_RECEIVED',
    'SYSTEM',
  ],

  // Feature Flags
  features: {
    sms: process.env.ENABLE_SMS_NOTIFICATIONS === 'true',
    email: process.env.ENABLE_EMAIL_NOTIFICATIONS === 'true',
    mobileMoney: process.env.ENABLE_MOBILE_MONEY === 'true',
    darkMode: true,
    multiLanguage: true,
  },

  // Role-based permissions
  permissions: {
    SUPER_ADMIN: ['*'], // All permissions
    ADMIN: [
      'members:read',
      'members:create',
      'members:update',
      'members:delete',
      'transactions:read',
      'transactions:create',
      'events:read',
      'events:create',
      'events:update',
      'events:delete',
      'reports:read',
      'settings:read',
      'settings:update',
    ],
    TREASURER: [
      'members:read',
      'transactions:read',
      'transactions:create',
      'reports:read',
    ],
    SECRETARY: [
      'members:read',
      'members:create',
      'members:update',
      'events:read',
      'events:create',
      'events:update',
    ],
    MEMBER: [
      'members:read_own',
      'transactions:read_own',
      'events:read',
      'events:register',
    ],
  },

  // Pagination
  pagination: {
    defaultPageSize: 10,
    maxPageSize: 100,
  },

  // Locales
  locales: {
    default: 'fr',
    supported: ['fr', 'en'],
  },

  // Date Format
  dateFormat: 'DD/MM/YYYY',
  timeFormat: 'HH:mm:ss',

  // Demo/Development
  isDevelopment: process.env.NODE_ENV === 'development',
  isProduction: process.env.NODE_ENV === 'production',
};

export default APP_CONFIG;
