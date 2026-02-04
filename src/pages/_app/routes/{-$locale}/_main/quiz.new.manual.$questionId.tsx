import { Separator } from "@/core/components/ui/separator"
import { cn } from "@/core/lib/tailwind"
import { NewQuizContent } from "@/quiz/components/organisms/new-quiz-content"
import { NewQuizNav } from "@/quiz/components/organisms/new-quiz-nav"
import { quizDraftStore } from "@/quiz/store/quiz-draft-store"
import { createFileRoute, redirect } from "@tanstack/react-router"

// Route
export const Route = createFileRoute(
  "/{-$locale}/_main/quiz/new/manual/$questionId"
)({
  beforeLoad: ({ params }) => {
    // Check if the question id is valid
    const { questionId: rawQuestionId } = params
    const questionId = Number(rawQuestionId)
    const draftQuiz = quizDraftStore.get()

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
    const question = draftQuiz.questions[questionIndex]!

    return { question, questionIndex }
  },
  component: NewQuizComponent,
})

function NewQuizComponent() {
  return (
    <div className={cn("flex flex-1 flex-col-reverse gap-4", "md:flex-row")}>
      <div
        className={cn(
          "no-scrollbar flex flex-col gap-4 overflow-y-scroll",
          "md:flex-row"
        )}
      >
        <Separator orientation="horizontal" className="md:hidden" />

        <NewQuizNav />

        <Separator orientation="vertical" className="max-md:hidden" />
      </div>

      <NewQuizContent />
    </div>
  )
}
