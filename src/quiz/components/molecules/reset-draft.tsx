import { ConfirmDialog } from "@/core/components/molecules/confirm-dialog"
import { Button } from "@/core/components/ui/button"
import { useQuizDraft } from "@/quiz/hook/use-quiz-draft"
import { useState } from "react"
import { TbTrash } from "react-icons/tb"

// Component
export function ResetQuizDraft() {
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
        title="Reset Quiz Draft"
        description="Are you sure you want to reset the quiz draft? All unsaved changes will be lost."
      />
    </>
  )
}
