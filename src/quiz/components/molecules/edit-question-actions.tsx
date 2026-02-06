import { ChangeTimeLimitSecondsActionButton } from "@/quiz/components/molecules/change-time-limit-seconds-action-button"
import { DeleteQuestionActionButton } from "@/quiz/components/molecules/delete-question-action-button"
import { DuplicateQuestionActionButton } from "@/quiz/components/molecules/duplicate-question-action-button"

// Component
export function EditQuestionActions() {
  return (
    <div className="flex items-center justify-center gap-2">
      <DeleteQuestionActionButton />
      <DuplicateQuestionActionButton />
      <ChangeTimeLimitSecondsActionButton />
    </div>
  )
}
