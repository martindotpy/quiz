import { Separator } from "@/core/components/ui/separator"
import { Skeleton } from "@/core/components/ui/skeleton"
import { QuizGrid } from "@/quiz/components/organisms/quiz-grid"
import { ClientOnly, createFileRoute } from "@tanstack/react-router"

// Route
export const Route = createFileRoute("/{-$locale}/_main/")({
  component: IndexComponent,
})

function IndexComponent() {
  return (
    <>
      <h1 className="mt-2 text-2xl font-bold">Mis quizzes</h1>

      <Separator className="my-4" />

      <ClientOnly
        fallback={
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, index) => (
              <Skeleton key={index} className="h-24 w-full" />
            ))}
          </div>
        }
      >
        <QuizGrid />
      </ClientOnly>
    </>
  )
}
