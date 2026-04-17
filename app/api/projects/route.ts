import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
import { z } from "zod";

const createSchema = z.object({
  title: z.string().optional(),
  rawIdea: z.string().min(1),
  targetUser: z.string().optional(),
  preferredPlatform: z.string().optional(),
  goal: z.string().optional(),
  skillLevel: z.string().optional(),
  preferredStack: z.string().optional(),
  brandTone: z.string().optional(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = createSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid input", details: parsed.error.issues },
        { status: 400 }
      );
    }

    const data = parsed.data;
    const title =
      data.title?.trim() ||
      data.rawIdea.split(" ").slice(0, 5).join(" ");

    const project = await prisma.project.create({
      data: {
        title,
        rawIdea: data.rawIdea,
        targetUser: data.targetUser,
        preferredPlatform: data.preferredPlatform,
        goal: data.goal,
        skillLevel: data.skillLevel,
        preferredStack: data.preferredStack,
        brandTone: data.brandTone,
      },
    });

    return NextResponse.json({ project }, { status: 201 });
  } catch (err) {
    console.error("[POST /api/projects]", err);
    return NextResponse.json({ error: "Failed to create project" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const projects = await prisma.project.findMany({
      orderBy: { updatedAt: "desc" },
      include: {
        sections: { select: { sectionType: true, status: true } },
      },
    });
    return NextResponse.json({ projects });
  } catch (err) {
    console.error("[GET /api/projects]", err);
    return NextResponse.json({ error: "Failed to fetch projects" }, { status: 500 });
  }
}
