import { i18nInstance } from "@/translation/kit/i18n-kit"
import z from "zod"

// i18n
const quizModelErrorMessages = i18nInstance("quiz:model:error", {
  questionTitleRequired: "The question title is required",
  answerTextRequired: "The answer cannot be empty",
  minAnswers: "There must be at least two answers",
  quizNameRequired: "The quiz name is required",
  minQuestions: "The quiz must have at least one question",
  timeLimitSecondsNonInteger: "The time limit must be an integer",
  timeLimitSecondsNonNegative: "The time limit must be non-negative",
})

// Default values
export const DEFAULT_QUIZ_TIME_LIMIT_SECONDS = 10

// Min and max sizes
export const minAnswersSize = 2

// Models
const TimeLimitSeconds = z
  .number()
  .int({
    error: () => quizModelErrorMessages.get().timeLimitSecondsNonInteger,
  })
  .min(0, {
    error: () => quizModelErrorMessages.get().timeLimitSecondsNonNegative,
  })

export const QuestionAnswer = z.object({
  text: z
    .string()
    .min(1, {
      error: () => quizModelErrorMessages.get().answerTextRequired,
    })
    .trim(),
  isCorrect: z.boolean(),
})
export type QuestionAnswer = z.infer<typeof QuestionAnswer>

export const QuizQuestion = z.object({
  title: z
    .string()
    .min(1, {
      error: () => quizModelErrorMessages.get().questionTitleRequired,
    })
    .trim(),
  answers: z.array(QuestionAnswer).min(minAnswersSize, {
    error: () => quizModelErrorMessages.get().minAnswers,
  }),
  timeLimitSeconds: z.optional(TimeLimitSeconds),
})
export type QuizQuestion = z.infer<typeof QuizQuestion>

export const Quiz = z.object({
  id: z.uuidv7(),
  name: z
    .string()
    .min(1, { error: () => quizModelErrorMessages.get().quizNameRequired })
    .trim(),
  description: z.optional(z.string().trim()),
  timeLimitSeconds: TimeLimitSeconds.default(DEFAULT_QUIZ_TIME_LIMIT_SECONDS),
  questions: z.array(QuizQuestion).min(1, {
    error: () => quizModelErrorMessages.get().minQuestions,
  }),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})
export type Quiz = z.infer<typeof Quiz>

// Json schema
export const questionsJsonSchema = JSON.stringify(
  z.toJSONSchema(Quiz.shape.questions, {
    unrepresentable: "any",
    override: (ctx) => {
      const def = ctx.zodSchema._zod.def

      if (def.type === "date") {
        ctx.jsonSchema.type = "string"
        ctx.jsonSchema.format = "date-time"
      }
    },
  })
)
