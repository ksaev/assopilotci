import { NextRequest, NextResponse } from 'next/server';
import type { ApiResponse, MemberResponse, PaginatedResponse } from '@/lib/types';

// GET - List all members
export async function GET(request: NextRequest): Promise<NextResponse<PaginatedResponse<MemberResponse>>> {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const status = searchParams.get('status');
    const tier = searchParams.get('tier');
    const search = searchParams.get('search');

    // TODO: Connect to Prisma and retrieve members with filters
    // const where: Prisma.MemberWhereInput = {
    //   organizationId: getUserOrganizationId(request),
    //   ...(status && { status }),
    //   ...(tier && { tier }),
    //   ...(search && {
    //     OR: [
    //       { firstName: { contains: search, mode: 'insensitive' } },
    //       { lastName: { contains: search, mode: 'insensitive' } },
    //       { email: { contains: search, mode: 'insensitive' } },
    //     ],
    //   }),
    // };

    // const [members, total] = await Promise.all([
    //   prisma.member.findMany({
    //     where,
    //     skip: (page - 1) * limit,
    //     take: limit,
    //     orderBy: { createdAt: 'desc' },
    //   }),
    //   prisma.member.count({ where }),
    // ]);

    const mockMembers: MemberResponse[] = [
      {
        id: '1',
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
      },
    ];

    return NextResponse.json({
      success: true,
      data: mockMembers,
      pagination: {
        total: mockMembers.length,
        page,
        limit,
        pages: Math.ceil(mockMembers.length / limit),
      },
    });
  } catch (error) {
    console.error('[API] Get members error:', error);
    return NextResponse.json(
      {
        success: false,
        data: [],
        pagination: { total: 0, page: 1, limit: 10, pages: 0 },
        error: 'Erreur lors de la récupération des membres',
      },
      { status: 500 }
    );
  }
}

// POST - Create new member
export async function POST(request: NextRequest): Promise<NextResponse<ApiResponse<MemberResponse>>> {
  try {
    const body = await request.json();
    const { firstName, lastName, email, phone, dateOfBirth, idNumber, status, tier } = body;

    // Validation
    if (!firstName || !lastName || !email) {
      return NextResponse.json(
        {
          success: false,
          error: 'Prénom, nom et email sont requis',
        },
        { status: 400 }
      );
    }

    // TODO: Connect to Prisma
    // const member = await prisma.member.create({
    //   data: {
    //     firstName,
    //     lastName,
    //     email,
    //     phone: phone || null,
    //     dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : null,
    //     idNumber: idNumber || null,
    //     status: status || 'ACTIVE',
    //     tier: tier || 'BRONZE',
    //     organizationId: getUserOrganizationId(request),
    //   },
    // });

    const newMember: MemberResponse = {
      id: 'member_id_placeholder',
      firstName,
      lastName,
      email,
      phone,
      status: status || 'ACTIVE',
      tier: tier || 'BRONZE',
      joinDate: new Date().toISOString(),
      organizationId: 'org_1',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    return NextResponse.json(
      {
        success: true,
        message: 'Membre créé avec succès',
        data: newMember,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('[API] Create member error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Erreur lors de la création du membre',
      },
      { status: 500 }
    );
  }
}
