import OpenAI from "openai";
import { AIGenerateInput, AIProvider } from "../types";

let _client: OpenAI | null = null;
function getClient() {
  if (!_client) {
    _client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY ?? "placeholder" });
  }
  return _client;
}

const DEFAULT_MODEL = "gpt-4o";

export const openaiProvider: AIProvider = {
  name: "openai",

  async generate<T = unknown>(input: AIGenerateInput): Promise<T> {
    const response = await getClient().chat.completions.create({
      model: DEFAULT_MODEL,
      temperature: input.temperature ?? 0.7,
      max_tokens: input.maxTokens ?? 4096,
      response_format:
        input.responseFormat === "json" ? { type: "json_object" } : undefined,
      messages: [
        { role: "system", content: input.systemPrompt },
        { role: "user", content: input.userPrompt },
      ],
    });

    const text = response.choices[0]?.message?.content ?? "";

    if (input.responseFormat === "json") {
      try {
        return JSON.parse(text) as T;
      } catch {
        throw new Error(
          `OpenAI returned invalid JSON. Raw: ${text.slice(0, 300)}`
        );
      }
    }

    return text as unknown as T;
  },
};

export const OPENAI_MODEL = DEFAULT_MODEL;
