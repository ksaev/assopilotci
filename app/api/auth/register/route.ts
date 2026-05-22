import { NextRequest, NextResponse } from 'next/server';
import { registerSchema } from '@/lib/validations';
import { successResponse, errorResponse } from '@/lib/utils-api';
import { ConflictError, ValidationError } from '@/lib/errors';
import type { UserProfile } from '@/lib/types';

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const body = await request.json();

    // Validate request
    const validation = registerSchema.safeParse(body);
    if (!validation.success) {
      const errors = validation.error.flatten().fieldErrors;
      return errorResponse(
        'Erreur de validation',
        400,
        errors
      );
    }

    const { email, password, firstName, lastName, organizationName, country } = validation.data;

    // TODO: Check if user exists
    // const existingUser = await prisma.user.findUnique({ where: { email } });
    // if (existingUser) {
    //   throw new ConflictError('Cet email est déjà enregistré');
    // }

    // TODO: Hash password with bcrypt
    // import bcrypt from 'bcryptjs';
    // const hashedPassword = await bcrypt.hash(password, 10);

    // TODO: Create user and organization in Prisma
    // const user = await prisma.user.create({
    //   data: {
    //     email,
    //     password: hashedPassword,
    //     firstName,
    //     lastName,
    //     role: 'ADMIN',
    //     organization: {
    //       create: {
    //         name: organizationName || `Association de ${firstName}`,
    //         country: country || 'CI',
    //         email,
    //       },
    //     },
    //   },
    //   include: { organization: true },
    // });

    // TODO: Generate JWT token
    // import { generateJWTToken } from '@/lib/auth-middleware';
    // const token = generateJWTToken({
    //   userId: user.id,
    //   email: user.email,
    //   role: user.role,
    //   organizationId: user.organization?.id,
    // });

    // Mock response for now
    const mockUser: UserProfile = {
      id: 'user_' + Date.now(),
      email,
      firstName,
      lastName,
      role: 'ADMIN',
    };

    const mockToken = 'test_token_' + mockUser.id + '_ADMIN';

    return successResponse(
      {
        user: mockUser,
        token: mockToken,
      },
      'Inscription réussie',
      201
    );
  } catch (error) {
    const err = error instanceof Error ? error : new Error('Erreur inconnue');
    console.error('[v0] Register error:', err);
    return errorResponse(err.message, 500);
  }
}
