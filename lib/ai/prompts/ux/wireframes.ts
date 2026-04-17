import { ProjectContext } from "../../types";
import { buildProjectContext } from "../system";

export function buildWireframesPrompt(ctx: ProjectContext): string {
  return `${buildProjectContext(ctx)}

Generate the Screen Wireframes section for this product.

Return strictly valid JSON with this exact structure:
{
  "screens": [
    {
      "name": "Screen Name",
      "purpose": "what this screen achieves for the user",
      "keyComponents": ["component 1", "component 2", "component 3"],
      "primaryCTA": "main action button label",
      "secondaryCTAs": ["secondary action 1", "secondary action 2"],
      "layoutNotes": ["layout note 1", "layout note 2"],
      "uxNotes": ["ux insight 1", "ux insight 2"]
    }
  ]
}

Requirements:
- Define 4–7 core screens for the MVP
- Only include screens that are critical to the primary user flow
- Key components should be concrete UI elements, not vague descriptions
- Layout notes should guide visual composition
- UX notes should highlight user psychology and interaction quality
- Primary CTA should be action-oriented and specific
- Each screen should have a clear, singular purpose`;
}
