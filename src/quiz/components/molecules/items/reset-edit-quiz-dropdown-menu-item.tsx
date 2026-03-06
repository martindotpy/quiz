import { ConfirmDialog } from "@/core/components/molecules/confirm-dialog"
import type { NewQuizDropdownMenuButtonItem } from "@/quiz/components/molecules/items/new-quiz-dropdown-menu-items"
import { useCurrentQuiz } from "@/quiz/hook/use-current-quiz"
import { useHasUnsavedChanges } from "@/quiz/hook/use-edit-quiz"
import { currentQuestionStore } from "@/quiz/store/current-question-store"
import { initialEditQuizStore } from "@/quiz/store/edit-quiz-store"
import { i18nInstance } from "@/translation/i18n-instance"
import { useStore } from "@nanostores/react"
import { useNavigate } from "@tanstack/react-router"
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

  // Navigation
  const navigate = useNavigate()

  // Current quiz
  const { resetQuizStore } = useCurrentQuiz()

  // Available to update
  const hasUnsavedChanges = useHasUnsavedChanges()

  // Dialog
  const [open, setOpen] = useState(false)

  const onConfirm = async () => {
    const questionIndex = currentQuestionStore.get()?.questionIndex

    if (questionIndex !== undefined) {
      const questionsLength = initialEditQuizStore.get()?.questions?.length ?? 0
      const isOutOfBounds = questionIndex >= questionsLength

      if (isOutOfBounds)
        await navigate({
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-expect-error
          params: (prevParams) => ({
            ...prevParams,
            questionId: String(questionsLength),
          }),
        })
    }

    resetQuizStore()
    setOpen(false)
  }

  return [
    {
      icon: TbTrash,
      label: messages.label,
      onClick: () => setOpen(true),
      variant: "destructive",
      disabled: !hasUnsavedChanges,
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
