import z from "zod"

// Validation
export const QuizSearch = z.object({ q: z.optional(z.string()) })
