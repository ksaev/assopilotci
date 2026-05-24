import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"
import { getCurrentUser } from "@/lib/auth"
import { verifyOrganizationAccess } from "@/lib/organization"


export async function GET(
  request: Request,
  { params }: { params: { organizationSlug: string } }
) {
  try {
    const user = await getCurrentUser(request)

    const organization = await verifyOrganizationAccess({
      userId: user.id,
      organizationSlug: params.organizationSlug,
    })

    const settings = await prisma.organizationSettings.findUnique({
      where: {
        organizationId: organization.id,
      },
    })

    return NextResponse.json(settings)
  } catch (error) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    )
  }
}