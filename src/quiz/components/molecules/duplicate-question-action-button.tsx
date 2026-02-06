import { Button } from "@/core/components/ui/button"
import { log } from "@/core/logger/client-logger"
import { Route as QuestionByIdRoute } from "@/pages/_app/routes/{-$locale}/_main/quiz.new.manual.$questionId"
import { useDraftQuiz } from "@/quiz/hook/use-draft-quiz"
import { i18nInstance } from "@/translation/kit/i18n-kit"
import { useStore } from "@nanostores/react"
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
  const navigate = QuestionByIdRoute.useNavigate()

  // Draft quiz
  const { draftQuiz, setDraftQuiz } = useDraftQuiz()

  // Question
  const { questionIndex, questionStore } = QuestionByIdRoute.useRouteContext()
  const question = useStore(questionStore)

  // Add question
  const onClick = () => {
    if (!question) {
      _log.error("Question not found, cannot duplicate")

      return
    }

    // Duplicate question
    draftQuiz.questions.splice(questionIndex + 1, 0, question)
    setDraftQuiz({ ...draftQuiz, questions: draftQuiz.questions })

    // Navigate to duplicated question
    navigate({
      params: { questionId: (questionIndex + 2).toString() },
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
