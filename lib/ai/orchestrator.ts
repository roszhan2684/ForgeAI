import { SectionType } from "@/types/project";
import {
  AITaskType,
  OrchestratorInput,
  OrchestratorResult,
  AIGenerationMetadata,
  SECTION_TASK_MAP,
} from "./types";
import { resolveProvider } from "./providers";
import { buildPrompt } from "./prompts";
import { routeTask, ROLE_LABELS } from "./router";
import { validateSection } from "./validators";
import { ANTHROPIC_MODEL } from "./providers/anthropic";

const MAX_RETRIES = 2;

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

  // Execute with retry on validation failure
  let lastError: Error | null = null;
  let rawOutput = "";

  for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
    try {
      const result = await provider.generate<unknown>({
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

      // Validate if we have a section type
      if (sectionType) {
        const validation = validateSection<T>(sectionType, result);
        if (!validation.success) {
          if (attempt < MAX_RETRIES) {
            lastError = new Error(
              `Validation failed: ${validation.errors.join(", ")}`
            );
            continue;
          }
          // On final attempt: log but still return the best-effort result
          console.warn(
            `[FORGE Orchestrator] Section ${sectionType} validation failed after ${MAX_RETRIES} retries:`,
            validation.errors
          );
          // Return unvalidated but usable content
          return {
            content: result as T,
            metadata: buildMetadata(provider.name, route, start, false),
            rawOutput,
          };
        }
        return {
          content: validation.data as T,
          metadata: buildMetadata(provider.name, route, start, true),
          rawOutput,
        };
      }

      return {
        content: result as T,
        metadata: buildMetadata(provider.name, route, start, true),
        rawOutput,
      };
    } catch (err) {
      lastError = err instanceof Error ? err : new Error(String(err));
      if (attempt < MAX_RETRIES) continue;
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
    model: providerName === "anthropic" ? ANTHROPIC_MODEL : "unknown",
    refined: false,
    pipelineVersion: "v1",
    latencyMs: Date.now() - startMs,
  };
}
