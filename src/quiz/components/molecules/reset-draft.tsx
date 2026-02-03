import { ConfirmDialog } from "@/core/components/molecules/confirm-dialog"
import { Button } from "@/core/components/ui/button"
import { useQuizDraft } from "@/quiz/hook/use-quiz-draft"
import { i18nInstance } from "@/translation/kit/i18n-kit"
import { useStore } from "@nanostores/react"
import { useState } from "react"
import { TbTrash } from "react-icons/tb"

// i18n
const resetQuizDraftMessages = i18nInstance("quiz:reset-quiz-draft", {
  confirmTitle: "Reset Quiz Draft",
  confirmDescription:
    "Are you sure you want to reset the quiz draft? All unsaved changes will be lost.",
})

// Component
export function ResetQuizDraft() {
  const messages = useStore(resetQuizDraftMessages)

  // Dialog
  const [open, setOpen] = useState(false)

  // Quiz draft
  const { resetQuizDraft } = useQuizDraft()

  return (
    <>
      <Button variant="destructive" size="icon" onClick={() => setOpen(true)}>
        <TbTrash />
      </Button>

      <ConfirmDialog
        onConfirm={() => {
          resetQuizDraft()
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
