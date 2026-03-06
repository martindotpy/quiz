import { log } from "@/core/logger/client-logger"
import {
  DEFAULT_QUIZ_TIME_LIMIT_SECONDS,
  Quiz,
  type QuizQuestion,
} from "@/quiz/model/quiz-model"
import { i18nInstance } from "@/translation/i18n-instance"
import { persistentAtom } from "@nanostores/persistent"
import { v7 as uuidv7 } from "uuid"

// i18n
export const draftQuizMessages = i18nInstance("quiz:draft", {
  name: "New Quiz",
  description: "This is a sample quiz description.",
  questionTitle: "New question",
  correctAnswerText: "New answer (Correct)",
  incorrectAnswerText: "New answer (Incorrect)",
})

// Initial values
export function getDefaultDraftQuestion(): QuizQuestion {
  const messages = draftQuizMessages.get()

  return {
    title: messages.questionTitle,
    answers: [
      { text: messages.incorrectAnswerText, isCorrect: false },
      { text: messages.correctAnswerText, isCorrect: true },
    ],
  }
}

export function getDefaultDraftQuiz(): Quiz {
  const messages = draftQuizMessages.get()

  return {
    id: uuidv7(),
    name: messages.name,
    description: messages.description,
    timeLimitSeconds: DEFAULT_QUIZ_TIME_LIMIT_SECONDS,
    questions: [getDefaultDraftQuestion()],
    createdAt: new Date(),
    updatedAt: new Date(),
  }
}

// Stores
export const draftQuizStore = persistentAtom<Quiz>(
  "draft-quiz",
  getDefaultDraftQuiz(),
  {
    encode: JSON.stringify,
    decode: (encoded) => {
      try {
        const raw = JSON.parse(encoded)
        const data = Quiz.parse(raw)

        return data
      } catch (err) {
        log.error(err, "Failed to decode draft quiz store")

        return getDefaultDraftQuiz()
      }
    },
  }
)

// Reset
export function resetDraftQuiz() {
  draftQuizStore.set(getDefaultDraftQuiz())
}
