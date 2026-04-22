import { GoogleGenerativeAI } from "@google/generative-ai";
import { AIGenerateInput, AIProvider } from "../types";

const DEFAULT_MODEL = "gemini-2.5-flash";

let _client: GoogleGenerativeAI | null = null;

function getClient(): GoogleGenerativeAI {
  if (!_client) {
    const apiKey = process.env.GOOGLE_API_KEY;
    if (!apiKey) throw new Error("GOOGLE_API_KEY is not set");
    _client = new GoogleGenerativeAI(apiKey);
  }
  return _client;
}

export const geminiProvider: AIProvider = {
  name: "gemini",

  async generate<T = unknown>(input: AIGenerateInput): Promise<T> {
    const isJson = input.responseFormat === "json";

    const model = getClient().getGenerativeModel({
      model: DEFAULT_MODEL,
      systemInstruction: input.systemPrompt,
      generationConfig: {
        temperature: input.temperature ?? 0.7,
        maxOutputTokens: input.maxTokens ?? 4096,
        ...(isJson ? { responseMimeType: "application/json" } : {}),
      },
    });

    const result = await model.generateContent(input.userPrompt);
    const text = result.response.text();

    if (isJson) {
      try {
        return JSON.parse(text) as T;
      } catch {
        const cleaned = extractJSON(text);
        try {
          return JSON.parse(cleaned) as T;
        } catch {
          throw new Error(`Gemini returned invalid JSON. Raw: ${text.slice(0, 300)}`);
        }
      }
    }

    return text as unknown as T;
  },
};

export const GEMINI_MODEL = DEFAULT_MODEL;

function extractJSON(text: string): string {
  const fenceMatch = text.match(/```(?:json)?\s*([\s\S]*?)```/);
  if (fenceMatch) return fenceMatch[1].trim();

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
