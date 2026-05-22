import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const orgs = await prisma.organization.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        members: true,
        logs: {
          orderBy: { createdAt: "desc" },
          take: 20,
        },
      },
    })

    return NextResponse.json(orgs)
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to load organizations" },
      { status: 500 }
    )
  }
}