import { prisma } from "@/lib/prisma"
import { NextRequest, NextResponse } from "next/server"
import { getCurrentUser } from "@/lib/auth"
import { verifyOrganizationAccess } from "@/lib/organization"

export const runtime = "nodejs"

export async function GET(
  request: NextRequest,
  context: { params: { organizationSlug: string } }
) {
  try {
    const user = getCurrentUser(request)

    if (!user?.userId) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const organization = await verifyOrganizationAccess({
      userId: user.userId,
      organizationSlug: context.params.organizationSlug,
    })

    if (!organization) {
      return NextResponse.json(
        { error: "Organization not found or access denied" },
        { status: 403 }
      )
    }

    const settings = await prisma.organizationSettings.findUnique({
      where: {
        organizationId: organization.id,
      },
    })

    return NextResponse.json(settings ?? {})
  } catch (error) {
    console.error("GET_SETTINGS_ERROR:", error)

    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    )
  }
}