import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const {
      name,
      organizationType,
      email,
      phone,
      country,
      city,
      description,
    } = body

    const org = await prisma.organization.create({
      data: {
        name,
        email,
        phone,
        country,
        city,
        description,
        slug: name.toLowerCase().replace(/\s+/g, "-"),
        status: "PENDING",
      },
    })

    await prisma.activityLog.create({
      data: {
        action: "ORGANIZATION_CREATED",
        entity: "Organization",
        entityId: org.id,
        userId: "system",
        organizationId: org.id,
      },
    })

    return NextResponse.json({
      success: true,
      organization: org,
    })
  } catch (e) {
    console.error(e)

    return NextResponse.json(
      {
        success: false,
        error: {
          title: "Erreur serveur",
          message:
            "Impossible de créer l'organisation",
          code: "ORG_CREATE_FAILED",
        },
      },
      { status: 500 }
    )
  }
}