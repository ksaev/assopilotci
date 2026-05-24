// app/api/dependents/[id]/route.ts

import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getCurrentUser } from "@/lib/auth"

type Params = {
  params: Promise<{
    id: string
  }>
}

export async function DELETE(
  req: NextRequest,
  { params }: Params
) {
  try {

    const user = getCurrentUser(req)

    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const { id } = await params

    const dependent = await prisma.dependent.findUnique({
      where: {
        id
      },
      include: {
        member: true
      }
    })

    if (!dependent) {
      return NextResponse.json(
        { error: "Dependent not found" },
        { status: 404 }
      )
    }

    /* SECURITY */

    const access = await prisma.organizationMember.findFirst({
      where: {
        userId: user.userId,
        organizationId: dependent.member.organizationId
      }
    })

    if (!access) {
      return NextResponse.json(
        { error: "Forbidden" },
        { status: 403 }
      )
    }

    await prisma.dependent.delete({
      where: {
        id
      }
    })

    /* LOG */

    await prisma.activityLog.create({
      data: {
        action: "DEPENDENT_DELETED",
        entity: "Dependent",
        entityId: id,

        userId: user.userId,

        organizationId:
          dependent.member.organizationId
      }
    })

    return NextResponse.json({
      success: true
    })

  } catch (error) {

    console.error(error)

    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    )
  }
}