import { Button } from "@/core/components/ui/button"
import { log } from "@/core/logger/client-logger"
import { quizCollection } from "@/quiz/collection/quiz-collection"
import { useDraftQuiz } from "@/quiz/hook/use-draft-quiz"
import { i18nInstance } from "@/translation/kit/i18n-kit"
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
  const { draftQuiz, resetDraftQuiz } = useDraftQuiz()

  // Navigate
  const navigate = useNavigate()

  // Create new quiz
  const createNewQuiz = async () => {
    try {
      const tx = quizCollection.insert(draftQuiz)

      await tx.isPersisted.promise

      toast.success(messages.createSuccess)
      navigate({
        to: "/{-$locale}/quiz/$quizId",
        params: { quizId: draftQuiz.id },
      })
      resetDraftQuiz()
    } catch (err) {
      toast.error(messages.createError)

      log.error(err, "Error inserting quiz")
    }
  }

  return <Button onClick={createNewQuiz}>{messages.create}</Button>
}
