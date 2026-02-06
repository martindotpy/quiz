import { DropdownMenuItem } from "@/core/components/ui/dropdown-menu"
import type { LinkRoute } from "@/pages/_app/routes/-routes-types"
import { useAiDropdownMenuItem } from "@/quiz/components/molecules/items/ai-dropdown-menu-item"
import { useResetDraftQuizDropdownMenuItem } from "@/quiz/components/molecules/items/reset-draft-quiz-dropdown-menu-item"
import { useUpdateTitleAndDescriptionDropdownMenuItem } from "@/quiz/components/molecules/items/update-title-and-description-dropdown-menu-item"
import type React from "react"
import type { IconType } from "react-icons/lib"

// Items
interface NewQuizDropdownMenuItem extends React.ComponentProps<
  typeof DropdownMenuItem
> {
  icon: IconType
  label: string
}

export type NewQuizDropdownMenuButtonItem = NewQuizDropdownMenuItem

export interface NewQuizDropdownMenuLinkItem extends NewQuizDropdownMenuItem {
  to: LinkRoute
}

export function useNewQuizMenuItems(): [
  (NewQuizDropdownMenuButtonItem | NewQuizDropdownMenuLinkItem)[],
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
