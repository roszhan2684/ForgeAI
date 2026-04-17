import { ProjectContext } from "../../types";
import { buildProjectContext } from "../system";

export function buildStackPrompt(ctx: ProjectContext): string {
  return `${buildProjectContext(ctx)}

Generate the Tech Stack Recommendation section for this product.

Return strictly valid JSON with this exact structure:
{
  "frontend": "specific framework and key libraries",
  "backend": "backend approach and key technologies",
  "database": "database choice and ORM",
  "auth": "authentication solution",
  "infra": "hosting and infrastructure",
  "analytics": "analytics and observability tools",
  "tradeoffs": ["tradeoff 1", "tradeoff 2", "tradeoff 3"],
  "beginnerVersion": "simpler stack alternative for beginners",
  "scalableVersion": "more scalable architecture for when the product grows"
}

Requirements:
- Tailor recommendations to the builder's skill level (${ctx.skillLevel ?? "intermediate"})
- If preferred stack is specified, incorporate it: ${ctx.preferredStack ?? "none specified"}
- Favor well-documented, production-proven choices over trendy new tools
- Tradeoffs should be honest about what is sacrificed for speed
- Beginner version should remove complexity without breaking functionality
- Scalable version should show what would be added when the product has real users`;
}
