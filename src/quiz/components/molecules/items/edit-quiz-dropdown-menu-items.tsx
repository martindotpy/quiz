import { DropdownMenuItem } from "@/core/components/ui/dropdown-menu"
import type { LinkRoute } from "@/pages/_app/routes/-routes-types"
import { useAiDropdownMenuItem } from "@/quiz/components/molecules/items/ai-dropdown-menu-item"
import { useResetEditQuizDropdownMenuItem } from "@/quiz/components/molecules/items/reset-edit-quiz-dropdown-menu-item"
import { useUpdateTitleAndDescriptionDropdownMenuItem } from "@/quiz/components/molecules/items/update-title-and-description-dropdown-menu-item"
import type React from "react"
import type { IconType } from "react-icons/lib"

// Items
interface EditedQuizDropdownMenuItem extends React.ComponentProps<
  typeof DropdownMenuItem
> {
  icon: IconType
  label: string
}

export type EditedQuizDropdownMenuButtonItem = EditedQuizDropdownMenuItem

export interface EditedQuizDropdownMenuLinkItem extends EditedQuizDropdownMenuItem {
  to: LinkRoute
}

export function useEditedQuizMenuItems(): [
  (EditedQuizDropdownMenuButtonItem | EditedQuizDropdownMenuLinkItem)[],
  React.ReactNode[],
] {
  // Ai
  const aiMenuItem = useAiDropdownMenuItem()

  // Reset edited quiz
  const [resetEditedQuizMenuItem, resetEditedQuizDialog] =
    useResetEditQuizDropdownMenuItem()

  // Title and description
  const [updateTitleAndDescriptionMenuItem, updateTitleAndDescriptionDialog] =
    useUpdateTitleAndDescriptionDropdownMenuItem()

  return [
    [aiMenuItem, updateTitleAndDescriptionMenuItem, resetEditedQuizMenuItem],
    [updateTitleAndDescriptionDialog, resetEditedQuizDialog],
  ]
}
