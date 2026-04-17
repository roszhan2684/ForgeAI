import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
import { generateSection } from "@/lib/ai/orchestrator";
import { SectionType } from "@/types/project";

const ALL_SECTIONS: SectionType[] = [
  "overview", "personas", "scope", "flows", "wireframes",
  "stack", "launch", "landingCopy", "buildMode",
];

const TITLES: Record<SectionType, string> = {
  overview: "Overview",
  personas: "User Personas",
  scope: "Feature Scope",
  flows: "User Flows",
  wireframes: "Screen Wireframes",
  stack: "Tech Stack",
  launch: "Launch Plan",
  landingCopy: "Landing Page Copy",
  buildMode: "Build Mode",
};

const SUMMARIES: Record<SectionType, string> = {
  overview: "High-level product definition and strategic framing.",
  personas: "Representative users and their core needs.",
  scope: "Prioritized product scope from core MVP to future roadmap.",
  flows: "Key paths through the product experience.",
  wireframes: "Screen-by-screen UI and UX guidance.",
  stack: "Recommended implementation stack and tradeoffs.",
  launch: "Validation, beta acquisition, and go-to-market strategy.",
  landingCopy: "Market-ready copy for the product website.",
  buildMode: "Implementation-ready artifacts for engineering execution.",
};

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ projectId: string }> }
) {
  try {
    const { projectId } = await params;
    const body = await req.json().catch(() => ({}));
    const sections: SectionType[] = body.sections ?? ALL_SECTIONS;

    const project = await prisma.project.findUnique({
      where: { id: projectId },
    });

    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    const projectContext = {
      id: project.id,
      title: project.title,
      rawIdea: project.rawIdea,
      targetUser: project.targetUser,
      preferredPlatform: project.preferredPlatform,
      goal: project.goal,
      skillLevel: project.skillLevel,
      preferredStack: project.preferredStack,
      brandTone: project.brandTone,
    };

    const results: string[] = [];
    const errors: Array<{ section: string; error: string }> = [];

    // Generate sequentially so later sections can use prior context
    const priorSections: Record<string, unknown> = {};
    for (const sectionType of sections) {
      try {
        const result = await generateSection(sectionType, {
          ...projectContext,
          priorSections,
        });

        await prisma.projectSection.upsert({
          where: { projectId_sectionType: { projectId, sectionType } },
          create: {
            projectId,
            sectionType,
            title: TITLES[sectionType],
            summary: SUMMARIES[sectionType],
            contentJson: result.content as object,
            status: "generated",
            version: 1,
            lastGeneratedAt: new Date(),
            generatedByRole: result.metadata.generatedByRole,
            provider: result.metadata.provider,
            model: result.metadata.model,
          },
          update: {
            contentJson: result.content as object,
            status: "generated",
            lastGeneratedAt: new Date(),
            generatedByRole: result.metadata.generatedByRole,
            provider: result.metadata.provider,
            model: result.metadata.model,
          },
        });

        priorSections[sectionType] = result.content;
        results.push(sectionType);
      } catch (err) {
        const msg = err instanceof Error ? err.message : String(err);
        errors.push({ section: sectionType, error: msg });
        console.error(`[generate-all] Failed ${sectionType}:`, msg);
      }
    }

    return NextResponse.json({
      success: true,
      generatedSections: results,
      errors: errors.length ? errors : undefined,
    });
  } catch (err) {
    console.error("[POST /api/projects/:id/generate]", err);
    return NextResponse.json({ error: "Generation failed" }, { status: 500 });
  }
}
