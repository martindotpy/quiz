import { quizCollection } from "@/quiz/collection/quiz-collection"
import { createFileRoute, notFound } from "@tanstack/react-router"
import z from "zod"

// Validation
const QuizId = z.uuidv7()

// Route
export const Route = createFileRoute("/{-$locale}/_main/quiz/$quizId")({
  loader: ({ params }) => {
    const { quizId: rawQuizId } = params
    const { success, data: quizId } = QuizId.safeParse(rawQuizId)

    if (!success) {
      throw notFound()
    }

    const quiz = quizCollection.get(quizId)

    if (!quiz) {
      throw notFound()
    }

    return { quiz }
  },
  component: RouteComponent,
})

function RouteComponent() {
  const { quiz } = Route.useLoaderData()

  return <div>{quiz.name}</div>
}
