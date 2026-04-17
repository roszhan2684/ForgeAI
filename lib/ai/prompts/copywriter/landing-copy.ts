import { ProjectContext } from "../../types";
import { buildProjectContext } from "../system";

export function buildLandingCopyPrompt(ctx: ProjectContext): string {
  const tone = ctx.brandTone ?? "clear, confident, and modern";

  return `${buildProjectContext(ctx)}

Generate the Landing Page Copy section for this product.

Brand tone: ${tone}

Return strictly valid JSON with this exact structure:
{
  "headline": "main hero headline — bold, specific, outcome-focused",
  "subheadline": "supporting sentence expanding on the headline",
  "primaryCTA": "primary button label",
  "secondaryCTA": "secondary button label",
  "features": [
    { "title": "feature name", "description": "one sentence benefit description" }
  ],
  "problemSection": "one paragraph describing the pain point the product solves",
  "solutionSection": "one paragraph describing how the product solves it",
  "faq": [
    { "question": "question", "answer": "answer" }
  ],
  "finalCTA": "closing call-to-action sentence"
}

Requirements:
- Headline must be specific to this product's value — no generic startup clichés
- Subheadline should expand on the headline without repeating it
- CTA labels should be action verbs, not generic ("Join" not "Submit")
- Generate 3–5 features with tight benefit-focused descriptions
- Problem and solution sections should be specific to the target user's reality
- Generate 3 FAQ items addressing real objections or questions
- Tone should be: ${tone}
- Write for a smart, busy person who is skeptical by default`;
}
