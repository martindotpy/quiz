import { type AiChat } from "@/settings/components/molecules/ai-chat-select"
import { persistentAtom } from "@nanostores/persistent"

// Stores
export const aiChatStore = persistentAtom<AiChat>("ai-chat", "chatgpt")
