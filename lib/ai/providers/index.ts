import { AIProvider, AIProviderName } from "../types";
import { anthropicProvider } from "./anthropic";
import { openaiProvider } from "./openai";
import { geminiProvider } from "./gemini";
import { mockProvider } from "./mock";

export function getProvider(name: AIProviderName): AIProvider {
  switch (name) {
    case "anthropic":
      return anthropicProvider;
    case "openai":
      return openaiProvider;
    case "gemini":
      return geminiProvider;
    case "mock":
      return mockProvider;
  }
}

/** Resolve the best available provider given a preference and env config.
 *  Priority: anthropic → gemini → openai → mock
 */
export function resolveProvider(preference?: AIProviderName): AIProvider {
  if (preference) {
    const hasKey =
      preference === "anthropic"
        ? process.env.ANTHROPIC_API_KEY
        : preference === "openai"
        ? process.env.OPENAI_API_KEY
        : preference === "gemini"
        ? process.env.GOOGLE_API_KEY
        : "mock";
    if (hasKey) return getProvider(preference);
  }

  if (process.env.GOOGLE_API_KEY) return geminiProvider;
  if (process.env.ANTHROPIC_API_KEY) return anthropicProvider;
  if (process.env.OPENAI_API_KEY) return openaiProvider;
  return mockProvider;
}
