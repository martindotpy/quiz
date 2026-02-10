import { ControlledInput } from "@/core/components/form/controlled/controlled-input"
import { ControlledTextarea } from "@/core/components/form/controlled/controlled-textarea"
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
import { Quiz } from "@/quiz/model/quiz-model"
import { i18nInstance } from "@/translation/kit/i18n-kit"
import { zodResolver } from "@hookform/resolvers/zod"
import { useStore } from "@nanostores/react"
import type React from "react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { TbEdit } from "react-icons/tb"

// i18n
const updateTitleAndDescriptionMessages = i18nInstance(
  "quiz:title-and-description:update",
  {
    label: "Title and Description",
    title: "Update Title and Description",
    description: "Update the title and description of your quiz.",
    nameLabel: "Title",
    descriptionLabel: "Description",
    update: "Update",
  }
)

// Schema
const TitleAndDescriptionQuiz = Quiz.pick({
  name: true,
  description: true,
})

// Item
export function useUpdateTitleAndDescriptionDropdownMenuItem(): [
  NewQuizDropdownMenuButtonItem,
  React.ReactNode,
] {
  const messages = useStore(updateTitleAndDescriptionMessages)

  // Dialog state
  const [open, setOpen] = useState(false)

  const closeDialog = () => {
    setOpen(false)
  }

  // Current quiz
  const { currentQuiz, setCurrentQuiz } = useCurrentQuiz()

  // Form
  const { control, handleSubmit } = useForm({
    resolver: zodResolver(TitleAndDescriptionQuiz),
    values: {
      name: currentQuiz.name,
      description: currentQuiz.description,
    },
  })

  const onChange = handleSubmit((data) => {
    setCurrentQuiz({ ...currentQuiz, ...data })
  })

  return [
    {
      label: messages.label,
      icon: TbEdit,
      onClick: () => setOpen(true),
    },
    <Dialog
      key="update-title-and-description-dialog"
      open={open}
      onOpenChange={setOpen}
    >
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

            <ControlledInput
              name="name"
              label={messages.nameLabel}
              control={control}
            />
            <ControlledTextarea
              name="description"
              label={messages.descriptionLabel}
              control={control}
              textareaProps={{
                className: "break-all",
              }}
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
