import { log } from "@/core/logger/client-logger"
import { Quiz } from "@/quiz/model/quiz-model"
import { persistentAtom } from "@nanostores/persistent"
import { v7 as uuidv7 } from "uuid"

// Initial values
export const QUIZ_DRAFT_STORE_INITIAL_VALUES: Quiz = {
  id: uuidv7(),
  name: "Quiz",
  description: "This is a sample quiz description.",
  questions: [
    {
      title: "Pregunta 1",
      answers: [
        { text: "Respuesta 1 (Incorrecta)", isCorrect: false },
        { text: "Respuesta 2 (Correcta)", isCorrect: true },
      ],
    },
  ],
  createdAt: new Date(),
  updatedAt: new Date(),
}

// Store
export const quizDraftStore = persistentAtom<Quiz>(
  "quiz-draft",
  QUIZ_DRAFT_STORE_INITIAL_VALUES,
  {
    encode: JSON.stringify,
    decode: (encoded) => {
      try {
        const raw = JSON.parse(encoded)
        const data = Quiz.parse(raw)

        return data
      } catch (err) {
        log.error(err, "Failed to decode quiz draft store")

        return { ...QUIZ_DRAFT_STORE_INITIAL_VALUES, id: uuidv7() }
      }
    },
  }
)
