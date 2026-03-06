import { ControlledNumberInput } from "@/core/components/form/controlled/controlled-number-input"
import { Button } from "@/core/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/core/components/ui/dialog"
import type { NewQuizDropdownMenuButtonItem } from "@/quiz/components/molecules/items/new-quiz-dropdown-menu-items"
import { useCurrentQuiz } from "@/quiz/hook/use-current-quiz"
import { TimeLimitSeconds } from "@/quiz/model/quiz-model"
import { i18nInstance } from "@/translation/i18n-instance"
import { zodResolver } from "@hookform/resolvers/zod"
import { useStore } from "@nanostores/react"
import type React from "react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { TbClock } from "react-icons/tb"
import z from "zod"

// i18n
const updateTimeLimitSecondsMessages = i18nInstance(
  "quiz:time-limit-seconds:update",
  {
    label: "Time limit",
    title: "Update default time limit",
    description: "Update the default time limit for questions in your quiz.",
    timeLimitSecondsLabel: "Time limit (seconds)",
    update: "Update",
  }
)

// Schema
const TimeLimitSecondsQuiz = z.object({
  timeLimitSeconds: TimeLimitSeconds,
})

// Item
export function useUpdateDefaultTimeLimitDropdownMenuItem(): [
  NewQuizDropdownMenuButtonItem,
  React.ReactNode,
] {
  const messages = useStore(updateTimeLimitSecondsMessages)

  // Dialog state
  const [open, setOpen] = useState(false)

  const closeDialog = () => {
    setOpen(false)
  }

  // Current quiz
  const { currentQuiz, setCurrentQuiz } = useCurrentQuiz()

  // Form
  const { control, handleSubmit } = useForm({
    resolver: zodResolver(TimeLimitSecondsQuiz),
    values: {
      timeLimitSeconds: currentQuiz.timeLimitSeconds,
    },
  })

  const onChange = handleSubmit((data) => {
    setCurrentQuiz({ ...currentQuiz, ...data })
  })

  return [
    {
      label: messages.label,
      icon: TbClock,
      onClick: () => setOpen(true),
    },
    <Dialog key="update-time-limit-dialog" open={open} onOpenChange={setOpen}>
      <DialogContent
        render={(props) => (
          <form
            {...props}
            onSubmit={(e) => {
              closeDialog()
              onChange(e)
            }}
            onChange={onChange}
          >
            <DialogHeader>
              <DialogTitle>{messages.title}</DialogTitle>
              <DialogDescription>{messages.description}</DialogDescription>
            </DialogHeader>

            <ControlledNumberInput
              name="timeLimitSeconds"
              label={messages.timeLimitSecondsLabel}
              control={control}
            />

            <DialogFooter>
              <Button type="submit">{messages.update}</Button>
            </DialogFooter>
          </form>
        )}
      />
    </Dialog>,
  ]
}
