import { Separator } from "@/core/components/ui/separator"
import { cn } from "@/core/lib/tailwind"
import { CurrentQuizContent } from "@/quiz/components/organisms/current-quiz-content"
import { CurrentQuizNav } from "@/quiz/components/organisms/current-quiz-nav"
import { currentQuestionStore } from "@/quiz/store/current-question-store"
import { draftQuizStore } from "@/quiz/store/draft-quiz-store"
import { createFileRoute, redirect } from "@tanstack/react-router"
import { computed } from "nanostores"

// Route
export const Route = createFileRoute(
  "/{-$locale}/_main/quiz/new/manual/$questionId"
)({
  beforeLoad: ({ params }) => {
    // Check if the question id is valid
    const { questionId: rawQuestionId } = params
    const questionId = Number(rawQuestionId)
    const draftQuiz = draftQuizStore.get()

    // Redirect to the first question if the id is invalid
    if (
      Number.isNaN(questionId) ||
      questionId < 1 ||
      questionId > draftQuiz.questions.length
    ) {
      throw redirect({
        params: (prevParams) => ({ ...prevParams, questionId: "1" }),
      })
    }

    // There is always one in the draft quiz
    const questionIndex = questionId - 1
    const questionStore = computed(
      draftQuizStore,
      (draftQuiz) => draftQuiz.questions[questionIndex]!
    )

    currentQuestionStore.set({ questionIndex, questionStore })
  },
  component: NewQuizComponent,
})

function NewQuizComponent() {
  return (
    <div
      className={cn(
        "no-scrollbar flex flex-1 flex-col-reverse gap-4 overflow-y-hidden",
        "md:flex-row"
      )}
    >
      <div
        className={cn(
          "no-scrollbar flex flex-col gap-4",
          "md:flex-row md:overflow-y-scroll"
        )}
      >
        <Separator orientation="horizontal" className="md:hidden" />

        <CurrentQuizNav />

        <Separator orientation="vertical" className="max-md:hidden" />
      </div>

      <CurrentQuizContent />
    </div>
  )
}
