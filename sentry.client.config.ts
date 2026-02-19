import * as Sentry from "@sentry/astro"
import consola from "consola/browser"

// Consola reporter
const sentryReporter = Sentry.createConsolaReporter()

consola.addReporter(sentryReporter)

// Sentry
Sentry.init({
  dsn: "https://6d6812d579534d2a9ff09fdd33b842b0@sentry.martindotpy.dev/2",
  enableLogs: true,
  sendDefaultPii: true,
})
