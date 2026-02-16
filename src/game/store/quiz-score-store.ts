import { persistentJSON } from "@nanostores/persistent"

// Store
interface Score {
  [quizId: string]: {
    maxScore: number
    lastScore: number
    totalQuestions: number
  }
}

export const scoreStore = persistentJSON<Score>("score", {})
