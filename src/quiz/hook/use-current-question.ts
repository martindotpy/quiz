import { BaseError } from "@/core/lib/error"
import { currentQuestionStore } from "@/quiz/store/current-question-store"
import { useStore } from "@nanostores/react"

// Error
export class NoCurrentQuestionError extends BaseError {
  constructor() {
    super("No current question found")
  }
}

// Hook
export function useCurrentQuestion() {
  const currentQuestion = useStore(currentQuestionStore)

  if (!currentQuestion) {
    throw new NoCurrentQuestionError()
  }

  return currentQuestion
}
