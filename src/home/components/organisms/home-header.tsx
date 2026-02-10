import { Separator } from "@/core/components/ui/separator"
import { BannerLink } from "@/home/components/atoms/banner-link"
import { CreateQuizLink } from "@/home/components/atoms/create-quiz-link"
import { SearchQuiz } from "@/home/components/molecules/search-quiz-input"
import { UserMenu } from "@/home/components/molecules/user-dropdown-menu"
import { CreateNewQuizButton } from "@/quiz/components/molecules/create-new-quiz-button"
import { NewQuizSettingsDropdownMenu } from "@/quiz/components/molecules/new-quiz-dropdown-menu"
import { UpdateQuizButton } from "@/quiz/components/molecules/update-quiz-button"
import { useMode } from "@/quiz/hook/use-mode"

// Component
export function HomeHeader() {
  // Modes
  const { isCreationMode, isEditMode } = useMode()

  // Flags
  const isProfileButtonEnabled = !isCreationMode && !isEditMode
  const isSearchEnabled = !isCreationMode && !isEditMode
  const isCreateButtonEnabled = !isCreationMode && !isEditMode

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

          {isEditMode && (
            <>
              <UpdateQuizButton />
            </>
          )}

          {isProfileButtonEnabled && <UserMenu />}
        </div>
      </header>

      <Separator />
    </div>
  )
}
