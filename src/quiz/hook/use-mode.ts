import { useMatches } from "@tanstack/react-router"

// Modes
export interface Mode {
  isCreationMode: boolean
  isEditMode: boolean
  isAiMode: boolean
  isManualMode: boolean
}

// Hook
export function useMode() {
  // Modes
  const mode = useMatches({
    select: (matches) =>
      matches.reduce(
        (acc, m) => {
          acc.isCreationMode ||= Boolean(m.staticData.creationMode)
          acc.isEditMode ||= Boolean(m.staticData.editMode)
          acc.isAiMode ||= Boolean(m.staticData.aiMode)
          acc.isManualMode ||= Boolean(m.staticData.manualMode)

          return acc
        },
        {
          isCreationMode: false,
          isEditMode: false,
          isAiMode: false,
          isManualMode: false,
        } as Mode
      ),
  })

  return mode
}
