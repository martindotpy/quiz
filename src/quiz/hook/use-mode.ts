import { useMatches } from "@tanstack/react-router"

// Hook
export function useMode() {
  // Modes
  const isCreationMode = useMatches({
    select: (matches) => matches.some((m) => m.staticData.creationMode),
  })
  const isEditMode = useMatches({
    select: (matches) => matches.some((m) => m.staticData.editMode),
  })

  return { isCreationMode, isEditMode }
}
