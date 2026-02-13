import { persistentAtom } from "@nanostores/persistent"

// Stores
export type AiGenerationMode = "add" | "improve" | "replace"
export const aiGenerationModeStore = persistentAtom<AiGenerationMode>(
  "ai-generation-mode",
  "add"
)
