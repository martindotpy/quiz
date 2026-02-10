import { ConfirmDialog } from "@/core/components/molecules/confirm-dialog"
import { Button } from "@/core/components/ui/button"
import { Route as QuestionByIdRoute } from "@/pages/_app/routes/{-$locale}/_main/quiz.new.manual.$questionId"
import { useCurrentQuestion } from "@/quiz/hook/use-current-question"
import { useCurrentQuiz } from "@/quiz/hook/use-current-quiz"
import { i18nInstance } from "@/translation/kit/i18n-kit"
import { useStore } from "@nanostores/react"
import { useState } from "react"
import { TbTrash } from "react-icons/tb"

// i18n
const deleteQuestionActionMessages = i18nInstance("quiz:question:delete", {
  label: "Delete",
  title: "Delete Question",
  description: "Are you sure you want to delete this question?",
})

// Item
export function DeleteQuestionActionButton() {
  const messages = useStore(deleteQuestionActionMessages)

  // Navigate
  const navigate = QuestionByIdRoute.useNavigate()

  // Draft quiz
  const { currentQuiz, setCurrentQuiz } = useCurrentQuiz()

  // Question
  const { questionIndex } = useCurrentQuestion()
  const isLastQuestion = currentQuiz.questions.length === questionIndex + 1
  const isOneQuestion = currentQuiz.questions.length === 1

  // Dialog
  const [open, setOpen] = useState(false)

  const onConfirm = async () => {
    // Navigate to the next question or previous if it was the last one
    await navigate({
      params: {
        questionId: (questionIndex + (isLastQuestion ? 0 : 1)).toString(),
      },
      viewTransition: false,
    })

    // Remove the question
    const questions = currentQuiz.questions.filter(
      (_, index) => index !== questionIndex
    )
    setCurrentQuiz({ ...currentQuiz, questions })

    // Close the dialog
    setOpen(false)
  }

  return (
    <>
      <Button
        variant="destructive"
        onClick={() => setOpen(true)}
        disabled={isOneQuestion}
      >
        <TbTrash />

        {messages.label}
      </Button>

      <ConfirmDialog
        onConfirm={onConfirm}
        onOpenChange={setOpen}
        open={open}
        title={messages.title}
        description={messages.description}
        variant="destructive"
      />
    </>
  )
}
