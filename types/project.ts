import type { AIGenerationMetadata } from "@/lib/ai/types";

export type SectionType =
  | "overview"
  | "personas"
  | "scope"
  | "flows"
  | "wireframes"
  | "stack"
  | "launch"
  | "landingCopy"
  | "buildMode";

export type GenerationStatus =
  | "idle"
  | "generating"
  | "generated"
  | "edited"
  | "error";

export interface Project {
  id: string;
  title: string;
  rawIdea: string;
  targetUser?: string | null;
  preferredPlatform?: string | null;
  goal?: string | null;
  skillLevel?: string | null;
  preferredStack?: string | null;
  brandTone?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface ProjectSection<T = unknown> {
  id: string;
  projectId: string;
  sectionType: SectionType;
  title: string;
  summary: string;
  content: T;
  status: GenerationStatus;
  version: number;
  edited: boolean;
  createdAt: string;
  updatedAt: string;
  lastGeneratedAt?: string | null;
  metadata?: AIGenerationMetadata;
}

// Section content types
export interface OverviewContent {
  productNameSuggestions: string[];
  oneLineSummary: string;
  problemStatement: string;
  targetAudience: string;
  valueProposition: string;
  uniqueAngle: string;
  whyNow: string;
  successMetrics: string[];
}

export interface Persona {
  name: string;
  role: string;
  ageRange: string;
  goals: string[];
  frustrations: string[];
  behaviors: string[];
  primaryUseCase: string;
  techComfort: string;
  motivations: string[];
  quote: string;
}

export interface PersonasContent {
  personas: Persona[];
}

export interface Feature {
  name: string;
  description: string;
  reason: string;
  priority: string;
}

export interface ScopeContent {
  mvpFeatures: Feature[];
  niceToHaveFeatures: Feature[];
  futureFeatures: Feature[];
  outOfScope: string[];
  risks: string[];
}

export interface FlowStep {
  step: number;
  actor: string;
  action: string;
  result: string;
}

export interface FlowsContent {
  primaryFlow: FlowStep[];
  onboardingFlow: FlowStep[];
  coreActionFlow: FlowStep[];
  edgeCases: string[];
  emptyStates: string[];
}

export interface Screen {
  name: string;
  purpose: string;
  keyComponents: string[];
  primaryCTA: string;
  secondaryCTAs: string[];
  layoutNotes: string[];
  uxNotes: string[];
}

export interface WireframesContent {
  screens: Screen[];
}

export interface StackContent {
  frontend: string;
  backend: string;
  database: string;
  auth: string;
  infra: string;
  analytics: string;
  tradeoffs: string[];
  beginnerVersion: string;
  scalableVersion: string;
}

export interface LaunchContent {
  validationPlan: string[];
  betaUserProfile: string;
  preLaunchChecklist: string[];
  launchChannels: string[];
  first30Days: string[];
  feedbackLoop: string[];
  analyticsGoals: string[];
}

export interface LandingFeature {
  title: string;
  description: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface LandingCopyContent {
  headline: string;
  subheadline: string;
  primaryCTA: string;
  secondaryCTA: string;
  features: LandingFeature[];
  problemSection: string;
  solutionSection: string;
  faq: FAQ[];
  finalCTA: string;
}

export interface BuildScreen {
  name: string;
  purpose: string;
}

export interface BuildComponent {
  name: string;
  usedIn: string[];
  states: string[];
}

export interface Ticket {
  id: string;
  title: string;
  description: string;
  acceptanceCriteria: string[];
  dependencies: string[];
  complexity: string;
}

export interface ApiEndpoint {
  name: string;
  method: string;
  path: string;
  purpose: string;
  requestShape: Record<string, unknown>;
  responseShape: Record<string, unknown>;
}

export interface DataEntity {
  name: string;
  fields: string[];
  relationships: string[];
}

export interface RoadmapItem {
  week: number;
  focus: string;
}

export interface BuildModeContent {
  screens: BuildScreen[];
  components: BuildComponent[];
  tickets: Ticket[];
  apiPlan: ApiEndpoint[];
  dataModel: DataEntity[];
  roadmap: RoadmapItem[];
  claudePrompt: string;
}
