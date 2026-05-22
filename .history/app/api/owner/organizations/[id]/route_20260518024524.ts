import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"
import { OrganizationStatus } from "@prisma/client"

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params
    const { action } = await req.json()

    if (!id) {
      return NextResponse.json(
        { error: "ID manquant" },
        { status: 400 }
      )
    }

    let status: OrganizationStatus | null = null

    switch (action) {
      case "activate":
      case "approve":
        status = OrganizationStatus.ACTIVE
        break

      case "suspend":
        status = OrganizationStatus.SUSPENDED
        break

      case "archive":
        status = OrganizationStatus.ARCHIVED
        break

      case "restore":
        status = OrganizationStatus.ACTIVE
        break

      case "reject":
        status = OrganizationStatus.SUSPENDED
        break

      default:
        return NextResponse.json(
          { error: "Action invalide" },
          { status: 400 }
        )
    }

    const org = await prisma.organization.update({
      where: { id },
      data: { status },
    })

    return NextResponse.json(org)
  } catch (err) {
    return NextResponse.json(
      { error: "Erreur serveur" },
      { status: 500 }
    )
  }
}