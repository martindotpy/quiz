import { BaseError } from "@/core/lib/error"
import {
  currentQuizStore,
  type QuizStore,
} from "@/quiz/store/current-quiz-store"
import { useStore } from "@nanostores/react"

// Errors
class CurrentQuizStoreNullError extends BaseError {
  constructor() {
    super(
      "current quiz context is null. Ensure that currentQuizStore is initialized."
    )
  }
}

class CurrentQuizNullError extends BaseError {
  constructor() {
    super(
      "currentQuiz is null. Please ensure that currentQuizStore is properly initialized and contains a quiz."
    )
  }
}

// Hooks
function useNonNullCurrentQuizStore() {
  const currentQuizContext = useStore(currentQuizStore)

  if (!currentQuizContext) {
    throw new CurrentQuizStoreNullError()
  }

  return currentQuizContext
}

function useNonNullCurrentQuiz(quizStore: QuizStore) {
  const currentQuiz = useStore(quizStore)

  if (!currentQuiz) {
    throw new CurrentQuizNullError()
  }

  return currentQuiz
}

export function useCurrentQuiz() {
  // Context that contains the active quiz store and reset helper
  const { quizStore, resetQuizStore } = useNonNullCurrentQuizStore()

  // Current quiz value and setter
  const currentQuiz = useNonNullCurrentQuiz(quizStore)
  const setCurrentQuiz = quizStore.set

  return {
    currentQuiz,
    setCurrentQuiz,
    resetQuizStore,
  }
}
