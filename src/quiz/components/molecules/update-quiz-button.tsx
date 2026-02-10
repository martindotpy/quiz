import { Button } from "@/core/components/ui/button"
import { quizCollection } from "@/quiz/collection/quiz-collection"
import { useCurrentQuiz } from "@/quiz/hook/use-current-quiz"
import { i18nInstance } from "@/translation/kit/i18n-kit"
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

      toast.success(messages.success)
    } catch (err) {
      toast.error(messages.error)

      console.error("Failed to update quiz: %o", err)
    }
  }

  return (
    <Button variant="secondary" onClick={updateQuiz}>
      {messages.label}
    </Button>
  )
}
