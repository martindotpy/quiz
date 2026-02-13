import { useUpdateQuestionsByAiGenerationMode } from "@/ai/hook/use-ai-generation-mode"
import { ControlledTextarea } from "@/core/components/form/controlled/controlled-textarea"
import { Button } from "@/core/components/ui/button"
import { FieldSet, FieldTitle } from "@/core/components/ui/field"
import { log } from "@/core/logger/client-logger"
import { Quiz } from "@/quiz/model/quiz-model"
import { i18nInstance } from "@/translation/kit/i18n-kit"
import { zodResolver } from "@hookform/resolvers/zod"
import { useStore } from "@nanostores/react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import z from "zod"

// i18n
const jsonQuizFormMessages = i18nInstance("quiz:ai:json:form", {
  title: "JSON Questions",
  placeholder: "Enter the questions data in JSON format.",
  button: "Accept",
  empty: "The JSON field cannot be empty",
  invalid: "The provided JSON is invalid. Please correct it and try again",
  success: "Questions updated successfully!",
  error: "An error occurred while updating the questions. Please try again.",
})

// Schema
const QuizJson = z.object({
  json: z
    .string({ error: () => jsonQuizFormMessages.get().empty })
    .trim()
    .refine((value) => {
      try {
        Quiz.shape.questions.parse(JSON.parse(value))

        return true
      } catch (err) {
        log.error("Failed to parse quiz JSON", { error: err, json: value })

        return false
      }
    }, jsonQuizFormMessages.get().invalid),
})

// Component
export function JsonQuizFormStep() {
  const messages = useStore(jsonQuizFormMessages)

  // Update current quiz by ai generation mode
  const updateQuestions = useUpdateQuestionsByAiGenerationMode()

  // Form
  const { control, handleSubmit, reset } = useForm({
    resolver: zodResolver(QuizJson),
    defaultValues: {
      json: "",
    },
  })

  const onSubmit = handleSubmit((data) => {
    try {
      updateQuestions(JSON.parse(data.json))
      reset()

      toast.success(messages.success)
    } catch (err) {
      toast.error(messages.error)

      log.error("Failed to parse quiz JSON", { error: err, json: data.json })
    }
  })

  return (
    <FieldSet>
      <FieldTitle>{messages.title}</FieldTitle>

      <form onSubmit={onSubmit} className="flex flex-col gap-4">
        <ControlledTextarea
          name="json"
          control={control}
          textareaProps={{
            placeholder: messages.placeholder,
            className:
              "font-mono max-h-[35dvh] no-scrollbar text-xs overflow-y-auto",
          }}
        />

        <Button type="submit" className="mx-auto w-full max-w-72">
          {messages.button}
        </Button>
      </form>
    </FieldSet>
  )
}
