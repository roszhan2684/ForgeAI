import Anthropic from "@anthropic-ai/sdk";
import { AIGenerateInput, AIProvider } from "../types";

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

// Default model — easiest to swap here
const DEFAULT_MODEL = "claude-sonnet-4-6";

export const anthropicProvider: AIProvider = {
  name: "anthropic",

  async generate<T = unknown>(input: AIGenerateInput): Promise<T> {
    const start = Date.now();

    const response = await client.messages.create({
      model: DEFAULT_MODEL,
      max_tokens: input.maxTokens ?? 4096,
      system: input.systemPrompt,
      messages: [{ role: "user", content: input.userPrompt }],
    });

    const text =
      response.content[0].type === "text" ? response.content[0].text : "";

    if (input.responseFormat === "json") {
      const cleaned = extractJSON(text);
      try {
        return JSON.parse(cleaned) as T;
      } catch {
        throw new Error(
          `Anthropic returned invalid JSON. Raw: ${text.slice(0, 300)}`
        );
      }
    }

    return text as unknown as T;
  },
};

export const ANTHROPIC_MODEL = DEFAULT_MODEL;

function extractJSON(text: string): string {
  // Strip markdown code fences if present
  const fenceMatch = text.match(/```(?:json)?\s*([\s\S]*?)```/);
  if (fenceMatch) return fenceMatch[1].trim();

  // Find first { or [ and last } or ]
  const firstBrace = text.indexOf("{");
  const firstBracket = text.indexOf("[");
  const start =
    firstBrace === -1
      ? firstBracket
      : firstBracket === -1
      ? firstBrace
      : Math.min(firstBrace, firstBracket);

  if (start === -1) return text.trim();

  const lastBrace = text.lastIndexOf("}");
  const lastBracket = text.lastIndexOf("]");
  const end = Math.max(lastBrace, lastBracket);

  return end > start ? text.slice(start, end + 1) : text.trim();
}
