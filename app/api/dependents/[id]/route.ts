import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getCurrentUser } from "@/lib/auth"

export const runtime = "nodejs"

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = getCurrentUser(req)

    if (!user?.userId) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const dependent = await prisma.dependent.findUnique({
      where: { id: params.id },
      include: {
        member: true,
      },
    })

    if (!dependent) {
      return NextResponse.json(
        { error: "Dependent not found" },
        { status: 404 }
      )
    }

    const access = await prisma.organizationMember.findFirst({
      where: {
        userId: user.userId,
        organizationId: dependent.member.organizationId,
      },
    })

    if (!access) {
      return NextResponse.json(
        { error: "Forbidden" },
        { status: 403 }
      )
    }

    await prisma.dependent.delete({
      where: { id: params.id },
    })

    await prisma.activityLog.create({
      data: {
        action: "DEPENDENT_DELETED",
        entity: "Dependent",
        entityId: params.id,
        userId: user.userId,
        organizationId: dependent.member.organizationId,
      },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("DEPENDENT_DELETE_ERROR:", error)

    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    )
  }
}