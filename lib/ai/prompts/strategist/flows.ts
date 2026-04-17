import { ProjectContext } from "../../types";
import { buildProjectContext } from "../system";

export function buildFlowsPrompt(ctx: ProjectContext): string {
  return `${buildProjectContext(ctx)}

Generate the User Flows section for this product.

Return strictly valid JSON with this exact structure:
{
  "primaryFlow": [
    { "step": 1, "actor": "User", "action": "what they do", "result": "what happens" }
  ],
  "onboardingFlow": [
    { "step": 1, "actor": "User", "action": "what they do", "result": "what happens" }
  ],
  "coreActionFlow": [
    { "step": 1, "actor": "User or System", "action": "what they do", "result": "what happens" }
  ],
  "edgeCases": ["edge case scenario 1", "edge case scenario 2"],
  "emptyStates": ["empty state description 1", "empty state description 2"]
}

Requirements:
- Primary flow: the end-to-end path from first visit to core value achieved (6–10 steps)
- Onboarding flow: getting set up and reaching activation (3–6 steps)
- Core action flow: the main repeating action a returning user takes (3–7 steps)
- Actor can be "User", "System", or a specific role name
- Edge cases should be realistic failure and exception scenarios
- Empty states should describe what a user sees when there's no content yet`;
}
