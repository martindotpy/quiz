import { DefaultPendingPage } from "@/core/components/template/default-pending-page"
import { TooltipProvider } from "@/core/components/ui/tooltip"
import { isDev } from "@/core/configuration/app-configuration"
import {
  getTanstackQueryContext,
  TanstackQueryProvider,
} from "@/core/integrations/tanstack-query-integration"
import { ErrorMainSection } from "@/error/components/sections/error-main-section"
import { NotFoundMainSection } from "@/not-found/components/organisms/sections/not-found-main-section"
import { routeTree } from "@/pages/_app/routeTree.gen"
import * as Sentry from "@sentry/astro"
import { tanstackRouterBrowserTracingIntegration } from "@sentry/react"
import { dehydrate, hydrate } from "@tanstack/react-query"
import { createRouter, ErrorComponent } from "@tanstack/react-router"
import type { AstroGlobal } from "astro"
import consola from "consola/browser"
import { ThemeProvider } from "next-themes"
import * as React from "react"

export function createAppRouter(astro?: AstroGlobal) {
  const tanstackQueryContext = getTanstackQueryContext()

  const router = createRouter({
    routeTree,
    context: { astro, ...tanstackQueryContext },
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    dehydrate: () => {
      return {
        queryClientState: dehydrate(tanstackQueryContext.queryClient),
      }
    },
    hydrate: (dehydrated) => {
      hydrate(tanstackQueryContext.queryClient, dehydrated.queryClientState)
    },
    Wrap: ({ children }: { children: React.ReactNode }) => {
      return (
        <React.StrictMode>
          <TanstackQueryProvider {...tanstackQueryContext}>
            <ThemeProvider attribute="class">
              <TooltipProvider>{children}</TooltipProvider>
            </ThemeProvider>
          </TanstackQueryProvider>
        </React.StrictMode>
      )
    },
    defaultPendingComponent: DefaultPendingPage,
    defaultNotFoundComponent: () => (
      <div className="flex flex-1 flex-col">
        <NotFoundMainSection />
      </div>
    ),
    defaultErrorComponent: ({ error }) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      React.useEffect(() => {
        Sentry.captureException(error)
      }, [error])

      return (
        <div className="flex flex-1 flex-col">
          {isDev ? <ErrorComponent error={error} /> : <ErrorMainSection />}
        </div>
      )
    },
    defaultViewTransition: true,
    scrollRestoration: true,
    defaultPreload: "intent",
    trailingSlash: "never",
  })

  // Load client sentry
  if (typeof window !== "undefined") {
    // Consola reporter
    const sentryReporter = Sentry.createConsolaReporter()

    consola.addReporter(sentryReporter)

    // Sentry
    Sentry.init({
      integrations: [tanstackRouterBrowserTracingIntegration(router)],
      dsn: "https://6d6812d579534d2a9ff09fdd33b842b0@sentry.martindotpy.dev/2",
      enableLogs: true,
      sendDefaultPii: true,
    })
  }

  return router
}

export type AppRouter = ReturnType<typeof createAppRouter>

declare module "@tanstack/react-router" {
  interface Register {
    router: AppRouter
  }

  interface StaticDataRouteOption {
    creationMode?: boolean
    editMode?: boolean
    manualMode?: boolean
    aiMode?: boolean
  }
}
