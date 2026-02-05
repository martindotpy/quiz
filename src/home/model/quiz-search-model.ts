import z from "zod"

// Model
export const SearchQuizParams = z.object({ q: z.optional(z.string()) })
