import { ControlledNumberInput } from "@/core/components/form/controlled/controlled-number-input"
import { Button } from "@/core/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/core/components/ui/dialog"
import { log } from "@/core/logger/client-logger"
import { useCurrentQuestion } from "@/quiz/hook/use-current-question"
import { useCurrentQuiz } from "@/quiz/hook/use-current-quiz"
import { Quiz } from "@/quiz/model/quiz-model"
import { i18nInstance } from "@/translation/kit/i18n-kit"
import { zodResolver } from "@hookform/resolvers/zod"
import { useStore } from "@nanostores/react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { TbArrowBack, TbClock } from "react-icons/tb"
import z from "zod"

// Logger
const _log = log.withTag("quiz:question:time-limit-seconds:change")

// i18n
const changeTimeLimitSecondsMessages = i18nInstance(
  "quiz:question:time-limit-seconds:change",
  {
    label: "Time limit",
    title: "Change time limit",
    description: "Set the time limit for this question in seconds.",
    confirm: "Change",
  }
)

// Schema
const TimeLimitSeconds = z.object({
  timeLimitSeconds: Quiz.shape.questions.element.shape.timeLimitSeconds,
})

// Component
export function ChangeTimeLimitSecondsActionButton() {
  const messages = useStore(changeTimeLimitSecondsMessages)

  // Dialog
  const [open, setOpen] = useState(false)

  // Current quiz
  const { currentQuiz, setCurrentQuiz } = useCurrentQuiz()

  // Question
  const { question, questionIndex } = useCurrentQuestion()

  const timeLimitSeconds =
    question?.timeLimitSeconds ?? currentQuiz.timeLimitSeconds

  // Form
  const { control, handleSubmit, reset } = useForm({
    resolver: zodResolver(TimeLimitSeconds),
    defaultValues: {
      timeLimitSeconds: timeLimitSeconds,
    },
    values: {
      timeLimitSeconds,
    },
  })

  const onSubmit = handleSubmit((data) => {
    const updatedQuestions = [...currentQuiz.questions]
    const currentQuestion = updatedQuestions[questionIndex]

    if (!currentQuestion) {
      _log.error(
        "Cannot change time limit seconds: question at index %d not found",
        questionIndex
      )

      return
    }

    updatedQuestions[questionIndex] = {
      ...currentQuestion,
      timeLimitSeconds: data.timeLimitSeconds,
    }
    setCurrentQuiz({ ...currentQuiz, questions: updatedQuestions })
  })

  // Reset
  const resetTimeLimitSeconds = () => {
    const updatedQuestions = [...currentQuiz.questions]
    const currentQuestion = updatedQuestions[questionIndex]

    if (!currentQuestion) {
      _log.error(
        "Cannot reset time limit seconds: question at index %d not found",
        questionIndex
      )

      return
    }

    updatedQuestions[questionIndex] = {
      ...currentQuestion,
      timeLimitSeconds: undefined,
    }

    setCurrentQuiz({ ...currentQuiz, questions: updatedQuestions })
    reset()
  }

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
      onOpenChangeComplete={() => {
        onSubmit()
      }}
    >
      <DialogTrigger
        render={
          <Button>
            <TbClock />

            {messages.label}
          </Button>
        }
      />

      <DialogContent
        render={(props) => (
          <form
            {...props}
            onSubmit={(e) => {
              onSubmit(e)
              setOpen(false)
            }}
          >
            <DialogHeader>
              <DialogTitle>{messages.title}</DialogTitle>
              <DialogDescription>{messages.description}</DialogDescription>
            </DialogHeader>

            <div className="flex items-center gap-1">
              <ControlledNumberInput
                name="timeLimitSeconds"
                control={control}
                schema={TimeLimitSeconds.shape.timeLimitSeconds.def.innerType}
                numberInputProps={{
                  inputProps: {
                    placeholder: currentQuiz.timeLimitSeconds.toString(),
                  },
                }}
              />

              <Button size="icon" onClick={resetTimeLimitSeconds}>
                <TbArrowBack />
              </Button>
            </div>

            <DialogFooter>
              <Button type="submit">{messages.confirm}</Button>
            </DialogFooter>
          </form>
        )}
      />
    </Dialog>
  )
}
