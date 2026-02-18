import { Separator } from "@/core/components/ui/separator"
import { BannerLink } from "@/home/components/atoms/banner-link"
import { CreateQuizLink } from "@/home/components/atoms/create-quiz-link"
import { SearchQuiz } from "@/home/components/molecules/search-quiz-input"
import { UserMenu } from "@/home/components/molecules/user-dropdown-menu"
import { AiEditCurrentQuizLink } from "@/quiz/components/molecules/ai-edit-current-quiz-edit"
import { CreateNewQuizButton } from "@/quiz/components/molecules/create-new-quiz-button"
import { EditQuizSettingsDropdownMenu } from "@/quiz/components/molecules/edit-quiz-dropdown-menu"
import { ManualEditCurrentQuizLink } from "@/quiz/components/molecules/manual-edit-current-quiz-edit"
import { NewQuizSettingsDropdownMenu } from "@/quiz/components/molecules/new-quiz-dropdown-menu"
import { UpdateQuizButton } from "@/quiz/components/molecules/update-quiz-button"
import { useMode } from "@/quiz/hook/use-mode"

// Component
export function HomeHeader() {
  // Modes
  const { isCreationMode, isEditMode, isAiMode, isManualMode } = useMode()

  // Flags
  const isProfileButtonEnabled = !isCreationMode && !isEditMode
  const isSearchEnabled = !isCreationMode && !isEditMode
  const isCreateLinkEnabled = !isCreationMode && !isEditMode

  return (
    <div className="max-h-header-h bg-background/80 fixed top-0 z-100 w-full backdrop-blur-sm">
      <header className="mx-auto flex max-w-7xl items-center justify-between">
        <BannerLink />

        {isSearchEnabled && <SearchQuiz />}

        <div className="flex items-center justify-end gap-2 px-4">
          {isAiMode && <ManualEditCurrentQuizLink />}

          {isManualMode && <AiEditCurrentQuizLink />}

          {isCreateLinkEnabled && <CreateQuizLink />}

          {isCreationMode && (
            <>
              <CreateNewQuizButton />
              <NewQuizSettingsDropdownMenu />
            </>
          )}

          {isEditMode && (
            <>
              <UpdateQuizButton />
              <EditQuizSettingsDropdownMenu />
            </>
          )}

          {isProfileButtonEnabled && <UserMenu />}
        </div>
      </header>

      <Separator />
    </div>
  )
}
