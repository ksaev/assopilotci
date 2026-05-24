// app/api/dependents/route.ts

import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getCurrentUser } from "@/lib/auth"

/* =========================================================
   GET DEPENDENTS
========================================================= */

export async function GET(req: NextRequest) {
  try {
    const user = getCurrentUser(req)

    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const member = await prisma.member.findFirst({
      where: {
        organization: {
          members: {
            some: {
              userId: user.userId
            }
          }
        }
      },
      include: {
        dependents: true
      }
    })

    if (!member) {
      return NextResponse.json(
        { error: "Member not found" },
        { status: 404 }
      )
    }

    return NextResponse.json(member.dependents)

  } catch (error) {

    console.error(error)

    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    )
  }
}

/* =========================================================
   CREATE DEPENDENT
========================================================= */

export async function POST(req: NextRequest) {
  try {

    const user = getCurrentUser(req)

    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const body = await req.json()

    const {
      firstName,
      lastName,
      birthDate
    } = body

    if (!firstName || !lastName || !birthDate) {
      return NextResponse.json(
        { error: "Missing fields" },
        { status: 400 }
      )
    }

    /* MEMBER */

    const member = await prisma.member.findFirst({
      where: {
        organization: {
          members: {
            some: {
              userId: user.userId
            }
          }
        }
      },
      include: {
        dependents: true
      }
    })

    if (!member) {
      return NextResponse.json(
        { error: "Member not found" },
        { status: 404 }
      )
    }

    /* LIMIT */

    if (member.dependents.length >= 5) {
      return NextResponse.json(
        { error: "Maximum dependents reached" },
        { status: 400 }
      )
    }

    /* CREATE */

    const dependent = await prisma.dependent.create({
      data: {
        firstName,
        lastName,
        birthDate: new Date(birthDate),

        status: "PENDING",

        memberId: member.id
      }
    })

    /* LOG */

    await prisma.activityLog.create({
      data: {
        action: "DEPENDENT_CREATED",
        entity: "Dependent",
        entityId: dependent.id,

        userId: user.userId,

        organizationId: member.organizationId
      }
    })

    return NextResponse.json(
      dependent,
      { status: 201 }
    )

  } catch (error) {

    console.error(error)

    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    )
  }
}