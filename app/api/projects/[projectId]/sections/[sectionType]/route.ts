import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ projectId: string; sectionType: string }> }
) {
  try {
    const { projectId, sectionType } = await params;
    const body = await req.json();

    if (!body.content) {
      return NextResponse.json({ error: "content is required" }, { status: 400 });
    }

    const section = await prisma.projectSection.upsert({
      where: { projectId_sectionType: { projectId, sectionType } },
      create: {
        projectId,
        sectionType,
        title: sectionType,
        summary: "",
        contentJson: body.content,
        status: "edited",
        version: 1,
        edited: true,
      },
      update: {
        contentJson: body.content,
        status: "edited",
        edited: true,
      },
    });

    return NextResponse.json({
      success: true,
      section: {
        id: section.id,
        sectionType: section.sectionType,
        content: section.contentJson,
        status: section.status,
        edited: section.edited,
        version: section.version,
      },
    });
  } catch (err) {
    console.error("[PATCH /api/projects/:id/sections/:type]", err);
    return NextResponse.json({ error: "Failed to update section" }, { status: 500 });
  }
}
