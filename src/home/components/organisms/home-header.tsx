import { Separator } from "@/core/components/ui/separator"
import { BannerLink } from "@/home/components/atoms/banner-link"
import { CreateQuizLink } from "@/home/components/atoms/create-quiz-link"
import { SearchQuiz } from "@/home/components/molecules/search-quiz-input"
import { UserMenu } from "@/home/components/molecules/user-dropdown-menu"
import { CreateNewQuizButton } from "@/quiz/components/molecules/create-new-quiz-button"
import { NewQuizSettingsDropdownMenu } from "@/quiz/components/molecules/new-quiz-dropdown-menu"
import { useMatches } from "@tanstack/react-router"

// Component
export function HomeHeader() {
  // Modes
  const isCreationMode = useMatches({
    select: (matches) => matches.some((m) => m.staticData.creationMode),
  })

  // Flags
  const isProfileButtonEnabled = !isCreationMode
  const isSearchEnabled = !isCreationMode
  const isCreateButtonEnabled = !isCreationMode

  return (
    <div className="max-h-header-h">
      <header className="mx-auto flex max-w-7xl items-center justify-between">
        <BannerLink />

        {isSearchEnabled && <SearchQuiz />}

        <div className="flex items-center justify-end gap-2 px-4">
          {isCreateButtonEnabled && <CreateQuizLink />}

          {isCreationMode && (
            <>
              <CreateNewQuizButton />
              <NewQuizSettingsDropdownMenu />
            </>
          )}

          {isProfileButtonEnabled && <UserMenu />}
        </div>
      </header>

      <Separator />
    </div>
  )
}
