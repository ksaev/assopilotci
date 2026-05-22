import { NextRequest, NextResponse } from 'next/server';
import type { ApiResponse, MemberResponse } from '@/lib/types';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
): Promise<NextResponse<ApiResponse<MemberResponse>>> {
  try {
    const { id } = params;

    // TODO: Connect to Prisma
    // const member = await prisma.member.findUnique({
    //   where: { id },
    // });
    // if (!member) {
    //   return NextResponse.json(
    //     { success: false, error: 'Membre non trouvé' },
    //     { status: 404 }
    //   );
    // }

    const mockMember: MemberResponse = {
      id,
      firstName: 'Jean',
      lastName: 'Dupont',
      email: 'jean@example.com',
      phone: '+225 00 00 00 00',
      status: 'ACTIVE',
      tier: 'GOLD',
      joinDate: new Date().toISOString(),
      organizationId: 'org_1',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    return NextResponse.json({
      success: true,
      data: mockMember,
    });
  } catch (error) {
    console.error('[API] Get member error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Erreur lors de la récupération du membre',
      },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
): Promise<NextResponse<ApiResponse<MemberResponse>>> {
  try {
    const { id } = params;
    const body = await request.json();
    const { firstName, lastName, email, phone, status, tier } = body;

    // TODO: Connect to Prisma
    // const member = await prisma.member.update({
    //   where: { id },
    //   data: {
    //     ...(firstName && { firstName }),
    //     ...(lastName && { lastName }),
    //     ...(email && { email }),
    //     ...(phone && { phone }),
    //     ...(status && { status }),
    //     ...(tier && { tier }),
    //   },
    // });

    const updatedMember: MemberResponse = {
      id,
      firstName: firstName || 'Jean',
      lastName: lastName || 'Dupont',
      email: email || 'jean@example.com',
      phone: phone || '+225 00 00 00 00',
      status: status || 'ACTIVE',
      tier: tier || 'GOLD',
      joinDate: new Date().toISOString(),
      organizationId: 'org_1',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    return NextResponse.json({
      success: true,
      message: 'Membre mis à jour avec succès',
      data: updatedMember,
    });
  } catch (error) {
    console.error('[API] Update member error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Erreur lors de la mise à jour du membre',
      },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
): Promise<NextResponse<ApiResponse<null>>> {
  try {
    const { id } = params;

    // TODO: Connect to Prisma
    // await prisma.member.delete({
    //   where: { id },
    // });

    return NextResponse.json({
      success: true,
      message: 'Membre supprimé avec succès',
    });
  } catch (error) {
    console.error('[API] Delete member error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Erreur lors de la suppression du membre',
      },
      { status: 500 }
    );
  }
}
