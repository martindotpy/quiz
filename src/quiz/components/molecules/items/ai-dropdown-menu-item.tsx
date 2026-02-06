import type { NewQuizDropdownMenuLinkItem } from "@/quiz/components/molecules/items/new-quiz-dropdown-menu-items"
import { i18nInstance } from "@/translation/kit/i18n-kit"
import { useStore } from "@nanostores/react"
import { TbSparkles } from "react-icons/tb"

// i18n
const newQuizSettingAiMessages = i18nInstance("quiz:new:settings:ai", {
  label: "AI",
})

// Item
export function useAiDropdownMenuItem(): NewQuizDropdownMenuLinkItem {
  const messages = useStore(newQuizSettingAiMessages)

  return {
    to: "/{-$locale}/quiz/new/ai",
    icon: TbSparkles,
    label: messages.label,
  }
}
