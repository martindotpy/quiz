import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/{-$locale}/_main/quiz/new/ai")({
  component: CreateNewQuizWithAiComponent,
})

function CreateNewQuizWithAiComponent() {
  return <div>AI</div>
}
