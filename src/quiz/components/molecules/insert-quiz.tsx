import { Button } from "@/core/components/ui/button"
import { quizCollection } from "@/quiz/collection/quiz-collection"
import { useQuizDraft } from "@/quiz/hook/use-quiz-draft"
import { useNavigate } from "@tanstack/react-router"
import { toast } from "sonner"

// Component
export function InsertQuiz() {
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

          toast.success("Quiz saved successfully!")
          navigate({
            to: "/{-$locale}/quiz/$quizId",
            params: { quizId: quizDraft.id },
          })
          resetQuizDraft()
        } catch (error) {
          toast.error(
            `Failed to save the quiz. Please try again. Error: ${error}`
          )
        }
      }}
    >
      Save
    </Button>
  )
}
