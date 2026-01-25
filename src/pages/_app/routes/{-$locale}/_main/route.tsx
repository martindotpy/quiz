import {
  createFileRoute,
  Outlet,
  retainSearchParams,
} from "@tanstack/react-router"
import z from "zod"

// Route
export const Route = createFileRoute("/{-$locale}/_main")({
  search: {
    middlewares: [retainSearchParams(["q"])],
  },
  validateSearch: z.object({
    q: z.string().optional(),
  }),
  component: MainLayoutComponent,
})

function MainLayoutComponent() {
  return (
    <div className="flex flex-1">
      <main className="mx-auto max-w-7xl flex-1 p-4">
        <Outlet />
      </main>
    </div>
  )
}
