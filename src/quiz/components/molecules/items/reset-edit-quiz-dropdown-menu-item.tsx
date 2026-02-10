import { ConfirmDialog } from "@/core/components/molecules/confirm-dialog"
import { Route as QuizRoute } from "@/pages/_app/routes/{-$locale}/_main/quiz.$quizId"
import type { NewQuizDropdownMenuButtonItem } from "@/quiz/components/molecules/items/new-quiz-dropdown-menu-items"
import { useCurrentQuiz } from "@/quiz/hook/use-current-quiz"
import { i18nInstance } from "@/translation/kit/i18n-kit"
import { useStore } from "@nanostores/react"
import { deepEqual } from "fast-equals"
import type React from "react"
import { useState } from "react"
import { TbTrash } from "react-icons/tb"

// i18n
const newQuizSettingEditQuizMessages = i18nInstance(
  "quiz:edit:settings:reset",
  {
    label: "Reset to previous version",
    title: "Reset to previous version",
    description:
      "Are you sure you want to reset the draft quiz to its previous saved version? All unsaved changes will be lost.",
  }
)

// Item
export function useResetEditQuizDropdownMenuItem(): [
  NewQuizDropdownMenuButtonItem,
  React.ReactNode,
] {
  const messages = useStore(newQuizSettingEditQuizMessages)

  // Current quiz
  const { currentQuiz, resetQuizStore } = useCurrentQuiz()

  // Available to update
  const { quiz } = QuizRoute.useLoaderData()
  const isAvailableToReset = deepEqual(currentQuiz, quiz)

  // Dialog
  const [open, setOpen] = useState(false)

  const onConfirm = () => {
    resetQuizStore()
    setOpen(false)
  }

  return [
    {
      icon: TbTrash,
      label: messages.label,
      onClick: () => setOpen(true),
      variant: "destructive",
      disabled: isAvailableToReset,
    },
    <ConfirmDialog
      key="reset-edit-quiz-dialog"
      onConfirm={onConfirm}
      onOpenChange={setOpen}
      open={open}
      title={messages.title}
      description={messages.description}
      variant="destructive"
    />,
  ]
}
