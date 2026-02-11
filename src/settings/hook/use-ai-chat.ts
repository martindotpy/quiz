import { aiChatStore } from "@/settings/store/ai-chat-store"
import { useStore } from "@nanostores/react"

// Hooks
export function useAiChat() {
  const aiChat = useStore(aiChatStore)

  return aiChat
}
