import { NextRequest, NextResponse } from 'next/server';
import { withAuth } from '@/lib/auth-middleware';
import { successResponse, errorResponse } from '@/lib/utils-api';
import type { UserProfile } from '@/lib/types';

export const GET = withAuth(async (request, payload) => {
  try {
    // TODO: Fetch user from Prisma
    // const user = await prisma.user.findUnique({
    //   where: { id: payload.userId },
    //   include: { organization: true },
    // });
    // if (!user) {
    //   return errorResponse('Utilisateur non trouvé', 404);
    // }

    const mockUser: UserProfile = {
      id: payload.userId,
      email: payload.email,
      firstName: 'User',
      lastName: 'Test',
      role: payload.role,
    };

    return successResponse(mockUser);
  } catch (error) {
    console.error('[v0] Get user error:', error);
    return errorResponse('Erreur lors de la récupération du profil', 500);
  }
});
