import { NextResponse } from 'next/server';

/**
 * Standardized successful API response
 */
export function successResponse<T>(
  data: T,
  message?: string,
  status = 200
): NextResponse<{ success: true; data: T; message?: string }> {
  return NextResponse.json(
    {
      success: true,
      data,
      ...(message && { message }),
    },
    { status }
  );
}

/**
 * Standardized error API response
 */
export function errorResponse(
  error: string | Error,
  status = 400,
  details?: any
): NextResponse<{ success: false; error: string; details?: any }> {
  const message = error instanceof Error ? error.message : error;
  return NextResponse.json(
    {
      success: false,
      error: message,
      ...(details && { details }),
    },
    { status }
  );
}

/**
 * Validate required fields
 */
export function validateRequired(obj: Record<string, any>, fields: string[]): string | null {
  for (const field of fields) {
    if (!obj[field]) {
      return `Le champ ${field} est requis`;
    }
  }
  return null;
}

/**
 * Safe JSON parsing
 */
export function safeJsonParse<T = any>(json: string, fallback: T): T {
  try {
    return JSON.parse(json);
  } catch (error) {
    console.error('[v0] JSON parse error:', error);
    return fallback;
  }
}

/**
 * Format FCFA currency
 */
export function formatFCFA(amount: number): string {
  return `${amount.toLocaleString('fr-FR')} FCFA`;
}

/**
 * Parse FCFA string to number
 */
export function parseFCFA(value: string): number {
  const cleaned = value.replace(/[^\d]/g, '');
  return parseInt(cleaned, 10) || 0;
}

/**
 * Generate unique reference for payment
 */
export function generatePaymentReference(): string {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 7).toUpperCase();
  return `PAY-${timestamp}-${random}`;
}

/**
 * Get user organization ID from header
 */
export function getOrgIdFromHeader(request: Request): string | null {
  const orgId = request.headers.get('X-Organization-ID');
  return orgId;
}

/**
 * Calculate member tier based on payments
 */
export function calculateMemberTier(totalPaid: number): 'BRONZE' | 'SILVER' | 'GOLD' | 'PLATINUM' {
  if (totalPaid >= 500000) return 'PLATINUM'; // 500k FCFA
  if (totalPaid >= 300000) return 'GOLD'; // 300k FCFA
  if (totalPaid >= 100000) return 'SILVER'; // 100k FCFA
  return 'BRONZE';
}

/**
 * Check if payment is overdue
 */
export function isPaymentOverdue(dueDate: Date): boolean {
  return new Date() > dueDate;
}

/**
 * Days until payment due
 */
export function daysUntilDue(dueDate: Date): number {
  const diff = dueDate.getTime() - new Date().getTime();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

/**
 * Format date to French locale
 */
export function formatDateFR(date: Date): string {
  return date.toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

/**
 * Generate QR code data URL (simple version)
 */
export function generateQRCodeData(data: string): string {
  // In production, use a library like 'qrcode'
  // For now, return a placeholder
  return `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(data)}`;
}
