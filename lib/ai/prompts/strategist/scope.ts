import { ProjectContext } from "../../types";
import { buildProjectContext } from "../system";

export function buildScopePrompt(ctx: ProjectContext): string {
  return `${buildProjectContext(ctx)}

Generate the Feature Scope section for this product.

Return strictly valid JSON with this exact structure:
{
  "mvpFeatures": [
    {
      "name": "feature name",
      "description": "what it does",
      "reason": "why it must be in MVP",
      "priority": "P0"
    }
  ],
  "niceToHaveFeatures": [
    {
      "name": "feature name",
      "description": "what it does",
      "reason": "why it's useful but not critical",
      "priority": "P2"
    }
  ],
  "futureFeatures": [
    {
      "name": "feature name",
      "description": "what it does",
      "reason": "why it belongs in a later version",
      "priority": "Future"
    }
  ],
  "outOfScope": ["thing1 that should NOT be built in MVP", "thing2"],
  "risks": ["risk1 that could derail the product", "risk2"]
}

Priority definitions:
- P0: Must ship in MVP — product doesn't work without it
- P1: Should ship in MVP — significantly improves the core loop
- P2: Nice to have — improves quality but not essential
- Future: Clearly valuable but belongs in a later phase

Requirements:
- Be ruthless about MVP scope — 3–5 P0 features maximum
- Out of scope items should call out specific temptations that would over-engineer the MVP
- Risks should be specific and actionable, not generic startup platitudes`;
}
