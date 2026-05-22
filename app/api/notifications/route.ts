import { NextRequest, NextResponse } from 'next/server';
import type { ApiResponse, NotificationResponse, PaginatedResponse } from '@/lib/types';

// GET - List notifications
export async function GET(request: NextRequest): Promise<NextResponse<PaginatedResponse<NotificationResponse>>> {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const unreadOnly = searchParams.get('unreadOnly') === 'true';
    const type = searchParams.get('type');

    // TODO: Connect to Prisma with filters
    // const where: Prisma.NotificationWhereInput = {
    //   memberId: getCurrentMemberId(request),
    //   ...(unreadOnly && { isRead: false }),
    //   ...(type && { type }),
    // };

    // const [notifications, total] = await Promise.all([
    //   prisma.notification.findMany({
    //     where,
    //     skip: (page - 1) * limit,
    //     take: limit,
    //     orderBy: { createdAt: 'desc' },
    //   }),
    //   prisma.notification.count({ where }),
    // ]);

    const mockNotifications: NotificationResponse[] = [
      {
        id: '1',
        title: 'Rappel de paiement',
        message: 'Votre cotisation mensuelle est due',
        type: 'PAYMENT_REMINDER',
        isRead: false,
        memberId: 'member_1',
        organizationId: 'org_1',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ];

    return NextResponse.json({
      success: true,
      data: mockNotifications,
      pagination: {
        total: mockNotifications.length,
        page,
        limit,
        pages: Math.ceil(mockNotifications.length / limit),
      },
    });
  } catch (error) {
    console.error('[API] Get notifications error:', error);
    return NextResponse.json(
      {
        success: false,
        data: [],
        pagination: { total: 0, page: 1, limit: 20, pages: 0 },
        error: 'Erreur lors de la récupération des notifications',
      },
      { status: 500 }
    );
  }
}

// POST - Create notification
export async function POST(request: NextRequest): Promise<NextResponse<ApiResponse<NotificationResponse>>> {
  try {
    const body = await request.json();
    const { title, message, type, memberId } = body;

    if (!title || !message || !type) {
      return NextResponse.json(
        {
          success: false,
          error: 'Titre, message et type sont requis',
        },
        { status: 400 }
      );
    }

    // TODO: Connect to Prisma
    // const notification = await prisma.notification.create({
    //   data: {
    //     title,
    //     message,
    //     type,
    //     memberId,
    //     organizationId: getUserOrganizationId(request),
    //     isRead: false,
    //   },
    // });

    // TODO: Send notification through channels (email, SMS, push)
    // if (notification.type === 'PAYMENT_REMINDER') {
    //   await sendEmailNotification(memberId, title, message);
    // }

    const newNotification: NotificationResponse = {
      id: 'notification_id_placeholder',
      title,
      message,
      type,
      isRead: false,
      memberId: memberId || 'member_placeholder',
      organizationId: 'org_1',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    return NextResponse.json(
      {
        success: true,
        message: 'Notification créée avec succès',
        data: newNotification,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('[API] Create notification error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Erreur lors de la création de la notification',
      },
      { status: 500 }
    );
  }
}
