import { Button } from "@/core/components/ui/button"
import { log } from "@/core/logger/client-logger"
import { quizCollection } from "@/quiz/collection/quiz-collection"
import { useQuizDraft } from "@/quiz/hook/use-quiz-draft"
import { i18nInstance } from "@/translation/kit/i18n-kit"
import { useStore } from "@nanostores/react"
import { useNavigate } from "@tanstack/react-router"
import { toast } from "sonner"

// i18n
const insertQuizMessages = i18nInstance("quiz:insert-quiz", {
  save: "Save",
  saveSuccess: "Quiz saved successfully!",
  saveError: "Failed to save the quiz. Please try again.",
})

// Component
export function InsertQuiz() {
  const messages = useStore(insertQuizMessages)

  // Quiz draft
  const { quizDraft, resetQuizDraft } = useQuizDraft()

  // Navigate
  const navigate = useNavigate()

  return (
    <Button
      onClick={async () => {
        try {
          const tx = quizCollection.insert(quizDraft)

          await tx.isPersisted.promise

          toast.success(messages.saveSuccess)
          navigate({
            to: "/{-$locale}/quiz/$quizId",
            params: { quizId: quizDraft.id },
          })
          resetQuizDraft()
        } catch (err) {
          toast.error(messages.saveError)

          log.error(err, "Error inserting quiz")
        }
      }}
    >
      {messages.save}
    </Button>
  )
}
