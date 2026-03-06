import { Button } from "@/core/components/ui/button"
import { quizCollection } from "@/quiz/collection/quiz-collection"
import { useCurrentQuiz } from "@/quiz/hook/use-current-quiz"
import { useHasUnsavedChanges } from "@/quiz/hook/use-edit-quiz"
import { initialEditQuizStore } from "@/quiz/store/edit-quiz-store"
import { i18nInstance } from "@/translation/i18n-instance"
import { useStore } from "@nanostores/react"
import { toast } from "sonner"

// i18n
const updateQuizButtonMessages = i18nInstance("quiz:edit:update", {
  label: "Update",
  success: "Quiz updated successfully!",
  error: "Failed to update quiz. Please try again.",
})

// Component
export function UpdateQuizButton() {
  const messages = useStore(updateQuizButtonMessages)

  // Current quiz
  const { currentQuiz } = useCurrentQuiz()

  // Available to update
  const hasUnsavedChanges = useHasUnsavedChanges()

  // Update quiz
  const updateQuiz = async () => {
    const currentQuizId = currentQuiz.id

    const tx = quizCollection.update(currentQuizId, (draft) => {
      draft.name = currentQuiz.name
      draft.description = currentQuiz.description
      draft.questions = currentQuiz.questions
      draft.timeLimitSeconds = currentQuiz.timeLimitSeconds
    })

    try {
      await tx.isPersisted.promise

      initialEditQuizStore.set(currentQuiz)

      toast.success(messages.success)
    } catch (err) {
      toast.error(messages.error)

      console.error("Failed to update quiz: %o", err)
    }
  }

  return (
    <Button
      variant="secondary"
      onClick={updateQuiz}
      disabled={!hasUnsavedChanges}
    >
      {messages.label}
    </Button>
  )
}
