import { ProjectContext } from "../../types";
import { buildProjectContext } from "../system";

export function buildLaunchPrompt(ctx: ProjectContext): string {
  return `${buildProjectContext(ctx)}

Generate the Launch Plan section for this product.

Return strictly valid JSON with this exact structure:
{
  "validationPlan": ["validation action 1", "validation action 2", "validation action 3"],
  "betaUserProfile": "one paragraph describing the ideal early adopter",
  "preLaunchChecklist": ["checklist item 1", "checklist item 2", "checklist item 3", "checklist item 4"],
  "launchChannels": ["channel 1", "channel 2", "channel 3", "channel 4"],
  "first30Days": ["action 1", "action 2", "action 3"],
  "feedbackLoop": ["feedback mechanism 1", "feedback mechanism 2"],
  "analyticsGoals": ["metric 1", "metric 2", "metric 3", "metric 4"]
}

Requirements:
- Validation plan should focus on learning before building more
- Beta user profile should be specific and findable, not generic
- Checklist items should be concrete and completable
- Launch channels should be realistic for an early-stage product with no marketing budget
- First 30 days should focus on learning and retention, not growth
- Analytics goals should be measurable and relevant to the product type`;
}
