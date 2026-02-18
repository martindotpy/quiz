import { pwaInstallStore } from "@/settings/store/pwa-install-store"
import { useStore } from "@nanostores/react"

// Hooks
export function usePwaInstall() {
  const { canInstall, isInstalled, promptEvent } = useStore(pwaInstallStore)

  const install = async () => {
    if (!promptEvent) return false

    await promptEvent.prompt()

    const { outcome } = await promptEvent.userChoice

    return outcome === "accepted"
  }

  return {
    canInstall,
    isInstalled,
    install,
  }
}
