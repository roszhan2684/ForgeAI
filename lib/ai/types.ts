import { SectionType } from "@/types/project";

export type AIRole =
  | "strategist"
  | "ux"
  | "architect"
  | "copywriter"
  | "critic"
  | "refiner";

export type AIProviderName = "anthropic" | "openai" | "gemini" | "mock";

export type AITaskType =
  | "generate_overview"
  | "generate_personas"
  | "generate_scope"
  | "generate_flows"
  | "generate_wireframes"
  | "generate_stack"
  | "generate_launch"
  | "generate_landing_copy"
  | "generate_build_mode"
  | "critique_section"
  | "refine_section"
  | "summarize_project"
  | "export_claude_prompt";

export interface AIPipelineOptions {
  review?: boolean;
  refine?: boolean;
  providerPreference?: AIProviderName;
}

export interface AIGenerationMetadata {
  generatedByRole: AIRole;
  provider: AIProviderName;
  model: string;
  reviewedByRole?: AIRole;
  critiqueStatus?: "pending" | "passed" | "failed";
  refined?: boolean;
  pipelineVersion?: string;
  latencyMs?: number;
}

export interface AIGenerateInput {
  systemPrompt: string;
  userPrompt: string;
  responseFormat?: "json" | "text";
  temperature?: number;
  maxTokens?: number;
}

export interface AIProvider {
  name: AIProviderName;
  generate<T = unknown>(input: AIGenerateInput): Promise<T>;
}

export interface ProjectContext {
  id: string;
  title: string;
  rawIdea: string;
  targetUser?: string | null;
  preferredPlatform?: string | null;
  goal?: string | null;
  skillLevel?: string | null;
  preferredStack?: string | null;
  brandTone?: string | null;
  priorSections?: Record<string, unknown>;
}

export interface OrchestratorInput {
  task: AITaskType;
  projectContext: ProjectContext;
  sectionType?: SectionType;
  existingContent?: unknown;
  pipeline?: AIPipelineOptions;
}

export interface OrchestratorResult<T = unknown> {
  content: T;
  metadata: AIGenerationMetadata;
  rawOutput?: string;
}

// Maps section types to their primary AI task
export const SECTION_TASK_MAP: Record<SectionType, AITaskType> = {
  overview: "generate_overview",
  personas: "generate_personas",
  scope: "generate_scope",
  flows: "generate_flows",
  wireframes: "generate_wireframes",
  stack: "generate_stack",
  launch: "generate_launch",
  landingCopy: "generate_landing_copy",
  buildMode: "generate_build_mode",
};
