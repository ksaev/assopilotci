import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"
import { OrganizationStatus } from "@prisma/client"

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params

  const { status } = await req.json()

  if (!id || !status) {
    return NextResponse.json(
      { error: "Missing data" },
      { status: 400 }
    )
  }

  const allowed: OrganizationStatus[] = [
    "ACTIVE",
    "SUSPENDED",
    "ARCHIVED",
    "PENDING",
  ]

  if (!allowed.includes(status)) {
    return NextResponse.json(
      { error: "Invalid status" },
      { status: 400 }
    )
  }

  const org = await prisma.organization.update({
    where: { id },
    data: { status },
  })

  return NextResponse.json(org)
}