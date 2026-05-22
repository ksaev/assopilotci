import { NextRequest, NextResponse } from 'next/server';
import type { ApiResponse, TransactionResponse, PaginatedResponse } from '@/lib/types';

// GET - List transactions
export async function GET(request: NextRequest): Promise<NextResponse<PaginatedResponse<TransactionResponse>>> {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const type = searchParams.get('type');
    const status = searchParams.get('status');
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');

    // TODO: Connect to Prisma with filters
    // const where: Prisma.TransactionWhereInput = {
    //   organizationId: getUserOrganizationId(request),
    //   ...(type && { type }),
    //   ...(status && { status }),
    //   ...(startDate && { createdAt: { gte: new Date(startDate) } }),
    //   ...(endDate && { createdAt: { lte: new Date(endDate) } }),
    // };

    // const [transactions, total] = await Promise.all([
    //   prisma.transaction.findMany({
    //     where,
    //     skip: (page - 1) * limit,
    //     take: limit,
    //     orderBy: { createdAt: 'desc' },
    //   }),
    //   prisma.transaction.count({ where }),
    // ]);

    const mockTransactions: TransactionResponse[] = [
      {
        id: '1',
        description: 'Cotisation mensuelle',
        amount: 50000,
        type: 'INCOME',
        status: 'COMPLETED',
        organizationId: 'org_1',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ];

    return NextResponse.json({
      success: true,
      data: mockTransactions,
      pagination: {
        total: mockTransactions.length,
        page,
        limit,
        pages: Math.ceil(mockTransactions.length / limit),
      },
    });
  } catch (error) {
    console.error('[API] Get transactions error:', error);
    return NextResponse.json(
      {
        success: false,
        data: [],
        pagination: { total: 0, page: 1, limit: 20, pages: 0 },
        error: 'Erreur lors de la récupération des transactions',
      },
      { status: 500 }
    );
  }
}

// POST - Create transaction
export async function POST(request: NextRequest): Promise<NextResponse<ApiResponse<TransactionResponse>>> {
  try {
    const body = await request.json();
    const { description, amount, type, status } = body;

    if (!description || !amount || !type) {
      return NextResponse.json(
        {
          success: false,
          error: 'Description, montant et type sont requis',
        },
        { status: 400 }
      );
    }

    // TODO: Connect to Prisma
    // const transaction = await prisma.transaction.create({
    //   data: {
    //     description,
    //     amount,
    //     type,
    //     status: status || 'COMPLETED',
    //     organizationId: getUserOrganizationId(request),
    //   },
    // });

    const newTransaction: TransactionResponse = {
      id: 'transaction_id_placeholder',
      description,
      amount,
      type,
      status: status || 'COMPLETED',
      organizationId: 'org_1',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    return NextResponse.json(
      {
        success: true,
        message: 'Transaction créée avec succès',
        data: newTransaction,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('[API] Create transaction error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Erreur lors de la création de la transaction',
      },
      { status: 500 }
    );
  }
}
