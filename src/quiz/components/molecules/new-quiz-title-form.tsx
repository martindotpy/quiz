import { ControlledInput } from "@/core/components/form/controlled/controlled-input"
import { cn } from "@/core/lib/tailwind"
import { useCurrentQuestion } from "@/quiz/hook/use-current-question"
import { useCurrentQuiz } from "@/quiz/hook/use-current-quiz"
import { Quiz } from "@/quiz/model/quiz-model"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

// Component
export function CurrentQuizTitleForm() {
  // Edit quiz
  const { currentQuiz, setCurrentQuiz } = useCurrentQuiz()

  // Question
  const { question, questionIndex } = useCurrentQuestion()

  // Form
  const { control, handleSubmit } = useForm({
    resolver: zodResolver(Quiz.shape.questions.element),
    defaultValues: question,
    values: question,
  })

  const onChange = handleSubmit((data) => {
    const questions = [...currentQuiz.questions]
    questions[questionIndex] = data

    setCurrentQuiz({ ...currentQuiz, questions })
  })

  return (
    <form onChange={onChange}>
      <ControlledInput
        name="title"
        control={control}
        inputProps={{
          className: cn("py-6 text-center text-lg! font-medium"),
        }}
      />
    </form>
  )
}
