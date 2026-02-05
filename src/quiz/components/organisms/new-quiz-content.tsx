import { ControlledInput } from "@/core/components/form/controlled/controlled-input"
import { cn } from "@/core/lib/tailwind"
import { Route as QuestionByIdAtNewQuizRoute } from "@/pages/_app/routes/{-$locale}/_main/quiz.new.manual.$questionId"
import { useDraftQuiz } from "@/quiz/hook/use-draft-quiz"
import { Quiz } from "@/quiz/model/quiz-model"
import { zodResolver } from "@hookform/resolvers/zod"
import { useStore } from "@nanostores/react"
import { useForm } from "react-hook-form"

// Component
export function NewQuizContent() {
  // Draft quiz
  const { draftQuiz, setDraftQuiz } = useDraftQuiz()

  // Question
  const { questionStore, questionIndex } =
    QuestionByIdAtNewQuizRoute.useRouteContext()
  const question = useStore(questionStore)

  // Form
  const { control, handleSubmit } = useForm({
    resolver: zodResolver(Quiz.shape.questions.element),
    defaultValues: question,
    values: question,
  })

  const onChange = handleSubmit((data) => {
    const questions = [...draftQuiz.questions]
    questions[questionIndex] = data

    setDraftQuiz({ ...draftQuiz, questions })
  })

  return (
    <form className="flex-1" onChange={onChange}>
      <ControlledInput
        name="title"
        control={control}
        inputProps={{ className: cn("py-5 text-center text-base font-medium") }}
      />
    </form>
  )
}
