import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { action } = await req.json()

  const status =
    action === "approve"
      ? "ACTIVE"
      : "SUSPENDED"

  const org = await prisma.organization.update({
    where: { id: params.id },
    data: { status },
  })

  return NextResponse.json({
    success: true,
    organization: org,
  })
}