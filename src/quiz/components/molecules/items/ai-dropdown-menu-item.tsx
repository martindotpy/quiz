import type { LinkRoute } from "@/pages/_app/routes/-routes-types"
import type { NewQuizDropdownMenuLinkItem } from "@/quiz/components/molecules/items/new-quiz-dropdown-menu-items"
import { useMode } from "@/quiz/hook/use-mode"
import { i18nInstance } from "@/translation/kit/i18n-kit"
import { useStore } from "@nanostores/react"
import { TbSparkles } from "react-icons/tb"

// i18n
const newQuizSettingAiMessages = i18nInstance("quiz:settings:ai", {
  label: "AI",
})

// Item
export function useAiDropdownMenuItem(): NewQuizDropdownMenuLinkItem {
  const messages = useStore(newQuizSettingAiMessages)

  // Mode
  const { isCreationMode } = useMode()

  // Link
  const to: LinkRoute = isCreationMode
    ? "/{-$locale}/quiz/new/ai"
    : "/{-$locale}/quiz/$quizId/edit/ai"

  return {
    to,
    icon: TbSparkles,
    label: messages.label,
  }
}
