import { SectionType } from "@/types/project";

export type ArtifactKind =
  | "summary-cards"      // overview hero + value grid
  | "persona-gallery"    // persona card grid with chips
  | "kanban-board"       // prioritization columns
  | "flow-diagram"       // react flow node graph
  | "screen-board"       // lo-fi wireframe frames
  | "arch-diagram"       // layered system architecture
  | "roadmap-timeline"   // phase-based timeline
  | "landing-preview"    // landing page section previews
  | "screen-grid"        // build mode screen inventory
  | "component-map"      // dependency/component graph
  | "ticket-kanban"      // kanban task board
  | "api-cards"          // endpoint system cards
  | "entity-diagram"     // relationship diagram blocks
  | "sprint-timeline";   // sprint milestone chart

export interface ArtifactDescriptor {
  kind: ArtifactKind;
  label: string;
  description: string;
  /** Which JSON key(s) from the section content drive this artifact */
  dataKeys: string[];
  /** Preferred canvas height in pixels (0 = auto) */
  canvasHeight?: number;
  /** Whether this artifact is interactive (clickable nodes, tabs, etc.) */
  interactive: boolean;
}

/** Section → primary artifact mapping */
export const SECTION_ARTIFACTS: Record<SectionType, ArtifactDescriptor> = {
  overview: {
    kind: "summary-cards",
    label: "Product Snapshot",
    description: "Hero canvas with value proposition grid and success metric tiles",
    dataKeys: ["oneLineSummary", "problemStatement", "valueProposition", "uniqueAngle", "successMetrics", "whyNow"],
    interactive: false,
  },
  personas: {
    kind: "persona-gallery",
    label: "Persona Gallery",
    description: "Visual persona cards with goal/frustration chips and behavioral tags",
    dataKeys: ["personas"],
    interactive: false,
  },
  scope: {
    kind: "kanban-board",
    label: "Prioritization Board",
    description: "4-column kanban: MVP / Nice-to-Have / Future / Out-of-Scope",
    dataKeys: ["mvpFeatures", "niceToHaveFeatures", "futureFeatures", "outOfScope"],
    interactive: false,
  },
  flows: {
    kind: "flow-diagram",
    label: "Journey Map",
    description: "Node-edge flow diagrams for primary, onboarding, and core action paths",
    dataKeys: ["primaryFlow", "onboardingFlow", "coreActionFlow"],
    canvasHeight: 520,
    interactive: true,
  },
  wireframes: {
    kind: "screen-board",
    label: "Screen Board",
    description: "Browser-frame mockups with labeled layout blocks per screen",
    dataKeys: ["screens"],
    interactive: true,
  },
  stack: {
    kind: "arch-diagram",
    label: "Architecture Diagram",
    description: "Layered system view: Client → API → Data/Auth → Infra",
    dataKeys: ["frontend", "backend", "database", "auth", "infra", "analytics"],
    interactive: false,
  },
  launch: {
    kind: "roadmap-timeline",
    label: "Launch Roadmap",
    description: "4-phase timeline: Pre-Launch → Beta → Launch → Post-Launch",
    dataKeys: ["validationPlan", "betaUserProfile", "preLaunchChecklist", "launchChannels", "first30Days"],
    interactive: false,
  },
  landingCopy: {
    kind: "landing-preview",
    label: "Landing Preview",
    description: "Visual preview of hero, features, FAQ, and CTA sections",
    dataKeys: ["headline", "subheadline", "features", "faq", "primaryCTA", "finalCTA"],
    interactive: false,
  },
  buildMode: {
    kind: "ticket-kanban", // primary artifact; sub-tabs expose the others
    label: "Build Workspace",
    description: "Multi-tab execution workspace with tickets, screens, components, APIs, schema, roadmap",
    dataKeys: ["tickets", "screens", "components", "apiPlan", "dataModel", "roadmap"],
    interactive: true,
  },
};

/** Build Mode sub-artifacts, driven by nested data keys */
export const BUILD_MODE_ARTIFACTS: ArtifactDescriptor[] = [
  {
    kind: "screen-grid",
    label: "Screens",
    description: "Screen inventory grid",
    dataKeys: ["screens"],
    interactive: false,
  },
  {
    kind: "component-map",
    label: "Components",
    description: "Component dependency map",
    dataKeys: ["components"],
    canvasHeight: 400,
    interactive: true,
  },
  {
    kind: "ticket-kanban",
    label: "Tickets",
    description: "Engineering ticket board",
    dataKeys: ["tickets"],
    interactive: false,
  },
  {
    kind: "api-cards",
    label: "API",
    description: "Endpoint cards with method, path, and shape",
    dataKeys: ["apiPlan"],
    interactive: false,
  },
  {
    kind: "entity-diagram",
    label: "Schema",
    description: "Entity relationship blocks",
    dataKeys: ["dataModel"],
    interactive: false,
  },
  {
    kind: "sprint-timeline",
    label: "Roadmap",
    description: "Sprint / week milestone chart",
    dataKeys: ["roadmap"],
    interactive: false,
  },
];

/** Preference order when deciding how to render: diagram > board > timeline > card-system > text */
export const RENDER_PRIORITY: ArtifactKind[] = [
  "flow-diagram",
  "arch-diagram",
  "entity-diagram",
  "component-map",
  "kanban-board",
  "ticket-kanban",
  "sprint-timeline",
  "roadmap-timeline",
  "persona-gallery",
  "screen-board",
  "screen-grid",
  "api-cards",
  "landing-preview",
  "summary-cards",
];
