import { Quiz } from "@/quiz/model/quiz-model"
import {
  createCollection,
  localStorageCollectionOptions,
} from "@tanstack/react-db"

// Collection
export const quizCollection = createCollection(
  localStorageCollectionOptions({
    id: "quiz-collection",
    storageKey: "quiz-collection",
    getKey: (quiz) => quiz.id,
    schema: Quiz,
    onInsert: async ({ transaction }) => {
      const mutation = transaction.mutations[0]

      const now = mutation.createdAt
      const insertedQuiz = mutation.modified

      insertedQuiz.createdAt = now
    },
    onUpdate: async ({ transaction }) => {
      const mutation = transaction.mutations[0]

      const now = mutation.updatedAt
      const updatedQuiz = mutation.modified

      updatedQuiz.updatedAt = now
    },

    parser: {
      parse: (data) => {
        const raw = JSON.parse(data)

        const parsed = Object.keys(raw as object).reduce(
          (acc, key) => {
            const data = Quiz.parse(raw[key].data)
            acc[key] = { ...raw[key], data }

            return acc
          },
          {} as Record<string, object>
        )

        return parsed
      },
      stringify: JSON.stringify,
    },
  })
)
