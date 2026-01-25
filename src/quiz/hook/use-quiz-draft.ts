import {
  QUIZ_DRAFT_STORE_INITIAL_VALUES,
  quizDraftStore,
} from "@/quiz/store/quiz-draft-store"
import { useStore } from "@nanostores/react"

// Hook
export function useQuizDraft() {
  const quizDraft = useStore(quizDraftStore)
  const setQuizDraft = quizDraftStore.set
  const resetQuizDraft = () =>
    quizDraftStore.set(QUIZ_DRAFT_STORE_INITIAL_VALUES)

  return { quizDraft, setQuizDraft, resetQuizDraft }
}
