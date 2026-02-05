import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/{-$locale}/_main/quiz/new/ai")({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>AI</div>
}
