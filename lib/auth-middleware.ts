import { NextRequest, NextResponse } from 'next/server';

// Interface for JWT payload
export interface JWTPayload {
  userId: string;
  email: string;
  role: string;
  organizationId?: string;
  iat?: number;
  exp?: number;
}

/**
 * Verify JWT token from request headers
 * TODO: Replace with actual jwt.verify() when JWT_SECRET is configured
 */
export function verifyJWTToken(token: string): JWTPayload | null {
  try {
    // TODO: Implement with jsonwebtoken library
    // import jwt from 'jsonwebtoken';
    // const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JWTPayload;
    // return decoded;

    // Temporary mock for development
    if (token.startsWith('test_token_')) {
      const parts = token.split('_');
      return {
        userId: 'test_user_123',
        email: 'test@example.com',
        role: parts[2] || 'MEMBER',
        organizationId: 'test_org_456',
      };
    }
    return null;
  } catch (error) {
    console.error('[v0] JWT verification failed:', error);
    return null;
  }
}

/**
 * Generate JWT token
 * TODO: Implement with jsonwebtoken library when JWT_SECRET is configured
 */
export function generateJWTToken(payload: Omit<JWTPayload, 'iat' | 'exp'>): string {
  try {
    // TODO: Implement with jsonwebtoken library
    // import jwt from 'jsonwebtoken';
    // return jwt.sign(payload, process.env.JWT_SECRET!, {
    //   expiresIn: process.env.JWT_EXPIRES_IN || '30d',
    // });

    // Temporary mock for development
    return `test_token_${payload.userId}_${payload.role}`;
  } catch (error) {
    console.error('[v0] JWT generation failed:', error);
    throw new Error('Erreur de génération du token');
  }
}

/**
 * Middleware to check if user is authenticated
 */
export function withAuth(handler: (req: NextRequest, payload: JWTPayload) => Promise<NextResponse>) {
  return async (request: NextRequest) => {
    const token = extractTokenFromRequest(request);

    if (!token) {
      return NextResponse.json(
        {
          success: false,
          error: 'Authentification requise',
        },
        { status: 401 }
      );
    }

    const payload = verifyJWTToken(token);
    if (!payload) {
      return NextResponse.json(
        {
          success: false,
          error: 'Token invalide ou expiré',
        },
        { status: 401 }
      );
    }

    return handler(request, payload);
  };
}

/**
 * Middleware to check user role
 */
export function withRole(roles: string[], handler: (req: NextRequest, payload: JWTPayload) => Promise<NextResponse>) {
  return async (request: NextRequest) => {
    const token = extractTokenFromRequest(request);

    if (!token) {
      return NextResponse.json(
        {
          success: false,
          error: 'Authentification requise',
        },
        { status: 401 }
      );
    }

    const payload = verifyJWTToken(token);
    if (!payload) {
      return NextResponse.json(
        {
          success: false,
          error: 'Token invalide ou expiré',
        },
        { status: 401 }
      );
    }

    if (!roles.includes(payload.role)) {
      return NextResponse.json(
        {
          success: false,
          error: 'Accès non autorisé',
        },
        { status: 403 }
      );
    }

    return handler(request, payload);
  };
}

/**
 * Extract JWT token from Authorization header
 */
export function extractTokenFromRequest(request: NextRequest): string | null {
  const authHeader = request.headers.get('Authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null;
  }
  return authHeader.substring(7);
}

/**
 * Get user from request
 */
export function getUserFromRequest(request: NextRequest): JWTPayload | null {
  const token = extractTokenFromRequest(request);
  if (!token) return null;
  return verifyJWTToken(token);
}

/**
 * Get user's organization ID
 */
export function getUserOrganizationId(request: NextRequest): string {
  const user = getUserFromRequest(request);
  return user?.organizationId || 'default_org';
}

/**
 * Get user's ID
 */
export function getUserId(request: NextRequest): string {
  const user = getUserFromRequest(request);
  return user?.userId || 'anonymous';
}
