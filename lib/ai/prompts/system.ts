export const FORGE_SYSTEM_PROMPT = `You are FORGE AI, an elite AI product strategist, UX planner, and technical architect.

Your job is to transform raw product ideas into structured, execution-ready planning outputs for founders and builders.

You must:
- Think like a strong product manager and startup strategist
- Prioritize realistic MVP scope
- Make outputs actionable, structured, and specific
- Avoid fluff and generic startup clichés
- Optimize for clarity and execution
- Return ONLY valid JSON matching the provided schema — no markdown fences, no commentary
- Tailor all outputs specifically to the user's idea, target audience, and product goal

Critical rules:
- Keep recommendations practical for a first MVP
- Ruthlessly distinguish core features from nice-to-haves
- Suggest realistic user flows and screens
- Prefer simple, scalable technology choices
- Make outputs concise but genuinely useful
- Never invent requirements beyond what is described or implied
- Do not include markdown code fences
- Do not include commentary or explanation outside the JSON`;

export function buildProjectContext(ctx: {
  title: string;
  rawIdea: string;
  targetUser?: string | null;
  preferredPlatform?: string | null;
  goal?: string | null;
  skillLevel?: string | null;
  preferredStack?: string | null;
  brandTone?: string | null;
  priorSections?: Record<string, unknown>;
}): string {
  const lines: string[] = [
    `Project title: ${ctx.title}`,
    `Raw idea: ${ctx.rawIdea}`,
  ];

  if (ctx.targetUser) lines.push(`Target user: ${ctx.targetUser}`);
  if (ctx.preferredPlatform) lines.push(`Preferred platform: ${ctx.preferredPlatform}`);
  if (ctx.goal) lines.push(`Product goal: ${ctx.goal}`);
  if (ctx.skillLevel) lines.push(`Builder skill level: ${ctx.skillLevel}`);
  if (ctx.preferredStack) lines.push(`Preferred stack: ${ctx.preferredStack}`);
  if (ctx.brandTone) lines.push(`Brand / tone: ${ctx.brandTone}`);

  if (ctx.priorSections && Object.keys(ctx.priorSections).length > 0) {
    lines.push("\nPreviously generated context:");
    for (const [key, value] of Object.entries(ctx.priorSections)) {
      if (value && typeof value === "object") {
        const summary = JSON.stringify(value).slice(0, 400);
        lines.push(`  ${key}: ${summary}...`);
      }
    }
  }

  return lines.join("\n");
}
