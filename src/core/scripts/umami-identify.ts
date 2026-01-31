import { withUmami } from "@/core/lib/umami"
import { log } from "@/core/logger/client-logger"

// Logger
const _log = log.withTag("umami-identify")

// With umami loaded
withUmami(async () => {
  const ip = await fetch("https://ifconfig.me/ip").then((res) => res.text())

  _log.debug("Tracking page view with Umami, IP:", ip)

  umami.identify({ ip })
})
