import { scoreStore } from "@/game/store/quiz-score-store"
import { useStore } from "@nanostores/react"

// Hook
export function useScore() {
  const score = useStore(scoreStore)

  return score
}
