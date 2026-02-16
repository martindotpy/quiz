import { GameCounter } from "@/game/components/organisms/game-counter"
import { QuizGame } from "@/game/components/organisms/quiz-game"
import { useCounter } from "@/game/hook/use-counter"
import { MIN_COUNTER_VALUE } from "@/game/store/counter-store"
import { createFileRoute } from "@tanstack/react-router"

// Route
export const Route = createFileRoute("/{-$locale}/_main/quiz/$quizId/play")({
  component: QuizPlayComponent,
})

function QuizPlayComponent() {
  // Counter
  const counter = useCounter()
  const isCounterActive = counter > MIN_COUNTER_VALUE

  return (
    <>
      {isCounterActive && <GameCounter />}
      {!isCounterActive && <QuizGame />}
    </>
  )
}
