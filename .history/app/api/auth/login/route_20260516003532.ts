import { NextRequest, NextResponse } from 'next/server';
import { loginSchema } from '@/lib/validations';
import { successResponse, errorResponse } from '@/lib/utils-api';
import { UnauthorizedError } from '@/lib/errors';
import type { UserProfile } from '@/lib/types';

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const body = await request.json();

    // Validate request
    const validation = loginSchema.safeParse(body);
    if (!validation.success) {
      const errors = validation.error.flatten().fieldErrors;
      return errorResponse('Erreur de validation', 400, errors);
    }

    const { email, password } = validation.data;

    // TODO: Fetch user from Prisma
    // const user = await prisma.user.findUnique({
    //   where: { email },
    //   include: { organization: true },
    // });
    // if (!user) {
    //   throw new UnauthorizedError('Email ou mot de passe incorrect');
    // }

    // TODO: Verify password with bcrypt
    // import bcrypt from 'bcryptjs';
    // const isPasswordValid = await bcrypt.compare(password, user.password);
    // if (!isPasswordValid) {
    //   throw new UnauthorizedError('Email ou mot de passe incorrect');
    // }

    // TODO: Generate JWT token
    // import { generateJWTToken } from '@/lib/auth-middleware';
    // const token = generateJWTToken({
    //   userId: user.id,
    //   email: user.email,
    //   role: user.role,
    //   organizationId: user.organization?.id,
    // });

    // Mock response for development
    const mockUser: UserProfile = {
      id: 'user_' + Date.now(),
      email,
      firstName: email.includes('admin') ? 'Admin' : 'Member',
      lastName: 'User',
      role: email.includes('admin') ? 'ADMIN' : 'MEMBER',
    };

    const mockToken = 'test_token_' + mockUser.id + '_' + mockUser.role;

    return successResponse(
      {
        user: mockUser,
        token: mockToken,
      },
      'Connexion réussie'
    );
  } catch (error) {
    const err = error instanceof Error ? error : new Error('Erreur inconnue');
    const status = error instanceof UnauthorizedError ? 401 : 500;
    console.error('[v0] Login error:', err);
    return errorResponse(err.message, status);
  }
}
