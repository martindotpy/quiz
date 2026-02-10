import { createFileRoute } from "@tanstack/react-router"

// Route
export const Route = createFileRoute("/{-$locale}/_main/quiz/$quizId/edit/ai")({
  component: EditQuizWithAiComponent,
})

function EditQuizWithAiComponent() {
  return <div>AI</div>
}
