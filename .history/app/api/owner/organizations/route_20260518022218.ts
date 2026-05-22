import { prisma } from "@/lib/prisma"

export async function GET() {
  const orgs = await prisma.organization.findMany({
    include: {
      members: true,
      logs: {
        orderBy: { createdAt: "desc" },
        take: 10,
      },
    },
  })

  return Response.json(orgs)
}