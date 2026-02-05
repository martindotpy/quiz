import { ConfirmDialog } from "@/core/components/molecules/confirm-dialog"
import { Button } from "@/core/components/ui/button"
import { useDraftQuiz } from "@/quiz/hook/use-draft-quiz"
import { i18nInstance } from "@/translation/kit/i18n-kit"
import { useStore } from "@nanostores/react"
import { useState } from "react"
import { TbTrash } from "react-icons/tb"

// i18n
const resetDraftQuizMessages = i18nInstance("quiz:draft:reset", {
  confirmTitle: "Reset Draft quiz",
  confirmDescription:
    "Are you sure you want to reset the Draft quiz? All unsaved changes will be lost.",
})

// Component
export function ResetDraftQuizButton() {
  const messages = useStore(resetDraftQuizMessages)

  // Dialog
  const [open, setOpen] = useState(false)

  // Draft quiz
  const { resetDraftQuiz } = useDraftQuiz()

  return (
    <>
      <Button variant="destructive" size="icon" onClick={() => setOpen(true)}>
        <TbTrash />
      </Button>

      <ConfirmDialog
        onConfirm={() => {
          resetDraftQuiz()
          setOpen(false)
        }}
        onOpenChange={setOpen}
        open={open}
        title={messages.confirmTitle}
        description={messages.confirmDescription}
      />
    </>
  )
}
