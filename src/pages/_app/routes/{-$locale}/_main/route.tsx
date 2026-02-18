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
    <main className="min-h-main-h mx-auto my-4 flex w-full max-w-7xl flex-col px-4">
      <Outlet />
    </main>
  )
}
