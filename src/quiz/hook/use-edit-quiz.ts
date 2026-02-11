import { hasUnsavedChangesStore } from "@/quiz/store/edit-quiz-store"
import { useStore } from "@nanostores/react"

// Hooks
export function useHasUnsavedChanges() {
  const hasUnsavedChanges = useStore(hasUnsavedChangesStore)

  return hasUnsavedChanges
}
