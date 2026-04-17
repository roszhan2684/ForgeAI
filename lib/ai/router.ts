import { AIRole, AITaskType, AIProviderName } from "./types";

interface RouteConfig {
  role: AIRole;
  preferredProvider: AIProviderName;
  temperature: number;
  maxTokens: number;
  /** Whether to run a critic pass after generation */
  withReview: boolean;
}

const TASK_ROUTES: Record<AITaskType, RouteConfig> = {
  generate_overview: {
    role: "strategist",
    preferredProvider: "anthropic",
    temperature: 0.7,
    maxTokens: 2000,
    withReview: false,
  },
  generate_personas: {
    role: "strategist",
    preferredProvider: "anthropic",
    temperature: 0.8,
    maxTokens: 2500,
    withReview: false,
  },
  generate_scope: {
    role: "strategist",
    preferredProvider: "anthropic",
    temperature: 0.6,
    maxTokens: 3000,
    withReview: false,
  },
  generate_flows: {
    role: "strategist",
    preferredProvider: "anthropic",
    temperature: 0.6,
    maxTokens: 2500,
    withReview: false,
  },
  generate_wireframes: {
    role: "ux",
    preferredProvider: "anthropic",
    temperature: 0.7,
    maxTokens: 3000,
    withReview: false,
  },
  generate_stack: {
    role: "architect",
    preferredProvider: "anthropic",
    temperature: 0.5,
    maxTokens: 1500,
    withReview: false,
  },
  generate_launch: {
    role: "strategist",
    preferredProvider: "anthropic",
    temperature: 0.7,
    maxTokens: 2000,
    withReview: false,
  },
  generate_landing_copy: {
    role: "copywriter",
    preferredProvider: "anthropic",
    temperature: 0.85,
    maxTokens: 2500,
    withReview: false,
  },
  generate_build_mode: {
    role: "architect",
    preferredProvider: "anthropic",
    temperature: 0.5,
    maxTokens: 5000,
    withReview: false,
  },
  critique_section: {
    role: "critic",
    preferredProvider: "anthropic",
    temperature: 0.4,
    maxTokens: 1000,
    withReview: false,
  },
  refine_section: {
    role: "refiner",
    preferredProvider: "anthropic",
    temperature: 0.4,
    maxTokens: 2000,
    withReview: false,
  },
  summarize_project: {
    role: "strategist",
    preferredProvider: "anthropic",
    temperature: 0.5,
    maxTokens: 800,
    withReview: false,
  },
  export_claude_prompt: {
    role: "architect",
    preferredProvider: "anthropic",
    temperature: 0.5,
    maxTokens: 1500,
    withReview: false,
  },
};

export function routeTask(task: AITaskType): RouteConfig {
  return TASK_ROUTES[task] ?? TASK_ROUTES.generate_overview;
}

export const ROLE_LABELS: Record<AIRole, string> = {
  strategist: "FORGE Strategist",
  ux: "FORGE UX",
  architect: "FORGE Architect",
  copywriter: "FORGE Copy",
  critic: "FORGE Critic",
  refiner: "FORGE Refiner",
};

export const ROLE_COLORS: Record<AIRole, { bg: string; color: string }> = {
  strategist: { bg: "#eff6ff", color: "#2563eb" },
  ux: { bg: "#faf5ff", color: "#7c3aed" },
  architect: { bg: "#f0fdf4", color: "#16a34a" },
  copywriter: { bg: "#fff7ed", color: "#ea580c" },
  critic: { bg: "#fef2f2", color: "#dc2626" },
  refiner: { bg: "#fffbeb", color: "#d97706" },
};
