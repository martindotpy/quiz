import { i18nInstance } from "@/translation/i18n-instance"
import { useStore } from "@nanostores/react"
import { TbPhotoPlus } from "react-icons/tb"

// i18n
const editQuizQuestionMultimediaMessages = i18nInstance(
  "quiz:edit:question:multimedia",
  {
    label:
      "Add your question multimedia content here (e.g. images, videos, audio, etc.)",
  }
)

// Component
export function EditQuizQuestionMultimediaForm() {
  const messages = useStore(editQuizQuestionMultimediaMessages)

  return (
    <div className="text-muted-foreground bg-card flex min-h-[45dvh] flex-col items-center justify-center gap-4 border p-4">
      <TbPhotoPlus className="size-16" />

      <p className="text-center text-sm">{messages.label}</p>
    </div>
  )
}
