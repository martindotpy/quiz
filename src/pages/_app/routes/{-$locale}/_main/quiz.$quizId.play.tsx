import { QuizGame } from "@/game/components/quiz-game"
import { createFileRoute } from "@tanstack/react-router"

// Route
export const Route = createFileRoute("/{-$locale}/_main/quiz/$quizId/play")({
  component: QuizPlayComponent,
})

function QuizPlayComponent() {
  return <QuizGame />
}
