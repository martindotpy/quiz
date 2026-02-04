import { Separator } from "@/core/components/ui/separator"
import { Banner } from "@/home/components/atoms/banner"
import { CreateQuiz } from "@/home/components/atoms/create-quiz"
import { SearchQuiz } from "@/home/components/molecules/search-quiz"
import { UserMenu } from "@/home/components/molecules/user-menu"
import { InsertQuiz } from "@/quiz/components/molecules/insert-quiz"
import { ResetQuizDraft } from "@/quiz/components/molecules/reset-draft"
import { UpdateTitleAndDescription } from "@/quiz/components/molecules/update-title-and-description"
import { useMatches } from "@tanstack/react-router"

// Component
export function HomeHeader() {
  // Modes
  const isCreationMode = useMatches({
    select: (matches) => matches.some((m) => m.staticData.creationMode),
  })

  // Flags
  const isSearchEnabled = !isCreationMode
  const isCreateButtonEnabled = !isCreationMode

  return (
    <div>
      <header className="min-h-header-h mx-auto flex max-w-7xl items-center justify-between">
        <Banner />

        {isSearchEnabled && <SearchQuiz />}

        <div className="flex items-center justify-end gap-2 px-4">
          {isCreateButtonEnabled && <CreateQuiz />}

          {isCreationMode && (
            <>
              <ResetQuizDraft />
              <UpdateTitleAndDescription />
              <InsertQuiz />
            </>
          )}

          <UserMenu />
        </div>
      </header>

      <Separator />
    </div>
  )
}
