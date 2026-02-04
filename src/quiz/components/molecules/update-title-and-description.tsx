import { ControlledTextarea } from "@/core/components/form/controlled/controlled-text-area"
import { ControlledTextInput } from "@/core/components/form/controlled/controlled-text-input"
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
import { useQuizDraft } from "@/quiz/hook/use-quiz-draft"
import { Quiz } from "@/quiz/model/quiz-model"
import { i18nInstance } from "@/translation/kit/i18n-kit"
import { zodResolver } from "@hookform/resolvers/zod"
import { useStore } from "@nanostores/react"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"

// i18n
const updateTitleAndDescriptionMessages = i18nInstance(
  "quiz:update-title-and-description",
  {
    trigger: "Title and Description",
    title: "Update Title and Description",
    description: "Update the title and description of your quiz.",
    nameLabel: "Title",
    descriptionLabel: "Description",
    save: "Save",
  }
)

// Schema
const TitleAndDescriptionQuiz = Quiz.pick({
  name: true,
  description: true,
})

// Component
export function UpdateTitleAndDescription() {
  const messages = useStore(updateTitleAndDescriptionMessages)

  // Dialog state
  const [open, setOpen] = useState(false)

  const closeDialog = () => {
    setOpen(false)
  }

  // Draft
  const { quizDraft, setQuizDraft } = useQuizDraft()

  // Form
  const { control, handleSubmit, setValue } = useForm({
    resolver: zodResolver(TitleAndDescriptionQuiz),
    defaultValues: {
      name: quizDraft.name,
      description: quizDraft.description,
    },
  })

  const onSubmit = handleSubmit((data) => {
    setQuizDraft({ ...quizDraft, ...data })
  })

  // Sync form values with draft
  useEffect(() => {
    setValue("name", quizDraft.name)
    setValue("description", quizDraft.description)
  }, [quizDraft, setValue])

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
              onSubmit(e)
            }}
            onChange={onSubmit}
          >
            <DialogHeader>
              <DialogTitle>{messages.title}</DialogTitle>
              <DialogDescription>{messages.description}</DialogDescription>
            </DialogHeader>

            <ControlledTextInput
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
              <Button type="submit">{messages.save}</Button>
            </DialogFooter>
          </form>
        )}
      />
    </Dialog>
  )
}
