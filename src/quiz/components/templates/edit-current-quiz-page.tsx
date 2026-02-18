import { Separator } from "@/core/components/ui/separator"
import { CurrentQuizContent } from "@/quiz/components/organisms/current-quiz-content"
import { CurrentQuizNav } from "@/quiz/components/organisms/current-quiz-nav"

// Component
export function EditCurrentQuizPage() {
  return (
    <>
      <CurrentQuizContent />

      <div className="no-scrollbar bg-background/80 fixed bottom-0 left-0 w-full max-w-full overflow-x-scroll backdrop-blur-sm">
        <Separator orientation="horizontal" />

        <CurrentQuizNav />
      </div>
    </>
  )
}
