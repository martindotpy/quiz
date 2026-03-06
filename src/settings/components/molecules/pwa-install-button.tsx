import { Button } from "@/core/components/ui/button"
import { usePwaInstall } from "@/settings/hook/use-pwa-install"
import { i18nInstance } from "@/translation/i18n-instance"
import { useStore } from "@nanostores/react"
import { TbDownload } from "react-icons/tb"

// i18n
const pwaInstallMessages = i18nInstance("settings:preferences:options:pwa", {
  install: "Install Quiz",
  installed: "Installed",
})

// Component
export function PwaInstallButton() {
  const messages = useStore(pwaInstallMessages)

  // Pwa install
  const { canInstall, isInstalled, install } = usePwaInstall()

  if (!canInstall && !isInstalled) {
    return null
  }

  return (
    <Button
      variant="outline"
      className="h-full"
      size="xs"
      disabled={isInstalled}
      onClick={install}
    >
      <TbDownload />

      {messages.install}
    </Button>
  )
}
