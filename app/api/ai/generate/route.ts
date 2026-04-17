import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
import { generateSection } from "@/lib/ai/orchestrator";
import { SectionType } from "@/types/project";
import { z } from "zod";

const SECTION_TITLES: Record<SectionType, string> = {
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

const SECTION_SUMMARIES: Record<SectionType, string> = {
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

const requestSchema = z.object({
  projectId: z.string(),
  sectionType: z.enum([
    "overview", "personas", "scope", "flows", "wireframes",
    "stack", "launch", "landingCopy", "buildMode",
  ]),
  regenerate: z.boolean().optional().default(false),
  pipeline: z
    .object({
      review: z.boolean().optional(),
      refine: z.boolean().optional(),
      providerPreference: z.enum(["anthropic", "openai", "mock"]).optional(),
    })
    .optional(),
});

export async function POST(req: NextRequest) {
  const start = Date.now();

  try {
    const body = await req.json();
    const parsed = requestSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid input", details: parsed.error.issues },
        { status: 400 }
      );
    }

    const { projectId, sectionType, regenerate, pipeline } = parsed.data;

    // Fetch project
    const project = await prisma.project.findUnique({
      where: { id: projectId },
      include: {
        sections: { select: { sectionType: true, contentJson: true } },
      },
    });

    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    // Check if already generated and not a regenerate request
    const existing = await prisma.projectSection.findUnique({
      where: { projectId_sectionType: { projectId, sectionType } },
    });

    if (existing && existing.status === "generated" && !regenerate) {
      return NextResponse.json({
        section: serializeSection(existing),
        metadata: { cached: true },
      });
    }

    // Mark as generating
    await prisma.projectSection.upsert({
      where: { projectId_sectionType: { projectId, sectionType } },
      create: {
        projectId,
        sectionType,
        title: SECTION_TITLES[sectionType],
        summary: SECTION_SUMMARIES[sectionType],
        contentJson: {},
        status: "generating",
        version: 1,
      },
      update: { status: "generating" },
    });

    // Build prior sections context
    const priorSections: Record<string, unknown> = {};
    for (const s of project.sections) {
      if (s.sectionType !== sectionType && s.contentJson) {
        priorSections[s.sectionType] = s.contentJson;
      }
    }

    // Run orchestrator
    const result = await generateSection(sectionType, {
      id: project.id,
      title: project.title,
      rawIdea: project.rawIdea,
      targetUser: project.targetUser,
      preferredPlatform: project.preferredPlatform,
      goal: project.goal,
      skillLevel: project.skillLevel,
      preferredStack: project.preferredStack,
      brandTone: project.brandTone,
      priorSections,
    }, pipeline);

    // Persist to DB
    const latencyMs = Date.now() - start;
    const section = await prisma.projectSection.upsert({
      where: { projectId_sectionType: { projectId, sectionType } },
      create: {
        projectId,
        sectionType,
        title: SECTION_TITLES[sectionType],
        summary: SECTION_SUMMARIES[sectionType],
        contentJson: result.content as object,
        status: "generated",
        version: 1,
        lastGeneratedAt: new Date(),
        generatedByRole: result.metadata.generatedByRole,
        provider: result.metadata.provider,
        model: result.metadata.model,
        refined: result.metadata.refined ?? false,
        pipelineVersion: result.metadata.pipelineVersion,
      },
      update: {
        contentJson: result.content as object,
        status: "generated",
        version: { increment: existing ? 1 : 0 },
        lastGeneratedAt: new Date(),
        generatedByRole: result.metadata.generatedByRole,
        provider: result.metadata.provider,
        model: result.metadata.model,
        refined: result.metadata.refined ?? false,
        pipelineVersion: result.metadata.pipelineVersion,
      },
    });

    // Log AI job
    await prisma.aIJob.create({
      data: {
        projectId,
        sectionType,
        jobType: `generate_${sectionType}`,
        status: "completed",
        provider: result.metadata.provider,
        model: result.metadata.model,
        role: result.metadata.generatedByRole,
        latencyMs,
        success: true,
        validated: true,
        pipelineVersion: result.metadata.pipelineVersion,
        pipelineStep: "generate",
      },
    });

    return NextResponse.json({
      section: serializeSection(section),
      metadata: result.metadata,
    });
  } catch (err) {
    console.error("[POST /api/ai/generate]", err);
    const message = err instanceof Error ? err.message : "Generation failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

function serializeSection(s: {
  id: string;
  projectId: string;
  sectionType: string;
  title: string;
  summary: string;
  contentJson: unknown;
  status: string;
  version: number;
  edited: boolean;
  lastGeneratedAt: Date | null;
  generatedByRole: string | null;
  provider: string | null;
  model: string | null;
  refined: boolean;
}) {
  return {
    id: s.id,
    projectId: s.projectId,
    sectionType: s.sectionType,
    title: s.title,
    summary: s.summary,
    content: s.contentJson,
    status: s.status,
    version: s.version,
    edited: s.edited,
    lastGeneratedAt: s.lastGeneratedAt?.toISOString() ?? null,
    metadata: {
      generatedByRole: s.generatedByRole,
      provider: s.provider,
      model: s.model,
      refined: s.refined,
    },
  };
}
