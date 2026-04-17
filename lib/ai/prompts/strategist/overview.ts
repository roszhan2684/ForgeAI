import { ProjectContext } from "../../types";
import { buildProjectContext } from "../system";

export function buildOverviewPrompt(ctx: ProjectContext): string {
  return `${buildProjectContext(ctx)}

Generate the product Overview section for this idea.

Return strictly valid JSON with this exact structure:
{
  "productNameSuggestions": ["Name1", "Name2", "Name3", "Name4"],
  "oneLineSummary": "one sentence description",
  "problemStatement": "clear problem the product solves",
  "targetAudience": "specific target user description",
  "valueProposition": "what value the product delivers",
  "uniqueAngle": "what makes this different from existing solutions",
  "whyNow": "why this is the right time to build this",
  "successMetrics": ["metric1", "metric2", "metric3", "metric4"]
}

Requirements:
- Product names should be creative, short, memorable, and relevant to the idea
- Problem statement should be specific, not generic
- Value proposition should be concrete and measurable where possible
- Success metrics should be specific and trackable
- Keep all fields focused on MVP realism`;
}
