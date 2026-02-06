import { QuizGridItemSkeleton } from "@/quiz/components/molecules/quiz-grid-item-skeleton"

// Component
export function QuizGridSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {/* Single column */}
      {[...Array(5)].map((_, index) => (
        <QuizGridItemSkeleton key={index} />
      ))}
      <QuizGridItemSkeleton className="h-md:block hidden" />
      {[...Array(2)].map((_, index) => (
        <QuizGridItemSkeleton key={index} className="h-lg:block hidden" />
      ))}

      {/* Two columns */}
      {[...Array(6)].map((_, index) => (
        <QuizGridItemSkeleton key={index} className="hidden md:block" />
      ))}
      {[...Array(2)].map((_, index) => (
        <QuizGridItemSkeleton key={index} className="md:h-lg:block hidden" />
      ))}

      {/* Three columns */}
      {[...Array(9)].map((_, index) => (
        <QuizGridItemSkeleton key={index} className="hidden lg:block" />
      ))}
    </div>
  )
}
