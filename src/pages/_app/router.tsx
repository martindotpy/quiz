import { isDev } from "@/core/configuration/app-configuration"
import {
  getTanstackQueryContext,
  TanstackQueryProvider,
} from "@/core/integrations/tanstack-query-integration"
import { ErrorMainSection } from "@/error/components/sections/error-main-section"
import { NotFoundMainSection } from "@/not-found/components/organisms/sections/not-found-main-section"
import { routeTree } from "@/pages/_app/routeTree.gen"
import { dehydrate, hydrate } from "@tanstack/react-query"
import { createRouter, ErrorComponent } from "@tanstack/react-router"
import type { AstroGlobal } from "astro"
import { ThemeProvider } from "next-themes"
import * as React from "react"
import { LuLoaderCircle } from "react-icons/lu"

export function createAppRouter(astro?: AstroGlobal) {
  const tanstackQueryContext = getTanstackQueryContext()

  return createRouter({
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
            <ThemeProvider attribute="class">{children}</ThemeProvider>
          </TanstackQueryProvider>
        </React.StrictMode>
      )
    },
    defaultPendingComponent: () => (
      <div className="flex flex-1 flex-col items-center justify-center gap-4 p-2">
        <LuLoaderCircle className="size-14 animate-spin" />
        Cargando...
      </div>
    ),
    defaultNotFoundComponent: () => (
      <div className="flex flex-1 flex-col">
        <NotFoundMainSection />
      </div>
    ),
    defaultErrorComponent: ({ error }) => (
      <div className="flex flex-1 flex-col">
        {isDev ? <ErrorComponent error={error} /> : <ErrorMainSection />}
      </div>
    ),
    defaultViewTransition: true,
    scrollRestoration: true,
    defaultPreload: "intent",
  })
}

export type AppRouter = ReturnType<typeof createAppRouter>

declare module "@tanstack/react-router" {
  interface Register {
    router: AppRouter
  }

  interface StaticDataRouteOption {
    creationMode?: boolean
  }
}
