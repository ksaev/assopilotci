import { prisma } from "@/lib/prisma"
import { NextRequest, NextResponse } from "next/server"

type Params = {
  params: Promise<{
    organizationSlug: string
  }>
}

export async function GET(
  req: NextRequest,
  { params }: Params
) {
  try {
    const { organizationSlug } = await params

    const organization =
      await prisma.organization.findUnique({
        where: {
          slug: organizationSlug,
        },
        include: {
          settings: true,
        },
      })

    if (!organization) {
      return NextResponse.json(
        {
          error: "Organisation introuvable",
        },
        {
          status: 404,
        }
      )
    }

    return NextResponse.json({
      associationName: organization.name,
      email: organization.email,
      phone: organization.phone || "",
      description:
        organization.description || "",
      logo: organization.logo || "",

      currency:
        organization.settings?.currency ||
        "XOF",

      language:
        organization.settings?.language ||
        "fr",

      emailNotifications:
        organization.settings
          ?.emailNotifications ?? true,

      smsNotifications:
        organization.settings
          ?.smsNotifications ?? false,
    })
  } catch (error) {
    console.error(error)

    return NextResponse.json(
      {
        error: "Erreur serveur",
      },
      {
        status: 500,
      }
    )
  }
}

export async function PUT(
  req: NextRequest,
  { params }: Params
) {
  try {
    const { organizationSlug } = await params

    const body = await req.json()

    const organization =
      await prisma.organization.findUnique({
        where: {
          slug: organizationSlug,
        },
      })

    if (!organization) {
      return NextResponse.json(
        {
          error: "Organisation introuvable",
        },
        {
          status: 404,
        }
      )
    }

    await prisma.organization.update({
      where: {
        id: organization.id,
      },
      data: {
        name: body.associationName,
        email: body.email,
        phone: body.phone,
        description: body.description,
        logo: body.logo,
      },
    })

    await prisma.organizationSettings.upsert({
      where: {
        organizationId:
          organization.id,
      },

      update: {
        currency: body.currency,
        language: body.language,

        emailNotifications:
          body.emailNotifications,

        smsNotifications:
          body.smsNotifications,
      },

      create: {
        organizationId:
          organization.id,

        currency:
          body.currency || "XOF",

        language:
          body.language || "fr",

        emailNotifications:
          body.emailNotifications,

        smsNotifications:
          body.smsNotifications,
      },
    })

    return NextResponse.json({
      success: true,
    })
  } catch (error) {
    console.error(error)

    return NextResponse.json(
      {
        error: "Erreur serveur",
      },
      {
        status: 500,
      }
    )
  }
}