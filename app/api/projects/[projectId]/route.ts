import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ projectId: string }> }
) {
  try {
    const { projectId } = await params;
    const project = await prisma.project.findUnique({
      where: { id: projectId },
      include: { sections: { orderBy: { createdAt: "asc" } } },
    });

    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    return NextResponse.json({ project });
  } catch (err) {
    console.error("[GET /api/projects/:id]", err);
    return NextResponse.json({ error: "Failed to fetch project" }, { status: 500 });
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ projectId: string }> }
) {
  try {
    const { projectId } = await params;
    const body = await req.json();

    const project = await prisma.project.update({
      where: { id: projectId },
      data: {
        title: body.title,
        rawIdea: body.rawIdea,
        targetUser: body.targetUser,
        preferredPlatform: body.preferredPlatform,
        goal: body.goal,
        skillLevel: body.skillLevel,
        preferredStack: body.preferredStack,
        brandTone: body.brandTone,
      },
    });

    return NextResponse.json({ project });
  } catch (err) {
    console.error("[PATCH /api/projects/:id]", err);
    return NextResponse.json({ error: "Failed to update project" }, { status: 500 });
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ projectId: string }> }
) {
  try {
    const { projectId } = await params;
    await prisma.project.delete({ where: { id: projectId } });
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[DELETE /api/projects/:id]", err);
    return NextResponse.json({ error: "Failed to delete project" }, { status: 500 });
  }
}
