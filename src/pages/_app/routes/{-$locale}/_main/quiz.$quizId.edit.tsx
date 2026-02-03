import { Route as QuizByIdRoute } from "@/pages/_app/routes/{-$locale}/_main/quiz.$quizId"
import { createFileRoute } from "@tanstack/react-router"

// Route
export const Route = createFileRoute("/{-$locale}/_main/quiz/$quizId/edit")({
  component: RouteComponent,
})

function RouteComponent() {
  const { quiz } = QuizByIdRoute.useLoaderData()

  return <div>{quiz.name}</div>
}
