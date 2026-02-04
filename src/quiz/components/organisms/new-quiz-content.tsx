import { ControlledTextInput } from "@/core/components/form/controlled/controlled-text-input"
import { Route } from "@/pages/_app/routes/{-$locale}/_main/quiz.new.manual.$questionId"
import { useQuizDraft } from "@/quiz/hook/use-quiz-draft"
import { Quiz } from "@/quiz/model/quiz-model"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

// Component
export function NewQuizContent() {
  // Draft quiz
  const { quizDraft, setQuizDraft } = useQuizDraft()

  // Question
  const { question, questionIndex } = Route.useRouteContext()

  // Form
  const { control, handleSubmit } = useForm({
    resolver: zodResolver(Quiz.shape.questions.element),
    defaultValues: question,
    values: question,
  })

  const onChange = handleSubmit((data) => {
    const questions = [...quizDraft.questions]
    questions[questionIndex] = data

    setQuizDraft({ ...quizDraft, questions })
  })

  return (
    <form className="flex-1" onChange={onChange}>
      <ControlledTextInput
        name="title"
        control={control}
        inputProps={{ className: "text-center text-base py-5 font-medium" }}
      />
    </form>
  )
}
