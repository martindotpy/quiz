import type { Quiz } from "@/quiz/model/quiz-model"
import { atom, type WritableAtom } from "nanostores"

// Types
export type QuizStore = WritableAtom<Quiz | null>

interface CurrentQuizStore {
  // The actual quiz store (WritableAtom<Quiz | null>)
  quizStore: QuizStore
  // Function to reset the quiz store to its initial state
  resetQuizStore: () => void
}

// Stores
export const currentQuizStore = atom<CurrentQuizStore | null>(null)
