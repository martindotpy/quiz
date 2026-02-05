import { ControlledInput } from "@/core/components/form/controlled/controlled-input"
import { Route } from "@/pages/_app/routes/{-$locale}/_main/quiz.new.manual.$questionId"
import { useDraftQuiz } from "@/quiz/hook/use-draft-quiz"
import { Quiz } from "@/quiz/model/quiz-model"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

// Component
export function NewQuizContent() {
  // Draft quiz
  const { draftQuiz, setDraftQuiz } = useDraftQuiz()

  // Question
  const { question, questionIndex } = Route.useRouteContext()

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
        inputProps={{ className: "text-center text-base py-5 font-medium" }}
      />
    </form>
  )
}
