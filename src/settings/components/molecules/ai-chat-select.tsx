import { aiChatNames, type AiChat } from "@/ai/contants/ai-chat"
import {
  NativeSelect,
  NativeSelectOption,
} from "@/core/components/ui/native-select"
import { useAiChat } from "@/settings/hook/use-ai-chat"
import { aiChatStore } from "@/settings/store/ai-chat-store"
import { useEffect, useRef } from "react"

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
      {Object.entries(aiChatNames).map(([value, label]) => (
        <NativeSelectOption key={value} value={value}>
          {label}
        </NativeSelectOption>
      ))}
    </NativeSelect>
  )
}
