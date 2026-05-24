import { prisma } from "@/lib/prisma"
import { NextRequest, NextResponse } from "next/server"
import { getCurrentUser } from "@/lib/auth"
import { verifyOrganizationAccess } from "@/lib/organization"

export async function GET(
  request: NextRequest,
  { params }: { params: { organizationSlug: string } }
) {
  try {
    // ✅ PASSER request
    const user = getCurrentUser(request)

    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const organization = await verifyOrganizationAccess({
      userId: user.userId,
      organizationSlug: params.organizationSlug,
    })

    const settings =
      await prisma.organizationSettings.findUnique({
        where: {
          organizationId: organization.id,
        },
      })

    return NextResponse.json(settings)
  } catch (error) {
    console.error(error)

    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    )
  }
}