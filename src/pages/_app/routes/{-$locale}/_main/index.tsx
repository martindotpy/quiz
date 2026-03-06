import { Separator } from "@/core/components/ui/separator"
import { QuizGridSkeleton } from "@/home/components/atoms/quiz-grid-skeleton"
import { QuizGrid } from "@/quiz/components/organisms/quiz-grid"
import { i18nInstance } from "@/translation/i18n-instance"
import { useStore } from "@nanostores/react"
import { ClientOnly, createFileRoute } from "@tanstack/react-router"

// i18n
const homeMessages = i18nInstance("home", {
  title: "My Quizzes",
})

// Route
export const Route = createFileRoute("/{-$locale}/_main/")({
  component: HomeComponent,
})

function HomeComponent() {
  const messages = useStore(homeMessages)

  return (
    <>
      <h1 className="text-2xl font-bold">{messages.title}</h1>

      <Separator className="my-3" />

      <ClientOnly fallback={<QuizGridSkeleton />}>
        <QuizGrid />
      </ClientOnly>
    </>
  )
}
