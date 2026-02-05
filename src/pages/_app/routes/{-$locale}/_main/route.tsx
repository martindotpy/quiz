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
    <div className="flex flex-1">
      <main className="mx-auto flex max-w-7xl flex-1 flex-col p-4">
        <Outlet />
      </main>
    </div>
  )
}
