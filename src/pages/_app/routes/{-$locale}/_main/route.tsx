import { SearchQuizParams } from "@/home/model/quiz-search-model"
import { createFileRoute, Outlet } from "@tanstack/react-router"
import z from "zod"

// Route
export const Route = createFileRoute("/{-$locale}/_main")({
  validateSearch: z.object({
    q: SearchQuizParams.shape.q,
  }),
  component: MainLayoutComponent,
})

function MainLayoutComponent() {
  return (
    <main className="max-h-main-h min-h-main-h mx-auto flex w-full max-w-7xl flex-col overflow-hidden p-4">
      <Outlet />
    </main>
  )
}
