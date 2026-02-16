import { TbPhotoPlus } from "react-icons/tb"

// Component
export function QuestionMultimediaGame() {
  return (
    <div className="text-muted-foreground bg-card flex flex-col items-center justify-center gap-4 border p-4">
      <TbPhotoPlus className="size-16" />

      <p className="text-center text-sm">Image</p>
    </div>
  )
}
