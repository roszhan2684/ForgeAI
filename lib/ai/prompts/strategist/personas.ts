import { ProjectContext } from "../../types";
import { buildProjectContext } from "../system";

export function buildPersonasPrompt(ctx: ProjectContext): string {
  return `${buildProjectContext(ctx)}

Generate 2–3 realistic User Personas for this product.

Return strictly valid JSON with this exact structure:
{
  "personas": [
    {
      "name": "first name only",
      "role": "their role or description",
      "ageRange": "e.g. 22–28",
      "goals": ["goal1", "goal2", "goal3"],
      "frustrations": ["frustration1", "frustration2"],
      "behaviors": ["behavior1", "behavior2"],
      "primaryUseCase": "one sentence describing their main use of the product",
      "techComfort": "Low | Medium | High",
      "motivations": ["motivation1", "motivation2"],
      "quote": "a real-sounding quote they might say about their problem"
    }
  ]
}

Requirements:
- Each persona should be meaningfully distinct from the others
- Goals, frustrations, and motivations must be specific to this product domain
- Quotes should feel authentic and human, not like marketing copy
- Tech comfort should reflect realistic user variation
- Primary use case should be specific and tied to a core product flow`;
}
