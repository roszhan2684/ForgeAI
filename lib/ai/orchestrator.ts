import { SectionType } from "@/types/project";
import {
  AITaskType,
  OrchestratorInput,
  OrchestratorResult,
  AIGenerationMetadata,
  SECTION_TASK_MAP,
} from "./types";
import { resolveProvider } from "./providers";
import { mockProvider } from "./providers/mock";
import { buildPrompt } from "./prompts";
import { routeTask, ROLE_LABELS } from "./router";
import { validateSection } from "./validators";
import { ANTHROPIC_MODEL } from "./providers/anthropic";
import { GEMINI_MODEL } from "./providers/gemini";

const MAX_RETRIES = 2;

function isQuotaError(err: unknown): boolean {
  const msg = err instanceof Error ? err.message : String(err);
  return msg.includes("429") || msg.includes("quota") || msg.includes("Too Many Requests") || msg.includes("credit balance");
}

export async function orchestrate<T = unknown>(
  input: OrchestratorInput
): Promise<OrchestratorResult<T>> {
  const start = Date.now();
  const { task, projectContext, sectionType, pipeline } = input;

  // Determine routing
  const route = routeTask(task);
  const provider = resolveProvider(
    pipeline?.providerPreference ?? route.preferredProvider
  );

  // Build prompts
  const { systemPrompt, userPrompt } = buildPrompt(task, projectContext);

  // Execute with retry on validation failure, fallback to mock on quota errors
  let lastError: Error | null = null;
  let rawOutput = "";
  const providers = [provider, mockProvider];

  for (const activeProvider of providers) {
    for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
      try {
        const result = await activeProvider.generate<unknown>({
          systemPrompt,
          userPrompt:
            attempt > 0
              ? `${userPrompt}\n\nIMPORTANT: Your previous response failed JSON validation. Return ONLY valid JSON, no markdown, no extra text.`
              : userPrompt,
          responseFormat: "json",
          temperature: route.temperature,
          maxTokens: route.maxTokens,
        });

        rawOutput = typeof result === "string" ? result : JSON.stringify(result);

        if (sectionType) {
          const validation = validateSection<T>(sectionType, result);
          if (!validation.success) {
            if (attempt < MAX_RETRIES) {
              lastError = new Error(`Validation failed: ${validation.errors.join(", ")}`);
              continue;
            }
            console.warn(`[FORGE Orchestrator] Section ${sectionType} validation failed:`, validation.errors);
            return {
              content: result as T,
              metadata: buildMetadata(activeProvider.name, route, start, false),
              rawOutput,
            };
          }
          return {
            content: validation.data as T,
            metadata: buildMetadata(activeProvider.name, route, start, true),
            rawOutput,
          };
        }

        return {
          content: result as T,
          metadata: buildMetadata(activeProvider.name, route, start, true),
          rawOutput,
        };
      } catch (err) {
        lastError = err instanceof Error ? err : new Error(String(err));
        if (isQuotaError(err)) break; // Skip retries, move to next provider
        if (attempt < MAX_RETRIES) continue;
      }
    }
  }

  throw lastError ?? new Error("Orchestration failed after retries");
}

/** Convenience: generate a single section */
export async function generateSection<T>(
  sectionType: SectionType,
  projectContext: OrchestratorInput["projectContext"],
  pipeline?: OrchestratorInput["pipeline"]
): Promise<OrchestratorResult<T>> {
  const task = SECTION_TASK_MAP[sectionType];
  return orchestrate<T>({ task, projectContext, sectionType, pipeline });
}

function buildMetadata(
  providerName: string,
  route: ReturnType<typeof routeTask>,
  startMs: number,
  validated: boolean
): AIGenerationMetadata {
  return {
    generatedByRole: route.role,
    provider: providerName as AIGenerationMetadata["provider"],
    model: providerName === "anthropic" ? ANTHROPIC_MODEL : providerName === "gemini" ? GEMINI_MODEL : providerName,
    refined: false,
    pipelineVersion: "v1",
    latencyMs: Date.now() - startMs,
  };
}
