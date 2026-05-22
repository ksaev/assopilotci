import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET() {
  const orgs = await prisma.organization.findMany({
    include: {
      members: true,
      users: true,
      logs: true,
    },
    orderBy: { createdAt: "desc" },
  })

  return NextResponse.json(orgs)
}