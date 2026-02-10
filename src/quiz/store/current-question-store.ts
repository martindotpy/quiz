import type { QuizQuestion } from "@/quiz/model/quiz-model"
import { atom, type ReadableAtom } from "nanostores"

// Stores
interface CurrentQuestionStore {
  questionStore: ReadableAtom<QuizQuestion>
  questionIndex: number
}

export const currentQuestionStore = atom<CurrentQuestionStore | null>(null)
