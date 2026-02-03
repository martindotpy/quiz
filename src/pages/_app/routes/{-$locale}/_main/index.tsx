import { Separator } from "@/core/components/ui/separator"
import { QuizSkeleton } from "@/quiz/components/molecules/quiz-skeleton"
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

      <Separator className="my-3" />

      <ClientOnly
        fallback={
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {/* Single column */}
            {[...Array(5)].map((_, index) => (
              <QuizSkeleton key={index} />
            ))}
            <QuizSkeleton className="h-md:block hidden" />
            {[...Array(2)].map((_, index) => (
              <QuizSkeleton key={index} className="h-lg:block hidden" />
            ))}

            {/* Two columns */}
            {[...Array(6)].map((_, index) => (
              <QuizSkeleton key={index} className="hidden md:block" />
            ))}
            {[...Array(2)].map((_, index) => (
              <QuizSkeleton key={index} className="md:h-lg:block hidden" />
            ))}
            {[...Array(2)].map((_, index) => (
              <QuizSkeleton key={index} className="md:h-xl:block hidden" />
            ))}

            {/* Three columns */}
            {[...Array(9)].map((_, index) => (
              <QuizSkeleton key={index} className="hidden lg:block" />
            ))}
            {[...Array(3)].map((_, index) => (
              <QuizSkeleton key={index} className="lg:h-lg:block hidden" />
            ))}
            {[...Array(3)].map((_, index) => (
              <QuizSkeleton key={index} className="lg:h-xl:block hidden" />
            ))}
          </div>
        }
      >
        <QuizGrid />
      </ClientOnly>
    </>
  )
}
