import { ConfirmDialog } from "@/core/components/molecules/confirm-dialog"
import type { NewQuizDropdownMenuButtonItem } from "@/quiz/components/molecules/items/new-quiz-dropdown-menu-items"
import { useCurrentQuiz } from "@/quiz/hook/use-current-quiz"
import { i18nInstance } from "@/translation/i18n-instance"
import { useStore } from "@nanostores/react"
import type React from "react"
import { useState } from "react"
import { TbTrash } from "react-icons/tb"

// i18n
const newQuizSettingResetDraftQuizMessages = i18nInstance(
  "quiz:new:settings:reset",
  {
    label: "Reset draft",
    title: "Reset Draft quiz",
    description:
      "Are you sure you want to reset the Draft quiz? All unsaved changes will be lost.",
  }
)

// Item
export function useResetDraftQuizDropdownMenuItem(): [
  NewQuizDropdownMenuButtonItem,
  React.ReactNode,
] {
  const messages = useStore(newQuizSettingResetDraftQuizMessages)

  // Draft quiz
  const { resetQuizStore } = useCurrentQuiz()

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
    },
    <ConfirmDialog
      key="reset-draft-quiz-dialog"
      onConfirm={onConfirm}
      onOpenChange={setOpen}
      open={open}
      title={messages.title}
      description={messages.description}
      variant="destructive"
    />,
  ]
}
