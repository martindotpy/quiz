import { DropdownMenuItem } from "@/core/components/ui/dropdown-menu"
import type { LinkRoute } from "@/pages/_app/routes/-routes-types"
import { useAiDropdownMenuItem } from "@/quiz/components/molecules/data/ai-dropdown-menu-item"
import { useResetDraftQuizDropdownMenuItem } from "@/quiz/components/molecules/data/reset-draft-quiz-dropdown-menu-item"
import { useUpdateTitleAndDescriptionDropdownMenuItem } from "@/quiz/components/molecules/data/update-title-and-description-dropdown-menu-item"
import type React from "react"
import type { IconType } from "react-icons/lib"

// Items
interface NewQuizMenuItem {
  icon: IconType
  label: string
  props?: React.ComponentProps<typeof DropdownMenuItem>
}

export interface NewQuizMenuButtonItem extends NewQuizMenuItem {
  onClick: React.ComponentProps<typeof DropdownMenuItem>["onClick"]
}

export interface NewQuizMenuLinkItem extends NewQuizMenuItem {
  to: LinkRoute
}

export function useNewQuizMenuItems(): [
  (NewQuizMenuButtonItem | NewQuizMenuLinkItem)[],
  React.ReactNode[],
] {
  // Ai
  const aiMenuItem = useAiDropdownMenuItem()

  // Reset draft
  const [resetDraftQuizMenuItem, resetDraftQuizDialog] =
    useResetDraftQuizDropdownMenuItem()

  // Title and description
  const [updateTitleAndDescriptionMenuItem, updateTitleAndDescriptionDialog] =
    useUpdateTitleAndDescriptionDropdownMenuItem()

  return [
    [aiMenuItem, updateTitleAndDescriptionMenuItem, resetDraftQuizMenuItem],
    [updateTitleAndDescriptionDialog, resetDraftQuizDialog],
  ]
}
