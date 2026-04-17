import { z } from "zod";
import { SectionType } from "@/types/project";

// ── Shared atoms ────────────────────────────────────────────────
const featureSchema = z.object({
  name: z.string(),
  description: z.string(),
  reason: z.string(),
  priority: z.string(),
});

const flowStepSchema = z.object({
  step: z.number(),
  actor: z.string(),
  action: z.string(),
  result: z.string(),
});

// ── Section schemas ─────────────────────────────────────────────
export const overviewSchema = z.object({
  productNameSuggestions: z.array(z.string()).min(1),
  oneLineSummary: z.string(),
  problemStatement: z.string(),
  targetAudience: z.string(),
  valueProposition: z.string(),
  uniqueAngle: z.string(),
  whyNow: z.string(),
  successMetrics: z.array(z.string()).min(1),
});

export const personasSchema = z.object({
  personas: z
    .array(
      z.object({
        name: z.string(),
        role: z.string(),
        ageRange: z.string(),
        goals: z.array(z.string()),
        frustrations: z.array(z.string()),
        behaviors: z.array(z.string()),
        primaryUseCase: z.string(),
        techComfort: z.string(),
        motivations: z.array(z.string()),
        quote: z.string(),
      })
    )
    .min(1),
});

export const scopeSchema = z.object({
  mvpFeatures: z.array(featureSchema),
  niceToHaveFeatures: z.array(featureSchema),
  futureFeatures: z.array(featureSchema),
  outOfScope: z.array(z.string()),
  risks: z.array(z.string()),
});

export const flowsSchema = z.object({
  primaryFlow: z.array(flowStepSchema),
  onboardingFlow: z.array(flowStepSchema),
  coreActionFlow: z.array(flowStepSchema),
  edgeCases: z.array(z.string()),
  emptyStates: z.array(z.string()),
});

export const wireframesSchema = z.object({
  screens: z.array(
    z.object({
      name: z.string(),
      purpose: z.string(),
      keyComponents: z.array(z.string()),
      primaryCTA: z.string(),
      secondaryCTAs: z.array(z.string()),
      layoutNotes: z.array(z.string()),
      uxNotes: z.array(z.string()),
    })
  ),
});

export const stackSchema = z.object({
  frontend: z.string(),
  backend: z.string(),
  database: z.string(),
  auth: z.string(),
  infra: z.string(),
  analytics: z.string(),
  tradeoffs: z.array(z.string()),
  beginnerVersion: z.string(),
  scalableVersion: z.string(),
});

export const launchSchema = z.object({
  validationPlan: z.array(z.string()),
  betaUserProfile: z.string(),
  preLaunchChecklist: z.array(z.string()),
  launchChannels: z.array(z.string()),
  first30Days: z.array(z.string()),
  feedbackLoop: z.array(z.string()),
  analyticsGoals: z.array(z.string()),
});

export const landingCopySchema = z.object({
  headline: z.string(),
  subheadline: z.string(),
  primaryCTA: z.string(),
  secondaryCTA: z.string(),
  features: z.array(
    z.object({ title: z.string(), description: z.string() })
  ),
  problemSection: z.string(),
  solutionSection: z.string(),
  faq: z.array(z.object({ question: z.string(), answer: z.string() })),
  finalCTA: z.string(),
});

export const buildModeSchema = z.object({
  screens: z.array(z.object({ name: z.string(), purpose: z.string() })),
  components: z.array(
    z.object({
      name: z.string(),
      usedIn: z.array(z.string()),
      states: z.array(z.string()),
    })
  ),
  tickets: z.array(
    z.object({
      id: z.string(),
      title: z.string(),
      description: z.string(),
      acceptanceCriteria: z.array(z.string()),
      dependencies: z.array(z.string()),
      complexity: z.string(),
    })
  ),
  apiPlan: z.array(
    z.object({
      name: z.string(),
      method: z.string(),
      path: z.string(),
      purpose: z.string(),
      requestShape: z.record(z.string(), z.unknown()),
      responseShape: z.record(z.string(), z.unknown()),
    })
  ),
  dataModel: z.array(
    z.object({
      name: z.string(),
      fields: z.array(z.string()),
      relationships: z.array(z.string()),
    })
  ),
  roadmap: z.array(z.object({ week: z.number(), focus: z.string() })),
  claudePrompt: z.string(),
});

// ── Validator map ────────────────────────────────────────────────
const VALIDATORS: Record<SectionType, z.ZodTypeAny> = {
  overview: overviewSchema,
  personas: personasSchema,
  scope: scopeSchema,
  flows: flowsSchema,
  wireframes: wireframesSchema,
  stack: stackSchema,
  launch: launchSchema,
  landingCopy: landingCopySchema,
  buildMode: buildModeSchema,
};

export interface ValidationResult<T> {
  success: true;
  data: T;
  errors?: never;
}
export interface ValidationFailure {
  success: false;
  data?: never;
  errors: string[];
}

export function validateSection<T>(
  sectionType: SectionType,
  raw: unknown
): ValidationResult<T> | ValidationFailure {
  const schema = VALIDATORS[sectionType];
  if (!schema) {
    return { success: false, errors: [`No validator for section: ${sectionType}`] };
  }

  const result = schema.safeParse(raw);
  if (result.success) {
    return { success: true, data: result.data as T };
  }

  const errors = result.error.issues.map(
    (e) => `${e.path.join(".")}: ${e.message}`
  );
  return { success: false, errors };
}
