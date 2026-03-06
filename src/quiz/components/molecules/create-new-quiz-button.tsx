import { Button } from "@/core/components/ui/button"
import { log } from "@/core/logger/client-logger"
import { quizCollection } from "@/quiz/collection/quiz-collection"
import { useCurrentQuiz } from "@/quiz/hook/use-current-quiz"
import { currentQuizStore } from "@/quiz/store/current-quiz-store"
import { draftQuizStore, resetDraftQuiz } from "@/quiz/store/draft-quiz-store"
import { i18nInstance } from "@/translation/i18n-instance"
import { useStore } from "@nanostores/react"
import { useNavigate } from "@tanstack/react-router"
import { toast } from "sonner"

// i18n
const createQuizMessages = i18nInstance("quiz:new:create", {
  create: "Create",
  createSuccess: "Quiz created successfully!",
  createError: "Failed to create the quiz. Please try again.",
})

// Component
export function CreateNewQuizButton() {
  const messages = useStore(createQuizMessages)

  // Draft quiz
  if (!currentQuizStore.get()?.quizStore) {
    // Ensure the draft quiz is set in the current quiz store
    currentQuizStore.set({
      quizStore: draftQuizStore,
      resetQuizStore: resetDraftQuiz,
    })
  }
  const { currentQuiz, resetQuizStore } = useCurrentQuiz()

  // Navigate
  const navigate = useNavigate()

  // Create new quiz
  const createNewQuiz = async () => {
    try {
      const tx = quizCollection.insert(currentQuiz)

      await tx.isPersisted.promise

      toast.success(messages.createSuccess)
      navigate({
        to: "/{-$locale}/quiz/$quizId",
        params: { quizId: currentQuiz.id },
      })
      resetQuizStore()
    } catch (err) {
      toast.error(messages.createError)

      log.error(err, "Error inserting quiz")
    }
  }

  return (
    <Button variant="secondary" onClick={createNewQuiz}>
      {messages.create}
    </Button>
  )
}
