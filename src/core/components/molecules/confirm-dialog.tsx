import { Button } from "@/core/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/core/components/ui/dialog"
import { i18nInstance } from "@/translation/i18n-instance"
import { useStore } from "@nanostores/react"
import { TbLoader } from "react-icons/tb"

// i18n
const confirmDialogMessages = i18nInstance("confirm-dialog", {
  confirm: "Confirm",
  cancel: "Cancel",
  loading: "Loading...",
})

// Component
interface ConfirmDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: React.ReactNode
  description?: React.ReactNode
  confirmLabel?: React.ReactNode
  cancelLabel?: React.ReactNode
  variant?: "default" | "destructive"
  isLoading?: boolean
  onConfirm: () => void | Promise<void>
}

export function ConfirmDialog({
  open,
  onOpenChange,
  title,
  description,
  confirmLabel,
  cancelLabel,
  variant = "default",
  isLoading = false,
  onConfirm,
}: ConfirmDialogProps) {
  const messages = useStore(confirmDialogMessages)
  confirmLabel = confirmLabel || messages.confirm
  cancelLabel = cancelLabel || messages.cancel

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>

          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>

        <DialogFooter>
          <DialogClose
            render={
              <Button variant="outline" disabled={isLoading}>
                {cancelLabel}
              </Button>
            }
          />

          <Button
            variant={variant === "destructive" ? "destructive" : "default"}
            onClick={onConfirm}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <TbLoader className="size-4 animate-spin" />
                {messages.loading}
              </>
            ) : (
              confirmLabel
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
