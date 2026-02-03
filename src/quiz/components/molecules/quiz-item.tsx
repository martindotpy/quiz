import { ConfirmDialog } from "@/core/components/molecules/confirm-dialog"
import { Button } from "@/core/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/core/components/ui/dropdown-menu"
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemFooter,
  ItemTitle,
} from "@/core/components/ui/item"
import { quizCollection } from "@/quiz/collection/quiz-collection"
import type { Quiz } from "@/quiz/model/quiz-model"
import { formatterInstance, i18nInstance } from "@/translation/kit/i18n-kit"
import { params } from "@nanostores/i18n"
import { useStore } from "@nanostores/react"
import { Link } from "@tanstack/react-router"
import { useState } from "react"
import { TbDotsVertical, TbEdit, TbTrash } from "react-icons/tb"
import { toast } from "sonner"

// i18n
const quizItemMessages = i18nInstance("quiz:item", {
  modified: params("Modified {time}"),
  created: params("Created on {time}"),
  edit: "Edit",
  delete: "Delete",
  deleteConfirmTitle: "Delete Quiz",
  deleteConfirmDescription:
    "Are you sure you want to delete this Quiz? This action cannot be undone.",
  deleteConfirmLabel: "Delete",
  deleteLoading: "Deleting Quiz...",
  deleteSuccess: "Quiz deleted successfully",
  deleteError: "Error deleting Quiz",
})

// Component
interface QuizItemProps {
  quiz: Quiz
}

export function QuizItem({ quiz }: QuizItemProps) {
  const messages = useStore(quizItemMessages)

  // Delete dialog state
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

  // Now
  const [nowTime] = useState(() => Date.now())

  // Formatter
  const formatter = useStore(formatterInstance)

  // Date difference in days
  const daysDiff = Math.round(
    (nowTime - quiz.updatedAt.getTime()) / (1000 * 60 * 60 * 24)
  )

  return (
    <>
      <div className="relative">
        <Link to="/{-$locale}/quiz/$quizId" params={{ quizId: quiz.id }}>
          <Item variant="outline">
            <ItemContent className="overflow-hidden">
              <ItemTitle className="truncate">{quiz.name}</ItemTitle>
              <ItemDescription className="truncate">
                {quiz.description}
              </ItemDescription>
            </ItemContent>

            <ItemActions className="size-8" aria-hidden="true" />

            <ItemFooter>
              <span>
                {messages.modified({
                  time: formatter.relativeTime(-daysDiff, "days", {
                    style: "long",
                    numeric: "auto",
                  }),
                })}
              </span>

              <span>
                {messages.created({ time: formatter.time(quiz.createdAt) })}
              </span>
            </ItemFooter>
          </Item>
        </Link>

        <DropdownMenu modal={false}>
          <DropdownMenuTrigger
            className="absolute top-3.75 right-3.25 z-10"
            render={
              <Button variant="secondary" size="icon">
                <TbDotsVertical />
              </Button>
            }
          />

          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <TbEdit />
              {messages.edit}
            </DropdownMenuItem>

            <DropdownMenuItem
              variant="destructive"
              onClick={() => {
                setIsDeleteDialogOpen(true)
              }}
            >
              <TbTrash />
              {messages.delete}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <ConfirmDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        onConfirm={() => {
          const tx = quizCollection.delete(quiz.id)

          toast.promise(tx.isPersisted.promise, {
            loading: messages.deleteLoading,
            success: () => {
              return messages.deleteSuccess
            },
            error: messages.deleteError,
          })

          setIsDeleteDialogOpen(false)
        }}
        title={messages.deleteConfirmTitle}
        description={messages.deleteConfirmDescription}
        confirmLabel={messages.deleteConfirmLabel}
        variant="destructive"
      />
    </>
  )
}
