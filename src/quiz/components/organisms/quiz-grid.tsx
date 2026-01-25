import { QuizItem } from "@/quiz/components/molecules/quiz-item"
import { useLiveQuiz } from "@/quiz/hook/use-live-quiz"

// Component
export function QuizGrid() {
  const { quizzes } = useLiveQuiz()

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {quizzes.map((quiz) => (
        <QuizItem key={quiz.id} quiz={quiz} />
      ))}
    </div>
  )
}
