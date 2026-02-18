import { atom } from "nanostores"

// Event
interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>
}

// Store
interface PwaInstallStore {
  canInstall: boolean
  isInstalled: boolean
  promptEvent: BeforeInstallPromptEvent | null
}

export const pwaInstallStore = atom<PwaInstallStore>({
  canInstall: false,
  isInstalled: false,
  promptEvent: null,
})

// Handlers
export function handleStandaloneDisplayMode() {
  const isStandalone = window.matchMedia("(display-mode: standalone)").matches

  if (!isStandalone) return

  pwaInstallStore.set({
    canInstall: false,
    isInstalled: true,
    promptEvent: null,
  })
}

export function handleBeforeInstallPrompt(e: Event) {
  e.preventDefault()

  pwaInstallStore.set({
    canInstall: true,
    isInstalled: false,
    promptEvent: e as BeforeInstallPromptEvent,
  })
}

export function handleAppInstalled() {
  pwaInstallStore.set({
    canInstall: false,
    isInstalled: true,
    promptEvent: null,
  })
}
