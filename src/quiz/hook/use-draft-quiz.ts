import {
  draftQuizStore,
  getDefaultDraftQuiz,
} from "@/quiz/store/draft-quiz-store"
import { useStore } from "@nanostores/react"

// Hook
export function useDraftQuiz() {
  const draftQuiz = useStore(draftQuizStore)
  const setDraftQuiz = draftQuizStore.set
  const resetDraftQuiz = () => draftQuizStore.set(getDefaultDraftQuiz())

  return {
    draftQuiz,
    setDraftQuiz,
    resetDraftQuiz,
  }
}
