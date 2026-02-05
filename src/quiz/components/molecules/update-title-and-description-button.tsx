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
  DialogTrigger,
} from "@/core/components/ui/dialog"
import { useDraftQuiz } from "@/quiz/hook/use-draft-quiz"
import { Quiz } from "@/quiz/model/quiz-model"
import { i18nInstance } from "@/translation/kit/i18n-kit"
import { zodResolver } from "@hookform/resolvers/zod"
import { useStore } from "@nanostores/react"
import { useState } from "react"
import { useForm } from "react-hook-form"

// i18n
const updateTitleAndDescriptionMessages = i18nInstance(
  "quiz:title-and-description:update",
  {
    trigger: "Title and Description",
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

// Component
export function UpdateTitleAndDescriptionButton() {
  const messages = useStore(updateTitleAndDescriptionMessages)

  // Dialog state
  const [open, setOpen] = useState(false)

  const closeDialog = () => {
    setOpen(false)
  }

  // Draft
  const { draftQuiz, setDraftQuiz } = useDraftQuiz()

  // Form
  const { control, handleSubmit } = useForm({
    resolver: zodResolver(TitleAndDescriptionQuiz),
    values: {
      name: draftQuiz.name,
      description: draftQuiz.description,
    },
  })

  const onChange = handleSubmit((data) => {
    setDraftQuiz({ ...draftQuiz, ...data })
  })

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={<Button variant="secondary">{messages.trigger}</Button>}
      />

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
    </Dialog>
  )
}
