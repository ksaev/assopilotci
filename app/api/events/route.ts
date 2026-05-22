import { NextRequest, NextResponse } from 'next/server';
import type { ApiResponse, EventResponse, PaginatedResponse } from '@/lib/types';

// GET - List events
export async function GET(request: NextRequest): Promise<NextResponse<PaginatedResponse<EventResponse>>> {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const status = searchParams.get('status');
    const sortBy = searchParams.get('sortBy') || 'startDate';

    // TODO: Connect to Prisma with filters
    // const where: Prisma.EventWhereInput = {
    //   organizationId: getUserOrganizationId(request),
    //   ...(status && { status }),
    // };

    // const [events, total] = await Promise.all([
    //   prisma.event.findMany({
    //     where,
    //     skip: (page - 1) * limit,
    //     take: limit,
    //     orderBy: { [sortBy]: 'desc' },
    //   }),
    //   prisma.event.count({ where }),
    // ]);

    const mockEvents: EventResponse[] = [
      {
        id: '1',
        title: 'Assemblée générale',
        description: 'Réunion mensuelle',
        startDate: new Date().toISOString(),
        endDate: new Date(Date.now() + 3600000).toISOString(),
        location: 'Abidjan',
        maxParticipants: 100,
        status: 'SCHEDULED',
        organizationId: 'org_1',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ];

    return NextResponse.json({
      success: true,
      data: mockEvents,
      pagination: {
        total: mockEvents.length,
        page,
        limit,
        pages: Math.ceil(mockEvents.length / limit),
      },
    });
  } catch (error) {
    console.error('[API] Get events error:', error);
    return NextResponse.json(
      {
        success: false,
        data: [],
        pagination: { total: 0, page: 1, limit: 10, pages: 0 },
        error: 'Erreur lors de la récupération des événements',
      },
      { status: 500 }
    );
  }
}

// POST - Create event
export async function POST(request: NextRequest): Promise<NextResponse<ApiResponse<EventResponse>>> {
  try {
    const body = await request.json();
    const { title, description, startDate, endDate, location, maxParticipants, status } = body;

    if (!title || !startDate || !endDate) {
      return NextResponse.json(
        {
          success: false,
          error: 'Titre, date de début et date de fin sont requis',
        },
        { status: 400 }
      );
    }

    // TODO: Connect to Prisma
    // const event = await prisma.event.create({
    //   data: {
    //     title,
    //     description: description || null,
    //     startDate: new Date(startDate),
    //     endDate: new Date(endDate),
    //     location: location || null,
    //     maxParticipants: maxParticipants || null,
    //     status: status || 'SCHEDULED',
    //     organizationId: getUserOrganizationId(request),
    //   },
    // });

    const newEvent: EventResponse = {
      id: 'event_id_placeholder',
      title,
      description,
      startDate,
      endDate,
      location,
      maxParticipants,
      status: status || 'SCHEDULED',
      organizationId: 'org_1',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    return NextResponse.json(
      {
        success: true,
        message: 'Événement créé avec succès',
        data: newEvent,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('[API] Create event error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Erreur lors de la création de l\'événement',
      },
      { status: 500 }
    );
  }
}
