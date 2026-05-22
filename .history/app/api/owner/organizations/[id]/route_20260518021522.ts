import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"
import { OrganizationStatus } from "@prisma/client"


export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params; // ✅ IMPORTANT

  const { action } = await req.json();

  if (!id) {
    return Response.json(
      { error: "ID manquant" },
      { status: 400 }
    );
  }

  const status =
    action === "approve" ? "ACTIVE" : action === "reject" ? "SUSPENDED" : "ARCHIVED";

  const org = await prisma.organization.update({
    where: {
      id, // ✅ PLUS JAMAIS undefined
    },
    data: {
      status,
    },
  });

  return Response.json(org);
}