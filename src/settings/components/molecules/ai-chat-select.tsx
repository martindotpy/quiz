import {
  NativeSelect,
  NativeSelectOption,
} from "@/core/components/ui/native-select"
import { useAiChat } from "@/settings/hook/use-ai-chat"
import { aiChatStore } from "@/settings/store/ai-chat-store"
import { useEffect, useRef } from "react"

// Ai chats
export type AiChat = "chatgpt" | "claude" | "mistral" | "perplexity"

type AiChatOption = {
  [key in AiChat]: string
}

const aiChatOptions: AiChatOption = {
  chatgpt: "ChatGPT",
  claude: "Claude",
  mistral: "Mistral",
  perplexity: "Perplexity",
}

// Component
export function AiChatSelect() {
  // Ai chat
  const aiChat = useAiChat()

  // Select
  const selectRef = useRef<HTMLSelectElement>(null)

  useEffect(() => {
    if (!selectRef.current) return

    selectRef.current.value = aiChatStore.get()
  }, [])

  return (
    <NativeSelect
      ref={selectRef}
      className="w-full"
      value={aiChat}
      onChange={(e) => {
        aiChatStore.set(e.target.value as AiChat)
      }}
    >
      {Object.entries(aiChatOptions).map(([value, label]) => (
        <NativeSelectOption key={value} value={value}>
          {label}
        </NativeSelectOption>
      ))}
    </NativeSelect>
  )
}
