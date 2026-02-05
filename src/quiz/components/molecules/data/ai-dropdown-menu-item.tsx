import type { NewQuizMenuLinkItem } from "@/quiz/components/molecules/data/new-quiz-dropdown-menu-data"
import { i18nInstance } from "@/translation/kit/i18n-kit"
import { useStore } from "@nanostores/react"
import { TbSparkles } from "react-icons/tb"

// i18n
const newQuizSettingAiMessages = i18nInstance("quiz:new:settings:ai", {
  label: "AI",
})

// Item
export function useAiDropdownMenuItem(): NewQuizMenuLinkItem {
  const messages = useStore(newQuizSettingAiMessages)

  return {
    to: "/{-$locale}/quiz/new/ai",
    icon: TbSparkles,
    label: messages.label,
  }
}
