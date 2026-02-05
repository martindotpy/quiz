import { QuizGridItem } from "@/quiz/components/molecules/quiz-grid-item"
import { useLiveQuiz } from "@/quiz/hook/use-live-quiz"
import { i18nInstance } from "@/translation/kit/i18n-kit"
import { useStore } from "@nanostores/react"
import { TbInbox } from "react-icons/tb"

// i18n
const gridQuizMessages = i18nInstance("quiz:grid", {
  noQuizzes: "You don't have any quizzes created yet",
})

// Component
export function QuizGrid() {
  const messages = useStore(gridQuizMessages)

  // Quizzes
  const { quizzes } = useLiveQuiz()

  return quizzes.length === 0 ? (
    <div className="text-muted-foreground flex flex-1 flex-col items-center justify-center gap-4 p-4">
      <TbInbox className="size-16" />

      <p>{messages.noQuizzes}</p>
    </div>
  ) : (
    <div className="no-scrollbar grid grid-cols-1 gap-4 overflow-y-scroll md:grid-cols-2 lg:grid-cols-3">
      {quizzes.map((quiz) => (
        <QuizGridItem key={quiz.id} quiz={quiz} />
      ))}
    </div>
  )
}
