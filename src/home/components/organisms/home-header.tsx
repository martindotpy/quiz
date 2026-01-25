import { Separator } from "@/core/components/ui/separator"
import { Banner } from "@/home/components/atoms/banner"
import { CreateQuiz } from "@/home/components/atoms/create-quiz"
import { UserMenu } from "@/home/components/molecules/user-menu"
import { InsertQuiz } from "@/quiz/components/molecules/insert-quiz"
import { ResetQuizDraft } from "@/quiz/components/molecules/reset-draft"
import { UpdateTitleAndDescription } from "@/quiz/components/molecules/update-title-and-description"
import { useMatches } from "@tanstack/react-router"

// Component
export function HomeHeader() {
  // Creation mode
  const creationMode = useMatches({
    select: (matches) => matches.some((m) => m.staticData.creationMode),
  })

  return (
    <div>
      <header className="min-h-header-h mx-auto flex max-w-7xl items-center justify-between">
        <Banner />

        <div className="flex items-center justify-end gap-2 px-4">
          {!creationMode ? (
            <>
              <CreateQuiz />
              <UserMenu />
            </>
          ) : (
            <>
              <ResetQuizDraft />
              <UpdateTitleAndDescription />
              <InsertQuiz />
            </>
          )}
        </div>
      </header>

      <Separator />
    </div>
  )
}
