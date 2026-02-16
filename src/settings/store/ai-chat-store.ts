import type { AiChat } from "@/ai/constants/ai-chat"
import { persistentAtom } from "@nanostores/persistent"

// Stores
export const aiChatStore = persistentAtom<AiChat>("ai-chat", "chatgpt")
