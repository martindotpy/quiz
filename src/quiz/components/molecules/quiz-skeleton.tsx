import { Skeleton } from "@/core/components/ui/skeleton"
import { cn } from "@/core/lib/tailwind"

// Component
type QuizSkeletonProps = React.ComponentProps<typeof Skeleton>

export function QuizSkeleton({ className, ...props }: QuizSkeletonProps) {
  return <Skeleton className={cn("h-[87.5px] w-full", className)} {...props} />
}
