import { DropdownMenuItem } from "@/core/components/ui/dropdown-menu"
import type { LinkRoute } from "@/pages/_app/routes/-routes-types"
import { useResetDraftQuizDropdownMenuItem } from "@/quiz/components/molecules/items/reset-draft-quiz-dropdown-menu-item"
import { useUpdateDefaultTimeLimitDropdownMenuItem } from "@/quiz/components/molecules/items/update-default-duration-seconds-item"
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
  // Title and description
  const [updateTitleAndDescriptionMenuItem, updateTitleAndDescriptionDialog] =
    useUpdateTitleAndDescriptionDropdownMenuItem()

  // Time limit
  const [updateDefaultTimeLimitMenuItem, updateDefaultTimeLimitDialog] =
    useUpdateDefaultTimeLimitDropdownMenuItem()

  // Reset draft
  const [resetDraftQuizMenuItem, resetDraftQuizDialog] =
    useResetDraftQuizDropdownMenuItem()

  return [
    [
      updateTitleAndDescriptionMenuItem,
      updateDefaultTimeLimitMenuItem,
      resetDraftQuizMenuItem,
    ],
    [
      updateTitleAndDescriptionDialog,
      updateDefaultTimeLimitDialog,
      resetDraftQuizDialog,
    ],
  ]
}
