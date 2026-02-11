import { Button } from "@/core/components/ui/button"
import { log } from "@/core/logger/client-logger"
import { useCurrentQuestion } from "@/quiz/hook/use-current-question"
import { useCurrentQuiz } from "@/quiz/hook/use-current-quiz"
import { i18nInstance } from "@/translation/kit/i18n-kit"
import { useStore } from "@nanostores/react"
import { useNavigate } from "@tanstack/react-router"
import { TbCopy } from "react-icons/tb"

// Logger
const _log = log.withTag("quiz:question:duplicate")

// i18n
const duplicateQuestionActionMessages = i18nInstance(
  "quiz:question:duplicate",
  {
    label: "Duplicate",
  }
)

// Component
export function DuplicateQuestionActionButton() {
  const messages = useStore(duplicateQuestionActionMessages)

  // Navigate
  const navigate = useNavigate()

  // Draft quiz
  const { currentQuiz, setCurrentQuiz } = useCurrentQuiz()

  // Question
  const { question, questionIndex } = useCurrentQuestion()

  // Add question
  const onClick = () => {
    if (!question) {
      _log.error("Question not found, cannot duplicate")

      return
    }

    // Duplicate question
    const questions = [...currentQuiz.questions]
    questions.splice(questionIndex + 1, 0, question)

    setCurrentQuiz({ ...currentQuiz, questions })

    // Navigate to duplicated question
    navigate({
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      params: (prevParams) => ({
        ...prevParams,
        questionId: (questionIndex + 2).toString(),
      }),
      viewTransition: false,
    })
  }

  return (
    <Button onClick={onClick}>
      <TbCopy />

      {messages.label}
    </Button>
  )
}
