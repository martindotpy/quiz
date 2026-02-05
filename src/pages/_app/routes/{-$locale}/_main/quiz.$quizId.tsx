import { quizCollection } from "@/quiz/collection/quiz-collection"
import { Quiz } from "@/quiz/model/quiz-model"
import { createFileRoute, notFound } from "@tanstack/react-router"

// Route
export const Route = createFileRoute("/{-$locale}/_main/quiz/$quizId")({
  loader: ({ params }) => {
    const { quizId: rawQuizId } = params
    const { success, data: quizId } = Quiz.shape.id.safeParse(rawQuizId)

    if (!success) {
      throw notFound()
    }

    const quiz = quizCollection.get(quizId)

    if (!quiz) {
      throw notFound()
    }

    return { quiz }
  },
  component: QuizComponent,
})

function QuizComponent() {
  const { quiz } = Route.useLoaderData()

  return <div>{quiz.name}</div>
}
