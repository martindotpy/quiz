import type { AiChat } from "@/ai/contants/ai-chat"
import { persistentAtom } from "@nanostores/persistent"

// Stores
export const aiChatStore = persistentAtom<AiChat>("ai-chat", "chatgpt")
