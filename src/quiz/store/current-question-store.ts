import type { QuizQuestion } from "@/quiz/model/quiz-model"
import { atom } from "nanostores"

// Stores
interface CurrentQuestionStore {
  question: QuizQuestion
  questionIndex: number
}

export const currentQuestionStore = atom<CurrentQuestionStore | null>(null)
