import { Quiz } from "@/quiz/model/quiz-model"
import { persistentJSON } from "@nanostores/persistent"
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
export const quizDraftStore = persistentJSON<Quiz>(
  "quiz-draft",
  QUIZ_DRAFT_STORE_INITIAL_VALUES
)
