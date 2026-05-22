import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const orgs = await prisma.organization.findMany({
      include: {
        members: true,
        logs: true, // uniquement ce qui existe dans ton schema
      },
      orderBy: {
        createdAt: "desc",
      },
    })

    return NextResponse.json(orgs)
  } catch (e) {
    console.error(e)
    return NextResponse.json([], { status: 200 })
  }
}