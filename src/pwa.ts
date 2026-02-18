import {
  handleAppInstalled,
  handleBeforeInstallPrompt,
} from "@/settings/store/pwa-install-store"
import { registerSW } from "virtual:pwa-register"

window.addEventListener("load", () => registerSW({ immediate: true }))
window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt)
window.addEventListener("appinstalled", handleAppInstalled)
