import { AIProvider, AIProviderName } from "../types";
import { anthropicProvider } from "./anthropic";
import { openaiProvider } from "./openai";
import { mockProvider } from "./mock";

export function getProvider(name: AIProviderName): AIProvider {
  switch (name) {
    case "anthropic":
      return anthropicProvider;
    case "openai":
      return openaiProvider;
    case "mock":
      return mockProvider;
  }
}

/** Resolve the best available provider given a preference and env config */
export function resolveProvider(preference?: AIProviderName): AIProvider {
  if (preference) {
    const key =
      preference === "anthropic"
        ? process.env.ANTHROPIC_API_KEY
        : preference === "openai"
        ? process.env.OPENAI_API_KEY
        : "mock";
    if (key) return getProvider(preference);
  }

  // Auto-select: Anthropic first, then OpenAI, then mock
  if (process.env.ANTHROPIC_API_KEY) return anthropicProvider;
  if (process.env.OPENAI_API_KEY) return openaiProvider;
  return mockProvider;
}
