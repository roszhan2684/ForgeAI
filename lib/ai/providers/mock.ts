import { AIGenerateInput, AIProvider } from "../types";
import { DEMO_SECTIONS } from "@/lib/seed-data";
import { SectionType } from "@/types/project";

// Returns pre-seeded demo content — used when no API key is configured
export const mockProvider: AIProvider = {
  name: "mock",

  async generate<T = unknown>(input: AIGenerateInput): Promise<T> {
    // Simulate network latency
    await new Promise((r) => setTimeout(r, 800 + Math.random() * 600));

    // Pull section type from prompt hint if present
    const sectionMatch = input.userPrompt.match(
      /generate(?:_| )(?:the )?(\w+)/i
    );
    const hint = sectionMatch?.[1]?.toLowerCase();

    const sectionMap: Record<string, SectionType> = {
      overview: "overview",
      personas: "personas",
      scope: "scope",
      flows: "flows",
      wireframes: "wireframes",
      stack: "stack",
      launch: "launch",
      landingcopy: "landingCopy",
      landing: "landingCopy",
      buildmode: "buildMode",
      build: "buildMode",
    };

    const sectionType = hint ? sectionMap[hint] : undefined;
    if (sectionType) {
      const section = DEMO_SECTIONS.find((s) => s.sectionType === sectionType);
      if (section) return section.content as T;
    }

    // Fallback: return overview content
    const overview = DEMO_SECTIONS.find((s) => s.sectionType === "overview");
    return (overview?.content ?? {}) as T;
  },
};
