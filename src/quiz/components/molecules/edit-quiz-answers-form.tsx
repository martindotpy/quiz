import { ControlledCheckbox } from "@/core/components/form/controlled/controlled-checkbox"
import { ControlledInput } from "@/core/components/form/controlled/controlled-input"
import { Button } from "@/core/components/ui/button"
import {
  Item,
  ItemActions,
  ItemContent,
  ItemMedia,
} from "@/core/components/ui/item"
import { cn } from "@/core/lib/tailwind"
import { useCurrentQuestion } from "@/quiz/hook/use-current-question"
import { useCurrentQuiz } from "@/quiz/hook/use-current-quiz"
import { minAnswersSize, QuizQuestion } from "@/quiz/model/quiz-model"
import { i18nInstance } from "@/translation/kit/i18n-kit"
import { zodResolver } from "@hookform/resolvers/zod"
import { useStore } from "@nanostores/react"
import { useFieldArray, useForm } from "react-hook-form"
import { TbX } from "react-icons/tb"
import z from "zod"

// i18n
const editQuizQuestionAnswers = i18nInstance("quiz:edit:answers", {
  add: "Add answer",
})

// Schema
const QuestionAnswers = z.object({
  answers: QuizQuestion.shape.answers,
})

// Component
export function EditQuizQuestionAnswersForm() {
  const messages = useStore(editQuizQuestionAnswers)

  // Edit question
  const { currentQuiz, setCurrentQuiz } = useCurrentQuiz()

  // Question
  const { question, questionIndex } = useCurrentQuestion()

  // Form
  const { control, handleSubmit } = useForm({
    resolver: zodResolver(QuestionAnswers),
    defaultValues: {
      answers: question!.answers,
    },
    values: {
      answers: question!.answers,
    },
  })

  const onChange = handleSubmit((data) => {
    const questions = [...currentQuiz.questions]
    const currentQuestion = questions[questionIndex]

    if (!currentQuestion) return

    questions[questionIndex] = {
      ...currentQuestion,
      answers: data.answers,
    }
    setCurrentQuiz({ ...currentQuiz, questions })
  })

  // Answers
  const { fields, append, remove } = useFieldArray({ control, name: "answers" })

  return (
    <div className="flex flex-1 flex-col items-center gap-4">
      <div className="flex w-full flex-1">
        <form className="grid h-fit max-h-full w-full gap-2 md:grid-cols-2">
          {fields.map((field, index) => (
            <Item
              key={field.id}
              variant="muted"
              size="xs"
              className="flex-none py-4"
            >
              <ItemMedia>
                <ControlledCheckbox
                  control={control}
                  name={`answers.${index}.isCorrect`}
                  inputProps={{
                    onBlur: onChange,
                  }}
                />
              </ItemMedia>
              <ItemContent>
                <ControlledInput
                  control={control}
                  name={`answers.${index}.text`}
                  inputProps={{
                    className: cn("border-0 bg-transparent! p-0 ring-0!"),
                    onBlur: onChange,
                  }}
                />
              </ItemContent>
              <ItemActions>
                <Button
                  size="icon-xs"
                  variant="ghost"
                  onClick={() => {
                    remove(index)
                    onChange()
                  }}
                  disabled={fields.length <= minAnswersSize}
                >
                  <TbX />
                </Button>
              </ItemActions>
            </Item>
          ))}
        </form>
      </div>

      <Button
        className="w-full max-w-72"
        onClick={() => append({ text: "", isCorrect: false })}
      >
        {messages.add}
      </Button>
    </div>
  )
}
