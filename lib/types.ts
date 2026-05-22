// Auth Types
export interface AuthPayload {
  email: string;
  password: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  token?: string;
  user?: UserProfile;
  error?: string;
}

export interface UserProfile {
  id: string;
  email: string;
  firstName: string | null;
  lastName: string | null;
  role: string;
  organizationId?: string;
}

// Member Types
export interface MemberInput {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  dateOfBirth?: string;
  idNumber?: string;
  status?: 'ACTIVE' | 'INACTIVE' | 'SUSPENDED' | 'RESIGNED';
  tier?: 'BRONZE' | 'SILVER' | 'GOLD' | 'PLATINUM';
}

export interface MemberResponse extends MemberInput {
  id: string;
  organizationId: string;
  joinDate: string;
  createdAt: string;
  updatedAt: string;
}

// Payment Types
export interface PaymentInput {
  memberId: string;
  amount: number;
  type: 'MEMBERSHIP_FEE' | 'EVENT_REGISTRATION' | 'DONATION' | 'OTHER';
  method: 'ORANGE_MONEY' | 'MTN_MONEY' | 'WAVE' | 'BANK_TRANSFER' | 'CASH';
  mobileProvider?: string;
  phoneNumber?: string;
  reference?: string;
}

export interface PaymentResponse extends PaymentInput {
  id: string;
  status: 'PENDING' | 'CONFIRMED' | 'FAILED' | 'CANCELLED' | 'REFUNDED';
  currency: string;
  createdAt: string;
  updatedAt: string;
}

// Transaction Types
export interface TransactionInput {
  description: string;
  amount: number;
  type: 'INCOME' | 'EXPENSE';
  status?: 'PENDING' | 'COMPLETED' | 'CANCELLED';
}

export interface TransactionResponse extends TransactionInput {
  id: string;
  organizationId: string;
  createdAt: string;
  updatedAt: string;
}

// Event Types
export interface EventInput {
  title: string;
  description?: string;
  startDate: string;
  endDate: string;
  location?: string;
  maxParticipants?: number;
  status?: 'SCHEDULED' | 'ONGOING' | 'COMPLETED' | 'CANCELLED';
}

export interface EventResponse extends EventInput {
  id: string;
  organizationId: string;
  createdAt: string;
  updatedAt: string;
}

// Event Participation Types
export interface EventParticipationInput {
  memberId: string;
  eventId: string;
  status?: 'REGISTERED' | 'CHECKED_IN' | 'CANCELLED' | 'NO_SHOW';
}

export interface EventParticipationResponse extends EventParticipationInput {
  id: string;
  checkedInAt?: string;
  createdAt: string;
  updatedAt: string;
}

// Notification Types
export interface NotificationInput {
  title: string;
  message: string;
  type: 'PAYMENT_REMINDER' | 'EVENT_REMINDER' | 'ANNOUNCEMENT' | 'DOCUMENT_SHARED' | 'MEMBERSHIP_EXPIRING' | 'PAYMENT_RECEIVED' | 'SYSTEM';
  memberId: string;
}

export interface NotificationResponse extends NotificationInput {
  id: string;
  isRead: boolean;
  organizationId: string;
  createdAt: string;
  updatedAt: string;
}

// Document Types
export interface DocumentInput {
  title: string;
  type: 'RECEIPT' | 'INVOICE' | 'REPORT' | 'REGULATION' | 'MEMBERSHIP_CARD' | 'OTHER';
  fileUrl: string;
  fileSize?: number;
  memberId?: string;
}

export interface DocumentResponse extends DocumentInput {
  id: string;
  organizationId: string;
  createdAt: string;
  updatedAt: string;
}

// Organization Types
export interface OrganizationInput {
  name: string;
  country: string;
  city?: string;
  region?: string;
  email: string;
  phone?: string;
  logo?: string;
}

export interface OrganizationResponse extends OrganizationInput {
  id: string;
  adminId: string;
  createdAt: string;
  updatedAt: string;
}

// Organization Settings Types
export interface OrganizationSettingsInput {
  currency?: string;
  language?: string;
  timezone?: string;
  emailNotifications?: boolean;
  smsNotifications?: boolean;
  dueMembershipFee?: number;
  membershipPeriod?: string;
}

export interface OrganizationSettingsResponse extends OrganizationSettingsInput {
  id: string;
  organizationId: string;
  createdAt: string;
  updatedAt: string;
}

// Budget Types
export interface BudgetInput {
  name: string;
  amount: number;
  period: 'monthly' | 'quarterly' | 'yearly';
  status?: 'ACTIVE' | 'ARCHIVED';
}

export interface BudgetResponse extends BudgetInput {
  id: string;
  organizationId: string;
  spent: number;
  createdAt: string;
  updatedAt: string;
}

// Invoice Types
export interface InvoiceInput {
  number: string;
  amount: number;
  dueDate?: string;
  status?: 'DRAFT' | 'PENDING' | 'PAID' | 'OVERDUE' | 'CANCELLED';
}

export interface InvoiceResponse extends InvoiceInput {
  id: string;
  issueDate: string;
  createdAt: string;
  updatedAt: string;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  errors?: Record<string, string[]>;
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    pages: number;
  };
}

// Validation Error Type
export interface ValidationError {
  field: string;
  message: string;
}
