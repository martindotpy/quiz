import { i18nInstance } from "@/translation/kit/i18n-kit"
import z from "zod"

// i18n
const quizModelErrorMessages = i18nInstance("quiz:model:error", {
  questionTitleRequired: "The question title is required",
  answerTextRequired: "The answer cannot be empty",
  minAnswers: "There must be at least two answers",
  quizNameRequired: "The quiz name is required",
  minQuestions: "The quiz must have at least one question",
})

// Models
export const QuizQuestion = z.object({
  title: z.string().min(1, {
    error: () => quizModelErrorMessages.get().questionTitleRequired,
  }),
  answers: z
    .array(
      z.object({
        text: z.string().min(1, {
          error: () => quizModelErrorMessages.get().answerTextRequired,
        }),
        isCorrect: z.boolean(),
      })
    )
    .min(2, { error: () => quizModelErrorMessages.get().minAnswers }),
})
export type QuizQuestion = z.infer<typeof QuizQuestion>

export const Quiz = z.object({
  id: z.uuidv7(),
  name: z
    .string()
    .min(1, { error: () => quizModelErrorMessages.get().quizNameRequired }),
  description: z.optional(z.string()),
  questions: z.array(QuizQuestion).min(1, {
    error: () => quizModelErrorMessages.get().minQuestions,
  }),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})
export type Quiz = z.infer<typeof Quiz>
